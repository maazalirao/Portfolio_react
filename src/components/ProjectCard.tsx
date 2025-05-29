import React, { useState, useEffect, useRef, memo } from 'react';
import { ExternalLink, Github, Code, Globe, Zap } from 'lucide-react';

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
    // Use the browser's default link handling
    window.open(link, '_blank', 'noopener noreferrer');
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

  // Get icon and color based on title (for consistency with other cards)
  const getIconForProject = () => {
    if (title.toLowerCase().includes('clearview')) {
      return <Globe className="text-blue-400" size={24} />;
    } else if (title.toLowerCase().includes('specialtouch')) {
      return <Zap className="text-indigo-400" size={24} />;
    } else {
      return <Code className="text-cyan-400" size={24} />;
    }
  };

  // Get background color for icon
  const getIconBgColor = () => {
    if (title.toLowerCase().includes('clearview')) {
      return 'bg-blue-500/20';
    } else if (title.toLowerCase().includes('specialtouch')) {
      return 'bg-indigo-500/20';
    } else {
      return 'bg-cyan-500/20';
    }
  };

  return (
    <div 
      ref={cardRef}
      className="flex flex-col rounded-xl shadow-md overflow-hidden hover:shadow-glow transition-all duration-300 h-full bg-gradient-to-b from-gray-900 to-gray-950"
      style={{ 
        animationDelay: `${index * 0.1 + 0.2}s`,
        willChange: 'transform',
        animation: 'fadeIn 0.5s ease-out forwards',
      }}
    >
      {/* Project title - now above the image for better visibility */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getIconBgColor()}`}>
            {getIconForProject()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div 
        className="relative h-[180px] overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Only show loading spinner on initial load */}
        {!isImageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-10">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Glass overlay for image */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent z-5 pointer-events-none"></div>

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
      <div className={`flex flex-col p-4 bg-gradient-to-b from-gray-900 to-gray-950 flex-grow`}>
        <p className="text-gray-200 mb-4 text-sm leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.slice(0, 5).map((item, i) => (
            <span 
              key={i} 
              className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-white whitespace-nowrap border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
        
        <div className="flex items-center mt-auto gap-2">
          <a 
            href="https://github.com/maazalirao"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg flex items-center transition-colors"
          >
            <Github size={18} />
          </a>
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`flex-1 bg-gradient-to-r ${color} text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 text-xs transition-colors`}
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