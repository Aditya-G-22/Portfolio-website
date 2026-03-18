import { NextRequest, NextResponse } from 'next/server'

// Dynamic import of prisma to prevent build failures when DB is not configured
async function getPrisma() {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, body: messageBody } = body

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }
    if (!messageBody || typeof messageBody !== 'string' || messageBody.trim().length === 0) {
      return NextResponse.json({ error: 'Message body is required.' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Sanitise lengths
    if (name.trim().length > 100) {
      return NextResponse.json({ error: 'Name too long (max 100 chars).' }, { status: 400 })
    }
    if (messageBody.trim().length > 2000) {
      return NextResponse.json({ error: 'Message too long (max 2000 chars).' }, { status: 400 })
    }

    const prisma = await getPrisma()
    const message = await prisma.message.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        body: messageBody.trim(),
      },
    })

    return NextResponse.json({ ok: true, id: message.id }, { status: 201 })
  } catch (err) {
    console.error('[/api/message] Error:', err)
    return NextResponse.json(
      { error: 'Internal server error. Message not saved.' },
      { status: 500 }
    )
  }
}
