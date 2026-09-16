import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Camera, Edit3, X, Check, Sparkles, Upload } from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { HaloClientAvatar } from '../types';

interface TestimonialsSectionProps {
  onOpenInquiry?: (service?: string) => void;
}

interface TestimonialCardItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenInquiry }) => {
  const { haloAvatars, updateHaloAvatar, updateHaloAvatarPhoto } = useStudioContent();
  const [hoveredAvatar, setHoveredAvatar] = useState<HaloClientAvatar | null>(null);
  const [editingAvatar, setEditingAvatar] = useState<HaloClientAvatar | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    company: string;
    role: string;
    quoteSnippet: string;
  }>({ name: '', company: '', role: '', quoteSnippet: '' });

  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const [targetAvatarIdForUpload, setTargetAvatarIdForUpload] = useState<string | null>(null);

  // Quick direct photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetAvatarIdForUpload) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      updateHaloAvatarPhoto(targetAvatarIdForUpload, base64);
      if (editingAvatar && editingAvatar.id === targetAvatarIdForUpload) {
        setEditingAvatar({ ...editingAvatar, avatar: base64 });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const openEditModal = (avatar: HaloClientAvatar, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingAvatar(avatar);
    setEditForm({
      name: avatar.name,
      company: avatar.company,
      role: avatar.role,
      quoteSnippet: avatar.quoteSnippet
    });
  };

  const saveEditModal = () => {
    if (!editingAvatar) return;
    updateHaloAvatar(editingAvatar.id, editForm);
    setEditingAvatar(null);
  };

  const triggerDirectPhotoUpload = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetAvatarIdForUpload(id);
    avatarFileInputRef.current?.click();
  };

  // 3 Verified Client Testimonial Cards
  const testimonials: TestimonialCardItem[] = [
    {
      id: 'alexia',
      author: 'Alexia Fran',
      role: 'Marketing Lead',
      company: 'RelayOne',
      rating: 5,
      quote:
        "I've loved working with Habib and the studio. I didn't need to explain things twice. The design and website showed up looking exactly how I pictured it.",
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'eli',
      author: 'Eli Ramos',
      role: 'Founder',
      company: 'Milles Tech',
      rating: 5,
      quote:
        'Every request was handled quickly and nailed on the first pass. Genuinely the most efficient design and motion experience I’ve had with any agency.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'maya',
      author: 'Maya Kim',
      role: 'Head of Product',
      company: 'Hopsk',
      rating: 5,
      quote:
        'Clean process, great work, and no hand-holding required. It felt like having a senior designer on standby without the back-and-forth.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#F7F9FC] via-white to-[#F7F9FC] relative overflow-hidden border-t border-blue-100/60">
      
      {/* Hidden File Input for Client Photo Upload */}
      <input
        ref={avatarFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Background Soft Atmospheric Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-blue-100/40 via-cyan-50/20 to-transparent rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ========================================================= */}
        {/* 1. CURVED CLIENT AVATAR ARCH + COMPACT CENTRAL STATEMENT   */}
        {/* Clean layout where headline NEVER covers avatars          */}
        {/* ========================================================= */}
        <div className="relative min-h-[500px] sm:min-h-[560px] flex flex-col items-center justify-end pb-12 pt-8">
          
          {/* Symmetrical High-Clearance Arch of Floating Circular Avatars */}
          <div className="absolute inset-0 max-w-5xl mx-auto pointer-events-none">
            {haloAvatars.map((item) => (
              <motion.div
                key={item.id}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4.8,
                  delay: item.floatDelay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute pointer-events-auto"
                onMouseEnter={() => setHoveredAvatar(item)}
                onMouseLeave={() => setHoveredAvatar(null)}
              >
                <div
                  style={{ width: item.size, height: item.size }}
                  className="rounded-full p-1 bg-white shadow-[0_10px_25px_rgba(0,82,255,0.12)] hover:shadow-[0_18px_36px_rgba(0,82,255,0.25)] hover:scale-110 transition-all duration-300 cursor-pointer border border-blue-100 relative group"
                  onClick={() => openEditModal(item)}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full select-none"
                  />

                  {/* Tiny Active Presence Dot */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />

                  {/* Hover Camera/Edit Overlay for Quick Photo Change */}
                  <button
                    onClick={(e) => triggerDirectPhotoUpload(item.id, e)}
                    title="Change profile photo"
                    className="absolute inset-0 rounded-full bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs"
                  >
                    <Camera className="w-4 h-4 text-white drop-shadow-sm" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Floating Hover Tooltip for Avatars */}
          <AnimatePresence>
            {hoveredAvatar && !editingAvatar && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-4 z-40 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-200 shadow-xl text-center pointer-events-none max-w-xs"
              >
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
                  {[...Array(hoveredAvatar.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <div className="text-xs font-bold text-[#071A41]">
                  {hoveredAvatar.name} &bull; <span className="text-slate-500">{hoveredAvatar.company}</span>
                </div>
                <div className="text-[11px] text-[#0052FF] font-medium italic mt-0.5">
                  "{hoveredAvatar.quoteSnippet}"
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <Edit3 className="w-2.5 h-2.5" /> Click to edit photo or details
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Stage: Compact & Sized Appropriately so it NEVER overlaps avatars */}
          <div className="relative z-20 text-center max-w-xl mx-auto space-y-4 px-4 mt-auto">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#071A41] tracking-tight leading-snug"
            >
              100+ clients getting{' '}
              <span className="font-serif italic font-normal tracking-tight text-[#0052FF]">
                better design, faster.
              </span>
            </motion.h2>

            <p className="text-xs text-slate-500 font-medium">
              Click any client avatar above to edit photo &bull; Saved permanently forever
            </p>

            {/* Floating Capsule: Book a 15-min intro call - Available now */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="pt-2 flex justify-center"
            >
              <button
                onClick={() => onOpenInquiry?.('General Inquiry')}
                className="btn-futuristic-perfect group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold shadow-[0_10px_25px_rgba(0,82,255,0.22)] hover:shadow-[0_16px_36px_rgba(0,82,255,0.35)] transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/60 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    alt="Habib Ahmed"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Book a 15-min intro call</span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold text-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Available now</span>
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. "TURNS OUT, PEOPLE LIKE GETTING THINGS DONE." SECTION  */}
        {/* ========================================================= */}
        <div className="pt-16 sm:pt-24">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0052FF] text-xs font-bold uppercase tracking-wider border border-blue-200/80">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Testimonials</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-[#071A41] tracking-tight leading-tight">
              Turns out, people like <br />
              getting things{' '}
              <span className="font-serif italic font-normal text-slate-800">
                done.
              </span>
            </h3>
          </div>

          {/* 3 Sleek White Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="p-7 sm:p-8 rounded-[30px] bg-white border border-blue-100/90 shadow-[0_10px_30px_rgba(0,82,255,0.05)] hover:shadow-[0_18px_45px_rgba(0,82,255,0.12)] transition-all flex flex-col justify-between relative group"
              >
                {/* Quotation Mark Watermark */}
                <div className="absolute top-5 right-7 text-5xl font-serif text-blue-100 font-bold select-none pointer-events-none group-hover:text-blue-200 transition-colors">
                  &ldquo;
                </div>

                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed mb-6">
                    "{item.quote}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-100 shadow-xs shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#071A41]">
                      {item.author}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {item.role}, <span className="font-bold text-[#0052FF]">{item.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Modal to Edit Client Avatar & Profile Details */}
      <AnimatePresence>
        {editingAvatar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-100 relative"
            >
              <button
                onClick={() => setEditingAvatar(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-[#071A41] mb-1 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#0052FF]" />
                Edit Client Profile
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Update client photo and information. Changes are saved permanently forever.
              </p>

              {/* Photo Preview & Change Button */}
              <div className="flex items-center gap-4 mb-5 p-3 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 relative group">
                  <img
                    src={editingAvatar.avatar}
                    alt={editingAvatar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <button
                    onClick={(e) => triggerDirectPhotoUpload(editingAvatar.id, e)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0052FF] hover:bg-[#0040CC] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                  <p className="text-[11px] text-slate-400 mt-1">Supports PNG, JPG, WebP</p>
                </div>
              </div>

              {/* Edit Form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quote Snippet</label>
                  <textarea
                    rows={2}
                    value={editForm.quoteSnippet}
                    onChange={(e) => setEditForm({ ...editForm, quoteSnippet: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052FF] resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setEditingAvatar(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditModal}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0052FF] hover:bg-[#0040CC] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
