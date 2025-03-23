import React, { useState, useCallback, memo, useEffect } from 'react';
import { Globe, Github, ExternalLink, Code } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  githubLink?: string;
  image: string;
  color: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({
  title,
  description,
  tech,
  link,
  githubLink,
  image,
  color,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize event handlers to prevent recreating on each render
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsHovered(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovered(false);
    }
  }, [isMobile]);
  
  const handleTouchStart = useCallback(() => {
    if (isMobile) {
      setIsTouched(prev => !prev);
    }
  }, [isMobile]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Memoize tech items to prevent recreation on render
  const techItems = React.useMemo(() => tech.map((item, i) => (
    <span 
      key={i} 
      className="cyber-tag text-xs md:text-sm py-1 px-2 md:px-3 whitespace-nowrap"
    >
      {item}
    </span>
  )), [tech]);

  // Determine if we should show overlay (hover on desktop, touch on mobile)
  const showOverlay = (isMobile && isTouched) || (!isMobile && isHovered);

  return (
    <div 
      className="project-card group"
      style={{ animationDelay: `${0.2 * (index + 1)}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouchStart}
      onTouchStart={handleTouchStart}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60 z-10"></div>
        
        {/* Glitch Effect on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 transition-opacity ${showOverlay ? 'opacity-40' : 'opacity-20'}`}></div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-transparent to-transparent"></div>
        
        {/* Add loading placeholder with simplified design */}
        <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <img 
          src={image} 
          alt={title}
          className={`w-full h-48 object-cover transform transition-all duration-700 ${showOverlay ? 'scale-110 blur-xs' : 'scale-100'}`}
          loading="lazy" 
          onLoad={handleImageLoad}
          decoding="async" // Use async decoding
        />
        
        {/* Cyber Frame - Simplified for mobile */}
        {!isMobile && (
          <>
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-500"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-500"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-500"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-500"></div>
          </>
        )}
        
        {/* Hover/Touch Overlay */}
        <div className={`absolute inset-0 bg-black/80 z-20 flex items-center justify-center gap-6 transition-opacity duration-300 ${
          showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {showOverlay && (
            <>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn-icon p-3 rounded-md hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                aria-label="View Live Demo"
              >
                <ExternalLink size={isMobile ? 18 : 20} className="text-white" />
              </a>
              {githubLink && (
                <a 
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn-icon p-3 rounded-md hover:scale-110 active:scale-95 transition-transform touch-manipulation"
                  aria-label="View Source Code"
                >
                  <Github size={isMobile ? 18 : 20} className="text-white" />
                </a>
              )}
            </>
          )}
        </div>
        
        {/* Mobile tap instruction */}
        {isMobile && !isTouched && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded z-20 animate-pulse">
            Tap to view actions
          </div>
        )}
      </div>
      
      <div className="p-4 md:p-6 relative bg-gradient-to-b from-background-dark to-background-dark/70 backdrop-blur-sm">
        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors flex items-center">
          <Code size={isMobile ? 14 : 16} className="mr-2 text-cyan-500" />
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
          {techItems}
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-sm md:text-base">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group touch-manipulation"
          >
            Live Demo <Globe size={isMobile ? 14 : 16} className="ml-1 md:ml-2 group-hover:rotate-12 transition-transform" />
          </a>
          {githubLink && (
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors group touch-manipulation"
            >
              Source <Github size={isMobile ? 14 : 16} className="ml-1 md:ml-2 group-hover:rotate-12 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

// Important for memo to work correctly
ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;