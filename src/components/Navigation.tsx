import React, { useState, useCallback, useEffect, memo } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  isScrolling: boolean;
}

// Defined outside the component so the array isn't re-created on every render
const navigationLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
];

const Navigation: React.FC<NavigationProps> = ({ activeSection, isScrolling }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Lightweight scroll-progress indicator
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolling
          ? 'py-3 bg-bg/80 backdrop-blur-md border-b border-line'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-px bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-content mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="font-display text-xl font-bold text-ink tracking-tight">
          maaz<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`link-underline text-sm font-medium transition-colors ${
                    activeSection === link.id ? 'text-accent' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink border border-line-strong rounded-lg px-4 py-2 hover:border-accent hover:text-accent transition-colors"
          >
            Get in touch
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-ink-muted hover:text-ink transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg/95 backdrop-blur-md border-b border-line">
          <ul className="max-w-content mx-auto px-6 py-5 space-y-1">
            {[...navigationLinks, { id: 'contact', label: 'Contact' }].map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={closeMenu}
                  className={`flex items-center justify-between py-3 text-lg font-medium border-b border-line ${
                    activeSection === link.id ? 'text-accent' : 'text-ink-muted'
                  }`}
                >
                  {link.label}
                  <ArrowUpRight size={18} className="opacity-50" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default memo(Navigation);
