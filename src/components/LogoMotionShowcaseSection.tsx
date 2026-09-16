import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Upload, 
  Edit3, 
  Check, 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Layers, 
  Cpu, 
  MoveRight,
  ShieldCheck,
  Eye,
  Camera
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { BrandLogo } from './BrandLogo';

export const LogoMotionShowcaseSection: React.FC = () => {
  const { settings, updateSettings } = useStudioContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for interactive editing
  const [isEditing, setIsEditing] = useState(false);
  const [brandName, setBrandName] = useState(settings.logoMotionBrandName || 'Digital With Habib');
  const [tagline, setTagline] = useState(settings.logoMotionTagline || 'Kinetic Identity & High-Performance Brand Architecture');
  const [serviceTags, setServiceTags] = useState<string[]>(
    settings.logoMotionServiceTags || ['Brand Architecture', 'Kinetic Systems', '3D Visuals', 'Digital Experience']
  );
  const [newTagInput, setNewTagInput] = useState('');
  const [showSaveToast, setShowSaveToast] = useState(false);

  // 3D Card Hover Perspective
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardRotate({
      x: -y * 0.04,
      y: x * 0.04
    });
  };

  const handleCardMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          updateSettings({ logoMotionCustomLogoUrl: url });
          triggerSaveToast('Custom Logo uploaded & saved permanently!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCustomLogo = () => {
    updateSettings({ logoMotionCustomLogoUrl: null });
    triggerSaveToast('Reset to default animated brand mark.');
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !serviceTags.includes(newTagInput.trim())) {
      const updated = [...serviceTags, newTagInput.trim()];
      setServiceTags(updated);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (idx: number) => {
    const updated = serviceTags.filter((_, i) => i !== idx);
    setServiceTags(updated);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      logoMotionBrandName: brandName,
      logoMotionTagline: tagline,
      logoMotionServiceTags: serviceTags
    });
    setIsEditing(false);
    triggerSaveToast('Logo Showcase content saved permanently!');
  };

  const triggerSaveToast = (msg: string) => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  const customLogo = settings.logoMotionCustomLogoUrl || settings.customLogoUrl;

  return (
    <section 
      id="logo-motion-showcase" 
      className="py-24 sm:py-32 bg-[#051329] relative overflow-hidden border-b border-white/10 select-none"
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/svg+xml,image/png,image/jpeg,image/webp"
        onChange={handleLogoUpload}
        className="hidden"
      />

      {/* Floating Save Confirmation */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-white" />
            <span>Changes permanently saved!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Futuristic Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#146BFF]/25 via-[#00D2FF]/20 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#146BFF]/15 blur-[100px] pointer-events-none rounded-full" />

      {/* Subtle Futuristic Grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Futuristic Badge and Admin Edit Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#146BFF]/20 border border-[#146BFF]/40 text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-[#146BFF]/10 backdrop-blur-md"
            >
              <Cpu className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>Next-Gen Identity &bull; Motion Brand Architecture</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
            >
              Kinetic Identity In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#146BFF] to-[#60A5FA]">
                Futuristic Motion.
              </span>
            </motion.h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 backdrop-blur-md transition-all"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>{isEditing ? 'Close Editor' : 'Edit Showcase Content'}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-lg shadow-[#146BFF]/30 transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Logo</span>
            </button>
          </div>
        </div>

        {/* Edit Form Panel (Expands when Edit clicked) */}
        <AnimatePresence>
          {isEditing && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSaveAll}
              className="mb-12 p-6 sm:p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl space-y-5 text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Edit Logo Showcase Details (Saves Permanently)
                </span>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-sm font-bold text-white focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-sm font-medium text-slate-200 focus:border-[#00D2FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Service Tags Management */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  Service Tags (Click tag to remove)
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {serviceTags.map((tag, idx) => (
                    <span
                      key={idx}
                      onClick={() => handleRemoveTag(idx)}
                      className="group cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/30 border border-white/15 text-xs font-semibold text-white transition-colors"
                      title="Click to remove"
                    >
                      <span>{tag}</span>
                      <X className="w-3 h-3 text-slate-400 group-hover:text-white" />
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 max-w-md">
                  <input
                    type="text"
                    placeholder="Add service tag (e.g. 3D Systems)"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-xs text-white focus:border-[#00D2FF] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* HERO LOGO MOTION SHOWCASE CARD with Glassmorphism & Soft Blue Futuristic Glow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onMouseMove={handleCardMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
            transition: isHovered ? 'none' : 'transform 0.5s ease-out'
          }}
          className="relative rounded-[36px] sm:rounded-[44px] bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/20 p-8 sm:p-14 lg:p-16 shadow-2xl backdrop-blur-2xl overflow-hidden group"
        >
          {/* Animated Ambient Glow Orbit */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.08, 1]
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 25, ease: 'linear' },
              scale: { repeat: Infinity, duration: 8, ease: 'easeInOut' }
            }}
            className="absolute -top-32 -left-32 w-96 h-96 bg-[#146BFF]/30 rounded-full blur-[90px] pointer-events-none"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.12, 1]
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 30, ease: 'linear' },
              scale: { repeat: Infinity, duration: 9, ease: 'easeInOut' }
            }}
            className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#00D2FF]/20 rounded-full blur-[90px] pointer-events-none"
          />

          {/* Interactive Light Beam Sweep on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Animated Logo Reveal Emblem */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                
                {/* Outer Futuristic Glowing Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                  className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-dashed border-[#146BFF]/40 pointer-events-none"
                />

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                  className="absolute w-52 sm:w-64 h-52 sm:h-64 rounded-full border border-[#00D2FF]/30 pointer-events-none"
                />

                {/* Soft Blue Center Aura */}
                <div className="absolute w-44 sm:w-56 h-44 sm:h-56 rounded-full bg-gradient-to-tr from-[#146BFF]/40 to-[#00D2FF]/40 blur-2xl animate-pulse pointer-events-none" />

                {/* Floating Central Emblem Container */}
                <motion.div
                  animate={{
                    y: [-6, 6, -6],
                    rotateZ: [-1, 1, -1]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut'
                  }}
                  className="relative w-40 sm:w-48 h-40 sm:h-48 rounded-[32px] bg-black/60 border-2 border-white/20 shadow-2xl backdrop-blur-xl flex items-center justify-center p-6 group/emblem"
                >
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />

                  {/* Logo Display (Custom uploaded or dynamic vector BrandLogo) */}
                  {customLogo ? (
                    <motion.img
                      src={customLogo}
                      alt="Brand Logo"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="max-h-24 sm:max-h-28 max-w-full object-contain filter drop-shadow-[0_0_20px_rgba(20,107,255,0.6)]"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center transform group-hover/emblem:scale-105 transition-transform duration-300">
                      <BrandLogo variant="icon" size="xl" />
                    </div>
                  )}

                  {/* Quick Change Logo Button on Hover */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-[30px] bg-black/80 backdrop-blur-md opacity-0 group-hover/emblem:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-bold gap-1"
                    title="Upload new logo"
                  >
                    <Camera className="w-5 h-5 text-[#00D2FF]" />
                    <span>Change Logo</span>
                  </button>
                </motion.div>

              </div>

              {/* Status Pill */}
              <div className="mt-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-slate-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Kinetic 3D Engine Active</span>
              </div>
            </div>

            {/* Right Column: Narrative, Interactive Tags & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Brand Showcase</span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {settings.logoMotionBrandName || brandName}
                </h3>

                <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
                  {settings.logoMotionTagline || tagline}
                </p>
              </div>

              {/* Dynamic Service Tags with Futuristic Pill Design */}
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Integrated Capabilities
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {(settings.logoMotionServiceTags || serviceTags).map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-2xl bg-white/[0.08] hover:bg-[#146BFF]/30 border border-white/15 hover:border-[#146BFF]/60 text-xs font-semibold text-white transition-all shadow-sm cursor-default flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                      <span>{tag}</span>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Controls */}
              <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-white/10">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#146BFF] to-[#0052FF] hover:from-[#0052FF] hover:to-[#146BFF] text-white text-xs font-bold shadow-lg shadow-[#146BFF]/30 transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Original Logo (.svg / .png)</span>
                </button>

                {customLogo && (
                  <button
                    onClick={handleRemoveCustomLogo}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Default Monogram</span>
                  </button>
                )}

                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>Edit Brand Text</span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
