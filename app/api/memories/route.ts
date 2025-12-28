import { NextRequest, NextResponse } from 'next/server'

// Temporary in-memory storage (will be lost on server restart)
// In production, you should use a database like Vercel KV, Supabase, or MongoDB
let memoriesStorage: Array<{
  id: string
  image: string
  date: string
  description: string
}> = []

export async function GET() {
  return NextResponse.json({ memories: memoriesStorage })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image, date, description } = body

    if (!date || !description) {
      return NextResponse.json(
        { error: 'Date and description are required' },
        { status: 400 }
      )
    }

    const newMemory = {
      id: Date.now().toString(),
      image: image || '',
      date,
      description,
    }

    memoriesStorage = [newMemory, ...memoriesStorage]
    return NextResponse.json({ memory: newMemory, memories: memoriesStorage })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    memoriesStorage = memoriesStorage.filter((memory) => memory.id !== id)
    return NextResponse.json({ memories: memoriesStorage })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

