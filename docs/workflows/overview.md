# Pipeline Guides

Creative projects often move between several applications before they are finished. These guides show how Clustta can sit between those applications, giving the team a shared way to version large files, pass work between people, and keep related files together.

The starting points here cover:

- [Animation](./animation.md) - 2D/3D assets, shots, renders, and compositing
- [Games](./games.md) - art and content production for Unity, Godot, and Unreal Engine
- [Music & Sound](./music-and-sound.md) - sessions, recordings, stems, and delivery masters
- [Design](./design.md) - documents, linked images, fonts, and exports

## How the pieces fit together

In most pipelines, editable source files, referenced media, and final deliverables become separate Clustta assets. [Dependencies](../features/dependencies.md) describe how those assets relate, so someone receiving a scene, session, or document also receives the files it needs.

Checkpoints naturally mark reviews and hand-offs, while a central output collection gives the wider team one predictable place to find approved renders, exports, stems, builds, or documents. Where the structure repeats, [asset templates](../features/asset-templates.md) and Clustta [workflows](../features/workflows.md) can create the same starting point for everyone.

Clustta generally works with software that saves its work as ordinary files in a project folder. A plug-in is not required for compatibility, although one can make the experience more direct. Each guide notes relevant integrations, and [Integrations](../features/integrations.md) remains the source of truth as support evolves.

## Workflows to hold off on for now

- **DaVinci Resolve projects** usually live in a database outside the working folder. Direct support may come later.
- **Toon Boom Harmony projects** can contain thousands of individual files. Clustta will need the planned Merkle-tree checkpointing model to handle these efficiently.
- **Clip Studio Paint animation projects** have the same limitation when their frames are stored as separate files. Ordinary self-contained Clip Studio Paint files can still work.
