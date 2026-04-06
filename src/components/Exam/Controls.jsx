import React from 'react';
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle } from 'lucide-react';

export default function Controls({
  onPrev,
  onSaveNext,
  onMarkNext,
  onSubmit,
  isFirst,
  isLast
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.05)',
      marginTop: 'auto', width: '100%', maxWidth: '800px', flexWrap: 'wrap', gap: '12px'
    }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onPrev}
          disabled={isFirst}
          style={{
            background: isFirst ? 'transparent' : 'rgba(255,255,255,0.05)',
            color: isFirst ? '#475569' : '#e2e8f0',
            border: isFirst ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.1)',
            padding: '12px 20px', borderRadius: '8px', cursor: isFirst ? 'not-allowed' : 'pointer',
            fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => { if(!isFirst) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          onMouseOut={e => { if(!isFirst) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
        >
          <ArrowLeft size={16} /> Previous
        </button>

        <button
          onClick={onMarkNext}
          style={{
            background: 'rgba(168, 85, 247, 0.1)',
            color: '#a855f7',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            padding: '12px 20px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'}
        >
          <Bookmark size={16} /> Mark for Review & Next
        </button>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        {!isLast ? (
          <button
            onClick={onSaveNext}
            style={{
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              padding: '12px 28px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Save & Next <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={onSaveNext}
            style={{
              background: '#10b981',
              color: '#fff',
              border: 'none',
              padding: '12px 28px', borderRadius: '8px', cursor: 'pointer',
              fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Save Latest
          </button>
        )}

        <button
          onClick={onSubmit}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            border: 'none',
            padding: '12px 28px', borderRadius: '8px', cursor: 'pointer',
            fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
          }}
          onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
        >
          Submit Exam <CheckCircle size={16} />
        </button>
      </div>
    </div>
  );
}
