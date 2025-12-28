import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Our Own Universe - Quang & Linh',
  description: 'Trang web lãng mạn dành cho cặp đôi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}

