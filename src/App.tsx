import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Phone, Code, Database, Globe, Layout, Terminal, Cpu, Server, Cloud, Award, BookOpen, Briefcase, Download } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar');
            bars.forEach((bar: Element) => {
              if (bar instanceof HTMLElement) {
                bar.style.width = bar.dataset.width || '0%';
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => setIsScrolling(false), 150);

      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const projects = [
    {
      title: "TikTak NYC",
      description: "A modern rickshaw service platform built with Next.js and Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://tiktak-nyc.com/",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80",
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time updates",
      tech: ["Next.js", "TypeScript", "Prisma"],
      link: "#",
      image: "https://images.unsplash.com/photo-1472437774355-71ab6752b434?auto=format&fit=crop&q=80",
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking application",
      tech: ["React Native", "Firebase", "Redux"],
      link: "#",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80",
      color: "from-green-400 to-emerald-500"
    }
  ];

  const NavLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => (
    <a
      href={href}
      className={`px-4 py-2 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
          : 'hover:bg-white/10'
      }`}
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolling ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gradient">MA.</span>
            <div className="hidden md:flex space-x-2 glass rounded-full p-1">
              <NavLink href="#home" isActive={activeSection === 'home'}>Home</NavLink>
              <NavLink href="#skills" isActive={activeSection === 'skills'}>Skills</NavLink>
              <NavLink href="#projects" isActive={activeSection === 'projects'}>Projects</NavLink>
              <NavLink href="#experience" isActive={activeSection === 'experience'}>Experience</NavLink>
              <NavLink href="#contact" isActive={activeSection === 'contact'}>Contact</NavLink>
            </div>
            <a 
              href="/resume.pdf" 
              className="glass px-4 py-2 rounded-full flex items-center hover:text-cyan-400 transition-colors"
              download
            >
              <Download size={18} className="mr-2" />
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen animate-gradient pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-[#0f172a]"></div>
        <div className="relative container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-7xl font-bold mb-6">
                <span className="text-gradient">Maaz Ali</span>
              </h1>
              <h2 className="text-3xl text-cyan-300 mb-8 font-light">Full Stack Web & Mobile App Developer</h2>
            </div>
            
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
                Passionate developer crafting exceptional digital experiences through modern web and mobile technologies. 
                Specialized in building scalable applications with React, Node.js, and React Native.
              </p>
            </div>

            <div className="flex space-x-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <a href="#contact" className="btn-primary">
                <Mail className="mr-2" size={20} />
                Contact Me
              </a>
              <a href="#projects" className="btn-secondary">
                <Layout className="mr-2" size={20} />
                View Projects
              </a>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
              <div className="stat-card">
                <Award className="text-cyan-400 mb-2" size={24} />
                <span className="text-2xl font-bold">3+</span>
                <span className="text-gray-400">Years Experience</span>
              </div>
              <div className="stat-card">
                <Terminal className="text-emerald-400 mb-2" size={24} />
                <span className="text-2xl font-bold">50+</span>
                <span className="text-gray-400">Projects</span>
              </div>
              <div className="stat-card">
                <Server className="text-purple-400 mb-2" size={24} />
                <span className="text-2xl font-bold">20+</span>
                <span className="text-gray-400">APIs Built</span>
              </div>
              <div className="stat-card">
                <Cloud className="text-blue-400 mb-2" size={24} />
                <span className="text-2xl font-bold">99%</span>
                <span className="text-gray-400">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20" ref={skillsRef}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">Technical Expertise</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="card p-8 rounded-2xl animate-scale-in opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-6">
                  <Code className="text-cyan-400 mr-3" size={24} />
                  <h3 className="text-2xl font-bold">Frontend Development</h3>
                </div>
                <div className="space-y-6">
                  <div className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">React.js / Next.js</span>
                      <span className="text-cyan-400">95%</span>
                    </div>
                    <div className="bg-gray-800/50 rounded-full">
                      <div className="skill-bar w-0" data-width="95%"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">TypeScript</span>
                      <span className="text-cyan-400">90%</span>
                    </div>
                    <div className="bg-gray-800/50 rounded-full">
                      <div className="skill-bar w-0" data-width="90%"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">React Native</span>
                      <span className="text-cyan-400">85%</span>
                    </div>
                    <div className="bg-gray-800/50 rounded-full">
                      <div className="skill-bar w-0" data-width="85%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8 rounded-2xl animate-scale-in opacity-0" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center mb-6">
                  <Database className="text-emerald-400 mr-3" size={24} />
                  <h3 className="text-2xl font-bold">Backend Development</h3>
                </div>
                <div className="space-y-6">
                  <div className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Node.js / Express</span>
                      <span className="text-emerald-400">90%</span>
                    </div>
                    <div className="bg-gray-800/50 rounded-full">
                      <div className="skill-bar w-0" data-width="90%"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">MongoDB</span>
                      <span className="text-emerald-400">85%</span>
                    </div>
                    <div className="bg-gray-800/50 rounded-full">
                      <div className="skill-bar w-0" data-width="85%"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">GraphQL</span>
                      <span className="text-emerald-400">80%</span>
                    </div>
                    <div className="bg-gray-800/50 rounded-full">
                      <div className="skill-bar w-0" data-width="80%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20" ref={projectsRef}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">Featured Projects</h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="project-card group"
                  style={{ animationDelay: `${0.2 * (index + 1)}s` }}
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`}></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Project <Globe size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">Experience & Education</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="card p-8 rounded-2xl animate-slide-in opacity-0" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center mb-6">
                    <Briefcase className="text-cyan-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold">Experience</h3>
                  </div>
                  <div className="relative pl-6 border-l border-gray-800">
                    <div className="mb-8 relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-cyan-400"></div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold">Full Stack Developer</h4>
                        <span className="text-cyan-400">2021 - Present</span>
                      </div>
                      <p className="text-gray-400 mb-3">Freelance</p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          Built scalable web applications with React.js and Node.js
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          Developed cross-platform mobile apps using React Native
                        </li>
                        <li className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          Implemented real-time features using WebSocket
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="card p-8 rounded-2xl animate-slide-in opacity-0" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center mb-6">
                    <BookOpen className="text-emerald-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold">Education</h3>
                  </div>
                  <div className="relative pl-6 border-l border-gray-800">
                    <div className="mb-8 relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-400"></div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold">BS Computer Science</h4>
                        <span className="text-emerald-400">2021 - 2025</span>
                      </div>
                      <p className="text-gray-400">COMSATS University Islamabad</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-emerald-400"></div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold">Pre-Engineering</h4>
                        <span className="text-emerald-400"> Grade</span>
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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gradient mb-16 text-center">Get in Touch</h2>
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 rounded-2xl animate-scale-in opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="grid md:grid-cols-2 gap-8">
                <a href="mailto:maazaltaf1027@gmail.com" className="contact-link">
                  <Mail className="text-cyan-400" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <span className="text-gray-400">maazaltaf1027@gmail.com</span>
                  </div>
                </a>
                <a href="tel:+923223374424" className="contact-link">
                  <Phone className="text-emerald-400" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Phone</h4>
                    <span className="text-gray-400">+92 322 3374424</span>
                  </div>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github className="text-purple-400" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">GitHub</h4>
                    <span className="text-gray-400">View Projects</span>
                  </div>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin className="text-blue-400" size={24} />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">LinkedIn</h4>
                    <span className="text-gray-400">Connect with me</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;