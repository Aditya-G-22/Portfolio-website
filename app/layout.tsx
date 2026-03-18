import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'portfolio-os | Interactive Developer Portfolio',
  description:
    'A terminal-driven developer portfolio. Type commands to explore projects, skills, experience, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
