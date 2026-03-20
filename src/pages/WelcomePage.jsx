import { useEffect, useRef } from 'react'

const subjects = [
  { code: 'DBMS',   color: '#1a6cd4' },
  { code: 'OOPS',   color: '#7a00b8' },
  { code: 'PYTHON', color: '#b48200' },
  { code: 'C',      color: '#c43210' },
  { code: 'COA',    color: '#008c82' },
  { code: 'DSA',    color: '#b40050' },
]

export default function WelcomePage({ navigate, history }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let hue1 = 240, hue2 = 280, animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.width, h = canvas.height
      // Gradient BG
      const grd = ctx.createLinearGradient(0, 0, w, h)
      grd.addColorStop(0, `hsl(${hue1},70%,10%)`)
      grd.addColorStop(1, `hsl(${hue2},80%,7%)`)
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)

      // Blobs
      const drawBlob = (x, y, r, hue) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, `hsla(${hue},90%,60%,0.22)`)
        g.addColorStop(1, `hsla(${hue},90%,60%,0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      drawBlob(w * 0.1,  h * 0.15, 260, hue1)
      drawBlob(w * 0.85, h * 0.8,  300, hue2)
      drawBlob(w * 0.5,  h * 0.9,  200, (hue1 + 40) % 360)

      hue1 = (hue1 + 0.25) % 360
      hue2 = (hue2 + 0.30) % 360
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100vh',
                  display: 'flex', flexDirection: 'column' }}>

      {/* Animated Canvas BG */}
      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%', zIndex: 0
      }} />

      {/* NAVBAR */}
      <nav style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        padding: '14px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <span style={{ color: '#6eb4ff', fontWeight: 'bold', fontSize: 16 }}>
          ⬡ &nbsp;EXAM PORTAL
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>v1.0</span>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '20px 16px',
        animation: 'fadeIn 0.6s ease'
      }}>

        {/* Title */}
        <h1 style={{
          color: '#fff', fontSize: 'clamp(22px, 4vw, 36px)',
          fontWeight: 'bold', textAlign: 'center', marginBottom: 8
        }}>
          Online Examination System
        </h1>
        <p style={{
          color: 'rgba(180,200,255,0.85)',
          fontSize: 15, textAlign: 'center', marginBottom: 28
        }}>
          Test your knowledge across 6 core subjects
        </p>

        {/* Subject Chips */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: 10, justifyContent: 'center', marginBottom: 28
        }}>
          {subjects.map(s => (
            <span key={s.code} style={{
              background: s.color,
              color: '#fff', fontWeight: 'bold',
              fontSize: 12, padding: '6px 16px',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(6px)'
            }}>
              {s.code}
            </span>
          ))}
        </div>

        {/* Stat Cards */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: 14, justifyContent: 'center', marginBottom: 32
        }}>
          {[
            { val: '25', lbl: 'Questions', color: '#1a7cdc' },
            { val: '25', lbl: 'Marks',     color: '#14a050' },
            { val: '10', lbl: 'Minutes',   color: '#c87800' },
            { val: '6',  lbl: 'Subjects',  color: '#8800cc' },
          ].map(c => (
            <div key={c.lbl} className="glass" style={{
              padding: '14px 24px', textAlign: 'center',
              minWidth: 110,
              border: `1.5px solid ${c.color}55`
            }}>
              <div style={{
                color: c.color, fontSize: 28,
                fontWeight: 'bold', lineHeight: 1
              }}>{c.val}</div>
              <div style={{
                color: 'rgba(200,215,255,0.8)',
                fontSize: 12, marginTop: 4
              }}>{c.lbl}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          width: '100%', maxWidth: 600, height: 1,
          background: 'rgba(255,255,255,0.12)', marginBottom: 24
        }} />

        {/* Buttons */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: 12, width: '100%', maxWidth: 500
        }}>
          <button className="btn-glass" onClick={() => navigate('form')}
            style={{
              background: 'linear-gradient(135deg,#14c060,#0a8040)',
              fontSize: 17, padding: '15px',
              width: '100%', borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
            ▶ &nbsp; START EXAM
          </button>

          <button className="btn-glass" onClick={() => {
            if (!history.length) {
              alert('No records yet! Please give an exam first.')
            } else navigate('history')
          }} style={{
            background: 'rgba(120,0,180,0.55)',
            fontSize: 14, padding: '12px',
            width: '100%', borderRadius: 14,
            border: '1px solid rgba(180,80,255,0.35)'
          }}>
            📊 &nbsp; VIEW SCORE HISTORY
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center', padding: '10px',
        color: 'rgba(150,165,200,0.7)', fontSize: 11
      }}>
        No negative marking &nbsp;·&nbsp; Each correct answer = 1 mark &nbsp;·&nbsp; No login required
      </div>
    </div>
  )
}