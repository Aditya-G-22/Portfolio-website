'use client'

import { motion } from 'framer-motion'
import { useTerminalStore } from '@/store/useTerminalStore'

const commands = ['about', 'projects', 'skills', 'experience', 'contact', 'resume']

export default function HomeView() {
  const { addTerminalEntry, setView, addCommandHistory } = useTerminalStore()

  const handleQuickCmd = (cmd: string) => {
    addTerminalEntry({ type: 'input', text: cmd })
    addCommandHistory(cmd)
    addTerminalEntry({ type: 'success', text: `  Loading ${cmd}...` })
    setView(cmd as any)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full text-center px-8 gap-8"
    >
      {/* ASCII art */}
      <pre
        className="font-mono text-[var(--color-accent)] text-[9px] sm:text-[10px] leading-tight select-none hidden sm:block"
        aria-hidden
      >
{`  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗      ██╗ ██████╗
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║      ██║██╔═══██╗
  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║      ██║██║   ██║
  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║      ██║██║   ██║
  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗ ██║╚██████╔╝
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝ ╚═╝ ╚═════╝`}
      </pre>

      <div className="space-y-2">
        <h1 className="font-mono text-xl sm:text-2xl font-bold text-[var(--color-text)]">
          portfolio<span className="text-[var(--color-accent)]">-os</span>
          <span className="text-[var(--color-text-muted)] text-sm ml-2">v1.0.0</span>
        </h1>
        <p className="font-mono text-[var(--color-text-muted)] text-sm max-w-md">
          Interactive developer portfolio. Use the terminal to navigate.
        </p>
      </div>

      {/* Quick launch */}
      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
        {commands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleQuickCmd(cmd)}
            className="font-mono text-xs px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors duration-150"
          >
            {cmd}
          </button>
        ))}
      </div>

      <p className="font-mono text-[10px] text-[var(--color-text-muted)] animate-pulse">
        ↓ type commands in the terminal (bottom-right) ↓
      </p>
    </motion.div>
  )
}
