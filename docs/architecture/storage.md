# Storage & Versioning

Clustta stores project structure and history in a `.clst` SQLite database. File content is split into chunks that can live in the archive, on the studio server's filesystem, or - when Object Storage becomes available - in an object store.

## The `.clst` archive

A project archive is a SQLite database named `<project-name>.clst`. It always stores:

- Collections, assets, tags, workflows, and permissions
- Checkpoints and sync state
- The references needed to rebuild every checkpoint

It can also store the compressed file chunks themselves. Personal projects keep their file content in the local archive. Connected projects sync content with the studio server and normally retain downloaded chunks as a local cache.

## Server storage modes

Each studio project has a server-side storage mode:

| Mode | Project `.clst` | File chunks | Availability |
|------|-----------------|-------------|--------------|
| **Compact** | Metadata and chunks | Embedded in the archive | Available |
| **Deflated** | Metadata and chunk references | Configured studio storage directory | Available on configured Dedicated studios |
| **Object Storage** | Metadata and chunk references | S3-compatible object storage | Coming soon |

**Compact** is the default and the simplest place to start. It keeps each server project self-contained in its `.clst` archive. Legacy projects without storage metadata also use this mode.

**Deflated** keeps the project database in the studio's projects directory and stores its blobs separately in the configured storage directory. Choose it when you want a smaller `.clst` database or need to place large file data on another disk or volume. It is available only when the Dedicated studio has a storage directory configured.

**Object Storage** is the third mode and is coming soon. It will keep project metadata in `.clst` while placing blobs in S3-compatible storage. For now, it cannot be selected or used for conversion.

When creating a project in a supported Dedicated studio, choose **Compact** or **Deflated** in the storage step. Compact remains selected by default.

### Convert an existing project

Studio administrators can open **Studio Settings > Project Storage** to see each project's current mode and convert between Compact and Deflated.

Before starting a conversion:

- Make sure the destination has enough free disk space.
- Tell collaborators that the project will be unavailable until conversion finishes.
- Type the project name when prompted to confirm the operation.

The client shows live conversion progress. If the Studio server restarts during a conversion, it recovers the recorded conversion state and continues or safely finalizes the operation. Object Storage is not yet a conversion target.

## Metadata-only mode

Metadata-only mode is available only for remote projects that can sync with a studio server. It keeps project details and checkpoint history in the local `.clst` archive but does not retain synced file chunks there. After an upload or download completes, Clustta removes synced chunks from the archive and reclaims space when needed.

Use metadata-only mode when local disk space matters more than repeated download speed. File content remains available from the studio server, but Clustta may need to download it again the next time it is opened or restored. This uses less local storage and more network data over time.

You can enable it in **Settings > Advanced > Metadata only**. You will not see this option for local-only Personal projects because they have no remote server copy to fetch from.

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

Client storage preferences and server storage modes are separate settings:

| Project setup | Local `.clst` archive | Studio server |
|---------------|-----------------------|---------------|
| **Personal** | Metadata and file chunks | No server copy |
| **Connected, normal client storage** | Metadata and cached file chunks | Canonical chunks in the project's selected server storage mode |
| **Connected, metadata only** | Metadata; synced chunks are discarded after transfer | Canonical chunks in the project's selected server storage mode |

For Compact projects, a complete server backup includes the `.clst` archive. For Deflated projects, both the `.clst` archive and its external blob storage are required.
