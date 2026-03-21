'use client'

import { ReactNode } from 'react'
import Image from 'next/image'

interface Props {
  children: ReactNode
  isMinimized: boolean
}

export default function CRTMonitor({ children, isMinimized }: Props) {
  return (
    <div className="fixed bottom-0 right-4 z-50 flex flex-col items-center" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>

      {/* ── Cat sitting on top of monitor ─────────────────────────────── */}
      <Image
        src="/g.png"
        alt="cat"
        width={90}
        height={90}
        style={{
          position: 'absolute',
          top: -63,
          right: 32,
          zIndex: 10,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }}
      />

      {/* ── Monitor body / bezel ───────────────────────────────────────── */}
      <div
        style={{
          width: 540,
          background: 'linear-gradient(160deg, #ddd4b8 0%, #c4b99a 40%, #b0a580 100%)',
          borderRadius: '18px 18px 10px 10px',
          padding: '18px 22px 14px 22px',
          boxShadow: `
            inset -3px -3px 8px rgba(0,0,0,0.35),
            inset  3px  3px 8px rgba(255,255,255,0.25),
            0 -4px 40px rgba(0,0,0,0.6),
            0  0  80px rgba(0,0,0,0.4)
          `,
          position: 'relative',
        }}
      >
        {/* ── Screen bezel inner lip ──────────────────────────────────── */}
        <div
          style={{
            background: 'linear-gradient(160deg, #1a1a1a, #0a0a0a)',
            borderRadius: 10,
            padding: 6,
            boxShadow: `
              inset 0 0 12px rgba(0,0,0,0.9),
              inset 2px 2px 4px rgba(0,0,0,0.8)
            `,
          }}
        >
          {/* ── Screen surface ─────────────────────────────────────────── */}
          <div
            style={{
              position: 'relative',
              borderRadius: 6,
              overflow: 'hidden',
              background: '#020202',
              height: isMinimized ? 'auto' : 300,
              boxShadow: `
                inset 0 0 60px rgba(0,0,0,0.95),
                0 0 24px var(--color-accent),
                0 0  8px var(--color-accent)
              `,
            }}
          >
            {/* Terminal content */}
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>

            {/* Scanlines overlay */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
              }}
            />

            {/* Vignette / curved-edge shadow */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.65) 100%)',
              }}
            />

            {/* Glare reflection */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 4,
                left: 8,
                width: '35%',
                height: '28%',
                zIndex: 4,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, transparent 70%)',
                borderRadius: '0 0 60% 0',
              }}
            />
          </div>
        </div>

        {/* ── Bottom control bar ──────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            padding: '0 4px',
          }}
        >
          {/* Brand text */}
          <span style={{
            fontFamily: 'monospace',
            fontSize: 9,
            color: '#7a6e58',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            portfolio-os™
          </span>

          {/* Decorative vent slots */}
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                width: 18,
                height: 4,
                borderRadius: 2,
                background: 'linear-gradient(to bottom, #9a9080, #7a7060)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
              }} />
            ))}
          </div>

          {/* Power LED + button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00e676',
              boxShadow: '0 0 6px #00e676, 0 0 12px #00e676',
            }} />
            <div style={{
              width: 22,
              height: 10,
              borderRadius: 3,
              background: 'linear-gradient(to bottom, #c0b89a, #a09070)',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.4)',
            }} />
          </div>
        </div>
      </div>

    </div>
  )
}
