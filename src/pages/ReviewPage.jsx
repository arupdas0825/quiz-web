import React, { useState } from "react";
import { CheckCircle, XCircle, ArrowLeft, RotateCcw, Filter, AlertCircle } from 'lucide-react';

export default function ReviewPage({ navigate, student, result, startCustomQuiz }) {
  const [filter, setFilter] = useState('all'); // all, correct, wrong
  
  if (!result || !result.questions) {
    return (
      <div style={{ minHeight: '100vh', background: '#050a18', color: '#fff', padding: '40px' }}>
        <h2>No quiz data found. Please take a quiz first.</h2>
        <button onClick={() => navigate('dashboard')} style={{ marginTop: '20px', padding: '10px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Go to Dashboard</button>
      </div>
    );
  }

  const { questions, answers, score, total, percentage, subject } = result;

  const filteredQuestions = questions.map((q, i) => ({
    ...q,
    originalIndex: i,
    userAnswer: answers[i],
    isCorrect: answers[i] === q.ans
  })).filter(q => {
    if (filter === 'correct') return q.isCorrect;
    if (filter === 'wrong') return !q.isCorrect;
    return true;
  });

  const wrongQuestions = questions.filter((q, i) => answers[i] !== q.ans);

  const handleReattempt = () => {
    // Reset options array or keep them shuffled as they were? 
    // They are already shuffled in the result.questions array.
    startCustomQuiz(wrongQuestions, subject);
  };

  return (
    <div style={{
      minHeight:'100vh', 
      background:'#050a18',
      fontFamily:'Inter, sans-serif',
      color: '#f8fafc',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        
        {/* Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            onClick={() => navigate('result')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.target.style.color = '#fff'}
            onMouseOut={(e) => e.target.style.color = '#94a3b8'}
          >
            <ArrowLeft size={18} /> Back to Result
          </button>
          
          <div style={{ fontWeight: '600', fontSize: '18px', color: '#e2e8f0' }}>Quiz Review</div>
        </div>

        {/* Summary Card */}
        <div style={{
          background: '#0a1024',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          <div>
            <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>Subject</div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>{subject}</div>
          </div>
          
          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>Accuracy</div>
              <div style={{ fontSize: '20px', fontWeight: '700' }}>{percentage}%</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>Correct</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>{score}</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>Wrong</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#ef4444' }}>{total - score}</div>
            </div>
          </div>
        </div>

        {/* Filter & Actions Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setFilter('all')}
              style={{
                background: filter === 'all' ? '#1e293b' : 'transparent',
                color: filter === 'all' ? '#f8fafc' : '#94a3b8',
                border: filter === 'all' ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <Filter size={16} /> All
            </button>
            <button 
              onClick={() => setFilter('correct')}
              style={{
                background: filter === 'correct' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                color: filter === 'correct' ? '#10b981' : '#94a3b8',
                border: filter === 'correct' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent',
                padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <CheckCircle size={16} /> Correct
            </button>
            <button 
              onClick={() => setFilter('wrong')}
              style={{
                background: filter === 'wrong' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                color: filter === 'wrong' ? '#ef4444' : '#94a3b8',
                border: filter === 'wrong' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid transparent',
                padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <XCircle size={16} /> Wrong
            </button>
          </div>

          {wrongQuestions.length > 0 && (
            <button 
              onClick={handleReattempt}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#fff',
                border: 'none',
                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <RotateCcw size={16} /> Reattempt Wrong Questions
            </button>
          )}
        </div>

        {/* Questions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredQuestions.map((q) => {
            const isCorrect = q.isCorrect;
            const userSkipped = q.userAnswer === -1;

            return (
              <div key={q.originalIndex} style={{
                background: '#0a1024',
                border: isCorrect ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, w: '4px', height: '100%',
                  background: isCorrect ? '#10b981' : '#ef4444',
                  width: '4px'
                }} />
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    color: isCorrect ? '#10b981' : '#ef4444',
                    background: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#e2e8f0', fontSize: '16px', fontWeight: '600', marginBottom: '20px', lineHeight: '1.5' }}>
                      <span style={{ color: '#94a3b8', marginRight: '8px' }}>Q{q.originalIndex + 1}.</span> 
                      {(() => {
                        let t = q?.q || q?.text || q?.questionText || q?.content || "Question not available";
                        if (typeof t === 'string') {
                           t = t.replace(/^\[([TC])\]\s*Q\d+\.\s*/, '[$1] ');
                        }
                        return t;
                      })()}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {q.options.map((opt, optIdx) => {
                        const isUserAnswer = q.userAnswer === optIdx;
                        const isCorrectAnswer = q.ans === optIdx;

                        let bg = 'rgba(255,255,255,0.03)';
                        let border = '1px solid rgba(255,255,255,0.05)';
                        let color = '#cbd5e1';

                        if (isCorrectAnswer && isUserAnswer) {
                          bg = 'rgba(16,185,129,0.1)';
                          border = '1px solid rgba(16,185,129,0.5)';
                          color = '#10b981';
                        } else if (isUserAnswer && !isCorrectAnswer) {
                          bg = 'rgba(239,68,68,0.1)';
                          border = '1px solid rgba(239,68,68,0.5)';
                          color = '#ef4444';
                        } else if (isCorrectAnswer && !isUserAnswer) {
                          // Highlight the correct answer in yellow-ish if user didn't pick it
                          bg = 'rgba(234,179,8,0.1)';
                          border = '1px solid rgba(234,179,8,0.5)';
                          color = '#eab308';
                        }

                        return (
                          <div key={optIdx} style={{
                            padding: '12px 16px',
                            background: bg,
                            border: border,
                            borderRadius: '8px',
                            color: color,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '14px',
                            fontWeight: (isUserAnswer || isCorrectAnswer) ? '600' : '400'
                          }}>
                            {opt}
                            {isCorrectAnswer && isUserAnswer && <CheckCircle size={16} style={{ marginLeft: 'auto' }} />}
                            {isUserAnswer && !isCorrectAnswer && <XCircle size={16} style={{ marginLeft: 'auto' }} />}
                            {isCorrectAnswer && !isUserAnswer && <CheckCircle size={16} style={{ marginLeft: 'auto' }} />}
                          </div>
                        );
                      })}
                    </div>

                    {userSkipped && (
                      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '14px' }}>
                        <AlertCircle size={16} /> You skipped this question.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}