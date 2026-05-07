# Asset Templates

Asset Templates are pre-configured starter files. Instead of opening Blender, configuring the scene, setting render settings, and saving - every time, for every artist - you do that work *once*, register the file as a template, and from then on Clustta creates new assets from it with a single click.

## Why templates?

Without templates, every new asset starts from a software default. That means:

- Inconsistent scene settings across the team
- Repeated setup work for every new file
- New artists have to learn the studio's conventions through trial and error
- "I forgot to set the render resolution again" - every week

Templates eliminate all of this. The template *is* the studio's convention, encoded into a file.

## What you can template

Anything Clustta can store as an asset:

- `.blend` with custom scene units, render engine, output settings, included rigs
- `.psd` / `.psb` with brand colors, layer groups, guides, swatch palette
- `.ai` with brand templates, page sizes, color profiles
- `.ma` / `.mb` with project rig, namespaces, render layers
- `.kra`, `.spp`, `.ztl`, `.c4d`, `.aep`, plus any other format

Templates aren't limited to DCC files. You can template `.txt` checklists, `.json` config scaffolds, anything.

## Creating a template

1. Open the source app (Blender, Photoshop, etc.).
2. Set up the file exactly as you want a new asset to start. Save it anywhere on disk.
3. In Clustta, open **Project Settings → Templates → Add Template**.
4. Give it a clear name (e.g. *Blender Animation Scene*, *Brand PSD Layout*).
5. Pick the file you saved.
6. Click **Create**.

::: tip
Once registered, you can delete the original file. Clustta has copied the contents into the project's template library.
:::

<!-- TODO: screenshot of Templates tab in Project Settings -->

## Using a template

From the browser:

1. Click **New Asset** on the action bar.
2. Pick the template you want.
3. Enter a name, optionally set type and tags.
4. Click **Create**.

Clustta materializes the template's contents as a new working file. Double-click to open it in your DCC tool.

<!-- TODO: screenshot of New Asset modal showing templates -->

## Templates + Workflows

Templates pair naturally with [Workflows](./workflows.md). When defining a workflow's asset slot, you can specify *which template to use* when scaffolding. Now scaffolding a new shot doesn't just create the structure - it also creates real working files based on your studio's templates, ready to open and start working.

This is the closest thing Clustta offers to "automated pipeline setup."

## Updating a template

Templates can be updated any time. **Existing assets created from the template are not affected** - they keep their own independent history. Only future asset creations use the new template content.

## Deleting templates

Templates go to trash like any other asset and are recoverable until purged.
