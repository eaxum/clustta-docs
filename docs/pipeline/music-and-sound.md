# Music & Sound

Music and sound projects often combine a relatively small session file with a much larger set of recordings, samples, stems, and mixes. Clustta can keep those pieces together while letting collaborators exchange only the assets they need.

## Compatible software

File-based sessions from tools such as Pro Tools, Reaper, Ableton Live, FL Studio, Logic Pro, Cubase, Studio One, and Adobe Audition can fit this model. External recordings and sample libraries become dependencies of the session, while approved stems and masters flow into a central delivery collection.

This workflow uses Clustta's normal file handling, and there is no first-party DAW plugin/add-on announced at present.

## Example Workflow

Until a dedicated music project template is available, a team can begin with a blank Clustta project and register its standard DAW session as an asset template. A composer is assigned the main session, a sound designer or recording editor contributes recordings and effects, and a mix engineer receives both as dependencies. Approved stems move to the mix, and the final master goes to a shared `Deliveries` collection.

An ignore list can leave waveform caches, peak files, auto-saves, temporary recordings, and test bounces outside Clustta while keeping original recordings and approved exports versioned.

Suggested collection layout; labels in brackets are asset or collection types:

```text
Sound/
|-- Sessions/
|   \-- main-session.rpp [Session]
|-- Media/
|   |-- Recordings/ [Recording]
|   \-- SFX/ [Sound Effect]
|-- Mixes/
|   |-- dialogue.wav [Stem]
|   |-- music.wav [Stem]
|   \-- final-mix.rpp [Mix]
\-- Deliveries/
    \-- final-master.wav [Master]
```

## Share Your Workflow

This example is a suggestion, not a rule. Improvements, additions, and new workflow examples are welcome in the [Clustta Discord community](https://discord.gg/NuR4uAuTZd).
