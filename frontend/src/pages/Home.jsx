import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [quizzes, setQuizzes] = useState([])
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios.get(`https://brain-battle-production-baef.up.railway.app/api/quiz/`)
      .then(res => setQuizzes(res.data))
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <div className="bg-gray-900 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400">🎮 BrainBattle</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-400">Hi, {user.username}!</span>
          <button
            onClick={() => navigate('/leaderboard')}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm transition"
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold mb-2">Choose a Quiz 🧠</h2>
        <p className="text-gray-400 mb-8">Test your knowledge and climb the leaderboard!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quizzes.map(quiz => (
            <div
              key={quiz.id}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 rounded-2xl p-6 cursor-pointer transition-all"
            >
              <div className="text-4xl mb-3">🧩</div>
              <h3 className="text-xl font-bold mb-1">{quiz.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{quiz.questions.length} Questions</p>
              <span className="bg-purple-700 text-xs px-3 py-1 rounded-full">
                ⏱ {quiz.timer_seconds}s per question
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}