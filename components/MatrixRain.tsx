'use client'

import { useEffect, useRef } from 'react'
import { useTerminalStore } from '@/store/useTerminalStore'

// ASCII chars — much faster to render than emoji on canvas
const CHARS = ['ﾊ','ﾐ','ﾋ','ｰ','ｳ','ｼ','ﾅ','ﾓ','ﾆ','ｻ','ﾜ','ﾂ','ｵ','ﾃ','ｹ','ﾒ','ｴ','ｶ','ｷ','ﾑ','ﾕ','ﾗ','ｾ','ﾈ','ｽ','ﾂ']

// Accent colours per theme so the rain always matches
const THEME_COLOURS: Record<string, string> = {
  dark:   '#c084fc',
  light:  '#007aff',
  hacker: '#00ff41',
  retro:  '#ff8c00',
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme     = useTerminalStore((s) => s.theme)

  useEffect(() => {
    const canvas  = canvasRef.current
    if (!canvas) return
    const ctx     = canvas.getContext('2d')
    if (!ctx)     return

    const FONT_SIZE = 18
    const FPS       = 15                      // cap at 15fps — plenty smooth, far less CPU
    const INTERVAL  = 1000 / FPS
    let columns: number[]
    let animId: number
    let last = 0

    const colour = THEME_COLOURS[theme] ?? '#58a6ff'

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const count   = Math.floor(canvas.width / FONT_SIZE)
      columns       = Array(count).fill(1)
    }

    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw)
      if (ts - last < INTERVAL) return          // skip frame — throttle to 15fps
      last = ts

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = colour
      ctx.font      = `${FONT_SIZE}px monospace`

      columns.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]!
        const x    = i * FONT_SIZE
        ctx.fillText(char, x, y * FONT_SIZE)

        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i]++
      })
    }

    resize()
    animId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.15, zIndex: 0 }}
      aria-hidden
    />
  )
}
