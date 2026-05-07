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

- Add a meaningful **comment** ("blocking pass complete", "fixed obinna's anim").
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

## Reverting

Reverting writes a previous checkpoint's contents back to the working file. Your current working state is *not* lost unless you've already overwritten it without checkpointing first - so as long as you've checkpointed, revert is safe.

A progress dialog shows the operation; large files reconstruct quickly because chunks are local.

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
