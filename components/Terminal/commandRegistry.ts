import { ViewType, useTerminalStore } from '@/store/useTerminalStore'
import { ThemeName, themes } from '@/styles/themes'
import { socials } from '@/data/socials'

// ── Simple argument parser ───────────────────────────────────────────────────
// Handles: --flag value  |  --flag "quoted value"  |  positional args
export function parseArgs(input: string): { args: string[]; flags: Record<string, string> } {
  const tokens: string[] = []
  const regex = /--(\w[\w-]*)(?:\s+(?:"([^"]*)"|((?!--)\S+)))?|"([^"]*)"|(\S+)/g
  let m: RegExpExecArray | null

  const flags: Record<string, string> = {}
  const args: string[] = []

  // Tokenise respecting quoted strings
  const parts: string[] = []
  let remainder = input.trim()
  const tokenRe = /"([^"]*)"|((?!")[^\s]+)/g
  let tok: RegExpExecArray | null
  while ((tok = tokenRe.exec(remainder)) !== null) {
    parts.push(tok[1] !== undefined ? tok[1] : tok[2])
  }

  let i = 0
  while (i < parts.length) {
    const p = parts[i]
    if (p.startsWith('--')) {
      const key = p.slice(2)
      if (i + 1 < parts.length && !parts[i + 1].startsWith('--')) {
        flags[key] = parts[i + 1]
        i += 2
      } else {
        flags[key] = 'true'
        i++
      }
    } else {
      args.push(p)
      i++
    }
  }

  return { args, flags }
}

// ── ASCII welcome banner ─────────────────────────────────────────────────────
export const WELCOME_BANNER = `
  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗      ██╗ ██████╗
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║      ██║██╔═══██╗
  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║      ██║██║   ██║
  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║      ██║██║   ██║
  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗ ██║╚██████╔╝
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝ ╚═╝ ╚═════╝
`.trim()

export const WELCOME_MESSAGE = [
  WELCOME_BANNER,
  '',
  '  portfolio-os v1.0.0  —  Interactive Developer Portfolio',
  '  ─────────────────────────────────────────────────────────',
  '  Type "help" to see available commands.',
  '  Use ↑↓ for command history. Ctrl+L to clear. Ctrl+K to focus.',
  '',
]

// ── Command result type ──────────────────────────────────────────────────────
export interface CommandResult {
  output: string[]
  view?: ViewType
  type?: 'output' | 'error' | 'success' | 'info'
}

// ── Command type ─────────────────────────────────────────────────────────────
export interface Command {
  name: string
  description: string
  usage?: string
  handler: (args: string[], flags: Record<string, string>) => CommandResult | Promise<CommandResult>
}

// ── Registry ─────────────────────────────────────────────────────────────────
export const commandRegistry: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show all available commands',
    handler: () => ({
      output: [
        '  Available commands:',
        '  ──────────────────────────────────────────────────────────────',
        '  help           Show this help message',
        '  about          View bio, skills overview, and profile',
        '  projects       Browse project portfolio',
        '  skills         View technical skills breakdown',
        '  experience     View work history & experience timeline',
        '  contact        View contact information',
        '  socials        List social media links',
        '  message        Send a message (see usage below)',
        '  theme          Change the color theme',
        '  resume         View / download resume',
        '  history        Show command history',
        '  clear          Clear the terminal',
        '  welcome        Show welcome screen',
        '  ──────────────────────────────────────────────────────────────',
        '  Usage: message --name "Your Name" --email "you@mail.com" --body "Hi!"',
        '  Usage: theme [dark|light|hacker|retro]',
      ],
      type: 'info',
    }),
  },

  about: {
    name: 'about',
    description: 'View bio, skills, and profile',
    handler: () => ({
      output: ['  Loading about section...'],
      view: 'about',
      type: 'success',
    }),
  },

  projects: {
    name: 'projects',
    description: 'Browse project portfolio',
    handler: () => ({
      output: ['  Loading projects...'],
      view: 'projects',
      type: 'success',
    }),
  },

  skills: {
    name: 'skills',
    description: 'View technical skills breakdown',
    handler: () => ({
      output: ['  Loading skills...'],
      view: 'skills',
      type: 'success',
    }),
  },

  experience: {
    name: 'experience',
    description: 'View work history & experience timeline',
    handler: () => ({
      output: ['  Loading experience timeline...'],
      view: 'experience',
      type: 'success',
    }),
  },

  contact: {
    name: 'contact',
    description: 'View contact information',
    handler: () => ({
      output: ['  Loading contact details...'],
      view: 'contact',
      type: 'success',
    }),
  },

  socials: {
    name: 'socials',
    description: 'List social media links',
    handler: () => ({
      output: [
        '  Social links:',
        '  ─────────────────────────────────────────',
        ...socials.map(
          (s) => `  ${s.icon}  ${s.platform.padEnd(14)} ${s.url}`
        ),
      ],
      type: 'info',
    }),
  },

  message: {
    name: 'message',
    description: 'Send a message',
    usage: 'message --name "Name" --email "email@example.com" --body "Your message"',
    handler: async (_args, flags) => {
      const { name, email, body } = flags

      if (!name || !email || !body) {
        return {
          output: [
            '  Error: Missing required fields.',
            '  Usage: message --name "Your Name" --email "you@mail.com" --body "Hi!"',
          ],
          type: 'error',
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return {
          output: ['  Error: Invalid email address.'],
          type: 'error',
        }
      }

      try {
        const res = await fetch('/api/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, body }),
        })
        const data = await res.json()

        if (!res.ok) {
          return { output: [`  Error: ${data.error || 'Failed to send message.'}`], type: 'error' }
        }

        return {
          output: [
            `  Message sent successfully!`,
            `  From: ${name} <${email}>`,
            `  I'll get back to you soon. Thanks!`,
          ],
          type: 'success',
        }
      } catch {
        return {
          output: ['  Network error. Could not send message.'],
          type: 'error',
        }
      }
    },
  },

  theme: {
    name: 'theme',
    description: 'Change color theme: dark | light | hacker | retro',
    handler: (args) => {
      const themeName = args[0] as ThemeName
      const valid: ThemeName[] = ['dark', 'light', 'hacker', 'retro']

      if (!themeName || !valid.includes(themeName)) {
        return {
          output: [
            '  Usage: theme [dark|light|hacker|retro]',
            `  Available: ${valid.join(', ')}`,
            `  Current: ${useTerminalStore.getState().theme}`,
          ],
          type: 'info',
        }
      }

      useTerminalStore.getState().setTheme(themeName)
      return {
        output: [`  Theme changed to: ${themes[themeName].label}`],
        type: 'success',
      }
    },
  },

  resume: {
    name: 'resume',
    description: 'View or download resume',
    handler: () => ({
      output: ['  Opening resume...'],
      view: 'resume',
      type: 'success',
    }),
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal output',
    handler: () => {
      useTerminalStore.getState().clearTerminal()
      return { output: [] }
    },
  },

  welcome: {
    name: 'welcome',
    description: 'Show welcome screen',
    handler: () => ({
      output: WELCOME_MESSAGE,
      view: 'home',
      type: 'info',
    }),
  },

  history: {
    name: 'history',
    description: 'Show command history',
    handler: () => {
      const cmds = useTerminalStore.getState().commandHistory
      if (cmds.length === 0) {
        return { output: ['  No command history yet.'], type: 'info' }
      }
      return {
        output: [
          '  Command history:',
          ...cmds.map((c, i) => `  ${String(cmds.length - i).padStart(3)}  ${c}`),
        ],
        type: 'info',
      }
    },
  },
}

// ── Execute command ───────────────────────────────────────────────────────────
export async function executeCommand(input: string): Promise<CommandResult> {
  const trimmed = input.trim()
  if (!trimmed) return { output: [] }

  const { args, flags } = parseArgs(trimmed)
  const [cmdName, ...restArgs] = args

  const cmd = commandRegistry[cmdName.toLowerCase()]
  if (!cmd) {
    return {
      output: [
        `  command not found: ${cmdName}. Type 'help' for available commands.`,
      ],
      type: 'error',
    }
  }

  return cmd.handler(restArgs, flags)
}
