import {useEffect,useRef} from 'react';
import {getLenis} from './useSmoothScroll';
export function useDialog(open:boolean,onClose:()=>void){
 const ref=useRef<HTMLDivElement>(null),close=useRef(onClose);close.current=onClose;
 useEffect(()=>{
  if(!open)return;const previous=document.activeElement as HTMLElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';getLenis()?.stop();
  const focus=()=>Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]')||[]).filter(e=>e.getClientRects().length>0);
  const timer=setTimeout(()=>{(focus()[0]||ref.current)?.focus();},20);
  const handle=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.stopPropagation();close.current();}if(e.key==='Tab'){const items=focus(),first=items[0],last=items.at(-1);if(!items.length){e.preventDefault();return;}if(e.shiftKey&&(document.activeElement===first||!ref.current?.contains(document.activeElement))){e.preventDefault();last?.focus();}else if(!e.shiftKey&&(document.activeElement===last||!ref.current?.contains(document.activeElement))){e.preventDefault();first?.focus();}}};
  document.addEventListener('keydown',handle,true);return()=>{clearTimeout(timer);document.removeEventListener('keydown',handle,true);document.body.style.overflow=overflow;getLenis()?.start();previous?.focus();};
 },[open]);return ref;
}
