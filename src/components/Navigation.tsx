import React, { useState, useEffect, useCallback, memo } from 'react';
import { Download, Menu, X, Home, Code, Briefcase, Layout, Mail } from 'lucide-react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

// Memoize NavLink to prevent unnecessary re-renders
const NavLink: React.FC<NavLinkProps> = memo(({ href, children, isActive, onClick, icon }) => (
  <a
    href={href}
    onClick={onClick}
    className={`relative px-4 py-2 transition-all duration-300 overflow-hidden rounded-md flex items-center ${
      isActive 
        ? 'text-white' 
        : 'text-gray-300 hover:text-white'
    }`}
  >
    {icon && <span className="mr-2">{icon}</span>}
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
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    { href: '#home', label: 'Home', icon: <Home size={isMobile ? 16 : 18} /> },
    { href: '#skills', label: 'Skills', icon: <Code size={isMobile ? 16 : 18} /> },
    { href: '#experience', label: 'Experience', icon: <Briefcase size={isMobile ? 16 : 18} /> },
    { href: '#projects', label: 'Projects', icon: <Layout size={isMobile ? 16 : 18} /> },
    { href: '#contact', label: 'Contact', icon: <Mail size={isMobile ? 16 : 18} /> },
  ], [isMobile]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-lg bg-background-dark/80 ${
        isScrolling ? 'py-2 shadow-glow' : 'py-3'
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              MA.
            </a>
            
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
              className="md:hidden p-2 rounded-md glass transition-transform active:scale-95 touch-manipulation"
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
        className={`fixed right-0 top-0 h-full w-[270px] bg-background-dark/95 backdrop-blur-xl z-50 md:hidden shadow-2xl
          transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-blue-500/30"></div>
        
        <div className="flex flex-col pt-20 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={activeSection === item.href.slice(1)}
              onClick={closeMobileMenu}
              icon={item.icon}
            >
              {item.label}
            </NavLink>
          ))}
          <a 
            href="/resume.pdf" 
            className="cyber-btn-secondary mt-6 flex items-center justify-center py-3 touch-manipulation"
            download
          >
            <Download size={16} className="mr-2" />
            Download Resume
          </a>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 w-full z-40 md:hidden transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="bg-background-dark/95 backdrop-blur-lg py-2 px-4 border-t border-gray-800/50">
          <div className="flex justify-around">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center py-1 px-2 rounded-md ${
                  activeSection === item.href.slice(1)
                    ? 'text-cyan-400'
                    : 'text-gray-400'
                }`}
              >
                <span className={`${activeSection === item.href.slice(1) ? 'bg-cyan-500/20 p-1.5 rounded-md' : 'p-1.5'}`}>
                  {item.icon}
                </span>
                <span className="text-xs mt-1">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

// Ensure proper display name for debugging
Navigation.displayName = 'Navigation';

export default Navigation; 