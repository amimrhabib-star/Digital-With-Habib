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
  const { 
    projects,
    addProjectImage, 
    replaceProjectImage, 
    removeProjectImage, 
    updateProjectMedia 
  } = useStudioContent();

  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);
  const [showAllVisuals, setShowAllVisuals] = useState(false);

  // Hidden file inputs for admin management directly on the project detail view
  const addImageInputRef = useRef<HTMLInputElement>(null);
  const replaceImageInputRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number>(0);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when full-page presentation is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

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

  const notifySave = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(null), 2500);
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          addProjectImage(currentProject.id, event.target.result as string);
          notifySave('New visual added to project presentation!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          replaceProjectImage(currentProject.id, replaceIndexRef.current, event.target.result as string);
          notifySave(`Visual #${replaceIndexRef.current + 1} updated!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProjectMedia(currentProject.id, 'coverImage', event.target.result as string);
          notifySave('Project hero visual updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerReplace = (index: number) => {
    replaceIndexRef.current = index;
    replaceImageInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    if (window.confirm(`Remove visual #${index + 1} from this project?`)) {
      removeProjectImage(currentProject.id, index);
      notifySave('Visual removed from project!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#071A41] text-white flex flex-col font-['Inter',sans-serif] selection:bg-[#146BFF] selection:text-white"
    >
        {/* Hidden File Inputs */}
        <input
          ref={addImageInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleAddImage}
          className="hidden"
        />
        <input
          ref={replaceImageInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleReplaceImage}
          className="hidden"
        />
        <input
          ref={coverImageInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleCoverUpload}
          className="hidden"
        />

        {/* 1. MINIMAL FLOATING TOP NAVIGATION BAR */}
        <header className="sticky top-0 z-40 bg-[#071A41]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Work</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[#146BFF]/30 text-blue-300 font-bold uppercase tracking-wider text-[10px]">
                {currentProject.category}
              </span>
              <span className="text-white/40">&bull;</span>
              <span className="text-white/80 font-medium truncate max-w-xs">{currentProject.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => addImageInputRef.current?.click()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors"
              title="Add another photo to this continuous presentation"
            >
              <Plus className="w-3.5 h-3.5 text-blue-400" />
              <span>Add Visual</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInquiry(`Inquiry about ${currentProject.title}`);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md shadow-[#146BFF]/30 transition-all"
            >
              <span>Start a Project Like This</span>
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

        {/* Floating Notification Toast */}
        <AnimatePresence>
          {saveSuccessNotice && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-2xl"
            >
              <Check className="w-4 h-4 text-white" />
              <span>{saveSuccessNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. MAIN FULL-SCREEN VERTICAL SCROLLING PRESENTATION */}
        <div className="flex-1 w-full bg-[#051329]">
          
          {/* SECTION 1: PROJECT OPENING SECTION */}
          <section className="pt-16 sm:pt-24 pb-12 sm:pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-white/10">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#146BFF]/20 text-[#60A5FA] border border-[#146BFF]/30 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#60A5FA]" />
                  <span>{currentProject.category}</span>
                </div>

                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                  {currentProject.title}
                </h1>

                <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
                  {currentProject.description}
                </p>
              </div>

              {/* Minimal Project Metadata */}
              <div className="flex sm:flex-col gap-4 text-left border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-8 shrink-0">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Client</div>
                  <div className="text-sm font-semibold text-white">{currentProject.client.split('(')[0]}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Year</div>
                  <div className="text-sm font-semibold text-white">{currentProject.year}</div>
                </div>

                {currentProject.impactMetric && (
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Impact</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{currentProject.impactMetric}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STRONG HERO VISUAL */}
            <div className="mt-12 rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-black shadow-2xl relative group">
              <img
                src={currentProject.coverImage}
                alt={currentProject.title}
                className="w-full h-auto max-h-[80vh] object-cover object-center"
              />

              {/* Subtle Replace Cover Button on Hover */}
              <button
                onClick={() => coverImageInputRef.current?.click()}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black text-white text-xs font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Replace Cover Visual</span>
              </button>
            </div>
          </section>

          {/* SECTION 2: CONTINUOUS VERTICAL IMAGE SEQUENCE (Behance-Style Pure Scrolling) */}
          <section className="py-8 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
            
            {/* Primary Video Player if this is a video project */}
            {currentProject.videoUrl && (
              <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-black shadow-2xl relative">
                <video
                  src={currentProject.videoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[85vh] object-cover mx-auto"
                />
              </div>
            )}

            {/* Secondary Video Player if available */}
            {currentProject.secondaryVideoUrl && (
              <div className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-black shadow-2xl relative">
                <video
                  src={currentProject.secondaryVideoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[85vh] object-cover mx-auto"
                />
              </div>
            )}

            {/* Curated High-Impact Presentation Visuals (No Generic 7-Photo Dump) */}
            {visibleImages.map((imageUrl, idx) => (
              <div
                key={idx}
                className="group relative rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/10 bg-slate-900/60 shadow-2xl transition-all"
              >
                <img
                  src={imageUrl}
                  alt={`${currentProject.title} - Visual Presentation #${idx + 1}`}
                  loading="lazy"
                  className="w-full h-auto max-h-[90vh] object-contain sm:object-cover mx-auto select-none"
                />

                {/* Floating Admin Controls for this Visual */}
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => triggerReplace(idx)}
                    className="px-3 py-1.5 rounded-xl bg-black/75 hover:bg-black text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md transition-all"
                    title="Replace this visual"
                  >
                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                    <span>Replace Visual</span>
                  </button>

                  <button
                    onClick={() => handleRemove(idx)}
                    className="p-1.5 rounded-xl bg-rose-900/80 hover:bg-rose-700 text-white text-xs font-bold backdrop-blur-md shadow-md transition-all"
                    title="Remove visual"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

                {/* Visual Sequence Index Marker */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[11px] font-bold">
                  Presentation Visual {idx + 1}
                </div>
              </div>
            ))}

            {/* Optional Expansion Toggle if Project Has Additional Visuals */}
            {!showAllVisuals && projectImages.length > 2 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllVisuals(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all hover:scale-105"
                >
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>View Additional Artifacts ({projectImages.length - 2} more)</span>
                </button>
              </div>
            )}

            {/* Quick Add Visual Trigger at the End of Sequence */}
            <div className="text-center pt-6">
              <button
                onClick={() => addImageInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all"
              >
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add Custom Visual to Sequence</span>
              </button>
            </div>
          </section>

          {/* SECTION 3: PROJECT CLOSING SECTION */}
          <section className="py-24 sm:py-32 border-t border-white/10 bg-[#071A41] text-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <span>{currentProject.category} &bull; End of Project</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {currentProject.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                Trusted by industry leaders, fast-growing tech giants & global brands.
              </p>

              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry(`Inquiry about ${currentProject.title}`);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#146BFF] hover:bg-[#0052FF] text-white text-sm font-bold shadow-xl shadow-[#146BFF]/30 transition-all hover:scale-105"
                >
                  <span>Start a Project Like This</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Work</span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </motion.div>
  );
};
