# Collections & Assets

Collections and assets are how everything in Clustta is organized. They map onto your filesystem one-to-one - collections are folders, assets are files - but with metadata, types, tags and dependencies layered on top.

## Assets

An asset is any file under Clustta's version control. It could be:

- A `.blend`, `.ma`, `.psd`, `.ai`, `.kra`, `.sbsar`, `.zpr`...
- A render, an image, a PDF, a video
- A web link to an external tool (Figma, Pinterest, Canva)

Each asset has:

- **Name** - what it's called
- **Type** - either **Task** (assignable, has a status) or **Resource** (passive, no assignment)
- **Asset Type** - a custom classifier like *Animation*, *Concept Art*, *Texture*, *Storyboard* (each with its own icon)
- **Tags** - free-form labels
- **Status** (Tasks only) - Todo / WIP / WFA / Retake / Done
- **Assignee** (Tasks only) - the person responsible
- **Dependencies** - other assets or collections it relies on
- **Checkpoints** - full version history

### Tasks vs Resources

- **Resource** is the default. Other people can see and download it, but it's not "owned" by anyone - anyone with permission can update it.
- **Task** has a single assignee. Only the assignee can create checkpoints (the soft lock). Tasks have a status and show up on the Kanban board.

You can convert between the two from the **Asset Details** pane. Assigning someone to a Resource also converts it to a Task.

### Creating assets

Two methods, covered fully in [Your First Project](../getting-started/first-project.md):

1. **Drop files into the working folder** - Clustta detects them as Untracked and lets you start tracking with one click.
2. **Use Asset Templates** - Create a fresh asset from a registered starting file. See [Asset Templates](./asset-templates.md).

## Collections

Collections are containers - like folders, but smarter.

Each collection has:

- **Name**
- **Collection Type** - custom classifier with an icon (e.g. *Characters*, *Shots*, *Sequences*, *Designs*)
- **Shared** flag - when toggled, every project collaborator can see the collection without explicit assignment
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

### Shared collections

Mark a collection as a **Shared** if everyone on the project should see it regardless of assignment. Common uses:

- Shared character/asset libraries (rigs, base models)
- Reference images and style guides
- Production templates and checklists
- Common materials, textures or sound packs

Without the Shared flag, collections are only visible to users assigned to assets inside them.

### Creating collections

1. Click **New Collection** on the action bar (or `Ctrl+K`).
2. Enter a name and optionally pick a type.
3. Toggle **Shared** if appropriate.
4. Click **Create**.

<!-- TODO: screenshot of Create Collection modal -->

## Types

Both asset types and collection types are fully customizable per project. Open **Project Settings > Asset Types / Collection Types** to manage them. Each type can have:

- A name
- An icon (chosen from a built-in set)
- A description

Types make filtering and visual scanning trivial - you can immediately see which assets are characters, which are shots, which are textures.

## Tags

Tags are free-form labels you can apply to any asset. Use them for cross-cutting concerns that don't fit a type - *needs-review*, *external-asset*, *placeholder*, *deliverable-001*. Filter by tag from the toolbar.

Manage the project tag list in **Project Settings > Tags**, where you can create, rename, and delete labels. Renaming a tag updates its shared definition. Use **No Tags** in the tag filter to find assets that still need categorization.

Tags can also identify checkpoints for versioned dependencies. A checkpoint tag appears on its asset as well. See [Checkpoints & Versioning](./checkpoints.md#browsing-history) for assignment behavior and deletion restrictions.

## The browser views

The browser has multiple ways to see the same data:

- **List view** - Compact strips, ideal for scanning lots of assets
- **Grid view** - Thumbnails, ideal for visual asset libraries
- **Kanban view** - Columns by status, ideal for production tracking

Switch views from the icons in the top-right of the browser.

The View menu lets you show or hide extensions, full paths, untracked items, and type icons. **File type icons** are a separate preference from the custom asset and collection type icons, so you can choose the information most useful for your work.

<!-- TODO: screenshot of view switcher -->

## Navigation

By default, Clustta uses an **expand-in-place** navigation model: click the chevron on a collection to reveal its contents in the same view, with no folder dive. Double-click a collection to switch to **Navigator mode**, which isolates its contents and updates the breadcrumb.

This means you can scan deep project hierarchies without navigating folder-to-folder. You can also use the arrow keys to move through the browser.

## Drag, drop, multi-select

Standard `Shift+click` and `Ctrl+click` for multi-select. Drag items onto each other to move them between collections, or to create dependencies (drop on a Task asset to add a dependency).

In the desktop app, hover over a local asset and use the **Drag into other app** handle to drag its working file into another application or your system file manager. If that asset is part of a selection, the handle uses the selected assets.

Every selected item must be an available local asset. Normal, Modified, and Outdated files are eligible; the drag uses the local working file, which may differ from the latest checkpoint. Collections, links, pointers, untracked or trashed items, and files that still need rebuilding are excluded. Native dragging supports Windows, macOS, and Linux; the Linux backend offers copy-only export. The receiving application determines how it imports the files.

## Export project data

Use the browser's export action to review a table of assets in the current browser view. Check the preview and total before saving, especially when filters or navigation have narrowed the view. This action exports metadata; use the drag handle above when you need the working files themselves.

Choose **CSV**, **JSON**, or **Plain Text**, then select the columns to include. Name, extension, and parent are required. Other fields include status, assignee, tags, and asset type. The preview is paginated, but the export includes all matching rows.

The name-format selector supports the original names, kebab-case, snake_case, camelCase, PascalCase, uppercase, lowercase, and title case. Formatting changes the exported names without renaming project assets.

The [Agent](./ai-agent.md) also provides `/export all assets`, `/export all tasks`, `/export all blender tasks`, and `/export all assets here` to open a preview for those scopes.

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
| `Arrow keys` | Navigate the browser |
| `F5` | Reload view |
