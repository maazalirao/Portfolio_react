import React, { useEffect, useCallback, useState, memo } from 'react';
import { Home, Code, Award, FolderOpen, Send, Menu, X, User, FileCode, Mail, Github, Linkedin } from 'lucide-react';

// Type definitions
interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

// Memoized NavLink component to avoid unnecessary re-renders
const NavLink = memo(({ href, label, icon, isActive, onClick, isMobile }: NavLinkProps) => {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
        if (onClick) onClick();
      }}
      className={`nav-link py-2 px-4 rounded-lg transition-all duration-300 flex items-center 
        ${isActive 
          ? 'text-white bg-primary/20 font-semibold shadow-glow-sm' 
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'} 
        ${isMobile ? 'text-lg py-4 justify-center gap-3' : ''}`
      }
    >
      {icon && <span className={`${isMobile ? 'text-primary' : 'mr-2'}`}>{icon}</span>}
      {(!isMobile || (isMobile && window.innerWidth > 480)) && <span>{label}</span>}
    </a>
  );
});

NavLink.displayName = 'NavLink';

// Main Navigation component
function Navigation({ activeSection, isScrolling }: { activeSection: string, isScrolling: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Default closed
  const [isMobile, setIsMobile] = useState(false);
  const [iconSize, setIconSize] = useState(20);

  // Detect mobile devices and adjust icon size accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Adjust icon size based on screen width
      if (window.innerWidth < 640) {
        setIconSize(18);
      } else if (window.innerWidth < 1024) {
        setIconSize(20);
      } else {
        setIconSize(22);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle body overflow when mobile menu is open/closed
  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Memoized toggle menu handler
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu after clicking a link
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Navigation items shared between desktop and mobile views
  const navItems = [
    { href: '#home', label: 'Home', icon: <Home size={iconSize} /> },
    { href: '#skills', label: 'Skills', icon: <Code size={iconSize} /> },
    { href: '#experience', label: 'Experience', icon: <Award size={iconSize} /> },
    { href: '#projects', label: 'Projects', icon: <FolderOpen size={iconSize} /> },
    { href: '#contact', label: 'Contact', icon: <Send size={iconSize} /> },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isScrolling ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="glass p-4 backdrop-blur-md">
          <div className="container mx-auto flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold text-white">
              <span className="text-primary">M</span>aaz.
            </a>
            
            {/* Desktop menu (hidden on mobile) */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={activeSection === item.href.substring(1)}
                />
              ))}
            </div>
            
            {/* Mobile menu button (only visible on mobile) */}
            <button
              className="md:hidden text-white p-2 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <a href="#home" className="text-2xl font-bold text-white">
              <span className="text-primary">M</span>aaz.
            </a>
            <button
              className="text-white p-2 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={activeSection === item.href.substring(1)}
                onClick={closeMobileMenu}
                isMobile={true}
              />
            ))}
          </div>
          
          <div className="mt-auto pt-6">
            <div className="grid grid-cols-3 gap-4">
              <a
                href="mailto:maazaltaf1027@gmail.com"
                className="flex items-center justify-center p-3 rounded-full bg-gray-800/50 text-primary hover:bg-gray-700/50 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-full bg-gray-800/50 text-primary hover:bg-gray-700/50 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-full bg-gray-800/50 text-primary hover:bg-gray-700/50 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (visible on small screens) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-gray-800/50 z-40 md:hidden">
          <div className="flex justify-between items-center px-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-3 flex flex-col items-center justify-center transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation; 