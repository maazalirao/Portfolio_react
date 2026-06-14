import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Boxes, BarChart3, ShieldCheck } from 'lucide-react';

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

const features = [
  { icon: Boxes, title: 'Inventory', sub: 'Live stock levels' },
  { icon: BarChart3, title: 'Analytics', sub: 'Performance insights' },
  { icon: ShieldCheck, title: 'Secure auth', sub: 'Role-based access' },
];

const AgristoreCard: React.FC<AgristoreCardProps> = ({ title, description, tech, link }) => {
  const images = [image1, image2, image3, image4, image5, image6, image7];
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => setCurrent((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [isVisible, images.length]);

  const open = () => window.open(link, '_blank', 'noopener,noreferrer');
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((i) => (i + 1) % images.length);
  };

  return (
    <div ref={cardRef} className="group card card-hover overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Content (left on desktop) */}
        <div className="flex flex-col p-6 sm:p-8 order-2 lg:order-1">
          <span className="eyebrow">Featured · MERN inventory system</span>
          <h3 className="font-display text-2xl font-bold text-ink mt-4">{title}</h3>
          <p className="mt-3 text-ink-muted leading-relaxed">{description}</p>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {features.map(({ icon: Icon, title: t, sub }) => (
              <div key={t} className="rounded-lg border border-line bg-bg-subtle p-3">
                <Icon className="text-accent mb-2" size={18} />
                <div className="text-sm font-semibold text-ink leading-tight">{t}</div>
                <div className="text-xs text-ink-faint">{sub}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-6">
            {tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7">
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Explore live <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        {/* Slideshow (right on desktop) */}
        <div className="relative bg-bg-subtle order-1 lg:order-2">
          <div className="browser-bar">
            <span className="browser-dot bg-[#ff5f57]" />
            <span className="browser-dot bg-[#febc2e]" />
            <span className="browser-dot bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-ink-faint">fyp40.vercel.app</span>
          </div>
          <div
            className="relative overflow-hidden h-[280px] sm:h-[360px] lg:h-full lg:min-h-[440px] cursor-pointer"
            onClick={open}
          >
            <img
              key={current}
              src={images[current]}
              alt={`${title} screenshot ${current + 1}`}
              className="w-full h-full object-contain animate-fade-in"
              loading="lazy"
            />
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-bg/80 backdrop-blur px-2.5 py-1 text-xs font-mono text-accent border border-line">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Live
            </span>

            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-bg/70 backdrop-blur text-ink hover:text-accent transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-bg/70 backdrop-blur text-ink hover:text-accent transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    current === i ? 'w-5 bg-accent' : 'w-1.5 bg-ink-faint/60 hover:bg-ink-faint'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgristoreCard;
