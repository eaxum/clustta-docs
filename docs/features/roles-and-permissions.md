# Roles & Permissions

Roles and permissions control who can do what in a project. Clustta's model is **granular, customizable, and additive** — you can build exactly the access policy your studio needs without fighting against fixed buckets.

## Two levels of roles

There are two layers:

- **Studio role** — Set when adding a user to the studio. Controls studio-wide access (creating projects, adding studio collaborators).
  - **Admin** — Full studio control
  - **User** — Can only access projects they're added to

- **Project role** — Set when adding a user to a project. Controls what they can do *inside* that project.
  - Six defaults ship out of the box (Admin, Production Manager, Supervisor, Assistant Supervisor, Artist, Vendor)
  - Fully customizable — add, edit or remove (except Admin which is fixed)

The same user can have **different project roles in different projects** — e.g. Artist on Project A, Supervisor on Project B.

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

- **Assets** — View, Create, Update, Delete, Manage Dependencies
- **Collections** — View, Create, Update, Delete
- **Templates** — Create, Update, Delete
- **Checkpoints** — Create, Delete, Revert
- **Assignments** — Assign, Unassign
- **Status** — Change status
- **Users** — Manage project collaborators and their roles
- **Workflows** — Create, Update, Delete

The number of distinct permission toggles is intentionally high so you can express things like *"can change status but not delete checkpoints"*.

<!-- TODO: screenshot of Edit Role modal showing permission toggles -->

## Editing a role

In **Project Settings → Roles**:

1. Hover the role row → click the pen icon.
2. Toggle permissions on/off in the editor.
3. Click **Update**.

Existing assignees of that role gain/lose permissions immediately.

## Creating a role

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

## What permissions don't control

Permissions gate *operations*. They do **not** gate *visibility of files*:

- **Visibility is driven by Library + Assignment**, not by role.
  - Library collections are visible to everyone in the project.
  - Non-library collections are visible to a user only if they're assigned to an asset inside (or a transitive dependency reaches in).
- **A user with broad permissions still can't see assets they're not assigned to** unless those assets are in a Library collection.

This separation is intentional: roles control *what you can do*; assignment controls *what you can see and download*.

## Best practices

- **Start with the defaults.** They cover ~80% of typical studios.
- **Add custom roles when there's a real distinct workflow** (external reviewer, IO operator, junior with limited rights). Don't multiply roles for marginal differences.
- **Be sparing with delete permissions.** Trash + sync-pending recovery covers most accidents, but tighter is safer.
- **The Admin role is non-negotiable.** Always have at least two project Admins so you don't lock yourself out.

## Audit & accountability

Every action is recorded with the actor's identity:

- Checkpoints record the author
- Assignments record both assigner and assignee
- Status changes record who changed them and when

A formal audit log UI is on the roadmap; the underlying records exist today and are queryable through the project database.
