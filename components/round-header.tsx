"use client"

interface RoundHeaderProps {
  round: number
  totalRounds: number
  isComplete: boolean
}

export default function RoundHeader({ round, totalRounds, isComplete }: RoundHeaderProps) {
  return (
    <div className="mb-6 p-4 rounded-lg bg-glass border border-glass-border backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Round {round}</h3>
          <p className="text-xs text-muted-foreground">
            {isComplete ? "Complete" : "In Progress"} • {totalRounds} rounds total
          </p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i < round ? "bg-accent" : i === round - 1 ? "bg-accent/50" : "bg-glass-border"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
