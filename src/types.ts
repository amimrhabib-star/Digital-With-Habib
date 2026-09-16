export type ProjectCategory = 
  | 'All' 
  | 'Brand Identity' 
  | 'UI/UX & App Dev' 
  | 'Video & Motion'
  | 'Branding'
  | 'Logo Design'
  | 'Graphic Design'
  | 'UI/UX Design'
  | 'Social Media Design'
  | 'Print Design'
  | 'Illustration'
  | 'Packaging Design'
  | 'Video Editing'
  | 'Motion Graphics'
  | string;

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  tag: string;
  year: string;
  impactMetric: string;
  description: string;
  coverImage: string;
  images: string[]; // 6 to 7+ images uploadable and removable manually
  gradient: string;
  featured: boolean;
  videoUrl?: string; // Primary video for video & motion projects
  secondaryVideoUrl?: string; // Secondary video upload option
  coverPhoto?: string; // Custom cover photo for video
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    deliverables: string[];
    results: string[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

export interface TeamSpecialist {
  id: string;
  name: string;
  role: string;
  projectsCount: number;
  bio: string;
  image: string;
  tags: string[];
}

export interface HaloClientAvatar {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  avatar: string;
  quoteSnippet: string;
  x: number;
  y: number;
  size: number;
  floatDelay: number;
}

export interface ClientLogoItem {
  id: string;
  name: string;
  category: string;
  region: 'bangladeshi' | 'international';
  accentColor: string;
  iconLetter: string;
  logoUrl?: string | null;
}

export interface FounderInfo {
  name: string;
  role: string;
  title: string;
  tagline: string;
  bio: string[];
  image: string;
  skills: { name: string; level: number }[];
  socials: {
    whatsapp: string;
    linkedin: string;
    twitter: string;
    dribbble: string;
    behance: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  categoryName: string;
  description: string;
  subservices: string[];
  deliverables: string[];
  timeline: string;
  startingPrice: string; // Range $1,000 to $5,000
  icon: string;
  badge: string;
  ctaText: string; // e.g. "Ask about Brand Design"
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  duration: string;
  subtitle: string;
  description: string;
  keyOutputs: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  metric: string;
  projectType: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  description: string;
  features: { text: string; subtext?: string }[];
  popular?: boolean;
  ctaText: string;
}

export interface InquiryFormData {
  selectedServices: string[];
  budgetRange: string;
  timeline: string;
  fullName: string;
  email: string;
  companyName: string;
  projectDetails: string;
}

export interface StudioCustomSettings {
  heroHeadline: string;
  heroHighlight: string;
  heroSubtitle: string;
  customLogoUrl: string | null;
  customHeroMotionUrl: string | null;
  heroCardVideoUrl: string | null;
  heroCardBadgeText: string;
  heroSatisfactionText: string;
  phoneWhatsApp: string;
  studioEmail: string;
  // Futuristic Motion & Showcase Enhancement
  logoMotionBrandName?: string;
  logoMotionTagline?: string;
  logoMotionServiceTags?: string[];
  logoMotionCustomLogoUrl?: string | null;
  cinematicVideoHeading?: string;
  cinematicVideoBadge?: string;
  cinematicVideoSubtitle?: string;
  cinematicVideoUrl?: string | null;
  cinematicVideoAutoPlay?: boolean;
  // World-Class Agency Brand Story Video Showcase
  brandStoryHeading?: string;
  brandStorySubtitle?: string;
  brandStoryVideoUrl?: string | null;
  brandStoryVideoCover?: string | null;
  logoScale?: number;
  motionLogoPreset?: string;
  motionLogoIntensity?: string;
}
