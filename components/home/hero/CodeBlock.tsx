'use client'
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Copy, Check, RotateCcw } from "lucide-react";

const AnimatedCodeBlockDemo = () => {
  const COLORS = {
    keyword: "#f97583",    // const, return, string
    default: "#e1e4e8",    // white text, operators, punctuation
    string: "#9ecbff",     // strings and template literals
    function: "#b392f0",   // function calls
    property: "#79b8ff"    // object properties
  };

  const codeTokens = [
    ["const", "keyword"], [" "], ["greet"], [" "], ["="], [" "], ["("], ["name"], [":"], [" "], 
    ["string", "keyword"], [")"], [" "], ["=>"], [" "], ["{"], ["\n"], ["  "], 
    ["return", "keyword"], [" "], ["`Welcome, ${name}! 👋`", "string"], [";"], ["\n"], 
    ["}"], [";"], ["\n"], ["\n"], 
    ["const", "keyword"], [" "], ["user"], [" "], ["="], [" "], ['"Developer"', "string"], [";"], ["\n"], 
    ["const", "keyword"], [" "], ["message"], [" "], ["="], [" "], ["greet", "function"], ["("], ["user"], [")"], [";"], ["\n"], ["\n"], 
    ["console", "function"], ["."], ["log", "property"], ["("], ["message"], [")"], [";"]
  ].map(([text, colorKey = "default"]) => ({ 
    text, 
    color: COLORS[colorKey as keyof typeof COLORS] 
  }));

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalChars = codeTokens.reduce((acc, token) => acc + token.text.length, 0);
  const plainCode = codeTokens.map(token => token.text).join('');

  // Animation logic
  useEffect(() => {
    if (isPlaying && currentPosition < totalChars) {
      timerRef.current = setTimeout(() => {
        setCurrentPosition(prev => prev + 1);
      }, 50);
    } else if (currentPosition >= totalChars && isPlaying) {
      setIsPlaying(false);
      setCompleted(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentPosition, totalChars]);

  const togglePlay = () => {
    if (completed) {
      setCurrentPosition(0);
      setCompleted(false);
    }
    setIsPlaying(!isPlaying);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(plainCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const renderVisibleCode = () => {
    if (completed) {
      return codeTokens.map((token, i) => (
        <span key={i} style={{ color: token.color }}>
          {token.text}
        </span>
      ));
    }

    const result = [];
    let charCount = 0;
    let showCursor = false;
    const cursorInserted = false;

    for (let i = 0; i < codeTokens.length; i++) {
      const token = codeTokens[i];
      const tokenEndPos = charCount + token.text.length;

      if (currentPosition >= tokenEndPos) {
        result.push(
          <span key={i} style={{ color: token.color }}>
            {token.text}
          </span>
        );
        charCount = tokenEndPos;
      } else if (currentPosition > charCount) {
        const visibleChars = currentPosition - charCount;
        result.push(
          <span key={i} style={{ color: token.color }}>
            {token.text.slice(0, visibleChars)}
          </span>
        );
        showCursor = true;
        break;
      } else {
        showCursor = true;
        break;
      }
    }
    if (showCursor && !cursorInserted && isPlaying) {
      result.push(
        <span key="cursor" className="inline-block w-2 h-5 bg-blue-400 ml-0.5 animate-fade" />
      );
    }

    return result;
  };

  const lines = plainCode.split('\n');
  const progress = Math.min(100, (currentPosition / totalChars) * 100);

  return (
    <div className="w-[350px] scale-80 mx-auto bg-zinc-950/50 rounded-sm overflow-hidden border border-zinc-800 shadow-xl">
      <div className="flex items-center justify-between p-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-zinc-300 text-sm font-medium">welcome.ts</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-300 transition-colors"
            title={isPlaying ? "Pause" : completed ? "Restart" : "Play"}
          >
            {completed ? <RotateCcw size={16} /> : isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            onClick={copyCode}
            className={`p-1.5 rounded hover:bg-zinc-800 text-zinc-300 transition-colors ${copied ? 'bg-green-600' : ''}`}
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="h-0.5 bg-zinc-800">
        <div 
          className="h-full bg-blue-500 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex bg-zinc-950/50 text-zinc-100">
        <div className="py-4 px-3 text-right text-zinc-500 text-md font-mono bg-zinc-900 border-r border-zinc-800 select-none">
          {lines.map((_, i) => (
            <div key={i} className="h-6 leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex-1 py-4 px-4 font-mono text-sm overflow-x-auto">
          <div className="whitespace-pre leading-5">
            {renderVisibleCode()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCodeBlockDemo;