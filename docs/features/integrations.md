# Integrations and Plugins

Clustta connects to your existing creative pipeline through integrations with production tools and local APIs for plugin development.

## Kitsu

[Kitsu](https://www.cg-wire.com/kitsu) is CGWire's open-source production tracking platform. Clustta integrates with Kitsu so production metadata such as statuses, assignments, and assets can stay synchronized while source files and checkpoint history remain in Clustta.

The integration uses an always-on server listener, a studio-wide service account, and project-specific links and mappings.

[Learn about Kitsu and configure the integration](./kitsu-integration.md).

## DCC Bridge

The DCC Bridge is a local HTTP REST server built into the Clustta desktop client. It lets tools such as Blender, Maya, Unreal, Houdini, Nuke, and Substance query Clustta project data using their existing HTTP libraries.

The bridge runs on the local machine and requires a local bearer token. It uses the desktop account's access to read project data and perform supported asset operations, including checkpoints, status changes, builds, and reverts.

[Learn about the DCC Bridge and plugin development](./dcc-bridge.md).

## DCC launch configuration

Project launch hooks prepare a creative application when you open an asset from Clustta. Use them to select an installed application version, load a project script, or supply environment variables. Scripted launch preparation currently supports Maya (`.ma`, `.mb`) and Blender (`.blend`).

In **Project Settings > Advanced > Scripts**, configure the script directory and allowed extensions. The default is `Scripts` with `.py` files. The directory is relative to the project root, and the Agent lists its immediate files. Hook scripts must be tracked project assets; include `.mel` in the allowed extensions if you use Maya MEL scripts. The same script configuration supplies the Agent's `~` references.

Define project environment variables in Advanced, then open **Project Settings > Hooks** and add a launch hook. Give it a name, choose the matching file extensions, and select an optional application version, script, and environment variables. Each hook accepts one script and needs at least one of these settings. A version-only hook can select the required application without running a script. Enabled hooks cannot overlap on the same extension.

Use `<ProjectRoot>` in an environment value to resolve a path from each collaborator's local project folder, such as `<ProjectRoot>/Scripts`. Save the variable definitions before selecting them in a hook.

Clustta discovers supported installed DCC versions. Choose **Block launch** when preparation is required, or **Warn and continue** when the application can still be used if preparation fails. Project settings sync with the project; installed applications still need to be available on each collaborator's machine.

Before launch, Clustta fetches missing tracked assets needed by the hook and its environment. Script execution requires a trust confirmation, which is tied to the hook configuration and script contents. Review the listed scripts before accepting, and expect another confirmation when those inputs change. Missing environment paths or unavailable application versions can prevent preparation; check the reported path or version before retrying.

The [Maya production template](../pipeline/3d-animation.md#example-workflow) includes a workspace hook you can use as a starting point.

## AI Agent

The AI Agent gives supported assistants controlled access to Clustta project context and actions through agent tooling.

[Learn about the AI Agent](./ai-agent.md).

## Roadmap

- **Public REST API** with documented OpenAPI schema (currently the bridge is internal-stable, not external-stable)
- **Webhook system** so external tools can react to Clustta events (sync, checkpoint, status change)
- **First-party plugins** for Blender, Maya, and Unreal (the bridge is the foundation; plugins are the next layer)
- **More production tracker integrations** (Shotgrid, Ftrack)
