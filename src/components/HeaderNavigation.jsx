import React, { useEffect } from 'react';
import { ArrowLeft, LayoutDashboard, Sun, Moon } from 'lucide-react';
import QuizPortalLogo from './QuizPortalLogo';
import { useTheme } from '../context/ThemeContext';

export default function HeaderNavigation({ title, navigate, showBack = true, showDashboard = true }) {
  const { theme, toggleTheme } = useTheme();

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
      background: 'var(--bg-primary, rgba(10, 16, 36, 0.85))',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
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
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '14px', fontWeight: '500',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.background = 'rgba(128, 128, 128, 0.1)';
              e.currentTarget.style.transform = 'translate(-2px, 0)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
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
        <QuizPortalLogo theme={theme} size="sm" />
        <div style={{ 
          color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px', fontWeight: '500'
        }}>
          {title}
        </div>
      </div>

      {/* Right side: Dashboard CTA & Theme Toggle */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(128, 128, 128, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

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
