/**
 * All site content lives here. Edit this file to update the portfolio.
 *
 * Images: drop screenshots into /public/work/<slug>/ and reference them by path.
 * Frames use a 16:7 ratio (wide browser captures), cropped from the top.
 */

export type Screenshot = {
  src: string
  alt: string
  /** Scale inside slideshow windows, for dense dashboards that read better closer up (e.g. 1.25). */
  zoom?: number
  /** CSS object-position for the crop. Defaults to "left top". */
  focus?: string
  /** Only used by the hero strip; hidden from slideshows, tiles and case studies. */
  stripOnly?: boolean
}

export type Project = {
  slug: string
  name: string
  /** One line shown on cards and as the case study subtitle. */
  tagline: string
  category: string
  year: string
  /** Shown on the case study page. */
  period?: string
  company?: string
  region?: string
  role: string
  problem: string
  /** Case study body paragraphs. */
  overview?: string[]
  features: string[]
  stack: string[]
  /** Results worth calling out. Only include what is true and verifiable. */
  outcomes?: string[]
  /** Big numbers on the case study page. Only verifiable figures. */
  stats?: { value: string; label: string }[]
  live?: string
  /** Brand colour sampled from the project's own UI. Used for stage backgrounds. */
  color: string
  /** The live site is down: outbound links are hidden, the domain still shows in browser frames. */
  offline?: boolean
  /** Optional stage colour for the featured card and case study cover, when the brand colour clashes with the UI. */
  stage?: string
  /** Index the featured slideshow and case study start from. The hero strip always uses the first image. */
  showcaseFrom?: number
  images: Screenshot[]
  /** "featured" = large card, "selected" = grid card, "index" = row in the "More work" list. */
  tier: 'featured' | 'selected' | 'index'
  /** Index rows link to a case study page only when this is true; otherwise to the live site. */
  caseStudy: boolean
}

export type Role = {
  company: string
  title: string
  type?: string
  start: string
  end: string
  location?: string
  bullets: string[]
}

export const site = {
  name: 'Maaz Ali',
  role: 'Full-stack engineer',
  /** Change NEXT_PUBLIC_SITE_URL in Vercel when the domain changes. Used for metadata, sitemap and OG images. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maazport.vercel.app',
  headline: {
    lead: 'Building',
    emphasis: 'multi-tenant SaaS',
    tail: 'for clients in Australia, the UK and the US.',
  },
  /** One line under the hero headline. */
  intro: 'I’m Maaz, a full-stack engineer shipping products end to end with React, Next.js, NestJS and AI.',
  description:
    'Maaz Ali is a full-stack engineer building multi-tenant SaaS for clients in Australia, the UK and the US. React, Next.js, NestJS and AI-powered products, end to end.',
  /** The scroll-lit statement under the hero. */
  statement:
    'I build software that solves real-life problems. Since 2021 I have shipped products end to end: a multi-tenant platform running aesthetic clinics across Australia, an invite-only fashion network in the UK, and AI assistants that only answer from what each role is cleared to see.',
  regions: ['Australia', 'United Kingdom', 'United States', 'Germany'],
  availability: 'Available for remote work',
  location: 'Multan, Pakistan',
  timezone: 'Asia/Karachi',
  timezoneLabel: 'UTC+5',
  email: 'dev.maazali@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/maazalirao',
    github: 'https://github.com/maazalirao',
  },
}

export const projects: Project[] = [
  {
    slug: 'noavant',
    name: 'Noavant',
    tagline: 'Invite-only social network for designers, stylists and photographers in the UK fashion world.',
    category: 'Social platform',
    year: '2025',
    period: 'Jan 2025 — Jun 2025',
    company: 'GoCloud Pvt Ltd.',
    region: 'United Kingdom',
    role: 'Full-stack developer',
    problem:
      'Fashion creatives needed a private space to build portfolios, collaborate and sell their work, with the premium feel a fashion product demands.',
    overview: [
      'Noavant is an invite-only social network for the fashion world. Designers, stylists and photographers build portfolios, create drag-and-drop moodboards, start public or private communities, message each other in real time and sell their work.',
      'I was the full-stack developer on the project at GoCloud, building it into a fast, polished platform.',
    ],
    features: [
      'Invite-only access with token-based applications',
      'Creative portfolios and profiles',
      'Drag-and-drop moodboards',
      'Public and private communities',
      'Real-time messaging',
      'Selling work on the platform',
    ],
    stack: ['Next.js', 'NestJS', 'API development'],
    outcomes: ['Launched to a strong reception in the UK fashion scene, with creatives quickly forming active communities.'],
    live: 'https://noavant.com',
    offline: true,
    color: '#a3161a',
    images: [
      { src: '/work/noavant/01-landing.webp', alt: 'Noavant landing page: the invite-only fashion social network' },
      { src: '/work/noavant/02-feed.webp', alt: 'Home feed with community stats and fashion news' },
      { src: '/work/noavant/03-community.webp', alt: 'Community page with feed, members and privacy settings' },
      { src: '/work/noavant/04-profile-moodboard.webp', alt: 'Creative profile with portfolio and moodboards' },
      { src: '/work/noavant/05-explore-communities.webp', alt: 'Explore communities with privacy filters' },
      { src: '/work/noavant/06-post.webp', alt: 'Post detail in dark mode' },
    ],
    tier: 'featured',
    caseStudy: true,
  },
  {
    slug: 'aesthetics-consultants',
    name: 'Aesthetics Consultants',
    tagline: 'Multi-tenant clinic management SaaS for aesthetic and cosmetic clinics across Australia.',
    category: 'Clinic management SaaS',
    year: '2025',
    period: 'Jul 2025 — Present',
    company: 'GoCloud Pvt Ltd.',
    region: 'Australia',
    role: 'Senior backend (full-stack) developer',
    problem:
      'An aesthetic clinic runs on bookings, clinical records, consent, stock, staff and marketing all at once. The platform was built to run an entire practice, across multiple clinics, from one place.',
    overview: [
      'I have worked on the platform with my team since July 2025, with end-to-end ownership of the staff roster, stock reconciliation, SMS automation and treatment modules.',
      'It covers what a clinic needs day to day: scheduling and online booking, patient profiles with clinical records and treatment plans, digital consent forms and prescriptions, inventory, rostering, reporting, gift cards, loyalty and promotions, plus built-in email and SMS marketing and CRM, all with role-based access across clinics.',
      'It is the most comprehensive product I have worked on, and it runs real clinics every day.',
    ],
    features: [
      'Staff rostering across clinics',
      'Inventory, stock control and reconciliation',
      'SMS and email marketing campaigns',
      'Treatment plans for injectables, skin and beauty',
      'Scheduling and online booking',
      'Patient records, digital consent forms and prescriptions',
      'Sales and revenue reporting, gift cards, loyalty and promotions',
      'Role-based access across multiple clinics',
    ],
    stack: ['React', 'NestJS', 'MySQL', 'Multi-tenant architecture', 'Role-based access'],
    live: 'https://aestheticsconsults.com.au',
    color: '#0a5aa6',
    stage: '#57311f',
    showcaseFrom: 2,
    images: [
      { src: '/work/aesthetics-consultants/01-staff-roster.webp', alt: 'Staff roster: weekly shift assignments per clinic', zoom: 1.3 },
      { src: '/work/aesthetics-consultants/06-sign-in.webp', alt: 'Sign-in screen with email and mobile OTP', focus: 'center top' },
      { src: '/work/aesthetics-consultants/05-app-menu.webp', alt: 'App menu with clinics, patients, roles and promotions', zoom: 1.12 },
      { src: '/work/aesthetics-consultants/02-stock-ledger.webp', alt: 'Stock management: inventory, pricing and ledger', zoom: 1.3 },
      { src: '/work/aesthetics-consultants/03-campaigns.webp', alt: 'Campaign tools for email and SMS marketing', zoom: 1.1, focus: 'center top' },
      { src: '/work/aesthetics-consultants/04-appointments.webp', alt: 'Appointment schedule by injector, week view', zoom: 1.2 },
    ],
    tier: 'featured',
    caseStudy: true,
  },
  {
    slug: 'teamly-qa',
    name: 'Teamly Q&A',
    tagline: 'Role-aware RAG knowledge assistant: staff get answers only from documents their role is cleared to read.',
    category: 'RAG knowledge platform',
    year: '2026',
    period: '2026',
    role: 'Full-stack and AI engineering',
    problem:
      'Staff at a software company needed answers from internal documents in plain English, without anyone seeing content above their clearance.',
    overview: [
      'Built as an MVP internal knowledge assistant for a software company. Documents go through a file ingestion pipeline into the knowledge base, and every answer cites the chunks it came from.',
      'Access control lives inside the database query, so a CEO and a guest asking the same question get different answers.',
    ],
    features: [
      'File ingestion pipeline into a searchable knowledge base',
      'Answers with numbered source citations and relevance scores',
      'Access control enforced in the database query across 6 roles, 5 departments and 4 sensitivity levels',
      'Guardrails that block prompt injection before retrieval',
      'PII redaction based on the user’s role',
      'Monitoring for grounding rate, latency, token cost and usage by role',
    ],
    stack: ['RAG', 'LLMs', 'Role-based access control', 'Vite', 'Vercel'],
    outcomes: ['Warm answers return in about 3 seconds at roughly $0.0002 per query.'],
    stats: [
      { value: '6', label: 'Roles' },
      { value: '5', label: 'Departments' },
      { value: '4', label: 'Sensitivity levels' },
      { value: '~3s', label: 'Warm answer time' },
    ],
    live: 'https://teamly-qa.vercel.app',
    color: '#124f52',
    images: [
      { src: '/work/teamly-qa/01-cited-answer.webp', alt: 'Cited answer with source chunks, sensitivity levels and relevance scores' },
      { src: '/work/teamly-qa/02-assistant.webp', alt: 'Assistant view showing the signed-in role’s access scope' },
      { src: '/work/teamly-qa/03-access-model.webp', alt: 'Access model: role permissions by department and sensitivity' },
      { src: '/work/teamly-qa/04-guardrails.webp', alt: 'Guardrail activity and knowledge base breakdown' },
      { src: '/work/teamly-qa/05-monitoring.webp', alt: 'Monitoring dashboard: grounding rate, cost and latency' },
      { src: '/work/teamly-qa/06-guest-denied.webp', alt: 'A guest asking the same question is denied restricted content' },
    ],
    tier: 'featured',
    caseStudy: true,
  },
  {
    slug: 'cadquest',
    name: 'CADQuest',
    tagline: 'Browser-based AutoCAD training where learners practise drafting and 3D modelling inside the lessons.',
    category: 'Learning platform',
    year: '2025',
    role: 'Design and development',
    problem:
      'Learning AutoCAD usually means switching between lessons and desktop software. CADQuest keeps the practice inside the lesson.',
    features: [
      'Structured courses for 2D drafting and 3D modelling',
      'In-browser 2D editor with line, rectangle, circle and text tools, snapping, grid, undo and export',
      'Three.js 3D sandbox for placing and transforming shapes',
      '3D factory navigation simulation',
      'Gamified progress with XP, levels and challenges',
    ],
    stack: ['Next.js', 'React', 'Three.js', 'JavaScript'],
    live: 'https://cadquest.vercel.app',
    color: '#f0c419',
    images: [
      { src: '/work/cadquest/01-home.webp', alt: 'CADQuest home: gamified AutoCAD learning', stripOnly: true },
      { src: '/work/cadquest/00-home-2x.webp', alt: 'CADQuest home: gamified AutoCAD learning' },
      { src: '/work/cadquest/02-2d-editor.webp', alt: 'In-browser 2D drafting editor with snap and grid' },
      { src: '/work/cadquest/03-3d-sandbox.webp', alt: 'Three.js 3D sandbox' },
      { src: '/work/cadquest/04-factory-sim.webp', alt: '3D factory navigation simulation' },
      { src: '/work/cadquest/05-interface-explorer.webp', alt: 'AutoCAD interface explorer challenge' },
    ],
    tier: 'selected',
    caseStudy: true,
  },
  {
    slug: 'edugamify',
    name: 'EduGamify',
    tagline: 'Gamified e-learning platform with an admin CMS that keeps students progressing.',
    category: 'E-learning platform',
    year: '2025',
    period: 'Feb 2025 — May 2025',
    role: 'Full-stack development',
    problem:
      'Keeping learners moving through a course is the hard part. EduGamify uses points, streaks and leaderboards to keep students progressing.',
    features: [
      'XP, levels, daily streaks with multipliers and badges',
      'Global, friends and course leaderboards',
      'Sequential module unlocking with quiz, game and challenge activities',
      'Progress-tracked learning path',
      'Admin dashboard with analytics and published, draft and review states',
    ],
    stack: ['Next.js', 'React', 'PostgreSQL', 'Liveblocks', 'REST APIs'],
    live: 'https://edgamify.vercel.app',
    color: '#3140c8',
    images: [
      { src: '/work/edugamify/01-home.webp', alt: 'EduGamify home: learn, compete, excel together', stripOnly: true },
      { src: '/work/edugamify/00-home-2x.webp', alt: 'EduGamify home: learn, compete, excel together' },
      { src: '/work/edugamify/02-points-levels.webp', alt: 'Points and level progression' },
      { src: '/work/edugamify/03-leaderboard.webp', alt: 'Leaderboard with streaks and badges' },
      { src: '/work/edugamify/04-learning-path.webp', alt: 'Progress-tracked learning path' },
      { src: '/work/edugamify/05-modules.webp', alt: 'Modules with quiz, game and challenge activities' },
      { src: '/work/edugamify/06-admin-analytics.webp', alt: 'Admin analytics dashboard' },
    ],
    tier: 'selected',
    caseStudy: true,
  },
  {
    slug: 'pesthub',
    name: 'PestHub',
    tagline: 'E-commerce storefront and inventory system for pesticide and crop-protection businesses.',
    category: 'Commerce and inventory',
    year: '2025',
    period: 'Jan 2024 — Apr 2025',
    company: 'Final-year project, COMSATS University Islamabad',
    role: 'Full-stack development',
    problem:
      'Crop-protection retailers manage stock, stores and customer orders at the same time. PestHub puts the storefront and the back office in one system.',
    features: [
      'Customer storefront for browsing and ordering products',
      'Real-time stock tracking',
      'Admin dashboard with sales, customers and suppliers',
      'Multi-store management with store access requests',
      'Role-based access for administrators and store owners, with Clerk authentication',
    ],
    stack: ['React 19', 'Tailwind CSS 4', 'Chart.js', 'Express', 'Node.js', 'MongoDB', 'Clerk'],
    live: 'https://fyp40.vercel.app',
    color: '#1f6f3f',
    images: [
      { src: '/work/pesthub/01-landing.webp', alt: 'Pesticide inventory management system landing page', stripOnly: true },
      { src: '/work/pesthub/00-landing-2x.webp', alt: 'Pesticide inventory management system landing page' },
      { src: '/work/pesthub/02-dashboard.webp', alt: 'Admin dashboard with inventory and sales metrics' },
      { src: '/work/pesthub/03-store-management.webp', alt: 'Store management across the organisation' },
      { src: '/work/pesthub/04-roles.webp', alt: 'Administrator and store owner roles' },
      { src: '/work/pesthub/05-storefront.webp', alt: 'AgriStore customer storefront' },
      { src: '/work/pesthub/06-products.webp', alt: 'Product catalogue' },
    ],
    tier: 'selected',
    caseStudy: true,
  },
  {
    slug: 'storyverse',
    name: 'StoryVerse',
    tagline: 'Interactive fiction platform where writers build branching stories and readers choose how they unfold.',
    category: 'Creative platform',
    year: '2025',
    role: 'Front-end development',
    problem: 'Writers needed a simple way to build stories where every reader choice leads somewhere different.',
    features: [
      '4-step story creation wizard with a rich text editor',
      'Branching paths editor linking each reader choice to the next scene',
      'Explore and Community pages with genre-tagged story cards',
    ],
    stack: ['React', 'Vite', 'JavaScript'],
    live: 'https://maazstory.vercel.app',
    color: '#5a2a82',
    images: [
      { src: '/work/storyverse/01-home.webp', alt: 'StoryVerse home: create interactive stories', stripOnly: true },
      { src: '/work/storyverse/00-home-2x.webp', alt: 'StoryVerse home: create interactive stories' },
      { src: '/work/storyverse/02-branching-editor.webp', alt: 'Branching paths editor' },
      { src: '/work/storyverse/03-create-story.webp', alt: 'Story creation wizard' },
      { src: '/work/storyverse/04-explore.webp', alt: 'Explore stories by genre' },
    ],
    tier: 'index',
    caseStudy: true,
  },
  {
    slug: 'blogapp',
    name: 'BlogApp',
    tagline: 'Blogging platform for writing, publishing and browsing articles by category.',
    category: 'Publishing',
    year: '2025',
    role: 'Front-end development',
    problem: 'A clean place to write, publish and discover articles by category.',
    features: [
      'Client-side routing across the home feed, article pages, category explore and a write-post editor',
      'Category browsing with article counts',
      'Featured story cards on the home page',
    ],
    stack: ['React', 'Vite', 'JavaScript'],
    live: 'https://maazblog.vercel.app',
    color: '#1b2a5e',
    images: [
      { src: '/work/blogapp/01-home.webp', alt: 'BlogApp home with featured stories', stripOnly: true },
      { src: '/work/blogapp/00-home-2x.webp', alt: 'BlogApp home with featured stories' },
      { src: '/work/blogapp/02-article.webp', alt: 'Article page' },
      { src: '/work/blogapp/03-explore.webp', alt: 'Explore by category' },
      { src: '/work/blogapp/04-write-post.webp', alt: 'Write-post editor' },
    ],
    tier: 'index',
    caseStudy: true,
  },
  {
    slug: 'clearview-staffing',
    name: 'ClearView Staffing',
    tagline: 'Website for a US remote staffing agency.',
    category: 'Client website · US',
    year: '2025',
    role: 'Design and development',
    problem: 'A US remote staffing agency needed a fast, credible site for its services.',
    features: ['Service pages and intake flow'],
    stack: ['Next.js'],
    live: 'https://clearviewstaffinggrp.com',
    color: '#1f5fd6',
    images: [{ src: '/work/clearview-staffing/01-home.webp', alt: 'ClearView Staffing home page' }],
    tier: 'index',
    caseStudy: false,
  },
  {
    slug: 'halo-buzz',
    name: 'Halo Buzz',
    tagline: 'Site for a Los Angeles web agency, with a contact form that sends leads through the Resend email API.',
    category: 'Client website · US',
    year: '2025',
    role: 'Design and development',
    problem: 'A Los Angeles web agency needed a site that captures leads.',
    features: ['Lead capture through the Resend email API'],
    stack: ['React', 'Vite', 'Resend'],
    live: 'https://halobuzz.com',
    color: '#06202f',
    images: [{ src: '/work/halo-buzz/01-home.webp', alt: 'Halo Buzz home page' }],
    tier: 'index',
    caseStudy: false,
  },
  {
    slug: 'accountistry',
    name: 'Accountistry LLP',
    tagline: 'Website for a California CPA firm.',
    category: 'Client website · US',
    year: '2025',
    role: 'Design and development',
    problem: 'A California CPA firm needed a clear site for its services.',
    features: ['Service and industry pages'],
    stack: ['React'],
    live: 'https://accountistryllp.com',
    color: '#34403a',
    images: [{ src: '/work/accountistry/01-home.webp', alt: 'Accountistry LLP home page' }],
    tier: 'index',
    caseStudy: false,
  },
  {
    slug: 'swingrope',
    name: 'SwingRope',
    tagline: 'Multilingual site for a German wind-energy startup, with a blog and a canvas animation.',
    category: 'Client website · Germany',
    year: '2025',
    role: 'Design and development',
    problem: 'A German wind-energy startup needed a multilingual site to explain its technology.',
    features: ['Multilingual content', 'Blog', 'Canvas animation'],
    stack: ['Next.js'],
    live: 'https://swingrope.vercel.app',
    color: '#1f7060',
    images: [{ src: '/work/swingrope/01-home.webp', alt: 'SwingRope home page' }],
    tier: 'index',
    caseStudy: false,
  },
  {
    slug: 'ms-dental',
    name: 'MS Dental',
    tagline: 'Website redesign for a family dental practice.',
    category: 'Website redesign',
    year: '2026',
    role: 'Design and development',
    problem: 'A redesign of a dental practice website.',
    features: [],
    stack: ['React', 'Vite'],
    live: 'https://ms-detnal-revamp.vercel.app',
    color: '#0a5a8f',
    images: [{ src: '/work/ms-dental/01-home.webp', alt: 'MS Dental home page' }],
    tier: 'index',
    caseStudy: false,
  },
  {
    slug: 'outsphere',
    name: 'OutSphere',
    tagline: 'Website for a business growth agency.',
    category: 'Agency website',
    year: '2025',
    role: 'Design and development',
    problem: 'A growth agency site.',
    features: [],
    stack: ['React', 'Vite'],
    live: 'https://outsphere.vercel.app',
    color: '#3a64a6',
    images: [{ src: '/work/outsphere/01-home.webp', alt: 'OutSphere home page' }],
    tier: 'index',
    caseStudy: false,
  },
  {
    slug: 'specialtouch',
    name: 'SpecialTouch',
    tagline: 'Website for a home-care provider.',
    category: 'Client website · US',
    year: '2025',
    role: 'Design and development',
    problem: 'A home-care provider site.',
    features: [],
    stack: ['Next.js'],
    live: 'https://specialtouch.vercel.app',
    color: '#334a96',
    images: [{ src: '/work/specialtouch/01-home.webp', alt: 'SpecialTouch home page' }],
    tier: 'index',
    caseStudy: false,
  },
]

export const experience: Role[] = [
  {
    company: 'GoCloud Pvt Ltd.',
    title: 'Full-stack developer',
    type: 'Full-time',
    start: 'Jul 2025',
    end: 'Present',
    location: 'On-site',
    bullets: [
      'Own the staff roster, stock reconciliation, SMS automation and treatment modules of Aesthetics Consultants, a multi-tenant platform running clinics across Australia.',
      'Build across a React front end and a NestJS and MySQL back end, with role-based access across multiple clinics.',
    ],
  },
  {
    company: 'FlyRank AI',
    title: 'Generative AI engineer',
    type: 'Internship',
    start: 'Jul 2026',
    end: 'Present',
    location: 'Remote',
    bullets: ['Generative AI engineering internship at FlyRank, an AI platform for organic growth.'],
  },
  {
    company: 'Self-employed',
    title: 'Back-end developer',
    start: 'Feb 2025',
    end: 'Aug 2025',
    location: 'Remote',
    bullets: [
      'Built server-side applications with REST APIs and WebSockets on Express and NestJS.',
      'Worked across MongoDB and SQL databases, with a focus on real-time communication systems.',
      'Designed, built and deployed client websites for businesses in the US and Germany.',
    ],
  },
  {
    company: 'Lucent and Zeta',
    title: 'AI application engineer',
    type: 'Freelance',
    start: '2024',
    end: 'Mar 2025',
    location: 'Remote',
    bullets: [
      'Built AI-driven features with large language models, chatbots and vector databases.',
      'Worked on fine-tuning and optimisation for semantic search and recommendation systems.',
    ],
  },
  {
    company: 'Sopher Rentals USA',
    title: 'Web application developer',
    type: 'Part-time',
    start: '2021',
    end: 'Feb 2024',
    location: 'Remote',
    bullets: [
      'Developed full-stack web applications with React and Node.js.',
      'Created cross-platform mobile apps with React Native, including the Symphony music app.',
      'Built and optimised WordPress sites such as TikTak NYC, with booking and payment integration.',
    ],
  },
]

export const education = [
  { school: 'COMSATS University Islamabad', detail: 'Computer Science', start: '2020', end: '2024' },
  { school: 'KIPS College', detail: 'Intermediate, Pre-Engineering', start: '2018', end: '2020' },
]

export const stack: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Three.js', 'React Native'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'REST APIs', 'WebSockets'] },
  { group: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Vector databases'] },
  { group: 'Cloud', items: ['Vercel', 'Docker', 'GitHub CI/CD', 'Clerk', 'Resend', 'Liveblocks'] },
  { group: 'AI', items: ['RAG', 'LLM integration', 'Guardrails and PII redaction', 'Semantic search', 'Claude Code', 'Cursor'] },
]

export const featuredProjects = projects.filter((p) => p.tier === 'featured')
export const selectedProjects = projects.filter((p) => p.tier === 'selected')
export const indexProjects = projects.filter((p) => p.tier === 'index')
export const caseStudies = projects.filter((p) => p.caseStudy)

/** Images in showcase order: rotated to start at `showcaseFrom`, without strip-only images. */
export function showcaseImages(project: Project) {
  const from = project.showcaseFrom ?? 0
  return [...project.images.slice(from), ...project.images.slice(0, from)].filter((image) => !image.stripOnly)
}

/** The live URL, unless the site is currently offline. */
export function liveUrl(project: Project) {
  return project.offline ? undefined : project.live
}

export function getProject(slug: string) {
  return caseStudies.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = caseStudies.findIndex((p) => p.slug === slug)
  return caseStudies[(i + 1) % caseStudies.length]
}
