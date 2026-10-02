# Project Compatibility

Clustta Desktop and a Studio server negotiate a supported API version when they connect. This lets newer releases continue to work with older installations while only exposing features that both sides understand.

## API negotiation

The client asks the server which API versions it supports and selects the highest version they share. API versions describe the data and features exchanged between the desktop app and Studio server; they are not project versions or checkpoint labels.

The current APIs are:

| API | Behavior |
|-----|----------|
| **API v1** | The compatibility baseline for older clients and servers. |
| **API v2** | Adds versioned dependency selectors and granular project-management permissions. |

Servers treat requests without an API version as API v1. A new desktop client can therefore connect to a server that predates API negotiation, but controls that depend on API v2 remain unavailable.

If the client and server have no API version in common, the server returns an update-required error instead of attempting an unsafe request.

## Capability-dependent features

Clustta enables features from the capabilities returned for the negotiated API:

- **Versioned dependencies** - Select Latest, a checkpoint tag, or a specific checkpoint for a linked asset dependency.
- **Project permissions** - Use separate permissions for roles, tags, types, workflows, integrations, and project settings.

On API v1, basic dependencies and the established role permissions continue to work. Version selectors and the newer project-management permission controls are hidden or unavailable until both the client and server support API v2.

## Protecting newer project data

The Studio server keeps the canonical project data. When serving an API v1 client, it omits fields that client does not understand, including checkpoint tags, checkpoint provenance, versioned dependency selectors, and newer project-management permissions.

If a legacy client writes project data, the server preserves those newer canonical fields. Using an older client therefore does not erase metadata created through API v2.

## Checking the connection

Studio Settings shows the information needed to diagnose compatibility:

- Studio server version
- Negotiated API version
- APIs supported by the server
- Project schema version

If a feature is missing, check the negotiated API before changing project settings. Update the Studio server and desktop client when you need capabilities that are not available in their shared API.

## Project archive schemas

API compatibility is separate from the schema inside a `.clst` project archive. Clustta migrates older supported archives when they are opened. An archive created with a newer, unsupported schema requires a newer desktop client or Studio server.

Before opening or moving an important archive:

1. Preserve the `.clst` file and any working folder containing uncheckpointed changes.
2. Create a [desktop backup](../architecture/storage.md#desktop-backups-and-imports) when possible.
3. Update Clustta if the archive was created by a newer release.
4. Reopen the project and allow any supported migration to complete.

Schema migration changes project metadata structures. It does not intentionally discard working files.

## Troubleshooting

### A newer feature is missing

Open Studio Settings and check the negotiated API. Features such as dependency version selectors and granular project-management permissions require API v2. Update the older component, then reconnect to the studio.

### Clustta says the API version is unsupported

The client and server have no API version in common. Update Clustta Desktop, the Studio server, or both. Reconnect after the update so they can negotiate again.

### A project archive will not open

This is usually an archive-schema issue rather than API negotiation. Do not replace or manually edit the archive. Preserve the archive and working folder, then open it with a Clustta release that supports its schema.

### I need to preserve unsynced work

Do not delete the local archive or working folder. Back up both before reinstalling, importing another archive, or asking an administrator to repair the project.
