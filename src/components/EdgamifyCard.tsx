import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Award, Users, Clock } from 'lucide-react';

// Import multiple images
import image1 from '../assets/Edgamify/1.png';
import image2 from '../assets/Edgamify/2.png';
import image3 from '../assets/Edgamify/3.png';
import image4 from '../assets/Edgamify/4.png';
import image5 from '../assets/Edgamify/5.png';
import image6 from '../assets/Edgamify/6.png';
import image7 from '../assets/Edgamify/7.png';
import image8 from '../assets/Edgamify/8.png';
import achievementGallery from '../assets/Edgamify/achievment-gallery.png';

interface EdgamifyCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

const EdgamifyCard: React.FC<EdgamifyCardProps> = ({ 
  title, 
  description, 
  tech, 
  link
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Image array
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, achievementGallery];

  // Check if element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-advance slideshow only when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setImageLoaded(false);
    }, 3000);

    return () => clearInterval(timer);
  }, [isVisible, images.length]);

  // Handle clicking the card
  const handleCardClick = () => {
    window.open(link, '_blank', 'noopener noreferrer');
  };

  // Handle GitHub click
  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('https://github.com/maazalirao', '_blank', 'noopener,noreferrer');
  };

  // Handle image events
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Navigate slideshow
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageLoaded(false);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageLoaded(false);
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  return (
    <div ref={cardRef} className="flex flex-col rounded-xl shadow-lg overflow-hidden hover:shadow-glow transition-all duration-300 h-full bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Project title - now above the image for better visibility */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Award className="text-purple-400" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <div className="flex items-center mt-1 text-gray-400 text-sm">
              <Users size={14} className="mr-1" /> 10,000+ Students
              <span className="mx-2">•</span>
              <Clock size={14} className="mr-1" /> Gamified Learning
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div 
        className="relative overflow-hidden cursor-pointer h-[450px] xs:h-[500px] sm:h-[550px] w-full"
        onClick={handleCardClick}
      >
        {/* Loading spinner */}
        {!imageLoaded && !imageError && currentImageIndex === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/50 to-indigo-900/50 backdrop-blur-sm z-10">
            <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-purple-300 font-medium">Loading image...</p>
          </div>
        )}

        {/* Fallback background if image fails */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/70 to-gray-900"></div>
        )}
        
        {/* Glass overlay for image */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent z-5 pointer-events-none"></div>
        
        {/* Actual image */}
        <img 
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${title} screenshot ${currentImageIndex + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-80'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Subtle transition overlay */}
        {!imageLoaded && currentImageIndex !== 0 && (
          <div className="absolute inset-0 bg-black/10 z-5"></div>
        )}
        
        {/* Navigation arrows - now with better styling */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20">
          <button 
            onClick={prevImage}
            className="bg-black/40 text-white p-2 rounded-r-lg hover:bg-purple-600/60 transition-colors ml-2 backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center z-20">
          <button 
            onClick={nextImage}
            className="bg-black/40 text-white p-2 rounded-l-lg hover:bg-purple-600/60 transition-colors mr-2 backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicator dots - improved styling */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setImageLoaded(false);
                setCurrentImageIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                currentImageIndex === index 
                  ? 'bg-purple-500 w-6 shadow-glow-sm' 
                  : 'bg-white/50 hover:bg-white/80 w-2'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Badge - now with more eye-catching design */}
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-xs font-medium text-white shadow-glow-sm flex items-center">
            <span className="animate-pulse mr-1">•</span> Latest Project
          </div>
        </div>

        {/* Image number indicator */}
        <div className="absolute bottom-4 right-4 z-30">
          <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white">
            {currentImageIndex + 1}/{images.length}
          </div>
        </div>
      </div>
      
      {/* Content Section - Enhanced with better spacing and visual elements */}
      <div className="flex flex-col p-6 bg-gradient-to-b from-gray-900 to-gray-950 flex-grow">
        <div className="flex flex-col mb-6">
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{description}</p>
          
          {/* Key features with icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-purple-500/10 mr-3">
                <Award className="text-purple-400" size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Achievement System</h4>
                <p className="text-xs text-gray-400">Earn badges & rewards</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-cyan-500/10 mr-3">
                <Users className="text-cyan-400" size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Progress Tracking</h4>
                <p className="text-xs text-gray-400">Monitor your journey</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-pink-500/10 mr-3">
                <Clock className="text-pink-400" size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Skill Certification</h4>
                <p className="text-xs text-gray-400">Validate your learning</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {tech.map((item, i) => (
              <span 
                key={i} 
                className="bg-gray-800/80 px-3 py-1 rounded-full text-xs text-white whitespace-nowrap border border-gray-700 hover:border-purple-500/50 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons - Enhanced with more professional styling */}
        <div className="flex items-center gap-4 mt-auto">
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:from-purple-500 hover:to-pink-500 transition-colors shadow-glow-sm font-medium"
          >
            <span>Explore Project</span>
            <ExternalLink size={16} />
          </a>
          <a 
            href="https://github.com/maazalirao"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg flex items-center transition-colors shadow-md"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EdgamifyCard; 