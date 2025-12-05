export interface DebateArgument {
  modelId: string
  modelName: string
  personality: string
  content: string
  score: number
  scores: {
    logic: number
    factual: number
    relevance: number
    persuasion: number
    novelty: number
    viability: number
  }
  confidence: number
  votes: number
}

export interface DebateState {
  question: string
  topic: string
  round: number
  arguments: DebateArgument[]
  consensus?: {
    statement: string
    agreements: string[]
    disagreements: string[]
    recommendations: string[]
  }
}

export async function generateDebateRound(
  question: string,
  topic: string,
  round: number,
  previousArguments: DebateArgument[] = [],
): Promise<DebateArgument[]> {
  const response = await fetch("/api/debate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      topic,
      round,
      previousArguments,
    }),
  })

  if (!response.ok) throw new Error("Failed to generate debate round")
  const data = await response.json()
  return data.arguments
}

export async function evaluateArgument(
  argument: string,
  topic: string,
): Promise<{
  logic: number
  factual: number
  relevance: number
  persuasion: number
  novelty: number
  viability: number
  summary: string
}> {
  const response = await fetch("/api/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ argument, topic }),
  })

  if (!response.ok) throw new Error("Failed to evaluate argument")
  return response.json()
}

export async function generateConsensus(
  question: string,
  topic: string,
  args: DebateArgument[], // Renamed 'arguments' to 'args' to avoid conflict with the global 'arguments' object
): Promise<{
  consensus: string
  agreements: string[]
  disagreements: string[]
  recommendations: string[]
}> {
  const response = await fetch("/api/consensus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, topic, args }),
  })

  if (!response.ok) throw new Error("Failed to generate consensus")
  return response.json()
}
