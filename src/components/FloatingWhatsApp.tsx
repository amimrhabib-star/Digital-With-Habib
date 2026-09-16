import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      <a
        href="https://wa.me/8801734144347?text=Hello!%20I%20would%20like%20to%20discuss%20a%20project%20with%20DWH%20Studio."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-[#25D366]/35 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
        aria-label="Chat on WhatsApp with DWH Studio"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs sm:text-sm font-bold tracking-tight">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
