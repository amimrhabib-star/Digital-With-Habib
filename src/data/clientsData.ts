export interface ClientLogoItem {
  id: string;
  name: string;
  category: string;
  region: 'bangladeshi' | 'international';
  accentColor: string;
  iconLetter: string;
}

export const BANGLADESHI_CLIENTS: ClientLogoItem[] = [
  { id: 'gp', name: 'Grameenphone', category: 'TELECOMMUNICATIONS', region: 'bangladeshi', accentColor: '#00A3E0', iconLetter: 'GP' },
  { id: 'pathao', name: 'Pathao', category: 'RIDE-HAILING, LOGISTICS', region: 'bangladeshi', accentColor: '#E60000', iconLetter: 'P' },
  { id: 'aarong', name: 'Aarong', category: 'BRAC LIFESTYLE', region: 'bangladeshi', accentColor: '#FF6F00', iconLetter: 'A' },
  { id: 'square', name: 'Square Group', category: 'HEALTHCARE, PHARMA', region: 'bangladeshi', accentColor: '#00843D', iconLetter: 'SQ' },
  { id: 'chaldal', name: 'Chaldal', category: 'ONLINE GROCERY TECH PIONEER', region: 'bangladeshi', accentColor: '#FFB800', iconLetter: 'C' },
  { id: 'shopup', name: 'ShopUp', category: 'B2B DIGITAL COMMERCE', region: 'bangladeshi', accentColor: '#4A154B', iconLetter: 'SU' },
  { id: 'pran', name: 'PRAN-RFL Group', category: 'GLOBAL FOOD, AGRO', region: 'bangladeshi', accentColor: '#E53935', iconLetter: 'PR' },
  { id: 'walton', name: 'Walton Hi-Tech', category: 'CONSUMER ELECTRONICS', region: 'bangladeshi', accentColor: '#005BBB', iconLetter: 'W' },
  { id: 'bkash', name: 'bKash', category: 'FINTECH UNICORN', region: 'bangladeshi', accentColor: '#E2136E', iconLetter: 'bK' },
  { id: 'nagad', name: 'Nagad', category: 'DIGITAL FINANCIAL SERVICES', region: 'bangladeshi', accentColor: '#F7931E', iconLetter: 'N' },
  { id: 'daraz', name: 'Daraz', category: 'ECOMMERCE MARKETPLACE', region: 'bangladeshi', accentColor: '#FF5722', iconLetter: 'D' },
  { id: 'shikho', name: 'Shikho', category: 'EDTECH REVOLUTION', region: 'bangladeshi', accentColor: '#6C5CE7', iconLetter: 'S' },
];

export const INTERNATIONAL_CLIENTS: ClientLogoItem[] = [
  { id: 'notion', name: 'Notion', category: 'CONNECTED WORKSPACE', region: 'international', accentColor: '#000000', iconLetter: 'N' },
  { id: 'googlecloud', name: 'Google Cloud', category: 'CLOUD INFRASTRUCTURE', region: 'international', accentColor: '#4285F4', iconLetter: 'GC' },
  { id: 'shopify', name: 'Shopify', category: 'GLOBAL ECOMMERCE', region: 'international', accentColor: '#96BF48', iconLetter: 'S' },
  { id: 'stripe', name: 'Stripe', category: 'FINANCIAL INFRASTRUCTURE', region: 'international', accentColor: '#635BFF', iconLetter: 'ST' },
  { id: 'webflow', name: 'Webflow', category: 'VISUAL DEVELOPMENT', region: 'international', accentColor: '#4353FF', iconLetter: 'W' },
  { id: 'aws', name: 'AWS Cloud', category: 'ENTERPRISE CLOUD COMPUTING', region: 'international', accentColor: '#FF9900', iconLetter: 'AWS' },
  { id: 'hubspot', name: 'HubSpot', category: 'INBOUND MARKETING', region: 'international', accentColor: '#FF7A59', iconLetter: 'HS' },
  { id: 'figma', name: 'Figma', category: 'COLLABORATIVE DESIGN', region: 'international', accentColor: '#F24E1E', iconLetter: 'F' },
];

export const TEAM_SPECIALISTS = [
  {
    id: 'zubair',
    name: 'Zubair Rahman',
    role: 'Lead Brand & Identity Designer',
    projectsCount: 18,
    bio: 'Crafting minimalist brand marks, bespoke typography systems, and tactile packaging identities with meticulous precision.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tags: ['Brand Identity', 'Logo Systems', 'Typography']
  },
  {
    id: 'tahmina',
    name: 'Tahmina Akter',
    role: 'Senior UI/UX Product Architect',
    projectsCount: 24,
    bio: 'Designing intuitive user interfaces, scalable design systems, and friction-free flows for enterprise SaaS and mobile products.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    tags: ['UI/UX Design', 'Design Systems', 'Interactive Prototyping']
  },
  {
    id: 'arman',
    name: 'Arman Chowdhury',
    role: 'Creative Motion & Video Director',
    projectsCount: 31,
    bio: 'Directing high-retention video edits, 3D brand motion graphics, kinetic subtitles, and launch campaign storytelling.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    tags: ['Motion Graphics', 'Video Editing', '3D Visuals']
  },
  {
    id: 'nafisa',
    name: 'Nafisa Kamal',
    role: 'Digital Growth & Campaign Strategist',
    projectsCount: 19,
    bio: 'Optimizing multi-channel ad performance, content storytelling, conversion funnels, and data-backed creative direction.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    tags: ['Digital Marketing', 'Ad Creatives', 'Performance Growth']
  },
  {
    id: 'samiul',
    name: 'Samiul Hasan',
    role: 'Full-Stack Web & Creative Engineer',
    projectsCount: 27,
    bio: 'Building ultra-responsive, accessible digital web storefronts, interactive components, and smooth micro-animations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    tags: ['Web Engineering', 'React & TypeScript', 'Interaction Design']
  }
];

export const FAQS = [
  {
    question: 'What services do you offer?',
    answer: 'We provide graphic design and brand identity, UI/UX design, web development, digital marketing, video editing, motion graphics, and AI-assisted video.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Brand identity packages typically take 2-4 weeks, full UI/UX design takes 3-6 weeks, and full-stack web development ranges from 3-8 weeks depending on scope.'
  },
  {
    question: 'How does payment and milestone delivery work?',
    answer: 'We operate on transparent fixed-scope agreements with structured 50% kick-off and 50% launch milestones, or bi-weekly retainers for continuous partnerships.'
  },
  {
    question: 'Can I communicate directly with the creative directors?',
    answer: 'Yes, 100%. Our senior creative directors lead every engagement directly from initial strategy through creative direction and final sign-off, without middleman account managers.'
  },
  {
    question: 'What happens after project delivery?',
    answer: 'Every project includes 30 days of complimentary post-launch hypercare and QA support, full Figma master files, and complete source code ownership.'
  }
];
