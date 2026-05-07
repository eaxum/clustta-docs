# Philosophy

Clustta is shaped by years of running [Eaxum](https://eaxum.com), an animation studio, and watching the same problems break creative pipelines over and over: lost files, version chaos, painful handoffs, tools that fight the artist.

These principles guide every decision we make.

## 1. Artist-first, always

Most version control was designed by engineers, for engineers. Branches, merges, terminal commands, diff-aware merging — these concepts make sense for code that's text. They make zero sense for a 4 GB Maya scene or a layered 600 MB PSD.

Clustta starts from the opposite end. The interface is built around how artists already think:

- **Files and folders, not commits and refs.** "Assets" and "Collections" map cleanly to what you already have on disk.
- **Save, version, share — in that order.** No staging area, no rebasing, no force-pushes.
- **Single ownership.** Only one person edits an asset at a time. Conflicts are prevented at the workflow level, not "resolved" after the fact.
- **Visual everywhere.** Thumbnails, previews, statuses, kanban boards — your project should look like your project, not a tree of hashes.

If your team has ever lost a day to a botched merge or a corrupted shared drive, you understand why this matters.

## 2. Creative files are first-class citizens

Code is text. Creative work isn't. Clustta is built from the ground up around the realities of binary creative assets:

- **Content-addressed chunking** (FastCDC + Zstandard) means a 30-second tweak to a 2 GB file uploads in seconds, not hours. Only the changed chunks move.
- **No partial-clone limitations.** Pull a single asset without dragging down the entire project history.
- **Dependencies are explicit.** Assets can declare what they depend on (textures, rigs, references), and assignees automatically receive the full graph.
- **Soft locks via assignment.** When work is assigned to you, it's yours to checkpoint. No race conditions, no silent overwrites.

This isn't Git with LFS bolted on. It's a storage and sync model designed for the way creative production actually works.

## 3. Local-first, distributed, private

Your work should live on your machine first.

- **Projects are local.** A `.clst` SQLite file on your disk contains everything: metadata, history, chunked binaries. You can open it offline, copy it to a USB stick, archive it for ten years.
- **Sync is user-triggered.** Clustta never silently uploads or overwrites your work. You decide when to push and pull.
- **Self-hosting is first-class.** The studio server is the same Docker image we ship for Clustta Cloud. Run it on your own hardware, in an air-gapped facility, or on a $10/month VPS. Your data, your infrastructure.
- **The server can go away.** Even with no studio server reachable, every collaborator still has a complete, working copy of every project they've cloned.

We use the cloud where it earns its keep, and we put nothing there that doesn't have to be there.

## 4. Open source, no lock-in

Clustta is released under the **AGPL v3**, and both the [client](https://github.com/eaxum/clustta-client) and the [studio server](https://github.com/eaxum/clustta-studio) are public.

This is intentional:

- **You can audit it.** Studios handling client work, IP-sensitive projects or contractual assets can read every line that touches their data.
- **You can fork it.** If we get hit by a bus, your pipeline keeps running.
- **You can extend it.** The DCC bridge exposes project data over a local REST API so you can build your own integrations without hacking the app internals.
- **You can self-host it forever.** We make money from managed hosting and team features, not by holding your projects hostage.

We chose AGPL specifically because we want changes that ship to studios to flow back to the community. Improvements made by one studio benefit everyone.

## 5. Pragmatic over perfect

We've shipped Clustta in three different stacks (Electron, Tauri, now Wails) and rebuilt the storage engine multiple times. Every iteration was driven by the same question: *what actually helps artists ship work?*

That means:

- **No over-engineering.** We use SQLite as the project format because SQLite is the most-deployed database in the world and will outlive most of us.
- **Boring tech where it counts.** Go for the backend, Vue for the frontend, Docker for the server, S3-compatible object storage for cloud bulk transfers. Nothing exotic.
- **Features earn their place.** If a feature doesn't survive contact with a real production, it gets removed.

## 6. The studio is the unit of collaboration

Solo work and team work are different problems, and Clustta treats them differently.

- **Personal mode** is for individuals. Fully offline, no server, no overhead. You get versioning, organization and recovery — without setting anything up.
- **Studio mode** is for teams. Roles, permissions, assignment workflows, shared roles, billing, sharing links. You scale up to it when you need it.

You can move a project between modes. You're never trapped in either.

---

## In short

Clustta is what happens when you stop trying to retrofit developer tools onto creative workflows and instead build version control the way it should have been built for artists from the start: **artist-first, local-first, open-source, and engineered for the messy reality of binary creative work.**
