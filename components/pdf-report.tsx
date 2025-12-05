"use client"

import { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface PDFReportProps {
  question: string
  topic: string
  arguments: any[]
  consensus?: any
  summary?: string
  recommendations?: string[]
}

export default function PDFReport({
  question,
  topic,
  arguments: debateArguments,
  consensus,
  summary,
  recommendations,
}: PDFReportProps) {
  const reportRef = useRef<HTMLDivElement>(null)

  const generatePDF = async () => {
    if (!reportRef.current) return

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: "#0a0a0a",
        logging: false,
      })

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgData = canvas.toDataURL("image/png")
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= 297

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= 297
      }

      pdf.save(`arena-ai-report-${Date.now()}.pdf`)
    } catch (error) {
      console.error("PDF generation error:", error)
    }
  }

  const topicLabel = topic.charAt(0).toUpperCase() + topic.slice(1)
  const modelStats = debateArguments.reduce(
    (acc: any, arg: any) => {
      if (!acc[arg.modelId]) {
        acc[arg.modelId] = { name: arg.modelName, score: 0, count: 0 }
      }
      acc[arg.modelId].score += arg.score
      acc[arg.modelId].count += 1
      return acc
    },
    {} as Record<string, any>,
  )

  const rankings = Object.entries(modelStats)
    .map(([_, stats]: [string, any]) => ({
      ...stats,
      avgScore: stats.score / stats.count,
    }))
    .sort((a, b) => b.avgScore - a.avgScore)

  return (
    <div className="space-y-4">
      {/* Report Preview */}
      <div
        ref={reportRef}
        className="p-8 rounded-lg bg-gradient-to-b from-background to-background/95 border border-glass-border"
        style={{ width: "100%", minHeight: "600px" }}
      >
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-glass-border">
          <h1 className="text-4xl font-bold text-foreground mb-2">Arena AI</h1>
          <p className="text-lg text-muted-foreground">Multi-Model Consensus Report</p>
          <div className="mt-4 space-y-1">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Topic:</span> {topicLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Debate Question</h2>
          <p className="text-foreground text-lg italic">{question}</p>
        </div>

        {/* Executive Summary */}
        {summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">Executive Summary</h2>
            <p className="text-foreground text-sm leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Rankings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Model Rankings</h2>
          <div className="space-y-2">
            {rankings.map((model, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-glass-border/30 rounded">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    #{idx + 1} {model.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">{model.avgScore.toFixed(1)}/10</p>
                  <p className="text-xs text-muted-foreground">{model.count} arguments</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consensus */}
        {consensus && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">Consensus Statement</h2>
            <p className="text-foreground text-sm leading-relaxed mb-4">{consensus.statement}</p>

            {consensus.agreements && consensus.agreements.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Areas of Agreement</h3>
                <ul className="space-y-1">
                  {consensus.agreements.map((agreement: string, idx: number) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>{agreement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {consensus.disagreements && consensus.disagreements.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Remaining Disagreements</h3>
                <ul className="space-y-1">
                  {consensus.disagreements.map((disagreement: string, idx: number) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">⚠</span>
                      <span>{disagreement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">Recommendations</h2>
            <ol className="space-y-2">
              {recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="text-xs text-muted-foreground flex gap-3">
                  <span className="font-bold text-accent flex-shrink-0">{idx + 1}.</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-glass-border text-center text-xs text-muted-foreground">
          <p>Generated by Arena AI • {new Date().toLocaleString()}</p>
          <p className="mt-1">Multi-Model Consensus Platform</p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={generatePDF}
        className="w-full py-3 px-4 rounded-lg bg-accent hover:bg-accent/90 text-white font-medium transition-all duration-200"
      >
        Download PDF Report
      </button>
    </div>
  )
}
