import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {createStore} from '../server/storage';
import {validateContent,mediaType} from '../server/validation';
const seed=JSON.parse(fs.readFileSync('data/studio_content.json','utf8'));
test('saved content and deliberate deletions survive reopening the store',()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'dwh-store-'));
 try{const store=createStore(directory,seed);const next=structuredClone(store.read());next.projects=[];store.save(next,1);const reopened=createStore(directory,seed);assert.deepEqual(reopened.read().projects,[]);assert.equal(reopened.read().revision,2);assert.equal(fs.readdirSync(store.backupDir).length,1);}finally{fs.rmSync(directory,{recursive:true,force:true});}
});
test('stale saves do not overwrite a newer publication',()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'dwh-store-'));
 try{const store=createStore(directory,seed);const older=store.read();store.save({...older,copy:{headline:'New text'}},1);assert.throws(()=>store.save(older,1),/Another session/);assert.equal(store.read().copy.headline,'New text');}finally{fs.rmSync(directory,{recursive:true,force:true});}
});
test('unreadable content is never silently reset to demo content',()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'dwh-store-'));try{fs.writeFileSync(path.join(directory,'content.json'),'{broken');assert.throws(()=>createStore(directory,seed));assert.equal(fs.readFileSync(path.join(directory,'content.json'),'utf8'),'{broken');}finally{fs.rmSync(directory,{recursive:true,force:true});}
});
test('schema rejects dangerous links, embedded media and malformed projects',()=>{
 assert.equal(validateContent(structuredClone(seed)).projects.length,seed.projects.length);
 for(const bad of ['javascript:alert(1)','data:image/png;base64,aaaa','blob:invalid']){const next=structuredClone(seed);next.projects[0].coverImage=bad;assert.throws(()=>validateContent(next));}
 const invalid=structuredClone(seed);invalid.projects[0].caseStudy=null;assert.throws(()=>validateContent(invalid));
 const duplicate=structuredClone(seed);duplicate.projects.push(duplicate.projects[0]);assert.throws(()=>validateContent(duplicate),/unique/);
});
test('file validation checks actual bytes, rejecting HTML and SVG',()=>{
 assert.equal(mediaType(Buffer.from('<script>alert(1)</script>')),null);
 assert.equal(mediaType(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>')),null);
 assert.equal(mediaType(Buffer.from([137,80,78,71,13,10,26,10]))?.mime,'image/png');
});
