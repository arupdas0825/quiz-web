import React from 'react';
import { ChevronLeft, ChevronRight, Bookmark, ArrowRight, CheckCircle } from 'lucide-react';

export default function ActionBar({
  isFirst,
  isLast,
  onPrev,
  onSaveNext,
  onMarkNext,
  onSubmit,
}) {
  return (
    <div className="sticky bottom-0 z-40 bg-[#050a18] md:bg-transparent border-t border-white/5 md:border-none p-4 md:p-0 mt-4 md:mt-8 w-full flex items-center justify-between gap-2 md:gap-4 flex-wrap md:flex-nowrap">
      
      {/* Mobile-only action bar wrapper needs different handling, but flex wrap works seamlessly */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="flex min-w-[48px] items-center justify-center rounded-xl bg-slate-800 p-3 md:px-5 font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 flex-1 md:flex-none active:scale-[0.98]"
      >
        <ChevronLeft size={20} className="md:mr-2" />
        <span className="hidden md:inline">Previous</span>
      </button>

      <div className="flex w-full md:w-auto items-center gap-2 md:gap-4 order-first md:order-none mb-3 md:mb-0">
        <button
          onClick={onMarkNext}
          className="flex flex-1 md:flex-none items-center justify-center rounded-xl bg-[#2e1065]/50 border border-purple-500/30 p-3 md:px-6 font-medium text-purple-300 transition hover:bg-[#3b0764]/80 active:scale-[0.98]"
        >
          <Bookmark size={18} className="mr-2" />
          Mark <span className="hidden md:inline ml-1">for Review</span>
        </button>

        {!isLast ? (
          <button
            onClick={onSaveNext}
            className="flex flex-1 md:flex-none items-center justify-center rounded-xl bg-blue-600 p-3 md:px-8 font-semibold text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition hover:bg-blue-500 active:scale-[0.98]"
          >
            Save & Next
            <ChevronRight size={20} className="ml-2 hidden md:block" />
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="flex flex-1 md:flex-none items-center justify-center rounded-xl bg-emerald-600 p-3 md:px-8 font-semibold text-white shadow-[0_0_15px_rgba(5,150,105,0.3)] transition hover:bg-emerald-500 active:scale-[0.98]"
          >
            Submit Exam
            <CheckCircle size={18} className="ml-2 hidden md:block" />
          </button>
        )}
      </div>
    </div>
  );
}
