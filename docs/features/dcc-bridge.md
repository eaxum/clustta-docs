# DCC Bridge

The DCC Bridge is a local HTTP API built into Clustta Desktop. It lets applications discover project assets and perform supported operations using stable project and asset IDs. Shared file, permission, dependency, and publishing logic stays in Clustta, so each DCC integration can focus on its own application.

## Why a local HTTP API

Blender, Maya, Houdini, and other creative applications can use their existing HTTP libraries to communicate with Clustta. Plugins receive JSON without needing to read a project database or depend on Clustta's internal storage layout.

## Where it runs

The bridge listens on `127.0.0.1:1173` while enabled in Clustta Desktop. It is restricted to the local machine. Check `GET /health` to confirm it is reachable, then use `GET /v1/capabilities` to discover the installed API's capabilities.

## Authentication

Except for `GET /health`, requests require `Authorization: Bearer <token>`. Read the token from Clustta's `.bridge-token` file in its application-data directory. Clustta creates a token when the bridge starts; reload it after a restart. Keep it local and do not include it in a project or a shared script.

The token authorizes access to the local bridge. Project operations still use the desktop account's access and enforce Clustta permissions. Send the selected studio ID in `X-Clustta-Studio` so requests do not depend on the studio currently displayed in the desktop UI.

## What it exposes

All routes below start with `/v1`:

| Route | Purpose |
|-------|---------|
| `GET /bootstrap` | Accounts, studios, local projects, and active context. Add `?refresh=true` to refresh the catalog. |
| `GET /projects` | Discover projects using stable IDs. |
| `GET /context?filePath=<absolute-path>` | Resolve a local file to its tracked project and asset. |
| `GET /projects/{projectId}/workspace?ext=.blend` | Retrieve directly assigned assets and statuses together. |
| `GET /projects/{projectId}/assets` | Retrieve assigned assets; extension filtering is optional. |
| `GET /projects/{projectId}/statuses` | Retrieve the project's statuses. |
| `GET /projects/{projectId}/assets/{assetId}/checkpoints` | Read checkpoint history. |
| `GET /projects/{projectId}/assets/{assetId}/dependencies` | Read asset dependencies. |

Use IDs from these responses rather than retaining project database paths. The bridge verifies file paths against tracked assets before file operations.

Operations under `/v1/projects/{projectId}/assets/{assetId}` include:

- **`POST /status`** - Change asset status.
- **`POST /checkpoints`** - Create a checkpoint from the tracked file.
- **`POST /build`** - Build the asset with its dependencies.
- **`POST /revert`** - Restore a checkpoint.
- **`POST /open`** - Focus the asset in Clustta Desktop.
- **`POST /reveal`** - Reveal the tracked file in the system file manager.

Checkpoint, status, build, and revert requests accept an `Idempotency-Key` header and return `202 Accepted` with a job. Reuse the same key when retrying the same request. Open and reveal return `204 No Content`.

Checkpoint requests include the tracked `filePath`, an optional `message`, optional `previewPath`, and `useAsThumbnail`. Blank messages generate the next asset version comment, starting at `v0001`. Integration publishing and comment forwarding are handled by the bridge.

Poll `GET /v1/jobs/{jobId}` for progress and errors. Job states are `queued`, `running`, `cancelling`, `cancelled`, `succeeded`, and `failed`. Use `POST /v1/jobs/{jobId}/cancel` where cancellation is supported. Checkpoint and status jobs cannot be cancelled after submission.

The bridge supports versioned dependency and checkpoint-tag routes. Dependency edges expose `resolution_mode` as `floating`, `pinned`, or `tagged`, together with their resolved checkpoint and resolution status. Use the dependency-options route to retrieve eligible checkpoints and tags, and the selector route to update an edge. See the [API contract](https://github.com/eaxum/clustta-client/blob/HEAD/docs/dcc-bridge-v1.md) for request fields and routes.

For an exact build, retrieve `GET /v1/projects/{projectId}/assets/{assetId}/build-plan`. Show its conflicts, downloads, and modified files before submitting `POST /build` with the returned `plan_fingerprint`. Leave `allow_modified` false unless the user has explicitly confirmed replacement of locally modified files. The bridge rejects conflicting plans and stale fingerprints, then restores the chosen checkpoints in dependency-first order.

## Build a plugin

Start with health and capability discovery, authenticate, and resolve the user's chosen project and asset. A project list request looks like this:

```http
GET /v1/projects HTTP/1.1
Host: 127.0.0.1:1173
Authorization: Bearer <local-bridge-token>
X-Clustta-Studio: <studio-id>
```

Handle unsaved DCC changes before requesting a revert. Wait for the bridge job to succeed before reopening the restored file. For builds, present any local overwrite confirmation before sending the request.

Use the [client API contract](https://github.com/eaxum/clustta-client/blob/HEAD/docs/dcc-bridge-v1.md) and [bridge handlers](https://github.com/eaxum/clustta-client/tree/HEAD/internal/bridge) for implementation details, checking the source version against the installed client. The user-facing version policies are covered in [Dependencies](./dependencies.md).
