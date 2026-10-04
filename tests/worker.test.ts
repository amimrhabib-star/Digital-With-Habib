import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Miniflare} from 'miniflare';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {unzipSync} from 'fflate';

test('hosted owner permissions, durable D1/R2 uploads, concurrent saves and complete backups',async()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'dwh-worker-'));
 const create=()=>new Miniflare({modules:true,scriptPath:'dist/server/index.js',compatibilityDate:'2025-01-01',d1Databases:['DB'],r2Buckets:['BUCKET'],d1Persist:path.join(directory,'db'),r2Persist:path.join(directory,'r2'),bindings:{SITE_OWNER_EMAIL:'owner@example.com',ADMIN_CSRF_SECRET:'integration-test-secret-only'},serviceBindings:{ASSETS:async()=>new Response('Not found',{status:404})}});
 let mf=create();const owner={'oai-authenticated-user-id':'owner-id','oai-authenticated-user-email':'owner@example.com'};
 const call=(route:string,options:any={})=>mf.dispatchFetch(`https://studio.test${route}`,options);
 try{
  const db=await mf.getD1Database('DB');
  for(const file of fs.readdirSync('drizzle').filter(f=>f.endsWith('.sql')))for(const sql of fs.readFileSync(`drizzle/${file}`,'utf8').split('--> statement-breakpoint'))await db.prepare(sql.trim()).run();
  const original=await (await call('/api/content')).json() as any;
  assert.equal(original.data.projects.length,14);
  for(const endpoint of ['/api/inbox','/api/backup'])assert.equal((await call(endpoint)).status,401);
  assert.equal((await call('/api/upload',{method:'POST',body:'forbidden'})).status,401);
  assert.equal((await call('/api/content',{method:'PUT',headers:{...owner,'oai-authenticated-user-email':'visitor@example.com'},body:'{}'})).status,401);
  const auth=await (await call('/api/auth',{headers:owner})).json() as any;
  assert.equal(auth.authenticated,true);assert.equal(auth.authMode,'chatgpt');
  const headers={...owner,'x-admin-csrf':auth.csrf,'Content-Type':'application/json',Origin:'https://studio.test'};
  assert.equal((await call('/api/content',{method:'PUT',headers:owner,body:'{}'})).status,403);
  assert.equal((await call('/api/content',{method:'PUT',headers:{...headers,Origin:'https://evil.test'},body:'{}'})).status,403);
  const uploadHeaders={...headers,'Content-Type':'application/octet-stream'};
  assert.equal((await call('/api/upload',{method:'POST',headers:{...uploadHeaders,'X-Upload-Size':'17'},body:'<svg>unsafe</svg>'})).status,415);
  const bytes=fs.readFileSync('public/favicon-32.png');
  const upload=await call('/api/upload',{method:'POST',headers:{...uploadHeaders,'X-Upload-Size':String(bytes.length)},body:bytes});assert.equal(upload.status,201,await upload.clone().text());
  const media=await upload.json() as any;
  assert.deepEqual(Buffer.from(await(await call(media.url)).arrayBuffer()),bytes);
  const range=await call(media.url,{headers:{Range:'bytes=0-7'}});assert.equal(range.status,206);assert.deepEqual(Buffer.from(await range.arrayBuffer()),bytes.subarray(0,8));
  const data={...original.data,projects:[{...original.data.projects[0],id:'durable-project',coverImage:media.url,images:[media.url],title:'Durable uploaded project'}]};
  const changes=JSON.stringify({revision:0,data});
  const saves=await Promise.all([call('/api/content',{method:'PUT',headers,body:changes}),call('/api/content',{method:'PUT',headers,body:changes})]);
  assert.deepEqual(saves.map(r=>r.status).sort(),[200,409]);
  assert.equal((await call('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:'Test visitor',email:'visitor@example.com',message:'A test project'})})).status,201);
  assert.equal((await call('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'newsletter@example.com'})})).status,201);
  const inbox=await(await call('/api/inbox',{headers})).json() as any;assert.equal(inbox.inquiries.length,1);assert.equal(inbox.subscribers.length,1);
  const backup=await call('/api/backup',{headers});assert.equal(backup.status,200);const files=unzipSync(new Uint8Array(await backup.arrayBuffer()));
  assert.ok(files['content.json']);assert.ok(files['inbox.json']);assert.deepEqual(Buffer.from(files[media.url.slice(1)]),bytes);
  await mf.dispose();mf=create();
  const after=await(await call('/api/content')).json() as any;assert.equal(after.data.projects.length,1);assert.equal(after.data.projects[0].title,'Durable uploaded project');assert.equal(after.data.revision,1);
  assert.deepEqual(Buffer.from(await(await call(media.url)).arrayBuffer()),bytes);
 }finally{await mf.dispose();fs.rmSync(directory,{recursive:true,force:true});}
});
