# Integrations

Clustta connects to your existing creative pipeline through two main mechanisms: a **Kitsu** integration for production tracking, and a **DCC Bridge** local API for plugin development.

## Kitsu (CGWire)

[Kitsu](https://www.cg-wire.com/kitsu) is the open-source production tracking platform from CGWire — widely used in animation studios. Clustta integrates with Kitsu so production metadata (statuses, assignments, assets) can stay in sync between the two systems.

### Why integrate

If your studio already runs Kitsu for production tracking, you don't have to choose between Kitsu and Clustta — they coexist:

- **Kitsu** continues to be your source of truth for production planning, scheduling, breakdowns, and reviews.
- **Clustta** handles the actual file versioning, sync, and asset access on artists' machines.
- **The integration** keeps statuses and assignments in sync so your producers don't have to update both systems.

### Setting it up

1. In Clustta, open **Project Settings → Integrations → Kitsu**.
2. Provide your Kitsu instance URL, API user credentials, and the Kitsu project ID to link to.
3. Map Clustta collections to Kitsu episodes/sequences/asset categories.
4. Map Clustta assets to Kitsu shots/assets.
5. Save.

Once connected:

- Status changes in Clustta propagate to Kitsu (and vice versa, depending on your sync direction settings).
- Assignments stay synchronized.
- Mapping is by ID, so renames don't break the link.

### What's not synced

- **File contents** stay in Clustta. Kitsu was never meant to store source files.
- **Checkpoint history** stays in Clustta.
- **Comments and reviews** stay in Kitsu (its review tooling is excellent).

## DCC Bridge

The DCC Bridge is a **local HTTP REST server** built into the Clustta desktop client. It exposes project data — accounts, studios, projects, collections, assets, checkpoints — as REST endpoints so DCC tools can query and interact with Clustta programmatically.

### Why a local HTTP API

DCC plugin development is normally painful: every tool has its own scripting language, its own threading model, its own way of being called from outside. By exposing Clustta as a local HTTP server, we hand off all that complexity to the tool's own HTTP libraries:

- **Blender** can hit it from a Python addon
- **Maya** from a `requests`-based script
- **Unreal** from Blueprint or C++ HTTP nodes
- **Houdini, Nuke, Substance** — anything that can make an HTTP request

This means plugin developers don't need to link against Clustta's binary, navigate platform-specific IPC, or deal with our internal data formats. They get clean JSON over HTTP.

### Where it runs

The bridge runs on `127.0.0.1` (loopback only — never exposed to the network) on a configurable local port. It comes up automatically when the Clustta desktop client is running.

### What it exposes

Read-only endpoints for:

- Authentication / current user
- Studios you have access to
- Projects in each studio
- Collections and their nesting
- Assets, including types, tags, statuses, assignees
- Checkpoints — version history, authors, comments
- Working folder paths so the plugin knows where files are on disk

Write endpoints for common operations are being expanded; the current model favors *reading* project data and letting the user perform writes through the desktop UI.

### Authentication

The bridge ties into the desktop app's logged-in session. If no user is signed in, the bridge returns 401. There's no separate token model — the local app is the source of trust.

### Building a plugin

1. Make sure the desktop client is running.
2. Discover the bridge port (advertised to local plugins via a known config file or environment variable).
3. Hit `GET http://127.0.0.1:<port>/api/v1/projects` for example.
4. Parse the JSON. Build your UI in the DCC tool. Use the data.

A reference plugin and OpenAPI spec are in the works. For now, the [client repo](https://github.com/eaxum/clustta-client) under `internal/bridge` shows the available endpoints.

## Roadmap

- **Public REST API** with documented OpenAPI schema (currently the bridge is internal-stable, not external-stable)
- **Webhook system** so external tools can react to Clustta events (sync, checkpoint, status change)
- **First-party plugins** for Blender, Maya, and Unreal (the bridge is the foundation; plugins are the next layer)
- **More production tracker integrations** (Shotgrid, Ftrack)
