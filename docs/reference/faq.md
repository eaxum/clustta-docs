# Frequently Asked Questions

## What is Clustta?

Clustta is open-source version control, collaboration, and asset management built specifically for creative work — animation, design, illustration, video, 3D, game art. It combines the discipline of real version control (Git-style) with the ergonomics of consumer file tools, on a storage engine designed for large binary files.

## Who is Clustta for?

- **Solo creatives** who want versioning, recovery, and organization without setting up a server.
- **Small studios** that want collaboration, status tracking and sync without paying enterprise PLM prices.
- **Larger studios** that want a self-hostable, open-source alternative to proprietary asset managers — with the option to extend it themselves.
- **Anyone** building creative work who has hit the limits of "Final_v23_REAL.psd" and Dropbox conflicts.

## What software does Clustta work with?

Anything. Clustta is file-format agnostic. It manages files on disk; your DCC tool reads and writes those files normally. We've tested with Blender, Photoshop, Illustrator, Maya, Cinema 4D, Houdini, Substance, Krita, ZBrush, After Effects, Unreal, Unity, Godot — and it works with anything else that saves to disk.

## Does Clustta auto-save my files?

No. You save in your DCC tool exactly as you always have. Clustta watches for changes and lets you create **checkpoints** when you've reached a point worth preserving. Auto-save in your DCC remains independent.

## Does Clustta auto-sync to the cloud?

No, and intentionally so. Sync is **manual** — you press Sync (or `Ctrl+S`) when you're ready. Auto-sync of binary creative files is a recipe for corruption and overwrites. We don't ship that footgun.

## Do I need an internet connection?

No. Clustta is fully functional offline. You only need a connection when:

- Initially signing in
- Syncing changes to/from a studio server
- Sharing or downloading via a share link

For Personal mode, you don't need a connection at all.

## What's a "checkpoint"?

A saved snapshot of an asset at a point in time, with a description, status, optional preview, author and timestamp. Like a Git commit, but for one file at a time and with metadata that fits creative review workflows. Storage is content-addressed and chunked so checkpoints cost almost nothing on disk.

## How is this different from Git LFS?

Git LFS bolts large-file support onto Git, but you still get Git's UX (branches, merges, terminal commands), Git's hash-based dedup at the file level (not chunk level), and partial-clone limitations. Clustta is built from scratch around binary creative assets:

- Chunk-level dedup (not file-level)
- No branches, no merge conflicts on binaries
- GUI-first
- Selective per-asset checkout, no full-history clone needed
- Built-in asset management (collections, types, tags, dependencies, workflows)

## How is this different from Perforce / SVN?

- **Open source and free** under AGPL v3.
- **Built for artists**, not engineers.
- **Self-hostable in minutes** with one Docker command.
- **Local-first** — full offline support, syncs when you choose.
- **Single-file projects** that are trivial to back up and archive.

Perforce is powerful but heavy and expensive. SVN is free but feels its age. Clustta sits between with a modern UX and a lighter operational footprint.

## How is this different from Dropbox / Google Drive / OneDrive?

Those are file *sync* tools. They don't version. They auto-sync (which corrupts open project files). They don't track production status, assignments, or dependencies. Clustta is designed around the realities of creative production where Dropbox-style sync actively makes things worse.

## How does it handle large files?

Files are split into chunks via FastCDC (content-defined chunking), each chunk is Zstandard-compressed and SHA-256 hashed. Only changed chunks are stored or transferred between versions, and chunks are deduplicated across files, checkpoints, and collaborators. A 2 GB scene with a small edit might add only a few MB to the project.

## Is my work private?

Yes:

- **Personal projects** never leave your machine.
- **Self-hosted studios** keep everything on infrastructure you control.
- **Cloud studios** store metadata and chunked content in your studio's storage, not visible to other studios. Clustta employees don't routinely access customer data.

The AI agent feature is opt-in and can be configured to use **Ollama (fully local)** so no project metadata leaves your machine.

See [Architecture / Security](../architecture/security.md) for details.

## Can I work with people who don't have Clustta?

Yes — use **share links** to send specific checkpoints to anyone, no Clustta account required. They get a download URL; you can set an expiry and revoke whenever. Good for client reviews, vendor handoffs, and one-off file sends.

## Can I self-host?

Yes. The studio server is open source and ships as a Docker image. The [Self-Hosting guide](../getting-started/self-hosting.md) walks you through a one-line install, a manual Docker setup, and a TLS-enabled production deployment with Traefik.

## What does it cost?

- **Personal mode** — Free, forever.
- **Self-hosted** — Free (you pay your own infrastructure costs).
- **Cloud studios** — Tiered plans on [clustta.com](https://clustta.com).

Open source means you're never locked in to the cloud product.

## Does Clustta use AI?

Optionally. Clustta includes a built-in AI agent that can answer questions about your project structure, statuses, and assignments. It's **bring-your-own-key** and supports OpenAI, Anthropic, Gemini, Groq, and Ollama (local). The agent is **read-only** — it doesn't modify your project. See [AI Agent](../features/ai-agent.md).

## Does Clustta train on my files?

No. We don't train models on customer data. The optional AI agent runs through your chosen provider with your own API key — Clustta isn't a middleman that captures or stores prompts. With Ollama you can keep everything fully local.

## How do I move from another tool?

For now, the recommended path is:

1. Create a new Clustta project.
2. Import your existing files into the working folder.
3. Start checkpointing.

There aren't yet first-party migration tools from Perforce, SVN, or Git LFS, but for most studios the simplest move is "start fresh on the next production." Past history can be archived in its old system or imported flat.

## Where do I report bugs?

GitHub:

- Client: [github.com/eaxum/clustta-client/issues](https://github.com/eaxum/clustta-client/issues)
- Studio server: [github.com/eaxum/clustta-studio/issues](https://github.com/eaxum/clustta-studio/issues)

For security issues, see [Security / Reporting](../architecture/security.md#reporting-security-issues).

## How do I get help?

- [Discord community](https://discord.gg/NuR4uAuTZd)
- GitHub Discussions on the relevant repo
- Email **support@clustta.com** for paid-tier support
