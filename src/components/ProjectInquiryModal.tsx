import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const serviceOptions = [
    'Brand Identity',
    'UI/UX Design',
    'Web & App Development',
    'Video & Motion',
    'AI Video'
  ];

  // Exact pricing range requested: $1,000 to $5,000 (starting rate $1,000)
  const budgetOptions = [
    '$1,000 – $2,000',
    '$2,000 – $3,500',
    '$3,500 – $5,000',
    '$5,000+ (Enterprise / Retainer)'
  ];

  const timelineOptions = [
    'Within 2-4 Weeks',
    '1 – 2 Months',
    'Urgent (< 2 Weeks)',
    'Ongoing Retainer'
  ];

  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : ['Brand Identity']
  );

  useEffect(() => {
    if (preselectedService) {
      setSelectedServices([preselectedService]);
    }
  }, [preselectedService]);

  const [selectedBudget, setSelectedBudget] = useState<string>('$1,000 – $2,000');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('Within 2-4 Weeks');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (svc: string) => {
    if (selectedServices.includes(svc)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== svc));
      }
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handleWhatsAppSend = () => {
    const message = `Hello! I want to start a project with DWH Studio.%0A%0A*Name:* ${encodeURIComponent(fullName || 'Client')}%0A*Brand/Company:* ${encodeURIComponent(company || 'Not Specified')}%0A*Services:* ${encodeURIComponent(selectedServices.join(', '))}%0A*Budget Range:* ${encodeURIComponent(selectedBudget)}%0A*Timeline:* ${encodeURIComponent(selectedTimeline)}%0A*Project Brief:* ${encodeURIComponent(projectBrief || 'I would like to discuss our digital brand requirements.')}`;
    window.open(`https://wa.me/8801734144347?text=${message}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#071A41]/80 backdrop-blur-md">
        
        {/* Backdrop click dismiss */}
        <div 
          className="fixed inset-0" 
          onClick={onClose} 
          aria-hidden="true" 
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-slate-200 z-10 my-8 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <BrandLogo variant="icon" size="sm" />
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#071A41]">
                  Start A Project With DWH Studio
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Starting from $1,000 (Range: $1,000 – $5,000) &bull; Direct response
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-[#071A41] hover:bg-slate-200/60 transition-colors"
              aria-label="Close Inquiry Dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-[#071A41]">
                  Inquiry Received!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-[#071A41]">{fullName || 'friend'}</strong>. Our senior creative team has received your project details and budget ({selectedBudget}) and will reply promptly.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppSend}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Chat on WhatsApp Directly</span>
                  </button>
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-bold text-sm"
                  >
                    <span>Done</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Services selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    1. What do you need help with?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((svc) => {
                      const isSelected = selectedServices.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => toggleService(svc)}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                            isSelected
                              ? 'bg-[#146BFF] text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget range: Starting rate $1000, range $1000 to $5000 */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      2. Project Investment (Starting from $1,000)
                    </label>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Range: $1,000 – $5,000
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {budgetOptions.map((bud) => {
                      const isSelected = selectedBudget === bud;
                      return (
                        <button
                          type="button"
                          key={bud}
                          onClick={() => setSelectedBudget(bud)}
                          className={`p-3 rounded-xl text-xs sm:text-sm font-bold transition-all border text-left flex items-center justify-between ${
                            isSelected
                              ? 'border-[#146BFF] bg-blue-50/70 text-[#146BFF] shadow-xs'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{bud}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#146BFF]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Timeline */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    3. Target Timeline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timelineOptions.map((tl) => {
                      const isSelected = selectedTimeline === tl;
                      return (
                        <button
                          type="button"
                          key={tl}
                          onClick={() => setSelectedTimeline(tl)}
                          className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-center ${
                            isSelected
                              ? 'border-[#146BFF] bg-blue-50/70 text-[#146BFF]'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {tl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Client Contact Details */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    4. Contact Details
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm font-medium"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Brand or Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm font-medium"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="What are you trying to create? Tell us your vision, deadline, or references..."
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#146BFF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#0038b8] text-white font-bold text-sm shadow-md shadow-[#146BFF]/25 transition-all"
                  >
                    <span>Submit Project Details</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md shadow-[#25D366]/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Footer note */}
          <div className="px-6 sm:px-8 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>🔒 Starting rate: $1,000 (Range $1,000 – $5,000)</span>
            <span>DWH Studio</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
