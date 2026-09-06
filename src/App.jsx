import { useState } from 'react'
import './App.css'
import SubjectRow from './components/SubjectRow'
import ResultSummary from './components/ResultSummary'

const SUBJECTS = [
  { code: 'CS3212', name: 'Design and Analysis of Algorithm', credits: 4 },
  { code: 'CS3213', name: 'Computer Networks', credits: 3 },
  { code: 'CS3212A', name: 'Web Technologies', credits: 4 },
  { code: 'MM0701B', name: 'Ethical Hacking', credits: 3 },
]

function App() {
  const [marks, setMarks] = useState(
    SUBJECTS.map(() => ({ mse: '', ese: '' }))
  )

  const updateMse = (index, value) => {
    const updated = [...marks]
    updated[index].mse = value
    setMarks(updated)
  }

  const updateEse = (index, value) => {
    const updated = [...marks]
    updated[index].ese = value
    setMarks(updated)
  }

  const totalCredits = SUBJECTS.reduce((sum, s) => sum + s.credits, 0)

  const totalWeighted = marks.reduce((sum, m) => {
    const mse = parseFloat(m.mse) || 0
    const ese = parseFloat(m.ese) || 0
    return sum + ((mse / 50) * 30) + ((ese / 100) * 70)
  }, 0)

  const percentage = (totalWeighted / (SUBJECTS.length * 100)) * 100

  const allFilled = marks.every((m) => m.mse !== '' && m.ese !== '')

  return (
    <div className="app">
      <h1>VIT Semester Result</h1>

      <table className="result-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Subject</th>
            <th>Credits</th>
            <th>MSE (/50)</th>
            <th>ESE (/100)</th>
            <th>Weighted (/100)</th>
          </tr>
        </thead>
        <tbody>
          {SUBJECTS.map((subject, index) => (
            <SubjectRow
              key={subject.code}
              subject={subject}
              mse={marks[index].mse}
              ese={marks[index].ese}
              onMseChange={(value) => updateMse(index, value)}
              onEseChange={(value) => updateEse(index, value)}
            />
          ))}
        </tbody>
      </table>

      {allFilled && (
        <ResultSummary
          totalWeighted={totalWeighted}
          totalCredits={totalCredits}
          percentage={percentage}
        />
      )}
    </div>
  )
}

export default App