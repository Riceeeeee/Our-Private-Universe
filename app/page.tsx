'use client'

import FloatingHearts from '@/components/FloatingHearts'
import Header from '@/components/Header'
import Memories from '@/components/Memories'
import SecretLetter from '@/components/SecretLetter'
import OurGoals from '@/components/OurGoals'

export default function Home() {
  // Ngày bắt đầu yêu nhau - bạn có thể thay đổi ngày này
  const startDate = '2025-09-15' // Format: YYYY-MM-DD

  // Dữ liệu mẫu cho kỷ niệm (có thể xóa và thêm mới)
  const sampleMemories: Array<{
    id: string
    image: string
    date: string
    description: string
  }> = []

  // Dữ liệu mẫu cho mục tiêu (có thể xóa và thêm mới)
  const sampleGoals = [
    {
      id: '1',
      text: 'Đi du lịch cùng nhau',
      completed: false,
    },
    {
      id: '2',
      text: 'Xem phim cùng nhau mỗi tuần',
      completed: false,
    },
  ]

  return (
    <main className="relative min-h-screen">
      <FloatingHearts />
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <Header startDate={startDate} partner1Name="Quang" partner2Name="Linh" />
        <Memories initialMemories={sampleMemories} />
        <SecretLetter />
        <OurGoals initialGoals={sampleGoals} />
      </div>
    </main>
  )
}
