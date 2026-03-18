export interface Social {
  platform: string
  url: string
  icon: string
  handle: string
}

export const socials: Social[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/aditya',
    icon: '⌥',
    handle: '@aditya',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/aditya-dev',
    icon: '◈',
    handle: 'aditya-dev',
  },
  {
    platform: 'Twitter / X',
    url: 'https://twitter.com/aditya_dev',
    icon: '◉',
    handle: '@aditya_dev',
  },
  {
    platform: 'Dev.to',
    url: 'https://dev.to/aditya',
    icon: '◎',
    handle: 'aditya',
  },
  {
    platform: 'Email',
    url: 'mailto:aditya@example.com',
    icon: '◐',
    handle: 'aditya@example.com',
  },
]
