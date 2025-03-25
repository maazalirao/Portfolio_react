import React, { useState, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  isScrolling: boolean;
}

// Navigation links defined outside component to prevent re-creation on render
const navigationLinks = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const Navigation: React.FC<NavigationProps> = ({ activeSection, isScrolling }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Memoize toggle handler
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Memoize close handler
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${
      isScrolling ? 'py-2 bg-gray-900/80 backdrop-blur shadow-lg' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-white tracking-tight">
          MA<span className="text-cyan-400">.</span>
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {navigationLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`text-sm hover:text-cyan-400 transition-colors ${
                  activeSection === link.id ? 'text-cyan-400 font-medium' : 'text-gray-300'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile Navigation Toggle */}
              <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg">
          <ul className="container mx-auto px-6 py-4 space-y-4">
            {navigationLinks.map(link => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`block py-2 text-lg ${
                    activeSection === link.id ? 'text-cyan-400 font-medium' : 'text-gray-300'
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

// Prevent unnecessary re-renders
export default memo(Navigation); 