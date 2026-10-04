import { Copy } from './Copy';
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles,
  Layers,
  Layout,
  ChevronRight
} from 'lucide-react';
import { ProjectItem } from '../types';
import { useStudioContent } from '../context/StudioContentContext';
import { STUDIO_PROJECTS } from '../data/studioData';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenInquiry: (serviceName?: string) => void;
}

function ProjectCaption({project}:{project:ProjectItem}) {
  return <div className="portfolio-caption px-6 py-5 sm:px-8 bg-white">
    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--brand-ink)] line-clamp-2" title={project.title}>{project.title.split(/\s+[—–|]\s+/)[0]}</h3>
    <p className="mt-2 text-sm font-medium text-[var(--brand-primary)]">{project.category}</p>
  </div>;
}

function ProjectMedia({project}:{project:ProjectItem}) {
  return project.videoUrl
    ? <video src={project.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-contain"/>
    : <img src={project.coverImage || project.coverPhoto} alt={project.title} loading="lazy" className="w-full h-full object-contain"/>;
}

// ============================================================================
// ACT 1: STACKED OVERLAPPING CINEMATIC CARDS
// ============================================================================
interface StackedCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onSelectProject: (project: ProjectItem) => void;
}

const StackedProjectCard: React.FC<StackedCardProps> = ({
  project,
  index,
  totalCards,
  onSelectProject
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track progress over this card's sticky runway (~110vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Scale: enters at ~0.84, scales to 1.0 at center, then compresses slightly to ~0.92 when overlapped
  const cardScale = useTransform(scrollYProgress, [0.1, 0.45, 0.75, 1], [0.85, 1, 1, 0.92]);
  
  // Vertical card drift
  const cardY = useTransform(scrollYProgress, [0, 0.45, 1], [40, 0, -30]);

  return (
    <div 
      ref={containerRef} 
      className="portfolio-stack relative min-h-[105vh] flex items-start justify-center"
      style={{ zIndex: 10 + index }}
    >
      <motion.div
        style={{
          scale: cardScale,
          y: cardY
        }}
        role="button" tabIndex={0} aria-label={`View ${project.title} case study`} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelectProject(project);}}}
        onClick={() => onSelectProject(project)}
        className="portfolio-stack-card sticky top-24 sm:top-28 w-full max-w-7xl mx-auto cursor-pointer group bg-slate-900 rounded-[28px] overflow-hidden border border-slate-200/80 shadow-2xl transition-all duration-300"
      >
        <div className="aspect-[4/5] sm:aspect-[21/10] w-full bg-[var(--brand-surface)]"><ProjectMedia project={project}/></div>
        <ProjectCaption project={project}/>
      </motion.div>

    </div>
  );
};

// ============================================================================
// ACT 2: DUAL GRID SECTION ("some will be two" with Asymmetric Parallax)
// ============================================================================
interface DualCardProps {
  project: ProjectItem;
  staggerOffset: boolean;
  onSelectProject: (project: ProjectItem) => void;
}

const DualGridCard: React.FC<DualCardProps> = ({
  project,
  staggerOffset,
  onSelectProject
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  // Asymmetric vertical drift: left card moves at speed A, right card staggered at speed B
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    staggerOffset ? ['30px', '-45px'] : ['60px', '-25px']
  );

  // Mask reveal
  const clipInset = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    ['inset(10% 0% 10% 0% round 24px)', 'inset(0% 0% 0% 0% round 24px)']
  );

  // Scale: 0.88 -> 1.0
  const cardScale = useTransform(scrollYProgress, [0.05, 0.45], [0.88, 1.0]);

  // Subtle rotational settling for organic tactile weight
  const cardRotate = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    staggerOffset ? [1.2, 0] : [-1.2, 0]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: translateY,
        scale: cardScale,
        rotate: cardRotate,
        clipPath: clipInset
      }}
      role="button" tabIndex={0} aria-label={`View ${project.title} case study`} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelectProject(project);}}}
        onClick={() => onSelectProject(project)}
      className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-[var(--brand-primary)]/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between select-none"
    >
      <div className="aspect-[16/11] bg-[var(--brand-surface)]"><ProjectMedia project={project}/></div>
      <ProjectCaption project={project}/>
    </motion.div>

  );
};

// ============================================================================
// ACT 3: FULL-SCREEN EXPANSION PROJECT ("some photo will keep whole page")
// ============================================================================
interface FullscreenExpansionProps {
  project: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
}

const FullscreenExpansionProject: React.FC<FullscreenExpansionProps> = ({
  project,
  onSelectProject
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the 200vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Scrubbed Expansion from 68vw x 65vh to 100vw x 100vh with radius 28px -> 0px
  const containerWidth = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    ['72vw', '100vw']
  );
  
  const containerHeight = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    ['66vh', '100vh']
  );

  const containerRadius = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    ['28px', '0px']
  );

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-slate-950 text-white">
      {/* Sticky Full-Viewport Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Expanding Project Media Card */}
        <motion.div
          style={{
            width: containerWidth,
            height: containerHeight,
            borderRadius: containerRadius
          }}
          role="button" tabIndex={0} aria-label={`View ${project.title} case study`} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelectProject(project);}}}
        onClick={() => onSelectProject(project)}
          className="relative overflow-hidden cursor-pointer shadow-2xl group border border-white/10 bg-white transition-shadow duration-300 select-none flex flex-col"
        >
          <div className="flex-1 min-h-0 bg-[var(--brand-surface)]"><ProjectMedia project={project}/></div>
          <ProjectCaption project={project}/>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================================
// ACT 4: HORIZONTAL GALLERY SHOWCASE (Vertical Scroll Drives Horizontal Movement)
// ============================================================================
interface HorizontalGalleryProps {
  project6: ProjectItem;
  curatedList: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenInquiry: () => void;
}

const HorizontalGalleryShowcase: React.FC<HorizontalGalleryProps> = ({
  project6,
  curatedList,
  onSelectProject,
  onOpenInquiry
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Vertical scroll progress over 220vh
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Translates the horizontal track from right to left smoothly
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  // Build 4 curated panels including project 6
  const panels = [
    {
      type: 'project',
      project: project6,
      subheading: 'Curated Architectural & Spatial Identity'
    },
    {
      type: 'project',
      project: curatedList[0], // NovaPay
      subheading: 'FinTech Mobile OS & Data Visualization'
    },
    {
      type: 'project',
      project: curatedList[1], // Delvix
      subheading: 'Autonomous Logistics & Kinetic Brand System'
    },
    {
      type: 'cta',
      title: 'Ready to elevate your brand presence?',
      description: 'We collaborate closely with ambitious founders and engineering teams worldwide to create unforgettable brands and digital products.',
      actionText: 'Discuss Your Project'
    }
  ].filter(panel=>panel.type==='cta'||panel.project);

  return (
    <section ref={targetRef} className="portfolio-track-section relative h-[220vh] bg-[var(--brand-surface)] text-[var(--brand-ink)] border-t border-slate-200">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Header ticker */}
        <div className="px-6 sm:px-12 lg:px-16 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-primary)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold"><Copy id="Portfolio Section · 09">
              CURATED SHOWCASE TRACK &bull; HORIZONTAL MOTION
            </Copy></span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span><Copy id="Portfolio Section · 10">Scroll vertically to glide</Copy></span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Horizontal Track */}
        <motion.div 
          style={{ x }} 
          className="portfolio-track flex gap-8 sm:gap-12 px-6 sm:px-12 lg:px-16"
        >
          {panels.map((panel, idx) => {
            if (panel.type === 'cta') {
              return (
                <div
                  key="cta-panel"
                  className="flex-shrink-0 w-[80vw] sm:w-[50vw] max-w-xl h-[62vh] rounded-[32px] bg-gradient-to-br from-[var(--brand-ink)] via-[#0A235C] to-[var(--brand-primary)] p-8 sm:p-12 text-white flex flex-col justify-between shadow-2xl border border-blue-900/40"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono text-[var(--brand-accent)] w-fit border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                    <span><Copy id="Portfolio Section · 11">START YOUR JOURNEY</Copy></span>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-4">
                      {panel.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-md font-normal">
                      {panel.description}
                    </p>
                  </div>

                  <button
                    onClick={onOpenInquiry}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[var(--brand-accent)] text-[var(--brand-ink)] font-bold text-sm font-mono tracking-tight shadow-xl transition-all duration-300 cursor-pointer w-fit"
                  >
                    <span>{panel.actionText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              );
            }

            const proj = panel.project as ProjectItem;
            return (
              <div
                key={proj.id + idx}
                role="button" tabIndex={0} aria-label={`View ${proj.title} case study`} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelectProject(proj);}}}
                onClick={() => onSelectProject(proj)}
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[60vw] h-[62vh] rounded-[32px] overflow-hidden relative cursor-pointer group shadow-xl bg-white border border-slate-200/90 select-none flex flex-col"
              >
                <div className="flex-1 min-h-0 bg-[var(--brand-surface)]"><ProjectMedia project={proj}/></div>
                <ProjectCaption project={proj}/>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN EXPORTED PORTFOLIO SECTION
// ============================================================================
export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ 
  onSelectProject, 
  onOpenInquiry 
}) => {
  const { projects } = useStudioContent();

  const [category,setCategory]=useState('All');
  const categories=['All',...new Set(projects.map(p=>p.category))];
  const filtered=category==='All'?projects:projects.filter(p=>p.category===category);
  return <section id="work" className="pt-20 sm:pt-28 bg-white text-[var(--brand-ink)] relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div><p className="inline-flex px-3.5 py-1.5 rounded-full bg-blue-50 text-[var(--brand-primary)] text-xs uppercase tracking-wider mb-4 border border-blue-200"><Copy id="Portfolio Section · 14">Selected Portfolio</Copy></p><h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight"><Copy id="Portfolio Section · 15">Our Work</Copy></h2></div>
        <p className="text-base sm:text-lg text-slate-600 max-w-md"><Copy id="Portfolio Section · 16">See what we’ve been creating for our clients.</Copy></p>
      </div>
      <div className="flex flex-wrap gap-2 mt-7" aria-label="Filter portfolio">{categories.map(cat=><button key={cat} onClick={()=>setCategory(cat)} aria-pressed={category===cat} className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-colors ${category===cat?'bg-[var(--brand-primary)] text-white':'bg-slate-100 text-slate-600 hover:bg-blue-50'}`}>{cat}</button>)}</div>
    </div>
    {!filtered.length?<div className="max-w-7xl mx-auto px-6 py-20 text-center"><h3 className="text-2xl font-bold"><Copy id="Portfolio Section · 17">New work is on the way.</Copy></h3><p className="text-slate-500 mt-3"><Copy id="Portfolio Section · 18">Have something in mind? Let’s make it happen.</Copy></p><button className="mt-6 px-6 py-3 rounded-full bg-[var(--brand-primary)] text-white" onClick={()=>onOpenInquiry()}><Copy id="Portfolio Section · 19">Start a project</Copy></button></div>:<>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mb-20">{filtered.slice(0,2).map((project,index)=><StackedProjectCard key={project.id} project={project} index={index} totalCards={Math.min(2,filtered.length)} onSelectProject={onSelectProject}/>)}</div>
      {filtered.length>2&&<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">{filtered.slice(2,4).map((project,index)=><DualGridCard key={project.id} project={project} staggerOffset={index%2===1} onSelectProject={onSelectProject}/>)}</div>}
      {filtered[4]&&<FullscreenExpansionProject project={filtered[4]} onSelectProject={onSelectProject}/>}
      {filtered[5]&&<HorizontalGalleryShowcase project6={filtered[5]} curatedList={filtered.slice(6,8)} onSelectProject={onSelectProject} onOpenInquiry={()=>onOpenInquiry('Portfolio inquiry')}/>}
      {filtered.length>8&&<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">{filtered.slice(8).map((project,index)=><DualGridCard key={project.id} project={project} staggerOffset={false} onSelectProject={onSelectProject}/>)}</div>}
    </>}
  </section>;
};
