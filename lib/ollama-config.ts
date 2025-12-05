// Centralized offline configuration for local Ollama
export const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434"

export const OFFLINE_MODELS = [
  { id: "mistral", name: "Mistral", size: "4.1GB" },
  { id: "llama2", name: "Llama 2", size: "3.8GB" },
  { id: "neural-chat", name: "Neural Chat", size: "4.1GB" },
  { id: "orca-mini", name: "Orca Mini", size: "1.7GB" },
]

export const DEBATE_CONFIG = {
  MAX_RETRIES: 3,
  TIMEOUT_MS: 120000, // 2 minutes per argument
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
}
