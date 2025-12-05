"use client"

import { useState, useEffect } from "react"

export default function Header() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/health")
        setIsOnline(response.ok)
      } catch {
        setIsOnline(false)
      }
    }
    checkStatus()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-background/80">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <h1 className="text-xl font-bold text-white">Arena AI</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-white/60" : "bg-white/30"}`} />
          <span className="text-xs text-white/60">
            {isOnline === null ? "Checking..." : isOnline ? "Ollama Online" : "Offline"}
          </span>
        </div>
      </div>
    </header>
  )
}
