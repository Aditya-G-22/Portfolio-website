'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { about } from '@/data/about'

const skillContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
}

const skillItem = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  show:   { opacity: 1, scale: 1,   y: 0,  transition: { type: 'spring' as const, stiffness: 280, damping: 20 } },
}

export default function AboutView() {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full flex flex-col overflow-hidden"
    >

      {/* ── Masthead ── */}
      <div className="border-t-2 border-b-2 border-[var(--color-text)] py-2 px-6 text-center shrink-0">
        <h1
          className="font-black uppercase leading-none tracking-tight text-[var(--color-text)]"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2rem, 7vw, 3.5rem)',
          }}
        >
          ABOUT ME
        </h1>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5 flex flex-col gap-5">

        {/* ── Main row: Photo | Bio | Info ── */}
        <div className="flex gap-5 items-start">

          {/* Photo */}
          <div
            className="shrink-0 border border-[var(--color-border)] overflow-hidden"
            style={{ width: 140, aspectRatio: '3/4' }}
          >
            <Image
              src={about.image ?? '/avatar.png'}
              alt={about.name}
              width={140}
              height={187}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(10%) contrast(1.05)' }}
            />
          </div>

          {/* Bio */}
          <div className="flex-1 min-w-0">
            <h2
              className="font-bold text-[var(--color-text)] mb-3"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '1.4rem',
              }}
            >
              Who am I?
            </h2>
            <div className="space-y-2.5">
              {about.bio.map((p, i) => (
                <p
                  key={i}
                  className="font-mono text-[12.5px] text-[var(--color-text)] leading-relaxed text-justify"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right info column */}
          <div className="shrink-0 flex flex-col gap-2" style={{ width: 160 }}>
            <p
              className="font-mono text-[11px] text-[var(--color-text)] leading-snug border-b border-[var(--color-border)] pb-2"
            >
              {about.title}
            </p>
            <p className="font-mono text-[11px] text-[var(--color-text-muted)]">
              📍 {about.location}
            </p>
            <p className="font-mono text-[10px] text-[var(--color-accent)] mt-1">
              {about.availability}
            </p>
            <div className="mt-2 border-t border-dashed border-[var(--color-border)] pt-2 space-y-0.5">
              <p className="font-mono text-[9px] text-[var(--color-text-muted)] break-all">{about.email}</p>
              <p className="font-mono text-[9px] text-[var(--color-text-muted)]">{about.phone}</p>
            </div>
          </div>

        </div>

        {/* ── Skills grid — 2 rows ── */}
        <div className="border-t border-[var(--color-border)] pt-4">
          <motion.div
            className="flex flex-wrap gap-2"
            variants={skillContainer}
            initial="hidden"
            animate="show"
          >
            {about.skills_summary.map((skill) => (
              <motion.span
                key={skill}
                variants={skillItem}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 12px var(--color-accent)',
                  borderColor: 'var(--color-accent)',
                  transition: { duration: 0.15 },
                }}
                className="font-mono border border-[var(--color-border)] text-[var(--color-accent)] px-4 py-1.5 cursor-default"
                style={{ fontSize: '13px' }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>

      </div>

      {/* ── Footer bar — pinned to bottom ── */}
      <div className="flex items-center justify-between border-t-2 border-[var(--color-text)] px-6 py-1 shrink-0">
        <span className="font-mono text-[9px] text-[var(--color-text-muted)]">portfolio-os™</span>
        <span className="font-mono text-[9px] text-[var(--color-text-muted)]">01</span>
      </div>

    </motion.div>
  )
}
