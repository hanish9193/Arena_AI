export interface TopicConfig {
  id: string
  label: string
  icon: string
  color: string
  description: string
  guidelines: string[]
  scoringWeights: {
    logic: number
    factual: number
    relevance: number
    persuasion: number
    novelty: number
    viability: number
  }
}

export const TOPIC_CONFIGS: Record<string, TopicConfig> = {
  science: {
    id: "science",
    label: "Science",
    icon: "🔬",
    color: "#3B82F6",
    description: "Evidence-based reasoning and empirical analysis",
    guidelines: [
      "Cite peer-reviewed sources",
      "Use empirical evidence",
      "Acknowledge uncertainty ranges",
      "Discuss methodology",
    ],
    scoringWeights: {
      factual: 0.35,
      logic: 0.3,
      relevance: 0.2,
      novelty: 0.1,
      persuasion: 0.05,
      viability: 0.0,
    },
  },
  ethics: {
    id: "ethics",
    label: "Ethics",
    icon: "⚖️",
    color: "#8B5CF6",
    description: "Moral frameworks and stakeholder considerations",
    guidelines: [
      "Consider multiple moral frameworks",
      "Address stakeholder impacts",
      "Balance rights and consequences",
      "Explore ethical tensions",
    ],
    scoringWeights: {
      logic: 0.3,
      relevance: 0.25,
      persuasion: 0.2,
      novelty: 0.15,
      factual: 0.1,
      viability: 0.0,
    },
  },
  law: {
    id: "law",
    label: "Law",
    icon: "⚖️",
    color: "#DC2626",
    description: "Legal precedents and constitutional principles",
    guidelines: [
      "Cite legal precedents",
      "Consider jurisdictional context",
      "Address constitutional principles",
      "Discuss case law",
    ],
    scoringWeights: {
      factual: 0.35,
      logic: 0.3,
      relevance: 0.25,
      viability: 0.1,
      novelty: 0.0,
      persuasion: 0.0,
    },
  },
  policy: {
    id: "policy",
    label: "Policy",
    icon: "🏛️",
    color: "#D4AF37",
    description: "Implementation feasibility and stakeholder interests",
    guidelines: [
      "Assess cost-benefit tradeoffs",
      "Consider implementation feasibility",
      "Address stakeholder interests",
      "Discuss resource requirements",
    ],
    scoringWeights: {
      viability: 0.3,
      relevance: 0.25,
      factual: 0.2,
      persuasion: 0.15,
      logic: 0.1,
      novelty: 0.0,
    },
  },
  philosophy: {
    id: "philosophy",
    label: "Philosophy",
    icon: "🧠",
    color: "#EC4899",
    description: "Conceptual foundations and thought experiments",
    guidelines: [
      "Explore conceptual foundations",
      "Challenge assumptions",
      "Consider thought experiments",
      "Discuss philosophical implications",
    ],
    scoringWeights: {
      logic: 0.35,
      novelty: 0.25,
      relevance: 0.2,
      persuasion: 0.15,
      factual: 0.05,
      viability: 0.0,
    },
  },
}
