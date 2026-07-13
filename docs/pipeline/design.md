# Design

Design teams can use Clustta to share large editable documents without flattening them or passing files around through temporary download links. Linked images, typefaces, illustrations, and shared brand elements can travel with the document as dependencies, so another designer receives a complete working set.

## Compatible software

- **Raster:** Photoshop, Affinity Photo, Krita, and GIMP
- **Vector and layout:** Illustrator, Affinity Designer, Affinity Publisher, and InDesign
- **Interchange and delivery:** SVG, PDF, packaged fonts, and common raster formats

Working files can stay separate from approved exports, with final images, PDFs, fonts, and packages published to a central collection for the rest of the team. Packaged documents or explicit dependencies are a better fit than links to files elsewhere on one designer's workstation.

These applications use Clustta's normal file handling, and there is no first-party design plugin/add-on announced at present.

## Example Workflow

Until a dedicated design project template is available, a team can start with a blank Clustta project and register its brand document as an asset template. An art director owns the brief and approvals, an illustrator or photo editor is assigned the source artwork, and a layout designer receives the approved artwork, fonts, and brand library as dependencies. Review PDFs collect feedback without replacing the editable source, and approved files move to `Deliveries`.

The ignore list can exclude application auto-recovery files, operating-system metadata, temporary files, and draft export folders. Fonts, linked images, and final exports should remain tracked.

Suggested collection layout; labels in brackets are asset or collection types:

```text
Campaign/
|-- Brand/ [Library]
|   |-- logo.ai [Logo]
|   \-- typefaces/ [Font]
|-- Artwork/
|   |-- hero.psd [Image]
|   \-- illustration.afdesign [Illustration]
|-- Layouts/
|   \-- brochure.indd [Layout]
|-- Reviews/
|   \-- brochure-review.pdf [Review]
\-- Deliveries/
    \-- brochure-final.pdf [Delivery]
```

## Share Your Workflow

This example is a suggestion, not a rule. Improvements, additions, and new workflow examples are welcome in the [Clustta Discord community](https://discord.gg/NuR4uAuTZd).
