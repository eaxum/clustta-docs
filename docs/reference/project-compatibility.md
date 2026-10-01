# Project Compatibility

Clustta checks compatibility before it opens or synchronizes a project. These checks prevent an older client, server, or local project replica from writing data it does not understand.

## What is checked

Three versions work together:

- **Protocol** - the contract used by the client and Studio server to exchange project data.
- **Project schema** - the structure of the project's `.clst` database.
- **Local replica schema** - the schema of a downloaded project copy on the current computer.

Clustta compares the desktop client's supported contract with the Studio server and the selected project. Compatibility versions are internal safety markers, not project version numbers or checkpoint labels.

## What the messages mean

| Message | Meaning | Action |
|---------|---------|--------|
| **Update Clustta to access this project** | The Studio server or project uses a newer contract than this desktop app supports. | Install the latest Clustta Desktop release, then refresh the studio and reopen the project. |
| **Update the Studio/server to access this project** | The server is older than the client expects, reports an incomplete contract, or hosts a project on a different schema. | Ask a studio administrator to update the server, then refresh the project list. |
| **This local replica uses a different project schema** | The downloaded `.clst` replica does not match the confirmed server project schema. | Keep the replica and working folder intact. Reconnect to the server and let Clustta update the replica before syncing. |

The sync control is disabled while an active project has a compatibility problem. Clustta keeps compatibility failures separate from ordinary connection errors so retrying a network request cannot bypass the check.

## Local replica updates

For a connected project, the Studio server is the authority for the project contract. Once Clustta can confirm that contract, it can apply supported schema migrations to the local replica before synchronization.

When a replica update is required:

1. Do not replace or manually edit the `.clst` archive.
2. Preserve the working folder, especially files with uncheckpointed changes.
3. Update Clustta Desktop or the Studio server if the message requests it.
4. Reconnect to the studio and refresh the project list.
5. Open the project and sync after the compatibility warning clears.

Clustta preserves local changes when it reports a replica mismatch. A schema migration changes project metadata structures; it does not intentionally discard the working files you edit in creative applications. Create a [desktop backup](../architecture/storage.md#desktop-backups-and-imports) before recovery if the archive contains important unsynced work.

## Offline behavior

Clustta can use the last compatibility contract it successfully verified for that account, studio, and project. A previously verified, readable replica can remain available while the server is temporarily unreachable.

If this computer has never verified the remote contract, Clustta cannot prove that an offline replica is safe to open or sync. Reconnect to the Studio server once so the app can verify the project. A cached compatibility result is scoped to the account and studio; switching accounts does not reuse another user's verification.

## Local-only projects

Local-only Personal projects do not need a Studio server contract. Clustta still checks whether the archive schema is readable by the installed client. An archive created by a newer client requires updating Clustta Desktop before it can be opened safely.

## Troubleshooting

### The warning remains after updating Clustta

Refresh the studio and project list so the client can fetch a new server contract. If the message requests a server update, updating only the desktop app is not enough.

### The server was updated but the project still will not sync

Confirm that the server update completed and the project itself uses the server's current schema. Reopen Clustta Desktop, refresh the studio, and allow the local replica update to finish before starting another sync.

### The studio is offline

Treat a compatibility warning differently from a connectivity warning. Restore the server connection first. If Clustta has never verified this project on the current account and computer, it cannot safely infer compatibility while offline.

### I need to preserve unsynced work

Do not delete the local replica or working folder. Back up both before reinstalling, re-downloading, or asking an administrator to repair the project. The compatibility guard is designed to preserve local changes until the required component can be updated.
