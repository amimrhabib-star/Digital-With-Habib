import React from 'react';
import {motion,useMotionValue,useSpring,useReducedMotion} from 'motion/react';
import {useStudioContent} from '../context/StudioContentContext';
export const Movable3DLogo:React.FC<{className?:string;onOpenInquiry?:()=>void}>=({className=''})=>{
 const {settings}=useStudioContent();const reduced=useReducedMotion();const moving=!reduced&&settings.logoMotionEnabled!==false;
 const x=useMotionValue(0),y=useMotionValue(0);const rx=useSpring(x,{stiffness:100,damping:20}),ry=useSpring(y,{stiffness:100,damping:20});
 return <div className={`logo-stage relative isolate flex items-center justify-center w-full aspect-square max-w-[490px] mx-auto ${className}`} style={{perspective:1200}} onPointerMove={e=>{if(!moving||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();x.set(-(e.clientY-r.top-r.height/2)/22);y.set((e.clientX-r.left-r.width/2)/22);}} onPointerLeave={()=>{x.set(0);y.set(0);}}>
   <div className="absolute inset-[8%] rounded-full bg-blue-400/10 blur-3xl" aria-hidden="true" />
   <div className="logo-orbit absolute inset-[7%] rounded-full border border-blue-300/40" aria-hidden="true" />
   <div className="logo-orbit logo-orbit-second absolute inset-[1%] rounded-full border border-cyan-200/50" aria-hidden="true" />
   <motion.div className="relative w-[88%]" style={{rotateX:rx,rotateY:ry,transformStyle:'preserve-3d'}}>
     <motion.img src={settings.logoMotionCustomLogoUrl||settings.customLogoUrl||'/brand/logo.webp'} alt={`${settings.brandName||'Digital With Habib'} — blue glass brand mark`} width="1000" height="884" fetchPriority="high" draggable={false} className="w-full h-auto select-none drop-shadow-[0_30px_30px_rgba(0,82,255,0.25)]" animate={moving?{y:[0,-13,0],rotateZ:[-3,2,-3]}:{y:0,rotateZ:0}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}} />
   </motion.div>
   <div className="absolute bottom-[3%] w-[45%] h-5 rounded-[100%] bg-blue-600/15 blur-xl" aria-hidden="true" />
 </div>;
};
