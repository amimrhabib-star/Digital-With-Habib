import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { randomBytes, randomUUID, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';
import archiver from 'archiver';
import { createStore, atomicWrite } from './server/storage';
import { validateContent, mediaType } from './server/validation';

const root = process.cwd();
const production = process.env.NODE_ENV === 'production';
const storage = path.resolve(process.env.STORAGE_DIR || path.join(root, 'storage'));
const uploads = path.join(storage, 'uploads');
const inbox = path.join(storage, 'inquiries');
for (const dir of [uploads, inbox, path.join(storage,'subscribers')]) fs.mkdirSync(dir, {recursive:true});
const seed = JSON.parse(fs.readFileSync(path.join(root, 'data/studio_content.json'),'utf8'));
// One-time migration of the supplied uploads into the durable storage directory.
if(fs.existsSync(path.join(root,'public/uploads'))) for(const name of fs.readdirSync(path.join(root,'public/uploads'))) {
  const file=path.join(root,'public/uploads',name), target=path.join(uploads,name);
  if(fs.statSync(file).isFile() && !fs.existsSync(target)) fs.copyFileSync(file,target,fs.constants.COPYFILE_EXCL);
}
const store = createStore(storage, seed);
export const app = express();
app.disable('x-powered-by');
if(process.env.TRUST_PROXY_HOPS) app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS));
app.use((_req,res,next)=>{res.set({'X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()'});next();});
app.use('/api', (_req,res,next)=>{res.set('Cache-Control','no-store');next();});
app.use('/api', (req,res,next)=>{
  if(!['GET','HEAD','OPTIONS'].includes(req.method) && req.headers.origin) {
    const expected = process.env.APP_ORIGIN || `${req.protocol}://${req.get('host')}`;
    if(req.headers.origin!==expected) return res.status(403).json({error:'Request origin is not allowed.'});
  }
  next();
});
const sessions = new Map<string,{csrf:string;expires:number}>();
const attempts = new Map<string,{count:number;expires:number}>();
setInterval(()=>{
  for(const [k,v] of sessions) if(v.expires<Date.now()) sessions.delete(k);
  for(const [k,v] of attempts) if(v.expires<Date.now()) attempts.delete(k);
},60000).unref();
const hashToken=(token:string)=>createHash('sha256').update(token).digest('hex');
const getToken=(req:express.Request)=>(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('dwh_session='))?.slice(12)||'';
const getSession=(req:express.Request)=>{const session=sessions.get(hashToken(getToken(req)));return session && session.expires>Date.now()?session:null;};
function requireAdmin(req:express.Request,res:express.Response,next:express.NextFunction){
  const session=getSession(req);
  if(!session) return res.status(401).json({error:'Please sign in again. Your unsaved changes are still in the editor.'});
  if(!['GET','HEAD'].includes(req.method) && req.get('X-Admin-CSRF')!==session.csrf) return res.status(403).json({error:'Invalid session token. Please sign in again.'});
  next();
}
function limit(key:string,max:number,windowMs:number) {
  let value=attempts.get(key);
  if(!value || value.expires<Date.now()){value={count:0,expires:Date.now()+windowMs};attempts.set(key,value);}
  return ++value.count<=max;
}
const json=express.json({limit:'2mb'});
const passwordHash=process.env.ADMIN_PASSWORD_HASH||'';
const cookieOptions={httpOnly:true,sameSite:'strict' as const,secure:process.env.COOKIE_SECURE==='false'?false:production,path:'/api',maxAge:12*60*60*1000};
app.get('/api/auth', (req,res)=>{const session=getSession(req);res.json({authenticated:!!session,configured:!!passwordHash,csrf:session?.csrf});});
app.post('/api/auth/login',json,(req,res)=>{
  if(!passwordHash) return res.status(503).json({error:'Owner login is not configured. Complete the one-time setup described in START-HERE.md.'});
  if(!limit(`login:${req.ip}`,10,15*60000)) return res.status(429).json({error:'Too many sign-in attempts. Please try again in 15 minutes.'});
  const password=req.body?.password;
  if(typeof password!=='string'||password.length>256) return res.status(400).json({error:'Enter your password.'});
  const [salt,expected]=passwordHash.split(':');
  const actual=scryptSync(password,salt||'',64), known=Buffer.from(expected||'','hex');
  if(actual.length!==known.length||!timingSafeEqual(actual,known)) return res.status(401).json({error:'Incorrect password.'});
  sessions.delete(hashToken(getToken(req)));
  const token=randomBytes(32).toString('hex'), csrf=randomBytes(32).toString('hex');
  sessions.set(hashToken(token),{csrf,expires:Date.now()+cookieOptions.maxAge});
  res.cookie('dwh_session',token,cookieOptions).json({authenticated:true,csrf});
});
app.post('/api/auth/logout',requireAdmin,(_req,res)=>{sessions.delete(hashToken(getToken(_req)));res.clearCookie('dwh_session',cookieOptions).json({success:true});});
app.get('/api/health',(_req,res)=>res.json({status:'ok'}));
app.get('/api/content',(_req,res)=>res.json({data:store.read()}));
app.put('/api/content',requireAdmin,json,(req,res,next)=>{
  try{const data=validateContent(req.body?.data);res.json({data:store.save(data,req.body?.revision)});}catch(err){next(err);}
});
let activeUploads=0;
app.post('/api/upload',requireAdmin,async(req,res,next)=>{
  if(activeUploads>=2) return res.status(429).json({error:'Two files are uploading. Please wait a moment.'});
  activeUploads++;
  const temporary=path.join(uploads,`.${randomUUID()}.tmp`);
  let size=0;let header=Buffer.alloc(0);const hash=createHash('sha256');
  try {
    const maxBytes=100*1024*1024;
    if(Number(req.headers['content-length'])>maxBytes) throw Object.assign(new Error('Choose a file under 100 MB.'),{status:413});
    await pipeline(req,new Transform({transform(chunk,_,callback){
      size+=chunk.length;
      if(size>maxBytes) return callback(Object.assign(new Error('Choose a file under 100 MB.'),{status:413}));
      if(header.length<4096) header=Buffer.concat([header,chunk]).subarray(0,4096);
      hash.update(chunk);callback(null,chunk);
    }}),fs.createWriteStream(temporary,{flags:'wx',mode:0o600}));
    const type=mediaType(header);
    if(!type) throw Object.assign(new Error('Use JPG, PNG, WebP, GIF, MP4, WebM, or PDF. SVG and executable files are not accepted.'),{status:415});
    const name=`${hash.digest('hex')}.${type.ext}`;
    const fd=fs.openSync(temporary,'r');try{fs.fsyncSync(fd);}finally{fs.closeSync(fd);}
    fs.renameSync(temporary,path.join(uploads,name));
    const dirfd=fs.openSync(uploads,'r');try{fs.fsyncSync(dirfd);}finally{fs.closeSync(dirfd);}
    res.status(201).json({url:`/uploads/${name}`,size,mime:type.mime});
  }catch(err){next(err);}finally{activeUploads--;if(fs.existsSync(temporary))fs.unlinkSync(temporary);}
});
app.use('/uploads',express.static(uploads,{dotfiles:'deny',immutable:true,maxAge:'1y',fallthrough:false,setHeaders(res,file){
  res.setHeader('Content-Security-Policy',"default-src 'none'; sandbox");
  if(file.endsWith('.pdf'))res.setHeader('Content-Disposition','attachment');
}}));
function saveMessage(type:'inquiries'|'subscribers',req:express.Request,res:express.Response,next:express.NextFunction){
  try{
    if(!limit(`message:${req.ip}`,8,60*60000))return res.status(429).json({error:'Please try again later or contact us directly.'});
    const body=req.body;
    if(body?.website) return res.status(201).json({success:true});
    if(typeof body?.email!=='string'||body.email.length>254||!/^\S+@\S+\.\S+$/.test(body.email))throw Object.assign(new Error('Enter a valid email address.'),{status:400});
    const record:Record<string,string>={id:randomUUID(),createdAt:new Date().toISOString(),email:body.email.trim()};
    for(const key of ['fullName','company','whatsapp','service','budget','timeline','message'])if(typeof body[key]==='string')record[key]=body[key].trim().slice(0,10000);
    if(type==='inquiries'&&(!record.fullName||!record.message))throw Object.assign(new Error('Please include your name and project details.'),{status:400});
    const name=type==='subscribers'?hashToken(record.email.toLowerCase()):record.id;
    atomicWrite(path.join(storage,type,`${name}.json`),record);
    res.status(201).json({success:true});
  }catch(err){next(err);}
}
app.post('/api/inquiries',json,(req,res,next)=>saveMessage('inquiries',req,res,next));
app.post('/api/subscribe',json,(req,res,next)=>saveMessage('subscribers',req,res,next));
app.get('/api/inbox',requireAdmin,(_req,res)=>{
  const read=(dir:string)=>fs.readdirSync(path.join(storage,dir)).filter(n=>n.endsWith('.json')).map(n=>JSON.parse(fs.readFileSync(path.join(storage,dir,n),'utf8'))).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  res.json({inquiries:read('inquiries'),subscribers:read('subscribers')});
});
app.get('/api/backup',requireAdmin,(_req,res)=>{
  res.attachment(`digital-with-habib-backup-${new Date().toISOString().slice(0,10)}.zip`);
  const archive=archiver('zip',{zlib:{level:1}});
  archive.on('error',()=>res.destroy());res.on('close',()=>archive.abort());archive.pipe(res);
  archive.append(JSON.stringify(store.read(),null,2),{name:'content.json'});
  archive.directory(uploads,'uploads');archive.directory(inbox,'inquiries');archive.directory(path.join(storage,'subscribers'),'subscribers');
  archive.finalize();
});
app.use('/api',(_req,res)=>res.status(404).json({error:'API endpoint not found.'}));

export async function start(){
  if(!production){const {createServer}=await import('vite');const vite=await createServer({server:{middlewareMode:true},appType:'spa'});app.use(vite.middlewares);}
  else{
    const dist=path.join(root,'dist/client');
    app.use(express.static(dist,{index:false,dotfiles:'deny',setHeaders(res,file){if(file.endsWith('.html'))res.setHeader('Cache-Control','no-cache');}}));
    app.get('*',(req,res)=>{if(path.extname(req.path))return res.status(404).send('Not found');res.set('Cache-Control','no-cache').sendFile(path.join(dist,'index.html'));});
  }
  app.use((err:any,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{
    const status=err.status||500;
    if(status>=500)console.error(err);
    if(!res.headersSent)res.status(status).json({error:status>=500?'The server could not save this change. Please try again.':err.message});
  });
  app.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log(`Digital With Habib: http://localhost:${process.env.PORT||3000}`));
}

