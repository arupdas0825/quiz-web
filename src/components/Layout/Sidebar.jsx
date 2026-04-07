import React from 'react';
import { LayoutDashboard, History, Home, Info } from 'lucide-react';

export default function Sidebar({ isOpen, activePage, navigate, student, history }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/icons.svg" alt="logo" className="logo-image" style={{ borderRadius: '8px' }} />
          <h1 className="logo-text" style={{ margin: 0, color: '#f8fafc' }}>
            Quiz<span className="logo-gradient">Portal</span>
          </h1>
        </div>
      </div>

      {/* Student Info */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ color: '#f8fafc', fontWeight: '600', fontSize: 14, marginBottom: 8 }}>
          Hello, {student?.name || 'Student'}
        </div>
        {[
          { label: student?.roll, icon: '🎫' },
          { label: student?.course, icon: '📚' },
          { label: `Sem ${student?.semester}`, icon: '📅' },
        ].map((t, idx) => (
          <div key={idx} style={{
            color: '#94a3b8',
            fontSize: 12, marginBottom: 6,
            display: 'flex', gap: 8, alignItems: 'center'
          }}>
            <span style={{ fontSize: 14 }}>{t.icon}</span> {t.label}
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{ flex: 1, padding: '16px 12px' }}>
        {[
          { icon: <LayoutDashboard size={18} />, label:'Dashboard',     key:'dashboard' },
          { icon: <History size={18} />,         label:'Score History', key:'history'   },
          { icon: <Home size={18} />,            label:'Home',          key:'home'      },
        ].map(m => (
          <div key={m.key}
            onClick={() => {
              if (m.key === 'home')    { navigate('welcome'); return }
              if (m.key === 'history') {
                if (!history.length) { alert('No records yet!'); return }
                navigate('history'); return
              }
              navigate(m.key)
            }}
            style={{
              display:'flex', alignItems:'center', gap:12,
              padding:'12px 16px', cursor:'pointer',
              borderRadius: '8px',
              background: activePage === m.key
                ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              color: activePage === m.key ? '#60a5fa' : '#94a3b8',
              fontSize: 14, fontWeight: activePage === m.key ? '600' : '500',
              transition:'all 0.2s ease',
              marginBottom: 4
            }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>{m.icon}</span>
            <span>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{
        padding: '20px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: '#64748b', fontSize: 12,
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <Info size={16} />
        <div>
          <div>No negative marking</div>
          <div style={{ marginTop: 2 }}>Each answer = 1 mark</div>
        </div>
      </div>
    </div>
  );
}
