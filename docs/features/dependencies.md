# Dependencies

Most creative work doesn't exist in isolation. A *Lighting* task depends on *Animation*. *Animation* depends on a *Character Rig* and an *Environment*. The character rig depends on a *Model*, *Textures*, and *Materials*.

Clustta makes these relationships first-class. You can declare them, visualize them, and rely on them to grant access automatically.

## Why dependencies?

Without dependency tracking, granting an artist what they need to do their work is a chore:

- "I'm assigning you the Lighting task. You'll also need: the animation file, the rig, all the textures..." (Ã-20 items)
- The artist has to ask repeatedly for missing pieces.
- When the rig updates, no one knows which downstream shots are affected.

Dependencies fix all three problems.

## What a dependency is

A directed link from one asset (or collection) to another, optionally tagged with a **dependency type** (e.g. *uses*, *references*, *based-on*). Asset A *depends on* Asset B means: A needs B to be useful.

Dependencies are stored in the project database - they're real metadata, not folder conventions.

## Creating dependencies

Several ways:

- **Drag and drop** - In the browser, drag one asset onto another. Choose **Add as Dependency**.
- **From the dependency graph view** - Open an asset, click the dependency graph icon. From the right-side panel, click `+` next to any asset to add it as a dependency.
- **From the asset details pane** - Add or remove dependencies from the dependency section.

Drop a *collection* in instead of an asset to add the entire collection as a dependency in one shot - useful for "this character depends on the entire textures collection".

<!-- TODO: screenshot of dependency graph view -->

## Visualizing dependencies

Each task asset has a **dependency graph view**:

- Shows the asset and its direct dependencies (default)
- Toggle **Full graph** to expand recursively and see every transitive dependency

The right-side panel shows candidate assets you can add - filterable by type, tag, or search.

## Recursive resolution on assignment

This is where dependencies pay off in production: **when you assign a task to a collaborator, all of its dependencies (and their dependencies, recursively) are made available to that collaborator automatically.**

Example:

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

Adaeze receives the complete pull-down she needs. No manual sharing. No "can you also send me the X" messages.

## Dependency types

Dependencies can be **typed** so that intent is preserved. Typical types include:

- **uses** - generic dependency
- **references** - the asset is referenced (linked) but not embedded
- **based-on** - the asset is a derivative of another

Dependency types are configurable per project in **Project Settings â†’ Dependency Types**.

## Removing dependencies

From the graph view, click the **`â€“`** button on any dependency node, or remove it from the asset details pane.

Removing a dependency does **not** revoke access to anyone who is currently assigned to the parent - they keep what they've already pulled. Future assignments use the new graph.

## Best practices

- **Model real relationships, not folder structure.** A texture isn't a dependency of a character just because it lives in the character's folder - it's a dependency because the character's material *uses* it.
- **Use collection dependencies for groups.** A *Lighting* task doesn't need to depend on each of 30 individual cowry textures - depend on the *Cowries Textures* collection instead.
- **Don't be afraid of deep graphs.** The recursion handles it. The deeper your model, the more automatic your handoffs.
