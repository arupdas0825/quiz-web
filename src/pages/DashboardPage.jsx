import { useState } from 'react'

const SUBJECTS = [
  { code:'DBMS',   name:'Database Management System', color:'#1a6cd4', icon:'🗄️'  },
  { code:'OOPS',   name:'Object Oriented Programming', color:'#7800b8', icon:'☕'  },
  { code:'PYTHON', name:'Python Programming',          color:'#b48200', icon:'🐍'  },
  { code:'C',      name:'C Programming',               color:'#c03010', icon:'⚙️'  },
  { code:'COA',    name:'Computer Org. & Architecture',color:'#008878', icon:'💻'  },
  { code:'DSA',    name:'Data Structures & Algorithms',color:'#b00050', icon:'🌳'  },
]

export default function DashboardPage({ navigate, student, setSubject, history }) {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div style={{
      minHeight:'100vh', display:'flex',
      background:'linear-gradient(135deg,#0b1228 0%,#12082e 100%)',
      fontFamily:'Arial,sans-serif'
    }}>

      {/* ══ SIDEBAR ══ */}
      <div style={{
        width:215, flexShrink:0,
        background:'rgba(255,255,255,0.04)',
        borderRight:'1px solid rgba(255,255,255,0.08)',
        display:'flex', flexDirection:'column'
      }}>

        {/* Logo */}
        <div style={{
          padding:'22px 20px 18px',
          borderBottom:'1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ color:'#6eb4ff', fontWeight:'bold', fontSize:16 }}>
            ⬡ &nbsp;ExamPortal
          </div>
        </div>

        {/* Student Info */}
        <div style={{
          padding:'16px 18px',
          borderBottom:'1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ color:'#fff', fontWeight:'bold', fontSize:13, marginBottom:5 }}>
            👤 {student?.name}
          </div>
          {[
            '🎫 ' + student?.roll,
            '📚 ' + student?.course,
            '📅 Sem ' + student?.semester,
          ].map(t => (
            <div key={t} style={{
              color:'rgba(160,175,215,0.85)',
              fontSize:11, marginBottom:3
            }}>{t}</div>
          ))}
        </div>

        {/* Menu */}
        <div style={{ flex:1 }}>
          {[
            { icon:'⊞', label:'Dashboard',     key:'dashboard' },
            { icon:'📊', label:'Score History', key:'history'   },
            { icon:'🏠', label:'Home',          key:'home'      },
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
                padding:'13px 20px', cursor:'pointer',
                background: activePage===m.key
                  ? 'rgba(100,160,255,0.12)' : 'transparent',
                borderLeft: activePage===m.key
                  ? '3px solid #6eb4ff' : '3px solid transparent',
                color: activePage===m.key ? '#fff' : 'rgba(160,175,210,0.85)',
                fontSize:13, fontWeight: activePage===m.key ? 'bold' : 'normal',
                transition:'all 0.2s'
              }}>
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          padding:'14px 18px',
          borderTop:'1px solid rgba(255,255,255,0.07)',
          color:'rgba(130,145,185,0.7)', fontSize:11
        }}>
          No negative marking<br/>Each answer = 1 mark
        </div>
      </div>

      {/* ══ MAIN AREA ══ */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'auto' }}>

        {/* Top Bar */}
        <div style={{
          padding:'16px 28px',
          background:'rgba(255,255,255,0.03)',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
          display:'flex', justifyContent:'space-between', alignItems:'center'
        }}>
          <span style={{ color:'#fff', fontWeight:'bold', fontSize:18 }}>
            ⊞ &nbsp;Dashboard
          </span>
          <span style={{ color:'rgba(140,155,195,0.8)', fontSize:12 }}>
            Today: {new Date().toDateString()}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding:'24px 28px', flex:1 }}>

          {/* Stat Cards */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',
            gap:14, marginBottom:28
          }}>
            {[
              { val:'6',  lbl:'Total Subjects',   color:'#1a7cdc', icon:'✦' },
              { val:'25', lbl:'Questions / Exam', color:'#14a050', icon:'?' },
              { val:'25', lbl:'Total Marks',      color:'#c87800', icon:'★' },
              { val:'30', lbl:'Minutes / Exam',   color:'#9900cc', icon:'⏱' },
            ].map(c => (
              <div key={c.lbl} style={{
                background:`linear-gradient(135deg,${c.color}cc,${c.color}55)`,
                borderRadius:16, padding:'16px 18px',
                display:'flex', justifyContent:'space-between',
                alignItems:'center'
              }}>
                <div>
                  <div style={{
                    color:'#fff', fontSize:30,
                    fontWeight:'bold', lineHeight:1
                  }}>{c.val}</div>
                  <div style={{
                    color:'rgba(220,230,255,0.85)',
                    fontSize:11, marginTop:5
                  }}>{c.lbl}</div>
                </div>
                <div style={{
                  fontSize:28,
                  color:'rgba(255,255,255,0.25)'
                }}>{c.icon}</div>
              </div>
            ))}
          </div>

          {/* Subject Section Label */}
          <div style={{
            color:'rgba(170,185,225,0.9)',
            fontWeight:'bold', fontSize:15, marginBottom:14
          }}>
            Select a Subject to Start Exam
          </div>

          {/* Subject Cards Grid */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',
            gap:14
          }}>
            {SUBJECTS.map(s => (
              <SubjectCard
                key={s.code}
                subject={s}
                onClick={() => {
                  if (window.confirm(
                    `Start exam: ${s.name}\n25 Questions · 25 Marks · 30 Minutes`
                  )) {
                    setSubject(s.code)
                    navigate('quiz')
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
        background: hovered
          ? `linear-gradient(135deg,${subject.color}ee,${subject.color}99)`
          : `linear-gradient(135deg,${subject.color}cc,${subject.color}66)`,
        borderRadius:18, padding:'18px 20px',
        cursor:'pointer',
        border: hovered
          ? '1.5px solid rgba(255,255,255,0.35)'
          : '1.5px solid rgba(255,255,255,0.12)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:'all 0.2s ease',
        boxShadow: hovered ? '0 10px 30px rgba(0,0,0,0.35)' : 'none'
      }}>

      <div style={{
        display:'flex', justifyContent:'space-between',
        alignItems:'center', marginBottom:10
      }}>
        <span style={{ fontSize:30 }}>{subject.icon}</span>
        <span style={{
          color:'#fff', fontWeight:'bold', fontSize:20
        }}>{subject.code}</span>
      </div>

      <div style={{
        color:'rgba(220,230,255,0.85)',
        fontSize:11, marginBottom:8
      }}>{subject.name}</div>

      <div style={{
        display:'flex', justifyContent:'space-between',
        alignItems:'center'
      }}>
        <span style={{
          color:'rgba(200,215,255,0.7)', fontSize:11
        }}>25 Q · 25 Marks</span>
        <span style={{
          color:'#fff', fontWeight:'bold', fontSize:12
        }}>
          {hovered ? 'Click to Start →' : 'Start Exam →'}
        </span>
      </div>
    </div>
  )
}