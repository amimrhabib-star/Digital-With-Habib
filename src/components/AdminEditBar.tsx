import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Edit3, 
  Video, 
  Upload, 
  Check, 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  FileUp, 
  CheckCircle2,
  Lock,
  Layers,
  Trash2,
  Plus,
  Users,
  Camera,
  ArrowUpRight,
  Briefcase,
  ShieldCheck,
  Building2,
  Globe
} from 'lucide-react';
import { useStudioContent } from '../context/StudioContentContext';
import { ProjectItem, ProjectCategory, TeamSpecialist, ClientLogoItem } from '../types';
import { compressAndConvertToDataUrl } from '../utils/persistentStorage';

const CATEGORIES: ProjectCategory[] = [
  'Brand Identity',
  'Branding',
  'Logo Design',
  'Graphic Design',
  'UI/UX Design',
  'UI/UX & App Dev',
  'Social Media Design',
  'Print Design',
  'Illustration',
  'Packaging Design',
  'Video Editing',
  'Motion Graphics',
  'Video & Motion'
];

export const AdminEditBar: React.FC = () => {
  const { 
    settings, 
    projects,
    teamSpecialists,
    founderData,
    updateProject,
    addProject,
    deleteProject,
    updateSettings, 
    updateWebsiteLogo, 
    removeWebsiteLogo,
    saveWebsiteLogo,
    updateHeroCardMedia, 
    addProjectImage,
    replaceProjectImage,
    removeProjectImage,
    updateProjectMedia,
    updateTeamSpecialist,
    updateTeamSpecialistPhoto,
    updateFounderData,
    updateFounderPhoto,
    clientLogos,
    updateClientLogo,
    updateClientLogoImage,
    addClientLogo,
    removeClientLogo,
    resetToDefaults, 
    exportBackup, 
    importBackup
  } = useStudioContent();

  const [textModalOpen, setTextModalOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [motionModalOpen, setMotionModalOpen] = useState(false);
  const [projectManagerOpen, setProjectManagerOpen] = useState(false);
  const [teamManagerOpen, setTeamManagerOpen] = useState(false);
  const [clientLogosModalOpen, setClientLogosModalOpen] = useState(false);
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [selectedManageProjectId, setSelectedManageProjectId] = useState<string>(projects[0]?.id || '');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Client Logos Management
  const [selectedClientRegionFilter, setSelectedClientRegionFilter] = useState<'all' | 'bangladeshi' | 'international'>('all');
  const [newClientName, setNewClientName] = useState('');
  const [newClientCategory, setNewClientCategory] = useState('');
  const [newClientRegion, setNewClientRegion] = useState<'bangladeshi' | 'international'>('bangladeshi');
  const [newClientLogoPreview, setNewClientLogoPreview] = useState<string | null>(null);

  const clientLogoFileInputRef = useRef<HTMLInputElement>(null);
  const newClientLogoFileInputRef = useRef<HTMLInputElement>(null);
  const targetReplaceClientLogoIdRef = useRef<string | null>(null);

  // Logo modal state
  const [pendingLogoUrl, setPendingLogoUrl] = useState<string | null>(settings.customLogoUrl);

  // Form states for text modal
  const [headline, setHeadline] = useState(settings.heroHeadline);
  const [highlight, setHighlight] = useState(settings.heroHighlight);
  const [subtitle, setSubtitle] = useState(settings.heroSubtitle);
  const [badgeText, setBadgeText] = useState(settings.heroCardBadgeText);
  const [satisfactionText, setSatisfactionText] = useState(settings.heroSatisfactionText);

  // Project Edit fields state (for current selected project)
  const selectedProject = projects.find(p => p.id === selectedManageProjectId) || projects[0];
  const [editTitle, setEditTitle] = useState(selectedProject?.title || '');
  const [editCategory, setEditCategory] = useState<ProjectCategory>(selectedProject?.category || 'Brand Identity');
  const [editClient, setEditClient] = useState(selectedProject?.client || '');
  const [editYear, setEditYear] = useState(selectedProject?.year || '2025');
  const [editTag, setEditTag] = useState(selectedProject?.tag || '');
  const [editImpact, setEditImpact] = useState(selectedProject?.impactMetric || '');
  const [editDesc, setEditDesc] = useState(selectedProject?.description || '');

  // Keep project edit form synced when user changes selected project in sidebar
  const handleSelectProject = (project: ProjectItem) => {
    setSelectedManageProjectId(project.id);
    setEditTitle(project.title);
    setEditCategory(project.category);
    setEditClient(project.client);
    setEditYear(project.year);
    setEditTag(project.tag);
    setEditImpact(project.impactMetric);
    setEditDesc(project.description);
  };

  // Team Edit states
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState<string>(teamSpecialists[0]?.id || 'zubair');
  const selectedTeamMember = teamSpecialists.find(m => m.id === selectedTeamMemberId) || teamSpecialists[0];
  const [teamName, setTeamName] = useState(selectedTeamMember?.name || '');
  const [teamRole, setTeamRole] = useState(selectedTeamMember?.role || '');
  const [teamBio, setTeamBio] = useState(selectedTeamMember?.bio || '');
  const [teamProjectsCount, setTeamProjectsCount] = useState(selectedTeamMember?.projectsCount || 0);

  const handleSelectTeamMember = (member: TeamSpecialist) => {
    setSelectedTeamMemberId(member.id);
    setTeamName(member.name);
    setTeamRole(member.role);
    setTeamBio(member.bio);
    setTeamProjectsCount(member.projectsCount);
  };

  // File refs
  const websiteLogoFileRef = useRef<HTMLInputElement>(null);
  const motionMediaFileRef = useRef<HTMLInputElement>(null);
  const backupImportFileRef = useRef<HTMLInputElement>(null);
  const projectPhotoAddRef = useRef<HTMLInputElement>(null);
  const projectPhotoReplaceRef = useRef<HTMLInputElement>(null);
  const replaceIdxRef = useRef<number>(0);
  const projectCoverRef = useRef<HTMLInputElement>(null);
  const projectPrimaryVideoRef = useRef<HTMLInputElement>(null);
  const projectSecondaryVideoRef = useRef<HTMLInputElement>(null);
  const teamMemberPhotoRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 2500);
  };

  // CATEGORY CONDITIONAL CHECK:
  // Show the two video upload options ONLY if category is "Video Editing" or "Motion Graphics" (or "Video & Motion")
  const isVideoCategory = (cat: string) => {
    return cat === 'Video Editing' || cat === 'Motion Graphics' || cat === 'Video & Motion';
  };

  const handleSaveText = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      heroHeadline: headline,
      heroHighlight: highlight,
      heroSubtitle: subtitle,
      heroCardBadgeText: badgeText,
      heroSatisfactionText: satisfactionText
    });
    showToast('Website text saved permanently!');
    setTimeout(() => setTextModalOpen(false), 800);
  };

  // LOGO MANAGEMENT: Upload original logo, remove logo, save logo
  const handleWebsiteLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await compressAndConvertToDataUrl(file, 800, 400, 0.9);
        if (url) {
          setPendingLogoUrl(url);
        }
      } catch (err) {
        console.error('Logo upload error:', err);
      }
    }
  };

  const handleSaveLogo = () => {
    saveWebsiteLogo(pendingLogoUrl);
    showToast('Website logo saved permanently!');
    setTimeout(() => setLogoModalOpen(false), 800);
  };

  const handleRemoveLogo = () => {
    setPendingLogoUrl(null);
    removeWebsiteLogo();
    showToast('Custom logo removed. Reverted to default.');
  };

  // HERO MOTION CARD
  const handleMotionMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await compressAndConvertToDataUrl(file, 1600, 1600, 0.85);
        if (url) {
          updateHeroCardMedia(url);
          showToast('Hero motion visual saved permanently!');
          setMotionModalOpen(false);
        }
      } catch (err) {
        console.error('Motion media upload error:', err);
      }
    }
  };

  // PROJECT MEDIA UPLOADS
  const handleAddProjectPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedProject) {
      try {
        const url = await compressAndConvertToDataUrl(file, 1600, 1600, 0.85);
        if (url) {
          addProjectImage(selectedProject.id, url);
          showToast('New photo added & saved permanently!');
        }
      } catch (err) {
        console.error('Project photo upload error:', err);
      }
    }
  };

  const handleReplaceProjectPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedProject) {
      try {
        const url = await compressAndConvertToDataUrl(file, 1600, 1600, 0.85);
        if (url) {
          replaceProjectImage(selectedProject.id, replaceIdxRef.current, url);
          showToast(`Photo #${replaceIdxRef.current + 1} replaced & saved permanently!`);
        }
      } catch (err) {
        console.error('Replace photo error:', err);
      }
    }
  };

  const handleProjectCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedProject) {
      try {
        const url = await compressAndConvertToDataUrl(file, 1600, 1600, 0.85);
        if (url) {
          updateProjectMedia(selectedProject.id, 'coverImage', url);
          showToast('Cover photo updated & saved permanently!');
        }
      } catch (err) {
        console.error('Project cover error:', err);
      }
    }
  };

  const handleProjectPrimaryVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedProject) {
      try {
        const url = await compressAndConvertToDataUrl(file);
        if (url) {
          updateProjectMedia(selectedProject.id, 'videoUrl', url);
          showToast('Primary video uploaded & saved permanently!');
        }
      } catch (err) {
        console.error('Primary video error:', err);
      }
    }
  };

  const handleProjectSecondaryVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedProject) {
      try {
        const url = await compressAndConvertToDataUrl(file);
        if (url) {
          updateProjectMedia(selectedProject.id, 'secondaryVideoUrl', url);
          showToast('Secondary video uploaded & saved permanently!');
        }
      } catch (err) {
        console.error('Secondary video error:', err);
      }
    }
  };

  // SAVE PROJECT DETAILS (Title, Category, Client, Year, etc.)
  const handleSaveProjectDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const updated: ProjectItem = {
      ...selectedProject,
      title: editTitle,
      category: editCategory,
      client: editClient,
      year: editYear,
      tag: editTag,
      impactMetric: editImpact,
      description: editDesc
    };

    updateProject(updated);
    showToast(`Project "${editTitle}" and category "${editCategory}" saved permanently!`);
  };

  // CREATE NEW PROJECT
  const handleCreateNewProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj: ProjectItem = {
      id: newId,
      title: 'New Studio Project',
      client: 'Global Client',
      category: 'Brand Identity',
      tag: 'Brand Identity & Visuals',
      year: '2025',
      impactMetric: '+100% Growth',
      description: 'A bespoke creative case study crafted with precision.',
      coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1608248597359-00f7e44a7ecb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
      ],
      gradient: 'from-blue-900/40 to-black',
      featured: false,
      caseStudy: {
        overview: 'Comprehensive brand transformation.',
        challenge: 'Elevating digital perception.',
        solution: 'Tailored strategy and design architecture.',
        deliverables: ['Brand Assets', 'Design Guidelines'],
        results: ['Increased Engagement']
      }
    };
    addProject(newProj);
    handleSelectProject(newProj);
    showToast('New project created! You can now edit its details and photos.');
  };

  // TEAM MEMBER PHOTO UPLOAD
  const handleTeamMemberPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedTeamMember) {
      try {
        const url = await compressAndConvertToDataUrl(file, 800, 800, 0.88);
        if (url) {
          updateTeamSpecialistPhoto(selectedTeamMember.id, url);
          showToast(`Photo for ${selectedTeamMember.name} updated & saved permanently!`);
        }
      } catch (err) {
        console.error('Team photo upload error:', err);
      }
    }
  };

  const handleSaveTeamMemberDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamMember) return;
    updateTeamSpecialist(selectedTeamMember.id, {
      name: teamName,
      role: teamRole,
      bio: teamBio,
      projectsCount: teamProjectsCount
    });
    showToast(`Team member "${teamName}" saved permanently!`);
  };

  // CLIENT LOGOS MANAGEMENT
  const handleTriggerReplaceClientLogo = (id: string) => {
    targetReplaceClientLogoIdRef.current = id;
    clientLogoFileInputRef.current?.click();
  };

  const handleClientLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && targetReplaceClientLogoIdRef.current) {
      try {
        const url = await compressAndConvertToDataUrl(file, 600, 300, 0.9);
        if (url) {
          updateClientLogoImage(targetReplaceClientLogoIdRef.current, url);
          showToast('Client logo image updated & saved permanently!');
        }
      } catch (err) {
        console.error('Client logo upload error:', err);
      }
    }
    e.target.value = '';
  };

  const handleNewClientLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await compressAndConvertToDataUrl(file, 600, 300, 0.9);
        if (url) {
          setNewClientLogoPreview(url);
          showToast('Logo image selected!');
        }
      } catch (err) {
        console.error('Logo upload error:', err);
      }
    }
    e.target.value = '';
  };

  const handleAddNewClientLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newLogo: ClientLogoItem = {
      id: `client_${Date.now()}`,
      name: newClientName.trim(),
      category: newClientCategory.trim().toUpperCase() || 'ENTERPRISE',
      region: newClientRegion,
      accentColor: '#146BFF',
      iconLetter: newClientName.trim().substring(0, 2).toUpperCase(),
      logoUrl: newClientLogoPreview
    };

    addClientLogo(newLogo);
    setNewClientName('');
    setNewClientCategory('');
    setNewClientLogoPreview(null);
    showToast(`Client "${newLogo.name}" added & saved permanently!`);
  };

  const handleDeleteClientLogo = (id: string, name: string) => {
    removeClientLogo(id);
    showToast(`Client logo "${name}" removed & saved!`);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        if (content) {
          const ok = await importBackup(content);
          if (ok) {
            showToast('Backup successfully imported & saved permanently!');
          } else {
            alert('Invalid backup file format.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Hidden File Inputs */}
      <input
        ref={websiteLogoFileRef}
        type="file"
        accept="image/svg+xml,image/png,image/jpeg,image/webp"
        onChange={handleWebsiteLogoUpload}
        className="hidden"
      />

      <input
        ref={motionMediaFileRef}
        type="file"
        accept="video/mp4,video/webm,image/png,image/jpeg,image/gif,image/webp"
        onChange={handleMotionMediaUpload}
        className="hidden"
      />

      <input
        ref={projectPhotoAddRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleAddProjectPhoto}
        className="hidden"
      />

      <input
        ref={projectPhotoReplaceRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleReplaceProjectPhoto}
        className="hidden"
      />

      <input
        ref={projectCoverRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleProjectCoverChange}
        className="hidden"
      />

      <input
        ref={projectPrimaryVideoRef}
        type="file"
        accept="video/mp4,video/webm"
        onChange={handleProjectPrimaryVideoChange}
        className="hidden"
      />

      <input
        ref={projectSecondaryVideoRef}
        type="file"
        accept="video/mp4,video/webm"
        onChange={handleProjectSecondaryVideoChange}
        className="hidden"
      />

      <input
        ref={teamMemberPhotoRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleTeamMemberPhotoUpload}
        className="hidden"
      />

      <input
        ref={backupImportFileRef}
        type="file"
        accept=".json"
        onChange={handleImportBackup}
        className="hidden"
      />

      <input
        ref={clientLogoFileInputRef}
        type="file"
        accept="image/svg+xml,image/png,image/jpeg,image/webp"
        onChange={handleClientLogoFileChange}
        className="hidden"
      />

      <input
        ref={newClientLogoFileInputRef}
        type="file"
        accept="image/svg+xml,image/png,image/jpeg,image/webp"
        onChange={handleNewClientLogoFileChange}
        className="hidden"
      />

      {/* Floating Save Toast */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-white" />
            <span>{saveSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons with Motion Glass Style */}
      <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        
        {/* Storage Persistence Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071A41]/90 text-white text-[11px] font-medium border border-slate-700 shadow-md backdrop-blur-md mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Storage: Auto-Save Active (Device + Server)</span>
        </div>

        {/* 1. Manage Projects & Photos */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            if (selectedProject) handleSelectProject(selectedProject);
            setProjectManagerOpen(true);
          }}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 hover:bg-white text-[#071A41] text-xs font-bold border border-slate-200/90 shadow-xl backdrop-blur-md transition-all"
          title="Edit project details, category, photos, and category-based video uploads"
        >
          <Layers className="w-4 h-4 text-[#146BFF]" />
          <span>Manage Projects & Photos</span>
        </motion.button>

        {/* 2. Manage Team Members */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            if (selectedTeamMember) handleSelectTeamMember(selectedTeamMember);
            setTeamManagerOpen(true);
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-[#071A41] text-xs font-bold border border-slate-200/90 shadow-lg backdrop-blur-md transition-all"
          title="Edit team member photos, names, and roles"
        >
          <Users className="w-3.5 h-3.5 text-[#146BFF]" />
          <span>Manage Team Members</span>
        </motion.button>

        {/* 3. Manage Client Logos */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setClientLogosModalOpen(true)}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-[#071A41] text-xs font-bold border border-slate-200/90 shadow-lg backdrop-blur-md transition-all"
          title="Upload, replace, and edit client company logos and brand marks"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#146BFF]" />
          <span>Manage Client Logos</span>
        </motion.button>

        {/* 4. Backup & Save (.json) */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setBackupModalOpen(true)}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300/80 shadow-lg backdrop-blur-md transition-all"
          title="Download permanent .json backup or restore saved work anytime"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Backup & Save (.json)</span>
        </motion.button>

        {/* 5. Change Motion Logo */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setMotionModalOpen(true)}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-[#071A41] text-xs font-bold border border-slate-200/90 shadow-lg backdrop-blur-md transition-all"
          title="Upload or change the brand mark/motion video on the hero card"
        >
          <Video className="w-3.5 h-3.5 text-[#146BFF]" />
          <span>Change Motion Logo</span>
        </motion.button>

        {/* 6. Change Website Logo */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setPendingLogoUrl(settings.customLogoUrl);
            setLogoModalOpen(true);
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-[#071A41] text-xs font-bold border border-slate-200/90 shadow-lg backdrop-blur-md transition-all"
          title="Upload original logo, remove logo, and save"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#146BFF]" />
          <span>Change Website Logo</span>
        </motion.button>

        {/* 7. Edit Website Text */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setHeadline(settings.heroHeadline);
            setHighlight(settings.heroHighlight);
            setSubtitle(settings.heroSubtitle);
            setBadgeText(settings.heroCardBadgeText);
            setSatisfactionText(settings.heroSatisfactionText);
            setTextModalOpen(true);
          }}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-[#071A41] text-xs font-bold border border-slate-200/90 shadow-lg backdrop-blur-md transition-all"
          title="Edit website texts and save permanently"
        >
          <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Edit Website Text</span>
        </motion.button>

        {/* 8. Restore Curated Stock Photos & Text (Automated Recovery) */}
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setResetConfirmOpen(true)}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 text-xs font-bold border border-amber-300/80 shadow-lg backdrop-blur-md transition-all"
          title="Restore original high-resolution stock photos, projects, team, and copy"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
          <span>Restore Stock Photos & Texts</span>
        </motion.button>
      </div>

      {/* MODAL: CONFIRM RESTORE CURATED STOCK PHOTOS & TEXT */}
      <AnimatePresence>
        {resetConfirmOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#071A41]/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setResetConfirmOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#071A41] mb-2">
                Restore Curated Stock Photos & Copy?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                This will automatically restore all original high-resolution Unsplash stock photos, brand case studies, team specialist images, and curated studio copy across your website and server.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setResetConfirmOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await resetToDefaults();
                    setResetConfirmOpen(false);
                    showToast('Original stock photos & content successfully restored!');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-600/20"
                >
                  Restore Stock Photos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 1: TEXT EDIT MODAL */}
      <AnimatePresence>
        {textModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#071A41]/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setTextModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#071A41]">
                    Edit Website Content
                  </h3>
                  <p className="text-xs text-slate-400">
                    Changes save permanently to IndexedDB storage
                  </p>
                </div>
                <button
                  onClick={() => setTextModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-[#071A41] hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveText} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Hero Main Headline (Prefix)
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Hero Gradient Highlight Word
                  </label>
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => setHighlight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Hero Subtitle Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Hero Badge Label
                  </label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Client Satisfaction Text
                  </label>
                  <input
                    type="text"
                    value={satisfactionText}
                    onChange={(e) => setSatisfactionText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setTextModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md shadow-[#146BFF]/25 flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Website Text</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: WEBSITE LOGO MANAGEMENT (Upload Original Logo, Remove Logo, Save Logo) */}
      <AnimatePresence>
        {logoModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#071A41]/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setLogoModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#146BFF] flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-[#071A41] mb-1">
                Website Logo Settings
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Upload your original brand logo (SVG, PNG, WebP), preview it, or remove it and save permanently.
              </p>

              {/* Logo Preview Area */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-6 flex flex-col items-center justify-center min-h-[100px]">
                {pendingLogoUrl ? (
                  <img 
                    src={pendingLogoUrl} 
                    alt="Logo Preview" 
                    className="max-h-16 max-w-full object-contain" 
                  />
                ) : (
                  <div className="text-xs font-semibold text-slate-400">
                    Using Default Digital With Habib Vector Monogram
                  </div>
                )}
              </div>

              {/* Action Buttons: Upload Original Logo, Remove Logo, Save Logo */}
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => websiteLogoFileRef.current?.click()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071A41] font-bold text-xs transition-colors"
                >
                  <Upload className="w-4 h-4 text-[#146BFF]" />
                  <span>Upload Original Logo (.svg / .png / .webp)</span>
                </button>

                {pendingLogoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs transition-colors"
                  >
                    Remove Logo (Reset to Default)
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSaveLogo}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white font-bold text-xs shadow-md shadow-[#146BFF]/25 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Logo</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: HERO MOTION / BRAND MARK */}
      <AnimatePresence>
        {motionModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#071A41]/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setMotionModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#146BFF] flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-black text-[#071A41] mb-2">
                Hero Brand Mark & Motion Video
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Upload your animated video, GIF, or brand mark image to display directly inside the signature blue hero card.
              </p>

              {settings.customHeroMotionUrl && (
                <div className="p-3 rounded-2xl bg-slate-900 mb-4 overflow-hidden max-h-40 flex items-center justify-center">
                  {settings.customHeroMotionUrl.startsWith('data:video') || settings.customHeroMotionUrl.endsWith('.mp4') ? (
                    <video src={settings.customHeroMotionUrl} autoPlay loop muted className="max-h-36 rounded-lg" />
                  ) : (
                    <img src={settings.customHeroMotionUrl} alt="Custom motion mark" className="max-h-36 object-contain" />
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => motionMediaFileRef.current?.click()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#146BFF] text-white font-bold text-xs shadow-md shadow-[#146BFF]/25"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Video or Brand Mark (.mp4 / .gif / .png)</span>
                </button>

                {settings.customHeroMotionUrl && (
                  <button
                    onClick={() => {
                      updateHeroCardMedia('');
                      setMotionModalOpen(false);
                      showToast('Reverted to default hero card.');
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs"
                  >
                    Reset to Default Showreel Card
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: FULL PROJECT & CATEGORY-BASED VIDEO MANAGER */}
      <AnimatePresence>
        {projectManagerOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#071A41]/85 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setProjectManagerOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 z-10 my-8 max-h-[92vh] flex flex-col"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#146BFF] flex items-center justify-center border border-blue-100">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#071A41]">
                      Studio Portfolio & Project Manager
                    </h3>
                    <p className="text-xs text-slate-500">
                      Edit details, category, photos, and conditional category-based videos. Saves permanently to IndexedDB.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateNewProject}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#146BFF] text-xs font-bold border border-blue-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>

                  <button
                    onClick={() => setProjectManagerOpen(false)}
                    className="p-2 rounded-full text-slate-400 hover:text-[#071A41] hover:bg-slate-200/60"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-8 flex flex-col md:flex-row gap-6">
                
                {/* Left Sidebar: Select Project */}
                <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 pr-0 md:pr-6 pb-6 md:pb-0 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Projects ({projects.length})
                  </div>

                  <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                    {projects.map((p) => {
                      const isSelected = selectedManageProjectId === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectProject(p)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#146BFF] text-white shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="truncate">
                            <div className="truncate">{p.title}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                              {p.category} &bull; {p.images?.length || 0} photos
                            </div>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Area: Project Details & Category-Based Video Fields */}
                {selectedProject && (
                  <div className="flex-1 space-y-6">
                    
                    {/* Project Metadata & Category Edit Form */}
                    <form onSubmit={handleSaveProjectDetails} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Edit Project Information
                        </span>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-sm"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Project Details</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#071A41] bg-white focus:border-[#146BFF] focus:outline-none"
                          />
                        </div>

                        {/* CATEGORY SELECTOR */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Category (Controls Video Upload Fields)
                          </label>
                          <select
                            value={editCategory}
                            onChange={(e) => setEditCategory(e.target.value as ProjectCategory)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#071A41] bg-white focus:border-[#146BFF] focus:outline-none"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat} {isVideoCategory(cat) ? '(Videos Enabled)' : '(Images Only)'}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={editClient}
                            onChange={(e) => setEditClient(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#071A41] bg-white focus:border-[#146BFF] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Impact Metric
                          </label>
                          <input
                            type="text"
                            value={editImpact}
                            onChange={(e) => setEditImpact(e.target.value)}
                            placeholder="+240% Pre-orders"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#071A41] bg-white focus:border-[#146BFF] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                          Project Description
                        </label>
                        <textarea
                          rows={2}
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:border-[#146BFF] focus:outline-none"
                        />
                      </div>
                    </form>

                    {/* CATEGORY-BASED CONDITIONAL VIDEO UPLOADS */}
                    {/* ONLY VISIBLE FOR "Video Editing" and "Motion Graphics" (or "Video & Motion") */}
                    {isVideoCategory(editCategory) ? (
                      <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-[#146BFF]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#071A41]">
                              Video Upload Options (Available for {editCategory})
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-[#146BFF] bg-blue-100 px-2.5 py-0.5 rounded-full">
                            2 Video Slots Active
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Video Slot 1 */}
                          <div className="p-4 rounded-xl bg-white border border-blue-200/80 flex flex-col justify-between gap-3">
                            <div>
                              <div className="text-xs font-bold text-[#071A41] mb-1">1. Primary Video (.mp4 / .webm)</div>
                              <p className="text-[11px] text-slate-500">
                                {selectedProject.videoUrl ? 'Video file uploaded & ready' : 'No video uploaded yet'}
                              </p>
                              {selectedProject.videoUrl && (
                                <video src={selectedProject.videoUrl} controls className="w-full h-24 object-cover rounded-lg mt-2 bg-black" />
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => projectPrimaryVideoRef.current?.click()}
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-xs transition-colors"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{selectedProject.videoUrl ? 'Replace Primary Video' : 'Upload Primary Video'}</span>
                            </button>
                          </div>

                          {/* Video Slot 2 */}
                          <div className="p-4 rounded-xl bg-white border border-blue-200/80 flex flex-col justify-between gap-3">
                            <div>
                              <div className="text-xs font-bold text-[#071A41] mb-1">2. Secondary Video (.mp4 / .webm)</div>
                              <p className="text-[11px] text-slate-500">
                                {selectedProject.secondaryVideoUrl ? 'Secondary video uploaded' : 'Optional second video'}
                              </p>
                              {selectedProject.secondaryVideoUrl && (
                                <video src={selectedProject.secondaryVideoUrl} controls className="w-full h-24 object-cover rounded-lg mt-2 bg-black" />
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => projectSecondaryVideoRef.current?.click()}
                              className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#071A41] text-xs font-bold transition-colors"
                            >
                              <Upload className="w-3.5 h-3.5 text-[#146BFF]" />
                              <span>{selectedProject.secondaryVideoUrl ? 'Replace Secondary Video' : 'Upload Secondary Video'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* FOR ALL OTHER CATEGORIES: Both video fields are hidden */
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                        <span>Category <strong>{editCategory}</strong>: Video upload fields hidden (Images & visual designs only).</span>
                        <span className="text-[10px] text-slate-400 font-semibold">Video fields hidden for non-video categories</span>
                      </div>
                    )}

                    {/* Image Management Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div>
                        <h4 className="text-sm font-bold text-[#071A41]">
                          Project Showcase Photos ({selectedProject.images?.length || 0} Visuals)
                        </h4>
                        <p className="text-xs text-slate-500">
                          Add, replace, or remove images. Arranged sequentially in the Behance-style project presentation.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => projectCoverRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#146BFF]" />
                          <span>Change Cover</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => projectPhotoAddRef.current?.click()}
                          className="px-3.5 py-1.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Photo</span>
                        </button>
                      </div>
                    </div>

                    {/* Image Cards for this Project */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedProject.images?.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col justify-between shadow-xs"
                        >
                          <div className="aspect-[4/3] bg-slate-900 overflow-hidden relative">
                            <img
                              src={imgUrl}
                              alt={`Visual #${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                              Visual #{idx + 1}
                            </div>
                          </div>

                          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                replaceIdxRef.current = idx;
                                projectPhotoReplaceRef.current?.click();
                              }}
                              className="flex-1 py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#071A41] flex items-center justify-center gap-1"
                            >
                              <Upload className="w-3 h-3 text-[#146BFF]" />
                              <span>Replace</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Remove visual #${idx + 1}?`)) {
                                  removeProjectImage(selectedProject.id, idx);
                                  showToast('Visual removed & saved permanently!');
                                }
                              }}
                              className="p-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                              title="Delete visual"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add Slot */}
                      <div
                        onClick={() => projectPhotoAddRef.current?.click()}
                        className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#146BFF] bg-slate-50/60 cursor-pointer flex flex-col items-center justify-center gap-2 p-4 text-center transition-colors"
                      >
                        <Plus className="w-6 h-6 text-[#146BFF]" />
                        <span className="text-xs font-bold text-slate-700">Upload Image Slot</span>
                        <span className="text-[10px] text-slate-400">Add 6th, 7th, or 8th photo</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 5: TEAM & SPECIALIST MANAGEMENT MODAL */}
      <AnimatePresence>
        {teamManagerOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#071A41]/85 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setTeamManagerOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#146BFF] flex items-center justify-center border border-blue-100">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#071A41]">
                      Manage Team Members & Specialists
                    </h3>
                    <p className="text-xs text-slate-500">
                      Upload photos, edit names, roles, and bios. Saves permanently to IndexedDB storage.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setTeamManagerOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-[#071A41] hover:bg-slate-200/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-8 flex flex-col md:flex-row gap-6">
                
                {/* Team member list */}
                <div className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-slate-200 pr-0 md:pr-6 pb-6 md:pb-0 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Specialists
                  </div>

                  <div className="space-y-1.5">
                    {teamSpecialists.map((m) => {
                      const isSelected = selectedTeamMemberId === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => handleSelectTeamMember(m)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'bg-[#146BFF] text-white shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <img src={m.image} alt={m.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                          <div className="truncate">
                            <div className="truncate">{m.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                              {m.role}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Edit Selected Member Form */}
                {selectedTeamMember && (
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-slate-200">
                        <img src={selectedTeamMember.image} alt={selectedTeamMember.name} className="w-full h-full object-cover" />
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => teamMemberPhotoRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#071A41] transition-colors"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#146BFF]" />
                          <span>Change Photo</span>
                        </button>
                        <p className="text-[10px] text-slate-400 mt-1">Upload a crisp portrait photo</p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveTeamMemberDetails} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
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
                            value={teamRole}
                            onChange={(e) => setTeamRole(e.target.value)}
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                          Bio / Description
                        </label>
                        <textarea
                          rows={3}
                          value={teamBio}
                          onChange={(e) => setTeamBio(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:border-[#146BFF] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                          Completed Projects Count
                        </label>
                        <input
                          type="number"
                          value={teamProjectsCount}
                          onChange={(e) => setTeamProjectsCount(parseInt(e.target.value) || 0)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#071A41] focus:border-[#146BFF] focus:outline-none"
                        />
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md shadow-[#146BFF]/25 flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Team Member</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: MANAGE CLIENT LOGOS */}
      <AnimatePresence>
        {clientLogosModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#071A41]/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setClientLogosModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#146BFF] flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#071A41]">Manage Client Logos</h3>
                    <p className="text-xs text-slate-500">
                      Upload, replace, and organize your client brand logos. Changes are permanently saved.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setClientLogosModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto py-5 space-y-6">
                {/* Region Filter */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedClientRegionFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedClientRegionFilter === 'all'
                          ? 'bg-[#146BFF] text-white shadow-sm'
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      All Clients ({clientLogos.length})
                    </button>
                    <button
                      onClick={() => setSelectedClientRegionFilter('bangladeshi')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedClientRegionFilter === 'bangladeshi'
                          ? 'bg-[#146BFF] text-white shadow-sm'
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Bangladeshi ({clientLogos.filter(c => c.region === 'bangladeshi').length})
                    </button>
                    <button
                      onClick={() => setSelectedClientRegionFilter('international')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedClientRegionFilter === 'international'
                          ? 'bg-[#146BFF] text-white shadow-sm'
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      International ({clientLogos.filter(c => c.region === 'international').length})
                    </button>
                  </div>
                </div>

                {/* Add New Client Form */}
                <form onSubmit={handleAddNewClientLogo} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#146BFF]" />
                    <h4 className="text-xs font-black uppercase text-[#071A41]">Add New Client Logo</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Client Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Grameenphone, Spotify"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#071A41] bg-white focus:outline-none focus:border-[#146BFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Industry / Category</label>
                      <input
                        type="text"
                        placeholder="e.g. TELECOM, FINTECH"
                        value={newClientCategory}
                        onChange={(e) => setNewClientCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#071A41] bg-white focus:outline-none focus:border-[#146BFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Region</label>
                      <select
                        value={newClientRegion}
                        onChange={(e) => setNewClientRegion(e.target.value as 'bangladeshi' | 'international')}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#071A41] bg-white focus:outline-none focus:border-[#146BFF]"
                      >
                        <option value="bangladeshi">Bangladeshi Brands</option>
                        <option value="international">International Brands</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => newClientLogoFileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#146BFF]" />
                        <span>{newClientLogoPreview ? 'Change Logo Image' : 'Choose Logo Image'}</span>
                      </button>
                      {newClientLogoPreview && (
                        <div className="w-10 h-7 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center">
                          <img src={newClientLogoPreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                        </div>
                      )}
                      <span className="text-[10px] text-slate-400">Optional: leave empty to generate stylized brand mark monogram</span>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#146BFF] hover:bg-[#0052FF] text-white text-xs font-bold shadow-md shadow-[#146BFF]/25 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Client</span>
                    </button>
                  </div>
                </form>

                {/* Client Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {clientLogos
                    .filter(c => selectedClientRegionFilter === 'all' || c.region === selectedClientRegionFilter)
                    .map(client => (
                      <div
                        key={client.id}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm flex flex-col justify-between gap-3 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 overflow-hidden shrink-0">
                              {client.logoUrl ? (
                                <img src={client.logoUrl} alt={client.name} className="max-w-full max-h-full object-contain" />
                              ) : (
                                <span className="text-xs font-black text-[#146BFF]">{client.iconLetter || client.name.substring(0, 2).toUpperCase()}</span>
                              )}
                            </div>
                            <div className="truncate">
                              <h5 className="text-xs font-bold text-[#071A41] truncate">{client.name}</h5>
                              <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">{client.category}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteClientLogo(client.id, client.name)}
                            className="text-slate-300 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove Client"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            client.region === 'bangladeshi' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {client.region === 'bangladeshi' ? 'Bangladesh' : 'Global'}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleTriggerReplaceClientLogo(client.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#146BFF] hover:text-[#0052FF] transition-colors"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Replace Logo</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: BACKUP & RESTORE (.JSON) */}
      <AnimatePresence>
        {backupModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#071A41]/80 backdrop-blur-md">
            <div className="fixed inset-0" onClick={() => setBackupModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#071A41]">Backup & Restore</h3>
                    <p className="text-xs text-slate-500">
                      Keep a permanent copy of your photos, client logos, and content.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBackupModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="py-5 space-y-5">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Active Storage Protection</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Every edit and photo upload is automatically saved to your browser&apos;s persistent database and synced with your server. Your data stays intact even if you reload or close the tab.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-base font-black text-[#071A41]">{projects.length}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Projects</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-base font-black text-[#071A41]">{clientLogos.length}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Client Logos</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-base font-black text-[#071A41]">{teamSpecialists.length}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Team Members</div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      exportBackup();
                      showToast('Backup file downloaded to your device!');
                    }}
                    className="w-full py-3 px-4 rounded-2xl bg-[#071A41] hover:bg-[#0d2a64] text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download Hard Copy Backup (.json)</span>
                  </button>

                  <button
                    onClick={() => backupImportFileRef.current?.click()}
                    className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileUp className="w-4 h-4 text-[#146BFF]" />
                    <span>Restore From Saved Backup (.json)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
