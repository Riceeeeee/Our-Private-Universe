import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

const LETTERS_KEY = 'letters'

async function getLetters() {
  try {
    const letters = await kv.get<Array<{
      id: string
      content: string
      timestamp: string
    }>>(LETTERS_KEY)
    return letters || []
  } catch (error) {
    console.error('Error getting letters from KV:', error)
    return []
  }
}

async function setLetters(letters: Array<{
  id: string
  content: string
  timestamp: string
}>) {
  try {
    await kv.set(LETTERS_KEY, letters)
  } catch (error) {
    console.error('Error setting letters to KV:', error)
  }
}

export async function GET() {
  const letters = await getLetters()
  return NextResponse.json({ letters })
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

    const letters = await getLetters()
    const newLetter = {
      id: Date.now().toString(),
      content: content.trim(),
      timestamp: new Date().toLocaleString('vi-VN'),
    }

    const updatedLetters = [newLetter, ...letters]
    await setLetters(updatedLetters)
    return NextResponse.json({ letter: newLetter, letters: updatedLetters })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

