import React, { useState, useEffect, useRef, memo } from 'react';
import { ExternalLink, Github } from 'lucide-react';

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

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  tech, 
  link, 
  githubLink, 
  image, 
  color,
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices for better touch interactions - using ResizeObserver instead of resize event
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
    });
    
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);

  // Mouse event handlers (for desktop)
  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) setIsHovered(false);
  };

  // Touch event handlers (for mobile)
  const handleTouchStart = () => {
    if (isMobile) setIsTouched(!isTouched);
  };

  // Determine when to show overlay (mobile vs desktop)
  const showOverlay = isMobile ? isTouched : isHovered;

  // Handle image loading state
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true); // Consider it "loaded" even if it's an error
  };

  // Fallback image if the original fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop";

  return (
    <div 
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-xl shadow-md h-[320px] transform card"
      style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* Loading indicator when image not loaded */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Project image with fallback - optimized for performance */}
      <img 
        src={imageError ? fallbackImage : image}
        alt={title} 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        width="400"
        height="320"
        decoding="async"
        fetchPriority={index < 3 ? "high" : "auto"}
      />
      
      {/* Gradient overlay - simplified for better performance */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20"></div>
      
      {/* Bottom content (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        
        {/* Mobile instruction indicator */}
        {isMobile && !isTouched && (
          <div className="absolute top-3 right-3 bg-gray-900/80 text-white text-xs py-1 px-2 rounded-md flex items-center">
            <span className="mr-1">Tap</span>
          </div>
        )}
      </div>
      
      {/* Overlay content (visible on hover/touch) - optimized for performance */}
      <div 
        className={`absolute inset-0 z-20 flex flex-col justify-between p-6 bg-black/80 transform transition-all will-change-transform duration-150 ${
          showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        style={{
          background: showOverlay ? `linear-gradient(to top, ${color.replace('from-', '').replace('to-', '')})` : 'transparent'
        }}
      >
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-100 mb-4 text-sm md:text-base">{description}</p>
        </div>
        
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item, i) => (
              <span 
                key={i} 
                className="bg-black/30 px-3 py-1 rounded-full text-xs text-white whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/20 text-white px-4 py-2 rounded-lg flex items-center hover:bg-white/30 transition-colors"
              >
                <ExternalLink size={16} className="mr-2" />
                <span>View Project</span>
              </a>
            )}
            
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/20 text-white p-2 rounded-lg flex items-center hover:bg-white/30 transition-colors"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(ProjectCard);