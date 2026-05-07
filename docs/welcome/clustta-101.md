# Clustta 101

A 5-minute crash course. By the end of this page, you'll understand the entire mental model and be ready to start using Clustta on a real project.

## The vocabulary

Five words cover 90% of what you'll do in Clustta:

| Term | What it is | Real-world equivalent |
|------|------------|----------------------|
| **Project** | A self-contained `.clst` file with all your work and history | A repo, or a folder you'd zip up and send |
| **Collection** | A container that holds assets and other collections | A folder |
| **Asset** | An individual file under version control | A `.blend`, `.psd`, `.mp4`, etc. |
| **Checkpoint** | A saved snapshot of an asset at a point in time | A "Save As v2" - but smarter |
| **Studio** | A team-level container of users and projects | An organization |

That's it. Everything else builds on these.

## The two modes

Clustta runs in one of two modes depending on which studio you're in:

- **Personal studio** - Always available. Perfect for solo work or trying things out. Projects stay on your machine, with optional ClusttaCloud™ sync for backup or collaboration with other indie artists.
- **Online studio** - A team studio with a server (self-hosted or ClusttaCloud™). Adds collaborators, roles, sharing, and sync.

You can have access to both at once and switch between them with the dropdown at the top of the app.

## The flow

Here's a complete day in Clustta, end to end.

### 1. Open or clone a project

- **Personal:** Click **New Project**, give it a name, pick a working folder. Done. You can also turn an existing folder into a project by clicking the **+** on an untracked folder in the browser.
- **Online:** A teammate (or you) creates the project on the server. You **download** it, picking where on your disk the working folder should live.

The working folder is just a regular folder. You can browse it in Finder/Explorer like anything else. Open files in Blender, Photoshop, your text editor - whatever.

<!-- TODO: screenshot of New Project modal -->

### 2. Add or edit files

You can get files into a project two ways:

- **Drop files into the working folder** in your native file browser. Clustta will detect them and mark them as **Untracked**.
- **Use an [Asset Template](../features/asset-templates.md)** from inside Clustta. Clustta creates the file for you using a template the studio has set up (e.g. a base `.blend` with the studio's render settings).

Edit those files normally - save in Blender, save in Photoshop. Clustta watches the working folder and notices anything that changed.

### 3. Create a checkpoint

When you've reached a sensible save point - a milestone, end of a session, before a risky experiment - create a **checkpoint**.

A checkpoint records:

- A descriptive comment ("blocking pass complete")
- An optional preview image
- Who made it and when
- Only the **chunks that changed** since the last checkpoint

Because of chunked storage, a checkpoint of a 2 GB scene where you tweaked one mesh might only be a few MB on disk. You can checkpoint as often as you want.

<!-- TODO: screenshot of Create Checkpoint modal -->

### 4. (Online studios & ClusttaCloud™ personal projects) Sync

Checkpoints are local until you sync. When you press **Sync** (or `Ctrl+S`), Clustta uploads your new checkpoints to the studio server (or, for ClusttaCloud™ personal projects, to your account). Collaborators - or your other machines - can then pull them down.

If someone else has changed something you also changed, Clustta surfaces it as a **conflict** with two clear options:

- **Rename** - Keep your local version under a new name; their version becomes canonical.
- **Merge** - Stack your local checkpoints on top of theirs. Nothing is lost.

There's no auto-merge. Your work never gets silently overwritten.

### 5. Hand off to a teammate

To give someone else access to an asset, **assign** it to them. They'll see it on their end and can checkpoint it (only the assignee can create checkpoints - that's the soft lock).

If the asset has **dependencies** (e.g. a shot that depends on a character rig and three textures), the assignee automatically gets the whole graph. No need to manually share each piece.

### 6. Track it on the board

Switch to the **Kanban view** to see assets grouped by status (Todo, WIP, WFA, Retake, Done). Drag cards between columns to update status. Your producers will love this.

<!-- TODO: screenshot of Kanban view -->

## What makes it different

A few things you might not be used to:

- **No "save" button in Clustta itself.** You save in your DCC tool. Clustta watches the file.
- **No branches.** Single ownership + assignment makes them unnecessary for this kind of work.
- **No staging area.** Modified files are detected automatically; you just decide when to checkpoint.
- **Selective sync.** You only download the assets assigned to you (plus anything in collections marked as **Shared**, which everyone can see). You're not dragging down 500 GB of project history just to fix one shot.
- **Soft delete.** Deleted things go to **Trash** and can be recovered until you actively purge.

## Where to go from here

- [Install the desktop app](../getting-started/install.md)
- [Create your first project](../getting-started/first-project.md)
- [Set up a studio for your team](../getting-started/studios.md)
- [Self-host the studio server](../getting-started/self-hosting.md)
- Browse [features](../features/checkpoints.md) for deep dives on each capability
