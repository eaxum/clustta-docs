# Sync & Conflict Resolution

Sync is how local checkpoints become available to the rest of the team. Clustta's sync model is **explicit, selective, and conflict-aware** — your work is never silently overwritten, and you control exactly when changes are pushed and pulled.

## The model

Clustta is **local-first**. Everything you do — creating assets, checkpointing, changing status, editing metadata — happens against your local `.clst` project file first. Nothing leaves your machine until you sync.

Sync moves data in both directions:

- **Up** — your new local checkpoints, status changes, assignments, etc. are sent to the studio server.
- **Down** — new checkpoints and metadata changes from teammates are pulled to your machine.

Each sync is **selective**:

- You only download the binary chunks for assets that are **assigned to you** or live in **Library** collections.
- Other people's work-in-progress files don't fill your disk.
- Metadata syncs in full so you always see the project structure.

## Triggering a sync

Three ways:

- **Click Sync** in the title bar / studio dropdown
- Press **`Ctrl+S`**
- Toggle **Sync after checkpoint** in the Create Checkpoint dialog (one-shot)

The status indicator at the top of the app shows current sync state:

- **Up to date** — local matches server
- **Working / busy** — sync in progress
- **Conflict** — needs your attention before sync can finish

<!-- TODO: screenshot of sync indicator -->

## Why sync is manual, not automatic

Auto-sync sounds nice in theory. In practice, with creative files, it's a disaster waiting to happen:

- A teammate uploads a half-broken intermediate save → it lands on your disk → your DCC tool reloads it mid-render.
- Two people edit the same scene → the "winner" silently overwrites the loser.
- Slow networks → multi-GB uploads happen in the middle of a Maya save → corruption.

Manual sync means you push when you're at a good stopping point and pull when you're ready to integrate someone else's work. No surprises.

## What gets uploaded

When you sync up:

- **All new chunks** for any new checkpoints since the last sync (delta-only — chunks that already exist on the server are skipped)
- **All metadata changes** — new assets, status changes, assignments, tags, dependencies, role updates, etc.

The transfer uses content-addressed storage, so chunks shared across files or between teammates are uploaded only once across the entire project.

## What gets downloaded

When you sync down:

- **All metadata changes** from other people
- **Chunks for newly-assigned items**, including everything pulled in by transitive dependencies
- **Updated chunks** for items already on your disk where the server has a newer version

You'll then see those items as **Outdated** until you click them to actually pull the new content into your working file.

## Asset states during sync

Assets carry a visual state indicator. After syncing you might see:

| State | Meaning | Action |
|-------|---------|--------|
| **Normal** | Up to date | None |
| **Modified** | Local edits since last checkpoint | Checkpoint to preserve |
| **Outdated** | Server has a newer version | Click to pull |
| **Untracked** | New file in working folder, not yet known to Clustta | Click to track |
| **Rebuild** | Asset is registered but no local file (new device, freed space) | Click to download |

See [Collections & Assets](./collections-and-assets.md) for more on managing local files.

## Conflicts

A conflict happens when two collaborators independently created something the server can't merge automatically. Two cases:

1. **Same name, same parent collection** for two collections.
2. **Same name, same parent collection, same extension** for two assets.

When sync detects a conflict, it pauses and surfaces a **conflict resolution dialog**. You get two options per conflict:

### Rename (keep mine local, theirs becomes canonical)

- Your local item is renamed (you'll be prompted for the new name).
- The server's version takes the original name.
- Both items now exist independently.
- Your local checkpoints are preserved on the renamed item.

Pick this when both items are legitimately separate things and you want to keep both.

### Merge (combine local with server's existing one)

- The two items are reconciled into one.
- Your local checkpoints are stacked on top of the server's checkpoints as new versions.
- **No work is lost.** Every checkpoint from both sides remains accessible.

Pick this when you and your teammate were working on the same conceptual asset and just both happened to name it the same.

<!-- TODO: screenshot of conflict resolution dialog -->

## Conflict prevention

Most conflicts are eliminated by the **single-assignee soft lock** — only the assignee can checkpoint, so the most common case (two people editing the same file) can't happen. Conflicts mostly arise from:

- Two people independently creating a new asset with the same name in the same collection
- Schema-level overlaps (same collection in same parent)

Both are easy to resolve, and Clustta never auto-decides for you.

## Tips for healthy sync

- **Sync after meaningful work**, not after every checkpoint. Local is fine for in-progress.
- **Pull before starting** on a task you know teammates are also touching.
- **Communicate naming** for new assets in shared spaces — eliminates rename conflicts.
- **Use Library collections** for shared resources so everyone sees them without explicit assignment.
- **Selective sync** keeps disks small — let the system download only what you actively need.

## Quick reference

| Action | Shortcut |
|--------|----------|
| Sync project | `Ctrl+S` |
| Pull updates only | Click Sync (will both push and pull) |
| Resolve conflicts | Modal appears automatically when conflicts detected |
| See sync state | Title bar status indicator |
