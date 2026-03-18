export type ThemeName = 'dark' | 'light' | 'hacker' | 'retro'

export interface Theme {
  name: ThemeName
  label: string
  bg: string
  bgPanel: string
  bgTerminal: string
  text: string
  textMuted: string
  textAccent: string
  textPrompt: string
  border: string
  cursor: string
  scrollbar: string
}

export const themes: Record<ThemeName, Theme> = {
  dark: {
    name: 'dark',
    label: 'Dark (Default)',
    bg: '#0d1117',
    bgPanel: 'rgba(22, 27, 34, 0.85)',
    bgTerminal: '#161b22',
    text: '#e6edf3',
    textMuted: '#7d8590',
    textAccent: '#58a6ff',
    textPrompt: '#3fb950',
    border: '#30363d',
    cursor: '#58a6ff',
    scrollbar: '#30363d',
  },
  light: {
    name: 'light',
    label: 'Light',
    bg: '#f0f2f5',
    bgPanel: 'rgba(255,255,255,0.9)',
    bgTerminal: '#1a1a2e',
    text: '#1c1c1e',
    textMuted: '#6e6e73',
    textAccent: '#007aff',
    textPrompt: '#34c759',
    border: '#d1d5db',
    cursor: '#007aff',
    scrollbar: '#d1d5db',
  },
  hacker: {
    name: 'hacker',
    label: 'Hacker',
    bg: '#000000',
    bgPanel: 'rgba(0, 20, 0, 0.9)',
    bgTerminal: '#001100',
    text: '#00ff41',
    textMuted: '#007a1e',
    textAccent: '#39ff14',
    textPrompt: '#00ff41',
    border: '#00ff41',
    cursor: '#00ff41',
    scrollbar: '#007a1e',
  },
  retro: {
    name: 'retro',
    label: 'Retro',
    bg: '#1a0a00',
    bgPanel: 'rgba(30, 15, 0, 0.9)',
    bgTerminal: '#0d0500',
    text: '#ffb000',
    textMuted: '#8b6000',
    textAccent: '#ff8c00',
    textPrompt: '#ffb000',
    border: '#8b6000',
    cursor: '#ffb000',
    scrollbar: '#8b6000',
  },
}
