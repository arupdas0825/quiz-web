import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function OptionsList({ options, selectedAnswer, onSelectAnswer }) {
  return (
    <div className="flex flex-col gap-3 md:gap-4 mt-6">
      {options.map((opt, i) => {
        const isSelected = selectedAnswer === i;
        return (
          <button
            key={i}
            onClick={() => onSelectAnswer(i)}
            className={twMerge(
              "flex min-h-[48px] md:min-h-[56px] w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.99]",
              isSelected 
                ? "border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/50" 
                : "border-white/10 bg-[#0f172a] hover:border-white/30 hover:bg-white/5"
            )}
          >
            <div
              className={twMerge(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                isSelected
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-white/20 text-slate-400"
              )}
            >
              {String.fromCharCode(65 + i)}
            </div>
            <span className={twMerge(
              "text-sm md:text-base leading-relaxed",
              isSelected ? "text-blue-50 font-medium" : "text-slate-300"
            )}>
              {opt}
            </span>
          </button>
        );
      })}
    </div>
  );
}
