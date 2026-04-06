import { Trophy, FileText, Download, RotateCcw, Home, Clock } from 'lucide-react'

export default function ResultPage({ navigate, student, result }) {
  if (!result) { navigate('welcome'); return null }

  const pct = parseFloat(result.percentage)
  const isPass = result.gradePoint > 0;
  
  const barColor =
    pct >= 80 ? '#10b981' :
    pct >= 50 ? '#eab308' : '#ef4444'

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050a18',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', fontFamily: 'Inter, sans-serif',
      color: '#f8fafc'
    }}>

      <div style={{
        width: '100%', maxWidth: 540,
        background: '#0a1024',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        borderRadius: 24, padding: '40px'
      }}>

        {/* Title */}
        <div style={{
          textAlign: 'center', marginBottom: 32
        }}>
          <div style={{ 
            background: isPass ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: isPass ? '#10b981' : '#ef4444',
            width: 80, height: 80, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: `0 0 0 8px ${isPass ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)'}`
          }}>
            <Trophy size={40} />
          </div>
          <h2 style={{
            fontSize: 24, fontWeight: '700', marginBottom: 8
          }}>Exam Completed</h2>
          <div style={{
            color: '#94a3b8', fontSize: 14
          }}>Here is your performance summary</div>
        </div>

        {/* Student Info */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 16, padding: '16px 20px',
          marginBottom: 24
        }}>
          {[
            ['Student',  result.studentName],
            ['Roll No',  result.rollNumber],
            ['Subject',  result.subject],
            ['Date',     new Date(result.dateTime).toLocaleDateString()],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: lbl !== 'Date' ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
              <span style={{
                color: '#94a3b8', fontSize: 13, fontWeight: '500'
              }}>{lbl}</span>
              <span style={{
                color: '#f8fafc', fontSize: 13, fontWeight: '600'
              }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Score Bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: 10
          }}>
            <span style={{ color: '#e2e8f0', fontSize: 14, fontWeight: '600' }}>
              Final Score
            </span>
            <span style={{
              color: barColor, fontWeight: '700', fontSize: 14
            }}>
              {result.score} / {result.total} &nbsp;({result.percentage}%)
            </span>
          </div>
          <div style={{
            height: 8, background: 'rgba(255,255,255,0.05)',
            borderRadius: 4, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: barColor,
              borderRadius: 4,
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          </div>
        </div>

        {/* Grade Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 16, marginBottom: 32
        }}>
          {[
            { lbl: 'Grade',       val: result.grade,      color: '#eab308' },
            { lbl: 'Grade Point', val: result.gradePoint, color: '#8b5cf6' },
            { lbl: 'Status',      val: isPass ? 'PASS' : 'FAIL',
              color: isPass ? '#10b981' : '#ef4444' },
          ].map(c => (
            <div key={c.lbl} style={{
              background: `${c.color}10`,
              border: `1px solid ${c.color}30`,
              borderRadius: 16, padding: '16px 8px',
              textAlign: 'center'
            }}>
              <div style={{
                color: c.color, fontSize: 24,
                fontWeight: '700', lineHeight: 1
              }}>{c.val}</div>
              <div style={{
                color: '#94a3b8',
                fontSize: 12, marginTop: 8, fontWeight: '500'
              }}>{c.lbl}</div>
            </div>
          ))}
        </div>

        {/* Remark */}
        <div style={{
          textAlign: 'center',
          color: isPass ? '#34d399' : '#f87171',
          fontSize: 15, fontWeight: '500',
          marginBottom: 32,
          padding: '12px',
          background: isPass ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
          borderRadius: '12px'
        }}>
          {result.remark}
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <button 
            onClick={() => navigate('review')}
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#f8fafc',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '14px', borderRadius: '12px', fontSize: 14, fontWeight: '600',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <FileText size={18} /> Review Answers
          </button>
          
          <button 
            onClick={() => navigate('certificate')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#fff',
              border: 'none', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              padding: '14px', borderRadius: '12px', fontSize: 14, fontWeight: '600',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Download size={18} /> Certificate
          </button>

          <button 
            onClick={() => navigate('history')}
            style={{
              background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)',
              padding: '12px', borderRadius: '12px', fontSize: 13, fontWeight: '600',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'color 0.2s', marginTop: '4px'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <Clock size={16} /> History
          </button>

          <button 
            onClick={() => navigate('dashboard')}
            style={{
              background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)',
              padding: '12px', borderRadius: '12px', fontSize: 13, fontWeight: '600',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'color 0.2s', marginTop: '4px'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <Home size={16} /> Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}