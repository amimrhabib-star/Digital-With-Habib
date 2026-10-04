import React from 'react';
import {Settings2,Eye,Type,Check,Loader2,AlertCircle} from 'lucide-react';
import {useStudioContent} from '../context/StudioContentContext';
export function AdminEditBar(){const {isAdmin,isEditMode,setIsEditMode,saveStatus,saveError}=useStudioContent();if(!isAdmin)return null;
 return <aside className="admin-toolbar" aria-label="Owner controls"><a href="#/admin"><Settings2 size={16}/> Studio editor</a><button onClick={()=>setIsEditMode(!isEditMode)}>{isEditMode?<Eye size={16}/>:<Type size={16}/>} {isEditMode?'Finish editing':'Edit page text'}</button><span role="status">{saveStatus==='saving'?<><Loader2 size={14}/> Saving…</>:saveStatus==='error'?<><AlertCircle size={14}/>{saveError}</>:saveStatus==='saved'?<><Check size={14}/> Saved</>:'Owner mode'}</span></aside>;
}
