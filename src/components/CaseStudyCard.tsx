import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface CaseStudyCardProps {
  title: string;
  tagline: string;
  role: string;
  description: string[];
  tech: string[];
  images: string[];
  urlLabel: string;
  status?: string;
  link?: string;
  reverse?: boolean;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  tagline,
  role,
  description,
  tech,
  images,
  urlLabel,
  status,
  link,
  reverse,
}) => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    if (cardRef.current) ob.observe(cardRef.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || images.length < 2) return;
    const t = setInterval(() => setCurrent((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [isVisible, images.length]);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((i) => (i + 1) % images.length);
  };
  const open = () => {
    if (link) window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={cardRef} className="group card card-hover overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Media */}
        <div className={`relative bg-bg-subtle ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className="browser-bar">
            <span className="browser-dot bg-[#ff5f57]" />
            <span className="browser-dot bg-[#febc2e]" />
            <span className="browser-dot bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-ink-faint truncate">{urlLabel}</span>
          </div>
          <div
            className={`relative overflow-hidden h-[280px] sm:h-[380px] lg:h-full lg:min-h-[460px] ${
              link ? 'cursor-pointer' : ''
            }`}
            onClick={open}
          >
            <img
              key={current}
              src={images[current]}
              alt={`${title} screenshot ${current + 1}`}
              className="w-full h-full object-contain animate-fade-in"
              loading="lazy"
            />
            {status && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-bg/80 backdrop-blur px-2.5 py-1 text-xs font-mono text-accent border border-line">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> {status}
              </span>
            )}

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

        {/* Content */}
        <div className={`flex flex-col p-6 sm:p-8 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <span className="eyebrow">{role}</span>
          <h3 className="font-display text-2xl font-bold text-ink mt-4">{title}</h3>
          <p className="text-accent text-sm font-medium mt-1">{tagline}</p>

          <div className="mt-4 space-y-3 text-ink-muted leading-relaxed text-[0.95rem]">
            {description.map((p, i) => (
              <p key={i}>{p}</p>
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
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Explore live <ArrowUpRight size={17} />
              </a>
            ) : status ? (
              <span className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {status}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
