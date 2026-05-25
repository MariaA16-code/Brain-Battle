import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('${import.meta.env.VITE_API_URL}/api/leaderboard')
      .then(res => setLeaders(res.data))
  }, [])

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white mb-6 inline-block transition"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold text-purple-400 mb-2">🏆 Leaderboard</h1>
        <p className="text-gray-400 mb-8">Top players this season</p>

        <div className="flex flex-col gap-3">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className={`flex items-center justify-between bg-gray-900 rounded-2xl px-6 py-4 border
                ${index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : index === 2 ? 'border-orange-400' : 'border-gray-700'}`}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{medals[index] || `#${index + 1}`}</span>
                <div>
                  <p className="font-bold text-lg">{leader.username}</p>
                  <p className="text-gray-400 text-sm">{leader.quizzes_taken} quizzes taken</p>
                </div>
              </div>
              <p className="text-purple-400 font-bold text-xl">{leader.total_score} pts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}