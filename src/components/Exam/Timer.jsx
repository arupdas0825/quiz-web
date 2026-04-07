import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Timer({ initialTimeLeft, onTimeUp, onTick }) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        const updated = prev - 1;
        onTick(updated);
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, onTick]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  
  let status = 'safe'; // Green > 5min
  if (timeLeft < 120) status = 'danger'; // Red < 2min
  else if (timeLeft < 300) status = 'warning'; // Yellow < 5min

  const colorClasses = {
    safe: 'text-emerald-500 border-emerald-500/40 stroke-emerald-500',
    warning: 'text-yellow-500 border-yellow-500/40 stroke-yellow-500',
    danger: 'text-red-500 border-red-500/40 stroke-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
  };

  return (
    <div className={twMerge(
      "flex items-center gap-2 rounded-xl border bg-white/5 px-2 py-1 md:px-4 md:py-2 transition-all duration-300",
      colorClasses[status]
    )}>
      <Clock size={18} className={colorClasses[status].split(' ').find(c => c.startsWith('stroke-'))} />
      <span className="font-mono text-sm md:text-lg font-bold tracking-widest">
        {mins}:{secs}
      </span>
    </div>
  );
}
