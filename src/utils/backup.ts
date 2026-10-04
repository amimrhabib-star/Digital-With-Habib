import {Unzip,UnzipInflate,strFromU8} from 'fflate';
import {uploadFile} from './api';

/** Restores files through the normal owner-only upload API; content stays a draft. */
export async function restoreBackup(file:File,onProgress:(message:string)=>void){
 if(file.name.toLowerCase().endsWith('.json'))return JSON.parse(await file.text());
 let content:any;let queue=Promise.resolve();let failure:Error|undefined;let total=0;let count=0;
 const replacements=new Map<string,string>();
 const unzip=new Unzip(entry=>{
   if(entry.name!=='content.json'&&!/^uploads\/[\w.-]+$/.test(entry.name))return;
   if(++count>2000)throw new Error('This backup contains too many files.');
   const chunks:Uint8Array[]=[];let size=0;
   entry.ondata=(error,data,final)=>{
     if(error){failure=error;return;}
     size+=data.length;total+=data.length;
     if(size>100*1024*1024||total>1024*1024*1024){failure=new Error('Each file must be under 100 MB; each restore must be under 1 GB.');entry.terminate();return;}
     chunks.push(data);
     if(final){
       queue=queue.then(async()=>{
         if(failure)throw failure;
         if(entry.name==='content.json'){
           if(size>2*1024*1024)throw new Error('The content backup is too large.');
           const bytes=new Uint8Array(size);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}content=JSON.parse(strFromU8(bytes));
         }else{
           onProgress(`Restoring ${entry.name.split('/').pop()}…`);
           const media=new File(chunks as BlobPart[],entry.name.split('/').pop()!);
           replacements.set(`/${entry.name}`,await uploadFile(media));
         }
       });
       queue.catch(()=>{});
     }
   };
   entry.start();
 });
 unzip.register(UnzipInflate);
 const reader=file.stream().getReader();
 try{
   while(true){const part=await reader.read();if(part.done)break;unzip.push(part.value,false);await queue;if(failure)throw failure;}
   unzip.push(new Uint8Array(),true);await queue;if(failure)throw failure;
 }finally{await reader.cancel();}
 if(!content?.projects||!content?.settings)throw new Error('This ZIP does not contain a valid content.json backup.');
 const remap=(value:any):any=>typeof value==='string'?(replacements.get(value)||value):Array.isArray(value)?value.map(remap):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,v])=>[key,remap(v)])):value;
 return remap(content);
}
