# Storage & Versioning

Clustta stores project structure, history, and file content in a `.clst` archive. Connected projects can also keep file content on the studio server and download it when needed.

## The `.clst` archive

A project archive is a SQLite database named `<project-name>.clst`. It stores:

- Collections, assets, tags, workflows, and permissions
- Checkpoints and sync state
- File chunks kept by the local client

Personal projects keep their file content in the local archive. Connected projects sync content with the studio server and normally retain downloaded chunks as a local cache.

## Metadata-only mode

Metadata-only mode keeps project details and checkpoint history in the local `.clst` archive but does not retain synced file chunks there. After an upload or download completes, Clustta removes synced chunks from the archive and reclaims space when needed.

Use metadata-only mode when local disk space matters more than repeated download speed. File content remains available from the studio server, but Clustta may need to download it again the next time it is opened or restored. This uses less local storage and more network data over time.

You can enable it in **Settings → Advanced → Metadata only**. It applies to connected projects; a Personal project has no server copy to fetch from.

## How file storage works

When you create a checkpoint, Clustta:

1. Splits the file into content-defined chunks with FastCDC.
2. Gives each chunk a SHA-256 identifier.
3. Compresses and stores chunks that are not already available.
4. Records the ordered chunk list needed to rebuild the file.

Content-defined chunking lets unchanged parts of a file keep the same identifiers after an edit. As a result, new checkpoints usually store and transfer only the changed chunks. Identical chunks can also be reused across files and collaborators in the same project.

## Restoring a checkpoint

To restore a checkpoint, Clustta reads its chunk list, gets any missing chunks from the studio server, decompresses them, and rebuilds the file in order. It verifies the completed file so damaged or incomplete content is not silently used.

In metadata-only mode, remote chunks are used for the restore but are not kept as a long-term cache in the local archive.

## Version history

Each asset has one chronological checkpoint history. Clustta does not create branches or merge binary files.

For an experiment, checkpoint the current state first. Keep the result as a new checkpoint or restore the earlier one if the experiment does not work.

## Removing unused content

Deleting a checkpoint or asset does not immediately delete its chunks. A chunk can be removed only after no remaining checkpoint references it. Clustta cleans up unreferenced content when trash is purged, the project is compacted, or the server performs cleanup during sync.

## Where content lives

| Mode | Local `.clst` archive | Server |
|------|-----------------------|--------|
| **Personal** | Metadata and file chunks | No server copy |
| **Connected, standard storage** | Metadata and cached file chunks | Canonical synced chunks |
| **Connected, metadata only** | Metadata; synced chunks are discarded after transfer | Canonical synced chunks |
