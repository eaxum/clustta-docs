# Sync Model

How project state moves between local clients and the studio server. Designed around three principles: **local-first, selective, and conflict-aware**.

## What sync is

A sync operation reconciles the **local project database** with the **server project database**, then transfers the chunk data needed for assets the local user is allowed to access.

Two halves can run during a full sync:

1. **Metadata reconciliation** - collections, assets, checkpoints, statuses, assignments, dependencies. Bi-directional.
2. **Chunk transfer** - actual binary content. Selective by user.

Metadata is small compared with asset files. The current full sync can replace the local metadata set, while the experimental background updater merges changed records. Chunk transfer is the part that takes real time on large projects.

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

## How clients receive project changes

Clustta currently has two polling-based methods for bringing server changes into an open project. The client checks the project's sync token about every five seconds while it is online. When the server token changes, the selected method updates the local project database.

### Legacy project refresh

The legacy method only runs when the local project has no unsynced changes. It fetches the server project state, drops the local project tables, and rewrites them from that state. This provides a clean snapshot, but it is too destructive to run while the client is dirty.

In practical terms:

- A clean client can refresh automatically after the polling loop detects a new sync token.
- A dirty client waits, preserving its local work until the user performs a manual sync.
- The refresh updates metadata but does not automatically download asset chunks.

This method will be deprecated.

### Background project updates

The newer method is still experimental. It runs silently after the polling loop detects a new sync token and merges server changes into the local database without dropping tables.

Only records accepted as newer are written locally. Local unsynced rows with newer modification times are preserved, so the update can run while the project is dirty. It is metadata-only and does not download file chunks or push local edits to the server.

This background merge is the direction Clustta is moving toward. Polling is an intermediate transport. A future WebSocket connection is planned to notify clients as soon as project state changes, after which the same selective merge can retrieve and apply the changed data.

## Local-first files, manual full sync

File and checkpoint transfer remains user-controlled. A user presses Sync or uses `Ctrl+S` to reconcile local edits, transfer chunks, and download file content selected by the project's sync rules. Reasons include:

- A teammate's half-broken intermediate save shouldn't auto-replace what you have open.
- A multi-GB upload shouldn't kick off mid-render.
- You should always know when your work is leaving your machine.

Background metadata updates do not silently replace an artist's working file.

## Metadata that updates immediately

Some collaboration metadata uses a remote-first path rather than waiting for the project polling cycle. When a network connection is available, Clustta sends these changes to the server immediately and applies the server-confirmed result to the local database:

- Asset status changes.
- Asset assignment and unassignment.
- Whether an asset is treated as a task.
- Collection sharing changes.
- Collection assignment and unassignment.

These operations update immediately for the person making the change. Other connected clients receive the result through their project update path, which is currently polling-based.

If the server cannot be reached, Clustta applies the change to the local project database and marks it as requiring sync. The change remains available locally, but it does not reach collaborators until a network connection returns and the user runs a manual sync.

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

Metadata is exchanged in **Protocol Buffers** for efficiency. Chunk transfer uses **HTTP(S)** with the chunk hash as the lookup key. For Dedicated studios, the server reads or writes those chunks from the project's selected storage mode:

- **Compact** - blobs embedded in the server's `.clst` archive.
- **Deflated** - blobs in the Dedicated server's configured storage directory.
- **Object Storage** - S3-compatible blob storage, with direct transfer through presigned URLs where supported. This third selectable mode is coming soon.

ClusttaCloud™ already uses managed Cloudflare R2 internally and can issue presigned URLs so clients transfer chunks without proxying their contents through the studio server. The coming Object Storage mode will bring that storage model to the selectable project modes. Direct access matters at scale because storage bandwidth can scale independently of studio server CPU.

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
2. Client sends its unsynced local metadata and checkpoint information.
3. Server reconciles those changes and returns the current project metadata and sync token.
4. Client applies the server state locally in a transaction. Conflicts surface to the user and are resolved before continuing.
5. Client computes which **chunks it needs to upload** for new local checkpoints and **needs to download** for newly visible content.
6. Client uploads needed chunks, skipping any the server already has by hash.
7. Client downloads needed chunks and verifies each by hash.
8. Client stores the latest sync token.
9. Done.
