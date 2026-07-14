# DCC Bridge

The DCC Bridge is a **local HTTP REST server** built into the Clustta desktop client. It exposes project data - accounts, studios, projects, collections, assets, checkpoints - as REST endpoints so DCC tools can query and interact with Clustta programmatically.

## Why a local HTTP API

DCC plugin development is normally painful: every tool has its own scripting language, its own threading model, and its own way of being called from outside. By exposing Clustta as a local HTTP server, Clustta works with the tool's own HTTP libraries:

- **Blender** can access it from a Python addon.
- **Maya** can use a `requests`-based script.
- **Unreal** can use Blueprint or C++ HTTP nodes.
- **Houdini, Nuke, and Substance** can use any available HTTP client.

Plugin developers do not need to link against Clustta's binary, navigate platform-specific IPC, or work with its internal data formats. They receive JSON over HTTP.

## Where it runs

The bridge runs on `127.0.0.1:1173` (loopback only, never exposed to the network). It starts automatically while the Clustta desktop client is running.

## What it exposes

Read-only endpoints provide access to:

- Authentication and the current user
- Studios the user can access
- Projects in each studio
- Collections and their nesting
- Assets, including types, tags, statuses, and assignees
- Checkpoints, including version history, authors, and comments
- Working-folder paths, so a plugin knows where files are stored locally

Write endpoints for common operations are being expanded. The current model focuses on reading project data and leaves writes in the desktop UI.

## Authentication

The bridge uses the desktop app's signed-in session. If no user is signed in, the bridge returns `401`. There is no separate token model; the local app is the source of trust.

## Build a plugin

1. Make sure the desktop client is running.
2. Request an endpoint such as `GET http://127.0.0.1:1173/api/v1/projects`.
3. Parse the JSON and build the integration in the DCC tool.

A reference plugin and OpenAPI specification are planned. For now, see `internal/bridge` in the [Clustta client repository](https://github.com/eaxum/clustta-client) for the available endpoints.
