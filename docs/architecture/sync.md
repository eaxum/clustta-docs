# Sync Model

How project state moves between local clients and the studio server. Designed around three principles: **explicit, selective, and conflict-aware**.

## What sync is

A sync operation reconciles the **local project database** with the **server project database**, then transfers the chunk data needed for assets the local user is allowed to access.

Two halves run in each sync:

1. **Metadata reconciliation** - collections, assets, checkpoints, statuses, assignments, dependencies. Bi-directional.
2. **Chunk transfer** - actual binary content. Selective by user.

Metadata is small and always syncs in full. Chunk transfer is the part that takes real time on large projects.

## Push and pull

Sync moves data both ways in a single operation:

- **Push** - Local changes since last sync go to the server.
- **Pull** - Server changes since last sync come down.

You don't run them separately; the unified `Ctrl+S` (or Sync button) does both.

## Selective sync

The reason syncs are fast even on huge projects: **you don't pull what you can't see.**

The visibility rules:

- **Shared collections** - chunks pulled for everyone in the project.
- **Assigned assets** - chunks pulled for the assignee.
- **Transitive dependencies** - chunks pulled for the assignee of any task that depends on them, recursively.
- **Everything else** - metadata only. The user sees the asset exists but doesn't have its content locally.

If you're an animator on Shot 020, you pull:

- Shot 020 itself (you're assigned)
- The character rig it depends on
- The environment it depends on
- The textures the rig depends on
- ...transitively, all the way down

But you don't pull Shot 010, Shot 030, or someone else's WIP scene - even though you can *see* they exist.

## Pull-based, not push-based

Crucially, **the server never pushes data to clients unsolicited.** Clients pull on their own schedule.

This matters because:

- The server doesn't need to track per-client state ("has this client received X yet?")
- Clients can be offline arbitrarily long without state corruption
- Bandwidth and CPU stay predictable on the server side
- The model scales horizontally (more clients = more pulls, but each is independent)

## Local-first, manual trigger

Nothing syncs automatically. You explicitly press Sync (or `Ctrl+S`). Reasons:

- A teammate's half-broken intermediate save shouldn't auto-replace what you have open.
- A multi-GB upload shouldn't kick off mid-render.
- You should always know when your work is leaving your machine.

Auto-sync sounds nice in product copy. In production with binary assets it's a recipe for data loss.

## Conflict detection

A conflict arises when both client and server independently created (or modified) records that can't be reconciled automatically:

- **Asset name conflict** - Two assets with the same name + parent collection + extension.
- **Collection name conflict** - Two collections with the same name + parent.

Other "would-be" conflicts (e.g. checkpoint A vs checkpoint B on the same asset) **don't happen** because the assignment soft lock prevents concurrent checkpoints.

When a conflict is detected, sync **pauses** and surfaces a dialog. The user picks per conflict:

- **Rename** - Local item gets a new name, server's keeps the original. Both exist independently.
- **Merge** - Items are reconciled into one. Local checkpoints are stacked on top of the server's as new versions. No work is lost.

After the user resolves, sync resumes. Nothing is auto-decided. See [Sync & Conflicts](../features/sync-and-conflicts.md) for the user-facing detail.

## Wire format

Metadata is exchanged in **Protocol Buffers** for efficiency. Chunk transfer uses **HTTP(S)** with the chunk hash as the lookup key - for Cloud studios this often means **presigned URLs** so the client uploads/downloads directly to/from R2 without proxying through the studio server.

This direct-to-storage path matters at scale: a studio with 50 artists doing parallel pulls of large checkpoints would saturate a single proxying server. Direct R2 access scales independently of studio server CPU.

## Atomicity

A sync is logically atomic from the client's perspective:

- All metadata reconciliation is done in a transaction against the local SQLite.
- If the sync is interrupted (network drop, app close), the local database remains in a consistent prior state.
- The next sync resumes from where the last successful state ended.

Chunks are content-addressed, so partial chunk transfers can be resumed without risk of corruption - a chunk is either fully transferred and verifies, or it's not.

## Performance characteristics

| Operation | Cost |
|-----------|------|
| Metadata sync (typical project) | Sub-second |
| Initial chunk pull (large new project) | Network-bound; usually multi-minute |
| Incremental chunk sync (small edits) | Sub-second to seconds |
| Conflict detection | Sub-second |
| Conflict resolution | Whatever the user takes - sync waits |

The first sync of a new project is the slow one. Steady-state syncs after that are dominated by network latency, not bandwidth.

## What happens during a sync, step by step

1. Client connects to studio server, authenticates.
2. Client sends its **last known sync watermark**.
3. Server returns **metadata changes since that watermark**.
4. Client applies those changes locally in a transaction. Conflicts surface to the user; resolved before continuing.
5. Client computes which **chunks it needs to upload** (new local checkpoints) and **needs to download** (newly-visible content from the server).
6. Client uploads needed chunks (skipping any the server already has, by hash).
7. Client downloads needed chunks (verifies each by hash).
8. Client updates local sync watermark.
9. Done.
