# AI Agent

Clustta includes a built-in conversational **AI assistant** that understands your project's structure. You can ask it about your work in plain English and it will give grounded, project-aware answers.

It's optional, **bring-your-own-key**, and supports running entirely locally if you want zero cloud dependency.

## What it can do

The agent has read access to your project metadata (not file contents) and can answer questions like:

- "What collections do I have?"
- "Who's working on the lighting tasks for sequence 02?"
- "How many assets are still in WFA?"
- "When was the last checkpoint on Jako's animation?"
- "Show me everything assigned to Adaeze."
- "What does this project's workflow look like?"

It can also explain Clustta's own concepts — checkpoints, dependencies, sync, conflict resolution — backed by a curated knowledge base. Useful for onboarding new team members.

<!-- TODO: screenshot of AI agent panel with a sample conversation -->

## Supported providers

You bring your own API key from any of these:

| Provider | Notes |
|----------|-------|
| **OpenAI** | GPT-4 family models |
| **Anthropic** | Claude family models |
| **Google Gemini** | Gemini family models |
| **Groq** | Fast inference, supported open models |
| **Ollama** | Local models. Fully offline, zero cloud. |

The agent is provider-agnostic — pick the one that fits your privacy/cost preferences. For studios with strict data policies, **Ollama is the recommended path**: nothing about your project ever leaves your machine.

## Setting it up

1. Open **Settings → AI Agent** in the desktop app.
2. Pick a provider.
3. Paste your API key (or for Ollama, point to your local Ollama server URL).
4. Pick a model.
5. Save.

The agent panel becomes available in the project view.

## What it can't do

- It **does not modify your project**. The agent is read-only — it answers questions and points you to the right place. Actions (creating assets, changing statuses, assigning) remain manual.
- It **does not read file contents**. It sees metadata: names, types, tags, statuses, comments, assignees, dependencies. The actual binary content of your files is never sent.
- It **does not learn from your project across sessions**. Each conversation starts fresh.

## Privacy considerations

- With **Ollama**, queries never leave your machine. The model runs locally.
- With cloud providers, **only the metadata necessary to answer your question** is sent — names, statuses, structural information. File contents are never transmitted.
- Studios with sensitive client work should default to Ollama or an on-prem inference setup.

## Tips

- **Be specific.** "Lighting tasks in WFA assigned to me" beats "what's left to do."
- **Use it for onboarding.** Have new team members ask the agent to explain Clustta concepts and your project's structure.
- **It can summarize.** "Give me a status overview of sequence 01" is a great daily standup prep.
