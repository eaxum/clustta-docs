# 3D Animation

3D animation productions move large files through design, modeling, texturing, rigging, animation, lighting, rendering, and compositing. Clustta gives each stage a clear owner and keeps its source files connected to the approved work produced earlier.

## Compatible software

- **3D:** Blender, Maya, Cinema 4D, Houdini, ZBrush, and Substance 3D tools
- **Design and paint:** Photoshop, Krita, Illustrator, and Affinity
- **Comp:** After Effects, Nuke, and Natron

A typical production might move through the following stages:

<div class="pipeline-chart">
  <div class="pipeline-stage"><strong>Asset Design(Char, Env & Props)</strong><span>Photoshop, Krita, Illustrator, Affinity</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Modeling/Sculpting</strong><span>Blender, Maya, Cinema 4D, ZBrush</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Texturing/Surfacing</strong><span>Substance 3D, Blender, Maya, Photoshop</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Rigging</strong><span>Blender, Maya, Cinema 4D</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Animation</strong><span>Blender, Maya, Cinema 4D</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Lighting, FX, and Render</strong><span>Blender, Maya, Cinema 4D, Houdini</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Comp</strong><span>After Effects, Nuke, Natron</span></div>
</div>

Not every production needs every stage, but dependencies preserve whichever path the team chooses. Review renders and approved outputs can then move into central collections where the wider team knows to find them.

This works without a plugin/add-on. Blender also has deeper automation through Clustta's agent tooling today, while first-party Blender and Maya integrations are on the near-term roadmap. [Integrations](../features/integrations.md) tracks the current status.

## Example Workflow

A team might begin with Clustta's **3D Animation** project template and a studio `.blend` or `.ma` asset template. A concept artist is assigned the character design, a model/rig artist receives that approved design as a dependency, and an animator receives the approved rig. The animator's checkpoint becomes an input for lighting and comp, with review renders and final shots collected under `Outputs`.

The Blender or Maya ignore preset can keep backup files, incremental saves, caches, and temporary renders out of the project. Approved renders should live in `Outputs` rather than the ignored cache folder.

Suggested collection layout; labels in brackets are asset or collection types:

```text
3D Animation/
|-- Assets/
|   \-- Hero [Character]
|       |-- concept.psd [Design]
|       |-- model.blend [Modeling]
|       |-- textures.spp [Texturing]
|       \-- rig.blend [Rigging]
|-- Shots/
|   \-- Shot-010 [Shot]
|       |-- animation.blend [Animation]
|       |-- lighting.blend [Lighting]
|       \-- composite.nk [Comp]
\-- Outputs/
    \-- Shot-010-final.mp4 [Delivery]
```

## Share Your Workflow

This example is a suggestion, not a rule. Improvements, additions, and new workflow examples are welcome in the [Clustta Discord community](https://discord.gg/NuR4uAuTZd).
