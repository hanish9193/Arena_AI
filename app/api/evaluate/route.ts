import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { argument, topic, criteria } = await request.json()

    const evaluationPrompt = `
You are an expert evaluator assessing debate arguments.

Topic: ${topic}
Argument: "${argument}"

Evaluate this argument on the following criteria (0-10 scale):
1. Logic: Internal consistency and reasoning quality
2. Factual Accuracy: Verifiable claims and source credibility
3. Relevance: How directly it addresses the question
4. Persuasiveness: Rhetorical strength and compelling examples
5. Novelty: Original insights and unique perspectives
6. Viability: Practical implementability and feasibility

Respond in JSON format:
{
  "logic": <number>,
  "factual": <number>,
  "relevance": <number>,
  "persuasion": <number>,
  "novelty": <number>,
  "viability": <number>,
  "summary": "<brief explanation>"
}
`

    const { text } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: evaluationPrompt,
      temperature: 0.5,
      maxTokens: 500,
    })

    const scores = JSON.parse(text)
    return Response.json(scores)
  } catch (error) {
    console.error("Evaluation API error:", error)
    return Response.json({ error: "Failed to evaluate argument" }, { status: 500 })
  }
}
