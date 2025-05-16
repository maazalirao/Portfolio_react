import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

// Import multiple images
import image1 from '../assets/pest1.png';
import image2 from '../assets/pest2.png';
import image3 from '../assets/pest3.png';
import image4 from '../assets/pest4.png';
import image5 from '../assets/pest5.png';
import image6 from '../assets/pest6.png';
import image7 from '../assets/pest7.png';

interface AgristoreCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

const AgristoreCard: React.FC<AgristoreCardProps> = ({ 
  title, 
  description, 
  tech, 
  link
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Image array
  const images = [image1, image2, image3, image4, image5, image6, image7];

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setImageLoaded(false); // Reset for next image load
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  // Handle clicking the card
  const handleCardClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
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
    <div className="flex flex-col rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
      {/* Image Section */}
      <div 
        className="relative overflow-hidden cursor-pointer h-[260px] sm:h-[300px]"
        onClick={handleCardClick}
      >
        {/* Only show loading spinner on initial load, not during transitions */}
        {!imageLoaded && !imageError && currentImageIndex === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 z-10">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-400 font-medium">Loading image...</p>
          </div>
        )}
        
        {/* Fallback background if image fails */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 via-blue-900/70 to-gray-900"></div>
        )}
        
        {/* Actual image */}
        <img 
          key={currentImageIndex} // Force re-render on image change
          src={images[currentImageIndex]}
          alt={`${title} screenshot ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-80'}`}
          style={{ objectPosition: 'top' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {/* Subtle transition overlay */}
        {!imageLoaded && currentImageIndex !== 0 && (
          <div className="absolute inset-0 bg-black/10 z-5"></div>
        )}
        
        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20">
          <button 
            onClick={prevImage}
            className="bg-black/40 text-white p-2 rounded-r-lg hover:bg-black/60 transition-colors ml-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center z-20">
          <button 
            onClick={nextImage}
            className="bg-black/40 text-white p-2 rounded-l-lg hover:bg-black/60 transition-colors mr-2"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicator dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setImageLoaded(false);
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                currentImageIndex === index 
                  ? 'bg-cyan-400 w-6 shadow-md' 
                  : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Badge */}
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg">
            Featured Project
          </div>
        </div>
      </div>
      
      {/* Content Section - Now below the image */}
      <div className="flex flex-col p-6 bg-gray-900 flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-gray-200 text-sm sm:text-base mb-6">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, i) => (
            <span 
              key={i} 
              className="bg-gray-800 px-3 py-1 rounded-full text-xs text-white whitespace-nowrap border border-gray-700"
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <a 
            href={link}
            onClick={(e) => {
              e.stopPropagation();
              window.open(link, '_blank', 'noopener,noreferrer');
            }}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-cyan-500 hover:to-blue-500 transition-colors shadow-md"
          >
            <span>View Project</span>
            <ExternalLink size={16} />
          </a>
          <a 
            href="#"
            onClick={handleGithubClick}
            className="bg-gray-800 text-white p-2 rounded-full flex items-center hover:bg-gray-700 transition-colors shadow-md"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgristoreCard; 