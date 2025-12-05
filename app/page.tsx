"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import DebateArena from "@/components/debate-arena"
import OfflineStatus from "@/components/offline-status"

export default function Home() {
  const [debateStarted, setDebateStarted] = useState(false)
  const [question, setQuestion] = useState("")
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
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      {isOnline === false && <OfflineStatus />}

      <div className="relative">
        {/* Animated grid background */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10">
          {!debateStarted ? (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
              <div className="max-w-3xl w-full space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                  <h1 className="text-7xl md:text-8xl font-bold text-foreground tracking-tight">Arena AI</h1>
                  <p className="text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
                    Watch unlimited-memory open-source AI models debate any topic with flawless logic. Pure
                    intelligence, no limits.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">What should they debate?</label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask anything... science, philosophy, ethics, strategy, hypotheticals, controversial topics - anything you want to see debated by top open-source models."
                      className="w-full h-40 px-6 py-4 rounded-xl bg-glass border border-glass-border backdrop-blur-xl text-foreground placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all resize-none text-lg leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={() => question.trim() && setDebateStarted(true)}
                    disabled={!question.trim() || isOnline === false}
                    className="w-full py-4 px-6 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 text-lg"
                  >
                    {isOnline === false ? "Ollama Offline" : "Start Debate"}
                  </button>
                </div>

                {/* Info Footer */}
                <div className="text-center text-white/40 text-sm space-y-2">
                  <p>Powered by open-source models with unlimited memory</p>
                  <p>Multi-model consensus through live debate</p>
                </div>
              </div>
            </div>
          ) : (
            <DebateArena
              question={question}
              onBack={() => {
                setDebateStarted(false)
                setQuestion("")
              }}
            />
          )}
        </div>
      </div>
    </main>
  )
}
