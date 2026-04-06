import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function Timer({ initialTimeLeft, onTimeUp, onTick }) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    // We update local state every second
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
  
  let color = '#10b981'; // Green > 5min
  if (timeLeft < 120) color = '#ef4444'; // Red < 2min
  else if (timeLeft < 300) color = '#eab308'; // Yellow < 5min

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      background: 'rgba(255,255,255,0.05)',
      padding: '8px 16px', borderRadius: '12px',
      border: `1px solid ${color}40`,
      boxShadow: timeLeft < 120 ? `0 0 15px ${color}40` : 'none',
      transition: 'all 0.3s'
    }}>
      <Clock size={18} color={color} />
      <span style={{
        fontFamily: 'monospace',
        fontSize: '20px', fontWeight: '700', color: color,
        letterSpacing: '2px'
      }}>
        {mins}:{secs}
      </span>
    </div>
  );
}
