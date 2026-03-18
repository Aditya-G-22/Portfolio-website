'use client'

import { useEffect } from 'react'
import { useTerminalStore } from '@/store/useTerminalStore'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTerminalStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}
