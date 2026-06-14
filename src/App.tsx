import React, { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import {
  Code2,
  Server,
  Sparkles,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Github,
  Linkedin,
  ArrowUp,
} from 'lucide-react';
import Navigation from './components/Navigation';

// Lazy-loaded sections / cards
const ProjectCard = lazy(() => import('./components/ProjectCard'));
const AgristoreCard = lazy(() => import('./components/AgristoreCard'));
const EdgamifyCard = lazy(() => import('./components/EdgamifyCard'));
const CaseStudyCard = lazy(() => import('./components/CaseStudyCard'));
const HeroSection = lazy(() => import('./components/HeroSection') as any);
const TerminalIntro = lazy(() => import('./components/TerminalIntro'));

// Project images
import clearviewImage from './assets/clearview.png';
import specialtouchImage from './assets/specialtouch.png';
import tiktakImage from './assets/tiktak.png';

// Case-study image sets (auto-imported, ordered best-first by filename)
const noavantImages = Object.values(
  import.meta.glob('./assets/Noavant/*.png', { eager: true, import: 'default' })
) as string[];
const aestheticsImages = Object.values(
  import.meta.glob('./assets/Aesthetics/*.png', { eager: true, import: 'default' })
) as string[];

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="loader" />
  </div>
);

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  githubLink?: string;
  image: string;
}

// Reusable section heading
const SectionHeading = ({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="reveal mb-12 md:mb-16">
    <span className="eyebrow">
      {index} — {eyebrow}
    </span>
    <h2 className="section-title text-3xl md:text-[2.6rem] mt-4">{title}</h2>
    {subtitle && <p className="mt-4 text-ink-muted max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

const skillGroups = [
  {
    icon: Code2,
    title: 'Frontend',
    items: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Context', 'Responsive UI', 'Component systems'],
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js & Express', 'MongoDB / Mongoose', 'REST API design', 'Auth (JWT / Clerk)', 'GraphQL', 'MERN architecture'],
  },
  {
    icon: Sparkles,
    title: 'AI & Workflow',
    items: ['Claude Code', 'Cursor', 'AI API integration', 'Git & GitHub', 'CI/CD pipelines', 'Vercel / Docker'],
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const scrollFrame = useRef<number | null>(null);

  // First-visit terminal intro
  useEffect(() => {
    if (!localStorage.getItem('has_visited')) {
      setShowTerminal(true);
      localStorage.setItem('has_visited', 'true');
    }
  }, []);

  const handleTerminalComplete = useCallback(() => setShowTerminal(false), []);

  // Scroll spy + nav background
  const handleScroll = useCallback(() => {
    if (scrollFrame.current) return;
    scrollFrame.current = window.requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 24);

      const probe = window.scrollY + window.innerHeight / 3;
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
          setActiveSection((prev) => (prev !== id ? id : prev));
          break;
        }
      }
      scrollFrame.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    };
  }, [handleScroll]);

  // Scroll-reveal for any element with the .reveal class
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const projects: Project[] = React.useMemo(
    () => [
      {
        title: 'ClearView Staffing',
        description:
          'Global remote-staffing platform. I built the marketing site and service flows in Next.js with Server Components for fast, SEO-friendly pages.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'SSR'],
        link: 'https://clearviewstaffinggrp.com',
        image: clearviewImage,
      },
      {
        title: 'SpecialTouch HomeCare',
        description:
          'Conversion-focused site for a home-care provider — clear service pages and a streamlined inquiry flow, built with Next.js.',
        tech: ['Next.js', 'React', 'CSS Modules', 'SSR'],
        link: 'https://specialtouch.vercel.app',
        image: specialtouchImage,
      },
      {
        title: 'TikTak NYC',
        description:
          'Rickshaw moving-service platform with a booking-oriented UX and a clean, mobile-first interface, built in React.',
        tech: ['React', 'JavaScript', 'CSS'],
        link: 'https://tiktak-nyc.com/',
        image: tiktakImage,
      },
    ],
    []
  );

  const aestheticsProject = {
    title: 'Aesthetics Consultants',
    tagline: 'All-in-One Clinic Management Platform',
    role: 'Senior Backend (Full-Stack) Developer',
    status: 'Live · Australia',
    link: 'https://aestheticsconsults.com.au',
    description: [
      "A complete, all-in-one management system for aesthetic and cosmetic clinics across Australia — built to run an entire practice from one place. I've led this platform with my team for almost a year.",
      "It handles everything a clinic needs day to day: scheduling and online booking, patient profiles with full clinical records and treatment plans, digital consent forms and prescriptions, inventory, staff rostering, sales and revenue reporting, gift cards, loyalty and promotions, plus built-in email/SMS marketing and CRM — all across multiple clinics with role-based access. Easily the most comprehensive product I've worked on, actively running real clinics every day.",
    ],
    tech: ['React', 'Node.js', 'Multi-tenant', 'Scheduling', 'CRM & marketing', 'Role-based access'],
    urlLabel: 'aestheticsconsults.com.au',
  };

  const noavantProject = {
    title: 'Noavant',
    tagline: 'Invite-Only Fashion Social Network',
    role: 'Full-Stack Web Developer · GoCloud',
    status: 'Live · UK',
    link: 'https://noavant.com',
    description: [
      'Noavant is an invite-only social network for the fashion world — a space where designers, stylists, and photographers build portfolios, create drag-and-drop moodboards, start public or private communities, message in real time, and sell their work.',
      'I was the full-stack developer at GoCloud, building it into a fast, polished platform with the premium feel a fashion product needs. It launched to a great reception in the UK fashion scene, with creatives quickly joining and forming active communities — one of my favourite projects to date.',
    ],
    tech: ['React', 'Node.js', 'Real-time chat', 'Drag & drop', 'E-commerce', 'Communities'],
    urlLabel: 'noavant.com',
  };

  const edgamifyProject = {
    title: 'Edgamify',
    description:
      'An e-learning platform that turns courses into a game: points, daily streaks, badges, leaderboards, and skill certifications — designed to keep learners engaged and finishing what they start.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Gamification', 'Dashboard'],
    link: 'https://edgamify.vercel.app',
  };

  const agristoreProject = {
    title: 'AgriStore',
    description:
      'A full-stack MERN inventory system for agriculture retailers — track stock, manage orders, and read analytics, secured with role-based authentication via Clerk.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Clerk Auth'],
    link: 'https://fyp40.vercel.app',
  };

  const MemoizedProjectCard = useCallback(
    ({ index }: { index: number }) => (
      <ProjectCard
        title={projects[index].title}
        description={projects[index].description}
        tech={projects[index].tech}
        link={projects[index].link}
        githubLink={projects[index].githubLink}
        image={projects[index].image}
        index={index}
      />
    ),
    [projects]
  );

  return (
    <div className="min-h-screen text-ink overflow-x-hidden">
      <Navigation activeSection={activeSection} isScrolling={isScrolled} />

      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
      </Suspense>

      {/* ABOUT */}
      <section id="about" className="py-24 relative">
        <div className="max-w-content mx-auto px-6">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16">
            <div className="reveal">
              <span className="eyebrow">01 — About</span>
              <h2 className="section-title text-3xl md:text-[2.6rem] mt-4 leading-tight">
                Engineer first.
                <br />
                <span className="text-accent">AI-native</span> by default.
              </h2>
            </div>
            <div className="reveal space-y-5 text-ink-muted text-base md:text-lg leading-relaxed">
              <p>
                I&apos;m a full-stack developer who likes shipping real products, not demos. Over
                the last <span className="text-ink font-medium">3+ years</span> — building for
                freelance clients while completing my BS in Computer Science — I&apos;ve shipped
                15+ live products (35+ projects in total) across staffing, home care, logistics,
                and ag-tech.
              </p>
              <p>
                My edge is speed without sloppiness: I pair solid React / Node / MERN fundamentals
                with AI tools like <span className="text-ink font-medium">Claude Code</span> and{' '}
                <span className="text-ink font-medium">Cursor</span> to design, build, and iterate
                faster. Whether you&apos;re a team hiring or a client with a product to launch, I can
                own it end to end.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Web apps', 'SaaS dashboards', 'REST APIs', 'AI integration', 'Full-stack delivery'].map(
                  (chip) => (
                    <span key={chip} className="tag">
                      {chip}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 relative">
        <div className="ambient-glow w-[24rem] h-[24rem] top-20 right-0 opacity-[0.06]" />
        <div className="max-w-content mx-auto px-6 relative">
          <SectionHeading
            index="02"
            eyebrow="Skills"
            title="Tools I build with"
            subtitle="A focused stack I use to ship end to end — from interface to API to deployment."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillGroups.map(({ icon: Icon, title, items }) => (
              <div key={title} className="reveal card card-hover p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20">
                    <Icon className="text-accent" size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-ink-muted">
                      <span className="text-accent font-mono text-xs">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 relative">
        <div className="max-w-content mx-auto px-6">
          <SectionHeading index="03" eyebrow="Experience" title="Where I've been" />
          <div className="grid md:grid-cols-2 gap-6">
            {/* Work */}
            <div className="reveal card p-8">
              <div className="flex items-center gap-3 mb-7">
                <Briefcase className="text-accent" size={22} />
                <h3 className="font-display text-xl font-bold text-ink">Work</h3>
              </div>
              <div className="relative pl-6 timeline-line">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-accent" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h4 className="text-lg font-semibold text-ink">Full-Stack Developer</h4>
                    <span className="font-mono text-xs text-accent">2022 — Present</span>
                  </div>
                  <p className="text-ink-faint text-sm mt-0.5 mb-4">Freelance · Remote · alongside university</p>
                  <ul className="space-y-2.5 text-ink-muted text-[0.95rem]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-accent mt-1.5 text-[8px]">●</span>
                      Shipped 15+ live products (35+ projects total) for clients in staffing, home care, logistics, and ag-tech.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-accent mt-1.5 text-[8px]">●</span>
                      Built full-stack MERN systems: authentication, dashboards, inventory, and real-time features.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-accent mt-1.5 text-[8px]">●</span>
                      Accelerated delivery by integrating AI tooling (Claude Code, Cursor) into my workflow.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="reveal card p-8">
              <div className="flex items-center gap-3 mb-7">
                <GraduationCap className="text-accent" size={22} />
                <h3 className="font-display text-xl font-bold text-ink">Education</h3>
              </div>
              <div className="relative pl-6 timeline-line">
                <div className="relative mb-7">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-accent" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h4 className="text-lg font-semibold text-ink">BS Computer Science</h4>
                    <span className="font-mono text-xs text-accent">2021 — 2025</span>
                  </div>
                  <p className="text-ink-faint text-sm mt-0.5">COMSATS University Islamabad</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-accent" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h4 className="text-lg font-semibold text-ink">Pre-Engineering</h4>
                    <span className="font-mono text-xs text-accent">2021</span>
                  </div>
                  <p className="text-ink-faint text-sm mt-0.5">KIPS College, Multan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 relative">
        <div className="max-w-content mx-auto px-6">
          <SectionHeading
            index="04"
            eyebrow="Selected work"
            title="Things I've shipped"
            subtitle="Real products I've shipped for companies and clients — from clinic platforms to fashion networks to live web apps."
          />

          {/* Featured */}
          <div className="space-y-8 mb-8">
            <div className="reveal">
              <Suspense fallback={<div className="h-[440px] card animate-pulse" />}>
                <CaseStudyCard {...noavantProject} images={noavantImages} />
              </Suspense>
            </div>
            <div className="reveal">
              <Suspense fallback={<div className="h-[440px] card animate-pulse" />}>
                <CaseStudyCard {...aestheticsProject} images={aestheticsImages} reverse />
              </Suspense>
            </div>
            <div className="reveal">
              <Suspense fallback={<div className="h-[400px] card animate-pulse" />}>
                <EdgamifyCard {...edgamifyProject} />
              </Suspense>
            </div>
            <div className="reveal">
              <Suspense fallback={<div className="h-[400px] card animate-pulse" />}>
                <AgristoreCard {...agristoreProject} />
              </Suspense>
            </div>
          </div>

          {/* Other projects */}
          <h3 className="reveal font-mono text-sm uppercase tracking-widest text-ink-faint mb-6">
            More projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((_, index) => (
              <div key={index} className="reveal h-full">
                <Suspense fallback={<div className="h-[340px] card animate-pulse" />}>
                  <MemoizedProjectCard index={index} />
                </Suspense>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 relative">
        <div className="ambient-glow w-[30rem] h-[30rem] bottom-0 left-1/2 -translate-x-1/2 opacity-[0.08]" />
        <div className="max-w-content mx-auto px-6 relative">
          <div className="reveal max-w-2xl">
            <span className="eyebrow">05 — Contact</span>
            <h2 className="section-title text-3xl md:text-[2.6rem] mt-4">
              Let&apos;s build something.
            </h2>
            <p className="mt-4 text-ink-muted text-lg leading-relaxed">
              I&apos;m open to full-time roles and freelance projects. Got a product to ship or a
              team to join? My inbox is always open.
            </p>
            <a href="mailto:dev.maazali@gmail.com" className="btn btn-primary mt-7">
              <Mail size={17} />
              Say hello
            </a>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 max-w-3xl">
            <a href="mailto:dev.maazali@gmail.com" className="contact-link group">
              <div className="p-2.5 rounded-lg bg-bg-subtle border border-line">
                <Mail className="text-accent" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">Email</div>
                <div className="text-sm text-ink-faint truncate">dev.maazali@gmail.com</div>
              </div>
            </a>
            <a href="tel:+923223374424" className="contact-link group">
              <div className="p-2.5 rounded-lg bg-bg-subtle border border-line">
                <Phone className="text-accent" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">Phone</div>
                <div className="text-sm text-ink-faint">+92 322 3374424</div>
              </div>
            </a>
            <a href="https://github.com/maazalirao" target="_blank" rel="noopener noreferrer" className="contact-link group">
              <div className="p-2.5 rounded-lg bg-bg-subtle border border-line">
                <Github className="text-accent" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">GitHub</div>
                <div className="text-sm text-ink-faint">@maazalirao</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/maaz-ali-b72542221" target="_blank" rel="noopener noreferrer" className="contact-link group">
              <div className="p-2.5 rounded-lg bg-bg-subtle border border-line">
                <Linkedin className="text-accent" size={20} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">LinkedIn</div>
                <div className="text-sm text-ink-faint">Connect with me</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line py-10">
        <div className="max-w-content mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-faint">
            © {new Date().getFullYear()} Maaz Ali Rao · Built with React, TypeScript &amp; Tailwind
          </p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/maazalirao" target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-accent transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/maaz-ali-b72542221" target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-accent transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#home" className="inline-flex items-center gap-1.5 text-sm text-ink-faint hover:text-accent transition-colors">
              Top <ArrowUp size={15} />
            </a>
          </div>
        </div>
      </footer>

      {showTerminal && (
        <Suspense fallback={null}>
          <TerminalIntro onComplete={handleTerminalComplete} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
