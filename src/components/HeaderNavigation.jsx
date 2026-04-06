import React, { useEffect } from 'react';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function HeaderNavigation({ title, navigate, showBack = true, showDashboard = true }) {
  // Optional keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showBack) {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, showBack]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10, 16, 36, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
    }}>
      {/* Left side: Back Button */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            title="Go back (Esc)"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: '500',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translate(-2px, 0)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </div>

      {/* Center: Title / Breadcrumb */}
      <div style={{ flex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ 
          color: '#f8fafc', fontSize: '18px', fontWeight: '700', 
          margin: 0, letterSpacing: '0.5px' 
        }}>
          {title}
        </h1>
        <div style={{ 
          color: '#64748b', fontSize: '12px', marginTop: '4px', fontWeight: '500'
        }}>
          Dashboard <span style={{ opacity: 0.5 }}>/</span> Score History
        </div>
      </div>

      {/* Right side: Dashboard CTA */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {showDashboard && (
          <button
            onClick={() => navigate('dashboard')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            Dashboard <LayoutDashboard size={16} />
          </button>
        )}
      </div>
    </header>
  );
}
