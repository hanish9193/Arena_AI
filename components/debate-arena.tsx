"use client"

import { useState, useEffect, useRef } from "react"
import { OLLAMA_MODELS } from "@/lib/ollama"

interface Argument {
  model: string
  content: string
  score: number
}

interface DebateArenaProps {
  question: string
  onBack: () => void
}

export default function DebateArena({ question, onBack }: DebateArenaProps) {
  const [debateArguments, setDebateArguments] = useState<Argument[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [isDebating, setIsDebating] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [consensus, setConsensus] = useState("")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const TOTAL_ROUNDS = 3

  useEffect(() => {
    if (!isDebating) return

    const runDebateRound = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/debate-local", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: question,
            round: currentRound,
            previousArguments: debateArguments.map((a) => `${a.model}: ${a.content}`),
          }),
        })

        const data = await response.json()

        const newArguments = data.debateArguments.map((arg: any) => ({
          model: arg.model,
          content: arg.argument,
          score: arg.score,
        }))

        setDebateArguments((prev) => [...prev, ...newArguments])

        if (data.consensus) {
          setConsensus(data.consensus)
        }

        // Auto-scroll
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
          }
        }, 200)

        if (currentRound < TOTAL_ROUNDS) {
          setCurrentRound((prev) => prev + 1)
        } else {
          setIsDebating(false)
        }
      } catch (error) {
        console.error("Error running debate round:", error)
        setIsDebating(false)
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(runDebateRound, currentRound === 1 ? 500 : 2000)
    return () => clearTimeout(timer)
  }, [currentRound, isDebating, debateArguments, question])

  const argumentsByRound = Array.from({ length: TOTAL_ROUNDS }, (_, roundIdx) => {
    const roundNum = roundIdx + 1
    return debateArguments.filter((_, idx) => Math.floor(idx / OLLAMA_MODELS.length) === roundIdx)
  })

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <button
            onClick={onBack}
            className="text-sm text-white/60 hover:text-white/80 transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            New Debate
          </button>
          <div>
            <h2 className="text-4xl font-bold text-white mb-3">{question}</h2>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>Round {currentRound}</span>
              <span>•</span>
              <span>{OLLAMA_MODELS.length} open-source models</span>
              <span>•</span>
              <span>Unlimited memory</span>
            </div>
          </div>
        </div>

        {/* Main Debate Container */}
        <div
          ref={scrollContainerRef}
          className="space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto pr-4 custom-scrollbar"
        >
          {/* Render arguments grouped by round */}
          {argumentsByRound.map((roundArgs, roundIdx) => (
            <div key={roundIdx} className="space-y-4">
              {roundIdx > 0 && <div className="h-px bg-white/10" />}
              {roundIdx < argumentsByRound.length && (
                <div className="sticky top-0 bg-background/80 backdrop-blur-md py-2 -mx-4 px-4">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                    Round {roundIdx + 1}
                  </h3>
                </div>
              )}

              {roundArgs.length === 0
                ? roundIdx === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="text-center space-y-3">
                        <div className="text-4xl animate-pulse">⚡</div>
                        <p className="text-white/60 font-medium">AI models debating...</p>
                        <p className="text-white/30 text-sm">This usually takes 30-60 seconds</p>
                      </div>
                    </div>
                  )
                : roundArgs.map((arg, idx) => (
                    <div
                      key={`${roundIdx}-${idx}`}
                      className="group p-6 rounded-xl bg-glass border border-glass-border backdrop-blur-xl hover:border-white/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                    >
                      {/* Model Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <span className="text-sm font-bold">{arg.model.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm">{arg.model}</h3>
                            <p className="text-xs text-white/40">Open-source Model</p>
                          </div>
                        </div>
                        {/* Score Badge */}
                        <div className="flex flex-col items-end">
                          <div className="text-2xl font-bold text-white">{arg.score}/10</div>
                          <div className="text-xs text-white/40">Quality Score</div>
                        </div>
                      </div>

                      {/* Argument Content */}
                      <p className="text-white/90 text-base leading-relaxed text-pretty">{arg.content}</p>

                      {/* Score Bar */}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-white/50">Quality</span>
                          <span className="text-xs font-medium text-white/70">{arg.score * 10}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-white/40 transition-all duration-500"
                            style={{ width: `${arg.score * 10}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          ))}

          {/* Loading indicator for next round */}
          {isLoading && currentRound > 1 && (
            <div className="flex justify-center py-6">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Consensus Section */}
          {!isDebating && consensus && (
            <div className="mt-8 p-8 rounded-xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-sm uppercase tracking-widest text-white/40 font-semibold mb-3">Consensus</h3>
              <p className="text-white/80 leading-relaxed text-lg">{consensus}</p>
            </div>
          )}
        </div>

        {/* Status Bar */}
        {!isDebating && (
          <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10 text-center">
            <p className="text-white/60 text-sm">Debate complete. All models have presented their arguments.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
