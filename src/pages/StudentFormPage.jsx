import { useEffect, useRef, useState } from 'react'

export default function StudentFormPage({ navigate, setStudent }) {
  const canvasRef = useRef(null)
  const [form, setForm] = useState({ name:'', roll:'', course:'', semester:'' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let hue1 = 260, hue2 = 320, animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.width, h = canvas.height
      const grd = ctx.createLinearGradient(0, 0, w, h)
      grd.addColorStop(0, `hsl(${hue1},75%,9%)`)
      grd.addColorStop(1, `hsl(${hue2},80%,7%)`)
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)

      const blob = (x, y, r, hue) => {
        const g = ctx.createRadialGradient(x,y,0,x,y,r)
        g.addColorStop(0, `hsla(${hue},90%,60%,0.20)`)
        g.addColorStop(1, `hsla(${hue},90%,60%,0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill()
      }
      blob(w*0.1,  h*0.1,  240, hue1)
      blob(w*0.88, h*0.85, 280, hue2)
      blob(w*0.5,  h*0.95, 180, (hue1+50)%360)

      hue1 = (hue1+0.28)%360
      hue2 = (hue2+0.22)%360
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name     = 'Required'
    if (!form.roll.trim())     e.roll     = 'Required'
    if (!form.course.trim())   e.course   = 'Required'
    if (!form.semester.trim()) e.semester = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setStudent(form)
    navigate('dashboard')
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.10)',
    border: errors[field]
      ? '1.5px solid #ff6b6b'
      : '1px solid rgba(255,255,255,0.20)',
    borderRadius: 10, color: '#fff',
    fontSize: 14, outline: 'none',
    backdropFilter: 'blur(6px)'
  })

  return (
    <div style={{ position:'relative', minHeight:'100vh',
                  display:'flex', flexDirection:'column' }}>
      <canvas ref={canvasRef} style={{
        position:'fixed', top:0, left:0,
        width:'100%', height:'100%', zIndex:0
      }}/>

      {/* NAVBAR */}
      <nav style={{
        position:'relative', zIndex:1,
        background:'rgba(0,0,0,0.35)',
        backdropFilter:'blur(12px)',
        borderBottom:'1px solid rgba(255,255,255,0.10)',
        padding:'13px 28px',
        display:'flex', justifyContent:'space-between', alignItems:'center'
      }}>
        <span style={{ color:'rgba(180,200,255,0.9)', fontWeight:'bold', fontSize:14 }}>
          ⬡ QUIZ PORTAL &nbsp;/&nbsp; Student Registration
        </span>
        <button className="btn-glass" onClick={() => navigate('welcome')}
          style={{
            background:'rgba(255,255,255,0.10)',
            padding:'7px 18px', fontSize:13, borderRadius:8,
            border:'1px solid rgba(255,255,255,0.2)'
          }}>
          ← Back
        </button>
      </nav>

      {/* FORM CARD */}
      <div style={{
        position:'relative', zIndex:1,
        flex:1, display:'flex',
        alignItems:'center', justifyContent:'center',
        padding:'20px 16px', animation:'fadeIn 0.5s ease'
      }}>
        <div className="glass" style={{
          width:'100%', maxWidth:480,
          padding:'36px 40px',
          background:'rgba(255,255,255,0.09)'
        }}>

          <h2 style={{
            color:'#fff', fontSize:20, fontWeight:'bold',
            textAlign:'center', marginBottom:6
          }}>Fill Your Details</h2>
          <p style={{
            color:'rgba(190,205,245,0.75)',
            fontSize:12, textAlign:'center', marginBottom:26
          }}>
            Enter your information to start the exam
          </p>

          {/* Divider */}
          <div style={{
            height:1, background:'rgba(255,255,255,0.12)', marginBottom:22
          }}/>

          {/* Fields */}
          {[
            { key:'name',     label:'👤  Full Name',    ph:'e.g. Rahul Sharma'   },
            { key:'roll',     label:'🎫  Roll Number',  ph:'e.g. CS22001'        },
            { key:'course',   label:'📚  Course',       ph:'e.g. B.Tech CSE'     },
            { key:'semester', label:'📅  Semester',     ph:'e.g. 4th Semester'   },
          ].map(f => (
            <div key={f.key} style={{ marginBottom:16 }}>
              <label style={{
                display:'block', color:'rgba(200,215,255,0.85)',
                fontSize:13, fontWeight:'bold', marginBottom:6
              }}>{f.label}</label>
              <input
                placeholder={f.ph}
                value={form[f.key]}
                onChange={e => {
                  setForm(p => ({ ...p, [f.key]: e.target.value }))
                  setErrors(p => ({ ...p, [f.key]: '' }))
                }}
                style={inputStyle(f.key)}
              />
              {errors[f.key] && (
                <span style={{ color:'#ff8080', fontSize:11 }}>
                  ⚠ {errors[f.key]}
                </span>
              )}
            </div>
          ))}

          {/* Submit */}
          <button className="btn-glass" onClick={handleSubmit}
            style={{
              width:'100%', marginTop:20, padding:'14px',
              background:'linear-gradient(135deg,#14c060,#0a8040)',
              fontSize:15, borderRadius:12,
              border:'1px solid rgba(255,255,255,0.2)'
            }}>
            NEXT &nbsp;→&nbsp; Choose Subject
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        position:'relative', zIndex:1,
        background:'rgba(0,0,0,0.3)',
        borderTop:'1px solid rgba(255,255,255,0.08)',
        textAlign:'center', padding:'9px',
        color:'rgba(150,165,200,0.65)', fontSize:11
      }}>
        All fields required &nbsp;·&nbsp; No login needed
      </div>
    </div>
  )
}