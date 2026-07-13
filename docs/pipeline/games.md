# Games

Art and asset creation teams in game development can use Clustta instead of Git LFS to collaborate on large binary files. Concept art, models, textures, materials, animation, audio, engine-ready exports, and review builds can move between teammates without asking artists to adopt a code-oriented workflow.

## Compatible software

- **Engines:** Unity, Godot, and Unreal Engine
- **Asset creation:** Blender, Maya, Houdini, ZBrush, Substance 3D tools, Photoshop, Krita, and Affinity

In a typical setup, editable DCC files remain the source assets. Approved FBX, glTF, textures, audio, and other engine inputs are published to a central collection, with dependencies preserving the connection back to their sources. Generated caches and intermediate files can stay outside Clustta through [ignore patterns](../features/ignore-patterns.md).

Unreal can already connect through the DCC Bridge, and a first-party integration is planned. Programming teams can continue using Git or another code-oriented VCS alongside Clustta, since code-aware diffing and merging are not yet a Clustta focus.

## Example Workflow

A small Unreal team can start with Clustta's **Unreal Project** template. A concept artist is assigned the visual brief, a 3D artist receives that brief and creates the model and textures, and a technical or engine artist receives the approved exports for material setup and placement in the level. Dependencies keep the engine-ready asset connected to its editable sources, while approved builds or captures go to `Outputs`.

The matching Unreal, Unity, or Godot ignore preset keeps generated folders such as `Intermediate`, `DerivedDataCache`, `Library`, `.godot`, logs, and local builds out of checkpoints. Source code can remain in a separate Git repository.

Suggested collection layout; labels in brackets are asset or collection types:

```text
Game Art/
|-- Characters/
|   \-- Hero [Character]
|       |-- concept.psd [Concept]
|       |-- hero.blend [3D Model]
|       |-- hero-textures.spp [Texture]
|       \-- hero.fbx [Engine Export]
|-- Engine/
|   \-- Hero.uasset [Engine Asset]
\-- Outputs/
    \-- Hero-review.mp4 [Review]
```

## Share Your Workflow

This example is a suggestion, not a rule. Improvements, additions, and new workflow examples are welcome in the [Clustta Discord community](https://discord.gg/NuR4uAuTZd).
