import type {D1Database,R2Bucket,AssetFetcher} from './bindings';
declare class FixedLengthStream extends TransformStream<Uint8Array,Uint8Array>{constructor(length:number)}
import seed from '../src/data/defaultContent.json';
import {validateContent,mediaType} from '../server/validation';
import {Zip,ZipPassThrough,strToU8} from 'fflate';

interface Env {DB:D1Database;BUCKET:R2Bucket;ASSETS:AssetFetcher;SITE_OWNER_EMAIL:string;ADMIN_CSRF_SECRET:string}
const maxUpload=100*1024*1024;
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
const fail=(message:string,status=400):never=>{throw Object.assign(new Error(message),{status});};
const owner=(request:Request,env:Env)=>!!env.SITE_OWNER_EMAIL&&!!request.headers.get('oai-authenticated-user-id')&&request.headers.get('oai-authenticated-user-email')?.toLowerCase()===env.SITE_OWNER_EMAIL.toLowerCase();
async function csrf(request:Request,env:Env){
  if(!env.ADMIN_CSRF_SECRET)fail('Owner access is temporarily unavailable.',503);
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.ADMIN_CSRF_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  return Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(request.headers.get('oai-authenticated-user-id')||''))),b=>b.toString(16).padStart(2,'0')).join('');
}
async function requireOwner(request:Request,env:Env){
  if(!owner(request,env))fail('Only the website owner can use the studio.',401);
  if(!['GET','HEAD'].includes(request.method)){
    if(request.headers.get('x-admin-csrf')!==await csrf(request,env))fail('Please sign in again before saving.',403);
  }
}
async function body(request:Request){
  const reader=request.body?.getReader();if(!reader)fail('Request body is required.');
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>2*1024*1024){await reader.cancel();fail('This content is too large.',413);}chunks.push(part.value);}
  const bytes=new Uint8Array(size);let offset=0;for(const part of chunks){bytes.set(part,offset);offset+=part.length;}
  try{return JSON.parse(new TextDecoder().decode(bytes));}catch{fail('The submitted content could not be read.');}
}
async function readContent(env:Env){
  await env.DB.prepare('INSERT OR IGNORE INTO site_content (id,payload,revision) VALUES (1,?,0)').bind(JSON.stringify({...seed,revision:0})).run();
  const row=await env.DB.prepare('SELECT payload,revision FROM site_content WHERE id=1').first<{payload:string;revision:number}>();
  if(!row)fail('Website content is temporarily unavailable.',503);
  return {...JSON.parse(row.payload),revision:row.revision};
}
async function saveContent(request:Request,env:Env){
  const incoming=await body(request),data=validateContent(incoming.data),revision=incoming.revision;
  if(!Number.isSafeInteger(revision)||revision<0)fail('Reload the latest content before saving.');
  const next={...data,revision:revision+1,updatedAt:new Date().toISOString()};
  const result=await env.DB.batch([
    env.DB.prepare('INSERT OR IGNORE INTO content_revisions (revision,payload,created_at) SELECT revision,payload,? FROM site_content WHERE id=1 AND revision=?').bind(new Date().toISOString(),revision),
    env.DB.prepare('UPDATE site_content SET payload=?,revision=? WHERE id=1 AND revision=?').bind(JSON.stringify(next),revision+1,revision),
    env.DB.prepare('DELETE FROM content_revisions WHERE revision < (SELECT revision-100 FROM site_content WHERE id=1)')
  ]);
  if(result[1].meta.changes!==1)fail('The website changed in another tab. Load the latest saved version before publishing.',409);
  return json({data:next});
}
async function upload(request:Request,env:Env){
  const length=Number(request.headers.get('content-length')||request.headers.get('x-upload-size'));
  if(!Number.isSafeInteger(length)||length<=0)fail('Choose a file to upload.');
  if(length>maxUpload)fail('Choose a file under 100 MB.',413);
  const reader=request.body?.getReader();if(!reader)fail('Choose a file to upload.');
  const initial:Uint8Array[]=[];let initialLength=0,done=false;
  while(initialLength<4096){const part=await reader.read();if(part.done){done=true;break;}initial.push(part.value);initialLength+=part.value.length;}
  const header=new Uint8Array(Math.min(initialLength,4096));let cursor=0;for(const part of initial){const remaining=header.length-cursor;if(remaining<=0)break;const slice=part.subarray(0,remaining);header.set(slice,cursor);cursor+=slice.length;}
  const type=mediaType(header);
  if(!type){await reader.cancel();fail('Use JPG, PNG, WebP, GIF, MP4, WebM or PDF. SVG and executable files are not accepted.',415);}
  const key=`uploads/${crypto.randomUUID()}.${type.ext}`;
  const fixed=new FixedLengthStream(length),writer=fixed.writable.getWriter();
  const pump=async()=>{
    try{
      for(const part of initial)await writer.write(part);
      if(!done)while(true){const part=await reader.read();if(part.done)break;await writer.write(part.value);}
      await writer.close();
    }catch(error){await writer.abort(error).catch(()=>{});throw error;}
  };
  await Promise.all([env.BUCKET.put(key,fixed.readable,{httpMetadata:{contentType:type.mime,cacheControl:'public, max-age=31536000, immutable'}}),pump()]);
  await env.DB.prepare('INSERT INTO media (key,mime,size,created_at) VALUES (?,?,?,?)').bind(key,type.mime,length,new Date().toISOString()).run();
  return json({url:`/${key}`,size:length,mime:type.mime},201);
}
async function serveUpload(request:Request,env:Env){
  const key=new URL(request.url).pathname.slice(1);
  if(!/^uploads\/[\w.-]+$/.test(key))return new Response('Not found',{status:404});
  const object=request.method==='HEAD'?await env.BUCKET.head(key):await env.BUCKET.get(key,{range:request.headers,onlyIf:request.headers});
  if(!object)return env.ASSETS.fetch(request);
  const headers=new Headers({'X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; sandbox",'Accept-Ranges':'bytes','ETag':object.httpEtag,'Cache-Control':'public, max-age=31536000, immutable'});
  object.writeHttpMetadata(headers);
  if(object.httpMetadata?.contentType==='application/pdf')headers.set('Content-Disposition','attachment');
  if(request.method==='HEAD'){headers.set('Content-Length',String(object.size));return new Response(null,{headers});}
  if(!('body' in object))return new Response(null,{status:304,headers});
  let status=200;
  if(object.range&&'offset' in object.range&&object.range.length){status=206;headers.set('Content-Range',`bytes ${object.range.offset}-${object.range.offset+object.range.length-1}/${object.size}`);headers.set('Content-Length',String(object.range.length));}
  else headers.set('Content-Length',String(object.size));
  return new Response(object.body as ReadableStream,{status,headers});
}
async function limit(request:Request,env:Env){
  const hour=Math.floor(Date.now()/3600000),ip=request.headers.get('cf-connecting-ip')||'unknown';
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip));
  const key=`${hour}:${Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('')}`;
  const rows=await env.DB.batch([
    env.DB.prepare('INSERT INTO request_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,(hour+1)*3600000),
    env.DB.prepare('DELETE FROM request_limits WHERE expires<?').bind(Date.now())
  ]);
  if(Number((rows[0].results[0] as any)?.count)>8)fail('Please try again later or contact us directly.',429);
}
async function saveMessage(request:Request,env:Env,subscribe:boolean){
  await limit(request,env);const value=await body(request);if(value.website)return json({success:true},201);
  if(typeof value.email!=='string'||value.email.length>254||!/^\S+@\S+\.\S+$/.test(value.email))fail('Enter a valid email address.');
  const record:Record<string,string>={id:crypto.randomUUID(),createdAt:new Date().toISOString(),email:value.email.trim()};
  for(const key of ['fullName','company','whatsapp','service','budget','timeline','message'])if(typeof value[key]==='string')record[key]=value[key].trim().slice(0,10000);
  if(!subscribe&&(!record.fullName||!record.message))fail('Please include your name and project details.');
  if(subscribe)await env.DB.prepare('INSERT INTO subscribers (email,payload,created_at) VALUES (?,?,?) ON CONFLICT(email) DO NOTHING').bind(record.email.toLowerCase(),JSON.stringify(record),record.createdAt).run();
  else await env.DB.prepare('INSERT INTO inquiries (id,payload,created_at) VALUES (?,?,?)').bind(record.id,JSON.stringify(record),record.createdAt).run();
  return json({success:true},201);
}
async function inbox(env:Env){
  const rows=await env.DB.batch([env.DB.prepare('SELECT payload FROM inquiries ORDER BY created_at DESC'),env.DB.prepare('SELECT payload FROM subscribers ORDER BY created_at DESC')]);
  return {inquiries:rows[0].results.map((r:any)=>JSON.parse(r.payload)),subscribers:rows[1].results.map((r:any)=>JSON.parse(r.payload))};
}
function backup(request:Request,env:Env){
  const stream=new TransformStream<Uint8Array,Uint8Array>(),writer=stream.writable.getWriter();
  let chain=Promise.resolve();
  const zip=new Zip((error,data,final)=>{chain=chain.then(async()=>{if(error)throw error;await writer.write(data);if(final)await writer.close();});chain.catch(()=>{});});
  const add=async(name:string,data:ReadableStream<Uint8Array>|Uint8Array)=>{
    const entry=new ZipPassThrough(name);zip.add(entry);
    if(data instanceof Uint8Array){entry.push(data,true);await chain;return;}
    const reader=data.getReader();try{while(true){const part=await reader.read();if(part.done)break;entry.push(part.value,false);await chain;}entry.push(new Uint8Array(),true);await chain;}finally{reader.releaseLock();}
  };
  const work=async()=>{
    try{
      const content=await readContent(env);
      await add('content.json',strToU8(JSON.stringify(content,null,2)));
      await add('inbox.json',strToU8(JSON.stringify(await inbox(env),null,2)));
      const included=new Set<string>();let cursor:string|undefined;
      do{const page=await env.BUCKET.list({prefix:'uploads/',cursor});for(const item of page.objects){const object=await env.BUCKET.get(item.key);if(object){await add(item.key,object.body);included.add(item.key);}}cursor=page.truncated?page.cursor:undefined;}while(cursor);
      // Include files supplied with the original website as well as later uploads.
      const originals=new Set(JSON.stringify(content).match(/\/uploads\/[\w.-]+/g)||[]);
      for(const path of originals){if(included.has(path.slice(1)))continue;const asset=await env.ASSETS.fetch(new Request(new URL(path,request.url)));if(asset.ok&&asset.body)await add(path.slice(1),asset.body);}
      await add('README.txt',strToU8('Website backup\n\ncontent.json contains published content. uploads/ contains all uploaded files. inbox.json contains private inquiries and subscribers. Keep this archive private.\n\nTo restore on this website: open Studio > Backups and choose this ZIP. Review the restored draft, then Publish changes.\n'));
      zip.end();await chain;
    }catch(error){zip.terminate();await writer.abort(error).catch(()=>{});}
  };
  void work();
  return new Response(stream.readable,{headers:{'Content-Type':'application/zip','Cache-Control':'private, no-store','Content-Disposition':`attachment; filename="digital-with-habib-backup-${new Date().toISOString().slice(0,10)}.zip"`}});
}
async function route(request:Request,env:Env){
  const url=new URL(request.url),path=url.pathname,method=request.method;
  if(path.startsWith('/uploads/')&&['GET','HEAD'].includes(method))return serveUpload(request,env);
  if(!path.startsWith('/api/')){
    let response=await env.ASSETS.fetch(request);
    if(response.status===404&&method==='GET'&&!path.split('/').pop()?.includes('.'))response=await env.ASSETS.fetch(new Request(new URL('/index.html',url),request));
    if(method==='GET'&&response.ok&&response.headers.get('content-type')?.includes('text/html')){
      const {settings}=await readContent(env);
      const escape=(value:string)=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
      let html=await response.text();
      html=html.replace(/<title>[^<]*<\/title>/,`<title>${escape(settings.seoTitle)}</title>`)
        .replace(/(<meta name="description" content=")[^"]*/,`$1${escape(settings.seoDescription)}`)
        .replace(/(<meta property="og:title" content=")[^"]*/,`$1${escape(settings.seoTitle)}`)
        .replace(/(<meta property="og:description" content=")[^"]*/,`$1${escape(settings.seoDescription)}`);
      const headers=new Headers(response.headers);headers.delete('content-length');headers.delete('etag');headers.set('Cache-Control','no-cache');
      return new Response(html,{status:response.status,headers});
    }
    return response;
  }
  if(!['GET','HEAD'].includes(method)){
    const origin=request.headers.get('origin');
    if((origin&&origin!==url.origin)||request.headers.get('sec-fetch-site')==='cross-site')fail('Request origin is not allowed.',403);
  }
  if(path==='/api/auth'&&method==='GET'){
    const authenticated=owner(request,env);
    return json({authenticated,configured:!!env.SITE_OWNER_EMAIL&&!!env.ADMIN_CSRF_SECRET,authMode:'chatgpt',signInUrl:'/signin-with-chatgpt?return_to=%2F%23%2Fadmin',signOutUrl:'/signout-with-chatgpt?return_to=%2F',csrf:authenticated?await csrf(request,env):undefined});
  }
  if(path==='/api/health'&&method==='GET')return json({status:'ok'});
  if(path==='/api/content'&&method==='GET')return json({data:await readContent(env)});
  if(path==='/api/inquiries'&&method==='POST')return saveMessage(request,env,false);
  if(path==='/api/subscribe'&&method==='POST')return saveMessage(request,env,true);
  await requireOwner(request,env);
  if(path==='/api/content'&&method==='PUT')return saveContent(request,env);
  if(path==='/api/upload'&&method==='POST')return upload(request,env);
  if(path==='/api/inbox'&&method==='GET')return json(await inbox(env));
  if(path==='/api/backup'&&method==='GET')return backup(request,env);
  return json({error:'API endpoint not found.'},404);
}
export default {
  async fetch(request:Request,env:Env){
    try{return await route(request,env);}catch(error:any){
      const status=error.status||500;if(status>=500)console.error('Studio request failed',error.message);
      return json({error:status>=500?'The website storage is temporarily unavailable. Your changes have not been saved. Please try again.':error.message},status);
    }
  }
};
