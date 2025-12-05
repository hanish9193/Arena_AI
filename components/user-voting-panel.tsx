"use client"

import { useState } from "react"

interface UserVotingPanelProps {
  args: any[]
  models: any[]
}

export default function UserVotingPanel({ args, models }: UserVotingPanelProps) {
  const [userVotes, setUserVotes] = useState<Record<string, number>>({})

  const getModelVoteCount = (modelId: string) => {
    return Object.values(userVotes).filter((id) => id === modelId).length
  }

  const totalUserVotes = Object.keys(userVotes).length

  const userRankings = models
    .map((model) => ({
      ...model,
      userVotes: getModelVoteCount(model.id),
    }))
    .sort((a, b) => b.userVotes - a.userVotes)

  return (
    <div className="p-6 rounded-lg bg-glass border border-glass-border backdrop-blur-xl">
      <h3 className="font-semibold text-foreground mb-4 text-sm">Your Votes</h3>

      {totalUserVotes === 0 ? (
        <div className="text-center py-6">
          <p className="text-xs text-muted-foreground">Vote on arguments to see your preferences</p>
        </div>
      ) : (
        <div className="space-y-3">
          {userRankings.map((model, idx) => (
            <div key={model.id} className="flex items-center justify-between p-3 rounded-lg bg-glass-border/50">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-accent w-6">#{idx + 1}</span>
                <span className="text-2xl">{model.logo}</span>
                <p className="text-sm font-medium text-foreground">{model.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-accent">{model.userVotes}</p>
                <p className="text-xs text-muted-foreground">
                  {totalUserVotes > 0 ? ((model.userVotes / totalUserVotes) * 100).toFixed(0) : 0}%
                </p>
              </div>
            </div>
          ))}

          {/* Vote Summary */}
          <div className="mt-4 pt-4 border-t border-glass-border">
            <p className="text-xs text-muted-foreground mb-2">Total Votes Cast: {totalUserVotes}</p>
            <button
              onClick={() => setUserVotes({})}
              className="w-full py-2 px-3 rounded-md bg-glass-border/50 hover:bg-glass-border text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear Votes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
