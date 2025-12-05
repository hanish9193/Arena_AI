# Arena AI - Local Open-Source Debate Platform

## Quick Start

### Prerequisites
- Ollama installed and running locally: https://ollama.ai

### Step 1: Install & Run Ollama
\`\`\`bash
# Install Ollama from https://ollama.ai
# Then start the Ollama server:
ollama serve
\`\`\`

### Step 2: Download Required Models
In a separate terminal, pull the debate models:
\`\`\`bash
ollama pull mistral
ollama pull llama2
ollama pull neural-chat
ollama pull orca-mini
\`\`\`

### Step 3: Start the App
\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000` and you're ready to debate!

## How It Works

- **100% Offline**: All models run locally on your machine
- **Unlimited Memory**: No API rate limits, no tokens counting against you
- **Multi-Model Debate**: 4 open-source models debate your question for 3 rounds
- **Smart Scoring**: Arguments are evaluated on quality, logic, and persuasiveness
- **Auto-Consensus**: Final round generates automatic consensus summary

## Models Included

| Model | Size | Best For |
|-------|------|----------|
| Mistral | 4.1GB | Logic & Analysis |
| Llama 2 | 3.8GB | Balanced Perspective |
| Neural Chat | 4.1GB | Explanation & Clarity |
| Orca Mini | 1.7GB | Creative Thinking |

## Troubleshooting

**"Ollama Not Connected"**
- Make sure `ollama serve` is running in a terminal
- Check that Ollama is on http://localhost:11434
- Run `ollama list` to see downloaded models

**Models Not Downloaded**
- Pull them manually: \`ollama pull mistral\`
- Wait for download to complete (can be large files)

**Slow Performance**
- First run of a model is slower while it loads into memory
- Subsequent runs are faster
- Consider running on a machine with more RAM

## Environment Variables (Optional)

Create `.env.local` to customize:
\`\`\`
OLLAMA_BASE_URL=http://localhost:11434
\`\`\`

## Requirements

- Node.js 18+
- 16GB+ RAM recommended
- ~15GB disk space for all models
- Ollama running locally
