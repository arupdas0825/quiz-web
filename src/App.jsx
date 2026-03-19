import { useState } from 'react'
import WelcomePage      from './pages/WelcomePage'
import StudentFormPage  from './pages/StudentFormPage'
import DashboardPage    from './pages/DashboardPage'
import QuizPage         from './pages/QuizPage'
import ResultPage       from './pages/ResultPage'
import HistoryPage      from './pages/HistoryPage'

export default function App() {
  const [page,    setPage]    = useState('welcome')
  const [student, setStudent] = useState(null)
  const [subject, setSubject] = useState(null)
  const [result,  setResult]  = useState(null)
  const [history, setHistory] = useState([])

  const navigate = (to) => setPage(to)

  const saveResult = (res) => {
    setResult(res)
    setHistory(prev => [...prev, res])
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
          setSubject={setSubject}
          history={history}
        />
      )}
      {page === 'quiz' && (
        <QuizPage
          navigate={navigate}
          student={student}
          subject={subject}
          saveResult={saveResult}
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