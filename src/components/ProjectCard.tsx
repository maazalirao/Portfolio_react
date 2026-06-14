import React, { useState, memo } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  githubLink?: string;
  image: string;
  index: number;
}

const fallbackImage =
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1770&auto=format&fit=crop';

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  link,
  githubLink,
  image,
  index,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="group card card-hover relative flex flex-col h-full overflow-hidden">
      {/* Screenshot (contained so the full shot is visible, never cropped) */}
      <div className="relative h-[190px] overflow-hidden bg-bg-subtle p-3 border-b border-line">
        {!loaded && !errored && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="loader" />
          </div>
        )}
        <img
          src={errored ? fallbackImage : image}
          alt={`${title} screenshot`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setErrored(true);
            setLoaded(true);
          }}
          loading="lazy"
          width={400}
          height={190}
          decoding="async"
          fetchPriority={index < 2 ? 'high' : 'auto'}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-accent">
            {/* Stretched link makes the whole card clickable without nesting anchors */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="after:content-[''] after:absolute after:inset-0"
            >
              {title}
            </a>
          </h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 mt-1 text-ink-faint transition-colors group-hover:text-accent"
          />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-ink-muted flex-grow">{description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tech.slice(0, 5).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {githubLink && (
          <div className="relative z-10 mt-4 pt-4 border-t border-line">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
            >
              <Github size={15} /> Source
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProjectCard);
