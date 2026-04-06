import React from 'react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuestionCard({ 
  question, 
  index, 
  total, 
  selectedAnswer, 
  onSelectAnswer 
}) {
  return (
    <div style={{ width: '100%', maxWidth: '800px', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Question Header Card */}
      <div style={{
        background: '#0a1024',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        {/* Progress bar inside card */}
        <div style={{
          height: 4, background: '#1e293b',
          borderRadius: 4, marginBottom: 24, overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${((index + 1) / total) * 100}%`,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            borderRadius: 4, transition: 'width 0.4s ease'
          }}/>
        </div>
        
        <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px', fontWeight: '500' }}>
          Question {index + 1} of {total}
        </div>
        
        <div style={{ color: '#f8fafc', fontSize: '18px', fontWeight: '600', lineHeight: 1.6 }}>
          {question.q}
        </div>
      </div>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {question.options.map((opt, i) => {
          const isSelected = selectedAnswer === i;
          return (
            <div 
              key={i} 
              onClick={() => onSelectAnswer(i)} 
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '16px 24px', borderRadius: '12px', cursor: 'pointer',
                background: isSelected ? 'rgba(59, 130, 246, 0.1)' : '#0a1024',
                border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.05)',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
              }}
              onMouseOver={e => {
                if (!isSelected) {
                  e.currentTarget.style.background = '#1e293b';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseOut={e => {
                if (!isSelected) {
                  e.currentTarget.style.background = '#0a1024';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                }
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isSelected ? '#2563eb' : '#1e293b',
                color: isSelected ? '#fff' : '#cbd5e1',
                fontWeight: '600', fontSize: '14px',
                transition: 'background 0.2s'
              }}>
                {LETTERS[i]}
              </div>
              <span style={{ color: isSelected ? '#fff' : '#cbd5e1', fontSize: '15px' }}>
                {opt}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  );
}
