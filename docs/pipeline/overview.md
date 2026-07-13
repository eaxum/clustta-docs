# Pipeline Guides

Creative projects often move between several applications before they are finished. These guides show how Clustta can sit between those applications, giving the team a shared way to version large files, pass work between people, and keep related files together.

The starting points here cover:

- [2D Animation](./2d-animation.md) - storyboards, character builds, rigs, shots, and compositing
- [3D Animation](./3d-animation.md) - models, textures, rigs, shots, renders, and compositing
- [Games](./games.md) - art and content production for Unity, Godot, and Unreal Engine
- [Music & Sound](./music-and-sound.md) - sessions, recordings, stems, and delivery masters
- [Design](./design.md) - documents, linked images, fonts, and exports

## How the pieces fit together

In most pipelines, editable source files, referenced media, and final deliverables become separate Clustta assets. [Dependencies](../features/dependencies.md) describe how those assets relate, so someone receiving a scene, session, or document also receives the files it needs.

Checkpoints naturally mark reviews and hand-offs, while a central output collection gives the wider team one predictable place to find approved renders, exports, stems, builds, or documents. Where the structure repeats, [asset templates](../features/asset-templates.md) and Clustta [workflows](../features/workflows.md) can create the same starting point for everyone.

Clustta generally works with software that saves its work as ordinary files in a project folder. A plug-in is not required for compatibility, although one can make the experience more direct. Each guide notes relevant integrations, and [Integrations](../features/integrations.md) remains the source of truth as support evolves.

## Templates and starting points

Clustta already includes project templates for **3D Animation** and **Unreal Engine** productions. Teams can also turn their own starter files into [asset templates](../features/asset-templates.md), such as a configured Blender scene, Photoshop document, or Unreal project.

More first-party project templates will be added as these guides grow. A community template system is also planned, so artists and studios can publish, discover, and adapt production structures created by other Clustta users.

## Why Clustta instead of a shared drive or GitHub?

Google Drive, OneDrive, and Dropbox are built around automatic file synchronization. That is convenient for documents, but risky for large creative files: if two people save the same binary asset, their sync clients can overwrite one another, create confusing conflict copies, or leave an application with an incomplete file. Recovery depends on what the sync service happened to retain.

Clustta makes transfers deliberate. Assignments reduce accidental overlap, checkpoints preserve recoverable versions, and one artist's save does not silently replace another artist's stable copy.

GitHub is excellent for code, but creative files are usually large binaries that cannot be meaningfully diffed or merged. Git LFS helps store them, yet artists still inherit repository-wide concepts and tooling that do not match selective asset hand-offs, visual dependencies, reviews, and production roles. A mixed team can use Clustta for creative assets and Git for code.

## Workflows to hold off on for now

- **DaVinci Resolve projects** usually live in a database outside the working folder. Direct support may come later.
- **Toon Boom Harmony projects** can contain thousands of individual files. Clustta will need the planned Merkle-tree checkpointing model to handle these efficiently.
- **Clip Studio Paint animation projects** have the same limitation when their frames are stored as separate files. Ordinary self-contained Clip Studio Paint files can still work.
