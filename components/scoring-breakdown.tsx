"use client"

interface ScoreBreakdown {
  logic: number
  factual: number
  relevance: number
  persuasion: number
  novelty: number
  viability: number
}

interface ScoringBreakdownProps {
  scores: ScoreBreakdown
  overall: number
}

export default function ScoringBreakdown({ scores, overall }: ScoringBreakdownProps) {
  const categories = [
    { label: "Logic", value: scores.logic },
    { label: "Factual", value: scores.factual },
    { label: "Relevance", value: scores.relevance },
    { label: "Persuasion", value: scores.persuasion },
    { label: "Novelty", value: scores.novelty },
    { label: "Viability", value: scores.viability },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <div key={cat.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{cat.label}</span>
              <span className="text-xs font-bold text-foreground">{cat.value.toFixed(1)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white/40 transition-all duration-500"
                style={{ width: `${(cat.value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overall Score */}
      <div className="pt-3 border-t border-glass-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Overall Score</span>
          <span className="text-2xl font-bold text-white/80">{overall.toFixed(1)}</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-white/60 transition-all duration-500"
            style={{ width: `${(overall / 10) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
