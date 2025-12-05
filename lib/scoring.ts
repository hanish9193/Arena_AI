// Enhanced scoring system for debate arguments

export interface ScoringCriteria {
  logic: number
  clarity: number
  evidence: number
  persuasion: number
  originality: number
  structure: number
}

export function calculateOverallScore(criteria: ScoringCriteria): number {
  const scores = Object.values(criteria)
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
}

export function evaluateArgumentQuality(argument: string, topic: string, previousArguments: string[]): ScoringCriteria {
  const length = argument.split(" ").length
  const hasNumbers = /\d+/.test(argument)
  const hasLogicWords = /therefore|thus|because|since|implies/.test(argument.toLowerCase())
  const isUnique = !previousArguments.some((prev) =>
    prev.toLowerCase().includes(argument.substring(0, 20).toLowerCase()),
  )

  return {
    logic: hasLogicWords ? 8 : 6,
    clarity: Math.min(length / 50, 10),
    evidence: hasNumbers ? 8 : 5,
    persuasion: 7,
    originality: isUnique ? 8 : 5,
    structure: length > 30 && length < 200 ? 8 : 6,
  }
}
