# Ignore Patterns

Not everything in your working folder belongs in version control. Engine-generated cache files, build intermediates, IDE metadata, swap files, OS junk — they pollute history, bloat sync, and add noise. Clustta lets you tell it to **ignore** specific patterns, much like `.gitignore`.

## What gets ignored

When a path matches an ignore pattern, Clustta will:

- Not surface it as **Untracked** in the browser
- Skip it during change detection
- Never include it in checkpoints or sync

The file still exists on your disk — Clustta just pretends it isn't there.

## Managing the ignore list

Open **Project Settings → Ignore List**.

Add patterns one at a time:

1. Type the path, name, or extension to ignore.
2. Press Enter.

Patterns can be:

- An **extension** — `.tmp`, `.bak`, `.swp`
- A **filename** — `Thumbs.db`, `.DS_Store`
- A **folder** — `__pycache__`, `Saved/`, `Intermediate/`
- A **path with wildcards** — `*.log`, `Build/*.pdb`

Order doesn't matter. Patterns are evaluated against every detected path.

<!-- TODO: screenshot of Ignore List in Project Settings -->

## Built-in ignore lists

Clustta ships with curated ignore lists for common engines and tools so you don't have to build them from scratch:

- **Unreal Engine** — Filters out `Binaries/`, `Intermediate/`, `Saved/`, `DerivedDataCache/`, `.vs/`, `.idea/`, generated `.pdb`/`.lib`/`.exp` files, and Unreal's many cache and IDE artifacts.
- More engine presets coming as users contribute them.

You can apply a built-in list as a starting point and extend it from there.

## When to ignore vs. when to track

✅ **Ignore:**

- Build artifacts (compile outputs, packaged binaries, derived caches)
- IDE/editor metadata (`.vscode/`, `.idea/`, `.vs/`)
- OS noise (`.DS_Store`, `Thumbs.db`, `desktop.ini`)
- Crash dumps, log files, temp files (`.tmp`, `.bak`, `.swp`, `.crash`)
- Engine-derived data (`DerivedDataCache/`, `Library/` in Unity, `Saved/` in Unreal)
- Renders that can be regenerated cheaply (debate-able — sometimes you want them)

❌ **Don't ignore:**

- Source files of any kind
- Configurations and project settings (`*.uproject`, `ProjectSettings/` in Unity, `Config/` in Unreal)
- Authored content (textures, models, scenes, scripts)
- Anything you'd be sad to lose

## How patterns interact with collections and assets

Ignore patterns are **path-based**. They don't depend on collection or asset metadata — Clustta just looks at the relative path of each detected file/folder against the working folder root.

- Patterns apply to the entire project. There's no per-collection ignore right now.
- Already-tracked files are **not retroactively ignored** by adding a new pattern. You'd need to delete them from the project first.

## Ignore vs. exclude vs. delete

| Operation | Result |
|-----------|--------|
| **Ignore** | File stays on disk, Clustta pretends it's invisible. |
| **Free Up Space** (`Delete` key) | Local file removed; asset record + history preserved. |
| **Delete** (`Shift+Delete`) | Asset record sent to trash; local file removed. |

Ignore is the right tool for files you never want Clustta to manage. Free Up Space is for files you've finished with locally but want to keep in history. Delete is for getting rid of something for good.
