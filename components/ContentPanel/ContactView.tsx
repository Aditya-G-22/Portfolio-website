'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { about } from '@/data/about'
import { socials } from '@/data/socials'

const item = {
  hidden: { opacity: 0, y: 12 },
  show:  { opacity: 1, y: 0  },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactView() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [body,    setBody]    = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const [errMsg,  setErrMsg]  = useState('')

  const handleSend = async () => {
    if (!name.trim() || !email.trim() || !body.trim()) {
      setErrMsg('All fields are required.')
      setStatus('error')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrMsg('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrMsg('')

    try {
      const res  = await fetch('/api/message', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, body }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrMsg(data.error || 'Failed to send. Try again.')
        setStatus('error')
      } else {
        setStatus('sent')
        setName(''); setEmail(''); setBody('')
      }
    } catch {
      setErrMsg('Network error. Could not send message.')
      setStatus('error')
    }
  }

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full flex flex-col px-6 py-5 overflow-hidden"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col min-h-0"
      >
        {/* Header */}
        <motion.h1
          variants={item}
          className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest border-b border-[var(--color-border)] pb-2 mb-5 shrink-0"
        >
          contact
        </motion.h1>

        {/* ── Two-column layout ── */}
        <div className="flex-1 flex gap-5 min-h-0">

          {/* Left — contact info */}
          <motion.div
            variants={item}
            className="flex flex-col gap-4 w-56 shrink-0"
          >
            {/* Who */}
            <div
              className="p-4 rounded-lg border border-[var(--color-border)] space-y-3 flex-1"
              style={{ backgroundColor: 'var(--color-bg-terminal)' }}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">👋</div>
                <div>
                  <p className="font-mono font-bold text-sm text-[var(--color-text)]">Let&apos;s work together</p>
                  <p className="font-mono text-[11px] text-[var(--color-accent)]">{about.availability}</p>
                </div>
              </div>

              <div className="font-mono text-xs space-y-1">
                <div className="flex gap-2">
                  <span className="text-[var(--color-text-muted)] shrink-0">📍</span>
                  <span className="text-[var(--color-text)]">{about.location}</span>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-2 border-t border-[var(--color-border)] flex flex-col gap-1.5">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] flex items-center gap-2 px-2.5 py-1.5 rounded border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-muted)] transition-colors"
                  >
                    <span>{s.icon}</span>
                    <span>{s.platform}</span>
                    <span className="ml-auto text-[9px] opacity-40">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — message form */}
          <motion.div
            variants={item}
            className="flex-1 flex flex-col gap-3 min-h-0"
          >
            <h2 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest shrink-0">
              send a message
            </h2>

            <div className="flex-1 flex flex-col gap-2 min-h-0">
              {/* Name */}
              <div className="flex gap-2 items-center shrink-0">
                <span className="font-mono text-[11px] text-[var(--color-text-muted)] w-10 shrink-0">name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 font-mono text-xs bg-transparent border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none px-3 py-2 rounded text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex gap-2 items-center shrink-0">
                <span className="font-mono text-[11px] text-[var(--color-text-muted)] w-10 shrink-0">email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 font-mono text-xs bg-transparent border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none px-3 py-2 rounded text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors"
                />
              </div>

              {/* Message — fills remaining height */}
              <div className="flex gap-2 items-stretch flex-1 min-h-0">
                <span className="font-mono text-[11px] text-[var(--color-text-muted)] w-10 shrink-0 pt-2">msg</span>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Your message..."
                  className="flex-1 font-mono text-xs bg-transparent border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none px-3 py-2 rounded text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Status + button */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={handleSend}
                disabled={status === 'sending' || status === 'sent'}
                className="font-mono text-xs px-4 py-2 rounded border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'sending...' : status === 'sent' ? '✓ sent' : '→ send message'}
              </button>
              {status === 'error' && <p className="font-mono text-[11px] text-red-400">{errMsg}</p>}
              {status === 'sent'  && <p className="font-mono text-[11px] text-green-400">✓ Sent! I&apos;ll get back to you soon.</p>}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  )
}
