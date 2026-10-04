import { Copy } from './Copy';
import {api} from '../utils/api';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  MessageSquare, 
  Mail, 
  ChevronDown, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';

interface ContactSectionProps {
  onOpenInquiryModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiryModal }) => {
  const { settings,content } = useStudioContent();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [brandName, setBrandName] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(content.sections.services[0]?.title||'General inquiry');
  const [timeline, setTimeline] = useState(settings.timelineOptions[0]||'Flexible');
  const [projectDetails, setProjectDetails] = useState('');
  const [formError,setFormError]=useState('');
  const [submitting,setSubmitting]=useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactEmail = settings.studioEmail;
  const whatsappNumber = settings.phoneWhatsApp.replace(/[^0-9]/g, '') || '8801734144347';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true);setFormError('');
    try{await api('/inquiries',{method:'POST',body:JSON.stringify({fullName,email,whatsapp,company:brandName,service:serviceNeeded,timeline,message:projectDetails})});setIsSubmitted(true);}
    catch(e:any){setFormError(e.message);}finally{setSubmitting(false);}
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Digital With Habib! I want to discuss a project.%0A%0A*Name:* ${encodeURIComponent(fullName || 'Client')}%0A*Brand:* ${encodeURIComponent(brandName || 'Not specified')}%0A*Service:* ${encodeURIComponent(serviceNeeded)}%0A*Timeline:* ${encodeURIComponent(timeline)}%0A*Details:* ${encodeURIComponent(projectDetails || 'I would like to discuss a new project.')}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank','noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[var(--brand-surface)] text-[var(--brand-ink)] relative border-t border-slate-200 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TWO-COLUMN CONTACT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Heading, Subtitle, WhatsApp Card, Direct Email */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-[var(--brand-primary)] font-semibold mb-4 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span><Copy id="Contact Section · 01">Contact Us</Copy></span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-[var(--brand-ink)] tracking-tight leading-tight mb-4"><Copy id="Contact Section · 02">
                Let's build something </Copy><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-[#146BFF] to-[var(--brand-accent)]"><Copy id="Contact Section · 03">
                  remarkable together.
                </Copy></span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed"><Copy id="Contact Section · 04">
                Have a project in mind or want to discuss a new idea? Get in touch and let's see how we can help.
              </Copy></p>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={onOpenInquiryModal}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[var(--brand-primary)] hover:bg-[#0047E0] text-white font-bold text-sm shadow-lg shadow-[var(--brand-primary)]/20 transition-all cursor-pointer active:scale-95"
              >
                <span><Copy id="Contact Section · 05">Start a Project</Copy></span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello%20Digital%20With%20Habib!%20I%20would%20like%20to%20discuss%20a%20new%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-sm transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span><Copy id="Contact Section · 06">Chat on WhatsApp</Copy></span>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[var(--brand-ink)] font-mono text-sm font-semibold transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[var(--brand-primary)]" />
                <span>{contactEmail}</span>
              </a>
            </div>

            {/* Direct Studio Details Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold"><Copy id="Contact Section · 07">
                Direct Communication
              </Copy></div>
              <p className="text-xs text-slate-600 leading-relaxed"><Copy id="Contact Section · 08">
                We respond to all direct inquiries within 24 hours. Founders and product teams receive direct attention from Habib and our senior design partners.
              </Copy></p>
            </div>
          </motion.div>

          {/* Right Column: Direct Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/90 shadow-xl"
          >
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center mx-auto border border-blue-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--brand-ink)]"><Copy id="Contact Section · 09">
                  Message Received
                </Copy></h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto font-normal leading-relaxed"><Copy id="Contact Section · 10">
                  Thank you, </Copy><strong className="text-[var(--brand-ink)]">{fullName}</strong><Copy id="Contact Section · 11">. Habib and the Digital With Habib team have received your project details and will reply shortly.
                </Copy></p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[var(--brand-ink)] text-xs font-mono transition-all cursor-pointer font-semibold"
                ><Copy id="Contact Section · 12">
                  Send another message
                </Copy></button>
              </div>
            ) : (
              <form aria-busy={submitting} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-semibold"><Copy id="Contact Section · 13">
                      Your Name
                    </Copy></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[var(--brand-primary)] text-sm text-[var(--brand-ink)] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-semibold"><Copy id="Contact Section · 14">
                      Email Address
                    </Copy></label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[var(--brand-primary)] text-sm text-[var(--brand-ink)] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-semibold"><Copy id="Contact Section · 15">
                      WhatsApp Number
                    </Copy></label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[var(--brand-primary)] text-sm text-[var(--brand-ink)] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-semibold"><Copy id="Contact Section · 16">
                      Business or Brand Name
                    </Copy></label>
                    <input
                      type="text"
                      placeholder="e.g. NovaPay"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[var(--brand-primary)] text-sm text-[var(--brand-ink)] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-semibold"><Copy id="Contact Section · 17">
                      What do you need help with?
                    </Copy></label>
                    <select aria-label="Service needed" value={serviceNeeded} onChange={e=>setServiceNeeded(e.target.value)} className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 text-sm">
                      {content.sections.services.map(service=><option key={service.id} value={service.title}>{service.title}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-semibold"><Copy id="Contact Section · 22">
                      Project Timeline
                    </Copy></label>
                    <select aria-label="Project timeline" value={timeline} onChange={e=>setTimeline(e.target.value)} className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 text-sm">
                      {settings.timelineOptions.map((option:string)=><option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-semibold"><Copy id="Contact Section · 27">
                    Tell us about your project
                  </Copy></label>
                  <textarea
                    rows={4}
                    placeholder="What are you trying to create? What are your goals and timeline?"
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-[var(--brand-primary)] text-sm text-[var(--brand-ink)] font-normal resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit" disabled={submitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-full bg-[var(--brand-primary)] hover:bg-[#0047E0] text-white font-mono font-bold text-sm tracking-wide shadow-lg shadow-[var(--brand-primary)]/25 transition-all cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span><Copy id="Contact Section · 28">Send Project Details</Copy></span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-[var(--brand-ink)] font-mono font-medium text-sm border border-slate-200 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span><Copy id="Contact Section · 29">Chat on WhatsApp</Copy></span>
                  </button>
                </div>
              {formError&&<p role="alert" className="text-sm text-red-700">{formError}</p>}{submitting&&<p role="status"><Copy id="Contact Section · 30">Sending your inquiry…</Copy></p>}</form>
            )}
          </motion.div>

        </div>

        {/* BOTTOM CALLOUT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--brand-primary)] font-semibold mb-2"><Copy id="Contact Section · 31">
              Ready When You Are
            </Copy></div>
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--brand-ink)] tracking-tight"><Copy id="Contact Section · 32">
              Start your project with Digital With Habib
            </Copy></h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl"><Copy id="Contact Section · 33">
              We look forward to hearing about your vision and bringing it to life with craft and clarity.
            </Copy></p>
          </div>

          <button
            onClick={onOpenInquiryModal}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--brand-primary)] text-white hover:bg-[#0047E0] font-bold text-sm shadow-xl shadow-[var(--brand-primary)]/20 transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <span><Copy id="Contact Section · 34">Start a Project</Copy></span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
