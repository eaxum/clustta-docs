# Assignments & Statuses

Assignments tell Clustta who owns a task. Statuses tell everyone where each task stands. Together they make production tracking visual, contention-free, and easy to manage.

## Assignments

### How they work

- Only **Task** assets can be assigned. (Convert a Resource to a Task to assign it — see [Collections & Assets](./collections-and-assets.md).)
- A task has **at most one assignee** at any time. This is intentional.
- Only the assignee can create checkpoints on the task. We call this a **soft lock**.
- Single ownership eliminates the entire category of "two artists worked on the same file in parallel" merge conflicts.

When you assign a task to a user, they get:

- The task itself, downloadable to their machine
- Every asset and collection the task **depends on**, recursively (see [Dependencies](./dependencies.md))
- Permission to checkpoint the task

### Assigning

Three ways:

- **From the asset itself** — Click the assignee avatar/icon on the asset row.
- **From the details pane** — Pick the assignee from the dropdown.
- **From the Kanban board** — Click the assignee slot on the card.

You'll see suggestions of project collaborators as you type.

### Reassigning

Just pick a different person. The previous assignee loses checkpoint rights but keeps the local files (no destructive cleanup happens behind their back).

### Unassigning

Click the assignee → **Unassign**. The task is then unowned and no one can checkpoint it until it's assigned again.

## Statuses

Each Task has a status that reflects where it is in the production pipeline.

### Built-in statuses

Clustta ships with five statuses:

| Status | Meaning | Typical next step |
|--------|---------|-------------------|
| **Todo** | Identified but not started | Pick it up, set to WIP |
| **WIP** | Work in progress | Checkpoint regularly; set to WFA when ready for review |
| **WFA** | Waiting for approval (review) | Supervisor reviews; sets to Done or Retake |
| **Retake** | Sent back with notes | Address notes, set back to WIP |
| **Done** | Approved and complete | — |

Custom status names, colors, and short labels are on the roadmap.

### Setting status

- **From the asset row** — Click the status pill.
- **From the Kanban board** — Drag the card between columns.
- **At checkpoint time** — The Create Checkpoint dialog includes a status picker. A common pattern is to checkpoint *and* move from WIP → WFA in one step.

<!-- TODO: screenshot of status pill / Kanban drag -->

## Kanban view

Switch the browser to **Kanban view** to see assets grouped into status columns. This is the producer's view:

- See at a glance how much work is in WIP, WFA, etc.
- Drag cards between columns to update status.
- Filter by assignee to see one artist's queue, or by tag/type to focus on a part of the project.

<!-- TODO: screenshot of Kanban board -->

## Filtering & queues

Useful built-in views:

- **Default** — everything in the current collection
- **My Tasks** — tasks assigned to you
- **Assigned tasks** — every task that has any assignee (filter further by user)

Combine with type/tag filters to slice however you need.

## Status + Checkpoint = audit trail

Every checkpoint records the status it was created at. So when you look back at a task's checkpoint history, you can see:

- "Sent to WFA on March 6 with this image"
- "Came back as Retake on March 8"
- "Re-checkpointed in WIP on March 9"
- "Resubmitted to WFA on March 10"
- "Done on March 11"

This is the auditable production trail you'd otherwise have to maintain in a separate tracker.

## Quick reference

| Action | How |
|--------|-----|
| Assign | Click avatar slot on asset, pick user |
| Unassign | Click assignee → Unassign |
| Change status | Click status pill or drag on Kanban |
| See your tasks | Switch to **My Tasks** tab |
| See unassigned work | Filter assignee → Unassigned |
