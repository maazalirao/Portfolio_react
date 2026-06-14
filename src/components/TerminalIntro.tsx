import { useEffect, useState, useRef } from 'react';
import { ChevronRight, X } from 'lucide-react';

interface TerminalIntroProps {
  onComplete: () => void;
  userName?: string;
}

const renderLine = (text: string) => {
  if (text.startsWith('$')) {
    return (
      <>
        <span className="text-accent">$</span>
        <span className="text-ink">{text.slice(1)}</span>
      </>
    );
  }
  if (text.startsWith('>')) {
    return <span className="text-ink-faint">{text}</span>;
  }
  return <span>{text}</span>;
};

const TerminalIntro = ({ onComplete, userName = 'Maaz Ali Rao' }: TerminalIntroProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const terminalLines = [
    '$ whoami',
    `> ${userName} — Full-Stack Engineer`,
    '$ loading portfolio...',
    '> ready ✓',
  ];

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(t);
  }, []);

  // Typewriter
  useEffect(() => {
    if (lineIndex >= terminalLines.length) {
      const t = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 300);
      }, 450);
      return () => clearTimeout(t);
    }
    if (charIndex < terminalLines[lineIndex].length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines((prev) => [...prev, terminalLines[lineIndex]]);
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 220);
    return () => clearTimeout(t);
    // terminalLines is derived deterministically from userName; intentionally omitted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, charIndex, onComplete]);

  // Auto-scroll
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);

  const partial =
    lineIndex < terminalLines.length ? terminalLines[lineIndex].substring(0, charIndex) : '';

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-bg/90 backdrop-blur-sm transition-opacity duration-300 ${
        done ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-md mx-4 browser-frame shadow-2xl shadow-black/50 animate-scale-in">
        <div className="browser-bar justify-between">
          <div className="flex items-center gap-1.5">
            <span className="browser-dot bg-[#ff5f57]" />
            <span className="browser-dot bg-[#febc2e]" />
            <span className="browser-dot bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-ink-faint">maaz@portfolio: ~</span>
          </div>
          <button onClick={onComplete} aria-label="Close" className="text-ink-faint hover:text-ink transition-colors">
            <X size={14} />
          </button>
        </div>

        <div ref={ref} className="bg-bg p-4 font-mono text-sm leading-6 h-40 overflow-y-auto">
          {lines.map((l, i) => (
            <div key={i} className="mb-1">
              {renderLine(l)}
            </div>
          ))}
          {lineIndex < terminalLines.length && (
            <div className="flex items-center">
              {renderLine(partial)}
              {showCursor && <span className="inline-block w-2 h-4 bg-accent ml-0.5" />}
            </div>
          )}
        </div>

        <div className="flex justify-end px-3 py-2 bg-bg-elevated border-t border-line">
          <button
            onClick={onComplete}
            className="inline-flex items-center gap-1 font-mono text-xs text-ink-faint hover:text-accent transition-colors"
          >
            skip <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalIntro;
