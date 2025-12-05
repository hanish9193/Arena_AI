"use client"

export default function OfflineStatus() {
  return (
    <div className="fixed top-20 left-0 right-0 z-40 px-4">
      <div className="max-w-3xl mx-auto p-4 rounded-xl bg-white/5 border border-white/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">⚠️</span>
          </div>
          <div>
            <p className="font-semibold text-white">Ollama Not Connected</p>
            <p className="text-sm text-white/60">
              Make sure Ollama is running locally. Start it with:{" "}
              <code className="bg-black/50 px-2 py-1 rounded text-white/80">ollama serve</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
