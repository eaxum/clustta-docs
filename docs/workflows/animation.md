# Animation

Animation productions rarely stay inside one application. A character might begin in Photoshop, move through ZBrush and Maya, and end up in an After Effects composite. Clustta gives the team one place to version those large source files and understand how work moves from one stage to the next.

## Compatible software

- **3D:** Blender, Maya, Cinema 4D, Houdini, ZBrush, and Substance 3D tools
- **2D and paint:** Photoshop, Krita, Illustrator, Affinity, and Moho
- **Compositing:** After Effects, Nuke, and Natron

A studio might follow `design -> model/texture -> rig -> animation -> lighting/render -> composite`. Each stage becomes an asset, with dependencies connecting it to the files produced earlier. Review renders and approved outputs can then flow into central collections where the rest of the team knows to find them.

This works without a plugin/add-on. Blender also has deeper automation through Clustta's agent tooling today, while first-party Blender and Maya integrations are on the near-term roadmap. [Integrations](../features/integrations.md) tracks the current status.

Toon Boom Harmony and Clip Studio Paint projects that store animation frames as separate files are better left out for now. The [overview](./overview.md#workflows-to-hold-off-on-for-now) explains why.
