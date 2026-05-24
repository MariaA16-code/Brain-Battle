import { useLocation, useNavigate } from 'react-router-dom'

export default function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { score, total } = state || { score: 0, total: 0 }
  const percentage = Math.round((score / total) * 100)

  const getMessage = () => {
    if (percentage === 100) return '🏆 Perfect Score!'
    if (percentage >= 70) return '🎉 Great Job!'
    if (percentage >= 40) return '👍 Good Effort!'
    return '💪 Keep Practicing!'
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-purple-400 mb-2">Quiz Complete!</h1>
        <p className="text-gray-400 mb-8">Here's how you did</p>

        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <p className="text-6xl font-bold text-white mb-2">{score}/{total}</p>
          <p className="text-2xl text-purple-400 font-bold">{percentage}%</p>
          <p className="text-xl mt-4">{getMessage()}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold transition"
          >
            Play Again 🎮
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold transition"
          >
            View Leaderboard 🏆
          </button>
        </div>
      </div>
    </div>
  )
}