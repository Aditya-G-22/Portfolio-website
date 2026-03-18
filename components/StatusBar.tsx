'use client'

import { useEffect, useState } from 'react'
import { useTerminalStore } from '@/store/useTerminalStore'
import { themes } from '@/styles/themes'

export default function StatusBar() {
  const { theme, currentView, sessionId } = useTerminalStore()
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="flex items-center justify-between px-4 py-1 font-mono text-[10px] border-b border-[var(--color-border)] shrink-0"
      style={{ backgroundColor: 'var(--color-bg-terminal)' }}
    >
      {/* Left */}
      <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
        <span className="text-[var(--color-accent)] font-bold">portfolio-os</span>
        <span>v1.0.0</span>
        <span className="hidden sm:inline">
          session: {sessionId.slice(0, 8)}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
        <span className="hidden sm:inline">
          view: <span className="text-[var(--color-text)]">{currentView}</span>
        </span>
        <span>
          theme: <span className="text-[var(--color-accent)]">{themes[theme].label}</span>
        </span>
        <span className="text-[var(--color-text)]">{time}</span>
      </div>
    </div>
  )
}
