import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function Quiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quiz/${id}/`)
      .then(res => setQuiz(res.data))
  }, [id])

  const submitResult = useCallback(async (finalScore, total) => {
    const token = localStorage.getItem('token')
    try {
      await axios.post('http://127.0.0.1:8000/api/quiz/submit/', {
        quiz_id: id,
        score: finalScore,
        total: total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log('Submit error:', err.response?.data)
    }
    navigate('/result', { state: { score: finalScore, total } })
  }, [id, navigate])

  const handleNext = useCallback((timeout = false) => {
    if (!quiz) return
    const question = quiz.questions[current]
    let newScore = score
    if (!timeout && selected !== null) {
      const correct = question.options.find(o => o.is_correct)
      if (selected === correct?.id) newScore = score + 1
    }
    setSelected(null)
    if (current + 1 < quiz.questions.length) {
      setScore(newScore)
      setCurrent(prev => prev + 1)
    } else {
      submitResult(newScore, quiz.questions.length)
    }
  }, [quiz, current, selected, score, submitResult])

  useEffect(() => {
    if (!quiz) return
    let time = quiz.timer_seconds
    const timer = setInterval(() => {
      time -= 1
      setTimeLeft(time)
      if (time <= 0) {
        clearInterval(timer)
        handleNext(true)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [current, quiz, handleNext])

  if (!quiz) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white text-2xl">
      Loading...
    </div>
  )

  const question = quiz.questions[current]
  const progress = ((current) / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-purple-400">{quiz.title}</h1>
          <span className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-green-400'}`}>
            ⏱ {timeLeft}s
          </span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <p className="text-sm text-gray-400 mb-2">Question {current + 1} of {quiz.questions.length}</p>
          <h2 className="text-xl font-bold">{question.question_text}</h2>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-6">
          {question.options.map(option => (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`px-6 py-4 rounded-xl text-left font-medium transition-all border
                ${selected === option.id
                  ? 'bg-purple-600 border-purple-400'
                  : 'bg-gray-900 border-gray-700 hover:border-purple-500'}`}
            >
              {option.option_text}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleNext()}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold transition"
        >
          {current + 1 === quiz.questions.length ? 'Finish Quiz 🎉' : 'Next Question →'}
        </button>
      </div>
    </div>
  )
}