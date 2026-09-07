# AI Agent

Clustta includes a built-in conversational **AI assistant** that understands your project's structure. You can ask it about your work in plain English - and have it carry out changes for you.

It's optional, **bring-your-own-key**, and supports running entirely locally if you want zero cloud dependency.

<!-- TODO: screenshot of AI agent panel with a sample conversation -->

## What it can do

The agent can answer questions about project metadata and make changes within your permissions. Scoped batch changes are presented as approval plans, including moves, renames, copies, edits, and dependency changes. Review the affected items and proposed results, select the items you want to include, and approve the plan before it runs. Destructive operations also require confirmation.

### Read & explore

- List collections, assets, users, statuses, asset/collection types, tags, templates, dependency types, ignore patterns
- Get detailed information about a specific asset, including its tags, dependencies and checkpoint history
- Search for assets across the project with filters (name, status, type, assignee, tag) and pagination
- Get a high-level project summary (totals, breakdown by status and assignee)
- Get user activity (checkpoints made, last checkpoint timestamp)
- Check your own role and permissions
- Search Clustta's built-in knowledge base for concepts and how-tos (great for onboarding)

### Create

- Create collections (single or batched, with nesting support)
- Create assets (single or batched, from templates)
- Create asset types and collection types
- Create tags
- Add dependencies between assets
- Add ignore patterns
- Set up a standard set of asset/collection types for a project type (`animation`, `game`, `vfx`, `film`)

### Modify

- Rename assets and collections
- Move assets between collections
- Change an asset's status (single or bulk by IDs / filter criteria)
- Assign or unassign an asset (single, bulk, or randomly distributed across users round-robin)
- Add or remove tags on assets (single or batched)
- Remove dependencies

Batch renames can add or remove prefixes and suffixes, replace text, and strip characters. Batch moves can map different source groups to different destinations, while paired dependency operations can connect corresponding assets. Describe both the scope and intended mapping so the approval preview is easy to check.

### Delete (with confirmation)

- Delete an asset
- Delete a collection (optionally with its files)
- Bulk delete assets (by IDs, by filter, or all)
- Delete an asset type or collection type
- Remove a collaborator from the project
- Remove an ignore pattern

### DCC integrations

When a DCC tool (Blender today) is configured, the agent can also:

- Open assets in their associated DCC app
- Run Blender headless renders with custom frame ranges, output paths and engine settings
- Export `.blend` files to FBX / OBJ / glTF / USD
- Run Python scripts (file or inline) inside `.blend` files for custom automation
- Modify render settings (engine, resolution, frame rate, output format) on `.blend` files
- Link or append objects from dependency assets into a target `.blend` using Clustta's dependency graph
- Run arbitrary terminal commands in a visible window

### Generate scripts

The agent can write shell or Python scripts for batch file-system operations (renders, conversions, exports) and present them to you for review. Generated scripts are **never auto-executed** - you decide whether to run them.

## Supported providers

You bring your own API key from any of these:

| Provider | Notes |
|----------|-------|
| **OpenAI** | Select an available model in the app |
| **Anthropic** | Claude family models |
| **Google Gemini** | Gemini family models |
| **Groq** | Fast inference, supported open models |
| **Ollama** | Local models. Fully offline, zero cloud. |

The agent is provider-agnostic - pick the one that fits your privacy and cost preferences. For studios with strict data policies, **Ollama is the recommended path**: nothing about your project ever leaves your machine.

## Setting it up

1. Open the desktop app and go to **Settings &rarr; Advanced &rarr; AI Agent**.
2. Pick a provider.
3. Paste your API key (or for Ollama, point to your local Ollama server URL).
4. Pick a model.
5. Save.

The agent panel becomes available in the project view. Open or close it with `Ctrl+I` (`Cmd+I` on macOS).

Use the composer menus to make requests more precise:

- **`/`** opens quick commands for common operations, including scoped exports.
- **`@`** references an asset or collection. Browse the hierarchy to distinguish items with similar names.
- **`~`** references a project script. Configure its directory and allowed extensions in **Project Settings > Advanced > Scripts**.

Script references are resolved and validated against the selected scope before execution. For preparation that should happen whenever an asset opens, configure a [DCC launch hook](./integrations.md#dcc-launch-configuration).

## What it doesn't do

- It **does not read file contents**. It sees metadata: names, types, tags, statuses, comments, assignees, dependencies, checkpoint history. The actual binary contents of your files are never sent to the model.
- It **does not learn from your project across sessions**. Each conversation starts fresh.
- It **does not bypass your permissions**. The agent can only do what your role lets you do; the server enforces permissions on every action just like a normal client.

## Privacy considerations

- With **Ollama**, queries never leave your machine. The model runs locally.
- With cloud providers, only the metadata needed to answer your question or carry out an action is sent - names, statuses, structural information. File contents are never transmitted.
- Studios with sensitive client work should default to Ollama or an on-prem inference setup.

## Tips

- **Be specific.** "Move all WFA lighting assets in seq02 to the review collection" beats "tidy this up."
- **Use it for onboarding.** Have new team members ask the agent to explain Clustta concepts and your project's structure.
- **Lean on bulk operations.** The agent shines at things like "assign every shot in seq03 evenly across these four artists" or "set everything tagged `final` to Done."
- **Review generated scripts** before running them.
