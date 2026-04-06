import { useState } from 'react'
import WelcomePage      from './pages/WelcomePage'
import StudentFormPage  from './pages/StudentFormPage'
import DashboardPage    from './pages/DashboardPage'
import QuizPage         from './pages/QuizPage'
import ReviewPage       from './pages/ReviewPage'
import ResultPage       from './pages/ResultPage'
import HistoryPage      from './pages/HistoryPage'
import CertificatePage  from './pages/CertificatePage'

export default function App() {
  const [page,    setPage]    = useState('welcome')
  const [pageHistory, setPageHistory] = useState(['welcome'])
  const [student, setStudent] = useState(null)
  const [subject, setSubject] = useState(null)
  const [result,  setResult]  = useState(null)
  const [history, setHistory] = useState([])
  const [customQs, setCustomQs] = useState(null)

  const navigate = (to) => {
    if (to === -1) {
      setPageHistory(prev => {
        if (prev.length > 1) {
          const newStack = [...prev];
          newStack.pop();
          setPage(newStack[newStack.length - 1]);
          return newStack;
        } else {
          setPage('dashboard');
          return prev;
        }
      });
    } else {
      setPage(to);
      setPageHistory(prev => {
        if (prev[prev.length - 1] === to) return prev;
        return [...prev, to];
      });
    }
  }

  const saveResult = (res) => {
    setResult(res)
    setHistory(prev => [...prev, res])
  }

  const startCustomQuiz = (questions, sub) => {
    setCustomQs(questions)
    setSubject(sub)
    navigate('quiz')
  }

  const handleSetSubject = (sub) => {
    setCustomQs(null)
    setSubject(sub)
  }

  return (
    <>
      {page === 'welcome' && (
        <WelcomePage
          navigate={navigate}
          history={history}
        />
      )}
      {page === 'form' && (
        <StudentFormPage
          navigate={navigate}
          setStudent={setStudent}
        />
      )}
      {page === 'dashboard' && (
        <DashboardPage
          navigate={navigate}
          student={student}
          setSubject={handleSetSubject}
          history={history}
        />
      )}
      {page === 'quiz' && (
        <QuizPage
          navigate={navigate}
          student={student}
          subject={subject}
          saveResult={saveResult}
          customQs={customQs}
        />
      )}
      {page === 'review' && (
        <ReviewPage
          navigate={navigate}
          student={student}
          result={result}
          startCustomQuiz={startCustomQuiz}
        />
      )}
      {page === 'certificate' && (
        <CertificatePage
          navigate={navigate}
          student={student}
          result={result}
        />
      )}
      {page === 'result' && (
        <ResultPage
          navigate={navigate}
          student={student}
          result={result}
        />
      )}
      {page === 'history' && (
        <HistoryPage
          navigate={navigate}
          history={history}
        />
      )}
    </>
  )
}