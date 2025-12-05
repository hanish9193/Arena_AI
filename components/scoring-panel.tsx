"use client"

import { useState } from "react"
import ConsensusAnalyzer from "./consensus-analyzer"
import PDFReport from "./pdf-report"

interface ScoringPanelProps {
  args: any[]
  models: any[]
  isDebating: boolean
}

export default function ScoringPanel({ args, models, isDebating }: ScoringPanelProps) {
  const [showReport, setShowReport] = useState(false)
  const [consensus, setConsensus] = useState<any>(null)
  const [summary, setSummary] = useState<string>("")
  const [recommendations, setRecommendations] = useState<string[]>([])

  const getModelStats = (modelId: string) => {
    const modelArgs = args.filter((arg) => arg.modelId === modelId)
    if (modelArgs.length === 0) return null

    const avgScore = modelArgs.reduce((sum, arg) => sum + arg.score, 0) / modelArgs.length
    const totalVotes = modelArgs.reduce((sum, arg) => sum + arg.votes, 0)

    return { avgScore, totalVotes, count: modelArgs.length }
  }

  const rankings = models
    .map((model) => ({
      ...model,
      stats: getModelStats(model.id),
    }))
    .filter((m) => m.stats)
    .sort((a, b) => (b.stats?.avgScore || 0) - (a.stats?.avgScore || 0))

  const totalArguments = args.length
  const totalVotes = args.reduce((sum, arg) => sum + arg.votes, 0)
  const avgScore = totalArguments > 0 ? args.reduce((sum, arg) => sum + arg.score, 0) / totalArguments : 0

  const handleGenerateReport = async () => {
    setShowReport(true)
    // In a real implementation, this would call the report generation API
    // For now, we'll use mock data
    setConsensus({
      statement:
        "The debate revealed strong consensus on core principles with nuanced disagreements on implementation.",
      agreements: [
        "Key stakeholders must be involved",
        "Transparency is essential",
        "Phased implementation is recommended",
      ],
      disagreements: ["Timeline for rollout", "Resource allocation priorities"],
    })
    setSummary(
      "This debate explored multiple perspectives on the question, with each model contributing unique insights. The pragmatic analyst focused on measurable outcomes, the innovative thinker proposed creative solutions, the ethical philosopher examined moral implications, and the devil's advocate identified potential risks.",
    )
    setRecommendations([
      "Establish a cross-functional task force to oversee implementation",
      "Conduct stakeholder engagement sessions before rollout",
      "Develop contingency plans for identified risks",
      "Create metrics to measure success and impact",
    ])
  }

  if (showReport) {
    return (
      <div className="sticky top-24 space-y-4">
        <PDFReport
          question="Sample debate question"
          topic="ethics"
          arguments={args}
          consensus={consensus}
          summary={summary}
          recommendations={recommendations}
        />
        <button
          onClick={() => setShowReport(false)}
          className="w-full py-2 px-4 rounded-lg bg-glass border border-glass-border hover:bg-glass/80 text-foreground text-sm font-medium transition-all"
        >
          Back to Debate
        </button>
      </div>
    )
  }

  return (
    <div className="sticky top-24 space-y-4">
      {/* Leaderboard */}
      <div className="p-6 rounded-lg bg-glass border border-glass-border backdrop-blur-xl">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Leaderboard</h3>
        <div className="space-y-3">
          {rankings.map((model, idx) => (
            <div key={model.id} className="group">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-glass/50 transition-colors">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-bold text-white/80 w-6">#{idx + 1}</span>
                  <span className="text-2xl">{model.logo}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{model.name}</p>
                    <p className="text-xs text-muted-foreground">{model.stats?.count || 0} arguments</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white/80">{model.stats?.avgScore.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">/10</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConsensusAnalyzer arguments={args} models={models} />

      {/* Debate Statistics */}
      <div className="p-6 rounded-lg bg-glass border border-glass-border backdrop-blur-xl">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Debate Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Total Arguments</span>
            <span className="text-sm font-semibold text-foreground">{totalArguments}</span>
          </div>
          <div className="h-px bg-glass-border" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Total Votes</span>
            <span className="text-sm font-semibold text-foreground">{totalVotes}</span>
          </div>
          <div className="h-px bg-glass-border" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Average Score</span>
            <span className="text-sm font-semibold text-foreground">{avgScore.toFixed(1)}/10</span>
          </div>
          <div className="h-px bg-glass-border" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Status</span>
            <span className={`text-xs font-medium ${isDebating ? "text-white/70" : "text-white/50"}`}>
              {isDebating ? "In Progress" : "Complete"}
            </span>
          </div>
        </div>
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleGenerateReport}
        disabled={isDebating || totalArguments === 0}
        className="w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all duration-200 text-sm"
      >
        📄 Generate Report
      </button>
    </div>
  )
}
