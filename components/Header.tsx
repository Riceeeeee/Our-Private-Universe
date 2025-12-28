'use client'

import { useEffect, useState } from 'react'

interface HeaderProps {
  startDate: string // Format: YYYY-MM-DD
  partner1Name?: string
  partner2Name?: string
}

export default function Header({ 
  startDate, 
  partner1Name = 'Quang', 
  partner2Name = 'Linh' 
}: HeaderProps) {
  const [daysTogether, setDaysTogether] = useState(0)

  useEffect(() => {
    const calculateDays = () => {
      const start = new Date(startDate)
      const today = new Date()
      const diffTime = today.getTime() - start.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      setDaysTogether(diffDays)
    }

    calculateDays()
    const interval = setInterval(calculateDays, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [startDate])

  return (
    <header className="glass-strong rounded-2xl p-6 md:p-8 mb-8 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-4">
        {partner1Name} & {partner2Name}
      </h1>
      <div className="flex flex-col items-center gap-2">
        <p className="text-pink-500 text-lg md:text-xl">Đã yêu nhau</p>
        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600">
          {daysTogether}
        </div>
        <p className="text-pink-500 text-lg md:text-xl">ngày</p>
      </div>
    </header>
  )
}

