# Collections & Assets

Collections and assets are how everything in Clustta is organized. They map onto your filesystem one-to-one — collections are folders, assets are files — but with metadata, types, tags and dependencies layered on top.

## Assets

An asset is any file under Clustta's version control. It could be:

- A `.blend`, `.ma`, `.psd`, `.ai`, `.kra`, `.sbsar`, `.zpr`...
- A render, an image, a PDF, a video
- A web link to an external tool (Figma, Pinterest, Canva)

Each asset has:

- **Name** — what it's called
- **Type** — either **Task** (assignable, has a status) or **Resource** (passive, no assignment)
- **Asset Type** — a custom classifier like *Animation*, *Concept Art*, *Texture*, *Storyboard* (each with its own icon)
- **Tags** — free-form labels
- **Status** (Tasks only) — Todo / WIP / WFA / Retake / Done
- **Assignee** (Tasks only) — the person responsible
- **Dependencies** — other assets or collections it relies on
- **Checkpoints** — full version history

### Tasks vs Resources

- **Resource** is the default. Other people can see and download it, but it's not "owned" by anyone — anyone with permission can update it.
- **Task** has a single assignee. Only the assignee can create checkpoints (the soft lock). Tasks have a status and show up on the Kanban board.

You can convert between the two: right-click → **Convert to Task** / **Convert to Resource**.

### Creating assets

Two methods, covered fully in [Your First Project](../getting-started/first-project.md):

1. **Drop files into the working folder** — Clustta detects them as Untracked and lets you start tracking with one click.
2. **Use Asset Templates** — Create a fresh asset from a registered starting file. See [Asset Templates](./asset-templates.md).

## Collections

Collections are containers — like folders, but smarter.

Each collection has:

- **Name**
- **Collection Type** — custom classifier with an icon (e.g. *Characters*, *Shots*, *Sequences*, *Designs*)
- **Library** flag — when toggled, every project collaborator can see the collection without explicit assignment
- **Description** and **preview image** (optional)

Collections can be nested as deeply as you need. A typical animation project might look like:

```
Assets/
├── Characters/
│   ├── Jako/
│   ├── Obinna/
│   └── Samson/
├── Environments/
│   ├── Carpenter Shop/
│   └── Storage Room/
└── Props/
    ├── Hammer/
    └── Plank/

Sequences/
├── Sequence 01/
│   ├── Shot 010/
│   ├── Shot 020/
│   └── Shot 030/
└── Sequence 02/
    └── ...
```

### Library collections

Mark a collection as a **Library** if everyone on the project should see it regardless of assignment. Common uses:

- Shared character/asset libraries (rigs, base models)
- Reference images and style guides
- Production templates and checklists
- Common materials, textures or sound packs

Without the Library flag, collections are only visible to users assigned to assets inside them.

### Creating collections

1. Click **New Collection** on the action bar (or `Ctrl+K`).
2. Enter a name and optionally pick a type.
3. Toggle **Library** if appropriate.
4. Click **Create**.

<!-- TODO: screenshot of Create Collection modal -->

## Types

Both asset types and collection types are fully customizable per project. Open **Project Settings → Asset Types / Collection Types** to manage them. Each type can have:

- A name
- An icon (chosen from a built-in set)
- A description

Types make filtering and visual scanning trivial — you can immediately see which assets are characters, which are shots, which are textures.

## Tags

Tags are free-form labels you can apply to any asset. Use them for cross-cutting concerns that don't fit a type — *needs-review*, *external-asset*, *placeholder*, *deliverable-001*. Filter by tag from the toolbar.

## The browser views

The browser has multiple ways to see the same data:

- **List view** — Compact strips, ideal for scanning lots of assets
- **Grid view** — Thumbnails, ideal for visual asset libraries
- **Kanban view** — Columns by status, ideal for production tracking
- **Workflow view** — Visual graph of asset dependencies (see [Workflows](./workflows.md))

Switch views from the icons in the top-right of the browser.

<!-- TODO: screenshot of view switcher -->

## Navigation

Clustta uses an **expand-in-place** navigation model: click the chevron on a collection to reveal its contents in the same view, no folder dive. Double-click a collection to "enter" it (isolating its contents and updating the breadcrumb).

This means you can scan deep project hierarchies without navigating folder-to-folder.

## Drag, drop, multi-select

Standard `Shift+click` and `Ctrl+click` for multi-select. Drag items onto each other to move them between collections, or to create dependencies (drop on a Task asset to add a dependency).

## Quick actions

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | New Collection |
| `Ctrl+T` | New Task (asset) |
| `F2` | Rename |
| `Ctrl+F2` | Edit metadata |
| `Delete` | Free up space (clear local file, keep history) |
| `Shift+Delete` | Permanently delete (to trash) |
| `↵ Return` | Open / enter |
| `F5` | Reload view |
