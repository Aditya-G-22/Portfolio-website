'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'

interface Props {
  onSubmit: (value: string) => void
  commandHistory: string[]
}

export default function TerminalInput({ onSubmit, commandHistory }: Props) {
  const [value, setValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  // Always keep input focused when terminal is active
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(value)
      setValue('')
      setHistoryIndex(-1)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(nextIndex)
      setValue(commandHistory[nextIndex] ?? '')
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      setValue(nextIndex === -1 ? '' : commandHistory[nextIndex] ?? '')
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      // Simple tab completion
      const { commandRegistry } = require('@/components/Terminal/commandRegistry')
      const matches = Object.keys(commandRegistry).filter((cmd) =>
        cmd.startsWith(value.toLowerCase())
      )
      if (matches.length === 1) {
        setValue(matches[0])
      }
    }
  }

  return (
    <div className="flex items-center px-3 py-2 border-t border-[var(--color-border)] font-mono text-xs shrink-0">
      <span className="text-[var(--color-prompt)] mr-1 shrink-0">visitor@portfolio</span>
      <span className="text-[var(--color-text-muted)] mr-1 shrink-0">:</span>
      <span className="text-[var(--color-accent)] mr-1 shrink-0">~</span>
      <span className="text-[var(--color-text-muted)] mr-1 shrink-0">$</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-[var(--color-text)] caret-[var(--color-cursor)] placeholder-[var(--color-text-muted)] min-w-0"
        placeholder="type a command..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  )
}
