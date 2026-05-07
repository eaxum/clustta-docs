# Your First Project

This walks you through creating a project, adding files, and creating your first checkpoint — the core loop you'll use every day.

## Create the project

1. From your **Personal** studio (or any studio you have project-creation rights in), click **New Project** at the top-left of the projects page.
2. Enter a **name** for the project.
3. Pick a **working folder** — this is the actual folder on your disk where files will live. Clustta creates and manages it for you.
4. Click **Create**.

<!-- TODO: screenshot of New Project modal -->

::: info Working folder
The working folder is just a regular folder. Your DCC tools (Blender, Photoshop, Maya, etc.) read and write files here as if Clustta didn't exist. Clustta watches the folder and tracks changes in the background.
:::

## Open the project

Double-click the project in the list to open it. You'll see the Clustta browser — empty, since you haven't added anything yet.

The browser is your project's home base. From here you'll create collections, add assets, view checkpoints, manage assignments, and switch between views (List, Grid, Kanban, Workflow).

## Add your first asset

There are two ways to get files into Clustta:

### Method 1 — Drop files into the working folder

The fastest way for files that already exist:

1. Right-click an empty area in the browser → **Show in Explorer** (or click the show-in-explorer icon in the details pane).
2. Copy or save your file(s) into the working folder.
3. Switch back to Clustta. New files appear marked as **Untracked** (an "Add Checkpoint" badge will show on them).
4. Click the badge — Clustta will track the file and create its first checkpoint.

<!-- TODO: screenshot of untracked asset with badge -->

### Method 2 — Create from an Asset Template

If your studio has set up [asset templates](../features/asset-templates.md), you can create a fresh asset from a known starting point:

1. Click **New Asset** on the action bar.
2. Pick the template (e.g. "Blender Scene", "Photoshop Document").
3. Give it a name, optionally set a type and tags.
4. Click **Create**.

Clustta creates the file from the template and registers it. Double-click to open it in the appropriate application.

## Edit and create a checkpoint

Open the file you just added in your DCC tool. Make some changes. Save.

Back in Clustta, the asset will now show as **Modified** — Clustta has detected your save.

To preserve this version:

1. Click the **Modified** indicator on the asset (or use `Ctrl+Shift+C`).
2. A checkpoint dialog appears.
3. Add a **comment** describing what changed ("blocking pass", "color tweak", "fixed UVs").
4. Optionally set the **status** (Todo, WIP, WFA, Retake, Done).
5. Optionally attach or capture a **preview image**.
6. Click **Create**.

<!-- TODO: screenshot of Create Checkpoint modal -->

That's it. Your work is now versioned. You can checkpoint as often as you like — Clustta only stores the chunks that actually changed, so even tiny changes to huge files cost almost nothing.

## Browse history

Select an asset and look at the **details pane** on the right. You'll see the full checkpoint history — comments, authors, dates, previews. From here you can:

- **Open** any historical checkpoint
- **Revert** the working file to a previous checkpoint
- **Delete** old checkpoints (sent to trash, recoverable)

## Organize with collections

As your project grows, create **collections** to group related assets:

1. Click **New Collection** on the action bar (or `Ctrl+K`).
2. Name it ("Characters", "Shots", "Textures") and optionally set a **type**.
3. (Optional) Toggle **Library** if every collaborator on the project should see it without explicit assignment.

Drag assets into collections, or right-click → Move. Collections can be nested as deeply as you want.

## What's next

- Add more team members → [Studios & collaboration](./studios.md)
- Learn about [checkpoints](../features/checkpoints.md), [assignments](../features/assignments-and-statuses.md), and [dependencies](../features/dependencies.md)
- See all keyboard shortcuts → [Keymap](../reference/keymap.md)
