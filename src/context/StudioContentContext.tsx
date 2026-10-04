import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import defaults from '../data/defaultContent.json';
import {ProjectItem,StudioCustomSettings,TeamSpecialist,FounderInfo,ClientLogoItem,HaloClientAvatar,ServiceItem} from '../types';
import {api,setCsrf} from '../utils/api';
export type Content = {projects:ProjectItem[];settings:StudioCustomSettings & Record<string,any>;teamSpecialists:TeamSpecialist[];founderData:FounderInfo;clientLogos:ClientLogoItem[];haloAvatars:HaloClientAvatar[];services:ServiceItem[];stories:any[];sections:Record<string,any[]>;copy:Record<string,string>;revision:number;[key:string]:any};
export const defaultContent=defaults as unknown as Content;
export function isMediaCustom(url?:string|null){return !!url && !url.includes('images.unsplash.com');}
function useContentState(){
  const [content,setContent]=useState<Content>(defaultContent);
  const contentRef=useRef(content);const saving=useRef(false);
  const [isHydrated,setHydrated]=useState(false),[loadError,setLoadError]=useState('');
  const [authMode,setAuthMode]=useState('password');
  const [isAdmin,setAdmin]=useState(false),[configured,setConfigured]=useState(true),[isEditMode,setEditMode]=useState(false);
  const [saveStatus,setSaveStatus]=useState<'idle'|'saving'|'saved'|'error'>('idle');const [saveError,setSaveError]=useState('');
  const apply=(data:Content)=>{contentRef.current=data;setContent(data);};
  const reloadContent=async()=>{const result=await api('/content');apply(result.data);setLoadError('');setHydrated(true);return result.data as Content;};
  useEffect(()=>{
    let active=true;
    api('/content').then(({data})=>{if(active){apply(data);setHydrated(true);}}).catch(e=>{if(active){setLoadError(e.message);setHydrated(true);}});
    api('/auth').then(result=>{if(active){setAuthMode(result.authMode||'password');setAdmin(result.authenticated);setConfigured(result.configured);setCsrf(result.csrf||'');}}).catch(()=>{});
    return()=>{active=false;};
  },[]);
  const login=async(password:string)=>{const result=await api('/auth/login',{method:'POST',body:JSON.stringify({password})});setCsrf(result.csrf);setAdmin(true);await reloadContent();};
  const logout=async()=>{if(authMode==='chatgpt'){window.location.href='/signout-with-chatgpt?return_to=%2F';return;}await api('/auth/logout',{method:'POST'});setCsrf('');setAdmin(false);setEditMode(false);};
  const saveContent=async(next:Content)=>{
    if(!isAdmin)throw new Error('Sign in to edit your website.');
    if(saving.current)throw new Error('A save is still in progress. Please wait.');
    saving.current=true;setSaveStatus('saving');setSaveError('');
    try{const result=await api('/content',{method:'PUT',body:JSON.stringify({revision:next.revision,data:next})});apply(result.data);setSaveStatus('saved');return result.data as Content;}
    catch(e:any){setSaveStatus('error');setSaveError(e.message);throw e;}
    finally{saving.current=false;}
  };
  const patch=async(partial:Partial<Content>)=>saveContent({...contentRef.current,...partial});
  // Legacy inline controls use the same authenticated, acknowledged save route.
  const change=(key:string,fn:(value:any)=>any)=>{if(!isAdmin)return;void patch({[key]:fn(contentRef.current[key])}).catch(()=>{});};
  const updateSettings=(partial:Partial<StudioCustomSettings>)=>change('settings',(value:any)=>({...value,...partial}));
  const updateProject=(project:ProjectItem)=>change('projects',(items:ProjectItem[])=>items.map(p=>p.id===project.id?project:p));
  const updateProjectMedia=(id:string,field:string,url:string)=>change('projects',(items:ProjectItem[])=>items.map(p=>p.id===id?{...p,[field]:url}:p));
  const updateItem=(key:string,id:string,data:any)=>change(key,(items:any[])=>items.map(p=>p.id===id?{...p,...data}:p));
  const exportBackup=()=>{window.location.href='/api/backup';};
  return {content, ...content, isHydrated,loadError,isAdmin,configured,authMode,isEditMode,setIsEditMode:(value:boolean)=>setEditMode(isAdmin&&value),saveContent,reloadContent,saveStatus,saveError,login,logout,
    updateSettings,updateProject,updateProjectMedia,
    addProject:(project:ProjectItem)=>change('projects',(items:any[])=>[project,...items]),
    deleteProject:(id:string)=>change('projects',(items:any[])=>items.filter(p=>p.id!==id)),
    addProjectImage:(id:string,url:string)=>change('projects',(items:ProjectItem[])=>items.map(p=>p.id===id?{...p,images:[...p.images,url]}:p)),
    replaceProjectImage:(id:string,index:number,url:string)=>change('projects',(items:ProjectItem[])=>items.map(p=>p.id===id?{...p,images:p.images.map((v,i)=>i===index?url:v)}:p)),
    removeProjectImage:(id:string,index:number)=>change('projects',(items:ProjectItem[])=>items.map(p=>p.id===id?{...p,images:p.images.filter((_,i)=>i!==index)}:p)),
    updateTeamSpecialist:(id:string,data:Partial<TeamSpecialist>)=>updateItem('teamSpecialists',id,data),
    updateTeamSpecialistPhoto:(id:string,url:string)=>updateItem('teamSpecialists',id,{image:url}),
    addTeamSpecialist:(member:TeamSpecialist)=>change('teamSpecialists',(items:any[])=>[...items,member]),
    removeTeamSpecialist:(id:string)=>change('teamSpecialists',(items:any[])=>items.filter(p=>p.id!==id)),
    updateFounderData:(data:Partial<FounderInfo>)=>change('founderData',(value:any)=>({...value,...data})),
    updateFounderPhoto:(url:string)=>change('founderData',(value:any)=>({...value,image:url})),
    updateClientLogo:(id:string,data:Partial<ClientLogoItem>)=>updateItem('clientLogos',id,data),
    updateClientLogoImage:(id:string,url:string)=>updateItem('clientLogos',id,{logoUrl:url}),
    addClientLogo:(client:ClientLogoItem)=>change('clientLogos',(items:any[])=>[...items,client]),
    removeClientLogo:(id:string)=>change('clientLogos',(items:any[])=>items.filter(p=>p.id!==id)),
    updateHaloAvatar:(id:string,data:Partial<HaloClientAvatar>)=>updateItem('haloAvatars',id,data),
    updateHaloAvatarPhoto:(id:string,url:string)=>updateItem('haloAvatars',id,{avatar:url}),
    updateWebsiteLogo:(url:string)=>updateSettings({customLogoUrl:url}),removeWebsiteLogo:()=>updateSettings({customLogoUrl:'/brand/logo.webp'}),saveWebsiteLogo:(url:string|null)=>updateSettings({customLogoUrl:url||'/brand/logo.webp'}),
    updateHeroCardMedia:(url:string)=>updateSettings({heroCardVideoUrl:url}),updateBrandStoryVideo:(url:string,cover?:string)=>updateSettings({brandStoryVideoUrl:url,...(cover?{brandStoryVideoCover:cover}:{})}),
    resetToDefaults:async()=>{await saveContent({...defaultContent,revision:contentRef.current.revision});},
    exportBackup,importBackup:async(raw:string)=>{try{await saveContent({...JSON.parse(raw),revision:contentRef.current.revision});return true;}catch{return false;}},
  };
}
const StudioContentContext=createContext<ReturnType<typeof useContentState>|null>(null);
export function StudioContentProvider({children}:{children:React.ReactNode}){return <StudioContentContext.Provider value={useContentState()}>{children}</StudioContentContext.Provider>;}
export function useStudioContent(){const value=useContext(StudioContentContext);if(!value)throw new Error('StudioContentProvider is required.');return value;}
