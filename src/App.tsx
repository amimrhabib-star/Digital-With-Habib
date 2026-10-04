import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { ArpeggioNav } from './components/ArpeggioNav';
import { ArpeggioHero } from './components/ArpeggioHero';
import { TrustedBrandsMotion } from './components/TrustedBrandsMotion';
import { PortfolioSection } from './components/PortfolioSection';
import { ArpeggioAchievements } from './components/ArpeggioAchievements';
import { ArpeggioServices } from './components/ArpeggioServices';
import { ArpeggioFAQ } from './components/ArpeggioFAQ';
import { ArpeggioTestimonials } from './components/ArpeggioTestimonials';
import { ProcessSection } from './components/ProcessSection';
import { TeamSection } from './components/TeamSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { VideoModal } from './components/VideoModal';
import { SlatTransition } from './components/SlatTransition';
import { AdminEditBar } from './components/AdminEditBar';
import { ProjectItem, MembershipPlan } from './types';
import { useStudioContent } from './context/StudioContentContext';
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const { settings,isHydrated,loadError,reloadContent } = useStudioContent();
  // Page routing state: 'home' | 'services' | 'work' | 'process' | 'team' | 'about' | 'contact'
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages = ['home', 'services', 'work', 'process', 'team', 'about', 'contact', 'admin'];
    return validPages.includes(hash) ? hash : 'home';
  });

  // Initialize Lenis + GSAP ScrollTrigger smooth scrolling with page change awareness
  useSmoothScroll(currentPage);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryPreselectedService, setInquiryPreselectedService] = useState<string | undefined>(undefined);
  const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);
  const [isSlatTransitioning, setIsSlatTransitioning] = useState(false);

  const navigateToPage = (pageId: string) => {
    const allowed = ['home','services','work','process','team','about','contact','admin'];
    window.location.hash = `#/${allowed.includes(pageId) && pageId !== 'home' ? pageId : ''}`;
    if (pageId === currentPage) window.scrollTo({top:0,behavior:'instant'});
  };
  useEffect(() => {
    const onHash = () => {
      const route=window.location.hash.replace(/^#\/?/,'') || 'home';
      setCurrentPage(['home','services','work','process','team','about','contact','admin'].includes(route)?route:'home');
      setSelectedProject(null); setInquiryModalOpen(false); setVideoModal(null);
      window.scrollTo({top:0,behavior:'instant'});
    };
    window.addEventListener('hashchange',onHash);
    return()=>window.removeEventListener('hashchange',onHash);
  },[]);
  useEffect(()=>{
    document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]').forEach(link=>{link.href=settings.faviconUrl||'/favicon-32.png';link.type=settings.faviconUrl?.endsWith('.ico')?'image/x-icon':'image/png';});
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',settings.primaryColor);
    document.title = currentPage==='home' ? settings.seoTitle : `${currentPage[0].toUpperCase()+currentPage.slice(1)} — ${settings.brandName}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content',settings.seoDescription || settings.heroSubtitle);
    const colors:{[key:string]:string}={'--brand-primary':settings.primaryColor,'--brand-accent':settings.accentColor,'--brand-ink':settings.inkColor,'--brand-surface':settings.surfaceColor};
    for(const [key,value] of Object.entries(colors))if(/^#[a-f0-9]{6}$/i.test(value||''))document.documentElement.style.setProperty(key,value);
  },[currentPage,settings]);

  const handleOpenInquiry = (serviceNameOrPlan?: string) => {
    setInquiryPreselectedService(serviceNameOrPlan);
    setInquiryModalOpen(true);
  };

  const handleOpenVideo = (videoUrl: string, title: string) => {
    setVideoModal({ url: videoUrl, title });
  };

  const handleSelectPlan = (plan: MembershipPlan) => {
    handleOpenInquiry(`Membership Plan: ${plan.name} ($${plan.monthlyPrice}/mo)`);
  };

  if(!isHydrated)return <main className="min-h-screen grid place-items-center bg-[#f7f9fc] text-[#071a41]" role="status">Loading Digital With Habib…</main>;
  if(loadError&&currentPage!=='admin')return <main className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#f7f9fc] text-[#071a41] p-8 text-center"><h1 className="text-3xl font-bold">We'll be right back.</h1><p>We couldn't load the latest website content. Please try again.</p><button className="px-6 py-3 bg-[#0052ff] text-white rounded-full" onClick={()=>void reloadContent().catch(()=>{})}>Try again</button></main>;
  if(currentPage==='admin') return <Suspense fallback={<div className="p-12">Opening your studio…</div>}><AdminDashboard/></Suspense>;
  return (
    <div className="min-h-screen bg-[var(--brand-surface)] text-[var(--brand-ink)] selection:bg-[var(--brand-primary)] selection:text-white relative font-['Inter',sans-serif]">
      {/* Slat Transition Overlay across route navigation */}
      <SlatTransition isTransitioning={isSlatTransitioning} />

      {/* Interactive Custom Cursor with VISIT pill on portfolio cards */}
      <CustomCursor />

      {/* Arpeggio Editorial Glass Navigation */}
      <ArpeggioNav
        currentPage={currentPage}
        onNavigate={navigateToPage}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      <a href="#main-content" className="skip-link" onClick={e=>{e.preventDefault();document.getElementById("main-content")?.focus();}}>Skip to content</a>
      <main id="main-content" className="pt-20" tabIndex={-1}>
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
              {settings.homeSections.filter((s:any)=>s.visible).map((section:any)=>{
                const blocks:Record<string,React.ReactNode>={
                  hero:<ArpeggioHero onOpenInquiry={handleOpenInquiry} onOpenProject={setSelectedProject} onNavigate={navigateToPage} onOpenVideoModal={handleOpenVideo}/>,
                  clients:<TrustedBrandsMotion/>,
                  portfolio:<PortfolioSection onSelectProject={setSelectedProject} onOpenInquiry={handleOpenInquiry}/>,
                  achievements:<ArpeggioAchievements/>,
                  services:<ArpeggioServices onOpenInquiry={handleOpenInquiry}/>,
                  testimonials:<ArpeggioTestimonials onOpenVideoModal={handleOpenVideo} onBookCall={()=>handleOpenInquiry('Consultation')}/>,
                  faq:<ArpeggioFAQ onBookCall={()=>handleOpenInquiry('General question')}/>
                };
                return <React.Fragment key={section.id}>{blocks[section.id]}</React.Fragment>;
              })}
            </motion.div>
          )}

          {/* ================= PAGE 2: SERVICES ================= */}
          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <ArpeggioServices
                onOpenInquiry={handleOpenInquiry}
              />
            </motion.div>
          )}

          {/* ================= PAGE 3: WORK / PORTFOLIO ================= */}
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
              <ArpeggioAchievements
                onOpenProject={(project) => setSelectedProject(project)}
                onOpenVideoModal={handleOpenVideo}
              />
            </motion.div>
          )}

          {/* ================= PAGE 4: PROCESS ================= */}
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

          {/* ================= PAGE 5: TEAM ================= */}
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

          {/* ================= PAGE 6: ABOUT ================= */}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <AboutSection onNavigate={navigateToPage} onOpenInquiry={() => handleOpenInquiry()} />
              <ArpeggioAchievements
                onOpenProject={(project) => setSelectedProject(project)}
                onOpenVideoModal={handleOpenVideo}
              />
            </motion.div>
          )}

          {/* ================= PAGE 7: CONTACT ================= */}
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

      {/* Arpeggio Studio Footer with live Milano / Dhaka timezone clock */}
      <Footer
        onOpenInquiry={handleOpenInquiry}
        onNavigate={navigateToPage}
      />


      {/* Project Case Study Drawer Modal */}
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

      {/* Full-screen Dark Glass Video Modal */}
      {videoModal && (
        <VideoModal
          isOpen={!!videoModal}
          videoUrl={videoModal.url}
          title={videoModal.title}
          onClose={() => setVideoModal(null)}
        />
      )}

      {/* Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        preselectedService={inquiryPreselectedService}
      />

      {/* Admin Quick Edit Bar for Custom Changes & Instant Live Preview */}
      <AdminEditBar />
    </div>
  );
}
