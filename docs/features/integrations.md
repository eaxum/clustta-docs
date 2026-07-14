# Integrations and Plugins

Clustta connects to your existing creative pipeline through integrations with production tools and local APIs for plugin development.

## Kitsu

[Kitsu](https://www.cg-wire.com/kitsu) is CGWire's open-source production tracking platform. Clustta integrates with Kitsu so production metadata such as statuses, assignments, and assets can stay synchronized while source files and checkpoint history remain in Clustta.

The integration uses an always-on server listener, a studio-wide service account, and project-specific links and mappings.

[Learn about Kitsu and configure the integration](./kitsu-integration.md).

## DCC Bridge

The DCC Bridge is a local HTTP REST server built into the Clustta desktop client. It lets tools such as Blender, Maya, Unreal, Houdini, Nuke, and Substance query Clustta project data using their existing HTTP libraries.

The bridge runs on the local machine and uses the desktop app's signed-in session. It currently focuses on read access to projects, collections, assets, checkpoints, and working-folder paths.

[Learn about the DCC Bridge and plugin development](./dcc-bridge.md).

## AI Agent

The AI Agent gives supported assistants controlled access to Clustta project context and actions through agent tooling.

[Learn about the AI Agent](./ai-agent.md).

## Roadmap

- **Public REST API** with documented OpenAPI schema (currently the bridge is internal-stable, not external-stable)
- **Webhook system** so external tools can react to Clustta events (sync, checkpoint, status change)
- **First-party plugins** for Blender, Maya, and Unreal (the bridge is the foundation; plugins are the next layer)
- **More production tracker integrations** (Shotgrid, Ftrack)
