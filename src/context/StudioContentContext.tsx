import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ProjectItem, ServiceItem, StudioCustomSettings, TeamSpecialist, FounderInfo, ClientLogoItem, HaloClientAvatar } from '../types';
import { STUDIO_PROJECTS, STUDIO_SERVICES, FOUNDER_DATA, DEFAULT_HALO_AVATARS } from '../data/studioData';
import { TEAM_SPECIALISTS, BANGLADESHI_CLIENTS, INTERNATIONAL_CLIENTS } from '../data/clientsData';
import { idbGet, idbSet, idbDelete, requestPersistentStorage } from '../utils/persistentStorage';
import { fetchServerContent, queueServerSync, resetServerContent } from '../utils/serverSync';

// Automated Stock Photo Healing & Recovery helpers:
// Ensures that if any user modification left an image or avatar blank, or if the user wants default stock assets,
// they are automatically filled with high-res curated Unsplash stock assets so no image is ever broken or missing.
function healProjectsWithStock(items?: ProjectItem[]): ProjectItem[] {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return STUDIO_PROJECTS;
  }
  return items.map((item, idx) => {
    const fallback = STUDIO_PROJECTS[idx] || STUDIO_PROJECTS[0];
    const coverImage = (item.coverImage && item.coverImage.trim().length > 0) ? item.coverImage : fallback.coverImage;
    const images = (Array.isArray(item.images) && item.images.length > 0)
      ? item.images.map((img, i) => (img && img.trim().length > 0 ? img : (fallback.images[i] || fallback.coverImage)))
      : fallback.images;
    return {
      ...fallback,
      ...item,
      coverImage,
      images,
    };
  });
}

function healTeamWithStock(items?: TeamSpecialist[]): TeamSpecialist[] {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return TEAM_SPECIALISTS;
  }
  return items.map((item, idx) => {
    const fallback = TEAM_SPECIALISTS[idx] || TEAM_SPECIALISTS[0];
    const image = (item.image && item.image.trim().length > 0) ? item.image : fallback.image;
    return { ...fallback, ...item, image };
  });
}

function healHaloAvatarsWithStock(items?: HaloClientAvatar[]): HaloClientAvatar[] {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return DEFAULT_HALO_AVATARS;
  }
  return items.map((item, idx) => {
    const fallback = DEFAULT_HALO_AVATARS[idx] || DEFAULT_HALO_AVATARS[0];
    const avatar = (item.avatar && item.avatar.trim().length > 0) ? item.avatar : fallback.avatar;
    return { ...fallback, ...item, avatar };
  });
}

// User Customization Detectors:
// These verify if a data array has custom user uploads, edited names, or altered items.
// This prevents server default seeds from wiping out user's hard work on startup or container restart.
function isProjectsCustomized(items?: ProjectItem[]): boolean {
  if (!items || !Array.isArray(items) || items.length === 0) return false;
  if (items.length !== STUDIO_PROJECTS.length) return true;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const def = STUDIO_PROJECTS[i];
    if (!def) return true;
    if (it.title !== def.title || it.category !== def.category) return true;
    if (it.coverImage && (it.coverImage.startsWith('data:') || it.coverImage !== def.coverImage)) return true;
    if (it.videoUrl && (it.videoUrl.startsWith('data:') || it.videoUrl !== def.videoUrl)) return true;
    if (Array.isArray(it.images)) {
      if (it.images.some(img => typeof img === 'string' && img.startsWith('data:'))) return true;
      if (def.images && JSON.stringify(it.images) !== JSON.stringify(def.images)) return true;
    }
  }
  return false;
}

function isTeamCustomized(items?: TeamSpecialist[]): boolean {
  if (!items || !Array.isArray(items) || items.length === 0) return false;
  if (items.length !== TEAM_SPECIALISTS.length) return true;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const def = TEAM_SPECIALISTS[i];
    if (!def) return true;
    if (it.name !== def.name || it.role !== def.role) return true;
    if (it.image && (it.image.startsWith('data:') || it.image !== def.image)) return true;
  }
  return false;
}

function isClientLogosCustomized(items?: ClientLogoItem[]): boolean {
  if (!items || !Array.isArray(items) || items.length === 0) return false;
  if (items.length !== DEFAULT_CLIENT_LOGOS.length) return true;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const def = DEFAULT_CLIENT_LOGOS[i];
    if (!def) return true;
    if (it.name !== def.name) return true;
    if (it.logoUrl && (it.logoUrl.startsWith('data:') || it.logoUrl !== def.logoUrl)) return true;
  }
  return false;
}

const DB_KEY_PROJECTS = 'dwh_studio_projects_v3';
const DB_KEY_SETTINGS = 'dwh_studio_settings_v3';
const DB_KEY_TEAM = 'dwh_studio_team_v3';
const DB_KEY_FOUNDER = 'dwh_studio_founder_v3';
const DB_KEY_CLIENT_LOGOS = 'dwh_studio_client_logos_v3';
const DB_KEY_HALO_AVATARS = 'dwh_studio_halo_avatars_v3';

const DEFAULT_SETTINGS: StudioCustomSettings = {
  heroHeadline: 'We Create Brands that People',
  heroHighlight: 'Remember.',
  heroSubtitle: 'We help eCommerce brands, SaaS companies and creators turn ideas into distinct identity, responsive interfaces and video that holds attention.',
  customLogoUrl: null,
  customHeroMotionUrl: null,
  heroCardVideoUrl: null,
  heroCardBadgeText: 'Full-Stack Design',
  heroSatisfactionText: '99.4% Verified Client Satisfaction',
  phoneWhatsApp: '+880 1734 144347',
  studioEmail: 'contact@dwhstudio.com',
  // Futuristic Motion Showcase Defaults
  logoMotionBrandName: 'DWH Studio',
  logoMotionTagline: 'Kinetic Identity & High-Performance Brand Architecture',
  logoMotionServiceTags: ['Brand Architecture', 'Kinetic Systems', '3D Visuals', 'Digital Experience'],
  logoMotionCustomLogoUrl: null,
  cinematicVideoHeading: 'Watch Our Creative Process',
  cinematicVideoBadge: 'Motion Branding',
  cinematicVideoSubtitle: 'Digital Experience crafted with purposeful motion, high retention, and category-defining visual polish.',
  cinematicVideoUrl: null,
  cinematicVideoAutoPlay: true,
  // World-Class Brand Story Video Showcase
  brandStoryHeading: 'Behind Every Great Brand Is A Great Story.',
  brandStorySubtitle: 'Watch how we create brands, digital experiences and creative solutions.',
  brandStoryVideoUrl: '/videos/brand-systems.mp4',
  brandStoryVideoCover: null
};

const DEFAULT_CLIENT_LOGOS: ClientLogoItem[] = [
  ...BANGLADESHI_CLIENTS,
  ...INTERNATIONAL_CLIENTS
];

const DEFAULT_FOUNDER: FounderInfo = {
  name: FOUNDER_DATA.name,
  role: FOUNDER_DATA.role,
  title: FOUNDER_DATA.title,
  tagline: FOUNDER_DATA.tagline,
  bio: FOUNDER_DATA.bio,
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  skills: FOUNDER_DATA.skills,
  socials: FOUNDER_DATA.socials
};

interface StudioContextType {
  // State
  projects: ProjectItem[];
  services: ServiceItem[];
  settings: StudioCustomSettings;
  teamSpecialists: TeamSpecialist[];
  founderData: FounderInfo;
  clientLogos: ClientLogoItem[];
  haloAvatars: HaloClientAvatar[];
  isHydrated: boolean;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;

  // Halo Client Avatar Actions (Permanent Storage)
  updateHaloAvatar: (id: string, data: Partial<HaloClientAvatar>) => void;
  updateHaloAvatarPhoto: (id: string, photoUrl: string) => void;

  // Client Logo Actions (Permanent IndexedDB Persistence)
  updateClientLogo: (id: string, data: Partial<ClientLogoItem>) => void;
  updateClientLogoImage: (id: string, logoUrl: string) => void;
  addClientLogo: (client: ClientLogoItem) => void;
  removeClientLogo: (id: string) => void;

  // Project Actions (Permanent IndexedDB Persistence)
  updateProject: (project: ProjectItem) => void;
  addProject: (project: ProjectItem) => void;
  deleteProject: (projectId: string) => void;
  addProjectImage: (projectId: string, imageUrl: string) => void;
  replaceProjectImage: (projectId: string, imageIndex: number, newImageUrl: string) => void;
  removeProjectImage: (projectId: string, imageIndex: number) => void;
  updateProjectMedia: (projectId: string, field: 'coverImage' | 'coverPhoto' | 'videoUrl' | 'secondaryVideoUrl', url: string) => void;

  // Team Member Actions (Permanent IndexedDB Persistence)
  updateTeamSpecialist: (id: string, data: Partial<TeamSpecialist>) => void;
  updateTeamSpecialistPhoto: (id: string, photoUrl: string) => void;
  addTeamSpecialist: (member: TeamSpecialist) => void;
  removeTeamSpecialist: (id: string) => void;

  // Founder Actions (Permanent IndexedDB Persistence)
  updateFounderData: (data: Partial<FounderInfo>) => void;
  updateFounderPhoto: (photoUrl: string) => void;

  // Website Settings & Logo (Upload Original, Remove, Save)
  updateSettings: (newSettings: Partial<StudioCustomSettings>) => void;
  updateWebsiteLogo: (url: string) => void;
  removeWebsiteLogo: () => void;
  saveWebsiteLogo: (url: string | null) => void;
  updateHeroCardMedia: (mediaUrl: string) => void;
  updateBrandStoryVideo: (videoUrl: string, coverUrl?: string) => void;

  // Backup & Reset
  resetToDefaults: () => Promise<void>;
  exportBackup: () => void;
  importBackup: (jsonString: string) => Promise<boolean>;
}

const DEFAULT_CONTEXT: StudioContextType = {
  projects: STUDIO_PROJECTS,
  services: STUDIO_SERVICES,
  settings: DEFAULT_SETTINGS,
  teamSpecialists: TEAM_SPECIALISTS,
  founderData: DEFAULT_FOUNDER,
  clientLogos: DEFAULT_CLIENT_LOGOS,
  haloAvatars: DEFAULT_HALO_AVATARS,
  isHydrated: false,
  isEditMode: false,
  setIsEditMode: () => {},

  updateHaloAvatar: () => {},
  updateHaloAvatarPhoto: () => {},

  updateClientLogo: () => {},
  updateClientLogoImage: () => {},
  addClientLogo: () => {},
  removeClientLogo: () => {},

  updateProject: () => {},
  addProject: () => {},
  deleteProject: () => {},
  addProjectImage: () => {},
  replaceProjectImage: () => {},
  removeProjectImage: () => {},
  updateProjectMedia: () => {},

  updateTeamSpecialist: () => {},
  updateTeamSpecialistPhoto: () => {},
  addTeamSpecialist: () => {},
  removeTeamSpecialist: () => {},

  updateFounderData: () => {},
  updateFounderPhoto: () => {},

  updateSettings: () => {},
  updateWebsiteLogo: () => {},
  removeWebsiteLogo: () => {},
  saveWebsiteLogo: () => {},
  updateHeroCardMedia: () => {},
  updateBrandStoryVideo: () => {},

  resetToDefaults: async () => {},
  exportBackup: () => {},
  importBackup: async () => false
};

const StudioContentContext = createContext<StudioContextType>(DEFAULT_CONTEXT);

export const StudioContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronous initial state from localStorage if present (for zero-flicker fast initial paint)
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const raw = localStorage.getItem(DB_KEY_PROJECTS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return STUDIO_PROJECTS;
  });

  const [settings, setSettings] = useState<StudioCustomSettings>(() => {
    try {
      const raw = localStorage.getItem(DB_KEY_SETTINGS);
      if (raw) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  const [teamSpecialists, setTeamSpecialists] = useState<TeamSpecialist[]>(() => {
    try {
      const raw = localStorage.getItem(DB_KEY_TEAM);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return TEAM_SPECIALISTS;
  });

  const [founderData, setFounderData] = useState<FounderInfo>(() => {
    try {
      const raw = localStorage.getItem(DB_KEY_FOUNDER);
      if (raw) {
        return { ...DEFAULT_FOUNDER, ...JSON.parse(raw) };
      }
    } catch {}
    return DEFAULT_FOUNDER;
  });

  const [clientLogos, setClientLogos] = useState<ClientLogoItem[]>(() => {
    try {
      const raw = localStorage.getItem(DB_KEY_CLIENT_LOGOS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_CLIENT_LOGOS;
  });

  const [haloAvatars, setHaloAvatars] = useState<HaloClientAvatar[]>(() => {
    try {
      const raw = localStorage.getItem(DB_KEY_HALO_AVATARS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_HALO_AVATARS;
  });

  const [isHydrated, setIsHydrated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Hydration flag to prevent overwriting user data on initial mount
  const hasLoadedRef = useRef(false);

  // ASYNC HYDRATION: Read authoritative saved data from Server first, fallback to IndexedDB
  useEffect(() => {
    let isMounted = true;

    async function hydrateFromPersistentStorage() {
      try {
        // Fetch both authoritative Server data and local IndexedDB in parallel
        const [serverData, savedProjects, savedSettings, savedTeam, savedFounder, savedLogos, savedHaloAvatars] = await Promise.all([
          fetchServerContent().catch(() => null),
          idbGet<ProjectItem[]>(DB_KEY_PROJECTS).catch(() => null),
          idbGet<StudioCustomSettings>(DB_KEY_SETTINGS).catch(() => null),
          idbGet<TeamSpecialist[]>(DB_KEY_TEAM).catch(() => null),
          idbGet<FounderInfo>(DB_KEY_FOUNDER).catch(() => null),
          idbGet<ClientLogoItem[]>(DB_KEY_CLIENT_LOGOS).catch(() => null),
          idbGet<HaloClientAvatar[]>(DB_KEY_HALO_AVATARS).catch(() => null)
        ]);

        if (!isMounted) return;

        // 1. Projects: If local has custom modifications and server does not (or has defaults), prioritize local.
        const localProjectsCustom = isProjectsCustomized(savedProjects);
        const serverProjectsCustom = isProjectsCustomized(serverData?.projects);

        let chosenProjects: ProjectItem[];
        if (localProjectsCustom && !serverProjectsCustom) {
          chosenProjects = savedProjects!;
        } else if (serverProjectsCustom && !localProjectsCustom) {
          chosenProjects = serverData.projects;
        } else if (localProjectsCustom && serverProjectsCustom) {
          // If both have custom modifications, prioritize user's local browser edits
          chosenProjects = savedProjects!;
        } else {
          chosenProjects = (serverData?.projects && serverData.projects.length > 0)
            ? serverData.projects
            : ((savedProjects && savedProjects.length > 0) ? savedProjects : STUDIO_PROJECTS);
        }
        const healedProjects = healProjectsWithStock(chosenProjects);
        setProjects(healedProjects);
        await idbSet(DB_KEY_PROJECTS, healedProjects);

        // 2. Settings: Merge default, local indexedDB, and server settings so user's 3D motion logo and text are never lost
        const mergedSettings: StudioCustomSettings = {
          ...DEFAULT_SETTINGS,
          ...(savedSettings || {}),
          ...(serverData?.settings || {})
        };
        // Preserve user's custom media if saved locally
        if (savedSettings?.customHeroMotionUrl && !mergedSettings.customHeroMotionUrl) {
          mergedSettings.customHeroMotionUrl = savedSettings.customHeroMotionUrl;
        }
        if (savedSettings?.customLogoUrl && !mergedSettings.customLogoUrl) {
          mergedSettings.customLogoUrl = savedSettings.customLogoUrl;
        }

        // Check if user had a local motion logo in localStorage
        try {
          const localMotionUrl = localStorage.getItem('dwh_motion_logo_url');
          if (localMotionUrl && !mergedSettings.customHeroMotionUrl) {
            mergedSettings.customHeroMotionUrl = localMotionUrl;
          }
          const localPreset = localStorage.getItem('dwh_motion_logo_preset');
          if (localPreset && !mergedSettings.motionLogoPreset) {
            mergedSettings.motionLogoPreset = localPreset;
          }
          const localScale = localStorage.getItem('dwh_motion_logo_scale');
          if (localScale && !mergedSettings.logoScale) {
            mergedSettings.logoScale = parseFloat(localScale);
          }
        } catch {}

        if (mergedSettings.brandStoryVideoUrl && mergedSettings.brandStoryVideoUrl.includes('mixkit.co')) {
          mergedSettings.brandStoryVideoUrl = DEFAULT_SETTINGS.brandStoryVideoUrl;
        }
        setSettings(mergedSettings);
        await idbSet(DB_KEY_SETTINGS, mergedSettings);

        // 3. Team: Smart check to prevent stock specialists from overwriting user's uploaded team photos
        const localTeamCustom = isTeamCustomized(savedTeam);
        const serverTeamCustom = isTeamCustomized(serverData?.teamSpecialists);

        let chosenTeam: TeamSpecialist[];
        if (localTeamCustom && !serverTeamCustom) {
          chosenTeam = savedTeam!;
        } else if (serverTeamCustom && !localTeamCustom) {
          chosenTeam = serverData.teamSpecialists;
        } else if (localTeamCustom && serverTeamCustom) {
          chosenTeam = savedTeam!;
        } else {
          chosenTeam = (serverData?.teamSpecialists && serverData.teamSpecialists.length > 0)
            ? serverData.teamSpecialists
            : ((savedTeam && savedTeam.length > 0) ? savedTeam : TEAM_SPECIALISTS);
        }
        const healedTeam = healTeamWithStock(chosenTeam);
        setTeamSpecialists(healedTeam);
        await idbSet(DB_KEY_TEAM, healedTeam);

        // 4. Founder info
        const mergedFounder: FounderInfo = {
          ...FOUNDER_DATA,
          ...(savedFounder || {}),
          ...(serverData?.founderData || {})
        };
        setFounderData(mergedFounder);
        await idbSet(DB_KEY_FOUNDER, mergedFounder);

        // 5. Client logos: Smart check so user-uploaded client logos are never wiped out
        const localLogosCustom = isClientLogosCustomized(savedLogos);
        const serverLogosCustom = isClientLogosCustomized(serverData?.clientLogos);

        let chosenLogos: ClientLogoItem[];
        if (localLogosCustom && !serverLogosCustom) {
          chosenLogos = savedLogos!;
        } else if (serverLogosCustom && !localLogosCustom) {
          chosenLogos = serverData.clientLogos;
        } else if (localLogosCustom && serverLogosCustom) {
          chosenLogos = savedLogos!;
        } else {
          chosenLogos = (serverData?.clientLogos && serverData.clientLogos.length > 0)
            ? serverData.clientLogos
            : ((savedLogos && savedLogos.length > 0) ? savedLogos : DEFAULT_CLIENT_LOGOS);
        }
        setClientLogos(chosenLogos);
        await idbSet(DB_KEY_CLIENT_LOGOS, chosenLogos);

        // 6. Halo avatars
        const rawAvatars = (serverData?.haloAvatars && Array.isArray(serverData.haloAvatars) && serverData.haloAvatars.length > 0)
          ? serverData.haloAvatars
          : ((savedHaloAvatars && Array.isArray(savedHaloAvatars) && savedHaloAvatars.length > 0) ? savedHaloAvatars : DEFAULT_HALO_AVATARS);
        const healedAvatars = healHaloAvatarsWithStock(rawAvatars);
        setHaloAvatars(healedAvatars);
        await idbSet(DB_KEY_HALO_AVATARS, healedAvatars);

        // Request persistent browser storage so Chrome/Safari/Edge keeps IndexedDB permanently
        requestPersistentStorage().catch(() => {});

        // Authoritative sync to server: ensures server disk always has full projects, settings (including motion logo), team, and copy
        queueServerSync({
          projects: healedProjects,
          settings: mergedSettings,
          teamSpecialists: healedTeam,
          founderData: mergedFounder,
          clientLogos: chosenLogos,
          haloAvatars: healedAvatars
        });

        hasLoadedRef.current = true;
        setIsHydrated(true);
      } catch (err) {
        console.error('Error hydrating storage:', err);
        hasLoadedRef.current = true;
        setIsHydrated(true);
      }
    }

    hydrateFromPersistentStorage();

    return () => {
      isMounted = false;
    };
  }, []);

  // ================= PROJECT ACTIONS =================
  const updateProject = (updated: ProjectItem) => {
    setProjects(prev => {
      const next = prev.map(p => p.id === updated.id ? updated : p);
      idbSet(DB_KEY_PROJECTS, next);
      queueServerSync({ projects: next });
      return next;
    });
  };

  const addProject = (project: ProjectItem) => {
    setProjects(prev => {
      const next = [project, ...prev];
      idbSet(DB_KEY_PROJECTS, next);
      queueServerSync({ projects: next });
      return next;
    });
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => {
      const next = prev.filter(p => p.id !== projectId);
      idbSet(DB_KEY_PROJECTS, next);
      queueServerSync({ projects: next });
      return next;
    });
  };

  const addProjectImage = (projectId: string, imageUrl: string) => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id !== projectId) return p;
        const currentImages = p.images || [];
        return { ...p, images: [...currentImages, imageUrl] };
      });
      idbSet(DB_KEY_PROJECTS, next);
      queueServerSync({ projects: next });
      return next;
    });
  };

  const replaceProjectImage = (projectId: string, imageIndex: number, newImageUrl: string) => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id !== projectId) return p;
        const currentImages = [...(p.images || [])];
        currentImages[imageIndex] = newImageUrl;
        return { ...p, images: currentImages };
      });
      idbSet(DB_KEY_PROJECTS, next);
      queueServerSync({ projects: next });
      return next;
    });
  };

  const removeProjectImage = (projectId: string, imageIndex: number) => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id !== projectId) return p;
        const currentImages = (p.images || []).filter((_, idx) => idx !== imageIndex);
        return { ...p, images: currentImages };
      });
      idbSet(DB_KEY_PROJECTS, next);
      queueServerSync({ projects: next });
      return next;
    });
  };

  const updateProjectMedia = (
    projectId: string, 
    field: 'coverImage' | 'coverPhoto' | 'videoUrl' | 'secondaryVideoUrl', 
    url: string
  ) => {
    setProjects(prev => {
      const next = prev.map(p => {
        if (p.id !== projectId) return p;
        return { ...p, [field]: url };
      });
      idbSet(DB_KEY_PROJECTS, next);
      queueServerSync({ projects: next });
      return next;
    });
  };

  // ================= TEAM SPECIALIST ACTIONS =================
  const updateTeamSpecialist = (id: string, data: Partial<TeamSpecialist>) => {
    setTeamSpecialists(prev => {
      const next = prev.map(m => m.id === id ? { ...m, ...data } : m);
      idbSet(DB_KEY_TEAM, next);
      queueServerSync({ teamSpecialists: next });
      return next;
    });
  };

  const updateTeamSpecialistPhoto = (id: string, photoUrl: string) => {
    setTeamSpecialists(prev => {
      const next = prev.map(m => m.id === id ? { ...m, image: photoUrl } : m);
      idbSet(DB_KEY_TEAM, next);
      queueServerSync({ teamSpecialists: next });
      return next;
    });
  };

  const addTeamSpecialist = (member: TeamSpecialist) => {
    setTeamSpecialists(prev => {
      const next = [...prev, member];
      idbSet(DB_KEY_TEAM, next);
      queueServerSync({ teamSpecialists: next });
      return next;
    });
  };

  const removeTeamSpecialist = (id: string) => {
    setTeamSpecialists(prev => {
      const next = prev.filter(m => m.id !== id);
      idbSet(DB_KEY_TEAM, next);
      queueServerSync({ teamSpecialists: next });
      return next;
    });
  };

  // ================= FOUNDER ACTIONS =================
  const updateFounderData = (data: Partial<FounderInfo>) => {
    setFounderData(prev => {
      const next = { ...prev, ...data };
      idbSet(DB_KEY_FOUNDER, next);
      queueServerSync({ founderData: next });
      return next;
    });
  };

  const updateFounderPhoto = (photoUrl: string) => {
    setFounderData(prev => {
      const next = { ...prev, image: photoUrl };
      idbSet(DB_KEY_FOUNDER, next);
      queueServerSync({ founderData: next });
      return next;
    });
  };

  // ================= SETTINGS & LOGO ACTIONS =================
  const updateSettings = (newSettings: Partial<StudioCustomSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...newSettings };
      idbSet(DB_KEY_SETTINGS, next);
      queueServerSync({ settings: next });
      return next;
    });
  };

  const updateWebsiteLogo = (url: string) => {
    setSettings(prev => {
      const next = { ...prev, customLogoUrl: url || null };
      idbSet(DB_KEY_SETTINGS, next);
      queueServerSync({ settings: next });
      return next;
    });
  };

  const removeWebsiteLogo = () => {
    setSettings(prev => {
      const next = { ...prev, customLogoUrl: null };
      idbSet(DB_KEY_SETTINGS, next);
      queueServerSync({ settings: next });
      return next;
    });
  };

  const saveWebsiteLogo = (url: string | null) => {
    setSettings(prev => {
      const next = { ...prev, customLogoUrl: url };
      idbSet(DB_KEY_SETTINGS, next);
      queueServerSync({ settings: next });
      return next;
    });
  };

  const updateHeroCardMedia = (mediaUrl: string) => {
    setSettings(prev => {
      const next = { 
        ...prev, 
        customHeroMotionUrl: mediaUrl || null,
        motionLogoPreset: mediaUrl ? 'custom' : 'crystalline'
      };
      idbSet(DB_KEY_SETTINGS, next);
      queueServerSync({ settings: next });
      try {
        if (mediaUrl) {
          localStorage.setItem('dwh_motion_logo_url', mediaUrl);
          localStorage.setItem('dwh_motion_logo_preset', 'custom');
        } else {
          localStorage.removeItem('dwh_motion_logo_url');
          localStorage.setItem('dwh_motion_logo_preset', 'crystalline');
        }
      } catch {}
      return next;
    });
  };

  const updateBrandStoryVideo = (videoUrl: string, coverUrl?: string) => {
    setSettings(prev => {
      const next = {
        ...prev,
        brandStoryVideoUrl: videoUrl || null,
        ...(coverUrl !== undefined ? { brandStoryVideoCover: coverUrl || null } : {})
      };
      idbSet(DB_KEY_SETTINGS, next);
      queueServerSync({ settings: next });
      return next;
    });
  };

  // ================= CLIENT LOGOS ACTIONS =================
  const updateClientLogo = (id: string, data: Partial<ClientLogoItem>) => {
    setClientLogos(prev => {
      const next = prev.map(item => item.id === id ? { ...item, ...data } : item);
      idbSet(DB_KEY_CLIENT_LOGOS, next);
      queueServerSync({ clientLogos: next });
      return next;
    });
  };

  const updateClientLogoImage = (id: string, logoUrl: string) => {
    setClientLogos(prev => {
      const next = prev.map(item => item.id === id ? { ...item, logoUrl } : item);
      idbSet(DB_KEY_CLIENT_LOGOS, next);
      queueServerSync({ clientLogos: next });
      return next;
    });
  };

  const addClientLogo = (client: ClientLogoItem) => {
    setClientLogos(prev => {
      const next = [client, ...prev];
      idbSet(DB_KEY_CLIENT_LOGOS, next);
      queueServerSync({ clientLogos: next });
      return next;
    });
  };

  const removeClientLogo = (id: string) => {
    setClientLogos(prev => {
      const next = prev.filter(item => item.id !== id);
      idbSet(DB_KEY_CLIENT_LOGOS, next);
      queueServerSync({ clientLogos: next });
      return next;
    });
  };

  // ================= CLIENT HALO AVATAR ACTIONS =================
  const updateHaloAvatar = (id: string, data: Partial<HaloClientAvatar>) => {
    setHaloAvatars(prev => {
      const next = prev.map(item => item.id === id ? { ...item, ...data } : item);
      idbSet(DB_KEY_HALO_AVATARS, next);
      queueServerSync({ haloAvatars: next });
      return next;
    });
  };

  const updateHaloAvatarPhoto = (id: string, photoUrl: string) => {
    setHaloAvatars(prev => {
      const next = prev.map(item => item.id === id ? { ...item, avatar: photoUrl } : item);
      idbSet(DB_KEY_HALO_AVATARS, next);
      queueServerSync({ haloAvatars: next });
      return next;
    });
  };

  // ================= BACKUP & RESET =================
  const resetToDefaults = async () => {
    await Promise.all([
      resetServerContent(),
      idbDelete(DB_KEY_PROJECTS),
      idbDelete(DB_KEY_SETTINGS),
      idbDelete(DB_KEY_TEAM),
      idbDelete(DB_KEY_FOUNDER),
      idbDelete(DB_KEY_CLIENT_LOGOS),
      idbDelete(DB_KEY_HALO_AVATARS)
    ]);
    setProjects(STUDIO_PROJECTS);
    setSettings(DEFAULT_SETTINGS);
    setTeamSpecialists(TEAM_SPECIALISTS);
    setFounderData(DEFAULT_FOUNDER);
    setClientLogos(DEFAULT_CLIENT_LOGOS);
    setHaloAvatars(DEFAULT_HALO_AVATARS);
  };

  const exportBackup = () => {
    const backup = {
      projects,
      settings,
      teamSpecialists,
      founderData,
      clientLogos,
      haloAvatars,
      exportDate: new Date().toISOString(),
      version: '3.0'
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-with-habib-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = async (jsonString: string): Promise<boolean> => {
    try {
      const data = JSON.parse(jsonString);
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
        await idbSet(DB_KEY_PROJECTS, data.projects);
      }
      if (data.settings) {
        setSettings(data.settings);
        await idbSet(DB_KEY_SETTINGS, data.settings);
      }
      if (data.teamSpecialists && Array.isArray(data.teamSpecialists)) {
        setTeamSpecialists(data.teamSpecialists);
        await idbSet(DB_KEY_TEAM, data.teamSpecialists);
      }
      if (data.founderData) {
        setFounderData(data.founderData);
        await idbSet(DB_KEY_FOUNDER, data.founderData);
      }
      if (data.clientLogos && Array.isArray(data.clientLogos)) {
        setClientLogos(data.clientLogos);
        await idbSet(DB_KEY_CLIENT_LOGOS, data.clientLogos);
      }
      if (data.haloAvatars && Array.isArray(data.haloAvatars)) {
        setHaloAvatars(data.haloAvatars);
        await idbSet(DB_KEY_HALO_AVATARS, data.haloAvatars);
      }
      queueServerSync(data);
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  };

  return (
    <StudioContentContext.Provider
      value={{
        projects,
        services: STUDIO_SERVICES,
        settings,
        teamSpecialists,
        founderData,
        clientLogos,
        haloAvatars,
        isHydrated,
        isEditMode,
        setIsEditMode,

        updateHaloAvatar,
        updateHaloAvatarPhoto,

        updateClientLogo,
        updateClientLogoImage,
        addClientLogo,
        removeClientLogo,

        updateProject,
        addProject,
        deleteProject,
        addProjectImage,
        replaceProjectImage,
        removeProjectImage,
        updateProjectMedia,

        updateTeamSpecialist,
        updateTeamSpecialistPhoto,
        addTeamSpecialist,
        removeTeamSpecialist,

        updateFounderData,
        updateFounderPhoto,

        updateSettings,
        updateWebsiteLogo,
        removeWebsiteLogo,
        saveWebsiteLogo,
        updateHeroCardMedia,
        updateBrandStoryVideo,

        resetToDefaults,
        exportBackup,
        importBackup
      }}
    >
      {children}
    </StudioContentContext.Provider>
  );
};

export const useStudioContent = () => {
  return useContext(StudioContentContext);
};
