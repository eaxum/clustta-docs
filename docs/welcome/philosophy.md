# Philosophy

Clustta is shaped by years of running an [animation studio](https://eaxum.com). These principles guide our decisions on its design.

## 1. Artist-first, always

Most version control was designed by engineers, for engineers. Branches, merges, terminal commands, diff-aware merging - these make sense for code. They don't make sense for a 4 GB Maya scene or a layered 600 MB PSD.

Clustta starts from the other end. The interface is built around how artists already think:

- **Files and folders, not commits and refs.** Assets and Collections map directly to what's already on disk.
- **Save, version, share.** No staging area, no rebasing, no force-pushes.
- **Single ownership.** Only one person edits an asset at a time. Conflicts are prevented at the workflow level rather than resolved after the fact.
- **Visual everywhere.** Thumbnails, previews, statuses, kanban boards. Your project should look like your project, not a tree of hashes.

If your team has ever lost a day to a botched merge or a corrupted shared drive, you'll know why this matters.

## 2. Creative files are first-class citizens

Code is text. Creative work isn't. Clustta is built around the realities of binary creative assets:

- **Content-addressed chunking** (FastCDC + Zstandard) means a small tweak to a 2 GB file uploads in seconds, not hours. Only the changed chunks move.
- **No partial-clone limitations.** Pull a single asset without dragging down the whole project history.
- **Dependencies are explicit.** Assets can declare what they depend on (textures, rigs, references), and assignees automatically receive the full graph.
- **Soft locks via assignment.** When work is assigned to you, it's yours to checkpoint. No race conditions, no silent overwrites.

This isn't Git with LFS bolted on. It's a storage and sync model designed for the way creative production actually works.

## 3. Local-first, distributed, private

Your work should live on your machine first.

- **Projects are local.** A `.clst` SQLite file on your disk contains everything: metadata, history, chunked binaries. You can open it offline, copy it to a USB stick, archive it for a decade.
- **Sync is user-triggered.** Clustta never silently uploads or overwrites your work. You decide when to push and pull.
- **Self-hosting is first-class.** The studio server is the same Docker image we run for ClusttaCloud™. Run it on your own hardware, in an air-gapped facility, or on a $10/month VPS.
- **The server can go away.** Even with no studio server reachable, every collaborator still has a complete working copy of every project they've cloned.

We use the cloud where it earns its keep, and put nothing there that doesn't have to be there.

## 4. Open source, no lock-in

Clustta is released under the **AGPL v3**. Both the [client](https://github.com/eaxum/clustta-client) and the [studio server](https://github.com/eaxum/clustta-studio) are public.

We build Clustta because we've seen firsthand what open source can do for creative work. [Eaxum](https://eaxum.com) was built on top of [Blender](https://www.blender.org) - an open-source 3D toolset that broke down the barrier of expensive licensing and put a world-class pipeline in the hands of anyone with a laptop. Clustta exists to do the same thing for the *coordination* side of creative work: version control, collaboration and asset management that any artist or studio can pick up, run and own.

What that means in practice:

- **You can audit it.** Studios handling client work or IP-sensitive projects can read every line of code that touches their data.
- **You can fork it.** If we disappear tomorrow, your pipeline keeps running.
- **You can extend it.** The DCC bridge exposes project data over a local REST API, so you can build your own integrations without hacking the app internals.
- **You can self-host it.** We make money from managed hosting and team features, not by holding your projects hostage.

We chose AGPL because we want changes that ship to studios to flow back to the community. Improvements one studio makes benefit everyone.

## 5. Pragmatic over perfect

We've shipped Clustta on three different stacks (Electron, Tauri, now Wails) and rewritten the storage engine more than once. Every iteration came back to the same question: *what actually helps artists ship work?*

In practice:

- **No over-engineering.** We use SQLite as the project format because it's the most-deployed database in the world and will outlive most of us.
- **Boring tech where it counts.** Go on the backend, Vue on the frontend, Docker for the server, S3-compatible object storage for bulk transfers. Nothing exotic.
- **Features earn their place.** If something doesn't survive contact with a real production, it gets removed.

---

## Summary

Clustta is version control built for creative work: **artist-first, local-first, open-source, and made for big binary files.**
