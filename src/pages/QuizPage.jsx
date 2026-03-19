import { useState, useEffect, useRef } from 'react'
import questions from '../data/questions'

const LETTERS = ['A', 'B', 'C', 'D']

// Shuffle array
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Shuffle options and update correct answer index
function shuffleOptions(question) {
  const indices = [0, 1, 2, 3]
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }
  return {
    ...question,
    options: indices.map(i => question.options[i]),
    ans: indices.indexOf(question.ans)
  }
}

// Pick 25 random questions, shuffle each question's options
function prepareQuestions(subject) {
  const all = shuffle(questions[subject])
  const picked = all.slice(0, 25)
  return picked.map(q => shuffleOptions(q))
}

function getGrade(score) {
  if (score >= 23) return { grade:'O',  gp:10, remark:'Outstanding! 🏆' }
  if (score >= 20) return { grade:'A+', gp:9,  remark:'Excellent! ⭐'   }
  if (score >= 17) return { grade:'A',  gp:8,  remark:'Very Good! 👍'   }
  if (score >= 14) return { grade:'B+', gp:7,  remark:'Good'            }
  if (score >= 11) return { grade:'B',  gp:6,  remark:'Average'         }
  if (score >= 8)  return { grade:'C',  gp:5,  remark:'Pass'            }
  return               { grade:'F',  gp:0,  remark:'Failed ❌ Better luck next time!' }
}

export default function QuizPage({ navigate, student, subject, saveResult }) {
  const [qs]          = useState(() => prepareQuestions(subject))
  const [current,  setCurrent]  = useState(0)
  const [answers,  setAnswers]  = useState(() => new Array(25).fill(-1))
  const [selected, setSelected] = useState(-1)
  const [timeLeft, setTimeLeft] = useState(10 * 60) // ✅ 10 minutes
  const timerRef = useRef(null)

  // Restore saved answer on question change
  useEffect(() => {
    setSelected(answers[current])
  }, [current])

  // Countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setAnswers(prev => {
            submitExam(prev)
            return prev
          })
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const submitExam = (finalAnswers) => {
    clearInterval(timerRef.current)
    let score = 0
    qs.forEach((q, i) => {
      if (finalAnswers[i] === q.ans) score++
    })
    const { grade, gp, remark } = getGrade(score)
    saveResult({
      studentName: student.name,
      rollNumber:  student.roll,
      course:      student.course,
      semester:    student.semester,
      subject,
      score,
      total:      qs.length,
      grade,
      gradePoint: gp,
      remark,
      percentage: ((score / qs.length) * 100).toFixed(1),
      dateTime:   new Date().toLocaleString()
    })
    navigate('result')
  }

  const saveAnswer = (idx) => {
    setSelected(idx)
    setAnswers(prev => {
      const updated = [...prev]
      updated[current] = idx
      return updated
    })
  }

  const goPrev = () => {
    const updated = [...answers]
    updated[current] = selected
    setAnswers(updated)
    setCurrent(c => c - 1)
  }

  const goNext = () => {
    if (selected === -1) { alert('Please select an option!'); return }
    const updated = [...answers]
    updated[current] = selected
    setAnswers(updated)
    if (current === qs.length - 1) {
      submitExam(updated)
    } else {
      setCurrent(c => c + 1)
    }
  }

  const quitExam = () => {
    if (window.confirm('Are you sure you want to quit?\nYour progress will be lost.')) {
      clearInterval(timerRef.current)
      navigate('dashboard')
    }
  }

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')
  const timerColor  = timeLeft <= 120 ? '#ff4444' : timeLeft <= 300 ? '#ffaa00' : '#44dd88'
  const answeredCount = answers.filter(a => a !== -1).length

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#080f28 0%,#14082e 100%)',
      display:'flex', flexDirection:'column', fontFamily:'Arial,sans-serif'
    }}>

      {/* TOP BAR */}
      <div style={{
        background:'rgba(0,0,0,0.45)', backdropFilter:'blur(12px)',
        borderBottom:'1px solid rgba(255,255,255,0.10)',
        padding:'12px 28px',
        display:'flex', justifyContent:'space-between', alignItems:'center'
      }}>
        <div style={{ color:'rgba(180,200,255,0.9)', fontSize:13, fontWeight:'bold' }}>
          Q &nbsp;{current+1} / {qs.length}
          &nbsp;·&nbsp;
          <span style={{ color:'#6eb4ff' }}>{subject}</span>
        </div>
        <div style={{ display:'flex', gap:20, alignItems:'center' }}>
          <span style={{ color:'#80dd80', fontSize:12 }}>
            Answered: {answeredCount}/{qs.length}
          </span>
          <span style={{ color:timerColor, fontWeight:'bold', fontSize:16 }}>
            ⏱ &nbsp;{mins}:{secs}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', padding:'28px 20px',
        animation:'fadeIn 0.4s ease'
      }}>

        {/* Question Card */}
        <div style={{
          width:'100%', maxWidth:720,
          background:'rgba(255,255,255,0.08)',
          backdropFilter:'blur(14px)',
          border:'1px solid rgba(255,255,255,0.15)',
          borderRadius:20, padding:'24px 28px', marginBottom:18
        }}>
          {/* Progress bar */}
          <div style={{
            height:4, background:'rgba(255,255,255,0.12)',
            borderRadius:4, marginBottom:18, overflow:'hidden'
          }}>
            <div style={{
              height:'100%',
              width:`${((current+1)/qs.length)*100}%`,
              background:'linear-gradient(90deg,#3a8fff,#a044ff)',
              borderRadius:4, transition:'width 0.4s ease'
            }}/>
          </div>
          <div style={{ color:'rgba(160,180,230,0.7)', fontSize:12, marginBottom:8 }}>
            Question {current+1}
          </div>
          <div style={{ color:'#fff', fontSize:16, fontWeight:'bold', lineHeight:1.5 }}>
            {qs[current].q}
          </div>
        </div>

        {/* Options */}
        <div style={{
          width:'100%', maxWidth:720,
          display:'flex', flexDirection:'column', gap:11
        }}>
          {qs[current].options.map((opt, i) => {
            const isSel = selected === i
            return (
              <div key={i} onClick={() => saveAnswer(i)} style={{
                display:'flex', alignItems:'center', gap:14,
                padding:'14px 20px', borderRadius:14, cursor:'pointer',
                background: isSel ? 'rgba(60,140,255,0.28)' : 'rgba(255,255,255,0.07)',
                border: isSel
                  ? '1.5px solid rgba(80,160,255,0.75)'
                  : '1px solid rgba(255,255,255,0.12)',
                backdropFilter:'blur(8px)',
                transform: isSel ? 'scale(1.012)' : 'scale(1)',
                transition:'all 0.18s ease',
                boxShadow: isSel ? '0 4px 20px rgba(60,140,255,0.25)' : 'none'
              }}>
                <div style={{
                  width:30, height:30, borderRadius:8, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background: isSel ? 'rgba(80,160,255,0.55)' : 'rgba(255,255,255,0.12)',
                  border:'1px solid rgba(255,255,255,0.2)',
                  color:'#fff', fontWeight:'bold', fontSize:13
                }}>
                  {LETTERS[i]}
                </div>
                <span style={{ color:'#fff', fontSize:14 }}>{opt}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{
        background:'rgba(0,0,0,0.50)', backdropFilter:'blur(12px)',
        borderTop:'1px solid rgba(255,255,255,0.10)',
        padding:'14px 28px',
        display:'flex', justifyContent:'space-between', alignItems:'center'
      }}>
        <button className="btn-glass" onClick={quitExam} style={{
          background:'rgba(180,30,30,0.55)', padding:'10px 22px',
          fontSize:13, border:'1px solid rgba(255,80,80,0.3)'
        }}>
          ✕ &nbsp;Quit
        </button>
        <div style={{ display:'flex', gap:12 }}>
          <button className="btn-glass" onClick={goPrev}
            disabled={current===0} style={{
              background: current===0 ? 'rgba(255,255,255,0.05)' : 'rgba(60,80,160,0.65)',
              padding:'10px 22px', fontSize:13,
              opacity: current===0 ? 0.4 : 1,
              cursor: current===0 ? 'not-allowed' : 'pointer',
              border:'1px solid rgba(255,255,255,0.15)'
            }}>
            ← &nbsp;Previous
          </button>
          <button className="btn-glass" onClick={goNext} style={{
            background: current===qs.length-1
              ? 'linear-gradient(135deg,#14c060,#0a8040)'
              : 'linear-gradient(135deg,#1a7cdc,#0a4a9a)',
            padding:'10px 28px', fontSize:13,
            border:'1px solid rgba(255,255,255,0.2)'
          }}>
            {current===qs.length-1 ? 'Submit ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}