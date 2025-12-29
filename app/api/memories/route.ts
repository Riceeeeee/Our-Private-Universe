import { NextRequest, NextResponse } from 'next/server'

const MEMORIES_KEY = 'memories'

async function getMemories() {
  try {
    const memories = await kv.get<Array<{
      id: string
      image: string
      date: string
      description: string
    }>>(MEMORIES_KEY)
    return memories || []
  } catch (error) {
    console.error('Error getting memories from KV:', error)
    return []
  }
}

async function setMemories(memories: Array<{
  id: string
  image: string
  date: string
  description: string
}>) {
  try {
    await kv.set(MEMORIES_KEY, memories)
  } catch (error) {
    console.error('Error setting memories to KV:', error)
  }
}

export async function GET() {
  const memories = await getMemories()
  return NextResponse.json({ memories })
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

    const memories = await getMemories()
    const newMemory = {
      id: Date.now().toString(),
      image: image || '',
      date,
      description,
    }

    const updatedMemories = [newMemory, ...memories]
    await setMemories(updatedMemories)
    return NextResponse.json({ memory: newMemory, memories: updatedMemories })
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

    const memories = await getMemories()
    const updatedMemories = memories.filter((memory) => memory.id !== id)
    await setMemories(updatedMemories)
    return NextResponse.json({ memories: updatedMemories })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
