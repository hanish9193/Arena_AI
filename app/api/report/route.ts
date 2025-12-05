import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { question, topic, arguments: debateArguments, consensus } = await request.json()

    // Generate executive summary
    const summaryPrompt = `
Create a concise executive summary (2-3 paragraphs) for a debate report on:
Topic: ${topic}
Question: ${question}

Key arguments presented:
${debateArguments.map((arg: any) => `- ${arg.modelName}: ${arg.content.substring(0, 80)}...`).join("\n")}

Consensus: ${consensus?.statement || "To be determined"}

Provide a professional, balanced summary suitable for a formal report.
`

    const { text: summary } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: summaryPrompt,
      temperature: 0.6,
      maxTokens: 500,
    })

    // Generate recommendations
    const recommendationsPrompt = `
Based on this debate, provide 3-5 actionable recommendations:
Topic: ${topic}
Question: ${question}
Consensus: ${consensus?.statement || ""}

Format as a JSON array of strings.
`

    const { text: recommendationsText } = await generateText({
      model: "openai/gpt-4-turbo",
      prompt: recommendationsPrompt,
      temperature: 0.6,
      maxTokens: 400,
    })

    const recommendations = JSON.parse(recommendationsText)

    return Response.json({
      summary,
      recommendations,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Report generation error:", error)
    return Response.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
