import { ProjectItem, ServiceItem, ProcessStep, TestimonialItem, JournalArticle, MembershipPlan } from '../types';

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    categoryName: 'Brand Identity',
    description: 'We craft iconic logos, typography rules, color systems, and comprehensive brand books that establish instant market authority.',
    subservices: ['Logo System & Mark', 'Typography Hierarchy', 'Color Palette & Token System', 'Brand Guidelines & Books'],
    deliverables: [
      'Master Vector Logo Suite (SVG, EPS, AI, PNG)',
      'Typography Hierarchy & Webfont Licenses',
      'Comprehensive Digital & Print Brand Guidelines',
      'Social Media Kit & Business Collateral Templates'
    ],
    timeline: '2 - 3 Weeks',
    startingPrice: 'Starting from $1,000',
    icon: 'Sparkles',
    badge: 'Starting from $1,000',
    ctaText: 'Ask about Brand Design'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    categoryName: 'UI/UX Design',
    description: 'Human-centric, frictionless web apps, mobile apps, and SaaS interfaces engineered for maximum conversion and effortless adoption.',
    subservices: ['SaaS Product Design', 'Mobile App Interfaces', 'Conversion Design Systems', 'Interactive Prototyping'],
    deliverables: [
      'Pixel-perfect Figma Component Library',
      'Responsive Mobile & Desktop Wireframes',
      'Interactive Micro-animation Prototypes',
      'Developer Handoff Specification Tokens'
    ],
    timeline: '3 - 5 Weeks',
    startingPrice: 'Starting from $1,500',
    icon: 'Layout',
    badge: 'Starting from $1,500',
    ctaText: 'Ask about UI/UX Design'
  },
  {
    id: 'web-development',
    title: 'Web & App Development',
    categoryName: 'Web Development',
    description: 'Lightning-fast, production-grade Next.js, React, and TypeScript websites engineered to achieve 100/100 Core Web Vitals.',
    subservices: ['React & Next.js Engineering', 'Modern Responsive Websites', 'Dynamic Content Architecture', 'Performance & SEO Optimization'],
    deliverables: [
      'Full Clean Source Code with GitHub Repository',
      '100/100 Google Lighthouse Speed Rating',
      'SEO Metadata & OpenGraph Optimization',
      '30-Day Post-Launch Hypercare Support'
    ],
    timeline: '3 - 6 Weeks',
    startingPrice: 'Starting from $1,500',
    icon: 'Code2',
    badge: 'Starting from $1,500',
    ctaText: 'Ask about Web & App Development'
  },
  {
    id: 'video-motion',
    title: 'Video & Motion',
    categoryName: 'Video & Motion',
    description: 'Cinematic commercials, 4K product showcases, kinetic typography, and high-retention social media reels that stop users from scrolling.',
    subservices: ['High-Retention Reels & Shorts', '3D Product Motion Graphics', 'Kinetic Brand Launch Videos', 'Sound Design & Audio Engineering'],
    deliverables: [
      '4K UHD Master Video Exports (MP4 / ProRes)',
      'Multi-aspect crops (9:16 Vertical, 16:9 Landscape)',
      'Synchronized Kinetic Typography & Captions',
      'Custom Motion Sound Effects & Audio Mixing'
    ],
    timeline: '1 - 3 Weeks',
    startingPrice: 'Creative Scope',
    icon: 'Video',
    badge: 'Creative Scope',
    ctaText: 'Ask about Video & Motion'
  },
  {
    id: 'ai-video',
    title: 'AI Video & Motion Storytelling',
    categoryName: 'AI Video',
    description: 'Cutting-edge AI-assisted visual narratives, synthetic motion, and commercial video creation for high-velocity brands.',
    subservices: ['AI Visual Storytelling', 'Hyper-Realistic Product Sequences', 'Adaptive Social Ad Campaigns', 'Generative Motion Graphics'],
    deliverables: [
      'AI Generated Concept Storyboards',
      'Rendered 4K Video Commercials',
      'Dynamic Variations for A/B Testing',
      'Full Commercial Usage Clearance'
    ],
    timeline: '1 - 2 Weeks',
    startingPrice: 'Creative Scope',
    icon: 'Cpu',
    badge: 'Creative Scope',
    ctaText: 'Ask about AI Video'
  }
];

export const STUDIO_PROJECTS: ProjectItem[] = [
  // ================= 6 BRAND IDENTITY PROJECTS (Each with 7 images) =================
  {
    id: 'aethel-botanics',
    title: 'Aethel Luxury Botanics',
    client: 'Aethel Labs Switzerland',
    category: 'Brand Identity',
    tag: 'Brand Identity & Packaging',
    year: '2025',
    impactMetric: '+240% Pre-orders',
    description: 'A monolithic luxury botanical identity, bespoke packaging architecture, and typography system for an ultra-clean Swiss skincare formulation.',
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608248597359-00f7e44a7ecb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-amber-900/40 via-stone-800/60 to-black',
    featured: true,
    caseStudy: {
      overview: 'Aethel required a transformative rebrand to position its bio-fermented skincare line in high-end European department stores.',
      challenge: 'The existing branding felt sterile and medicinal, failing to communicate both organic alchemy and luxury price points.',
      solution: 'We engineered an understated editorial identity pairing serif typography with tactile textured packaging in forest and cream tones.',
      deliverables: ['Custom Wordmark & Monogram', 'Eco-friendly Glass Bottle Packaging System', 'Art Direction Guidelines', 'E-Commerce Styleguide'],
      results: ['Over $1.2M in pre-orders within 14 days of launch', 'Featured in Vogue Scandinavia', 'Retail placement across 18 flagship stores'],
      testimonial: {
        quote: 'Habib transformed our identity into something timeless and arresting. Our pre-orders exceeded our most optimistic forecasts.',
        author: 'Julian von Berg',
        role: 'Creative Director, Aethel Labs'
      }
    }
  },
  {
    id: 'delvix-logistics',
    title: 'Delvix Intelligent Logistics',
    client: 'Delvix Global Logistics',
    category: 'Brand Identity',
    tag: 'Brand Identity & Visual System',
    year: '2025',
    impactMetric: '$18M Series A Valuation',
    description: 'Futuristic visual identity, vehicle fleet wrap design, and responsive design guidelines for autonomous freight infrastructure.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-emerald-950 via-slate-900 to-black',
    featured: true,
    caseStudy: {
      overview: 'Delvix needed a high-trust, cutting-edge identity system to convince institutional enterprise logistics partners.',
      challenge: 'Standing out in a legacy logistics sector crowded with outdated corporate blue logos.',
      solution: 'Created an electric-emerald and obsidian visual language symbolizing precision, speed, and real-time algorithmic telemetry.',
      deliverables: ['Geometric Symbol & Dynamic Wordmark', 'Truck & Drone Fleet Livery Guides', 'Enterprise Stationery Suite', 'Investor Pitch Deck'],
      results: ['Closed an $18M Series A round with tier-1 investors', 'Onboarded 42 multinational carrier partners in 6 months']
    }
  },
  {
    id: 'lumina-architecture',
    title: 'Lumina Kinetic Architecture',
    client: 'Lumina Studio Copenhagen',
    category: 'Brand Identity',
    tag: 'Spatial Identity & Print Collateral',
    year: '2024',
    impactMetric: '3 Red Dot Design Nominations',
    description: 'Architectural monogram system, debossed foil monographs, and digital guidelines for an avant-garde Danish spatial design firm.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-slate-800 via-zinc-900 to-black',
    featured: false,
    caseStudy: {
      overview: 'Lumina creates bespoke residential and commercial spaces across Scandinavia and needed a brand identity matching their structural rigor.',
      challenge: 'Balancing minimalist Nordic restraint with memorable distinctive presence.',
      solution: 'Crafted a proportion-based mathematical grid monogram referencing golden-ratio spatial layouts.',
      deliverables: ['Monogram System', 'Debossed Foil Business Stationery', 'Project Monograph Book Design', 'Exhibition Wayfinding'],
      results: ['Won 3 European Architecture Design awards', 'Attracted ultra-high-net-worth commissions across 4 countries']
    }
  },
  {
    id: 'aerivo-lifestyle',
    title: 'Aerivo Outdoor Lifestyle',
    client: 'Aerivo Gear Vancouver',
    category: 'Brand Identity',
    tag: 'Brand Identity & Travel Gear',
    year: '2025',
    impactMetric: '+180% DTC Sales',
    description: 'Outdoor apparel and technical equipment brand identity with weather-resistant iconography, packaging, and digital lookbook.',
    coverImage: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-blue-900 via-sky-950 to-slate-900',
    featured: false,
    caseStudy: {
      overview: 'Aerivo designs ultra-lightweight travel gear for modern explorers seeking durable elegance.',
      challenge: 'Compete against entrenched outdoor giants with an agile, design-first direct-to-consumer brand voice.',
      solution: 'Created the "Go Beyond The Horizon" brand narrative with high-contrast alpine typography and technical seal logos.',
      deliverables: ['Brand Identity & Secondary Badges', 'Apparel Hangtags & Technical Labels', 'Packaging Box Architecture', 'Digital Launch Lookbook'],
      results: ['DTC sales surged 180% within first quarter', 'Expanded distribution to Japan and South Korea']
    }
  },
  {
    id: 'stride-athletics',
    title: 'Stride Athletics & Performance',
    client: 'Stride Performance UK',
    category: 'Brand Identity',
    tag: 'Brand Identity & Apparel Guidelines',
    year: '2024',
    impactMetric: '400k+ Active Community',
    description: 'Dynamic kinetic logo system, sports typography, and performance packaging for an elite athletic recovery and activewear label.',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-lime-950 via-zinc-900 to-black',
    featured: false,
    caseStudy: {
      overview: 'Stride wanted a hyper-kinetic identity for running athletes and high-intensity fitness communities.',
      challenge: 'Communicating high energy without looking cliché or generic.',
      solution: 'Engineered a forward-leaning aerodynamic emblem and bold neon-lime secondary accent system.',
      deliverables: ['Kinetic Logomark & Monogram', 'Silicone Apparel Badges', 'Duffle & Bottle Packaging', 'Social Video Motion Templates'],
      results: ['Sold out 3 capsule drops in under 2 hours each', 'Over 400,000 active runners wearing the brand in UK/EU']
    }
  },
  {
    id: 'kura-coffee',
    title: 'Kura Artisanal Coffee Roasters',
    client: 'Kura Coffee Tokyo',
    category: 'Brand Identity',
    tag: 'Global Packaging & Identity System',
    year: '2025',
    impactMetric: 'Featured in Monocle',
    description: 'Refined Japanese minimalism meets specialty coffee culture. Eco-friendly foil bean bags, stamps, and cafe interior signage.',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-amber-950 via-stone-900 to-black',
    featured: false,
    caseStudy: {
      overview: 'Kura operates single-origin roasteries in Tokyo and Kyoto, expanding into packaged subscription boxes globally.',
      challenge: 'Preserving intimate craft cafe heritage while scaling to an international direct-to-door brand.',
      solution: 'Created an ink-stamped identity celebrating imperfection and quiet craftsmanship.',
      deliverables: ['Kanji-infused Latin Wordmark', 'Compostable Pouch Packaging', 'Cafe Signage & Ceramic Cups', 'Subscription Unboxing Experience'],
      results: ['12,000 monthly subscribers acquired across 16 countries', 'Named Best Cafe Packaging 2025 by Sprudge']
    }
  },

  // ================= 6 UI/UX & APP DEVELOPMENT PROJECTS (Each with 7 images) =================
  {
    id: 'beaver-social',
    title: 'Beaver AI Social Co-Pilot',
    client: 'Beaver Labs San Francisco',
    category: 'UI/UX & App Dev',
    tag: 'Full SaaS Platform & Web Application',
    year: '2025',
    impactMetric: '320k Monthly Active Users',
    description: 'Intuitive social intelligence platform with AI content drafting, sentiment analytics, and scheduled multichannel broadcasting.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-blue-900 via-indigo-950 to-black',
    featured: true,
    caseStudy: {
      overview: 'Beaver needed a next-generation UI/UX and high-performance web app for creator marketing teams managing multiple brands.',
      challenge: 'Preventing cognitive overload while displaying high-volume live sentiment graphs and AI drafting tools.',
      solution: 'Engineered a modular bento dashboard layout with frictionless drag-and-drop calendars and instant AI prompt chips.',
      deliverables: ['Complete UI/UX Design System in Figma', 'Next.js & React 19 Frontend Web Application', 'Interactive Real-time Charts', 'Mobile Companion PWA'],
      results: ['Scaled from 10k to 320k MAU in under 5 months', 'Average session length increased by 44%']
    }
  },
  {
    id: 'examly-quiz',
    title: 'Examly Interactive Learning',
    client: 'Examly EdTech Austin',
    category: 'UI/UX & App Dev',
    tag: 'Mobile Platform & Quiz Ecosystem',
    year: '2025',
    impactMetric: '98.2% Completion Rate',
    description: 'Gamified mobile quiz application with micro-learning intervals, streak rewards, and adaptive spaced-repetition algorithms.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-purple-950 via-indigo-950 to-black',
    featured: true,
    caseStudy: {
      overview: 'Examly required an engaging mobile experience for university students studying professional certifications.',
      challenge: 'High drop-off rates on dry, test-preparation materials.',
      solution: 'Designed bite-sized interactive quizzes with tactile micro-interactions, haptic feedback design, and social leaderboards.',
      deliverables: ['iOS & Android App Interfaces', 'Gamification Mechanics System', 'React Native Components', 'Accessibility WCAG AAA Compliance'],
      results: ['Course completion skyrocketed from 34% to 98.2%', 'Ranked #3 Education App on App Store']
    }
  },
  {
    id: 'nexapay-wallet',
    title: 'NexaPay FinTech Wallet',
    client: 'NexaPay London',
    category: 'UI/UX & App Dev',
    tag: 'Consumer Mobile Interface & Banking UX',
    year: '2024',
    impactMetric: '£45M Monthly Transaction Volume',
    description: 'Zero-fee international remittance app featuring biometric authorization, instant multi-currency accounts, and expense insights.',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-sky-950 via-slate-900 to-black',
    featured: false,
    caseStudy: {
      overview: 'NexaPay delivers borderless money transfers for European and Asian expats.',
      challenge: 'Ensuring absolute clarity during complex foreign exchange currency transactions.',
      solution: 'Created an ultra-clean 2-tap transfer mechanism with live rate visualizers and instant digital card generation.',
      deliverables: ['Fintech Mobile Design System', 'Live FX Converter Interface', 'Virtual Card Apple Wallet Integration', 'Security & KYC Verification Flow'],
      results: ['Processing £45M monthly within 8 months of launch', 'App Store rating of 4.9/5.0 across 18,000+ reviews']
    }
  },
  {
    id: 'apexmetrics-saas',
    title: 'ApexMetrics Analytics OS',
    client: 'ApexMetrics Boston',
    category: 'UI/UX & App Dev',
    tag: 'High-Velocity Dashboard & Web Platform',
    year: '2025',
    impactMetric: '4.8x Conversion Rate Lift',
    description: 'Real-time telemetry and revenue intelligence dashboard for high-growth B2B enterprise software companies.',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-blue-950 via-slate-900 to-black',
    featured: false,
    caseStudy: {
      overview: 'ApexMetrics required a unified executive dashboard pulling metrics from Stripe, Salesforce, and Google Cloud.',
      challenge: 'Visualizing thousands of concurrent data streams without browser lag or clutter.',
      solution: 'Built high-efficiency React data grids, custom canvas chart renderers, and dark-mode analytical palettes.',
      deliverables: ['Web Dashboard UI/UX System', 'Next.js Frontend Architecture', 'Data Visualization Tokens', 'Custom Dark & Light Modes'],
      results: ['Sub-100ms dashboard load times on datasets of 100k+ rows', 'Adopted by 140+ tech enterprises']
    }
  },
  {
    id: 'chrono-workspace',
    title: 'Chrono Digital Workspace',
    client: 'Chrono Technologies Berlin',
    category: 'UI/UX & App Dev',
    tag: 'Desktop & Web Productivity App',
    year: '2024',
    impactMetric: '1.2M Downloads',
    description: 'Minimalist time management and deep-work companion application with contextual distraction blocking and smart calendar blocks.',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-slate-900 via-neutral-900 to-black',
    featured: false,
    caseStudy: {
      overview: 'Chrono helps knowledge workers protect their attention spans with intuitive keyboard-driven interfaces.',
      challenge: 'Creating a tool that feels invisible rather than intrusive.',
      solution: 'Engineered a monochrome command palette UI with smooth transitions, native shortcuts, and offline-first data sync.',
      deliverables: ['Electron Desktop App UI', 'Web App Companion', 'Keyboard Navigation Mapping', 'Custom Sound FX Library'],
      results: ['Surpassed 1.2 million downloads in first year', 'Product Hunt Product of the Day']
    }
  },
  {
    id: 'kora-health',
    title: 'Kora Health Telemedicine',
    client: 'Kora Health Sweden',
    category: 'UI/UX & App Dev',
    tag: 'Patient Portal & Clinical Mobile App',
    year: '2025',
    impactMetric: 'HIPAA & GDPR Compliant',
    description: 'Secure, accessible patient consultation portal and mobile app with encrypted video calls, prescription management, and appointment sync.',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-teal-950 via-slate-900 to-black',
    featured: false,
    caseStudy: {
      overview: 'Kora provides remote specialist care for chronic health conditions across the Nordic region.',
      challenge: 'Designing an interface accessible to elderly patients while maintaining rigorous clinical privacy standards.',
      solution: 'Engineered high-legibility typography, simplified single-step confirmation dialogues, and one-tap consultation joins.',
      deliverables: ['Patient iOS & Android Apps', 'Doctor Clinical Web Portal', 'Design Tokens & UI Kit', 'Audio & Video Call UI Overlays'],
      results: ['Over 85,000 successful consultations conducted', 'Patient satisfaction rating of 99.1%']
    }
  },

  // ================= 2 VIDEO & MOTION PROJECTS (With Video Upload + Cover Photo + 7 Images) =================
  {
    id: 'vanguard-launch-film',
    title: 'Vanguard Cinematic Brand Film',
    client: 'Vanguard Aerospace & Tech',
    category: 'Video & Motion',
    tag: '3D Motion Graphics & Launch Reel',
    year: '2025',
    impactMetric: '2.4M Organic Views',
    description: 'A 4K launch showreel featuring dynamic 3D kinetic text, explosive sound engineering, and cinematic macro visuals designed to command investor attention.',
    coverImage: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/motion-3d.mp4',
    images: [
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-blue-950 via-slate-900 to-black',
    featured: true,
    caseStudy: {
      overview: 'Vanguard commissioned a world-class cinematic launch film for their global technology unveil keynote.',
      challenge: 'Condensing 18 months of deep engineering into an unforgettable 90-second adrenaline-fueled narrative.',
      solution: 'Directed 3D motion animations, choreographed spatial audio sound design, and edited high-velocity kinetic titles.',
      deliverables: ['90-second 4K Cinema Master Film', '15-second Vertical Social Teasers', 'Sound Design & Mastering Stems', 'Custom Motion Title Package'],
      results: ['Accumulated 2.4M organic views in the first 72 hours', 'Keynote praised by leading technology media outlets']
    }
  },
  {
    id: 'pulse-product-commercial',
    title: 'Pulse Tech Product 4K Showcase',
    client: 'Pulse Audio Wearables',
    category: 'Video & Motion',
    tag: 'High-Retention Kinetic Commercial',
    year: '2025',
    impactMetric: '14.2% Click-Through Rate',
    description: 'Hypnotic product video commercial displaying acoustic hardware craftsmanship, active noise-cancellation visual waveforms, and tactile buttons.',
    coverImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/digital-exp.mp4',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-violet-950 via-slate-900 to-black',
    featured: true,
    caseStudy: {
      overview: 'Pulse launched their flagship ANC headphones and needed a commercial ad campaign that made sound feel tactile.',
      challenge: 'Communicating invisible acoustic frequency quality visually.',
      solution: 'Choreographed fluid cymatics, particle dynamics, and synchronized audio waveform pulses reacting to every beat.',
      deliverables: ['30-second Commercial Broadcast Cut', 'TikTok & Instagram 9:16 Video Ads', 'Motion Billboard Displays', 'Audio Brand Signature Jingle'],
      results: ['Achieved an unprecedented 14.2% CTR on Meta video ads', 'First production batch sold out in 3 days']
    }
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Understand',
    duration: 'Week 1',
    subtitle: 'Strategic Discovery & Alignment',
    description: 'We dig deep into your product architecture, target audience pain points, commercial ambitions, and market positioning before touching design.',
    keyOutputs: ['Competitive Matrix Analysis', 'User Persona Profiles', 'Brand Positioning Compass', 'Technical Scope Document']
  },
  {
    stepNumber: '02',
    title: 'Plan',
    duration: 'Week 2',
    subtitle: 'Architecture & Creative Direction',
    description: 'Establishing typography systems, structural wireframes, motion concepts, and user journeys to ensure every detail has intentional purpose.',
    keyOutputs: ['Information Architecture Map', 'Interactive Wireframe Prototypes', 'Moodboards & Motion Language', 'Milestone Delivery Roadmap']
  },
  {
    stepNumber: '03',
    title: 'Create',
    duration: 'Weeks 3 - 4',
    subtitle: 'Production & Pixel Craft',
    description: 'Executing high-fidelity UI design, bespoke vector brand identity, Next.js web development, and 4K motion graphics with rigorous craftsmanship.',
    keyOutputs: ['Production Figma Component Library', 'Next.js & TypeScript Codebase', 'Color-Graded 4K Motion Assets', 'Responsive Multi-Device Testing']
  },
  {
    stepNumber: '04',
    title: 'Deliver',
    duration: 'Week 5+',
    subtitle: 'Launch, Testing & Hypercare',
    description: 'Publishing your digital flagship, handing over full source repositories, and providing 30 days of complimentary post-launch support.',
    keyOutputs: ['Production Cloud Deployment', 'Comprehensive Design Guidelines Book', 'Figma Master Files & Vector SVGs', '30-Day Post-Launch Hypercare']
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    author: 'Marcus Vance',
    role: 'Founder',
    company: 'Vance Botanicals',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    metric: '+240% Pre-Orders',
    projectType: 'Brand Identity & Packaging',
    quote: 'The DWH Studio team helped us completely unify our brand identity and launch our eCommerce store with total confidence. The communication was direct, on time, and without any fluff.'
  },
  {
    id: 't-2',
    author: 'Elena Rostova',
    role: 'Head of Product',
    company: 'ApexMetrics SaaS',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    metric: '4.8x Conversion Lift',
    projectType: 'UI/UX Design & Architecture',
    quote: 'Working with one connected team rather than juggling separate freelancers saved us weeks of headaches. The UI/UX is clean, fast, and our users love it.'
  },
  {
    id: 't-3',
    author: 'Julian Davis',
    role: 'Creator & Founder',
    company: 'Peak Flow Media',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    metric: '2.4M Video Views',
    projectType: 'Video Editing & Motion Graphics',
    quote: 'The video editing and social campaign assets gave our product launch the exact polish and punch we needed to cut through the noise.'
  },
  {
    id: 't-4',
    author: 'Sophia Lin',
    role: 'Co-Founder & COO',
    company: 'NexaPay Fintech',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    metric: '£45M Monthly Volume',
    projectType: 'Brand & Motion Graphics',
    quote: 'The motion graphics and typography elevated our tech startup pitch deck and launch video. We closed our pre-seed round with immediate investor praise on the presentation!'
  }
];

export const FOUNDER_DATA = {
  name: 'Creative Leadership',
  role: 'Studio Direction & Strategy',
  title: 'Brand Architecture, Creative Direction & Digital Strategy',
  tagline: 'We Create Brands that People Remember.',
  bio: [
    'We help high-growth businesses, enterprises, and innovators turn bold ideas into category-defining brands, useful digital experiences, and high-retention media.',
    'Our multidisciplinary directors lead every engagement directly from initial strategy to final release so your output is consistent, fast, and commercially effective.'
  ],
  skills: [
    { name: 'Brand Identity', level: 98 },
    { name: 'Graphic Design', level: 96 },
    { name: 'UI/UX Architecture', level: 97 },
    { name: 'Web Engineering', level: 94 },
    { name: 'Video & Motion', level: 96 },
    { name: 'Performance Growth', level: 92 }
  ],
  socials: {
    whatsapp: 'https://wa.me/8801734144347?text=Hello!%20I%20would%20like%20to%20start%20a%20project%20with%20DWH%20Studio.',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    dribbble: 'https://dribbble.com',
    behance: 'https://behance.net'
  }
};

// ================= ARPEGGIO FLAGSHIP SHOWCASE PROJECTS =================
export const ARPEGGIO_FLAGSHIP_PROJECTS: ProjectItem[] = [
  {
    id: 'boreal-vr-headset',
    title: 'Boreal VR Headset',
    client: 'Nordvision Tech Labs',
    category: 'UI/UX & App Dev',
    tag: 'VR Headset Product Design & Commercial Launch',
    year: '2025',
    impactMetric: '+35% Customer Engagement',
    description: 'Next-generation spatial computing hardware interface and brand universe engineered for Nordvision’s revolutionary lightweight VR headset.',
    coverImage: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/digital-exp.mp4',
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-blue-900 via-indigo-950 to-black',
    featured: true,
    caseStudy: {
      overview: 'Nordvision developed Boreal to be the world’s most featherlight mixed-reality headset, demanding an optical identity that looked both aerospace-grade and universally welcoming.',
      challenge: 'Balancing futuristic spatial UI parameters with intuitive tactile feedback across both virtual OS and physical industrial hardware.',
      solution: 'Crafted a holistic design language spanning micro-interactions, hardware typography, packaging unboxing, and an award-winning launch campaign.',
      deliverables: [
        'Spatial OS Design System & Glass Tokens',
        '3D Kinetic Launch Showreel & Macro Visuals',
        'Hardware Laser-etched Typography & Identity',
        'Interactive WebGL Product Landing Platform'
      ],
      results: [
        'Won Best Integrated Campaign 2024 at Awwwards & Red Dot',
        'Over 85,000 pre-orders secured in the first 48 hours',
        '+35% lift in average user session duration'
      ],
      testimonial: {
        quote: 'Working with the studio on Boreal was a game-changer. Their attention to detail and spatial design systems made our vision take flight instantly.',
        author: 'Deborah Keith',
        role: 'Account Director, Nordvision Media'
      }
    }
  },
  {
    id: 'stride-apex',
    title: 'Stride Apex',
    client: 'Stride Athletics Group',
    category: 'UI/UX & App Dev',
    tag: 'Digital Product Design & Performance Ecosystem',
    year: '2025',
    impactMetric: '2.4M Active Athletes',
    description: 'High-performance athletic companion app featuring real-time biometric telemetry, adaptive pacing algorithms, and elite training community hubs.',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/brand-systems.mp4',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-amber-900 via-neutral-900 to-black',
    featured: true,
    caseStudy: {
      overview: 'Stride needed to unite connected running shoes, smart wearables, and mobile software into one seamless, adrenaline-pumping interface.',
      challenge: 'Ensuring data readability during high-intensity workouts with sweaty fingers, harsh direct sunlight, and rapid motion.',
      solution: 'Engineered high-contrast kinetic UI modules with glanceable typographic telemetry and haptic audio cues.',
      deliverables: [
        'iOS & Android Performance Design Systems',
        'Real-time Biometric Pulse Visualizers',
        'WatchOS Ultra Companion App',
        'Direct-to-Consumer eCommerce Experience'
      ],
      results: [
        'App Store Editor’s Choice Award 2025',
        'Scaled to 2.4 Million active athletes globally',
        'Average workout completion surged by 42%'
      ]
    }
  },
  {
    id: 'velocity-motors',
    title: 'Velocity Motors',
    client: 'Velocity Motors Group',
    category: 'Brand Identity',
    tag: 'Automotive Digital Ecosystem & 3D Configurator',
    year: '2025',
    impactMetric: '+24% Revenue Growth',
    description: 'Electric hypercar showcase platform featuring real-time 3D photorealistic vehicle configuration, aerodynamics simulation, and VIP concierge booking.',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/motion-3d.mp4',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    gradient: 'from-emerald-950 via-zinc-900 to-black',
    featured: true,
    caseStudy: {
      overview: 'Velocity Motors launched their flagship GT-Electric series and required an online buying experience as refined as the vehicle itself.',
      challenge: 'Rendering millimeter-accurate carbon-fiber reflections and bespoke paint finishes smoothly across browser devices.',
      solution: 'Built an interactive WebGL 3D configurator paired with an editorial editorial typography layout and seamless reservation checkout.',
      deliverables: [
        'Global Brand Identity & Automotive Emblem',
        'Photorealistic 3D WebGL Configurator',
        'VIP Private Client Allocation Portal',
        'Launch Campaign Video & Motion Graphics'
      ],
      results: [
        '+24% verified direct-to-consumer revenue growth',
        'Allocations completely sold out 6 months ahead of schedule',
        'FWA Site of the Month'
      ]
    }
  }
];

// ================= ARPEGGIO MEMBERSHIP SUBSCRIPTION PLANS =================
export const ARPEGGIO_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'core-plan',
    name: 'Core Plan',
    tagline: 'Pause or cancel whenever you wish.',
    monthlyPrice: 3999,
    quarterlyPrice: 3399,
    description: 'Perfect for fast-growing startups and agencies needing steady, reliable design output with zero hiring friction.',
    features: [
      { text: 'First Mockup in 72hrs', subtext: 'Initial design concepts delivered in 3 days with quality-focused execution' },
      { text: 'Single Project Queue', subtext: 'Dedicated project queue ensuring full focused attention on your active request' },
      { text: 'Unlimited Design Iterations', subtext: 'Continuous refinements until every curve and pixel meets perfection' },
      { text: 'Dedicated Senior Designer', subtext: 'Experienced director assigned to bring your brand vision to life effectively' },
      { text: 'Standard Web & Framer Development', subtext: 'Production-ready code and responsive web layouts' },
      { text: 'Private Slack & Notion Dashboard', subtext: 'Direct async communication and real-time sprint tracking' },
      { text: 'Pause or Cancel Anytime', subtext: 'Billing is flexible; save unused days for your next sprint' }
    ],
    ctaText: 'Select Core Plan'
  },
  {
    id: 'pro-plan',
    name: 'Pro Plan',
    tagline: 'Double the speed. Two active requests simultaneously.',
    monthlyPrice: 6499,
    quarterlyPrice: 5499,
    popular: true,
    description: 'For established brands and high-velocity teams requiring rapid multi-track execution and advanced 3D motion capabilities.',
    features: [
      { text: 'Two Active Requests at a Time', subtext: 'Parallel workstreams across brand, product, motion, or code' },
      { text: 'Fast 48-Hour Turnaround', subtext: 'Expedited deliveries for sprints and time-sensitive product launches' },
      { text: 'Dedicated Senior Creative Director & Lead Dev', subtext: 'Direct senior-level partnership without agency junior layers' },
      { text: '3D Motion & Commercial Video Engineering', subtext: 'Cinema 4D, Blender, After Effects, and kinetic micro-interactions' },
      { text: 'Figma & Full Code Source Files Included', subtext: 'Total intellectual property ownership with full design system tokens' },
      { text: 'Weekly 1-on-1 Strategic Alignment Calls', subtext: 'Live video reviews, sprint planning, and roadmap consultation' },
      { text: 'Unlimited Team Members Access', subtext: 'Invite your entire product and marketing team into the dashboard' }
    ],
    ctaText: 'Select Pro Plan'
  }
];

// ================= ARPEGGIO FAQS =================
export const ARPEGGIO_FAQS = [
  {
    question: 'What can I expect within 48 hours?',
    answer: 'Within 48 hours of submitting a request, you will receive initial concepts, functional wireframes, component designs, or completed revisions depending on the scope. For larger projects (such as full web platforms or comprehensive brand systems), we deliver modular milestones every 48 hours so you see immediate, tangible progress.'
  },
  {
    question: 'How does the subscription model work?',
    answer: 'You subscribe to a flat monthly fee with no long-term contracts. You can add unlimited design requests to your Trello/Notion queue, and we work through them sequentially (one at a time on Core, two at a time on Pro). Once a task is approved, we immediately begin the next one.'
  },
  {
    question: 'Can I pause my subscription if needed?',
    answer: 'Absolutely. We understand your design workload may fluctuate. Billing cycles are calculated on a 31-day period. For example, if you subscribe, use the service for 21 days, and then decide to pause, your billing cycle halts and you will have 10 unused days remaining in your balance whenever you choose to resume.'
  },
  {
    question: 'Who will I be working with on my projects?',
    answer: 'You work directly with our senior creative directors, brand architects, and lead engineers. Unlike traditional bloated agencies, we do not pass your work to junior interns or offshore third parties. Every pixel and line of code is handcrafted by proven industry experts.'
  },
  {
    question: 'How do I get started with Arpeggio?',
    answer: 'Getting started takes under 5 minutes. Select your desired membership plan, complete checkout, and you will receive an instant invite to your private Slack channel and custom Notion dashboard. You can submit your first design request on day one.'
  },
  {
    question: 'How do revisions work?',
    answer: 'Unlimited revisions are included across all plans. If a design concept or prototype is not quite hitting the mark, we continue iterating and refining it based on your feedback until you are 100% satisfied.'
  }
];

// ================= ARPEGGIO CLIENT STORIES & TESTIMONIALS =================
export const ARPEGGIO_CLIENT_STORIES = [
  {
    id: 'deborah-keith',
    name: 'Deborah Keith',
    role: 'Account Director',
    company: 'Nordvision Tech Labs',
    hasVideo: true,
    videoUrl: '/videos/digital-exp.mp4',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'Working with the team was a game-changer. Their attention to detail and unique design solutions helped elevate our client’s brand significantly. The speed of execution within 48-hour sprints kept our executive board thrilled.'
  },
  {
    id: 'noah-kristiansen',
    name: 'Noah Kristiansen',
    role: 'Head of Projects',
    company: 'TWBE Studios',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'The team transformed our brand with stunning visuals and innovative designs. Their responsiveness and creativity exceeded our highest expectations.'
  },
  {
    id: 'sophia-williams',
    name: 'Sophia Williams',
    role: 'Marketing Manager',
    company: 'Austrian Air',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    quote: 'The innovative approach and fast delivery were exactly what we needed. The team was collaborative and brought our complex flight booking ideas to life beautifully.'
  },
  {
    id: 'nicolas-sanchez',
    name: 'Nicolás Sánchez',
    role: 'Content Strategist',
    company: 'Greenbay',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    quote: 'The creativity and professionalism were unmatched. Our project was delivered on time and captured exactly what we envisioned for our environmental tech platform.'
  },
  {
    id: 'emma-robinson',
    name: 'Emma Lee Robinson',
    role: 'Creative Lead',
    company: 'Bright 5 Collective',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    quote: 'Arpeggio transformed our brand with stunning visuals and innovative designs. Their team was responsive, proactive, and consistently exceeded our expectations.'
  },
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'BrightWave Media',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'The innovative approach and attention to detail exceeded our expectations. The team’s ability to understand our vision and translate it into stunning designs made all the difference in our success.'
  },
  {
    id: 'lucas-peterson',
    name: 'Lucas Peterson',
    role: 'Client Services Manager',
    company: 'Pulse Digital',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    quote: 'Seamless collaboration, zero bureaucratic friction, and world-class craft. Having an entire multidisciplinary studio on a single subscription is the future of agency partnerships.'
  }
];

// ================= ARPEGGIO JOURNAL ARTICLES =================
export const ARPEGGIO_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'evolution-micro-interactions',
    title: 'The Evolution of Micro-Interactions',
    subtitle: 'Small animations, big impact: how subtle movements shape user experience',
    author: 'Flavio Montanari',
    authorRole: 'Design Systems Lead',
    date: 'Wednesday, February 26, 2025',
    readTime: '5 min read',
    category: 'Product Design',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Digital experiences are becoming increasingly nuanced, with micro-interactions playing a crucial role in how users engage with interfaces. These tiny, purposeful animations do more than just delight—they provide essential feedback, guide user behavior, and create memorable experiences that keep users coming back.',
    content: `Digital experiences are becoming increasingly nuanced, with micro-interactions playing a crucial role in how users engage with interfaces. These tiny, purposeful animations do more than just delight—they provide essential feedback, guide user behavior, and create memorable experiences that keep users coming back.

When we examine the most celebrated software in the world, the difference between a functional product and an extraordinary product lives in the sub-second reactions: the tactile resistance when dragging an item, the subtle optical dampening as a drawer docks to the screen edge, and the spring physics that acknowledge user intent.

In modern interface engineering, micro-interactions are not decorative afterthoughts; they are the semantic language of touch and intent. By reducing cognitive ambiguity, they communicate state changes with effortless clarity.`
  },
  {
    id: 'digital-ecology-practice',
    title: 'Digital Ecology in Practice',
    subtitle: 'How eco-conscious design choices impact our digital carbon footprint',
    author: 'Clara Söderberg',
    authorRole: 'Senior UX Strategist',
    date: 'Wednesday, January 1, 2025',
    readTime: '6 min read',
    category: 'Sustainability',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'As the digital landscape grows, so does its environmental impact. Sustainable design isn’t just about green aesthetics—it’s about making conscious decisions that reduce digital carbon footprints while maintaining exceptional user experiences. This shift towards eco-friendly design is becoming a crucial consideration for responsible digital creation.',
    content: `As the digital landscape grows, so does its environmental impact. Sustainable design isn’t just about green aesthetics—it’s about making conscious decisions that reduce digital carbon footprints while maintaining exceptional user experiences. This shift towards eco-friendly design is becoming a crucial consideration for responsible digital creation.

Every HTTP request, uncompressed raster asset, and excessive DOM node consumes server and device electrical power. By embracing variable fonts, SVG vector structures, modern AVIF/WebP image compression, and efficient layout algorithms, studios can dramatically lower computational overhead.

The bonus? Sustainable interfaces load four times faster, rank higher on search engines, and create superior accessibility across low-bandwidth environments.`
  },
  {
    id: 'typography-trends-2025',
    title: 'Typography Trends',
    subtitle: 'How modern typography is changing the way we communicate online',
    author: 'Tomasso Fiorelli',
    authorRole: 'Creative Director',
    date: 'Tuesday, January 14, 2025',
    readTime: '4 min read',
    category: 'Visual Design',
    coverImage: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Typography has evolved from a mere vehicle for text to a powerful tool for brand expression and user experience. In 2025, the role of typography in digital design goes beyond readability—it’s about creating emotional connections and enhancing digital interactions through thoughtful type choices.',
    content: `Typography has evolved from a mere vehicle for text to a powerful tool for brand expression and user experience. In 2025, the role of typography in digital design goes beyond readability—it’s about creating emotional connections and enhancing digital interactions through thoughtful type choices.

We are seeing a profound renaissance of editorial typography: high-contrast geometric displays paired with utilitarian monospaced tracking, tight letter-spacing on display headlines, and generous negative space framing every paragraph.

When typography is treated with optical hierarchy and mathematical step scales, websites transcend generic templates and achieve the timeless feel of high-fashion print monographs.`
  },
  {
    id: 'ai-driven-design',
    title: 'AI-Driven Design',
    subtitle: 'How artificial intelligence is transforming the creative process',
    author: 'Vito Lorenzo',
    authorRole: 'Lead Technologist',
    date: 'Tuesday, February 4, 2025',
    readTime: '7 min read',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'The intersection of AI and design has moved far beyond basic automation. Today’s AI tools aren’t just assisting designers—they’re becoming active collaborators in the creative process. This evolution is reshaping how we approach design challenges and opening new possibilities for innovation and efficiency.',
    content: `The intersection of AI and design has moved far beyond basic automation. Today’s AI tools aren’t just assisting designers—they’re becoming active collaborators in the creative process. This evolution is reshaping how we approach design challenges and opening new possibilities for innovation and efficiency.

Rather than replacing human taste, artificial intelligence accelerates the journey from concept to realization. By generating rapid visual moodboards, testing color contrast parameters, and automating tedious asset resizing, creators are liberated to focus on pure taste, narrative storytelling, and human connection.`
  }
];

// ================= ARPEGGIO AWARDS & RECOGNITIONS =================
export const ARPEGGIO_AWARDS = [
  { name: 'Awwwards Site of the Day', count: '14x Winner', year: '2024-2025' },
  { name: 'FWA of the Day', count: '9x Winner', year: '2024-2025' },
  { name: 'CSS Design Awards', count: '18x Winner', year: '2024-2025' },
  { name: 'Red Dot Best of the Best', count: '3x Winner', year: '2024' },
  { name: 'Webby Awards Nominee', count: '5x Nominee', year: '2025' },
  { name: 'Behance Curated Portfolio', count: '12x Feature', year: '2024-2025' }
];

export const ARPEGGIO_METRICS = [
  { value: '35%', label: 'Customer Engagement Lift', sub: 'Across client platforms' },
  { value: '24%', label: 'Revenue Growth Average', sub: 'Measured post-redesign' },
  { value: '140+', label: 'Projects Completed', sub: 'Pixel-perfect deliverables' },
  { value: '20+', label: 'Clients Served Worldwide', sub: 'Across 12 countries' },
  { value: '51+', label: 'Design Awards & Recognitions', sub: 'International honors' },
  { value: '99+', label: 'Campaigns Launched', sub: 'High-impact executions' },
  { value: '0', label: 'Colours Not Used in 2025', sub: 'Uncompromising craft' }
];

export const DEFAULT_HALO_AVATARS: Array<{
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
}> = [
  {
    id: 'h1',
    name: 'Elena Rostova',
    role: 'Head of Product',
    company: 'ApexMetrics',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'Super fast execution, incredible UI/UX polish.',
    x: 8,
    y: 55,
    size: 58,
    floatDelay: 0.2
  },
  {
    id: 'h2',
    name: 'Julian Davis',
    role: 'Founder',
    company: 'Peak Flow',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'Handled our rebrand and videos seamlessly.',
    x: 18,
    y: 32,
    size: 64,
    floatDelay: 0.5
  },
  {
    id: 'h3',
    name: 'Sophia Lin',
    role: 'Co-Founder',
    company: 'NexaPay',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'Closed our funding round with our new design.',
    x: 29,
    y: 15,
    size: 60,
    floatDelay: 0.9
  },
  {
    id: 'h4',
    name: 'Marcus Vance',
    role: 'CEO',
    company: 'Vance Labs',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'Nailed our vision on the very first pass.',
    x: 41,
    y: 6,
    size: 66,
    floatDelay: 0.4
  },
  {
    id: 'h5',
    name: 'David Sterling',
    role: 'VP Design',
    company: 'HyperCloud',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'World-class aesthetic with zero fluff.',
    x: 59,
    y: 6,
    size: 66,
    floatDelay: 0.7
  },
  {
    id: 'h6',
    name: 'Maya Kim',
    role: 'Head of Product',
    company: 'Hopsk',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'Clean process, great work, no hand-holding.',
    x: 71,
    y: 15,
    size: 62,
    floatDelay: 0.3
  },
  {
    id: 'h7',
    name: 'Eli Ramos',
    role: 'Founder',
    company: 'Milles',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'Quick turnaround and brilliant motion.',
    x: 82,
    y: 32,
    size: 64,
    floatDelay: 0.6
  },
  {
    id: 'h8',
    name: 'Liam Chen',
    role: 'CTO',
    company: 'Zenith Health',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    quoteSnippet: 'High conversion rate bump on day 1.',
    x: 92,
    y: 55,
    size: 58,
    floatDelay: 0.8
  }
];


