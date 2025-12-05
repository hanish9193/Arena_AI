import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { question, topic, arguments: debateArguments } = await request.json()

    const argumentsSummary = debateArguments
      .map((arg: any) => `${arg.modelName} (${arg.personality}): ${arg.content}`)
      .join("\n\n")

    const consensusPrompt = `
You are a moderator synthesizing a multi-model debate.

Topic: ${topic}
Question: ${question}

Arguments presented:
${argumentsSummary}

Synthesize these arguments into:
1. A concise consensus statement (2-3 paragraphs)
2. Key areas of agreement
3. Remaining disagreements
4. Recommendations for further consideration

Format your response as JSON:
{
  "consensus": "<main consensus statement>",
  "agreements": ["<agreement 1>", "<agreement 2>", ...],
  "disagreements": ["<disagreement 1>", "<disagreement 2>", ...],
  "recommendations": ["<recommendation 1>", "<recommendation 2>", ...]
}
`

    const { text } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: consensusPrompt,
      temperature: 0.6,
      maxTokens: 1000,
    })

    const result = JSON.parse(text)
    return Response.json(result)
  } catch (error) {
    console.error("Consensus API error:", error)
    return Response.json({ error: "Failed to generate consensus" }, { status: 500 })
  }
}
