import { create } from 'zustand'
import { ThemeName } from '@/styles/themes'

export type ViewType =
  | 'home'
  | 'about'
  | 'projects'
  | 'experience'
  | 'contact'
  | 'resume'

export type TerminalEntry = {
  type: 'input' | 'output' | 'error' | 'success' | 'info'
  text: string
  id: string
}

interface TerminalStore {
  currentView: ViewType
  theme: ThemeName
  terminalHistory: TerminalEntry[]
  commandHistory: string[]
  isMinimized: boolean
  sessionId: string

  setView: (view: ViewType) => void
  setTheme: (theme: ThemeName) => void
  addTerminalEntry: (entry: Omit<TerminalEntry, 'id'>) => void
  clearTerminal: () => void
  addCommandHistory: (cmd: string) => void
  setMinimized: (val: boolean) => void
}

let entryCounter = 0

export const useTerminalStore = create<TerminalStore>((set) => ({
  currentView: 'home',
  theme: 'dark',
  terminalHistory: [],
  commandHistory: [],
  isMinimized: false,
  sessionId: Math.random().toString(36).slice(2),

  setView: (view) => set({ currentView: view }),

  setTheme: (theme) => set({ theme }),

  addTerminalEntry: (entry) =>
    set((state) => ({
      terminalHistory: [
        ...state.terminalHistory,
        { ...entry, id: `entry-${entryCounter++}` },
      ],
    })),

  clearTerminal: () => set({ terminalHistory: [] }),

  addCommandHistory: (cmd) =>
    set((state) => ({
      commandHistory: [cmd, ...state.commandHistory.slice(0, 49)],
    })),

  setMinimized: (val) => set({ isMinimized: val }),
}))
