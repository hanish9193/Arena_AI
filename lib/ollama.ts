// Ollama integration for local open-source models with improved error handling
import { OLLAMA_BASE_URL, DEBATE_CONFIG } from "./ollama-config"

interface OllamaModelConfig {
  name: string
  model: string
  personality: string
}

export const OLLAMA_MODELS: OllamaModelConfig[] = [
  {
    name: "Mistral",
    model: "mistral",
    personality: "Logical, analytical, focuses on reasoning and evidence",
  },
  {
    name: "Llama 2",
    model: "llama2",
    personality: "Balanced, thoughtful, considers multiple perspectives",
  },
  {
    name: "Neural Chat",
    model: "neural-chat",
    personality: "Conversational, engaging, excellent at explaining concepts",
  },
  {
    name: "Orca",
    model: "orca-mini",
    personality: "Creative, innovative, thinks outside the box",
  },
]

export async function generateDebateArgument(
  model: OllamaModelConfig,
  topic: string,
  previousArguments: string[],
  round: number,
): Promise<string> {
  const systemPrompt = `You are ${model.name} in a structured debate. ${model.personality}

Your role is to debate this topic: "${topic}"

${
  round === 1
    ? "Make your initial argument (2-3 sentences, be strong and direct)"
    : `Previous arguments made:\n${previousArguments.map((arg, i) => `${i + 1}. ${arg}`).join("\n")}\n\nRespond to these arguments (2-3 sentences, counter or build on them). Do NOT repeat what others said.`
}

Be concise, clear, and compelling.`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEBATE_CONFIG.TIMEOUT_MS)

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model.model,
        prompt: systemPrompt,
        stream: false,
        temperature: DEBATE_CONFIG.TEMPERATURE,
        top_p: DEBATE_CONFIG.TOP_P,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.response.trim() || "The model is considering the arguments carefully."
  } catch (error) {
    console.error(`Error generating argument from ${model.name}:`, error)
    return `${model.name} is analyzing the arguments carefully.`
  }
}

export async function evaluateArgument(argument: string, topic: string): Promise<number> {
  const evaluationPrompt = `Rate this debate argument on a scale of 1-10 for quality, logic, clarity, and persuasiveness.

Topic: ${topic}
Argument: ${argument}

Respond with ONLY a single number between 1 and 10.`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: evaluationPrompt,
        stream: false,
        temperature: 0.5,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) return 7
    const data = await response.json()
    const match = data.response.match(/\d+/)
    const score = match ? Number.parseInt(match[0]) : 7
    return Math.min(Math.max(score, 1), 10)
  } catch (error) {
    console.error("Error evaluating argument:", error)
    return 7
  }
}

export async function generateConsensus(
  topic: string,
  debateArguments: { model: string; argument: string; score: number }[],
): Promise<string> {
  const consensusPrompt = `You are a neutral moderator. Summarize the key consensus and points of disagreement from this debate in 2-3 sentences.

Topic: ${topic}

Arguments:
${debateArguments.map((a) => `${a.model} (quality: ${a.score}/10): "${a.argument}"`).join("\n\n")}

Provide a balanced summary of consensus and divergence.`

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        prompt: consensusPrompt,
        stream: false,
        temperature: 0.6,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) return "The debate showcased diverse perspectives on the topic."
    const data = await response.json()
    return data.response.trim() || "Debate completed with valuable insights."
  } catch (error) {
    console.error("Error generating consensus:", error)
    return "Debate completed. Multiple perspectives were presented."
  }
}
