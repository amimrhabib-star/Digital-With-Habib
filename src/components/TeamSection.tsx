import { Copy } from './Copy';
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
import { uploadFile } from '../utils/api';

interface TeamSectionProps {
  onOpenInquiry: (topic?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenInquiry }) => {
  const {teamSpecialists,founderData,isAdmin,content,saveContent,loadError}=useStudioContent();
  const [photoProgress,setPhotoProgress]=useState<number|null>(null);
  const [photoStatus,setPhotoStatus]=useState('');
  const [photoError,setPhotoError]=useState('');
  const photoInput=useRef<HTMLInputElement>(null);
  const changeFounderPhoto=async(file?:File)=>{
    if(!file||!isAdmin)return;
    setPhotoError('');setPhotoStatus('');setPhotoProgress(0);
    try{
      const image=await uploadFile(file,setPhotoProgress);
      setPhotoStatus('Saving photo…');
      await saveContent({...content,founderData:{...founderData,image}});
      setPhotoStatus('Founder photo saved.');
    }catch(error){setPhotoError(error instanceof Error?error.message:'Unable to save the photo. Please retry.');setPhotoStatus('');}
    finally{setPhotoProgress(null);}
  };

  return (
    <section id="team" className="py-24 sm:py-32 bg-[var(--brand-surface)] text-[var(--brand-ink)] relative border-t border-slate-200 font-['Inter',sans-serif]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TEAM HEADER */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200 mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[var(--brand-primary)] text-xs font-mono uppercase tracking-wider mb-4 border border-blue-200/80">
                <Briefcase className="w-3.5 h-3.5" />
                <span><Copy id="Team Section · 01">Team</Copy></span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[var(--brand-ink)] tracking-tight leading-[1.15]"><Copy id="Team Section · 02">
                Small team, </Copy><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] via-[#146BFF] to-[var(--brand-accent)]"><Copy id="Team Section · 03">
                  big dedication.
                </Copy></span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 font-normal max-w-md leading-relaxed"><Copy id="Team Section · 04">
              We are a focused creative team working closely with clients to bring ideas to life with care and attention to detail.
            </Copy></p>
          </motion.div>

          {/* Grid of Specialists */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamSpecialists.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--brand-primary)]/40 transition-all flex flex-col justify-between relative"
              >
                <div>
                  {/* Photo with Project Count Badge & Direct Change Photo Trigger */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 border border-white/10">
                      <Briefcase className="w-3 h-3 text-[var(--brand-accent)]" />
                      <span>{member.projectsCount}<Copy id="Team Section · 05"> Projects</Copy></span>
                    </div>

                    {/* Quick photo upload button on hover */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      

                      
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[var(--brand-ink)] mb-0.5">
                        {member.name}
                      </h3>
                      
                    </div>
                    <div className="text-base sm:text-lg font-mono text-[var(--brand-primary)] uppercase tracking-wide leading-snug break-words mb-3 font-bold">
                      {member.role}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Skill Tags */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {member.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PART 2: EXECUTIVE FOUNDER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-8 sm:p-12 lg:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Founder Portrait with Upload Trigger */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-[300px] aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200 group">
                <img
                  src={founderData.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"}
                  alt={`${founderData.name} - ${founderData.role}`}
                  className="w-full h-full object-cover object-top"
                />

                {/* Change Founder Photo Button */}
                {isAdmin&&<>
                  <input ref={photoInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" aria-label="Choose founder photo" onChange={e=>{void changeFounderPhoto(e.target.files?.[0]);e.target.value='';}}/>
                  <button type="button" disabled={photoProgress!==null||!!loadError} onClick={()=>photoInput.current?.click()} className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-70">
                    <Camera className="w-4 h-4"/>{photoProgress!==null?(photoProgress===100?'Saving photo…':`Uploading ${photoProgress}%`):'Change founder photo'}
                  </button>
                </>}
              </div>
              {isAdmin&&photoStatus&&<p className="mt-3 text-sm text-[var(--brand-primary)]" role="status">{photoStatus}</p>}
              {isAdmin&&photoError&&<p className="mt-3 text-sm text-red-600" role="alert">{photoError}</p>}

              <div className="mt-4 text-center">
                <h3 className="text-2xl font-extrabold text-[var(--brand-ink)]">{founderData.name}</h3>
                <p className="mt-1 text-base sm:text-lg font-mono text-[var(--brand-primary)] uppercase tracking-wide leading-snug font-bold">
                  {founderData.role}
                </p>
              </div>
            </div>

            {/* Right: Founder Bio and Actions */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--brand-ink)] mb-1">
                    {founderData.name}
                  </h3>
                  <div className="text-base sm:text-lg font-mono text-[var(--brand-primary)] uppercase tracking-wide leading-snug mb-4 font-bold">
                    {founderData.title}
                  </div>
                </div>

                {/* Edit Leadership Option Button */}
                
              </div>

              <div className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed space-y-2">
                {Array.isArray(founderData.bio) ? (
                  founderData.bio.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p>{founderData.bio}</p>
                )}
              </div>

              {/* Leadership CTA Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenInquiry(founderData.leadershipCtaText || 'Work Directly With Our Directors')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--brand-primary)] hover:bg-[#0047E0] text-white font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <span>{founderData.leadershipCtaText || 'Work Directly With Our Directors'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenInquiry('Send Direct Inquiry')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-[var(--brand-ink)] font-bold text-sm transition-all cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4 text-[var(--brand-primary)]" />
                  <span><Copy id="Team Section · 11">Send Direct Inquiry</Copy></span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>

    </section>
  );
};
