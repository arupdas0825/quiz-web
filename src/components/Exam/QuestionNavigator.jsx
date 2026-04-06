import React from 'react';

export default function QuestionNavigator({ 
  total, 
  current, 
  onSelect, 
  visited, 
  answers, 
  marked 
}) {
  return (
    <div style={{
      background: '#0a1024',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex', flexDirection: 'column'
    }}>
      <h3 style={{ color: '#e2e8f0', fontSize: '16px', marginBottom: '16px', fontWeight: '600' }}>
        Question Navigator
      </h3>

      {/* Status Legend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', fontSize: '13px', color: '#cbd5e1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: '#1e293b' }} /> Not Visited
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: '#ef4444' }} /> Not Answered
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: '#10b981' }} /> Answered
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: '#a855f7' }} /> Marked
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }} />

      {/* Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px',
        maxHeight: '300px', overflowY: 'auto', paddingRight: '8px'
      }}>
        {Array.from({ length: total }).map((_, i) => {
          const isCurrent = i === current;
          const isVisited = visited.includes(i);
          const isAnswered = answers[i] !== -1;
          const isMarked = marked.includes(i);

          let bg = '#1e293b'; // default (not visited)
          let color = '#94a3b8';

          if (isMarked) {
             bg = '#a855f7'; // Purple
             color = '#fff';
          } else if (isAnswered) {
             bg = '#10b981'; // Green
             color = '#fff';
          } else if (isVisited) {
             bg = '#ef4444'; // Red
             color = '#fff';
          }

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              title={
                isMarked ? "Marked for Review"
                : isAnswered ? "Answered"
                : isVisited ? "Not Answered"
                : "Not Visited"
              }
              style={{
                aspectRatio: '1/1',
                borderRadius: '8px',
                border: isCurrent ? '2px solid #fff' : '2px solid transparent',
                background: bg,
                color: color,
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: isCurrent ? '0 0 10px rgba(255,255,255,0.2)' : 'none'
              }}
              onMouseOver={(e) => e.target.style.filter = 'brightness(1.2)'}
              onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
