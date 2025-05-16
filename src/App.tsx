import React, { useEffect, useRef, useState, useCallback, memo, lazy, Suspense } from 'react';
import { Code, Database, Award, Terminal, Server, Cloud, BookOpen, Briefcase } from 'lucide-react';
import Navigation from './components/Navigation';
// Lazy load components
const ProjectCard = lazy(() => import('./components/ProjectCard'));
const AgristoreCard = lazy(() => import('./components/AgristoreCard'));
// Cast the import to any to avoid type checking issues with memoized components
const HeroSection = lazy(() => import('./components/HeroSection') as any);
const TerminalIntro = lazy(() => import('./components/TerminalIntro'));

// Import project images
import clearviewImage from './assets/clearview.png';
import specialtouchImage from './assets/specialtouch.png';
import tiktakImage from './assets/tiktak.png';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    scrollTimeout: number;
  }
}

// Loading fallback with reduced complexity
const LoadingFallback = () => <div className="min-h-[200px] flex items-center justify-center"><div className="loader"></div></div>;

// Define the project interface
interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  githubLink?: string;
  image: string;
  color: string;
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true); // Show terminal on startup
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const scrollThrottleTimeout = useRef<number | null>(null);

  // Detect mobile devices with optimized logic
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check if user has visited before - optimize terminal display
      const hasVisited = localStorage.getItem('has_visited');
      if (!hasVisited) {
        // First time visitor - show terminal
        setShowTerminal(true);
        localStorage.setItem('has_visited', 'true');
      } else {
        // Skip terminal for returning visitors to improve performance
        setShowTerminal(false);
      }
    };

    checkMobile();
    
    // Use resize observer instead of resize event for better performance
    const resizeObserver = new ResizeObserver(checkMobile);
    resizeObserver.observe(document.body);
    
    return () => resizeObserver.disconnect();
  }, []);

  // Hide terminal intro animation
  const handleTerminalComplete = useCallback(() => {
    setShowTerminal(false);
  }, []);

  // Optimized scroll handler with improved throttling
  const handleScroll = useCallback(() => {
    // Skip processing if already throttled
    if (scrollThrottleTimeout.current) return;
    
    scrollThrottleTimeout.current = window.requestAnimationFrame(() => {
      const now = Date.now();
      
      // More aggressive throttling (250ms) for better performance
      if (now - lastScrollTime.current > 250) {
        lastScrollTime.current = now;
        
        // Set scroll state
        setIsScrolling(true);
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => setIsScrolling(false), 200);

        // Only calculate active section if needed
        if (isMobile) return; // Skip on mobile for better performance
        
        // Use simpler section detection for better performance
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        const sections = ['home', 'experience', 'projects', 'contact'];
        let currentSection = activeSection;
        
        // Find current section using scroll position instead of getBoundingClientRect
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const sectionTop = element.offsetTop;
            const sectionBottom = sectionTop + element.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
              currentSection = section;
              break;
            }
          }
        }
        
        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      }
      
      scrollThrottleTimeout.current = null;
    });
  }, [activeSection, isMobile]);

  useEffect(() => {
    // Add passive option to scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollThrottleTimeout.current) {
        clearTimeout(scrollThrottleTimeout.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    // Light mode is now the alternate mode that needs to be toggled on
    document.documentElement.classList.toggle('light', isLightMode);
  }, [isLightMode]);

  useEffect(() => {
    // Observer for the experience and education section
    const experienceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find cards within the experience section
            const cards = entry.target.querySelectorAll('.card');
            
            // Animate each card with a slight delay - using requestAnimationFrame for smoother performance
            cards.forEach((card, index) => {
              window.requestAnimationFrame(() => {
                // Add the animate class to the card itself
                card.classList.add('animate');
                
                // Animate the bullet points
                const bullets = card.querySelectorAll('.bullet-point');
                bullets.forEach(bullet => bullet.classList.add('animate'));
                
                // Animate the timeline
                const timeline = card.querySelector('.timeline-line');
                if (timeline) timeline.classList.add('animate');
                
                // Animate list items with staggered delay
                const listItems = card.querySelectorAll('.list-item');
                listItems.forEach((item, i) => {
                  setTimeout(() => {
                    item.classList.add('animate');
                    // Also animate the span inside list item (bullet point)
                    const span = item.querySelector('span');
                    if (span) span.classList.add('animate');
                  }, i * 100);
                });
              });
            });
            
            // Unobserve once animations have been triggered
            experienceObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px 0px" }
    );

    if (experienceRef.current) {
      experienceObserver.observe(experienceRef.current);
    }

    return () => {
      experienceObserver.disconnect();
    };
  }, []);

  // Memoize projects array to prevent recreation on each render
  const projects = React.useMemo(() => [
    {
      title: "ClearView Staffing",
      description: "Global staffing remote services platform built with Next.js",
      tech: ["Next.js", "React", "Tailwind CSS", "Server Components"],
      link: "https://clearviewstaffinggrp.com",
      githubLink: "https://github.com/maazalirao",
      image: clearviewImage,
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "SpecialTouch HomeCare",
      description: "Home care services platform built with Next.js and modern UI",
      tech: ["Next.js", "React", "CSS Modules", "Server Components"],
      link: "https://specialtouch.vercel.app",
      githubLink: "https://github.com/maazalirao",
      image: specialtouchImage,
      color: "from-indigo-400 to-purple-500" 
    },
    {
      title: "TikTak NYC",
      description: "A modern rickshaw moving service platform built with React.js",
      tech: ["React", "CSS", "JavaScript"],
      link: "https://tiktak-nyc.com/",
      githubLink: "https://github.com/maazalirao",
      image: tiktakImage,
      color: "from-cyan-400 to-blue-500"
    }
  ], []);

  // Agristore project data
  const agristoreProject = {
    title: "AgriStore Inventory Management",
    description: "A comprehensive MERN stack inventory system for agriculture with Clerk authentication",
    tech: ["MongoDB", "Express", "React", "Node.js", "Clerk Auth"],
    link: "https://fyp40.vercel.app"
  };

  // Memoized toggle theme handler
  const toggleTheme = useCallback(() => {
    setIsLightMode(prev => !prev);
  }, []);

  // Create a memoized ProjectCard component
  const MemoizedProjectCard = useCallback(
    ({ index }: { index: number }) => (
      <ProjectCard
        title={projects[index].title}
        description={projects[index].description}
        tech={projects[index].tech}
        link={projects[index].link}
        githubLink={projects[index].githubLink}
        image={projects[index].image}
        color={projects[index].color}
        index={index}
      />
    ),
    [projects]
  );

  return (
    <div className={`min-h-screen text-text overflow-x-hidden ${isLightMode ? 'light' : ''}`}>
      <Navigation activeSection={activeSection} isScrolling={isScrolling} />
      
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 glass p-3 rounded-full z-50 hover:scale-110 transition-transform shadow-glow"
        aria-label="Toggle theme"
      >
        {isLightMode ? (
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
      </Suspense>

      {/* Experience & Education */}
      <section id="experience" className="py-20 relative overflow-hidden" ref={experienceRef}>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">Experience & Education</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="card p-8 rounded-2xl animate-slide-in opacity-0 hover:shadow-glow" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center mb-6">
                    <Briefcase className="text-cyan-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold">Experience</h3>
                  </div>
                  <div className="relative pl-6 border-l border-gray-800 timeline-line">
                    <div className="mb-8 relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-cyan-400 bullet-point"></div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold">Full Stack Developer</h4>
                        <span className="text-cyan-400">2021 - Present</span>
                      </div>
                      <p className="text-gray-400 mb-3">Freelance</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start list-item" style={{ transitionDelay: '100ms' }}>
                          <span className="text-cyan-400 mr-2">•</span>
                          Built scalable web applications with React.js and Node.js
                        </li>
                        <li className="flex items-start list-item" style={{ transitionDelay: '200ms' }}>
                          <span className="text-cyan-400 mr-2">•</span>
                          Developed cross-platform mobile apps using React Native
                        </li>
                        <li className="flex items-start list-item" style={{ transitionDelay: '300ms' }}>
                          <span className="text-cyan-400 mr-2">•</span>
                          Implemented real-time features using WebSocket
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="card p-8 rounded-2xl animate-slide-in opacity-0 hover:shadow-glow" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center mb-6">
                    <BookOpen className="text-emerald-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold">Education</h3>
                  </div>
                  <div className="relative pl-6 border-l border-gray-800 timeline-line">
                    <div className="mb-8 relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-400 bullet-point"></div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold">BS Computer Science</h4>
                        <span className="text-emerald-400">2021 - 2025</span>
                      </div>
                      <p className="text-gray-400">COMSATS University Islamabad</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-400 bullet-point"></div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold">Pre-Engineering</h4>
                        <span className="text-emerald-400"></span>
                      </div>
                      <p className="text-gray-400">KIPS College Multan, 2021</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Redesigned for better mobile performance */}
      <section id="projects" className="py-20 relative overflow-hidden" ref={projectsRef}>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">My Projects</h2>
          
          {/* Featured Agristore Project */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="project-feature-wrapper">
              <Suspense fallback={
                <div className="h-[260px] sm:h-[400px] bg-gray-800/50 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }>
                <AgristoreCard 
                  title={agristoreProject.title}
                  description={agristoreProject.description}
                  tech={agristoreProject.tech}
                  link={agristoreProject.link}
                />
              </Suspense>
            </div>
          </div>
          
          {/* Other Projects */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient-alt mb-8">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="project-wrapper"
                >
                  <Suspense fallback={
                    <div className="h-[260px] sm:h-[320px] bg-gray-800/50 rounded-xl flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  }>
                    <MemoizedProjectCard index={index} />
                  </Suspense>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-20 relative overflow-hidden bg-gray-900/50">
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">Technical Expertise</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Frontend Development */}
              <div className="bg-gray-800/70 p-6 rounded-xl hover:shadow-glow transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-cyan-500/20 rounded-full mr-4">
                    <Code className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Frontend Development</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span>
                    React.js / Next.js
                  </li>
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span>
                    TypeScript
                  </li>
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span>
                    Redux / Context API
                  </li>
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span>
                    Responsive Design
                  </li>
                </ul>
              </div>

              {/* Backend Development */}
              <div className="bg-gray-800/70 p-6 rounded-xl hover:shadow-glow transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-emerald-500/20 rounded-full mr-4">
                    <Database className="text-emerald-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Backend Development</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-emerald-400 mr-2">•</span>
                    Node.js / Express
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-400 mr-2">•</span>
                    MongoDB / Mongoose
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-400 mr-2">•</span>
                    REST API Design
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-400 mr-2">•</span>
                    GraphQL
                  </li>
                  <li className="flex items-center">
                    <span className="text-emerald-400 mr-2">•</span>
                    Authentication & Authorization
                  </li>
                </ul>
              </div>

              {/* Other Skills */}
              <div className="bg-gray-800/70 p-6 rounded-xl hover:shadow-glow transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                    <Terminal className="text-purple-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Other Skills</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">•</span>
                    Git / GitHub
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">•</span>
                    CI/CD Pipelines
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">•</span>
                    Docker
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">•</span>
                    Jest / React Testing Library
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-2">•</span>
                    AWS / Vercel Deployment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Improved layout for mobile */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background to-background/0" />
        <div className="container mx-auto px-6 relative">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">Get in Touch</h2>
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 rounded-2xl animate-scale-in opacity-0 hover:shadow-glow-lg" style={{ animationDelay: '0.2s' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <a href="mailto:maazaltaf1027@gmail.com" className="contact-link group">
                  <div className="p-3 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 group-hover:text-cyan-400 transition-colors">Email</h4>
                    <span className="text-gray-400">maazaltaf1027@gmail.com</span>
                  </div>
                </a>
                <a href="tel:+923223374424" className="contact-link group">
                  <div className="p-3 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 group-hover:text-emerald-400 transition-colors">Phone</h4>
                    <span className="text-gray-400">+92 322 3374424</span>
                  </div>
                </a>
                <a href="https://github.com/maazalirao" target="_blank" rel="noopener noreferrer" className="contact-link group">
                  <div className="p-3 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 group-hover:text-purple-400 transition-colors">GitHub</h4>
                    <span className="text-gray-400">View Projects</span>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/maaz-ali-b72542221" target="_blank" rel="noopener noreferrer" className="contact-link group">
                  <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors">LinkedIn</h4>
                    <span className="text-gray-400">Connect with me</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Intro */}
      {showTerminal && (
        <Suspense fallback={<LoadingFallback />}>
          <TerminalIntro onComplete={handleTerminalComplete} />
        </Suspense>
      )}
    </div>
  );
}

export default App;