import React, { useState, useEffect, useCallback } from 'react';
import questionsData from '../data/questions';
import ExamLayout from '../components/Exam/ExamLayout';
import Timer from '../components/Exam/Timer';
import QuestionNavigator from '../components/Exam/QuestionNavigator';
import QuestionCard from '../components/Exam/QuestionCard';
import Controls from '../components/Exam/Controls';
import SubmitModal from '../components/Exam/SubmitModal';

// --- Utility Functions ---
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(question) {
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return {
    ...question,
    options: indices.map(i => question.options[i]),
    ans: indices.indexOf(question.ans)
  };
}

function prepareQuestions(subject) {
  const all = shuffle(questionsData[subject]);
  const picked = all.slice(0, 25);
  return picked.map(q => shuffleOptions(q));
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

export default function QuizPage({ navigate, student, subject, saveResult, customQs }) {
  const [examState, setExamState] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [warningModal, setWarningModal] = useState(false);

  // --- Initialize or Hydrate Exam State ---
  useEffect(() => {
    const savedStateStr = localStorage.getItem('examState');
    if (savedStateStr) {
      setExamState(JSON.parse(savedStateStr));
    } else {
      const qs = customQs || prepareQuestions(subject);
      const initialState = {
        subjectCode: subject || "CUSTOM",
        questions: qs,
        currentQuestionIndex: 0,
        answers: new Array(qs.length).fill(-1),
        visitedQuestions: [0],
        markedForReview: [],
        remainingTime: 10 * 60, // Fixed 10 minutes
        examStatus: "in-progress"
      };
      setExamState(initialState);
      localStorage.setItem('examState', JSON.stringify(initialState));
    }
  }, [subject, customQs]);

  // --- Sync React State to LocalStorage (except timer ticks) ---
  useEffect(() => {
    if (examState) {
      localStorage.setItem('examState', JSON.stringify(examState));
    }
  }, [examState]);

  // --- Anti-Cheat (Visibility Change) ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && examState?.examStatus === 'in-progress') {
        setWarningModal(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [examState]);

  // --- Handlers ---
  const handleTick = useCallback((secondsLeft) => {
    // Write directly to local storage to avoid 1s re-renders of the whole page
    const stateStr = localStorage.getItem('examState');
    if (stateStr) {
      const state = JSON.parse(stateStr);
      state.remainingTime = secondsLeft;
      localStorage.setItem('examState', JSON.stringify(state));
    }
  }, []);

  const navigateTo = (idx) => {
    setExamState(prev => {
      const newVisited = [...prev.visitedQuestions];
      if (!newVisited.includes(idx)) newVisited.push(idx);
      return { ...prev, currentQuestionIndex: idx, visitedQuestions: newVisited };
    });
  };

  const handleSelectAnswer = (ansIdx) => {
    setExamState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = ansIdx;
      
      // If user marks an answer, remove from markedForReview automatically? Optional, let's keep marked as independent
      return { ...prev, answers: newAnswers };
    });
  };

  const handlePrev = () => {
    if (examState.currentQuestionIndex > 0) {
      navigateTo(examState.currentQuestionIndex - 1);
    }
  };

  const handleSaveNext = () => {
    if (examState.currentQuestionIndex < examState.questions.length - 1) {
      navigateTo(examState.currentQuestionIndex + 1);
    } else {
      setShowSubmitModal(true); // Is last question
    }
  };

  const handleMarkNext = () => {
    setExamState(prev => {
      const newMarked = [...prev.markedForReview];
      if (!newMarked.includes(prev.currentQuestionIndex)) {
         newMarked.push(prev.currentQuestionIndex);
      }
      return { ...prev, markedForReview: newMarked };
    });
    handleSaveNext();
  };

  const finalizeExam = useCallback((stateToFinalize) => {
    // Calculate final score
    let score = 0;
    stateToFinalize.questions.forEach((q, i) => {
      if (stateToFinalize.answers[i] === q.ans) score++;
    });
    
    const { grade, gp, remark } = getGrade(score);
    
    saveResult({
      studentName: student?.name || "Student",
      rollNumber:  student?.roll || "N/A",
      course:      student?.course || "N/A",
      semester:    student?.semester || "N/A",
      subject:     stateToFinalize.subjectCode,
      score,
      total:       stateToFinalize.questions.length,
      grade,
      gradePoint:  gp,
      remark,
      percentage:  ((score / stateToFinalize.questions.length) * 100).toFixed(1),
      dateTime:    new Date().toLocaleString(),
      questions:   stateToFinalize.questions,
      answers:     stateToFinalize.answers
    });
    
    // Wipe local storage since completed
    localStorage.removeItem('examState');
    navigate('result');
  }, [navigate, saveResult, student]);

  const handleTimeUp = useCallback(() => {
    alert("Time's up! Your exam has been submitted automatically.");
    
    setExamState(prev => {
      const finalState = { ...prev, examStatus: 'submitted' };
      localStorage.setItem('examState', JSON.stringify(finalState));
      finalizeExam(finalState);
      return finalState;
    });
  }, [finalizeExam]);

  const confirmSubmit = () => {
    finalizeExam(examState);
  };

  // --- Render Gates ---
  if (!examState) return null; // Hydrating
  if (examState.examStatus === 'submitted') return null; // Transitioning

  const { questions, currentQuestionIndex, answers, visitedQuestions, markedForReview, remainingTime } = examState;
  const currentQ = questions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;

  const answeredCount = answers.filter(a => a !== -1).length;
  const notAnsweredCount = visitedQuestions.length - answeredCount; // Approx
  
  return (
    <>
      {warningModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#1e293b', padding: '40px', borderRadius: '16px',
            textAlign: 'center', maxWidth: '400px', border: '1px solid #ef4444'
          }}>
            <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>Warning!</h2>
            <p style={{ color: '#cbd5e1', marginBottom: '24px', lineHeight: 1.5 }}>
              Tab switching or minimizing the browser is strictly prohibited during the exam. The timer has continued validating in the background.
            </p>
            <button onClick={() => setWarningModal(false)} style={{
              background: '#ef4444', color: '#fff', border: 'none', padding: '12px 24px',
              borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}>
              Acknowledge & Resume
            </button>
          </div>
        </div>
      )}

      <SubmitModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={confirmSubmit}
        total={questions.length}
        answered={answeredCount}
        notAnswered={questions.length - answeredCount}
        marked={markedForReview.length}
      />

      <ExamLayout
        headerLeft={
          <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>{subject || 'EXAM'}</span>
            <span style={{ fontSize: '14px', color: '#94a3b8' }}>
              Candidate: <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{student?.name || 'Student'}</span>
            </span>
          </div>
        }
        headerRight={
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
             <button onClick={() => {
                if(window.confirm("Quit exam? Progress will be lost.")) {
                   localStorage.removeItem('examState');
                   navigate('dashboard');
                }
             }} style={{
               background: 'transparent', color: '#ef4444', border: '1px solid #ef444440',
               padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500'
             }}>Quit</button>
          </div>
        }
        leftPane={
          <>
            <QuestionCard
              question={currentQ}
              index={currentQuestionIndex}
              total={questions.length}
              selectedAnswer={answers[currentQuestionIndex]}
              onSelectAnswer={handleSelectAnswer}
            />
            <Controls
              isFirst={isFirst}
              isLast={isLast}
              onPrev={handlePrev}
              onSaveNext={handleSaveNext}
              onMarkNext={handleMarkNext}
              onSubmit={() => setShowSubmitModal(true)}
            />
          </>
        }
        rightPane={
          <>
            <Timer 
              initialTimeLeft={remainingTime} 
              onTick={handleTick} 
              onTimeUp={handleTimeUp} 
            />
            <QuestionNavigator
              total={questions.length}
              current={currentQuestionIndex}
              onSelect={navigateTo}
              visited={visitedQuestions}
              answers={answers}
              marked={markedForReview}
            />
          </>
        }
      />
    </>
  );
}