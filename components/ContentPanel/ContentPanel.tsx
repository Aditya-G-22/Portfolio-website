'use client'

import { AnimatePresence } from 'framer-motion'
import { useTerminalStore } from '@/store/useTerminalStore'
import HomeView from './HomeView'
import AboutView from './AboutView'
import ProjectsView from './ProjectsView'
import ExperienceView from './ExperienceView'
import ContactView from './ContactView'
import ResumeView from './ResumeView'

export default function ContentPanel() {
  const currentView = useTerminalStore((s) => s.currentView)

  const viewMap = {
    home: <HomeView />,
    about: <AboutView />,
    projects: <ProjectsView />,
    experience: <ExperienceView />,
    contact: <ContactView />,
    resume: <ResumeView />,
  }

  return (
    <div
      className="flex flex-col rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xl"
      style={{
        backgroundColor: 'var(--color-bg-panel)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        height: 'calc(100vh - 120px)',
      }}
    >
      <AnimatePresence mode="wait">
        <div key={currentView} className="flex-1 overflow-hidden">
          {viewMap[currentView] ?? viewMap.home}
        </div>
      </AnimatePresence>
    </div>
  )
}
