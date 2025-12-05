import { OLLAMA_BASE_URL } from "@/lib/ollama-config"

export async function GET() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      return Response.json({ status: "offline", message: "Ollama is not responding" }, { status: 503 })
    }

    const data = await response.json()
    const models = data.models?.map((m: any) => m.name) || []

    return Response.json({
      status: "online",
      ollama_url: OLLAMA_BASE_URL,
      models_available: models,
      required_models: ["mistral", "llama2", "neural-chat", "orca-mini"],
      missing_models: ["mistral", "llama2", "neural-chat", "orca-mini"].filter(
        (m) => !models.some((model: string) => model.includes(m)),
      ),
    })
  } catch (error) {
    return Response.json(
      {
        status: "offline",
        message: "Cannot connect to Ollama. Make sure it's running on " + OLLAMA_BASE_URL,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 },
    )
  }
}
