import StatusBar from '@/components/StatusBar'
import ContentPanel from '@/components/ContentPanel/ContentPanel'
import Terminal from '@/components/Terminal/Terminal'

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Top status bar */}
      <StatusBar />

      {/* Main content area */}
      <main className="flex-1 flex items-start justify-center px-4 py-4 md:px-8">
        <div className="w-full max-w-3xl">
          <ContentPanel />
        </div>
      </main>

      {/* Fixed bottom-right terminal */}
      <Terminal />
    </div>
  )
}
