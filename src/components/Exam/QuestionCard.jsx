import React from 'react';
import OptionsList from './OptionsList';

export default function QuestionCard({ question, index, total, selectedAnswer, onSelectAnswer }) {
  if (!question) return null;

  return (
    <div className="flex-1 rounded-2xl border border-white/5 bg-[#0a1024]/50 p-4 drop-shadow-xl md:p-8 flex flex-col h-full overflow-y-auto">
      {/* Progress Indicator */}
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs md:text-sm font-semibold text-blue-400">
          Question {index + 1} <span className="text-blue-500/50 hidden md:inline-block mx-1">/</span> <span className="opacity-70 text-xs hidden md:inline-block">{total}</span>
        </span>
        <span className="text-xs md:text-sm font-medium text-slate-400">Marks: 1.00</span>
      </div>

      {/* Question Text */}
      <div className="mb-2">
        <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-slate-100">
          <span className="mr-2 text-slate-500">Q{index + 1}.</span>
          {(() => {
            let t = question?.q || question?.text || question?.questionText || question?.content || "Question not available";
            if (typeof t === 'string') {
               t = t.replace(/^\[([TC])\]\s*Q\d+\.\s*/, '[$1] ');
            }
            return t;
          })()}
        </h2>
      </div>

      {/* Options */}
      <OptionsList 
        options={question.options} 
        selectedAnswer={selectedAnswer} 
        onSelectAnswer={onSelectAnswer} 
      />
    </div>
  );
}
