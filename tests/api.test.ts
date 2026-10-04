import {test} from 'node:test';import assert from 'node:assert/strict';
import {spawn,ChildProcess} from 'node:child_process';import {randomBytes,scryptSync} from 'node:crypto';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {setTimeout as delay} from 'node:timers/promises';

test('owner authentication, uploads, conflicts, backups and restart persistence',async()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'dwh-api-'));const password=randomBytes(20).toString('hex'),salt=randomBytes(16).toString('hex');
 const port=34591,origin=`http://127.0.0.1:${port}`;let process:ChildProcess;let log='';
 const start=async()=>{process=spawn(globalThis.process.execPath,['--import','tsx','scripts/node-server.ts'],{env:{...globalThis.process.env,NODE_ENV:'production',PORT:String(port),STORAGE_DIR:directory,COOKIE_SECURE:'false',ADMIN_PASSWORD_HASH:`${salt}:${scryptSync(password,salt,64).toString('hex')}`},stdio:['ignore','pipe','pipe']});process.stdout?.on('data',d=>log+=d);process.stderr?.on('data',d=>log+=d);for(let i=0;i<100;i++){try{if((await fetch(`${origin}/api/health`)).ok)return;}catch{}await delay(50);}throw new Error(log);};
 const stop=()=>new Promise<void>(resolve=>{if(process.exitCode!==null)return resolve();process.once('exit',()=>resolve());process.kill('SIGTERM');});
 const call=(url:string,options:RequestInit={})=>fetch(origin+url,options);
 try{
  await start();
  assert.equal((await call('/api/content',{method:'PUT',headers:{'Content-Type':'application/json'},body:'{}'})).status,401);
  assert.equal((await call('/api/upload',{method:'POST',body:'test'})).status,401);
  assert.equal((await call('/api/backup')).status,401);
  assert.equal((await call('/api/inbox')).status,401);
  assert.equal((await call('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:'wrong'})})).status,401);
  const login=await call('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});assert.equal(login.status,200);
  const cookie=login.headers.get('set-cookie')!.split(';')[0],auth=await login.json() as any;
  const headers={'Cookie':cookie,'X-Admin-CSRF':auth.csrf,'Content-Type':'application/json'};
  assert.equal((await call('/api/content',{method:'PUT',headers:{Cookie:cookie,'Content-Type':'application/json'},body:'{}'})).status,403);
  assert.equal((await call('/api/content',{method:'PUT',headers:{...headers,Origin:'https://evil.example'},body:'{}'})).status,403);
  const invalid=await call('/api/upload',{method:'POST',headers:{...headers,'Content-Type':'application/octet-stream'},body:'<svg>evil</svg>'});assert.equal(invalid.status,415);
  const image=fs.readFileSync('public/favicon-32.png');
  const uploaded=await call('/api/upload',{method:'POST',headers:{...headers,'Content-Type':'application/octet-stream'},body:image});assert.equal(uploaded.status,201);const media=await uploaded.json() as any;assert.match(media.url,/^\/uploads\/[a-f0-9]{64}\.png$/);
  assert.deepEqual(Buffer.from(await (await call(media.url)).arrayBuffer()),image);
  const {data}=await (await call('/api/content')).json() as any;const old=structuredClone(data);
  data.projects=[{...data.projects[0],id:'uploaded-project',title:'Uploaded project',coverImage:media.url,images:[media.url]}];
  const saved=await call('/api/content',{method:'PUT',headers,body:JSON.stringify({data,revision:data.revision})});assert.equal(saved.status,200,await saved.clone().text());
  assert.equal((await call('/api/content',{method:'PUT',headers,body:JSON.stringify({data:old,revision:old.revision})})).status,409);
  const publicData=await (await call('/api/content')).json() as any;assert.equal(publicData.data.projects.length,1);assert.equal(publicData.data.projects[0].title,'Uploaded project');
  const inquiry=await call('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:'Test visitor',email:'test@example.com',message:'Test inquiry'})});assert.equal(inquiry.status,201);assert.equal(fs.readdirSync(path.join(directory,'inquiries')).length,1);
  assert.equal((await call('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'subscriber@example.com'})})).status,201);
  const inbox=await (await call('/api/inbox',{headers})).json() as any;assert.equal(inbox.inquiries[0].fullName,'Test visitor');assert.equal(inbox.subscribers.length,1);
  const backup=await call('/api/backup',{headers});assert.equal(backup.status,200);const bytes=Buffer.from(await backup.arrayBuffer());assert.equal(bytes.toString('ascii',0,2),'PK');assert.ok(bytes.includes(Buffer.from('content.json')));assert.ok(bytes.includes(Buffer.from(media.url.slice(1))));
  await stop();await start();
  const after=await (await call('/api/content')).json() as any;assert.equal(after.data.projects.length,1);assert.equal(after.data.projects[0].coverImage,media.url);assert.deepEqual(Buffer.from(await (await call(media.url)).arrayBuffer()),image);
  assert.equal((await call('/api/backup',{headers})).status,401,'Sessions expire on server restart');
 }finally{if(process!)await stop();fs.rmSync(directory,{recursive:true,force:true});}
});
