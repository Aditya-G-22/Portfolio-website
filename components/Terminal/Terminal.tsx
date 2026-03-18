'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTerminalStore } from '@/store/useTerminalStore'
import { executeCommand, WELCOME_MESSAGE } from './commandRegistry'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

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

  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(480)
  const [height, setHeight] = useState(320)
  const isResizing = useRef(false)
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })

  // Show welcome on mount
  useEffect(() => {
    WELCOME_MESSAGE.forEach((line) => {
      addTerminalEntry({ type: 'info', text: line })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keyboard shortcuts: Ctrl+L = clear, Ctrl+K = focus terminal
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

      // Log command in background (fire-and-forget)
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

      if (result.view) {
        setView(result.view)
      }
    },
    [addTerminalEntry, addCommandHistory, setView]
  )

  // Resize logic
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault()
    isResizing.current = true
    resizeStart.current = { x: e.clientX, y: e.clientY, w: width, h: height }

    const onMove = (ev: MouseEvent) => {
      if (!isResizing.current) return
      const dx = resizeStart.current.x - ev.clientX
      const dy = resizeStart.current.y - ev.clientY
      setWidth(Math.max(320, Math.min(800, resizeStart.current.w + dx)))
      setHeight(Math.max(200, Math.min(600, resizeStart.current.h + dy)))
    }

    const onUp = () => {
      isResizing.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div
      className="terminal-fixed fixed bottom-4 right-4 z-50 flex flex-col rounded-lg overflow-hidden shadow-2xl border border-[var(--color-border)]"
      style={{
        width: isMinimized ? 260 : width,
        height: isMinimized ? 'auto' : height,
        backgroundColor: 'var(--color-bg-terminal)',
        transition: 'height 0.2s ease',
      }}
      ref={containerRef}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--color-border)] cursor-default select-none shrink-0"
        style={{ backgroundColor: 'var(--color-bg-terminal)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMinimized(!isMinimized)}
            className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors"
            title="Minimize"
          />
          <div className="w-3 h-3 rounded-full bg-green-400 opacity-40" />
          <div className="w-3 h-3 rounded-full bg-red-400 opacity-40" />
        </div>

        {/* Title */}
        <span className="text-[var(--color-text-muted)] font-mono text-[10px]">
          terminal — portfolio-os
        </span>

        {/* Resize toggle */}
        <button
          onClick={() => setMinimized(!isMinimized)}
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs font-mono"
          title={isMinimized ? 'Expand' : 'Minimize'}
        >
          {isMinimized ? '▲' : '▼'}
        </button>
      </div>

      {/* Body */}
      {!isMinimized && (
        <>
          <TerminalOutput entries={terminalHistory} />
          <TerminalInput onSubmit={handleSubmit} commandHistory={commandHistory} />
        </>
      )}

      {/* Resize handle (top-left corner) */}
      {!isMinimized && (
        <div
          className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
          onMouseDown={startResize}
        />
      )}
    </div>
  )
}
