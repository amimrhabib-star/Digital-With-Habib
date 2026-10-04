import { Copy } from './Copy';
import React from 'react';
import {useStudioContent} from '../context/StudioContentContext';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const {settings}=useStudioContent();
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      <a
        href={`https://wa.me/${settings.phoneWhatsApp.replace(/[^0-9]/g,'')}?text=Hello!%20I%20would%20like%20to%20discuss%20a%20project.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-[#25D366]/35 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
        aria-label="Chat on WhatsApp with Digital With Habib"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs sm:text-sm font-bold tracking-tight"><Copy id="Floating Whats App · 01">Chat on WhatsApp</Copy></span>
      </a>
    </div>
  );
};
