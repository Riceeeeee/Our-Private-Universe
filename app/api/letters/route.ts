import { NextRequest, NextResponse } from 'next/server'

// Temporary in-memory storage
let lettersStorage: Array<{
  id: string
  content: string
  timestamp: string
}> = []

export async function GET() {
  return NextResponse.json({ letters: lettersStorage })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const newLetter = {
      id: Date.now().toString(),
      content: content.trim(),
      timestamp: new Date().toLocaleString('vi-VN'),
    }

    lettersStorage = [newLetter, ...lettersStorage]
    return NextResponse.json({ letter: newLetter, letters: lettersStorage })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

