import { OLLAMA_MODELS, generateDebateArgument, evaluateArgument } from "@/lib/ollama"

export async function POST(request: Request) {
  const { topic, round, previousArguments } = await request.json()

  // Create a ReadableStream for real-time updates
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const encoder = new TextEncoder()

        for (const model of OLLAMA_MODELS) {
          // Start generating
          controller.enqueue(encoder.encode(`data: {"status": "generating", "model": "${model.name}"}\n\n`))

          const argument = await generateDebateArgument(model, topic, previousArguments || [], round)

          controller.enqueue(
            encoder.encode(
              `data: {"status": "argument_generated", "model": "${model.name}", "content": ${JSON.stringify(argument)}}\n\n`,
            ),
          )

          // Evaluate
          const score = await evaluateArgument(argument, topic)

          controller.enqueue(
            encoder.encode(
              `data: {"status": "complete", "model": "${model.name}", "argument": ${JSON.stringify(argument)}, "score": ${score}}\n\n`,
            ),
          )
        }

        controller.enqueue(encoder.encode(`data: {"status": "round_complete"}\n\n`))
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
