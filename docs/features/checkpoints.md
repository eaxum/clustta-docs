# Checkpoints & Versioning

Checkpoints are the heart of Clustta. They're how you preserve every meaningful state of every file in your project, with descriptive history, almost zero storage overhead, and instant recovery.

## What a checkpoint is

A checkpoint is a saved snapshot of an asset at a point in time. Every checkpoint records:

- A **content hash** of the file
- A **comment** describing what changed
- Who made it (author)
- When it was made (timestamp)
- An optional **preview image** (auto-generated or user-supplied)
- A **status** at the time of the checkpoint (Todo / WIP / WFA / Retake / Done)
- The **chunks** that make up the file at that version

Think of it as a smart "Save As v2" that doesn't clutter your folder, costs almost nothing, and includes context.

## Why it's not just "save as v2"

Traditional versioning duplicates the entire file:

```
Project_v1.psd     500 MB
Project_v2.psd     510 MB
Project_v3.psd     530 MB
─────────────────────────
Total:           ~1.54 GB
```

Clustta uses **content-defined chunking**: files are split into variable-sized chunks based on their content, each chunk is hashed and stored once. When you create a checkpoint after small edits, only the changed chunks are added - the rest are referenced.

```
Project.psd  +  Δchunks_1  +  Δchunks_2
─────────────────────────────────────────
Total:                              ~550 MB
```

The savings compound across collaborators because the same chunks shared across the team are also deduplicated when transferred.

## Creating a checkpoint

Three ways:

1. **Click the Modified state** indicator on any modified asset.
2. Use the keyboard shortcut **`Ctrl+Shift+C`** with the asset selected.
3. Right-click the asset → **Create Checkpoint**.

In the dialog:

- Add a meaningful **comment** ("blocking pass complete", "revised character animation"). Leaving it blank generates the next asset version as the comment, starting at `v0001`.
- Optionally change the **status**.
- Optionally attach or capture a **preview image**.
- Optionally toggle **Use image as task cover** so the asset card shows it.
- Optionally toggle **Sync after checkpoint** to push immediately.

Click **Create**.

<!-- TODO: screenshot of Create Checkpoint modal -->

## Browsing history

Select any asset and look at the details pane (right side). You'll see every checkpoint in reverse-chronological order: comment, author, date, preview thumbnail.

Click a checkpoint to expand its actions:

- **Open** - Open that exact version in your default app (a temp file is reconstructed from chunks)
- **Revert** - Replace the working file with this version
- **Delete** - Send this checkpoint to trash (recoverable until purge)

<!-- TODO: screenshot of checkpoint history in details pane -->

Checkpoint tags identify versions for review and dependency selection. Use **Manage checkpoint tags** on a checkpoint to select an existing project tag or create one. A tag such as *approved* identifies at most one checkpoint in each asset's history. Assigning it to another checkpoint moves that asset's tag assignment; it does not create a second approved version.

Checkpoint tags also appear on the asset, making tagged work available through normal tag filters. They require permission to manage dependencies. A dependency can follow a tag as described in [Dependencies](./dependencies.md#choosing-a-dependency-version).

Checkpoints created together share an operation group. Group tag assignment applies the tag to the latest checkpoint for each asset in that group. A checkpoint carrying a tag cannot be trashed, and a tag assignment referenced by a dependency cannot be removed. Update the dependency or move the tag before removing protected history.

## Reverting

Reverting replaces the working file with a previous checkpoint. Create a checkpoint first if you need to preserve your current edits, and handle unsaved changes in your creative application before restoring the file.

A progress dialog shows the operation. Clustta uses local chunks where available and downloads missing content when the project has a remote copy.

## Best practices

- **Checkpoint at meaningful moments.** End of a session, before a risky experiment, after fixing a specific note. Not every two minutes.
- **Write descriptive comments.** "blocking pass + walk cycle pass 1" is far more useful than "wip" three months from now.
- **Set the status** when you checkpoint. It's free and your producers will love it.
- **Use preview images for review checkpoints.** A WFA checkpoint with a render is worth a thousand words to a supervisor.
- **Don't over-purge.** Checkpoints are cheap. Keep them.

## Quick reference

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+C` | Create checkpoint on selected asset |
| Click Modified state | Same as above |
| Click historical checkpoint → Revert | Restore that version |
| Click historical checkpoint → Open | Open temp copy of that version |
