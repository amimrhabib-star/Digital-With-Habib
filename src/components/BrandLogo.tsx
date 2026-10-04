import React from 'react';
import {useStudioContent} from '../context/StudioContentContext';
export const BrandLogo:React.FC<{variant?:'full'|'icon'|'stacked';theme?:'dark'|'light'|'white';size?:'sm'|'md'|'lg'|'xl';className?:string}>=({variant='full',theme='dark',size='md',className=''})=>{
 const {settings}=useStudioContent();const sizes={sm:32,md:42,lg:54,xl:72};
 return <span className={`inline-flex items-center gap-3 select-none ${className}`}><img src={settings.customLogoUrl||'/brand/logo.webp'} alt={variant==='icon'?'Digital With Habib':''} width={sizes[size]} height={sizes[size]} className="object-contain shrink-0" />{variant!=='icon'&&<span className={`font-black tracking-tight text-base sm:text-lg ${theme==='white'?'text-white':'text-[var(--brand-ink)]'}`}>{settings.brandName||'Digital With Habib'}</span>}</span>;
};
