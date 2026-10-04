import { Copy } from './Copy';
import {useStudioContent} from '../context/StudioContentContext';
import {useDialog} from '../hooks/useDialog';
import {api} from '../utils/api';
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
  const {settings,content}=useStudioContent();
  const dialogRef=useDialog(isOpen,onClose);
  useEffect(()=>{if(isOpen){setIsSubmitted(false);setFormError('');}},[isOpen]);
  const serviceOptions = content.sections.services.map(s=>s.title);
  const budgetOptions = settings.budgetOptions;
  const timelineOptions = settings.timelineOptions;

  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService&&serviceOptions.includes(preselectedService) ? [preselectedService] : [serviceOptions[0]||'General inquiry']
  );

  useEffect(() => {
    setSelectedServices([preselectedService&&serviceOptions.includes(preselectedService)?preselectedService:serviceOptions[0]||'General inquiry']);
  }, [preselectedService]);

  const [selectedBudget, setSelectedBudget] = useState<string>(budgetOptions[0]||'Let’s discuss');
  const [selectedTimeline, setSelectedTimeline] = useState<string>(timelineOptions[0]||'Flexible');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [formError,setFormError]=useState('');
  const [submitting,setSubmitting]=useState(false);
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
    const message = `Hello! I want to start a project with Digital With Habib.%0A%0A*Name:* ${encodeURIComponent(fullName || 'Client')}%0A*Brand/Company:* ${encodeURIComponent(company || 'Not Specified')}%0A*Services:* ${encodeURIComponent(selectedServices.join(', '))}%0A*Budget Range:* ${encodeURIComponent(selectedBudget)}%0A*Timeline:* ${encodeURIComponent(selectedTimeline)}%0A*Project Brief:* ${encodeURIComponent(projectBrief || 'I would like to discuss our digital brand requirements.')}`;
    window.open(`https://wa.me/${settings.phoneWhatsApp.replace(/[^0-9]/g,'')}?text=${message}`, '_blank','noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true);setFormError('');
    try{await api('/inquiries',{method:'POST',body:JSON.stringify({fullName,email,company,service:selectedServices.join(', '),budget:selectedBudget,timeline:selectedTimeline,message:projectBrief})});setIsSubmitted(true);}
    catch(e:any){setFormError(e.message);}finally{setSubmitting(false);}
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Start a project" data-lenis-prevent className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[var(--brand-ink)]/80 backdrop-blur-md">
        
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
                <h3 className="text-base sm:text-lg font-black text-[var(--brand-ink)]"><Copy id="Project Inquiry Modal · 01">
                  Start A Project With Digital With Habib
                </Copy></h3>
                <p className="text-xs text-slate-500 font-medium"><Copy id="Project Inquiry Modal · 02">
                  Starting from $1,000 (Range: $1,000 – $5,000) &bull; Direct response
                </Copy></p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-[var(--brand-ink)] hover:bg-slate-200/60 transition-colors"
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
                <h4 className="text-2xl font-black text-[var(--brand-ink)]"><Copy id="Project Inquiry Modal · 03">
                  Inquiry Received!
                </Copy></h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto"><Copy id="Project Inquiry Modal · 04">
                  Thank you, </Copy><strong className="text-[var(--brand-ink)]">{fullName || 'friend'}</strong><Copy id="Project Inquiry Modal · 05">. Our senior creative team has received your project details and budget (</Copy>{selectedBudget}<Copy id="Project Inquiry Modal · 06">) and will reply promptly.
                </Copy></p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppSend}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span><Copy id="Project Inquiry Modal · 07">Chat on WhatsApp Directly</Copy></span>
                  </button>
                  <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-bold text-sm"
                  >
                    <span><Copy id="Project Inquiry Modal · 08">Done</Copy></span>
                  </button>
                </div>
              </div>
            ) : (
              <form aria-busy={submitting} onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Services selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5"><Copy id="Project Inquiry Modal · 09">
                    1. What do you need help with?
                  </Copy></label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500"><Copy id="Project Inquiry Modal · 10">
                      2. Project Investment (Starting from $1,000)
                    </Copy></label>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md"><Copy id="Project Inquiry Modal · 11">
                      Range: $1,000 – $5,000
                    </Copy></span>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5"><Copy id="Project Inquiry Modal · 12">
                    3. Target Timeline
                  </Copy></label>
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500"><Copy id="Project Inquiry Modal · 13">
                    4. Contact Details
                  </Copy></label>
                  
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
                    type="submit" disabled={submitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#146BFF] to-[var(--brand-primary)] hover:from-[var(--brand-primary)] hover:to-[#0038b8] text-white font-bold text-sm shadow-md shadow-[#146BFF]/25 transition-all"
                  >
                    <span><Copy id="Project Inquiry Modal · 14">Submit Project Details</Copy></span>
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md shadow-[#25D366]/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span><Copy id="Project Inquiry Modal · 15">Send via WhatsApp</Copy></span>
                  </button>
                </div>

              {formError&&<p role="alert" className="text-sm text-red-700">{formError}</p>}{submitting&&<p role="status"><Copy id="Project Inquiry Modal · 16">Sending your inquiry…</Copy></p>}</form>
            )}

          </div>

          {/* Footer note */}
          <div className="px-6 sm:px-8 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span><Copy id="Project Inquiry Modal · 17">🔒 Starting rate: $1,000 (Range $1,000 – $5,000)</Copy></span>
            <span><Copy id="Project Inquiry Modal · 18">Digital With Habib</Copy></span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
