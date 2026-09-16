import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandStoryVideoSection } from './components/BrandStoryVideoSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { ClientLogosSection } from './components/ClientLogosSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TeamSection } from './components/TeamSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { AdminEditBar } from './components/AdminEditBar';
import { ProjectItem } from './types';
import { ArrowRight, ArrowUpRight, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Page routing state: 'home' | 'services' | 'work' | 'process' | 'team' | 'about' | 'contact'
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages = ['home', 'services', 'work', 'process', 'team', 'about', 'contact'];
    return validPages.includes(hash) ? hash : 'home';
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryPreselectedService, setInquiryPreselectedService] = useState<string | undefined>(undefined);

  // Sync route with URL hash for easy browser history and bookmarks
  const navigateToPage = (pageId: string) => {
    setCurrentPage(pageId);
    window.location.hash = `#/${pageId === 'home' ? '' : pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'services', 'work', 'process', 'team', 'about', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // World-class global floating kinetic motion triggered on click
  const [clickFloatingPulse, setClickFloatingPulse] = useState(false);

  useEffect(() => {
    const handleGlobalClick = () => {
      setClickFloatingPulse(true);
      const timer = setTimeout(() => setClickFloatingPulse(false), 520);
      return () => clearTimeout(timer);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleOpenInquiry = (serviceName?: string) => {
    setInquiryPreselectedService(serviceName);
    setInquiryModalOpen(true);
  };

  return (
    <div className={`min-h-screen bg-white text-[#071A41] selection:bg-[#0052FF] selection:text-white relative font-['Inter',sans-serif] ${clickFloatingPulse ? 'website-floating-pulse' : ''}`}>
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Navbar with Page-by-Page Routing */}
      <Navbar
        onOpenInquiry={handleOpenInquiry}
        currentPage={currentPage}
        onNavigate={navigateToPage}
      />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {/* ================= PAGE 1: HOME ================= */}
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 1. Hero Section (First Introducing Option) */}
              <HeroSection
                onOpenInquiry={() => handleOpenInquiry()}
                onOpenVideo={() => navigateToPage('work')}
              />

              {/* 2. Brand Story Video Showcase with Upload Option & Animated Kinetic Headline */}
              <BrandStoryVideoSection />

              {/* 3. Marquee Ticker */}
              <MarqueeTicker />

              {/* 4. Client Logos (with direct Upload Logo option) */}
              <ClientLogosSection />

              {/* 4. Featured Work Preview */}
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/70"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Recent Deliverables</span>
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-black text-[#071A41] tracking-tight"
                      >
                        Selected Projects & Case Studies
                      </motion.h2>
                    </div>

                    <button
                      onClick={() => navigateToPage('work')}
                      className="btn-futuristic-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all self-start sm:self-auto group cursor-pointer"
                    >
                      <span>View All Projects</span>
                      <ArrowRight className="w-4 h-4 text-[#0052FF] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>

                  <PortfolioSection
                    onSelectProject={(project) => setSelectedProject(project)}
                    onOpenInquiry={handleOpenInquiry}
                  />
                </div>
              </section>

              {/* 5. Core Services Preview */}
              <section className="py-20 bg-gradient-to-b from-white via-[#F6F9FD] to-white border-t border-blue-100/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 text-[#0052FF] text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200/70"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Agency Capabilities</span>
                      </motion.div>
                      <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-black text-[#071A41] tracking-tight"
                      >
                        What We Do For Your Brand
                      </motion.h2>
                    </div>

                    <button
                      onClick={() => navigateToPage('services')}
                      className="btn-futuristic-perfect inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-md transition-all self-start sm:self-auto group cursor-pointer"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <ServicesSection
                    onOpenInquiry={handleOpenInquiry}
                  />
                </div>
              </section>

              {/* 6. Verified Client Reviews Matching Video Architecture */}
              <TestimonialsSection onOpenInquiry={handleOpenInquiry} />

              {/* 7. Clean Direct Action Callout: Futuristic White Glass Pavilion */}
              <section className="py-24 bg-white relative overflow-hidden">
                {/* Background ambient orbs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-100/50 to-cyan-100/40 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl bg-white/90 backdrop-blur-2xl p-8 sm:p-14 overflow-hidden shadow-[0_25px_60px_rgba(0,80,220,0.12)] border border-blue-100 text-center"
                  >
                    {/* Top specular edge reflection */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0052FF] to-transparent opacity-60" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 text-[#0052FF] text-xs font-bold border border-blue-200/80 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                        <span>Ready to start?</span>
                      </div>

                      <h2 className="text-3xl sm:text-5xl font-black text-[#071A41] tracking-tight leading-tight">
                        Let's build a brand people{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-[#00D2FF]">
                          never forget.
                        </span>
                      </h2>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Work directly with our senior creative directors and engineering specialists. No middlemen, no sales pitches—just clear strategy, fast execution, and outstanding results.
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                        <button
                          id="cta-start-project-btn"
                          onClick={() => handleOpenInquiry()}
                          className="btn-futuristic-perfect px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer"
                        >
                          <span>Start a Project</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>

                        <button
                          id="cta-contact-details-btn"
                          onClick={() => navigateToPage('contact')}
                          className="btn-futuristic-secondary px-6 py-3.5 rounded-full font-bold text-sm cursor-pointer"
                        >
                          <span>Contact Details</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ================= SERVICES ================= */}
          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <ServicesSection onOpenInquiry={handleOpenInquiry} />
            </motion.div>
          )}

          {/* ================= WORK / PORTFOLIO ================= */}
          {currentPage === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <PortfolioSection
                onSelectProject={(project) => setSelectedProject(project)}
                onOpenInquiry={handleOpenInquiry}
              />
            </motion.div>
          )}

          {/* ================= PROCESS ================= */}
          {currentPage === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <ProcessSection />
            </motion.div>
          )}

          {/* ================= TEAM ================= */}
          {currentPage === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <TeamSection onOpenInquiry={handleOpenInquiry} />
            </motion.div>
          )}

          {/* ================= ABOUT ================= */}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <AboutSection />
            </motion.div>
          )}

          {/* ================= CONTACT ================= */}
          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <ContactSection
                onOpenInquiryModal={() => handleOpenInquiry()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Studio Footer with Page-by-Page Navigation */}
      <Footer
        onOpenInquiry={handleOpenInquiry}
        onNavigate={navigateToPage}
      />

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenInquiry={handleOpenInquiry}
          />
        )}
      </AnimatePresence>

      {/* Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={inquiryPreselectedService}
      />

      {/* Admin Quick Edit Bar for Custom Changes & Instant Persistence */}
      <AdminEditBar />
    </div>
  );
}
