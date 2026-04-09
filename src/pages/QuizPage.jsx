import React, { useState, useEffect, useCallback } from 'react';
import questionsData from '../data/questions';
import ExamLayout from '../components/Exam/ExamLayout';
import Header from '../components/Exam/Header';
import QuestionCard from '../components/Exam/QuestionCard';
import ActionBar from '../components/Exam/ActionBar';
import NavigatorDrawer from '../components/Exam/NavigatorDrawer';
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
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

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
  if (!examState) return null; 
  if (examState.examStatus === 'submitted') return null;

  const { questions, currentQuestionIndex, answers, visitedQuestions, markedForReview, remainingTime } = examState;
  
  if (!questions || questions.length === 0) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0f172a] p-4 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-2">No Questions Available</h2>
        <p className="text-slate-400 mb-6 max-w-sm">We couldn't load any questions for this subject. Please return to the dashboard.</p>
        <button onClick={() => navigate('dashboard')} className="rounded-xl border border-white/10 bg-slate-800 px-6 py-2 pb-2.5 font-semibold text-white drop-shadow-md hover:bg-slate-700 active:scale-95">Go to Dashboard</button>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;
  const answeredCount = answers.filter(a => a !== -1).length;

  return (
    <>
      {warningModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md">
          <div className="mx-4 max-w-sm rounded-2xl border border-red-500 bg-slate-800 p-8 text-center shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold text-red-500">Warning!</h2>
            <p className="mb-6 text-slate-300 leading-relaxed">
              Tab switching or minimizing the browser is strictly prohibited during the exam. The timer has continued validating in the background.
            </p>
            <button 
              onClick={() => setWarningModal(false)} 
              className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-500 active:scale-95"
            >
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
        header={
          <Header
            subject={subject}
            studentName={student?.name}
            remainingTime={remainingTime}
            handleTick={handleTick}
            handleTimeUp={handleTimeUp}
            onQuit={() => {
              if (window.confirm("Quit exam? Progress will be lost.")) {
                localStorage.removeItem('examState');
                navigate('dashboard');
              }
            }}
          />
        }
        leftContent={
          <>
            <QuestionCard
              question={currentQ}
              index={currentQuestionIndex}
              total={questions.length}
              selectedAnswer={answers[currentQuestionIndex]}
              onSelectAnswer={handleSelectAnswer}
            />
            <ActionBar
              isFirst={isFirst}
              isLast={isLast}
              onPrev={handlePrev}
              onSaveNext={handleSaveNext}
              onMarkNext={handleMarkNext}
              onSubmit={() => setShowSubmitModal(true)}
            />
          </>
        }
        rightContent={
          <NavigatorDrawer
            isOpen={isNavigatorOpen}
            setIsOpen={setIsNavigatorOpen}
            total={questions.length}
            current={currentQuestionIndex}
            onSelect={navigateTo}
            visited={visitedQuestions}
            answers={answers}
            marked={markedForReview}
          />
        }
      />
    </>
  );
}