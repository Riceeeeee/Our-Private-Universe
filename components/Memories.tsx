'use client'

import { useState, useEffect } from 'react'

interface Memory {
  id: string
  image: string
  date: string
  description: string
}

interface MemoriesProps {
  initialMemories?: Memory[]
}

export default function Memories({ initialMemories = [] }: MemoriesProps) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories)
  const [showForm, setShowForm] = useState(false)
  const [newMemory, setNewMemory] = useState({
    image: '',
    date: '',
    description: '',
  })

  useEffect(() => {
    const stored = localStorage.getItem('memories')
    if (stored) {
      setMemories(JSON.parse(stored))
    } else if (initialMemories.length > 0) {
      localStorage.setItem('memories', JSON.stringify(initialMemories))
    }
  }, [initialMemories])

  const addMemory = () => {
    if (newMemory.date && newMemory.description) {
      const memory: Memory = {
        id: Date.now().toString(),
        image: newMemory.image,
        date: newMemory.date,
        description: newMemory.description,
      }
      const updatedMemories = [memory, ...memories]
      setMemories(updatedMemories)
      localStorage.setItem('memories', JSON.stringify(updatedMemories))
      setNewMemory({ image: '', date: '', description: '' })
      setShowForm(false)
    }
  }

  const deleteMemory = (id: string) => {
    const updatedMemories = memories.filter((memory) => memory.id !== id)
    setMemories(updatedMemories)
    localStorage.setItem('memories', JSON.stringify(updatedMemories))
  }

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        💕 Kỷ Niệm
      </h2>
      
      <div className="glass-strong rounded-xl p-6 mb-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-300"
          >
            + Thêm Kỷ Niệm Mới
          </button>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              value={newMemory.image}
              onChange={(e) => setNewMemory({ ...newMemory, image: e.target.value })}
              placeholder="URL ảnh (tùy chọn)"
              className="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="text"
              value={newMemory.date}
              onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
              placeholder="Ngày tháng (ví dụ: 01/01/2024)"
              className="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <textarea
              value={newMemory.description}
              onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
              placeholder="Mô tả kỷ niệm..."
              className="w-full h-24 p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={addMemory}
                className="flex-1 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                Thêm
              </button>
              <button
                onClick={() => {
                  setShowForm(false)
                  setNewMemory({ image: '', date: '', description: '' })
                }}
                className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-colors duration-300"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="glass rounded-xl p-4 hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
              {memory.image ? (
                <img
                  src={memory.image}
                  alt={memory.description}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-pink-200 flex items-center justify-center text-4xl">
                  ❤️
                </div>
              )}
            </div>
            <p className="text-pink-600 font-semibold mb-2">{memory.date}</p>
            <p className="text-gray-700 text-sm">{memory.description}</p>
            <button
              onClick={() => deleteMemory(memory.id)}
              className="mt-2 text-red-400 hover:text-red-600 text-sm transition-colors duration-300"
            >
              Xóa
            </button>
          </div>
        ))}
        {memories.length === 0 && (
          <div className="col-span-full text-center text-pink-500 py-8">
            Chưa có kỷ niệm nào. Hãy thêm kỷ niệm đầu tiên của bạn!
          </div>
        )}
      </div>
    </section>
  )
}

