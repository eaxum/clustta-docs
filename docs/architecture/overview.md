# Architecture Overview

A high-level look at how Clustta is built. Useful if you're evaluating it for a studio, planning a self-host deployment, or considering contributing.

## The three components

Clustta is split across three repositories, each with a specific job:

| Component | Repo | Role |
|-----------|------|------|
| **Desktop client** | [clustta-client](https://github.com/eaxum/clustta-client) | What artists install. Runs locally on Windows/macOS/Linux. |
| **Studio server** | [clustta-studio](https://github.com/eaxum/clustta-studio) | Per-studio team server. Coordinates collaboration, project sync, studio access. Self-hosted or Cloud. |
| **Global server** | [clustta-server](https://github.com/eaxum/clustta-server) | Cloud-hosted by Eaxum. Handles identity, account management, billing, invitations, share links. |

A self-hosted studio in **Private** mode runs only the studio server — no dependency on the global server, fully air-gapped.

```
┌────────────┐         ┌─────────────────┐         ┌──────────────────┐
│  Desktop   │ ──────► │  Studio server  │ ──────► │  Object storage  │
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
- **Storage format:** SQLite per project (`.clst` files)
- **Wire format:** Protocol Buffers for efficient sync
- **Studio bulk transfer:** S3-compatible object storage (Cloudflare R2 in Cloud, configurable for self-host)
- **Server runtime:** Docker

The choice of Go everywhere (client backend + both servers) means a single language across the stack. The choice of Vue + Wails means the same UI runs on Windows, macOS and Linux from one codebase.

## The `.clst` project file

Every Clustta project is a single SQLite database file with the `.clst` extension. It contains:

- **Metadata tables** — collections, assets, checkpoints, tags, types, dependencies, roles, assignments, sync state
- **Chunked binary content** — the actual file data, stored as compressed chunks in a content-addressed table

This single-file design has practical benefits:

- **Trivial to copy / archive / back up** — one file is the entire project
- **Trivial to inspect** — open it in any SQLite browser
- **Atomic writes** — SQLite transactions guarantee consistency
- **Cross-platform** — same file works on Windows, macOS, Linux without conversion
- **Long-lived** — SQLite is ubiquitous and will be readable in 30 years

For Personal mode and Dedicated self-host, the `.clst` file *is* the project. For Cloud studios, chunks may also be stored in object storage (R2) for bandwidth and storage scaling, with the SQLite still serving as the metadata source.

## Content-addressed chunked storage

Files are split into variable-sized chunks using **FastCDC** (content-defined chunking), each chunk is **SHA-256-hashed**, **Zstandard-compressed**, and stored once in the project database (or object storage).

Properties this gets us:

- **Deduplication** — Identical chunks across files, checkpoints, even across collaborators are stored once.
- **Delta transfer** — When syncing, only chunks not already on the destination are sent.
- **Verifiable integrity** — Hash mismatches are detected on read.
- **Efficient versioning** — A small edit to a 2 GB file might add only a few new chunks; the rest are referenced.

See [Storage & Versioning](./storage.md) for the full picture.

## Sync model

Sync is **explicit, selective, and pull-based**:

- Nothing leaves your machine until you trigger a sync.
- You only download chunks for assets assigned to you (or in Library collections).
- Conflicts are surfaced to the user, never auto-resolved.

Metadata syncs in full so everyone sees the same project structure. Chunk transfer is selective. See [Sync Model](./sync.md) for details.

## Authentication

Two modes, depending on studio configuration:

- **Cloud-connected** — Users sign in with their Clustta account. The global server issues a token; the studio server validates it via the global server.
- **Private** — Users sign in against a local user database on the studio server. No outbound calls.

The desktop client supports holding sessions for multiple studios simultaneously and switches between them via the studio dropdown.

## Where data lives

| Data | Location | Notes |
|------|----------|-------|
| Working files | User's chosen working folder | Regular files on disk |
| Project metadata + chunks | `~/.clustta` (per studio) `.clst` files | Per-project SQLite |
| Studio server projects | `./projects/` on the server host | One `.clst` per project |
| Cloud studio chunks | Cloudflare R2 buckets | Presigned-URL access only |
| User account & identity (cloud) | Clustta global server database | Encrypted at rest |
| Local sessions | OS keyring (Keychain / Credential Manager / Secret Service) | OS-level secret storage |

Self-hosted in private mode: nothing leaves your server.

## Where to dive deeper

- [Storage & Versioning](./storage.md) — chunking, dedup, the `.clst` format
- [Sync Model](./sync.md) — push/pull, conflict resolution
- [Security](./security.md) — auth, transport, IP protection
