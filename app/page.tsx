import StatusBar from '@/components/StatusBar'
import ContentPanel from '@/components/ContentPanel/ContentPanel'
import Terminal from '@/components/Terminal/Terminal'

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden relative">

      {/* Static wallpaper */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />

      {/* Top status bar */}
      <StatusBar />

      {/* Main content area */}
      <main className="flex-1 flex items-start justify-center px-4 py-4 md:px-6 relative z-10" style={{ paddingRight: '520px' }}>
        <div className="w-full max-w-4xl">
          <ContentPanel />
        </div>
      </main>

      {/* Fixed bottom-right terminal */}
      <Terminal />
    </div>
  )
}
