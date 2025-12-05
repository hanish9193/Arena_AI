# Arena AI

> When AI models can't agree, let them debate until they do.

```ascii
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║     A R E N A   A I   -   D E B A T E   P L A T F O R M  ║
    ║                                                           ║
    ║   [neural-chat]  vs  [llama2]  vs  [orca-mini]  vs       ║
    ║                    [mistral]                              ║
    ║                                                           ║
    ║              Fighting for consensus, not clicks           ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
```

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ollama](https://img.shields.io/badge/Ollama-Required-green.svg)](https://ollama.ai)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

**[Installation](#installation)** | **[Quick Start](#quick-start)** | **[How It Works](#how-it-works)** | **[API Reference](#api-reference)** | **[Examples](#examples)**

</div>

---

## The Problem

Ask any question to different AI models, and you'll get different answers:

<table>
<tr>
<td width="25%"><strong>Question</strong></td>
<td colspan="3"><em>"Should I use REST or GraphQL for my API?"</em></td>
</tr>
<tr>
<td><strong>ChatGPT</strong></td>
<td>REST is simpler and more widely supported...</td>
</tr>
<tr>
<td><strong>Claude</strong></td>
<td>GraphQL prevents over-fetching and gives clients control...</td>
</tr>
<tr>
<td><strong>Gemini</strong></td>
<td>It depends on your use case, but I'd lean toward REST for...</td>
</tr>
<tr>
<td><strong>You</strong></td>
<td>Which one is actually right?</td>
</tr>
</table>

**Arena AI** doesn't just give you another opinion. It makes them debate, challenge each other, and reach a consensus based on actual reasoning.

---

## The Solution

```
USER QUESTION
     ↓
┌────────────────────────────────────────┐
│  ARENA INITIALIZATION                  │
│  Load: neural-chat, llama2,           │
│        orca-mini, mistral              │
└────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────┐
│  ROUND 1: Opening Statements           │
│  Each model presents initial position  │
└────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────┐
│  ROUND 2: Cross-Examination            │
│  Models challenge each other           │
└────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────┐
│  ROUND 3: Synthesis & Refinement       │
│  Find common ground, refine position   │
└────────────────────────────────────────┘
     ↓
┌────────────────────────────────────────┐
│  CONSENSUS REACHED                     │
│  Unified answer with confidence score  │
└────────────────────────────────────────┘
```

---

## Features

<table>
<tr>
<td width="50%">

**Multi-Model Debates**
Run simultaneous debates with 2-5 models. Watch them challenge assumptions and refine arguments in real-time.

**Offline & Private**
Powered by Ollama. Your questions, debates, and data never leave your machine. No API keys, no tracking.

**Transparent Reasoning**
See every argument, counterargument, and logical step. Understand not just what the consensus is, but why.

</td>
<td width="50%">

**Dynamic Moderation**
An AI moderator ensures debates stay productive, identifies consensus points, and synthesizes final answers.

**Debate Archives**
Every debate is saved. Review past discussions, track how models reason about similar questions over time.

**Extensible Architecture**
Add new models, customize debate rules, adjust consensus thresholds. Built for experimentation.

</td>
</tr>
</table>

---

## Installation

### Prerequisites

```bash
# System Requirements
- Python 3.8 or higher
- 8GB RAM minimum (16GB recommended)
- Ollama installed and running
```

### Step 1: Install Ollama

```bash
# Linux / macOS
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Download from https://ollama.ai/download
```

### Step 2: Pull Required Models

```bash
ollama pull neural-chat
ollama pull llama2
ollama pull orca-mini
ollama pull mistral
```

### Step 3: Install Arena AI

```bash
git clone https://github.com/yourusername/arena-ai.git
cd arena-ai
pip install -r requirements.txt
```

### Verify Installation

```bash
python arena.py --version
ollama list  # Should show all four models
```

---

## Quick Start

### Basic Debate

```bash
python arena.py "Is TypeScript worth the complexity overhead?"
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARENA AI DEBATE SESSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Topic: Is TypeScript worth the complexity overhead?
Models: neural-chat, llama2, orca-mini, mistral
Rounds: 3
Started: 2024-12-05 14:32:18

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROUND 1 - OPENING STATEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[neural-chat]
TypeScript's type system catches bugs before runtime, which more than
compensates for the initial learning curve. The ROI becomes clear in
codebases over 10k lines...

[llama2]
The complexity overhead is real and shouldn't be dismissed. For small
projects and rapid prototyping, TypeScript's compilation step and type
wrangling can significantly slow development...

[orca-mini]
Context matters here. TypeScript shines in large teams where the
contract enforcement prevents integration issues. For solo developers
on small projects, vanilla JS might be more pragmatic...

[mistral]
I'd argue the "complexity" framing is misleading. TypeScript is
JavaScript with optional type annotations. You can adopt it gradually,
which means the overhead is controllable...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROUND 2 - CROSS-EXAMINATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[neural-chat → llama2]
You mention rapid prototyping, but modern TypeScript with inference
requires minimal type annotations. The compilation step is sub-second
with incremental builds. What specific overhead are you referencing?

[llama2 → neural-chat]
Fair point on incremental builds, but there's cognitive overhead in
understanding the type system, especially around generics and utility
types. That's a real cost for junior developers...

[continuing debate...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONSENSUS REACHED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After 3 rounds of debate, models agree on the following position:

TypeScript's value proposition is context-dependent:

WORTH IT FOR:
- Large codebases (10k+ lines)
- Team environments (3+ developers)
- Long-lived projects (1+ year maintenance)
- Complex domain logic requiring type safety

NOT WORTH IT FOR:
- Rapid prototypes and MVPs
- Small scripts and utilities
- Solo projects under 1k lines
- Learning JavaScript fundamentals

The "complexity overhead" decreases significantly with experience and
proper tooling (IDE support, incremental compilation). The initial
investment pays dividends in maintainability and refactoring confidence
for projects meeting the criteria above.

Confidence: 87%
Models in agreement: 4/4

Debate saved to: debates/typescript-debate-20241205-143218.json
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## How It Works

### The Debate Engine

Arena AI orchestrates structured debates between multiple language models:

**Phase 1: Initialization**
- Load specified models (default: neural-chat, llama2, orca-mini, mistral)
- Parse user question and generate debate context
- Set parameters: rounds, consensus threshold, temperature

**Phase 2: Opening Round**
- Each model generates independent initial response
- No cross-contamination between models at this stage
- Responses stored for comparison

**Phase 3: Challenge Rounds**
- Models read each other's responses
- Identify points of disagreement
- Present counterarguments with reasoning
- Defend or modify original positions

**Phase 4: Synthesis**
- Moderator model identifies common ground
- Extracts highest-confidence shared conclusions
- Notes remaining disagreements if any
- Calculates consensus confidence score

**Phase 5: Output**
- Present unified answer with reasoning
- Show debate transcript if requested
- Save full debate log to file

### Architecture

```
arena_ai/
│
├── core/
│   ├── debate_engine.py      # Orchestrates debate rounds
│   ├── moderator.py           # Consensus building logic
│   └── model_manager.py       # Ollama model interface
│
├── models/
│   ├── base_model.py          # Abstract model interface
│   └── ollama_model.py        # Ollama implementation
│
├── utils/
│   ├── logger.py              # Debate transcript logging
│   ├── parser.py              # Response parsing
│   └── formatter.py           # Output formatting
│
└── config/
    └── settings.py            # Configuration management
```

---

## API Reference

### Command Line Interface

```bash
arena.py [OPTIONS] QUESTION

Arguments:
  QUESTION              The question or topic to debate

Options:
  --models TEXT         Comma-separated list of models
                        [default: neural-chat,llama2,orca-mini,mistral]
  
  --rounds INTEGER      Number of debate rounds [default: 3]
  
  --consensus FLOAT     Consensus threshold (0.0-1.0) [default: 0.8]
  
  --temperature FLOAT   Model temperature (0.0-2.0) [default: 0.7]
  
  --save PATH           Save debate to file [default: auto]
  
  --format TEXT         Output format: text, json, markdown [default: text]
  
  --verbose            Show full debate transcript
  
  --timeout INTEGER    Max time per round in seconds [default: 120]
  
  --help               Show this message and exit
```

### Python API

```python
from arena_ai import DebateArena, DebateConfig

# Initialize with custom configuration
config = DebateConfig(
    models=['neural-chat', 'llama2', 'orca-mini', 'mistral'],
    rounds=3,
    consensus_threshold=0.8,
    temperature=0.7
)

arena = DebateArena(config)

# Run debate
result = arena.debate("Should microservices be the default architecture?")

# Access results
print(result.consensus)          # Final agreed-upon answer
print(result.confidence)         # Confidence score (0.0-1.0)
print(result.transcript)         # Full debate log
print(result.duration)           # Time taken

# Iterate through rounds
for round_num, round_data in enumerate(result.rounds):
    print(f"Round {round_num + 1}")
    for model, response in round_data.responses.items():
        print(f"  {model}: {response.summary}")

# Check individual model positions
for model in result.models:
    position = result.get_model_position(model)
    print(f"{model}: {position.final_stance}")
    print(f"  Changed position: {position.evolved}")
```

---

## Examples

### Example 1: Technical Decision

```bash
python arena.py "Should we use PostgreSQL or MongoDB for a social media app?"
```

Models will debate considering: scalability, query patterns, ACID requirements, schema flexibility, operational complexity, and ecosystem maturity.

### Example 2: Code Review

```bash
python arena.py "Is this function optimal?" --models neural-chat,llama2 \
  --input code.py --verbose
```

Feed in code and have models debate optimization, readability, and best practices.

### Example 3: Architecture Discussion

```bash
python arena.py "Monorepo vs polyrepo for a startup with 5 engineers" \
  --rounds 5 --consensus 0.85
```

Extended debate with higher consensus threshold for critical decisions.

### Example 4: Batch Processing

```python
from arena_ai import DebateArena

questions = [
    "Best state management for React in 2024?",
    "Is Rust worth learning for web development?",
    "Should APIs be versioned in the URL or headers?"
]

arena = DebateArena()
results = arena.batch_debate(questions)

for q, r in zip(questions, results):
    print(f"Q: {q}")
    print(f"A: {r.consensus}")
    print(f"Confidence: {r.confidence:.0%}\n")
```

---

## Configuration

Create `config.yaml` in the project root:

```yaml
# Model Configuration
models:
  default:
    - neural-chat
    - llama2
    - orca-mini
    - mistral
  
  fast:  # Lighter models for quick debates
    - orca-mini
    - neural-chat
  
  deep:  # Comprehensive analysis
    - neural-chat
    - llama2
    - orca-mini
    - mistral
    - codellama

# Debate Parameters
debate:
  default_rounds: 3
  max_rounds: 10
  consensus_threshold: 0.80
  timeout_per_round: 120
  
  # Moderator settings
  moderator:
    model: neural-chat
    strictness: medium  # low, medium, high
    
# Model Parameters
model_params:
  temperature: 0.7
  top_p: 0.9
  top_k: 40
  repeat_penalty: 1.1
  max_tokens: 2000

# Output Settings
output:
  auto_save: true
  save_directory: ./debates
  format: json
  include_metadata: true
  verbose: false

# Performance
performance:
  parallel_generation: false  # Set true if you have GPU
  cache_responses: true
  max_cache_size: 100
```

Load custom config:

```bash
python arena.py --config custom_config.yaml "Your question"
```

---

## Advanced Usage

### Custom Model Personas

```python
from arena_ai import DebateArena, ModelPersona

personas = {
    'neural-chat': ModelPersona(
        role='pragmatist',
        focus='real-world tradeoffs',
        style='balanced'
    ),
    'llama2': ModelPersona(
        role='skeptic',
        focus='potential problems',
        style='critical'
    ),
    'orca-mini': ModelPersona(
        role='optimist',
        focus='benefits and opportunities',
        style='supportive'
    ),
    'mistral': ModelPersona(
        role='analyst',
        focus='data and evidence',
        style='technical'
    )
}

arena = DebateArena(personas=personas)
result = arena.debate("Should we rewrite our app in Rust?")
```

### Integrate with CI/CD

```python
# debate_test.py
from arena_ai import DebateArena

def test_architecture_decision():
    """Use AI debate to validate architecture choices"""
    arena = DebateArena()
    
    result = arena.debate(
        "Is our microservices split at the right granularity?"
    )
    
    # Fail if consensus is low
    assert result.confidence > 0.75, \
        f"Low confidence in architecture: {result.confidence}"
    
    # Log debate for review
    with open('architecture_review.md', 'w') as f:
        f.write(result.transcript)
```

### Research Assistant

```python
from arena_ai import DebateArena
import asyncio

async def research_topic(topic: str, depth: int = 3):
    """Deep dive into a topic with iterative debates"""
    arena = DebateArena()
    
    # Initial broad question
    initial = await arena.debate_async(f"What are the key aspects of {topic}?")
    
    # Drill down into each aspect
    aspects = initial.extract_key_points()
    
    deep_dives = []
    for aspect in aspects:
        result = await arena.debate_async(
            f"Explain {aspect} in the context of {topic}",
            rounds=depth
        )
        deep_dives.append(result)
    
    # Synthesize everything
    synthesis = arena.synthesize_debates([initial] + deep_dives)
    
    return synthesis

# Usage
result = asyncio.run(research_topic("Quantum Computing Applications"))
```

---

## Troubleshooting

<details>
<summary><strong>Models not responding or timing out</strong></summary>

Check Ollama is running:
```bash
ollama list
systemctl status ollama  # Linux
```

Increase timeout:
```bash
python arena.py "question" --timeout 300
```

Use lighter models:
```bash
python arena.py "question" --models orca-mini,neural-chat
```
</details>

<details>
<summary><strong>Low consensus scores on clear questions</strong></summary>

This usually indicates:
- Question is genuinely nuanced
- Models lack specialized knowledge
- Temperature is too high (increase randomness)

Try:
- Rephrasing question more specifically
- Adding more rounds: `--rounds 5`
- Lowering temperature: `--temperature 0.5`
</details>

<details>
<summary><strong>Debates taking too long</strong></summary>

Optimize with:
- Fewer models: `--models neural-chat,llama2`
- Fewer rounds: `--rounds 2`
- Smaller models: Use orca-mini instead of llama2
- Enable parallel generation in config (requires GPU)
</details>

<details>
<summary><strong>Memory issues</strong></summary>

- Close other applications
- Use smaller models (orca-mini, phi)
- Reduce max_tokens in config
- Process debates sequentially, not in batch
</details>

---

## Project Status

**Current Version:** 1.0.0

**Models Tested:**
- neural-chat 7B (primary)
- llama2 7B (primary)
- orca-mini 3B (primary)
- mistral 7B (primary)
- codellama 7B (secondary)
- phi3 3.8B (experimental)

**Roadmap:**

**v1.1 (Next)**
- [ ] Web interface for debates
- [ ] Export debates as markdown/PDF
- [ ] Debate visualization (argument graphs)
- [ ] Model voting on best arguments

**v1.2**
- [ ] Multi-language support
- [ ] Custom moderator models
- [ ] Debate templates for common scenarios
- [ ] Performance benchmarking suite

**v2.0**
- [ ] Real-time streaming debates
- [ ] Collaborative human-AI debates
- [ ] Integration with vector databases for context
- [ ] API service mode

---

## Contributing

We welcome contributions. Here's how to get started:

**Bug Reports:** Open an issue with reproduction steps and expected vs actual behavior.

**Feature Requests:** Open an issue describing the use case and proposed implementation.

**Pull Requests:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Write tests for new functionality
4. Ensure all tests pass: `pytest tests/`
5. Update documentation as needed
6. Submit PR with clear description

**Code Standards:**
- Follow PEP 8
- Add type hints
- Write docstrings for public functions
- Keep functions under 50 lines when possible

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## FAQ

**Q: Why offline models instead of GPT-4/Claude API?**

A: Privacy, cost, and control. Debates can involve sensitive questions about your code, business, or research. With Ollama, everything stays on your machine. No API costs, no rate limits, no data collection.

**Q: Do smaller models like orca-mini provide useful insights?**

A: Yes. Smaller models often catch different edge cases and provide alternative perspectives. The diversity matters more than individual model capability.

**Q: How is consensus calculated?**

A: The moderator identifies common assertions across model responses, weights them by frequency and confidence, then checks if models explicitly disagree on any consensus points. Score reflects agreement level.

**Q: Can I debate in languages other than English?**

A: Models support multiple languages, but debate quality varies. Best results with English, Spanish, French, German. Test your specific language with `--verbose` to check quality.

**Q: What happens when models fundamentally disagree?**

A: The moderator presents both positions clearly and notes the disagreement. Some questions genuinely have multiple valid answers. That's useful information.

**Q: Can I use this for academic research?**

A: Yes. Arena AI generates reproducible debate logs with timestamps and model versions. Cite the specific debate file and Arena AI version in your work.

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

You are free to use Arena AI for personal, educational, or commercial purposes. Attribution appreciated but not required.

---

## Acknowledgments

**Built because AI models kept gaslighting me with different answers to the same question.**

Thanks to:
- Ollama team for making local LLMs accessible
- The neural-chat, llama2, orca-mini, and mistral model creators
- Everyone who's ever gotten frustrated by inconsistent AI responses

---

<div align="center">

**Arena AI** - Truth through discourse, not diktat.

[Report Bug](https://github.com/yourusername/arena-ai/issues) · [Request Feature](https://github.com/yourusername/arena-ai/issues) · [Documentation](https://github.com/yourusername/arena-ai/wiki)

Star this repository if you believe AI should debate, not dictate.

</div>
