import { generateDebateArgument, OLLAMA_MODELS, evaluateArgument, generateConsensus } from "@/lib/ollama"

export async function POST(request: Request) {
  const { topic, round, previousArguments } = await request.json()

  try {
    const argumentPromises = OLLAMA_MODELS.map(async (model) => {
      const argumentText = await generateDebateArgument(model, topic, previousArguments || [], round)
      const score = await evaluateArgument(argumentText, topic)

      return {
        model: model.name,
        argument: argumentText.trim(),
        score,
        personality: model.personality,
      }
    })

    const debateArguments = await Promise.all(argumentPromises)

    let consensus = null
    if (round === 3) {
      consensus = await generateConsensus(topic, debateArguments)
    }

    return Response.json({
      debateArguments,
      consensus,
      round,
    })
  } catch (error) {
    console.error("Error in debate route:", error)
    return Response.json({ error: "Failed to generate debate" }, { status: 500 })
  }
}
