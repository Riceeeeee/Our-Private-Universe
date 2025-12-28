import { NextRequest, NextResponse } from 'next/server'

// Temporary in-memory storage
let goalsStorage: Array<{
  id: string
  text: string
  completed: boolean
}> = []

export async function GET() {
  return NextResponse.json({ goals: goalsStorage })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const newGoal = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    }

    goalsStorage = [...goalsStorage, newGoal]
    return NextResponse.json({ goal: newGoal, goals: goalsStorage })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, completed } = body

    if (!id || typeof completed !== 'boolean') {
      return NextResponse.json(
        { error: 'ID and completed status are required' },
        { status: 400 }
      )
    }

    goalsStorage = goalsStorage.map((goal) =>
      goal.id === id ? { ...goal, completed } : goal
    )

    return NextResponse.json({ goals: goalsStorage })
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

    goalsStorage = goalsStorage.filter((goal) => goal.id !== id)
    return NextResponse.json({ goals: goalsStorage })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

