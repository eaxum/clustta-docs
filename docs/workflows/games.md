# Games

Art and asset creation teams in game development can use Clustta instead of Git LFS to collaborate on large binary files. Concept art, models, textures, materials, animation, audio, engine-ready exports, and review builds can move between teammates without asking artists to adopt a code-oriented workflow.

## Compatible software

- **Engines:** Unity, Godot, and Unreal Engine
- **Asset creation:** Blender, Maya, Houdini, ZBrush, Substance 3D tools, Photoshop, Krita, and Affinity

In a typical setup, editable DCC files remain the source assets. Approved FBX, glTF, textures, audio, and other engine inputs are published to a central collection, with dependencies preserving the connection back to their sources. Generated caches and intermediate files can stay outside Clustta through [ignore patterns](../features/ignore-patterns.md).

Unreal can already connect through the DCC Bridge, and a first-party integration is planned. Programming teams can continue using Git or another code-oriented VCS alongside Clustta, since code-aware diffing and merging are not yet a Clustta focus.
