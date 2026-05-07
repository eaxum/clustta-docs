# Introduction

This is Clustta - open-source version control, collaboration and asset management built for creative work.

Clustta is for the people who make things: animators, designers, illustrators, video editors, 3D artists, game developers and the studios they work in. It gives teams a single place to organize their projects, version their files, hand work off to collaborators, and keep production moving.

<!-- TODO: hero screenshot of the desktop client (browser view of a project) -->

## What is Clustta?

Think of Clustta as **GitHub for creative teams** - but with an interface designed for artists and a storage engine built for large binary files.

At its core, Clustta does four things really well:

- **Versions your files** - Save as many checkpoints as you want without duplicating files. Roll back instantly when something breaks.
- **Organizes your project** - Collections, assets, tags, types, dependencies, workflows. Structure that mirrors how creative production actually works.
- **Coordinates your team** - Assign work, track status, share approved files, resolve conflicts when two people touch the same thing.
- **Keeps you in control** - Local-first by default. Sync when you choose. Self-host the server. Audit the source. No vendor lock-in.

## Why it exists

Existing tools force a bad trade-off:

| Tool | Problem |
|------|---------|
| **Git / GitHub** | Inefficient on large binary files. No partial checkout. UX assumes engineers. |
| **Perforce / SVN** | Powerful, but heavyweight, expensive and not artist-friendly. |
| **Google Drive / Dropbox / OneDrive** | Auto-sync corrupts open project files. No real version control. No production tracking. |
| **WeTransfer / email** | Fragmented "final_final_v3.psd" chaos. No history, no recovery. |
| **Finder / Explorer** | Just folders. No versioning, no collaboration, no metadata. |

Clustta fills this gap by combining the **discipline of real version control** with the **ergonomics of consumer file tools**, on a foundation built specifically for the way creative teams actually work.

## How it works (in 30 seconds)

1. You install the desktop app and create a **project**. Clustta gives you a regular folder on disk to work out of - your DCC tools never need to know Clustta exists.
2. As you create, edit and save files, Clustta detects changes and lets you create **checkpoints** - lightweight snapshots that record what changed, by whom, and when.
3. Files are split into **chunks** (content-defined chunking + Zstandard compression), so only the changed parts of a file are stored or transferred. Even multi-gigabyte assets version efficiently.
4. When you're ready, you **sync** to a studio server. Collaborators pull only the assets assigned to them. Conflicts are surfaced explicitly, never auto-merged silently.
5. Studios run their own server, use a managed ClusttaCloud™ instance, or work in **Personal** mode - solo or with optional Cloud sync between your own machines.

## Current state

Clustta is in active development and used in production at [Eaxum](https://eaxum.com), the animation studio behind it.

**What works today:**

- Cross-platform desktop client (Windows, macOS, Linux) via the [Microsoft Store](https://apps.microsoft.com/detail/9PNRGHGP3LGX), [Mac App Store](https://apps.apple.com/us/app/clustta/id6748349288) and [direct download](https://clustta.com/download)
- Personal and Studio modes (with optional ClusttaCloud™ sync for personal projects)
- Checkpointing, chunked storage, selective sync, conflict resolution
- Roles & permissions, dependencies, workflows, asset templates
- Self-hosted studio server (Docker) and managed ClusttaCloud™
- Kitsu integration, DCC bridge, AI assistant
- Shareable download links (ClusttaCloud™ only)

**What's coming:**

- Customizable status names and colors
- Expanded DCC plugins (Blender, Maya, Unreal first-class)
- Public REST API & webhook system
- Audit log UI

## Platform support

| Platform | Status |
|----------|--------|
| Windows 10/11 | ✅ Stable |
| macOS (Intel & Apple Silicon) | ✅ Stable |
| Linux (Ubuntu/Debian-based, also on [Flathub](https://flathub.org)) | ✅ Stable |
| Studio Server | ✅ Docker (any Linux host) |
