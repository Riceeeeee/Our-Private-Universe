'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  content: string
  timestamp: string
}

export default function SecretLetter() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      if (data.messages) {
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleSend = async () => {
    if (newMessage.trim()) {
      setLoading(true)
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newMessage,
          }),
        })
        const data = await response.json()
        if (data.messages) {
          setMessages(data.messages)
          setNewMessage('')
          setShowForm(false)
        }
      } catch (error) {
        console.error('Error sending message:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        💌 Tin Nhắn Yêu Thương
      </h2>
      
      <div className="glass-strong rounded-xl p-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-300"
          >
            Viết Lời Nhắn Mới
          </button>
        ) : (
          <div className="space-y-4">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Viết lời nhắn của bạn ở đây..."
              className="w-full h-32 p-4 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex-1 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang gửi...' : 'Gửi'}
              </button>
              <button
                onClick={() => {
                  setShowForm(false)
                  setNewMessage('')
                }}
                className="flex-1 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold transition-colors duration-300"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="mt-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="glass rounded-xl p-4 hover:scale-[1.02] transition-transform duration-300"
            >
              <p className="text-gray-700 whitespace-pre-wrap mb-2">
                {message.content}
              </p>
              <p className="text-xs text-pink-500">{message.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}