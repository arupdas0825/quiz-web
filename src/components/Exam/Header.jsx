import React from 'react';
import Timer from './Timer';

export default function Header({ subject, studentName, remainingTime, handleTick, handleTimeUp, onQuit }) {
  return (
    <header className="sticky top-0 z-40 flex h-auto min-h-[60px] md:h-[70px] w-full items-center justify-between border-b border-white/5 bg-[#0a1024]/80 px-4 md:px-8 py-2 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
        <span className="text-base md:text-lg font-bold text-slate-50">{subject || 'EXAM'}</span>
        <span className="text-xs md:text-sm text-slate-400">
          Candidate: <span className="font-medium text-slate-200">{studentName || 'Student'}</span>
        </span>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <Timer initialTimeLeft={remainingTime} onTick={handleTick} onTimeUp={handleTimeUp} />
        <button 
          onClick={onQuit}
          className="rounded-lg border border-red-500/40 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#0a1024]"
        >
          Quit
        </button>
      </div>
    </header>
  );
}
