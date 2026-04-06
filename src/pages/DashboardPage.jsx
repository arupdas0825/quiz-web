import React, { useState } from 'react'
import { Database, Coffee, MonitorPlay, Settings, Cpu, Network, LayoutDashboard, History, Home, Info, BookOpen, Clock, Target } from 'lucide-react'

const SUBJECTS = [
  { code:'DBMS',   name:'Database Management System', color:'#3b82f6', icon: <Database size={28} /> },
  { code:'OOPS',   name:'Object Oriented Programming', color:'#8b5cf6', icon: <Coffee size={28} /> },
  { code:'PYTHON', name:'Python Programming',          color:'#eab308', icon: <MonitorPlay size={28} /> },
  { code:'C',      name:'C Programming',               color:'#ef4444', icon: <Settings size={28} /> },
  { code:'COA',    name:'Computer Org. & Architecture',color:'#10b981', icon: <Cpu size={28} /> },
  { code:'DSA',    name:'Data Structures & Algorithms',color:'#ec4899', icon: <Network size={28} /> },
]

export default function DashboardPage({ navigate, student, setSubject, history }) {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div style={{
      minHeight:'100vh', display:'flex',
      background:'#050a18',
      fontFamily:'Inter, sans-serif'
    }}>

      {/* ══ SIDEBAR ══ */}
      <div style={{
        width: 260, flexShrink:0,
        background: '#0a1024',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column'
      }}>

        {/* Logo */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ color: '#e2e8f0', fontWeight: '700', fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: 6, borderRadius: 8}}>
              <LayoutDashboard size={20} color="#fff" />
            </div>
            QuizPortal
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
                setActivePage(m.key)
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

      {/* ══ MAIN AREA ══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

        {/* Top Bar */}
        <div style={{
          padding: '24px 40px',
          background: 'rgba(10, 16, 36, 0.6)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ color: '#f1f5f9', fontWeight: '600', fontSize: 20 }}>
            Dashboard
          </span>
          <span style={{ color: '#94a3b8', fontSize: 14, background: '#1e293b', padding: '6px 12px', borderRadius: 20 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '32px 40px', flex: 1 }}>

          {/* Stat Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(140px, 1fr))',
            gap: 20, marginBottom: 36
          }}>
            {[
              { val: '6',  lbl: 'Subjects',       color: '#3b82f6', icon: <BookOpen size={24} /> },
              { val: '25', lbl: 'Questions/Exam', color: '#10b981', icon: <Target size={24} /> },
              { val: '25', lbl: 'Total Marks',    color: '#eab308', icon: <Info size={24} /> },
              { val: '10', lbl: 'Minutes/Exam',   color: '#8b5cf6', icon: <Clock size={24} /> },
            ].map(c => (
              <div key={c.lbl} style={{
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 16, padding: '20px',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div>
                  <div style={{
                    color: '#f8fafc', fontSize: 28,
                    fontWeight: '700', lineHeight: 1
                  }}>{c.val}</div>
                  <div style={{
                    color: '#94a3b8',
                    fontSize: 13, marginTop: 6, fontWeight: '500'
                  }}>{c.lbl}</div>
                </div>
                <div style={{
                  background: `${c.color}15`,
                  color: c.color,
                  padding: 12,
                  borderRadius: 12
                }}>
                  {c.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Subject Section Label */}
          <div style={{
            color: '#e2e8f0',
            fontWeight: '600', fontSize: 18, marginBottom: 20
          }}>
            Select a Subject to Start Exam
          </div>

          {/* Subject Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20
          }}>
            {SUBJECTS.map(s => (
              <SubjectCard
                key={s.code}
                subject={s}
                onClick={() => {
                  if (window.confirm(
                    `Start exam: ${s.name}\n25 Questions · 25 Marks · 10 Minutes`
                  )) {
                    localStorage.removeItem('examState');
                    setSubject(s.code);
                    navigate('quiz');
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SubjectCard({ subject, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#1e293b' : '#0f172a',
        borderRadius: 16, padding: '24px',
        cursor: 'pointer',
        border: hovered
          ? `1px solid ${subject.color}80`
          : '1px solid rgba(255,255,255,0.05)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: hovered ? `0 12px 24px -10px ${subject.color}40` : '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16
      }}>
        <div style={{
          background: `${subject.color}15`,
          color: subject.color,
          padding: 12, borderRadius: 12
        }}>
          {subject.icon}
        </div>
        <span style={{
          color: '#f8fafc', fontWeight: '700', fontSize: 18,
          background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: 8
        }}>{subject.code}</span>
      </div>

      <div style={{
        color: '#cbd5e1',
        fontSize: 15, fontWeight: '500', marginBottom: 16,
        lineHeight: 1.4
      }}>{subject.name}</div>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: 16
      }}>
        <span style={{
          color: '#94a3b8', fontSize: 12, fontWeight: '500'
        }}>25 Q · 25 Marks</span>
        <span style={{
          color: hovered ? subject.color : '#cbd5e1', 
          fontWeight: '600', fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 4,
          transition: 'color 0.2s ease'
        }}>
          {hovered ? 'Start Exam' : 'Start'} &rarr;
        </span>
      </div>
    </div>
  )
}