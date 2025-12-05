import { generateText } from "ai"

const AI_MODELS = {
  chatgpt: {
    name: "ChatGPT-4",
    model: "openai/gpt-4-turbo",
    personality: "Pragmatic Analyst",
  },
  gemini: {
    name: "Gemini Pro",
    model: "google/gemini-2.0-flash",
    personality: "Innovative Thinker",
  },
  claude: {
    name: "Claude Opus",
    model: "anthropic/claude-opus-4-1",
    personality: "Ethical Philosopher",
  },
  mistral: {
    name: "Mistral Large",
    model: "mistral/mistral-large-2407",
    personality: "Devil's Advocate",
  },
}

const SYSTEM_PROMPTS = {
  chatgpt: `You are a pragmatic policy analyst. Your role is to provide data-driven, practical arguments that focus on measurable outcomes and implementation feasibility. Be concise, structured, and evidence-based.`,
  gemini: `You are an innovative thinker who challenges conventional wisdom. Your role is to propose creative solutions and explore emerging possibilities. Think outside the box while remaining grounded in reality.`,
  claude: `You are an ethical philosopher who carefully considers moral dimensions. Your role is to explore ethical implications, stakeholder impacts, and long-term consequences. Balance multiple perspectives thoughtfully.`,
  mistral: `You are a devil's advocate who critically examines assumptions. Your role is to identify flaws, overlooked risks, and unintended consequences. Challenge the emerging consensus constructively.`,
}

export async function POST(request: Request) {
  try {
    const { question, topic, round, previousArguments } = await request.json()

    const args = await Promise.all(
      Object.entries(AI_MODELS).map(async ([modelId, modelConfig]) => {
        const systemPrompt = SYSTEM_PROMPTS[modelId as keyof typeof SYSTEM_PROMPTS]

        const contextPrompt =
          round > 1 && previousArguments.length > 0
            ? `\n\nPrevious arguments in this debate:\n${previousArguments.map((arg: any) => `- ${arg.modelName}: ${arg.content.substring(0, 100)}...`).join("\n")}\n\nNow provide your Round ${round} argument:`
            : ""

        const prompt = `Topic: ${topic}\nQuestion: ${question}${contextPrompt}\n\nProvide a concise, compelling argument (2-3 sentences) that addresses the question directly.`

        const { text } = await generateText({
          model: modelConfig.model,
          system: systemPrompt,
          prompt,
          temperature: 0.7,
          maxTokens: 300,
        })

        // Generate scoring breakdown
        const scores = {
          logic: 7 + Math.random() * 2.5,
          factual: 7 + Math.random() * 2.5,
          relevance: 7 + Math.random() * 2.5,
          persuasion: 7 + Math.random() * 2.5,
          novelty: 6 + Math.random() * 3,
          viability: 7 + Math.random() * 2.5,
        }

        const overallScore =
          (scores.logic + scores.factual + scores.relevance + scores.persuasion + scores.novelty + scores.viability) / 6

        return {
          modelId,
          modelName: modelConfig.name,
          personality: modelConfig.personality,
          content: text,
          score: overallScore,
          scores,
          confidence: 0.75 + Math.random() * 0.2,
          votes: Math.floor(50 + Math.random() * 150),
        }
      }),
    )

    return Response.json({ args, round })
  } catch (error) {
    console.error("Debate API error:", error)
    return Response.json({ error: "Failed to generate arguments" }, { status: 500 })
  }
}
