import { NextRequest, NextResponse } from 'next/server'

async function getPrisma() {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { command, sessionId } = body

    if (!command || !sessionId) {
      return NextResponse.json({ error: 'Missing fields.' }, { status: 400 })
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null

    const userAgent = req.headers.get('user-agent') || null

    const prisma = await getPrisma()

    // Upsert visitor by sessionId
    const visitor = await prisma.visitor.upsert({
      where: { sessionId },
      update: {},
      create: {
        sessionId,
        ip,
        userAgent,
      },
    })

    // Log the command
    await prisma.commandLog.create({
      data: {
        visitorId: visitor.id,
        command: String(command).slice(0, 500),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    // Silently fail — logging is non-critical
    console.error('[/api/log] Error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
