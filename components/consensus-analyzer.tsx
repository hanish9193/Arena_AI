"use client"

interface ConsensusAnalyzerProps {
  args: any[]
  models: any[]
}

export default function ConsensusAnalyzer({ args, models }: ConsensusAnalyzerProps) {
  // Calculate agreement level between models
  const calculateConsensus = () => {
    if (args.length === 0) return 0

    const modelScores = models.map((model) => {
      const modelArgs = args.filter((arg) => arg.modelId === model.id)
      if (modelArgs.length === 0) return null
      return modelArgs.reduce((sum, arg) => sum + arg.score, 0) / modelArgs.length
    })

    const validScores = modelScores.filter((s) => s !== null) as number[]
    if (validScores.length < 2) return 0

    // Calculate standard deviation to measure agreement
    const mean = validScores.reduce((a, b) => a + b) / validScores.length
    const variance = validScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / validScores.length
    const stdDev = Math.sqrt(variance)

    // Convert to agreement percentage (lower std dev = higher agreement)
    return Math.max(0, 100 - stdDev * 15)
  }

  const consensusLevel = calculateConsensus()

  const getConsensusLabel = (level: number) => {
    if (level > 80) return "Strong Consensus"
    if (level > 60) return "Moderate Consensus"
    if (level > 40) return "Weak Consensus"
    return "Divergent Views"
  }

  return (
    <div className="p-6 rounded-lg bg-glass border border-glass-border backdrop-blur-xl">
      <h3 className="font-semibold text-foreground mb-4 text-sm">Consensus Analysis</h3>

      <div className="space-y-4">
        {/* Consensus Meter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Agreement Level</span>
            <span className="text-sm font-bold text-white/80">{consensusLevel.toFixed(0)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-white/50 transition-all duration-500" style={{ width: `${consensusLevel}%` }} />
          </div>
        </div>

        {/* Consensus Label */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs font-medium text-foreground">{getConsensusLabel(consensusLevel)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {consensusLevel > 80
              ? "Models show strong agreement on key points"
              : consensusLevel > 60
                ? "Models generally align with minor disagreements"
                : consensusLevel > 40
                  ? "Significant differences in perspectives"
                  : "Models present divergent viewpoints"}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="space-y-2 pt-2 border-t border-glass-border">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Highest Score</span>
            <span className="font-medium text-foreground">
              {args.length > 0 ? Math.max(...args.map((a) => a.score)).toFixed(1) : "0.0"}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Lowest Score</span>
            <span className="font-medium text-foreground">
              {args.length > 0 ? Math.min(...args.map((a) => a.score)).toFixed(1) : "0.0"}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Score Range</span>
            <span className="font-medium text-foreground">
              {args.length > 0
                ? (Math.max(...args.map((a) => a.score)) - Math.min(...args.map((a) => a.score))).toFixed(1)
                : "0.0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
