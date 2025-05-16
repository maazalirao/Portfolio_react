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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices with minimal DOM operations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Use more efficient event handling with debouncing
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  // Handle clicking the card
  const handleCardClick = (e: React.MouseEvent) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Handle GitHub click separately to avoid navigation conflict
  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('https://github.com/maazalirao', '_blank', 'noopener,noreferrer');
  };

  // Handle image loading state
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true);
  };

  // Fallback image - use a lightweight placeholder
  const fallbackImage = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop";

  return (
    <div 
      ref={cardRef}
      className="flex flex-col rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
      style={{ 
        animationDelay: `${index * 0.1 + 0.2}s`,
        willChange: 'transform',
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
    >
      {/* Image Section */}
      <div 
        className="relative h-[180px] overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Only show loading spinner on initial load */}
        {!isImageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <img 
          src={imageError ? fallbackImage : image}
          alt={title} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-80'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          width="400"
          height="180"
          decoding="async"
          fetchPriority={index < 2 ? "high" : "auto"}
        />
      </div>
      
      {/* Content Section */}
      <div className={`flex flex-col p-5 bg-gray-900 flex-grow`}>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200 mb-4 text-sm sm:text-base">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.slice(0, 5).map((item, i) => (
            <span 
              key={i} 
              className="bg-gray-800 px-3 py-1 rounded-full text-xs text-white whitespace-nowrap border border-gray-700"
            >
              {item}
            </span>
          ))}
        </div>
        
        <div className="flex items-center mt-auto">
          <a 
            href="#"
            onClick={handleGithubClick}
            className="bg-gray-800 text-white p-2 rounded-lg flex items-center hover:bg-gray-700 transition-colors"
          >
            <Github size={18} />
          </a>
          <a 
            href={link}
            onClick={(e) => {
              e.stopPropagation();
              window.open(link, '_blank', 'noopener,noreferrer');
            }}
            className={`ml-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:from-cyan-500 hover:to-blue-500 text-xs transition-colors`}
          >
            <span>View Project</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(ProjectCard);