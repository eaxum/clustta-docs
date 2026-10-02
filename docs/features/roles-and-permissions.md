# Roles & Permissions

Roles and permissions control who can do what in a project. Clustta's model is **granular, customizable, and additive**, so studios can match access to the way their teams work.

## Two levels of roles

There are two layers:

- **Studio role** - Set when adding a user to the studio. Controls studio-wide access such as creating projects and adding studio collaborators.
  - **Admin** - Full studio control
  - **User** - Can only access projects they are added to
- **Project role** - Set when adding a user to a project. Controls what they can do inside that project.
  - Six defaults ship with Clustta: Admin, Production Manager, Supervisor, Assistant Supervisor, Artist, and Vendor
  - Roles are customizable except for the fixed Admin role

The same user can have different project roles in different projects.

## Default project roles

The built-in roles are starting points. You can change anything except the Admin role.

| Role | Typical permissions |
|------|--------------------|
| **Admin** | Everything. Cannot be modified or deleted. |
| **Production Manager** | Manage assets, collections, assignments, statuses, dependencies, users, and project configuration. |
| **Supervisor** | View work, approve checkpoints, assign tasks, and change statuses, with limited create and delete access. |
| **Assistant Supervisor** | Similar to Supervisor with a narrower scope. |
| **Artist** | Create checkpoints on assigned tasks, view dependencies, and use limited assignment actions. |
| **Vendor** | View and checkpoint only explicitly available work. |

## Permission categories

The role editor groups independent permissions by domain:

- **Assets** - View all, create, update, delete, and manage dependencies
- **Assignments** - Assign and unassign work
- **Collections** - View all, create, update, and delete
- **Users** - Add or remove project collaborators, change collaborator roles, and manage role definitions
- **Status** - View completed work, change status, and set Done or Retake
- **Templates** - Create, update, and delete templates
- **Checkpoints** - View, create, delete, and pull checkpoint content
- **Sharing** - Manage share links
- **Project configuration** - Manage collection types, asset types, dependency types, statuses, tags, workflows, and general project settings
- **Integrations** - Manage project integrations

This separation allows a role to change a collaborator's assigned role without also editing the role definitions themselves, or to manage tags without gaining access to every project setting.

Some project configuration permissions may exist before a corresponding settings screen is available. They keep authorization explicit as those management tools are added.

<!-- TODO: screenshot of Edit Role modal showing permission toggles -->

## Managing roles

Creating, editing, duplicating, and deleting role definitions requires **Manage Roles** permission.

In **Project Settings > Roles**:

1. Click **Add Role**, or hover an existing role and choose Edit or Duplicate.
2. Enter a name and select its permissions.
3. Click **Create** or **Update**.

Existing collaborators with an edited role receive the new permissions immediately. The fixed Admin role cannot be edited, duplicated, or deleted.

## Assigning roles to collaborators

Adding or removing project collaborators and changing their assigned role are separate from managing role definitions.

To add someone:

1. Open **Project Settings > Collaborators**.
2. Click **Add Collaborator**.
3. Search by name or email.
4. Choose a role in the role selector.
5. Click **Add**.

To change someone's role later, select their current role in the collaborators list and choose another. This requires **Change Role** permission, while changing the available role definitions requires **Manage Roles**.

## Settings access

Project Settings only shows management areas the current role can use. For example:

- **Tags** requires Manage Tags.
- **Roles** requires Manage Roles.
- **Asset Types** requires Manage Asset Types.
- **Collection Types** requires Manage Collection Types.
- **Workflows** requires Manage Workflows.
- **Ignore List** and other general configuration require Manage Project Settings.
- **Integrations** require Manage Integrations.

The exact tabs available can vary as new project configuration tools are introduced.

## Visibility and operation permissions

The role editor labels the visibility controls **View All Assets** and **View All Collections** to distinguish broad project visibility from access through assignments, dependencies, and Shared collections.

Shared collections make common resources available to collaborators. Assignments and their dependencies provide access to the work a collaborator needs. Review the role's visibility settings alongside those relationships when configuring restricted access.

Seeing an item does not automatically grant permission to edit, delete, checkpoint, or manage its dependencies. Those operations have separate requirements, which also apply to keyboard shortcuts and Agent actions.

## Compatibility with older studios

Granular project-management permissions require the **project permissions** capability provided by API v2. When connected through API v1, Clustta keeps the established permissions available but does not expose the newer project configuration controls.

Update both Clustta Desktop and the Studio server to use these permissions. See [Project Compatibility](../reference/project-compatibility.md) for details.

## Server-enforced permissions

The Studio server is the source of truth for project roles, permissions, and membership. It checks the authenticated user's current permissions for mutations and synchronization rather than trusting a local project database.

- **Operations are authorized server-side.** The server checks the user's current role before accepting project changes.
- **Tampered changes are rejected.** Local edits that exceed the user's permissions are refused and reconciled with server state.
- **Newer permissions are preserved.** When an API v1 client synchronizes, the server keeps the API v2 permission fields that the older client cannot represent.
- **Visibility affects transfer.** The server only sends content the user is entitled to receive through visibility, assignments, dependencies, or Shared collections.

Editing a local `.clst` archive does not grant additional server access.

## Best practices

- Start with the default roles and customize them only when the workflow requires it.
- Keep **Change Role** and **Manage Roles** limited to people responsible for access policy.
- Grant project configuration permissions independently instead of giving broad administrative access.
- Be sparing with delete permissions.
- Keep at least two project Admins so the team cannot be locked out.

## Audit & accountability

Checkpoints record their author, so committed asset changes are traceable to a user.

A full audit log for assignment, status, and settings changes is planned for the Enterprise tier. Until then, checkpoint authorship is the primary accountability signal.
