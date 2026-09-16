import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Play, 
  Video, 
  Upload, 
  Image as ImageIcon,
  Layers
} from 'lucide-react';
import { ProjectCategory, ProjectItem } from '../types';
import { useStudioContent } from '../context/StudioContentContext';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenInquiry: (serviceName?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject, onOpenInquiry }) => {
  const { projects, updateProjectMedia } = useStudioContent();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  
  // Quick upload triggers for video projects
  const [targetVideoProjectId, setTargetVideoProjectId] = useState<string | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const coverPhotoInputRef = useRef<HTMLInputElement>(null);

  // Exact categories requested: 6 Brand Identity, 6 UI/UX & App Dev, 2 Video & Motion (No marketing)
  const categories: { label: ProjectCategory; count: number }[] = [
    { label: 'All', count: projects.length },
    { label: 'Brand Identity', count: projects.filter(p => p.category === 'Brand Identity').length },
    { label: 'UI/UX & App Dev', count: projects.filter(p => p.category === 'UI/UX & App Dev').length },
    { label: 'Video & Motion', count: projects.filter(p => p.category === 'Video & Motion').length }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetVideoProjectId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProjectMedia(targetVideoProjectId, 'videoUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetVideoProjectId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateProjectMedia(targetVideoProjectId, 'coverImage', event.target.result as string);
          updateProjectMedia(targetVideoProjectId, 'coverPhoto', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="work" className="py-24 sm:py-32 bg-white relative">
      
      {/* Hidden file inputs for quick video project updates */}
      <input
        ref={videoFileInputRef}
        type="file"
        accept="video/mp4,video/webm"
        onChange={handleVideoUpload}
        className="hidden"
      />
      <input
        ref={coverPhotoInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleCoverPhotoUpload}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#146BFF] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Work Showcase</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-[#071A41] tracking-tight leading-[1.15]">
              Proven Results For <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#146BFF] to-[#00D2FF]">
                Ambitious Brands.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base text-slate-600 leading-relaxed">
            14 curated signature case studies across 6 Brand Identities, 6 UI/UX App Developments, and 2 Cinematic Video & Motion productions.
          </p>
        </div>

        {/* Filter Pills with Motion Glass Style */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-8 border-b border-slate-100 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(cat.label)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#146BFF] to-[#0052FF] shadow-lg shadow-[#146BFF]/25 border border-white/20'
                    : 'text-slate-600 bg-slate-100/90 hover:bg-slate-200/90 hover:text-[#071A41] border border-slate-200/60'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const isVideoProject = project.category === 'Video & Motion' || project.category === 'Video Editing' || project.category === 'Motion Graphics';
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => onSelectProject(project)}
                  className="group cursor-pointer rounded-[32px] overflow-hidden bg-[#F7F9FC] border border-slate-200/90 hover:border-[#146BFF]/50 shadow-sm hover:shadow-2xl hover:shadow-[#146BFF]/15 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Media Container with Zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    {isVideoProject && project.videoUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={project.coverPhoto || project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/90 text-[#146BFF] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A41]/85 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-[#071A41] shadow-sm">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                        <TrendingUp className="w-3 h-3" />
                        {project.impactMetric}
                      </span>
                    </div>

                    {/* Quick Video & Cover Photo Upload Option for Video & Motion projects */}
                    {isVideoProject && (
                      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTargetVideoProjectId(project.id);
                            coverPhotoInputRef.current?.click();
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black text-white text-[10px] font-bold border border-white/20 backdrop-blur-sm shadow-md"
                          title="Upload new cover photo for this video"
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Cover Photo</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTargetVideoProjectId(project.id);
                            videoFileInputRef.current?.click();
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#146BFF] hover:bg-[#0052FF] text-white text-[10px] font-bold shadow-md"
                          title="Upload custom video MP4"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Video (.mp4)</span>
                        </button>
                      </div>
                    )}

                    {/* Center Hover Reveal Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="px-5 py-2.5 rounded-full bg-white text-[#071A41] text-xs font-bold flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span>Inspect Signature Case Study</span>
                        <ArrowUpRight className="w-4 h-4 text-[#0052FF]" />
                      </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-1">
                        {project.client} &bull; {project.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#071A41] group-hover:text-[#0052FF] transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Tags & View Link */}
                    <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">
                        {project.tag}
                      </span>
                      <div className="inline-flex items-center gap-1 text-xs font-black text-[#0052FF] group-hover:translate-x-1 transition-transform">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Global CTA below projects */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenInquiry()}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#071A41] hover:bg-[#146BFF] text-white font-bold text-sm sm:text-base tracking-tight shadow-xl hover:shadow-[#146BFF]/30 transition-all duration-300"
          >
            <span>Have A Specific Project In Mind?</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};
