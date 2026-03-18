'use client'

import { useEffect, useRef } from 'react'
import { TerminalEntry } from '@/store/useTerminalStore'

interface Props {
  entries: TerminalEntry[]
}

const typeColors: Record<string, string> = {
  input: 'text-[var(--color-text)]',
  output: 'text-[var(--color-text-muted)]',
  error: 'text-red-400',
  success: 'text-green-400',
  info: 'text-[var(--color-accent)]',
}

export default function TerminalOutput({ entries }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed scrollbar-thin">
      {entries.map((entry) => (
        <div key={entry.id} className={`whitespace-pre-wrap break-words ${typeColors[entry.type] ?? typeColors.output}`}>
          {entry.type === 'input' ? (
            <span>
              <span className="text-[var(--color-prompt)]">visitor@portfolio</span>
              <span className="text-[var(--color-text-muted)]">:</span>
              <span className="text-[var(--color-accent)]">~</span>
              <span className="text-[var(--color-text-muted)]">$ </span>
              <span className="text-[var(--color-text)]">{entry.text}</span>
            </span>
          ) : (
            <span>{entry.text}</span>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
