'use client'

import { motion } from 'framer-motion'

const resumeData = {
  name: 'Aditya Garg',
  contact: '+91 9896518857  ·  adityagarg535@gmail.com  ·  Bengaluru, India',
  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/adityagarg535' },
    { label: 'GitHub',   url: 'https://github.com/adityagarg535' },
  ],
  education: [
    { institution: 'RV University, Bengaluru', period: 'Aug 2022 – Aug 2026', detail: 'B.E. in Computer Science & Engineering  |  CGPA: 6.60' },
    { institution: 'Sky Hawk International School, Delhi', period: '2022', detail: 'Grade XII (CBSE)  |  72%' },
    { institution: 'Scholars Rosary Senior Secondary School, Rohtak', period: '2020', detail: 'Grade X (CBSE)  |  88.5%' },
  ],
  experience: [
    {
      role: 'Frontend Web Developer Intern',
      period: 'Jan 2024 – Apr 2024',
      company: 'Curium – Medical Transcription  |  Bengaluru, India',
      bullets: [
        'Built a full-stack medical imaging tool using React.js, Django REST APIs, and PostgreSQL for hernia diagnosis, enabling clinicians to upload and review diagnostic images.',
        'Designed responsive UIs with image visualization and annotation features, improving doctor feedback workflows.',
        'Collaborated with backend developers to ensure seamless API integration and optimised cross-application data flow.',
      ],
    },
  ],
  projects: [
    {
      title: 'Gmail Phishing Detector – Chrome Extension',
      tech: 'Python, DistilBERT, Scikit-learn, FastAPI, JavaScript, Chrome Extensions API',
      bullets: [
        'Problem: Phishing emails bypass standard Gmail filters, exposing users to credential theft and fraud.',
        'Built a Chrome extension using DOM parsing + MutationObserver, combining a fine-tuned DistilBERT model for email analysis with a Random Forest pipeline for URL threat scoring, served via FastAPI.',
        'Impact: Achieved 90%+ detection accuracy with probability fusion logic that reduced false positives, injecting inline warnings directly inside Gmail.',
      ],
    },
    {
      title: 'Real-Time Sign Language Detector',
      tech: 'Python, TensorFlow/Keras, OpenCV, NumPy',
      bullets: [
        'Problem: Hearing- and speech-impaired individuals face communication barriers where interpreters are unavailable.',
        'Built a real-time recognition system using OpenCV + CNN (TensorFlow/Keras), detecting all 26 English alphabet gestures via webcam with data augmentation.',
        'Impact: Achieved robust detection across varied lighting and hand orientations, enabling real-time gesture-to-text translation.',
      ],
    },
    {
      title: 'Portfolio OS – Terminal-Driven Developer Portfolio',
      tech: 'Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Zustand, PostgreSQL, Prisma ORM, Vercel',
      bullets: [
        'Personal Project: Built an OS-style portfolio where visitors navigate via a floating terminal widget with commands (about, projects, skills, theme), featuring 4 switchable themes, animated transitions via Framer Motion, and a PostgreSQL backend (Prisma + Neon) that logs visitor sessions and stores contact messages.',
        'Impact: Deployed on Vercel with CI/CD via GitHub Actions; features command history, keyboard shortcuts, resizable terminal, and real-time visitor analytics.',
      ],
    },
  ],
  skills: [
    { label: 'Languages',             value: 'C/C++, Java, Python, JavaScript, TypeScript, HTML/CSS' },
    { label: 'ML / Data Science',     value: 'TensorFlow, Keras, Scikit-learn, Pandas, NumPy, OpenCV, Transformers (HuggingFace)' },
    { label: 'Frameworks & Libraries',value: 'React, Next.js, FastAPI, Flask, Django REST Framework, Tailwind CSS, Framer Motion, Zustand' },
    { label: 'Developer Tools',       value: 'Git, Docker, PostgreSQL, MySQL, Prisma ORM, Supabase, Vercel, Postman, VS Code' },
  ],
}

const Section = ({ title }: { title: string }) => (
  <div className="flex items-center gap-3 mb-3">
    <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] shrink-0">
      {title}
    </h2>
    <div className="flex-1 h-px bg-[var(--color-accent)] opacity-40" />
  </div>
)

export default function ResumeView() {
  return (
    <motion.div
      key="resume"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="h-full flex flex-col overflow-hidden"
    >
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-6 pt-4 pb-2 border-b border-[var(--color-border)]">
        <span className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest">resume</span>
        <a
          href="/resume.pdf"
          download="Aditya_Garg_Resume.pdf"
          className="font-mono text-[11px] px-3 py-1 rounded border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors"
        >
          ↓ download PDF
        </a>
      </div>

      {/* Scrollable resume body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
        <div className="max-w-2xl mx-auto space-y-5">

          {/* Header */}
          <div className="text-center space-y-1 pb-3 border-b border-[var(--color-border)]">
            <h1 className="font-mono font-bold text-xl tracking-[0.25em] text-[var(--color-text)]">
              {resumeData.name.toUpperCase()}
            </h1>
            <p className="font-mono text-[11px] text-[var(--color-text-muted)]">{resumeData.contact}</p>
            <div className="flex justify-center gap-4">
              {resumeData.links.map((l) => (
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[var(--color-accent)] hover:underline">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <Section title="Education" />
            <div className="space-y-2">
              {resumeData.education.map((e, i) => (
                <div key={i} className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-mono text-[12px] font-bold text-[var(--color-text)]">{e.institution}</p>
                    <p className="font-mono text-[11px] text-[var(--color-text-muted)]">{e.detail}</p>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] shrink-0">{e.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <Section title="Experience" />
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-mono text-[12px] font-bold text-[var(--color-text)]">{exp.role}</p>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] shrink-0">{exp.period}</span>
                </div>
                <p className="font-mono text-[11px] text-[var(--color-accent)] italic">{exp.company}</p>
                <ul className="space-y-1 pl-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="font-mono text-[11px] text-[var(--color-text-muted)] leading-relaxed before:content-['•'] before:mr-2 before:text-[var(--color-accent)]">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <Section title="Projects" />
            <div className="space-y-4">
              {resumeData.projects.map((p, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="font-mono text-[12px] font-bold text-[var(--color-text)]">{p.title}</p>
                  <p className="font-mono text-[10px] text-[var(--color-accent)] italic">{p.tech}</p>
                  <ul className="space-y-1 pl-3">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="font-mono text-[11px] text-[var(--color-text-muted)] leading-relaxed before:content-['•'] before:mr-2 before:text-[var(--color-accent)]">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <Section title="Technical Skills" />
            <div className="space-y-1.5">
              {resumeData.skills.map((s) => (
                <div key={s.label} className="font-mono text-[11px] leading-relaxed">
                  <span className="text-[var(--color-text)] font-bold">{s.label}: </span>
                  <span className="text-[var(--color-text-muted)]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
