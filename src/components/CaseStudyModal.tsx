import {useDialog} from '../hooks/useDialog';
import { Copy } from './Copy';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowUpRight,
  TrendingUp,
  Upload,
  Trash2,
  Plus,
  Image as ImageIcon,
  Check,
  Video,
  ArrowLeft,
  Sparkles,
  Layers
} from 'lucide-react';
import { ProjectItem } from '../types';
import { useStudioContent } from '../context/StudioContentContext';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenInquiry: (serviceName?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenInquiry }) => {
  const dialogRef=useDialog(!!project,onClose);
  const {projects}=useStudioContent();
  const [showAllVisuals, setShowAllVisuals] = useState(false);

  // Reset visual expansion when active project changes
  useEffect(() => {
    setShowAllVisuals(false);
  }, [project?.id]);

  if (!project) return null;

  // Find authoritative project from context (to reflect any instant photo updates)
  const currentProject = projects.find(p => p.id === project.id) || project;
  const projectImages = currentProject.images && currentProject.images.length > 0
    ? currentProject.images
    : [currentProject.coverImage];

  const visibleImages = showAllVisuals ? projectImages : projectImages.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      ref={dialogRef} role="dialog" aria-modal="true" aria-label={currentProject.title} data-lenis-prevent
      className="fixed inset-0 z-[90] overflow-y-auto bg-[var(--brand-ink)] text-white flex flex-col font-['Inter',sans-serif] selection:bg-[#146BFF] selection:text-white"
    >
        {/* 1. MINIMAL FLOATING TOP NAVIGATION BAR */}
        <header className="sticky top-0 z-40 bg-[var(--brand-ink)]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span><Copy id="Case Study Modal · 01">Back to All Work</Copy></span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[#146BFF]/30 text-blue-300 font-bold uppercase tracking-wider text-[10px]">
                {currentProject.category}
              </span>
              <span className="text-white/40"><Copy id="Case Study Modal · 02">&bull;</Copy></span>
              <span className="text-white/80 font-medium truncate max-w-xs">{currentProject.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">


            <button
              onClick={() => {
                onClose();
                onOpenInquiry(`Inquiry about ${currentProject.title}`);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#146BFF] hover:bg-[var(--brand-primary)] text-white text-xs font-bold shadow-md shadow-[#146BFF]/30 transition-all"
            >
              <span><Copy id="Case Study Modal · 04">Start a Project Like This</Copy></span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              aria-label="Close Project Detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 2. MAIN FULL-SCREEN VERTICAL SCROLLING PRESENTATION */}
        <div className="flex-1 w-full bg-[#051329]">

          {/* SECTION 1: PROJECT OPENING SECTION */}
          <section className="pt-16 sm:pt-24 pb-12 sm:pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            {/* STRONG HERO VISUAL WITH SLIDING PHOTO MOTION AND CUSTOM CURSOR */}
            <motion.div
              initial={{ opacity: 0, y: 45, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="view"
              className="mt-12 rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-black shadow-2xl relative group cursor-pointer"
            >
              <a href={currentProject.coverImage || currentProject.coverPhoto} target="_blank" rel="noopener noreferrer" aria-label={`Open original image: ${currentProject.title}`} className="block">
              <motion.img
                src={currentProject.coverImage || currentProject.coverPhoto}
                alt={currentProject.title}

                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="block w-full h-auto max-h-none object-contain"
              />

              </a>
              {/* Full original available in a separate tab. */}

            </motion.div>
            <div className="mt-6 text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{currentProject.title}</h1>
              <p className="mt-2 text-sm font-medium text-[var(--brand-accent)]">{currentProject.category}</p>
            </div>
          </section>

          {/* SECTION 2: CONTINUOUS VERTICAL IMAGE SEQUENCE (Behance-Style Pure Scrolling with Sliding Photos) */}
          <section className="py-8 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

            {/* Primary Video Player if this is a video project */}
            {currentProject.videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                data-cursor="play"
                className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-black shadow-2xl relative"
              >
                <video
                  src={currentProject.videoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                />
              </motion.div>
            )}

            {/* Secondary Video Player if available */}
            {currentProject.secondaryVideoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                data-cursor="play"
                className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-black shadow-2xl relative"
              >
                <video
                  src={currentProject.secondaryVideoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                />
              </motion.div>
            )}

            {/* Curated High-Impact Presentation Visuals with Sliding Photos */}
            {visibleImages.map((imageUrl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="view"
                className="group relative rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/10 bg-slate-900/60 shadow-2xl transition-all cursor-pointer"
              >
                <a href={imageUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open original image ${idx+1}: ${currentProject.title}`} className="block">
                <motion.img
                  src={imageUrl}
                  alt={`${currentProject.title} - Visual Presentation #${idx + 1}`}
                  loading="lazy"

                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-full h-auto max-h-none object-contain mx-auto"
                />
                </a>

              </motion.div>
            ))}

            {/* Optional Expansion Toggle if Project Has Additional Visuals */}
            {!showAllVisuals && projectImages.length > 2 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllVisuals(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all hover:scale-105"
                >
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span><Copy id="Case Study Modal · 11">View Additional Artifacts (</Copy>{projectImages.length - 2}<Copy id="Case Study Modal · 12"> more)</Copy></span>
                </button>
              </div>
            )}

            {/* Quick Add Visual Trigger at the End of Sequence */}
            <div className="text-center pt-6">

            </div>
          </section>

          {/* SECTION 3: PROJECT CLOSING SECTION */}
          <section className="py-24 sm:py-32 border-t border-white/10 bg-[var(--brand-ink)] text-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <span>{currentProject.category}<Copy id="Case Study Modal · 14"> &bull; End of Project</Copy></span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {currentProject.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto"><Copy id="Case Study Modal · 15">
                Trusted by industry leaders, fast-growing tech giants & global brands.
              </Copy></p>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry(`Inquiry about ${currentProject.title}`);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#146BFF] hover:bg-[var(--brand-primary)] text-white text-sm font-bold shadow-xl shadow-[#146BFF]/30 transition-all hover:scale-105"
                >
                  <span><Copy id="Case Study Modal · 16">Start a Project Like This</Copy></span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span><Copy id="Case Study Modal · 17">Back to All Work</Copy></span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
  );
};
