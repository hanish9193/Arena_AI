"use client"

import { useState } from "react"
import ScoringBreakdown from "./scoring-breakdown"

interface AIArgumentCardProps {
  model: {
    id: string
    name: string
    logo: string
    color: string
    personality: string
  }
  argument: {
    id: string
    content: string
    score: number
    votes: number
    confidence: number
    scores?: {
      logic: number
      factual: number
      relevance: number
      persuasion: number
      novelty: number
      viability: number
    }
  }
  onVote: () => void
}

export default function AIArgumentCard({ model, argument, onVote }: AIArgumentCardProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleVote = () => {
    if (!hasVoted) {
      onVote()
      setHasVoted(true)
    }
  }

  // Generate detailed scores if not provided
  const scores = argument.scores || {
    logic: 7 + Math.random() * 2.5,
    factual: 7 + Math.random() * 2.5,
    relevance: 7 + Math.random() * 2.5,
    persuasion: 7 + Math.random() * 2.5,
    novelty: 6 + Math.random() * 3,
    viability: 7 + Math.random() * 2.5,
  }

  return (
    <div className="group p-6 rounded-lg bg-glass border border-glass-border backdrop-blur-xl hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/5 animate-in fade-in slide-in-from-bottom-4">
      {/* Header with Model Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="text-3xl">{model.logo}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-sm">{model.name}</h3>
            <p className="text-xs text-muted-foreground">{model.personality}</p>
          </div>
        </div>
        {/* Score Badge */}
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white/80">{argument.score.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">/10</span>
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Confidence</span>
          <span className="text-xs font-medium text-white/60">{(argument.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white/30 transition-all duration-500"
            style={{ width: `${argument.confidence * 100}%` }}
          />
        </div>
      </div>

      {/* Argument Content */}
      <p className="text-foreground text-sm leading-relaxed mb-4 text-pretty">{argument.content}</p>

      {/* Expandable Scoring Details */}
      {showDetails && (
        <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10">
          <ScoringBreakdown scores={scores} overall={argument.score} />
        </div>
      )}

      {/* Footer with Metrics and Actions */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>👍</span>
              <span className="font-medium">{argument.votes}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span>Relevance: </span>
              <span className="font-medium text-foreground">{(argument.score * 10).toFixed(0)}%</span>
            </div>
          </div>
          <button
            onClick={handleVote}
            disabled={hasVoted}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              hasVoted
                ? "bg-white/10 text-white/60 cursor-default"
                : "bg-white/5 hover:bg-white/15 text-white hover:text-white cursor-pointer"
            }`}
          >
            {hasVoted ? "✓ Voted" : "Vote"}
          </button>
        </div>

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-xs text-muted-foreground hover:text-white/70 transition-colors py-1"
        >
          {showDetails ? "Hide" : "Show"} scoring breakdown
        </button>
      </div>
    </div>
  )
}
