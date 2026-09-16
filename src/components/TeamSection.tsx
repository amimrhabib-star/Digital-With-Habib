import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowUpRight, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck,
  Briefcase,
  Camera,
  Edit3,
  Upload,
  Check,
  X,
  Save
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { TeamSpecialist } from '../types';
import { compressAndConvertToDataUrl } from '../utils/persistentStorage';

interface TeamSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenInquiry }) => {
  const { 
    teamSpecialists, 
    founderData, 
    updateTeamSpecialist, 
    updateTeamSpecialistPhoto,
    updateFounderData,
    updateFounderPhoto 
  } = useStudioContent();

  const [editingSpecialist, setEditingSpecialist] = useState<TeamSpecialist | null>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editProjectsCount, setEditProjectsCount] = useState(0);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Hidden file inputs
  const teamPhotoInputRef = useRef<HTMLInputElement>(null);
  const targetMemberIdRef = useRef<string | null>(null);
  const founderPhotoInputRef = useRef<HTMLInputElement>(null);

  const directPracticeAreas = [
    'Brand Identity',
    'Graphic Design',
    'UI/UX Architecture',
    'Web Engineering',
    'Performance Growth',
    'Video & Motion'
  ];

  const handleTriggerPhotoUpload = (memberId: string) => {
    targetMemberIdRef.current = memberId;
    teamPhotoInputRef.current?.click();
  };

  const handleTeamPhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetMemberIdRef.current) {
      try {
        const base64 = await compressAndConvertToDataUrl(file, 800, 800, 0.88);
        if (base64) {
          updateTeamSpecialistPhoto(targetMemberIdRef.current!, base64);
          setSaveSuccessMsg('Team member photo updated & permanently saved!');
          setTimeout(() => setSaveSuccessMsg(null), 2500);
        }
      } catch (err) {
        console.error('Failed to compress team photo:', err);
      }
    }
  };

  const handleFounderPhotoSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await compressAndConvertToDataUrl(file, 800, 800, 0.88);
        if (base64) {
          updateFounderPhoto(base64);
          setSaveSuccessMsg('Founder photo updated & permanently saved!');
          setTimeout(() => setSaveSuccessMsg(null), 2500);
        }
      } catch (err) {
        console.error('Failed to compress founder photo:', err);
      }
    }
  };

  const openSpecialistEditor = (member: TeamSpecialist) => {
    setEditingSpecialist(member);
    setEditName(member.name);
    setEditRole(member.role);
    setEditBio(member.bio);
    setEditProjectsCount(member.projectsCount);
  };

  const handleSaveSpecialist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpecialist) return;

    updateTeamSpecialist(editingSpecialist.id, {
      name: editName,
      role: editRole,
      bio: editBio,
      projectsCount: editProjectsCount
    });

    setSaveSuccessMsg('Team member details permanently saved!');
    setTimeout(() => setSaveSuccessMsg(null), 2500);
    setEditingSpecialist(null);
  };

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#F7F9FC] relative border-t border-slate-200/70">
      
      {/* Hidden file inputs for direct photo uploads */}
      <input
        ref={teamPhotoInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleTeamPhotoSelected}
        className="hidden"
      />

      <input
        ref={founderPhotoInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFounderPhotoSelected}
        className="hidden"
      />

      {/* Floating Save Toast */}
      <AnimatePresence>
        {saveSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-white" />
            <span>{saveSuccessMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PART 1: 5 PORTFOLIO SPECIALISTS */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-[#146BFF] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
              <Briefcase className="w-3.5 h-3.5" />
              <span>5 Portfolio Specialists &bull; Creative Leadership</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#071A41] tracking-tight leading-[1.15] mb-4">
              People behind the portfolio.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Meet our 5 specialists across branding, product design, video motion, marketing and web engineering. Every discipline is led with passion and craft.
            </p>
          </div>

          {/* Grid of 5 Specialists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamSpecialists.map((member) => (
              <div
                key={member.id}
                className="group rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
              >
                <div>
                  {/* Photo with Project Count Badge & Direct Change Photo Trigger */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-blue-400" />
                      <span>{member.projectsCount} Projects</span>
                    </div>

                    {/* Quick photo upload button on hover */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleTriggerPhotoUpload(member.id)}
                        className="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black text-white text-[11px] font-bold backdrop-blur-md flex items-center gap-1 shadow-sm transition-all"
                        title="Upload new photo for this team member"
                      >
                        <Camera className="w-3 h-3 text-blue-400" />
                        <span>Change Photo</span>
                      </button>

                      <button
                        onClick={() => openSpecialistEditor(member)}
                        className="p-1 rounded-lg bg-black/70 hover:bg-black text-white text-[11px] font-bold backdrop-blur-md shadow-sm transition-all"
                        title="Edit name, role, and text"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-[#071A41] mb-0.5">
                        {member.name}
                      </h3>
                      <button
                        onClick={() => openSpecialistEditor(member)}
                        className="text-xs text-slate-400 hover:text-[#146BFF] font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs font-bold text-[#146BFF] uppercase tracking-wide mb-3">
                      {member.role}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Skill Tags */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {member.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: HABIB AHMED EXECUTIVE FOUNDER CARD */}
        <div className="rounded-[36px] bg-white border border-slate-200/80 shadow-xl overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Founder Portrait with Upload Trigger */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-[28px] overflow-hidden bg-slate-900 shadow-xl border-4 border-white group">
                <img
                  src={founderData.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
                  alt={`${founderData.name} - ${founderData.role}`}
                  className="w-full h-full object-cover object-top"
                />

                {/* Change Founder Photo Button */}
                <button
                  onClick={() => founderPhotoInputRef.current?.click()}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-black/75 hover:bg-black text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  <span>Change Photo</span>
                </button>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl font-black text-[#071A41]">{founderData.name}</h3>
                <p className="text-xs font-bold text-[#146BFF] uppercase tracking-wider">
                  {founderData.role}
                </p>
              </div>
            </div>

            {/* Right: Practice Areas, Bio, Actions */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#071A41] mb-1">
                  {founderData.name}
                </h3>
                <div className="text-sm font-bold text-[#146BFF] uppercase tracking-wide mb-4">
                  {founderData.title}
                </div>

                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-2">
                  {Array.isArray(founderData.bio) ? (
                    founderData.bio.map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <p>{founderData.bio}</p>
                  )}
                </div>
              </div>

              {/* Direct Practice Areas */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Direct Practice Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {directPracticeAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-bold px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#146BFF] transition-colors cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Leadership CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenInquiry('Work Directly With Our Directors')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#146BFF] hover:bg-[#0052FF] text-white font-bold text-sm shadow-md shadow-[#146BFF]/25 transition-all"
                >
                  <span>Work Directly With Our Directors</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenInquiry('Send Direct Inquiry')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#071A41] font-semibold text-sm transition-all"
                >
                  <Send className="w-4 h-4 text-slate-600" />
                  <span>Send Direct Inquiry</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Edit Specialist Modal */}
      <AnimatePresence>
        {editingSpecialist && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#071A41]/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setEditingSpecialist(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#071A41]">
                    Edit Team Specialist
                  </h3>
                  <p className="text-xs text-slate-400">
                    Changes save permanently to IndexedDB storage
                  </p>
                </div>
                <button
                  onClick={() => setEditingSpecialist(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-[#071A41] hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSpecialist} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Specialist Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Bio / Description
                  </label>
                  <textarea
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-normal text-slate-700 focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Completed Projects Count
                  </label>
                  <input
                    type="number"
                    value={editProjectsCount}
                    onChange={(e) => setEditProjectsCount(parseInt(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSpecialist(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md shadow-[#146BFF]/25 flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
