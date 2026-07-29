# Architecture Overview

A high-level look at how Clustta is built. Useful if you're evaluating it for a studio, planning a self-host deployment, or considering contributing.

## The three components

Clustta is split across three repositories, each with a specific job:

| Component | Repo | Role |
|-----------|------|------|
| **Desktop client** | [clustta-client](https://github.com/eaxum/clustta-client) | What artists install. Runs locally on Windows/macOS/Linux. |
| **Studio server** | [clustta-studio](https://github.com/eaxum/clustta-studio) | Per-studio team server. Coordinates collaboration, project sync, studio access. Self-hosted or Cloud. |
| **Global server** | [clustta-server](https://github.com/eaxum/clustta-server) | Cloud-hosted by Eaxum. Handles identity, account management, billing, invitations, share links. |

A self-hosted studio in **Private** mode runs only the studio server - no dependency on the global server, fully air-gapped.

```
┌────────────┐         ┌─────────────────┐         ┌──────────────────┐
│  Desktop   │ ------> │  Studio server  │ ------> │  Object storage  │
│  client    │  sync   │   (per studio)  │  R2/S3  │   (chunks)       │
└────────────┘         └─────────────────┘         └──────────────────┘
       │                       │
       │                       │ (cloud-connected mode only)
       ▼                       ▼
┌─────────────────────────────────────────────────┐
│       Clustta global server (cloud)             │
│  identity · billing · invites · share links     │
└─────────────────────────────────────────────────┘
```

## Tech stack

- **Backend (all three components):** Go 1.25+
- **Desktop frontend:** Vue 3 + Vite + Pinia, packaged with [Wails v3](https://wails.io)
- **Web dashboard:** Vue 3 + Vite (separate repo)
- **Storage format:** SQLite metadata per project (`.clst` files), with configurable chunk storage
- **Wire format:** Protocol Buffers for efficient sync
- **Cloud bulk transfer:** Managed S3-compatible object storage (Cloudflare R2)
- **Server runtime:** Docker

The choice of Go everywhere (client backend + both servers) means a single language across the stack. The choice of Vue + Wails means the same UI runs on Windows, macOS and Linux from one codebase.

## The `.clst` project file

Every Clustta project has a SQLite database file with the `.clst` extension. It contains:

- **Metadata tables** - collections, assets, checkpoints, tags, types, dependencies, roles, assignments, sync state
- **Chunk references** - the ordered content-addressed records needed to rebuild files
- **Chunked binary content in Compact mode** - the actual file data, stored as compressed chunks in the archive

The Compact single-file design has practical benefits:

- **Trivial to copy / archive / back up** - one file is the entire project
- **Trivial to inspect** - open it in any SQLite browser
- **Atomic writes** - SQLite transactions guarantee consistency
- **Cross-platform** - same file works on Windows, macOS, Linux without conversion
- **Long-lived** - SQLite is ubiquitous and will be readable in 30 years

Personal projects use Compact storage. Dedicated studios can use **Compact** or **Deflated** per project: Compact embeds blobs in `.clst`, while Deflated keeps blobs in a configured server storage directory. **Object Storage** is the third mode and is coming soon; it will keep blobs in S3-compatible storage while SQLite remains the metadata source.

## Content-addressed chunked storage

Files are split into variable-sized chunks using **FastCDC** (content-defined chunking), each chunk is **SHA-256-hashed**, **Zstandard-compressed**, and stored once in the Compact project database or the Deflated server storage directory. S3-compatible Object Storage is coming soon.

Properties this gets us:

- **Deduplication** - Identical chunks across files, checkpoints, even across collaborators are stored once.
- **Delta transfer** - When syncing, only chunks not already on the destination are sent.
- **Verifiable integrity** - Hash mismatches are detected on read.
- **Efficient versioning** - A small edit to a 2 GB file might add only a few new chunks; the rest are referenced.

See [Storage & Versioning](./storage.md) for the full picture.

## Sync model

Sync is **explicit, selective, and pull-based**:

- Nothing leaves your machine until you trigger a sync.
- You only download chunks for assets assigned to you (or in Shared collections).
- Conflicts are surfaced to the user, never auto-resolved.

Metadata syncs in full so everyone sees the same project structure. Chunk transfer is selective. See [Sync Model](./sync.md) for details.

## Authentication

Two modes, depending on studio configuration:

- **Cloud-connected** - Users sign in with their Clustta account. The global server issues a token; the studio server validates it via the global server.
- **Private** - Users sign in against a local user database on the studio server. No outbound calls.

The desktop client supports holding sessions for multiple studios simultaneously and switches between them via the studio dropdown.

## Where data lives

| Data | Location | Notes |
|------|----------|-------|
| Working files | User's chosen working folder | Regular files on disk |
| Project metadata + chunks | `~/.clustta` (per studio) `.clst` files | Per-project SQLite |
| Studio project metadata | Configured projects directory, commonly `./projects/` | One `.clst` per project; includes chunks in Compact mode |
| Dedicated Deflated chunks | Configured storage directory, commonly `./storage/` | Must be backed up with the matching `.clst` files |
| Cloud-managed chunks | Cloudflare R2 | Used internally by ClusttaCloud™ |
| Selectable Object Storage mode | S3-compatible object storage | Coming soon |
| User account & identity (cloud) | Clustta global server database | Encrypted at rest |
| Local sessions | OS keyring (Keychain / Credential Manager / Secret Service) | OS-level secret storage |

Self-hosted in private mode: nothing leaves your server.

## Where to dive deeper

- [Storage & Versioning](./storage.md) - chunking, dedup, the `.clst` format
- [Sync Model](./sync.md) - push/pull, conflict resolution
- [Security](./security.md) - auth, transport, IP protection
