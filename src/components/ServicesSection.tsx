import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layout, 
  Code2, 
  Video, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  ChevronRight,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { STUDIO_SERVICES } from '../data/studioData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiry }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(STUDIO_SERVICES[0].id);

  // Icon mapping
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#146BFF]" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#146BFF]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#146BFF]" />;
      case 'Video':
        return <Video className="w-6 h-6 text-[#146BFF]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#146BFF]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#146BFF]" />;
    }
  };

  const currentService = STUDIO_SERVICES.find(s => s.id === selectedServiceId) || STUDIO_SERVICES[0];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F7F9FC] relative border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-[#146BFF] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Capabilities & Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#071A41] tracking-tight leading-[1.15] mb-4">
            Everything you need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#146BFF] to-[#00D2FF]">
              build and grow online.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
            Web & development starting from <strong className="text-[#0052FF]">$1,500</strong>. Video motion and storytelling tailored to your creative scope. Click on any service to inspect full deliverables and launch.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#0052FF] text-xs font-bold border border-blue-200/80 shadow-xs">
            <DollarSign className="w-3.5 h-3.5 text-[#0052FF]" />
            <span>Web & Development from $1,500 &bull; Motion & Storytelling on Creative Scope</span>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {STUDIO_SERVICES.map((service) => {
            const isSelected = selectedServiceId === service.id;
            const isMotionOrStory = service.id === 'video-motion' || service.id === 'ai-video';
            const isWebOrDev = service.id === 'web-development' || service.id === 'ui-ux-design';

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedServiceId(service.id)}
                className={`p-7 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white border-[#0052FF] shadow-xl shadow-blue-500/10 ring-2 ring-[#0052FF]/20'
                    : 'bg-white/90 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Starting Price Badge in Brand Color */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                      {renderIcon(service.icon)}
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200/80 shadow-xs">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-[#071A41] tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Subservice Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.subservices.slice(0, 4).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/50"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action: Ask about [Service] -> Goes automatically to next step! */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Est. {service.timeline}</span>
                    <span className="text-[#0052FF] font-black">
                      {isMotionOrStory ? 'Creative Scope' : isWebOrDev ? 'From $1,500' : 'From $1,000'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenInquiry(service.title);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#146BFF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0038b8] text-white font-bold text-xs tracking-wide shadow-md shadow-[#146BFF]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deep Dive Deliverables Detail Drawer for Selected Service */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-white border border-slate-200 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052FF] text-xs font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Scope Breakdown: {currentService.title}</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A41] mb-2">
                What you receive with {currentService.title}
              </h3>

              <p className="text-sm text-slate-500 mb-6">
                All production files, vector assets, and responsive components are delivered with 100% intellectual property ownership and 30-day post-launch hypercare.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentService.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0052FF] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div>
                  <span className="font-bold text-slate-700">Timeline:</span> {currentService.timeline}
                </div>
                <div>
                  <span className="font-bold text-slate-700">Investment:</span>{' '}
                  <span className="font-bold text-[#0052FF]">{currentService.startingPrice}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-left lg:text-right">
                <div className="text-xs text-slate-400 font-semibold uppercase">NEXT STEP</div>
                <div className="text-xl font-bold text-[#071A41]">Ready to discuss your project?</div>
                <div className="text-xs text-[#0052FF] font-bold mt-1">
                  {currentService.id === 'video-motion' || currentService.id === 'ai-video'
                    ? 'Creative scope with Habib directly'
                    : `Starting at ${currentService.id === 'brand-identity' ? '$1,000' : '$1,500'} with Habib directly`}
                </div>
              </div>
              
              <button
                onClick={() => onOpenInquiry(currentService.title)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#146BFF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0038b8] text-white font-bold text-sm tracking-tight shadow-lg shadow-[#146BFF]/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>{currentService.ctaText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
