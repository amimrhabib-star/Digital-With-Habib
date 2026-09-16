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
import { FAQS } from '../data/clientsData';
import { FOUNDER_DATA } from '../data/studioData';

interface ContactSectionProps {
  onOpenInquiryModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiryModal }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [brandName, setBrandName] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('UI/UX Design');
  const [timeline, setTimeline] = useState('Within 2-4 weeks');
  const [projectDetails, setProjectDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello! I want to discuss a project with DWH Studio.%0A%0A*Name:* ${encodeURIComponent(fullName || 'Client')}%0A*Brand:* ${encodeURIComponent(brandName || 'Not specified')}%0A*Service:* ${encodeURIComponent(serviceNeeded)}%0A*Timeline:* ${encodeURIComponent(timeline)}%0A*Details:* ${encodeURIComponent(projectDetails || 'I need help with my digital brand.')}`;
    window.open(`https://wa.me/8801734144347?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F7F9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PART 1: TWO-COLUMN CONTACT SECTION ("Tell us what you need.") */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-28">
          
          {/* Left Column: Heading, Subtitle, WhatsApp Card, Direct Email */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black text-[#071A41] tracking-[-0.03em] leading-tight mb-4">
                Tell us what <br />
                you need.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Have a new project, a business idea or content to create? Send us a few details and we will reply with the right next step.
              </p>
            </div>

            {/* Prefer WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071A41]">
                    Prefer WhatsApp?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Chat with us directly about your project.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/8801734144347"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs tracking-wide shadow-sm shadow-[#25D366]/20 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Email Direct */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                EMAIL DIRECT
              </div>
              <a
                href="mailto:contact@dwhstudio.com"
                className="text-base sm:text-lg font-bold text-[#071A41] hover:text-[#146BFF] transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#146BFF]" />
                <span>contact@dwhstudio.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-12 border border-slate-200/90 shadow-lg">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#071A41]">
                  Message Received!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-[#071A41]">{fullName}</strong>. Habib Ahmed and our specialists have received your inquiry and will reply shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm text-[#071A41]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm text-[#071A41]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm text-[#071A41]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1.5">
                      Business or Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Studio"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm text-[#071A41]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1.5">
                      What do you need help with?
                    </label>
                    <select
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm text-[#071A41] bg-white"
                    >
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Brand Identity">Graphic Design & Brand Identity</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Video Editing & Motion Graphics">Video Editing & Motion Graphics</option>
                      <option value="AI Video">AI Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1.5">
                      Project Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm text-[#071A41] bg-white"
                    >
                      <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                      <option value="1-2 Months">1-2 Months</option>
                      <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                      <option value="Ongoing Retainer">Ongoing Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#071A41] uppercase tracking-wider mb-1.5">
                    Tell us about your project
                  </label>
                  <textarea
                    rows={4}
                    placeholder="What are you trying to create? Who is it for? Do you have a deadline or reference?"
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#146BFF] text-sm text-[#071A41] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white font-bold text-sm tracking-wide shadow-md shadow-[#146BFF]/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm border border-emerald-200/80 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* PART 2: FAQ ACCORDION SECTION ("Questions before you start?") */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#146BFF] text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMON QUESTIONS</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-black text-[#071A41] tracking-tight mb-2">
              Questions before you start?
            </h3>
            
            <p className="text-sm text-slate-500">
              Here are a few common questions about working with us.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-[#071A41] hover:text-[#146BFF] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#146BFF]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* PART 3: DARK CTA BANNER ("Have a project in mind?") */}
        <div className="rounded-[36px] bg-[#071A41] text-white p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                LET'S BUILD TOGETHER
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Have a project in mind?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Tell us what you need—brand design, a website, marketing or video—and we will help you choose the right next step.
              </p>
            </div>

            <button
              onClick={onOpenInquiryModal}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#146BFF] hover:bg-[#0052FF] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#146BFF]/30 transition-all shrink-0 hover:scale-105"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
