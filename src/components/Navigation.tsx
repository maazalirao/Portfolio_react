import React, { useState, useEffect, useCallback, memo } from 'react';
import { Download, Menu, X } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

// Memoize NavLink to prevent unnecessary re-renders
const NavLink: React.FC<NavLinkProps> = memo(({ href, children, isActive, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className={`relative px-5 py-2 transition-all duration-300 overflow-hidden ${
      isActive 
        ? 'text-white' 
        : 'text-gray-300 hover:text-white'
    }`}
  >
    <span className="relative z-10">{children}</span>
    {isActive && (
      <>
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/80 to-blue-500/80 z-0"></span>
        <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-cyan-400"></span>
      </>
    )}
  </a>
));

// Ensure proper display name for debugging
NavLink.displayName = 'NavLink';

interface NavigationProps {
  activeSection: string;
  isScrolling: boolean;
}

const Navigation: React.FC<NavigationProps> = memo(({ activeSection, isScrolling }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Memoize toggle handlers to prevent recreating on each render
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Memoize nav items to prevent recreation on each render
  const navItems = React.useMemo(() => [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ], []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-lg bg-background-dark/80 ${
        isScrolling ? 'py-2 shadow-glow' : 'py-4'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold glitch-text" data-text="">MA.</span>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-md">
              {navItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href} 
                  isActive={activeSection === item.href.slice(1)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md glass transition-transform duration-300 hover:scale-105"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Resume Button (Desktop) */}
            <a 
              href="/resume.pdf" 
              className="hidden md:flex cyber-btn px-4 py-2 rounded-md items-center"
              download
            >
              <Download size={18} className="mr-2" />
              Resume
            </a>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </nav>

      {/* Mobile Navigation Overlay - Only render when needed */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Menu - Use CSS for transform, not conditional rendering */}
      <div
        className={`fixed right-0 top-0 h-full w-[300px] bg-background-dark/95 backdrop-blur-xl z-50 md:hidden shadow-2xl
          transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-blue-500/30"></div>
        
        <div className="flex flex-col pt-20 px-6 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={activeSection === item.href.slice(1)}
              onClick={closeMobileMenu}
            >
              {item.label}
            </NavLink>
          ))}
          <a 
            href="/resume.pdf" 
            className="cyber-btn-secondary mt-6"
            download
            onClick={closeMobileMenu}
          >
            <Download size={18} className="mr-2" />
            <span>Resume</span>
          </a>
        </div>
      </div>
    </>
  );
});

// Ensure proper display name for debugging
Navigation.displayName = 'Navigation';

export default Navigation; 