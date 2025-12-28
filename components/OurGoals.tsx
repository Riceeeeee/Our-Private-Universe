'use client'

import { useState, useEffect } from 'react'

interface Goal {
  id: string
  text: string
  completed: boolean
}

interface OurGoalsProps {
  initialGoals?: Goal[]
}

export default function OurGoals({ initialGoals = [] }: OurGoalsProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)
  const [newGoal, setNewGoal] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals')
      const data = await response.json()
      if (data.goals) {
        setGoals(data.goals)
      }
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  const addGoal = async () => {
    if (newGoal.trim()) {
      setLoading(true)
      try {
        const response = await fetch('/api/goals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: newGoal,
          }),
        })
        const data = await response.json()
        if (data.goals) {
          setGoals(data.goals)
          setNewGoal('')
          setShowInput(false)
        }
      } catch (error) {
        console.error('Error adding goal:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleGoal = async (id: string) => {
    const goal = goals.find((g) => g.id === id)
    if (!goal) return

    try {
      const response = await fetch('/api/goals', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          completed: !goal.completed,
        }),
      })
      const data = await response.json()
      if (data.goals) {
        setGoals(data.goals)
      }
    } catch (error) {
      console.error('Error toggling goal:', error)
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      const response = await fetch(`/api/goals?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.goals) {
        setGoals(data.goals)
      }
    } catch (error) {
      console.error('Error deleting goal:', error)
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        🌟 Mục Tiêu Chung
      </h2>

      <div className="glass-strong rounded-xl p-6 mb-6">
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-300"
          >
            + Thêm Mục Tiêu Mới
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              placeholder="Nhập mục tiêu của bạn..."
              className="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <div className="flex gap-3">
              <button
                onClick={addGoal}
                disabled={loading}
                className="flex-1 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang thêm...' : 'Thêm'}
              </button>
              <button
                onClick={() => {
                  setShowInput(false)
                  setNewGoal('')
                }}
                className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-colors duration-300"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`glass rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-all duration-300 ${
              goal.completed ? 'opacity-60' : ''
            }`}
          >
            <button
              onClick={() => toggleGoal(goal.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-pink-400 flex items-center justify-center transition-colors duration-300 ${
                goal.completed
                  ? 'bg-pink-400 border-pink-500'
                  : 'bg-transparent hover:bg-pink-100'
              }`}
            >
              {goal.completed && (
                <span className="text-white text-sm font-bold">✓</span>
              )}
            </button>
            <p
              className={`flex-1 ${
                goal.completed
                  ? 'line-through text-gray-500'
                  : 'text-gray-700'
              }`}
            >
              {goal.text}
            </p>
            <button
              onClick={() => deleteGoal(goal.id)}
              className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors duration-300"
            >
              🗑️
            </button>
          </div>
        ))}
        {goals.length === 0 && (
          <div className="text-center text-pink-500 py-8 glass rounded-xl">
            Chưa có mục tiêu nào. Hãy thêm mục tiêu đầu tiên của bạn!
          </div>
        )}
      </div>
    </section>
  )
}

