# Roles & Permissions

Roles and permissions control who can do what in a project. Clustta's model is **granular, customizable, and additive** - you can build exactly the access policy your studio needs without fighting against fixed buckets.

## Two levels of roles

There are two layers:

- **Studio role** - Set when adding a user to the studio. Controls studio-wide access (creating projects, adding studio collaborators).
  - **Admin** - Full studio control
  - **User** - Can only access projects they're added to

- **Project role** - Set when adding a user to a project. Controls what they can do *inside* that project.
  - Six defaults ship out of the box (Admin, Production Manager, Supervisor, Assistant Supervisor, Artist, Vendor)
  - Fully customizable - add, edit or remove (except Admin which is fixed)

The same user can have **different project roles in different projects** - e.g. Artist on Project A, Supervisor on Project B.

## Default project roles

The six built-ins are starting points; you can change anything except the Admin role.

| Role | Typical permissions |
|------|--------------------|
| **Admin** | Everything. Cannot be modified or deleted. |
| **Production Manager** | Manage assets, collections, assignments, statuses, dependencies. Manage users. |
| **Supervisor** | View everything. Approve checkpoints, assign tasks, change statuses. Limited create/delete. |
| **Assistant Supervisor** | Like Supervisor, narrower scope. |
| **Artist** | Create checkpoints on assigned tasks. View dependencies. Limited self-assign. |
| **Vendor** | Most restricted. View and checkpoint only what's explicitly assigned. |

## Permission categories

Permissions are organized by domain. Each role has independent toggles per category:

- **Assets** - View All Assets, Create, Update, Delete, Manage Dependencies
- **Collections** - View All Collections, Create, Update, Delete
- **Templates** - Create, Update, Delete
- **Checkpoints** - Create, Delete, Revert
- **Assignments** - Assign, Unassign
- **Status** - Change status
- **Users** - Manage project collaborators and their roles
- **Workflows** - Create, Update, Delete

The number of distinct permission toggles is intentionally high so you can express things like *"can change status but not delete checkpoints"*.

<!-- TODO: screenshot of Edit Role modal showing permission toggles -->

## Editing a role

In **Project Settings → Roles**:

1. Hover the role row → click the pen icon.
2. Toggle permissions on/off in the editor.
3. Click **Update**.

Existing assignees of that role gain/lose permissions immediately.

## Creating a role

To start from an existing role, hover its row in **Project Settings > Roles** and select **Duplicate**. Enter a new name, then adjust the copied permissions as needed. Duplicating requires permission to change roles; the fixed Admin role cannot be duplicated.

1. Click **Add Role**.
2. Give it a name (e.g. *External Reviewer*, *Junior Lighter*, *Audio Lead*).
3. Toggle the permissions you want.
4. Click **Create**.

## Assigning a role to a user

When adding collaborators (see [Studios & Collaboration](../getting-started/studios.md)):

1. **Project Settings → Collaborators → Add Collaborator**.
2. Enter user(s) by name or email.
3. Pick the role from the dropdown.
4. Click **Add**.

To change someone's role later, find them in the collaborators list and pick a new role from their dropdown.

## Visibility and operation permissions

The role editor labels the visibility controls **View All Assets** and **View All Collections** to distinguish broad project visibility from access through assignments, dependencies, and Shared collections.

Shared collections make common resources available to collaborators. Assignments and their dependencies provide access to the work a collaborator needs. Review the role's visibility settings alongside those relationships when configuring restricted access.

Seeing an item does not automatically grant permission to edit, delete, checkpoint, or manage its dependencies. Those operations have separate requirements, which also apply to keyboard shortcuts and Agent actions.

## Server-enforced permissions

Clustta projects are SQLite files on each collaborator's disk - which means a determined user could try to edit their local copy directly to grant themselves more access. Clustta is built so this never gains anything.

- **The studio server is the source of truth.** Roles, permissions and project membership are stored on the server and re-verified on every sync.
- **Sync operations are authorized server-side.** When a client pushes changes, the server checks the *current* role of the authenticated user against each operation. Tampered local permissions are ignored.
- **Tampered changes are rejected.** Pushes that try to apply changes the user isn't allowed to make are refused; the local DB is reconciled with the server's authoritative state on the next pull.
- **Visibility is enforced at the bandwidth level.** The server only ships chunks the user is entitled to receive, so a tampered local DB can't trick it into sending content the user isn't assigned to or that isn't in a Shared collection.

The practical implication: editing your local `.clst` is harmless. Anything that doesn't match what the server already knows about your role is dropped at sync time.

## Best practices

- **Start with the defaults.** They cover ~80% of typical studios.
- **Add custom roles when there's a real distinct workflow** (external reviewer, IO operator, junior with limited rights). Don't multiply roles for marginal differences.
- **Be sparing with delete permissions.** Trash + sync-pending recovery covers most accidents, but tighter is safer.
- **The Admin role is non-negotiable.** Always have at least two project Admins so you don't lock yourself out.

## Audit & accountability

Today, checkpoints record their author, so any change committed to an asset is traceable to a specific user.

A full audit log - capturing who assigned what, who changed which status, and when - is on the roadmap as part of the **Enterprise** tier. Until then, treat checkpoint authorship as the primary accountability signal.
