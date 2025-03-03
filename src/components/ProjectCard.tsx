import React, { useState, useCallback, memo } from 'react';
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

  // Memoize event handlers to prevent recreating on each render
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Memoize tech items to prevent recreation on render
  const techItems = React.useMemo(() => tech.map((item, i) => (
    <span 
      key={i} 
      className="cyber-tag"
    >
      {item}
    </span>
  )), [tech]);

  return (
    <div 
      className="project-card group"
      style={{ animationDelay: `${0.2 * (index + 1)}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60 z-10"></div>
        
        {/* Glitch Effect on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 transition-opacity ${isHovered ? 'opacity-40' : 'opacity-20'}`}></div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-transparent to-transparent"></div>
        
        {/* Add loading placeholder */}
        <div className={`absolute inset-0 bg-gray-800 flex items-center justify-center transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <span className="animate-pulse">Loading...</span>
        </div>
        
        <img 
          src={image} 
          alt={title}
          className={`w-full h-48 object-cover transform transition-all duration-700 ${isHovered ? 'scale-110 blur-xs' : 'scale-100'}`}
          loading="lazy" 
          onLoad={handleImageLoad}
          decoding="async" // Use async decoding
        />
        
        {/* Cyber Frame */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-500"></div>
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-500"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-500"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-500"></div>
        
        {/* Hover Overlay - Only render content when hovered for performance */}
        <div className={`absolute inset-0 bg-black/80 z-20 flex items-center justify-center gap-6 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {isHovered && (
            <>
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn-icon p-3 rounded-md hover:scale-110 transition-transform"
                aria-label="View Live Demo"
              >
                <ExternalLink size={20} className="text-white" />
              </a>
              {githubLink && (
                <a 
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn-icon p-3 rounded-md hover:scale-110 transition-transform"
                  aria-label="View Source Code"
                >
                  <Github size={20} className="text-white" />
                </a>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="p-6 relative bg-gradient-to-b from-background-dark to-background-dark/70 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors flex items-center">
          <Code size={16} className="mr-2 text-cyan-500" />
          {title}
        </h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techItems}
        </div>
        <div className="flex items-center gap-4">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            Live Demo <Globe size={16} className="ml-2 group-hover:rotate-12 transition-transform" />
          </a>
          {githubLink && (
            <a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
            >
              Source <Github size={16} className="ml-2 group-hover:rotate-12 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

// Add display name for debugging
ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;