let csrf='';
export function setCsrf(value:string){csrf=value;}
export async function api(path:string,options:RequestInit={}) {
  const response=await fetch(`/api${path}`,{...options,credentials:'same-origin',headers:{...(options.body?{'Content-Type':'application/json'}:{}),...(csrf?{'X-Admin-CSRF':csrf}:{}),...options.headers}});
  let result:any;
  try{result=await response.json();}catch{throw new Error('The website server is unavailable. Your changes have not been saved.');}
  if(!response.ok)throw Object.assign(new Error(result.error||'Unable to complete this request.'),{status:response.status});
  return result;
}
export function uploadFile(file:File,onProgress?:(progress:number)=>void):Promise<string>{
  if(file.size>100*1024*1024)return Promise.reject(new Error('Choose a file under 100 MB.'));
  return new Promise((resolve,reject)=>{
    const request=new XMLHttpRequest();request.open('POST','/api/upload');request.withCredentials=true;
    request.setRequestHeader('Content-Type','application/octet-stream');request.setRequestHeader('X-Upload-Size',String(file.size));request.setRequestHeader('X-Admin-CSRF',csrf);request.timeout=300000;
    request.upload.onprogress=e=>{if(e.lengthComputable)onProgress?.(Math.round(e.loaded/e.total*100));};
    request.onload=()=>{try{const result=JSON.parse(request.responseText);if(request.status>=200&&request.status<300&&result.url)resolve(result.url);else reject(new Error(result.error||'Upload failed.'));}catch{reject(new Error('Upload server is unavailable. File was not saved.'));}};
    request.onerror=()=>reject(new Error('Connection interrupted. Please retry the upload.'));
    request.ontimeout=()=>reject(new Error('Upload timed out. Please retry.'));request.send(file);
  });
}
