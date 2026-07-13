# 2D Animation

2D animation moves through a different set of hand-offs from 3D production. Storyboards, character designs, backgrounds, puppet rigs, animation scenes, audio, and composites can all live as separate Clustta assets while remaining connected through dependencies.

## Compatible software

- **Design and paint:** Photoshop, Krita, Illustrator, and Affinity
- **Animation:** Moho and Adobe Animate
- **Comp:** After Effects, Nuke, and Natron

A cut-out or mixed-media production might move through the following stages:

<div class="pipeline-chart">
  <div class="pipeline-stage"><strong>Design and Storyboard</strong><span>Photoshop, Krita, Illustrator, Affinity</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Character and Background Build</strong><span>Photoshop, Krita, Illustrator, Affinity</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Rig or Puppet Setup</strong><span>Moho, Adobe Animate</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Animation</strong><span>Moho, Adobe Animate</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Scene Export and Comp</strong><span>After Effects, Nuke, Natron</span></div>
  <div class="pipeline-arrow" aria-hidden="true">&darr;</div>
  <div class="pipeline-stage"><strong>Delivery</strong></div>
</div>

Not every production needs a puppet rig, and some teams may animate frame by frame. Dependencies can follow whichever stages are used, while review exports and approved shots move into a central output collection.

This works without a plugin/add-on, and no first-party 2D animation plugin/add-on is announced at present. Toon Boom Harmony and Clip Studio Paint projects that store animation frames as separate files are better left out for now. The [overview](./overview.md#workflows-to-hold-off-on-for-now) explains why.

## Example Workflow

Until a dedicated 2D Animation project template is available, a team can start with a blank Clustta project and register its character rig and shot files as asset templates. A visual development artist is assigned the storyboard and designs, a character/background artist builds the production assets, and an animator/compositor receives those approved assets and audio as dependencies. Review movies and approved shots move to `Outputs`.

Ignore patterns can exclude application auto-saves, backup files, caches, and temporary preview renders. Frame sequences that are part of the actual artwork should remain tracked rather than being treated as render cache.

Suggested collection layout; labels in brackets are asset or collection types:

```text
2D Animation/
|-- Development/
|   |-- storyboard.psd [Storyboard]
|   \-- style-guide.afdesign [Design]
|-- Assets/
|   \-- Hero [Character]
|       |-- character-design.psd [Design]
|       \-- hero-rig.moho [Rig]
|-- Shots/
|   \-- Shot-010 [Shot]
|       |-- animation.moho [Animation]
|       \-- composite.aep [Comp]
|-- Audio/
|   \-- dialogue.wav [Dialogue]
\-- Outputs/
    \-- Shot-010-final.mp4 [Delivery]
```

## Share Your Workflow

This example is a suggestion, not a rule. Improvements, additions, and new workflow examples are welcome in the [Clustta Discord community](https://discord.gg/NuR4uAuTZd).
