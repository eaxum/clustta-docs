# Storage & Versioning

How Clustta stores files, how versioning actually works under the hood, and why a 2 GB scene can checkpoint in seconds and use a few MB of disk.

## The `.clst` file

A Clustta project is a single file on disk: `<project-name>.clst`. It's a regular SQLite database with the schema Clustta needs.

It contains:

- **Structural tables** — collections, assets, types, tags, dependencies, workflows, templates
- **Versioning tables** — checkpoints, file states, sync metadata
- **People tables** — users, roles, permissions, assignments
- **Content table** — chunked binary data (in Personal mode and self-host)

Because it's just SQLite, you can:

- `cp` it to back up the entire project
- Open it in any SQLite browser to inspect
- Mount it on any platform without conversion
- Trust it to be readable in 30 years

## Content-defined chunking (FastCDC)

When you create a checkpoint, Clustta needs to store the asset's contents. Instead of treating the file as one big blob:

1. The file is **streamed through FastCDC**, which splits it into variable-sized chunks based on its content. Average chunk size is configurable; defaults are tuned for typical creative file sizes.
2. Each chunk gets a **SHA-256 hash**. The hash is the chunk's identity.
3. Each chunk is **Zstandard-compressed**.
4. The compressed chunk is stored in the database, keyed by hash. **If a chunk with the same hash already exists, it's not stored again.**

Then a checkpoint record is created that references the ordered list of chunk hashes that reconstruct the file.

### Why content-defined, not fixed-size?

Fixed-size chunking breaks down on creative files. Insert one byte near the start of a Photoshop file and every fixed-size chunk after that point shifts — every chunk becomes "new" and dedup gives up.

FastCDC picks chunk boundaries based on content patterns. Insert a byte near the start and most subsequent chunks still align — only a few chunks change. The other 99% of the file dedups perfectly.

This is what makes "checkpoint a 2 GB scene after a 100 KB tweak" actually cost ~100 KB.

## Deduplication

Hash-keyed storage gives us free dedup at multiple levels:

- **Within a file across versions** — Most of v2 is the same chunks as v1.
- **Across files in the same project** — Two textures sharing a header? Same chunks, stored once.
- **Across collaborators (during sync)** — When syncing, the destination tells the source which chunk hashes it already has. Only the rest are transferred.

A typical animation production with hundreds of versioned scenes ends up with chunk-level dedup ratios in the 4× to 20× range — many fewer bytes on disk than the naïve sum of file sizes.

## Compression

Each chunk is Zstandard-compressed at a level chosen for the file format. Already-compressed formats (`.png`, `.jpg`, `.mp4`, `.zip`) compress poorly and Zstd is fast enough that the cost is negligible. Highly compressible formats (`.psd`, `.blend`, raw text) compress significantly.

## File reconstruction

To open a historical checkpoint, Clustta:

1. Looks up the checkpoint record.
2. Reads the ordered chunk hashes.
3. Pulls each chunk (from local SQLite, or from object storage if not local).
4. Decompresses each chunk.
5. Concatenates them into a temp file (or directly into the working file on revert).
6. Verifies the assembled file's hash against the checkpoint's recorded hash.

The verify step means corruption is detected, not silently propagated.

## Versioning isn't branching

Clustta versioning is **linear per asset**. Each asset has a single timeline of checkpoints, in chronological order. There are no branches.

This is intentional:

- **Single ownership** (assignment soft lock) means concurrent edits can't happen, so branches aren't needed for conflict avoidance.
- **No merge logic for binary files** is required, because there are no branches to merge.
- **Linear history is what artists already expect** — "v1, v2, v3, ..." with comments.

For experimental work, the right pattern is:

1. Checkpoint the current state (mark "before experiment").
2. Try the experiment.
3. If it works, checkpoint with a comment.
4. If it doesn't, revert to "before experiment" — instant rollback.

## What about huge files?

Streaming chunking and compression mean Clustta handles large files well in steady state. A few practical limits:

- **Hashing pass** is single-threaded but fast. A 5 GB file hashes in tens of seconds on modern hardware.
- **SQLite write transactions** for checkpointing scale to projects with millions of chunks. We've stress-tested into the multi-million chunk range without issue.
- **Sync bandwidth** is the typical bottleneck for very large fresh projects. Once initial pull is done, deltas are small.

## Garbage collection

When you permanently delete a checkpoint or asset, the **chunks it referenced** become candidates for removal. A chunk is only actually deleted when **no remaining checkpoint** anywhere in the project references it.

This GC runs:

- On manual purge of trash
- On project compaction (manual or scheduled)
- On sync, when the server is the canonical owner

Until GC runs, "deleted" content still occupies disk. This is intentional — recovery from accidental deletion is more valuable than immediate space reclamation.

## Where chunks actually live

Depending on mode:

| Mode | Local chunks | Server chunks |
|------|--------------|---------------|
| **Personal** | In the local `.clst` | — (no server) |
| **Self-hosted, default** | In the local `.clst` | In the server's `.clst` |
| **Cloud** | In the local `.clst` (cached) | In Cloudflare R2 (canonical) + server-side metadata index |

In all cases the local client has chunks for assets it's actively using; the rest can be pulled on demand.
