import React from 'react';
import {useStudioContent} from '../context/StudioContentContext';
export function Copy({id,children}:{id:string;children:React.ReactNode}){
 const {content,isEditMode,isAdmin,saveContent}=useStudioContent();const editing=isAdmin&&isEditMode;
 return <span data-copy-id={id} contentEditable={editing} suppressContentEditableWarning className={editing?'editable-copy':undefined} tabIndex={editing?0:undefined} onClick={editing?e=>e.stopPropagation():undefined} onKeyDown={editing?e=>{e.stopPropagation();if(e.key==='Escape')e.currentTarget.blur();}:undefined} onBlur={editing?e=>{const value=e.currentTarget.textContent||'';if(value!==content.copy[id])void saveContent({...content,copy:{...content.copy,[id]:value}}).catch(()=>{});}:undefined}>{content.copy[id]??children}</span>;
}
