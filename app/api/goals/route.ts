import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

const GOALS_KEY = 'goals'

async function getGoals() {
  try {
    const goals = await kv.get<Array<{
      id: string
      text: string
      completed: boolean
    }>>(GOALS_KEY)
    return goals || []
  } catch (error) {
    console.error('Error getting goals from KV:', error)
    return []
  }
}

async function setGoals(goals: Array<{
  id: string
  text: string
  completed: boolean
}>) {
  try {
    await kv.set(GOALS_KEY, goals)
  } catch (error) {
    console.error('Error setting goals to KV:', error)
  }
}

export async function GET() {
  const goals = await getGoals()
  return NextResponse.json({ goals })
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

    const goals = await getGoals()
    const newGoal = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    }

    const updatedGoals = [...goals, newGoal]
    await setGoals(updatedGoals)
    return NextResponse.json({ goal: newGoal, goals: updatedGoals })
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

    const goals = await getGoals()
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, completed } : goal
    )
    await setGoals(updatedGoals)
    return NextResponse.json({ goals: updatedGoals })
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

    const goals = await getGoals()
    const updatedGoals = goals.filter((goal) => goal.id !== id)
    await setGoals(updatedGoals)
    return NextResponse.json({ goals: updatedGoals })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}

