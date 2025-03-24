import { useEffect, useState, useRef } from 'react';
import { ChevronRight, X, Minimize, Maximize } from 'lucide-react';

interface TerminalIntroProps {
  onComplete: () => void;
  userName?: string;
}

const TerminalIntro = ({ onComplete, userName = "Maaz Ali Rao" }: TerminalIntroProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [complete, setComplete] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);

  // Terminal lines to be displayed (even shorter version)
  const terminalLines = [
    "$ initialize",
    `> Loading ${userName}'s portfolio...`,
    "> Ready!"
  ];

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Type each character with a faster delay for better performance
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      // Complete faster
      setTimeout(() => {
        setComplete(true);
        setTimeout(() => {
          onComplete();
        }, 100);
      }, 300);
      return;
    }

    if (currentCharIndex < terminalLines[currentLineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 8); // Faster typing speed
      
      return () => clearTimeout(timeout);
    } else {
      // Move to next line faster
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, terminalLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 30); // Shorter pause between lines
      
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, terminalLines, onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Current partially typed line
  const currentLine = currentLineIndex < terminalLines.length
    ? terminalLines[currentLineIndex].substring(0, currentCharIndex)
    : '';

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ${complete ? 'opacity-0' : 'opacity-100'}`} style={{ zIndex: 9999 }}>
      <div className="w-full max-w-sm h-[25vh] mx-4 flex flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-xl animate-scale-in">
        {/* Terminal header */}
        <div className="flex items-center justify-between bg-gray-800 px-3 py-1 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-xs text-gray-300 font-mono">portfolio.exe</div>
          <div className="flex items-center">
            <button className="text-gray-400 hover:text-gray-300 p-1" onClick={onComplete}>
              <X size={12} />
            </button>
          </div>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="flex-1 bg-black font-mono text-green-500 p-3 overflow-y-auto text-sm"
        >
          {/* Previous completed lines */}
          {lines.map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))}
          
          {/* Current line being typed */}
          {currentLineIndex < terminalLines.length && (
            <div className="flex">
              <div>{currentLine}</div>
              {showCursor && (
                <div className="w-1.5 h-3.5 bg-green-500 ml-0.5 terminal-cursor"></div>
              )}
            </div>
          )}
        </div>
        
        {/* Skip button */}
        <div className="bg-gray-800 px-3 py-1 border-t border-gray-700 flex justify-end">
          <button 
            onClick={onComplete} 
            className="text-xs text-gray-400 hover:text-white flex items-center transition-colors"
          >
            Skip <ChevronRight size={12} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalIntro; 