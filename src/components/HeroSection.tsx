import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Mail, Layout, Award, Terminal, Server, Cloud } from 'lucide-react';
import profilePic from '../../public/images/pf1.jpg'; // Import the profile image

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Optimized mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Use ResizeObserver instead of resize event
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
    });
    
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);
  
  // Set up observer for skills section - only initialize if element is visible
  useEffect(() => {
    if (!isVisible) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsSkillsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => observer.disconnect();
  }, [isVisible]);
  
  // Set up observer for whole component
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    const heroSection = document.getElementById('home');
    if (heroSection) {
      observer.observe(heroSection);
    }
    
    return () => observer.disconnect();
  }, []);

  // Particles animation - now rendered conditionally based on visibility and device
  useEffect(() => {
    // Skip particles on mobile for performance
    if (isMobile || !isVisible || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Further optimization of particles
    const particleCount = 30; // Reduced from 50
    let particles: any[] = []; // Changed from const to let
    
    let animationFrameId: number;
    let lastTime = 0;
    const FPS = 20; // Further reduced FPS to improve performance
    const fpsInterval = 1000 / FPS;
    
    const resizeCanvas = () => {
      if (!canvas) return;
      // Fix canvas sizing to fill its container properly
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };
    
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      speedX: number = 0;
      speedY: number = 0;
      color: string = '#60a5fa';
      
      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5; // Further reduced speed
        this.speedY = Math.random() * 1 - 0.5; // Further reduced speed
        
        const colors = ['#60a5fa', '#34d399', '#a78bfa', '#f472b6'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const initParticles = () => {
      if (!canvas) return;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    const connectParticles = () => {
      if (!ctx) return;
      const maxDistance = 100; // Further reduced connection distance
      
      for (let i = 0; i < particles.length; i++) {
        // Only connect to 3 nearest neighbors
        for (let j = i; j < Math.min(i + 3, particles.length); j++) {
          if (i === j) continue;
          
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(125, 211, 252, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.3; // Thinner lines
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      const elapsed = timestamp - lastTime;
      
      // Only render if enough time has passed
      if (elapsed > fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
        
        connectParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize with a slight delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    }, 200);
    
    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isVisible]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)', 
          backgroundSize: '50px 50px' 
        }}></div>
      </div>

      {/* Content container with max width for better readability */}
      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 z-10">
        {/* Two Column Layout - Stacked on mobile, side by side on desktop */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch lg:space-x-10 space-y-8 sm:space-y-12 lg:space-y-0">
          
          {/* Left Column - Personal Information */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* Status badge */}
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="inline-block mb-3 sm:mb-6">
                <span className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-full text-cyan-300 font-medium flex items-center">
                  <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                </span>
              </div>
            </div>
            
            {/* Name and title */}
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Maaz Ali Rao</span>
                <span className="block text-lg sm:text-2xl md:text-3xl font-light mt-2 sm:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Full Stack Web & Mobile App Developer
                </span>
              </h1>
            </div>
          
            {/* GitHub Profile Card */}
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
              <div className="inline-flex items-center space-x-4 bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/50 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-sm shadow-cyan-500/30">
                  <img 
                    src={profilePic} 
                    alt="Maaz Ali Rao" 
                    className="w-full h-full object-cover object-center filter brightness-90 contrast-110 saturate-90"
                    style={{ 
                      objectPosition: "0 20%",
                      backgroundBlendMode: "overlay",
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)"
                    }}
                    width="48"
                    height="48"
                    fetchPriority="high"
                    loading="eager"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">@maazalirao</span>
                  <a 
                    href="https://github.com/maazalirao" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          
            {/* Description */}
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm sm:text-lg text-gray-300 mb-5 sm:mb-8 leading-relaxed">
                Passionate developer crafting exceptional digital experiences through modern web and mobile technologies. 
                Specialized in building scalable applications with React, Node.js, and React Native.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
              <a href="#contact" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg flex items-center hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-sm sm:text-base">
                <Mail className="mr-2" size={16} />
                Contact Me
              </a>
              <a href="#projects" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-transparent border border-gray-600 text-gray-300 font-medium rounded-lg flex items-center hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm sm:text-base">
                <Layout className="mr-2" size={16} />
                View Projects
              </a>
            </div>

            {/* Stats Grid - Mobile friendly grid with 2 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <div className="stats-card p-2.5 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-cyan-800/50 transition-colors">
                <Award className="text-cyan-400 mb-1 sm:mb-2" size={isMobile ? 16 : 20} />
                <span className="text-lg sm:text-2xl font-bold text-white">3+</span>
                <span className="text-xs sm:text-sm text-gray-400 block">Years Experience</span>
              </div>
              <div className="stats-card p-2.5 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-emerald-800/50 transition-colors">
                <Terminal className="text-emerald-400 mb-1 sm:mb-2" size={isMobile ? 16 : 20} />
                <span className="text-lg sm:text-2xl font-bold text-white">20+</span>
                <span className="text-xs sm:text-sm text-gray-400 block">Projects</span>
              </div>
              <div className="stats-card p-2.5 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-purple-800/50 transition-colors">
                <Server className="text-purple-400 mb-1 sm:mb-2" size={isMobile ? 16 : 20} />
                <span className="text-lg sm:text-2xl font-bold text-white">20+</span>
                <span className="text-xs sm:text-sm text-gray-400 block">APIs Built</span>
              </div>
              <div className="stats-card p-2.5 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-800/50 hover:border-blue-800/50 transition-colors">
                <Cloud className="text-blue-400 mb-1 sm:mb-2" size={isMobile ? 16 : 20} />
                <span className="text-lg sm:text-2xl font-bold text-white">99%</span>
                <span className="text-xs sm:text-sm text-gray-400 block">Client Satisfaction</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visualization - Height reduced on mobile */}
          <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] relative overflow-hidden rounded-2xl border border-gray-800 bg-black/40 backdrop-blur-sm shadow-xl">
            {/* Canvas container - Only shown on non-mobile devices */}
            {!isMobile && (
              <div className="absolute inset-0">
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0"
                  style={{ opacity: 0.7 }}
                />
              </div>
            )}
            
            {/* Simplified background gradient for mobile */}
            {isMobile && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
            )}
            
            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 z-10">
              {/* Experience indicator - Made smaller on mobile */}
              <div className="relative mb-4 sm:mb-12">
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                  <span className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-cyan-200">3+</span>
                  <span className="text-xs sm:text-base text-cyan-300 font-medium">Years</span>
                </div>
                {/* Decorative rings - Simplified on mobile */}
                {!isMobile && (
                  <>
                    <div className="absolute inset-0 -m-2 sm:-m-3 rounded-full border border-cyan-500/20 animate-pulse-slow"></div>
                    <div className="absolute inset-0 -m-4 sm:-m-6 rounded-full border border-cyan-500/10 animate-pulse-slower"></div>
                  </>
                )}
              </div>
              
              {/* Skills section - Condensed on mobile */}
              <div ref={skillsRef} className="w-full max-w-md space-y-2 sm:space-y-5">
                <div className="text-center mb-2 sm:mb-6">
                  <h3 className="text-base sm:text-xl font-medium text-white mb-1">Core Technologies</h3>
                  <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
                </div>
                
                {/* Skill bars */}
                <div className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-base text-gray-300">Frontend Development</span>
                    <span className="text-xs sm:text-base text-cyan-400 font-medium">98%</span>
                  </div>
                  <div className="w-full h-1 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000 ease-out ${isSkillsVisible ? 'w-[98%]' : 'w-0'}`}></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-base text-gray-300">Backend Architecture</span>
                    <span className="text-xs sm:text-base text-emerald-400 font-medium">94%</span>
                  </div>
                  <div className="w-full h-1 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out delay-100 ${isSkillsVisible ? 'w-[94%]' : 'w-0'}`}></div>
                  </div>
                </div>
                
                <div className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-base text-gray-300">Database Management</span>
                    <span className="text-xs sm:text-base text-purple-400 font-medium">92%</span>
                  </div>
                  <div className="w-full h-1 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-1000 ease-out delay-200 ${isSkillsVisible ? 'w-[92%]' : 'w-0'}`}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-base text-gray-300">Mobile App Development</span>
                    <span className="text-xs sm:text-base text-pink-400 font-medium">90%</span>
                  </div>
                  <div className="w-full h-1 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r from-pink-600 to-pink-400 transition-all duration-1000 ease-out delay-300 ${isSkillsVisible ? 'w-[90%]' : 'w-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-8 h-12 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-scroll" />
          </div>
          <span className="block text-center text-xs text-gray-500 mt-2">Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(HeroSection);