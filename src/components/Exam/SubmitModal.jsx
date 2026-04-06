import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function SubmitModal({
  isOpen,
  onClose,
  onConfirm,
  total,
  answered,
  notAnswered,
  marked
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        background: '#0a1024',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '32px', width: '100%', maxWidth: '440px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ color: '#f8fafc', fontSize: '24px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
          Final Submission
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
          Please review your attempt summary before submitting.
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '16px', padding: '20px', marginBottom: '24px',
          display: 'flex', flexDirection: 'column', gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
            <span style={{ color: '#cbd5e1' }}>Total Questions</span>
            <span style={{ color: '#f8fafc', fontWeight: '600' }}>{total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
            <span style={{ color: '#10b981' }}>Answered</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>{answered}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
            <span style={{ color: '#ef4444' }}>Not Answered</span>
            <span style={{ color: '#ef4444', fontWeight: '600' }}>{notAnswered}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
            <span style={{ color: '#a855f7' }}>Marked for Review</span>
            <span style={{ color: '#a855f7', fontWeight: '600' }}>{marked}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '12px', background: 'transparent',
              color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', cursor: 'pointer', fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            Go Back
          </button>
          
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '12px', background: '#10b981',
              color: '#fff', border: 'none',
              borderRadius: '12px', cursor: 'pointer', fontWeight: '600',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
}
