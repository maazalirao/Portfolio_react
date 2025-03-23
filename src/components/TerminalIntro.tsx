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

  // Terminal lines to be displayed (shorter version)
  const terminalLines = [
    "$ sudo initialize-portfolio",
    "> ACCESS GRANTED. Welcome aboard! 🚀",
    `> Initializing ${userName}'s profile...`,
    "> Launching in 3...2...1...",
  ];

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Type each character with a fixed delay for better performance
  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      setTimeout(() => {
        setComplete(true);
        setTimeout(() => {
          onComplete();
        }, 200);
      }, 500);
      return;
    }

    if (currentCharIndex < terminalLines[currentLineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 15); // Fixed typing speed
      
      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, terminalLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 50); // Fixed pause between lines
      
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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-300 ${complete ? 'opacity-0' : 'opacity-100'}`} style={{ zIndex: 9999 }}>
      <div className="w-full max-w-md h-[40vh] mx-4 flex flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-xl animate-scale-in">
        {/* Terminal header */}
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-xs text-gray-300 font-mono">portfolio.exe</div>
          <div className="flex items-center">
            <button className="text-gray-400 hover:text-gray-300 p-1">
              <Minimize size={14} />
            </button>
            <button className="text-gray-400 hover:text-gray-300 p-1">
              <Maximize size={14} />
            </button>
            <button className="text-gray-400 hover:text-gray-300 p-1" onClick={onComplete}>
              <X size={14} />
            </button>
          </div>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="flex-1 bg-black font-mono text-green-500 p-4 overflow-y-auto"
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
                <div className="w-2 h-4 bg-green-500 ml-1 terminal-cursor"></div>
              )}
            </div>
          )}
        </div>
        
        {/* Skip button */}
        <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex justify-end">
          <button 
            onClick={onComplete} 
            className="text-xs text-gray-400 hover:text-white flex items-center transition-colors"
          >
            Skip <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalIntro; 