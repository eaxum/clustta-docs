# Dependencies

Most creative work doesn't exist in isolation. A *Lighting* task depends on *Animation*. *Animation* depends on a *Character Rig* and an *Environment*. The character rig depends on a *Model*, *Textures*, and *Materials*.

Clustta records these relationships in the project. Linked dependencies connect assets to the files they need and make those files available to the collaborators assigned to the work.

## Why dependencies?

Without dependency tracking, granting an artist what they need to do their work is a chore:

- "I'm assigning you the Lighting task. You'll also need: the animation file, the rig, all the textures..." (Ã-20 items)
- The artist has to ask repeatedly for missing pieces.
- When the rig updates, no one knows which downstream shots are affected.

Dependencies fix all three problems.

## What a dependency is

A dependency describes a relationship between assets, or between an asset and a collection. A **linked** dependency means the asset needs the referenced files to be available for its work or delivery.

Dependency relationships are stored in the project database - they're real metadata, not folder conventions.

## Creating dependencies

Several ways:

- **Drag and drop** - In the browser, drag one asset over another and it registers it as a dependency.


- **From the asset details pane** - Add or remove dependencies from the dependency section.

You can also drop a *collection* over an asset to add the entire collection as a dependency - useful for "this character depends on the entire textures collection".

<!-- TODO: screenshot of dependency graph view -->

The browser creates **linked** dependencies. Links between assets can also specify which checkpoint to use. Linked collection dependencies bring a group of assets into the graph.

### Choosing a dependency version


Dependencies can follow the latest checkpoint, remain pinned to a specific version, or follow a checkpoint tag such as *approved*. Use the latest version when you want to receive ongoing updates. Pin a checkpoint when a shot or deliverable needs a stable input. Tags let the upstream artist decide which checkpoint is ready for others to use.

| Selection | Behavior |
|-----------|----------|
| **Latest** | Resolves to the dependency asset's latest checkpoint. The API calls this `floating`. |
| **Pinned** | Keeps the exact checkpoint selected for that dependency. New checkpoints do not change the pin. |
| **Tag** | Uses the checkpoint currently carrying that tag on the dependency asset. Moving the tag changes the version this dependency resolves to. |

Use the pin control in the dependency list or graph to pin the current checkpoint. Unpin it to return to Latest, or open the version selector to choose an available checkpoint tag. Changing a selector requires permission to manage dependencies. A **Fix selector** label means the selected checkpoint or tag cannot currently be resolved.

Tags are shared project labels, but each asset has its own checkpoint assignment for a tag. See [Checkpoints & Versioning](./checkpoints.md#browsing-history) for assigning and moving them. Selector and tag changes travel through project sync; changing a selector does not itself replace a working file.

### Building with dependencies

Choose **Build with dependencies** from an asset's context menu, or press `Ctrl+Shift+F` (`Cmd+Shift+F` on macOS). Clustta resolves the linked dependency graph and shows the exact checkpoints it will restore, including downloads, conflicts, and locally modified files.

Review the plan before selecting **Build**. Conflicting requirements must be resolved first. Locally modified files require the **Overwrite locally modified dependency files** confirmation; checkpoint any work you need to preserve before allowing replacement.

Clustta downloads missing chunks and restores dependencies before the assets that use them. If requirements change after the preview was opened, the build is rejected so you can review a fresh plan.

## Visualizing dependencies

Each asset has a **dependency graph view**:

- Shows the asset and its direct dependencies (default)
- Toggle **Full graph** to expand recursively and see every transitive dependency


## Recursive resolution on assignment

When you assign a task to a collaborator, its **linked dependencies** are made available to that collaborator. Resolution follows linked relationships recursively, including linked collections, so the collaborator can access the files needed for the task.

Example, with every relationship below using the **linked** type:

```
Lighting (assigned to Adaeze)
â”œâ”€â”€ Animation                  â† auto-granted
â”‚   â”œâ”€â”€ Character Rig: Jako   â† auto-granted (transitive)
â”‚   â”‚   â”œâ”€â”€ Model: Jako       â† auto-granted
â”‚   â”‚   â””â”€â”€ Textures (collection: Jako Skin)  â† entire collection auto-granted
â”‚   â””â”€â”€ Environment: Carpenter Shop  â† auto-granted
â””â”€â”€ FX                         â† auto-granted
    â””â”€â”€ ...
```

Harry receives access to the linked inputs needed for Lighting, including the rig's own dependencies.

## Dependency types

Clustta defines four built-in dependency types: **linked**, **waiting on**, **blocking**, and **working**.

Currently, only **linked** dependencies are used to resolve asset access and deliverability: they identify the files collaborators need to receive and build alongside an asset. A linked relationship in Clustta does not itself insert a reference into a Blender or Maya scene.

**Waiting on**, **blocking**, and **working** are intended for assignment and status workflows. They are not currently used to resolve file access or delivery, and should not be treated as automatic assignment or status rules. Use **linked** when an artist needs another asset's files.

Dependency types describe the relationship. **Latest**, **Pinned**, and **Tag** describe which checkpoint a linked asset dependency resolves to; they are separate settings.

## Removing dependencies

From the graph view, click the **`â€“`** button on any dependency node, or remove it from the asset details pane.

Removing a dependency does **not** revoke access to anyone who is currently assigned to the parent - they keep what they've already pulled. Future assignments use the new graph.

## Best practices

- **Model real relationships, not folder structure.** A texture isn't a dependency of a character just because it lives in the character's folder - it's a dependency because the character's material *uses* it.
- **Use collection dependencies for groups.** A *Lighting* task doesn't need to depend on each of 30 individual cowry textures - depend on the *Cowries Textures* collection instead.
- **Don't be afraid of deep graphs.** The recursion handles it. The deeper your model, the more automatic your handoffs.
