import React from 'react';
import { useStudioContent } from '../context/StudioContentContext';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'stacked';
  theme?: 'dark' | 'light' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  className = ''
}) => {
  // Try reading custom uploaded logo from context if available
  let customLogoUrl: string | null = null;
  try {
    const ctx = useStudioContent();
    customLogoUrl = ctx?.settings?.customLogoUrl || null;
  } catch {
    // context not ready or outside provider
  }

  const sizeMap = {
    sm: { icon: 32, text: 'text-sm' },
    md: { icon: 42, text: 'text-base' },
    lg: { icon: 54, text: 'text-lg' },
    xl: { icon: 72, text: 'text-2xl' }
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  // If user uploaded a custom logo image, render it directly
  if (customLogoUrl) {
    return (
      <div className={`group inline-flex items-center gap-3 select-none ${className}`}>
        <img
          src={customLogoUrl}
          alt="DWH Studio Custom Logo"
          style={{ height: iconSize, width: 'auto' }}
          className="object-contain rounded-md"
        />
        {variant !== 'icon' && (
          <div className="flex flex-col leading-tight tracking-tight">
            <span className={`font-black ${textSize} ${theme === 'white' ? 'text-white' : 'text-[#071A41]'}`}>
              DWH
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'white' ? 'text-blue-300' : 'text-[#146BFF]'}`}>
              Studio
            </span>
          </div>
        )}
      </div>
    );
  }

  // SVG representation of the DWH Studio custom monogram badge
  const LogoIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="DWH Studio Monogram"
    >
      <defs>
        <linearGradient id="dwhGradTop" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="45%" stopColor="#146BFF" />
          <stop offset="100%" stopColor="#004AD9" />
        </linearGradient>

        <linearGradient id="dwhGradBottom" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#146BFF" />
          <stop offset="60%" stopColor="#0F54D4" />
          <stop offset="100%" stopColor="#0037A8" />
        </linearGradient>

        <filter id="dwhSoftGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#146BFF" floodOpacity="0.25" />
        </filter>
      </defs>

      <path
        d="M 16 19 
           C 16 11, 22 5, 30 5 
           L 68 5 
           C 84 5, 95 16, 95 32 
           L 95 62 
           C 95 72, 86 80, 76 77 
           C 68 74, 67 62, 67 52 
           C 67 36, 52 32, 34 32 
           C 25 32, 17 26, 16 19 Z"
        fill="url(#dwhGradTop)"
        filter="url(#dwhSoftGlow)"
      />

      <path
        d="M 8 36 
           C 8 31, 13 28, 17 31 
           L 79 93 
           C 81 95, 79 98, 76 98 
           L 32 98 
           C 18 98, 8 88, 8 74 
           Z"
        fill="url(#dwhGradBottom)"
      />

      <path
        d="M 12 30 L 76 94"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  const primaryTextColor = theme === 'white' ? 'text-white' : 'text-[#071A41]';
  const secondaryTextColor = theme === 'white' ? 'text-blue-300' : 'text-[#146BFF]';

  return (
    <div className={`group inline-flex items-center gap-3 select-none ${className}`}>
      {LogoIcon}
      <div className="flex flex-col leading-tight tracking-tight">
        <span className={`font-black ${textSize} ${primaryTextColor} tracking-tight`}>
          DWH
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${secondaryTextColor}`}>
          Studio
        </span>
      </div>
    </div>
  );
};
