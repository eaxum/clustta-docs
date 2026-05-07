# Workflows

Workflows are visual templates that define the *shape* of work in your project - what collections, what assets, and how they depend on one another. They let you scaffold structured pieces of a production with a single click instead of building them by hand every time.

If your studio produces many shots that all follow the same internal structure (animation → fx → lighting → comp), a workflow encodes that structure once. New shots created from the workflow come pre-populated with the right slots and the right dependency links.

<!-- TODO: screenshot of workflow editor -->

## Why workflows?

Without workflows, scaffolding a new shot or asset means:

- Manually creating each collection
- Creating each child asset
- Setting types on each
- Wiring up dependencies one by one

For a studio doing dozens of shots, this is hours of clicking and a major source of inconsistency.

A workflow turns it into one operation.

## Anatomy of a workflow

A workflow is built in the visual workflow editor and consists of:

- **Collections** - folder-like nodes (e.g. *Shot*, *Sequence*, *Asset*)
- **Asset slots** - typed asset placeholders inside collections (e.g. *Animation*, *Lighting*, *FX*, *Comp*)
- **Links** - directed dependency relationships between slots (e.g. *Lighting depends on Animation*)

When the workflow is instantiated for a real piece of work - say, a new shot - Clustta:

1. Creates the collection structure
2. Creates the asset slots (as Tasks, with the right types)
3. Wires the dependency links

The resulting shot is ready to be assigned to artists.

## Creating a workflow

Workflows live in **Project Settings → Workflows**:

1. Click **Add Workflow**, give it a name (e.g. "Shot Standard").
2. The visual editor opens.
3. Drag in collections and assets, set their types.
4. Connect them with dependency links by dragging from one node's port to another.
5. Save.

## Using a workflow

From inside the project browser:

1. Click **New from Workflow** (or right-click in a collection → **Scaffold from Workflow**).
2. Pick the workflow.
3. Provide a name (e.g. "Shot 020").
4. Clustta builds the structure.

The result is a real, fully-functional sub-tree of collections and tasks ready to assign and start working on.

## A typical workflow shape

A common animation studio shot workflow:

```
Shot/
├── Animation        (depends on: nothing - receives character + props from outside)
├── FX               (depends on: Animation)
├── Lighting         (depends on: Animation, FX)
└── Comp             (depends on: Lighting)
```

Once instantiated, an artist assigned to *Lighting* automatically receives *Animation* and *FX* (via dependency resolution - see [Dependencies](./dependencies.md)) without you needing to manually grant access.

## Editing existing workflows

Edit the workflow definition any time. **Existing instantiated structures are not modified retroactively** - workflows are scaffolds, not live links. New shots created after the edit will use the updated definition.

## Workflows + Asset Templates

Workflows define the **shape**. [Asset Templates](./asset-templates.md) define the **starting file content**. Combine them: a workflow's *Animation* asset slot can pull from a *blender-anim-template.blend* asset template, so the new asset opens with the studio's standard scene setup, render settings, and naming conventions.

## When to use a workflow

✅ You have a repeatable production unit (shot, sequence, asset of a kind) that always has the same internal structure.

✅ You want consistency across artists - everyone's shots look identical structurally.

✅ You want to onboard new artists faster - they just open the asset and start working.

❌ Each piece of work is bespoke and structurally different. Just create things by hand.

❌ Your structure is still evolving. Build a few by hand first, then encode it as a workflow once it stabilizes.
