export default function ResultPage({ navigate, student, result }) {
  if (!result) { navigate('welcome'); return null }

  const pct = parseFloat(result.percentage)
  const barColor =
    pct >= 80 ? '#14c060' :
    pct >= 50 ? '#f0a020' : '#e03030'

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#08102a 0%,#160830 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', fontFamily: 'Arial,sans-serif',
      animation: 'fadeIn 0.5s ease'
    }}>

      <div style={{
        width: '100%', maxWidth: 520,
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 24, padding: '36px 38px'
      }}>

        {/* Title */}
        <div style={{
          textAlign: 'center', marginBottom: 24
        }}>
          <div style={{ fontSize: 38, marginBottom: 6 }}>🎉</div>
          <h2 style={{
            color: '#fff', fontSize: 22,
            fontWeight: 'bold', marginBottom: 4
          }}>Exam Result</h2>
          <div style={{
            height: 1,
            background: 'rgba(255,255,255,0.12)',
            marginTop: 14
          }} />
        </div>

        {/* Student Info */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 12, padding: '14px 18px',
          marginBottom: 20
        }}>
          {[
            ['Student',  result.studentName],
            ['Roll No',  result.rollNumber],
            ['Course',   result.course],
            ['Subject',  result.subject],
            ['Date',     result.dateTime],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '5px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span style={{
                color: 'rgba(170,185,225,0.75)', fontSize: 12
              }}>{lbl}</span>
              <span style={{
                color: '#fff', fontSize: 12, fontWeight: 'bold'
              }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Score Bar */}
        <div style={{ marginBottom: 22 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: 7
          }}>
            <span style={{ color: 'rgba(180,200,255,0.8)', fontSize: 13 }}>
              Score
            </span>
            <span style={{
              color: '#fff', fontWeight: 'bold', fontSize: 13
            }}>
              {result.score} / {result.total} &nbsp;({result.percentage}%)
            </span>
          </div>
          <div style={{
            height: 10, background: 'rgba(255,255,255,0.12)',
            borderRadius: 6, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: barColor,
              borderRadius: 6,
              transition: 'width 1s ease'
            }} />
          </div>
        </div>

        {/* Grade Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12, marginBottom: 22
        }}>
          {[
            { lbl: 'Grade',       val: result.grade,      color: '#f0a020' },
            { lbl: 'Grade Point', val: result.gradePoint + '/10', color: '#a060ff' },
            { lbl: 'Result',      val: result.gradePoint > 0 ? 'PASS' : 'FAIL',
              color: result.gradePoint > 0 ? '#14c060' : '#e03030' },
          ].map(c => (
            <div key={c.lbl} style={{
              background: 'rgba(255,255,255,0.07)',
              border: `1.5px solid ${c.color}55`,
              borderRadius: 12, padding: '14px 8px',
              textAlign: 'center'
            }}>
              <div style={{
                color: c.color, fontSize: 22,
                fontWeight: 'bold', lineHeight: 1
              }}>{c.val}</div>
              <div style={{
                color: 'rgba(180,195,230,0.7)',
                fontSize: 11, marginTop: 5
              }}>{c.lbl}</div>
            </div>
          ))}
        </div>

        {/* Remark */}
        <div style={{
          textAlign: 'center',
          color: 'rgba(180,255,200,0.9)',
          fontSize: 15, fontStyle: 'italic',
          marginBottom: 26
        }}>
          {result.remark}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn-glass" onClick={() => navigate('dashboard')}
            style={{
              background: 'linear-gradient(135deg,#1a7cdc,#0a4a9a)',
              width: '100%', padding: '13px', fontSize: 14,
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
            🔄 &nbsp;Retake Exam
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-glass" onClick={() => navigate('history')}
              style={{
                background: 'rgba(120,0,180,0.55)',
                flex: 1, padding: '12px', fontSize: 13,
                border: '1px solid rgba(180,80,255,0.3)'
              }}>
              📊 History
            </button>
            <button className="btn-glass" onClick={() => navigate('welcome')}
              style={{
                background: 'rgba(20,160,60,0.55)',
                flex: 1, padding: '12px', fontSize: 13,
                border: '1px solid rgba(80,220,120,0.3)'
              }}>
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}