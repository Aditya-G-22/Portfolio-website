'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useTerminalStore } from '@/store/useTerminalStore'
import { executeCommand, WELCOME_MESSAGE } from './commandRegistry'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import CRTMonitor from './CRTMonitor'

export default function Terminal() {
  const {
    terminalHistory,
    commandHistory,
    addTerminalEntry,
    addCommandHistory,
    setView,
    isMinimized,
    setMinimized,
  } = useTerminalStore()

  const containerRef  = useRef<HTMLDivElement>(null)
  const welcomedRef   = useRef(false)

  // Show welcome on mount — guard prevents double-print in React Strict Mode
  useEffect(() => {
    if (welcomedRef.current) return
    welcomedRef.current = true
    WELCOME_MESSAGE.forEach((line) => {
      addTerminalEntry({ type: 'info', text: line })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keyboard shortcuts: Ctrl+L = clear, Ctrl+K = focus, ` = toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault()
        useTerminalStore.getState().clearTerminal()
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        setMinimized(false)
        containerRef.current?.querySelector('input')?.focus()
      }
      if (e.key === '`') {
        e.preventDefault()
        setMinimized(!useTerminalStore.getState().isMinimized)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setMinimized])

  const handleSubmit = useCallback(
    async (input: string) => {
      const trimmed = input.trim()
      if (!trimmed) return

      addTerminalEntry({ type: 'input', text: trimmed })
      addCommandHistory(trimmed)

      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: trimmed,
          sessionId: useTerminalStore.getState().sessionId,
        }),
      }).catch(() => {})

      const result = await executeCommand(trimmed)
      result.output.forEach((line) => {
        addTerminalEntry({ type: result.type ?? 'output', text: line })
      })
      if (result.view) setView(result.view)
    },
    [addTerminalEntry, addCommandHistory, setView]
  )

  return (
    <CRTMonitor isMinimized={isMinimized}>
      <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* ── Title bar ─────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px 10px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(0,0,0,0.5)',
            flexShrink: 0,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setMinimized(!isMinimized)}
              style={{ width: 11, height: 11, borderRadius: '50%', background: '#f5a623', border: 'none', cursor: 'pointer' }}
              title="Minimize"
            />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#3fb950', opacity: 0.4 }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#f85149', opacity: 0.4 }} />
          </div>

          <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
            terminal — portfolio-os
          </span>

          <button
            onClick={() => setMinimized(!isMinimized)}
            style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            title={isMinimized ? 'Expand' : 'Minimise'}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        {!isMinimized && (
          <>
            <TerminalOutput entries={terminalHistory} />
            <TerminalInput onSubmit={handleSubmit} commandHistory={commandHistory} />
          </>
        )}
      </div>
    </CRTMonitor>
  )
}
