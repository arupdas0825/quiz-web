import React from 'react';

export default function ExamLayout({ header, leftContent, rightContent }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#050a18] font-sans selection:bg-blue-500/30">
      {/* Top Header */}
      {header}

      {/* Main Content Area */}
      {/* Container is flex-col on mobile, grid on large screens */}
      <main className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-8 p-4 md:p-6 lg:p-8">
        
        {/* Left Pane (Questions, Controls) */}
        <div className="flex h-full flex-col relative pb-32 md:pb-0">
          {leftContent}
        </div>

        {/* Right Pane (Navigator Desktop) */}
        <div className="hidden lg:block relative">
          {rightContent}
        </div>
      </main>
    </div>
  );
}
