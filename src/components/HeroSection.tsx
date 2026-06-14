import React from 'react';
import { ArrowRight, Mail, Github } from 'lucide-react';
import profilePic from '../assets/pf1.jpg';

const stats = [
  { value: '3+', label: 'Years building' },
  { value: '15+', label: 'Live projects' },
  { value: '35+', label: 'Projects shipped' },
];

// A small, syntax-highlighted "editor" line helper
const Line = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div className="flex">
    <span className="select-none w-8 shrink-0 text-right pr-4 text-ink-faint/60">{n}</span>
    <span className="whitespace-pre">{children}</span>
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 grid-bg opacity-[0.4] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="ambient-glow w-[36rem] h-[36rem] -top-40 -right-32" />
      <div className="ambient-glow w-[28rem] h-[28rem] top-1/2 -left-40 opacity-[0.07]" />

      <div className="relative max-w-content mx-auto px-6 w-full z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated px-3.5 py-1.5 text-sm text-ink-muted animate-fade-in-up opacity-0" style={{ animationDelay: '0.05s' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for full-time roles &amp; freelance
            </div>

            <p className="mt-7 font-mono text-sm text-accent animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
              Hi, I&apos;m Maaz Ali Rao
            </p>

            <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-ink animate-fade-in-up opacity-0" style={{ animationDelay: '0.18s' }}>
              I build full-stack web
              <br className="hidden sm:block" /> products,{' '}
              <span className="text-gradient">shipped faster with AI.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted animate-fade-in-up opacity-0" style={{ animationDelay: '0.26s' }}>
              Full-stack engineer working across React, Node, and the MERN stack.
              I take products from idea to launch — and use AI tools like{' '}
              <span className="text-ink">Claude Code</span> and{' '}
              <span className="text-ink">Cursor</span> to move faster without
              cutting corners.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.34s' }}>
              <a href="#projects" className="btn btn-primary">
                View my work
                <ArrowRight size={17} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                <Mail size={16} />
                Get in touch
              </a>
            </div>

            {/* Identity row */}
            <div className="mt-8 flex items-center gap-3 animate-fade-in-up opacity-0" style={{ animationDelay: '0.42s' }}>
              <img
                src={profilePic}
                alt="Maaz Ali Rao"
                className="w-10 h-10 rounded-full object-cover border border-line-strong"
                width={40}
                height={40}
                fetchPriority="high"
                loading="eager"
                style={{ objectPosition: '0 20%' }}
              />
              <a
                href="https://github.com/maazalirao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                <Github size={15} />
                @maazalirao
              </a>
            </div>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
              {stats.map((s) => (
                <div key={s.label} className="border-l border-line pl-4">
                  <dt className="font-display text-2xl sm:text-3xl font-bold text-ink">{s.value}</dt>
                  <dd className="mt-1 text-xs sm:text-sm text-ink-faint leading-tight">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — code window */}
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <div className="browser-frame shadow-2xl shadow-black/40 lg:rotate-[0.4deg] hover:rotate-0 transition-transform duration-500">
              <div className="browser-bar">
                <span className="browser-dot bg-[#ff5f57]" />
                <span className="browser-dot bg-[#febc2e]" />
                <span className="browser-dot bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-ink-faint">developer.ts</span>
              </div>

              <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-7 text-ink-muted bg-bg-elevated overflow-x-auto">
                <Line n={1}>
                  <span className="text-[#c4b5fd]">const</span>{' '}
                  <span className="text-ink">engineer</span>{' '}
                  <span className="text-ink-faint">=</span>{' '}
                  <span className="text-ink-faint">{'{'}</span>
                </Line>
                <Line n={2}>
                  {'  '}
                  <span className="text-ink">name</span>
                  <span className="text-ink-faint">:</span>{' '}
                  <span className="text-accent">&quot;Maaz Ali Rao&quot;</span>
                  <span className="text-ink-faint">,</span>
                </Line>
                <Line n={3}>
                  {'  '}
                  <span className="text-ink">role</span>
                  <span className="text-ink-faint">:</span>{' '}
                  <span className="text-accent">&quot;Full-Stack Engineer&quot;</span>
                  <span className="text-ink-faint">,</span>
                </Line>
                <Line n={4}>
                  {'  '}
                  <span className="text-ink">stack</span>
                  <span className="text-ink-faint">:</span>{' '}
                  <span className="text-ink-faint">[</span>
                  <span className="text-accent">&quot;React&quot;</span>
                  <span className="text-ink-faint">,</span>{' '}
                  <span className="text-accent">&quot;Node&quot;</span>
                  <span className="text-ink-faint">,</span>{' '}
                  <span className="text-accent">&quot;TypeScript&quot;</span>
                  <span className="text-ink-faint">],</span>
                </Line>
                <Line n={5}>
                  {'  '}
                  <span className="text-ink">aiTooling</span>
                  <span className="text-ink-faint">:</span>{' '}
                  <span className="text-ink-faint">[</span>
                  <span className="text-accent">&quot;Claude Code&quot;</span>
                  <span className="text-ink-faint">,</span>{' '}
                  <span className="text-accent">&quot;Cursor&quot;</span>
                  <span className="text-ink-faint">],</span>
                </Line>
                <Line n={6}>
                  {'  '}
                  <span className="text-ink">shipped</span>
                  <span className="text-ink-faint">:</span>{' '}
                  <span className="text-[#7dd3fc]">35</span>
                  <span className="text-ink-faint">,</span>{'  '}
                  <span className="text-ink-faint">{'// 15+ live, 35+ shipped'}</span>
                </Line>
                <Line n={7}>
                  {'  '}
                  <span className="text-ink">status</span>
                  <span className="text-ink-faint">:</span>{' '}
                  <span className="text-accent">&quot;available&quot;</span>
                  <span className="text-ink-faint">,</span>
                </Line>
                <Line n={8}>
                  <span className="text-ink-faint">{'}'}</span>
                  <span className="terminal-cursor inline-block w-2 h-4 align-middle bg-accent ml-1" />
                </Line>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <div className="w-6 h-10 border border-line-strong rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-accent rounded-full animate-scroll" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Scroll</span>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
