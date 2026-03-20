export default function HistoryPage({ navigate, history }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#080f28 0%,#140830 100%)',
      fontFamily: 'Arial,sans-serif',
      display: 'flex', flexDirection: 'column'
    }}>

      {/* NAVBAR */}
      <div style={{
        background: 'rgba(0,0,0,0.40)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        padding: '14px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{
          color: '#6eb4ff', fontWeight: 'bold', fontSize: 16
        }}>
          📊 &nbsp;Score History
        </span>

        {/* ── Navigation Buttons ── */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('dashboard')}
            style={{
              background: 'rgba(100,160,255,0.15)',
              padding: '7px 18px', fontSize: 13,
              border: '1px solid rgba(100,160,255,0.35)',
              borderRadius: 8, color: '#6eb4ff',
              cursor: 'pointer', fontWeight: 'bold'
            }}>
            ← Dashboard
          </button>
          <button onClick={() => navigate('welcome')}
            style={{
              background: 'rgba(255,255,255,0.10)',
              padding: '7px 18px', fontSize: 13,
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, color: '#fff',
              cursor: 'pointer'
            }}>
            🏠 Home
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1, padding: '28px 24px',
        animation: 'fadeIn 0.5s ease'
      }}>

        {history.length === 0 ? (
          <div style={{
            textAlign: 'center', marginTop: 80,
            color: 'rgba(160,175,215,0.6)', fontSize: 16
          }}>
            No exam records yet!<br/>
            <span style={{ fontSize: 13 }}>Give an exam first.</span>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: 12, marginBottom: 28
            }}>
              {[
                {
                  lbl: 'Total Exams',
                  val: history.length,
                  color: '#1a7cdc'
                },
                {
                  lbl: 'Best Score',
                  val: Math.max(...history.map(h => h.score)) + '/25',
                  color: '#14c060'
                },
                {
                  lbl: 'Avg Score',
                  val: (history.reduce((s,h) => s + h.score, 0) / history.length)
                        .toFixed(1),
                  color: '#f0a020'
                },
              ].map(c => (
                <div key={c.lbl} style={{
                  background: `linear-gradient(135deg,${c.color}aa,${c.color}44)`,
                  borderRadius: 14, padding: '14px 22px',
                  minWidth: 140
                }}>
                  <div style={{
                    color: '#fff', fontSize: 26,
                    fontWeight: 'bold'
                  }}>{c.val}</div>
                  <div style={{
                    color: 'rgba(220,235,255,0.8)',
                    fontSize: 11, marginTop: 4
                  }}>{c.lbl}</div>
                </div>
              ))}
            </div>

            {/* History Cards */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12
            }}>
              {[...history].reverse().map((r, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 16, padding: '18px 22px',
                  display: 'flex', flexWrap: 'wrap',
                  gap: 16, alignItems: 'center'
                }}>
                  {/* Serial */}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(100,160,255,0.25)',
                    border: '1px solid rgba(100,160,255,0.4)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6eb4ff', fontWeight: 'bold', fontSize: 14
                  }}>
                    {history.length - i}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{
                      color: '#fff', fontWeight: 'bold', fontSize: 14
                    }}>{r.studentName}</div>
                    <div style={{
                      color: 'rgba(160,175,215,0.75)',
                      fontSize: 11, marginTop: 2
                    }}>
                      {r.rollNumber} &nbsp;·&nbsp; {r.course}
                      &nbsp;·&nbsp; {r.subject}
                    </div>
                  </div>

                  {/* Score + Grade */}
                  <div style={{
                    display: 'flex', gap: 14, alignItems: 'center'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        color: '#44dd88', fontWeight: 'bold', fontSize: 18
                      }}>
                        {r.score}/{r.total}
                      </div>
                      <div style={{
                        color: 'rgba(160,175,215,0.7)', fontSize: 10
                      }}>Score</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        color: '#f0a020', fontWeight: 'bold', fontSize: 18
                      }}>{r.grade}</div>
                      <div style={{
                        color: 'rgba(160,175,215,0.7)', fontSize: 10
                      }}>Grade</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        color: '#a060ff', fontWeight: 'bold', fontSize: 18
                      }}>{r.gradePoint}/10</div>
                      <div style={{
                        color: 'rgba(160,175,215,0.7)', fontSize: 10
                      }}>GP</div>
                    </div>
                  </div>

                  {/* Date */}
                  <div style={{
                    color: 'rgba(140,155,195,0.65)',
                    fontSize: 11, textAlign: 'right'
                  }}>
                    {r.dateTime}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}