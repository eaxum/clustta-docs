# Studios & Collaboration

Personal projects live on your machine forever. To work with other people, you need a **studio** — a team-level container with its own server, users, roles and project list.

## Studio modes

You can use Clustta in three different studio modes:

| Mode | Where it runs | Best for |
|------|---------------|----------|
| **Personal** | Your machine, fully offline | Solo work, experiments, drafts |
| **Cloud** | Managed by Clustta | Small teams who don't want to run servers |
| **Dedicated** | Your own infrastructure | Studios with IP, compliance or scale concerns |

Cloud and Dedicated studios both support the same features. Dedicated gives you full control of where data lives.

## Create a studio

You create studios from the **web dashboard** (the desktop app delegates this to the web).

1. Visit [app.clustta.com](https://app.clustta.com) and sign in.
2. Click **Create Studio** at the top-left.
3. Enter a name and pick a hosting mode:
   - **Cloud** — provisioned automatically by Clustta.
   - **Dedicated** — Clustta will give you a `StudioKey` to plug into your self-hosted server. See [Self-hosting](./self-hosting.md) for the deploy steps.
4. Click **Create**.

<!-- TODO: screenshot of Create Studio dialog -->

## Add collaborators to the studio

Adding someone to a studio gives them an account-level relationship with the studio (so they can be added to projects). It does **not** automatically grant access to any project.

1. In the web dashboard, switch to the **Collaborators** tab in your studio.
2. Click **Add Collaborator**.
3. Enter the user's email. If they don't have a Clustta account yet, an invitation email will be sent.
4. Pick a **studio role**:
   - **Admin** — Full administrative access. Can add/remove collaborators and create/delete projects.
   - **User** — Basic access. Can only see projects they've been explicitly added to.
5. Click **Add**.

<!-- TODO: screenshot of Manage Collaborators modal -->

## Add collaborators to a project

Once a user is in the studio, you can add them to specific projects from the desktop app:

1. Open the project.
2. Click the **Settings** icon at the top-right of the browser.
3. Switch to the **Collaborators** tab → **Add Collaborator**.
4. Search by name or email and pick a **project role** (Artist, Supervisor, Production Manager, Vendor, Admin, etc. — fully customizable).
5. Click **Add**.

You can add multiple collaborators at once by separating emails with commas.

## Roles and permissions

Each project has its own set of roles. Six defaults ship out of the box and you can add, remove or edit them freely (except **Admin**, which is fixed).

Permissions are granular and grouped by domain:

- **Assets** — view, create, update, delete, manage dependencies
- **Collections** — view, create, update, delete
- **Checkpoints** — create, delete, revert
- **Assignments** — assign, unassign
- **Status** — change status
- **Templates** — manage asset templates
- **Users** — manage project collaborators and roles

To configure roles, open **Project Settings → Roles**, hover a role to edit, or click **Add Role**.

<!-- TODO: screenshot of Edit Role modal -->

For deeper detail see [Roles & Permissions](../features/roles-and-permissions.md).

## Switching studios

In the desktop app, the studio switcher is the dropdown at the top-left (showing your current studio). Click to switch between Personal, Cloud, and any Dedicated studios you have access to.

## Working together — the day to day

Once you're set up:

1. Someone with create-project rights creates a project on the server.
2. Each collaborator opens the project from their app and clicks **Download Project** to clone it locally.
3. Work proceeds normally — assignments dictate who can checkpoint what; sync moves new checkpoints up and down.

For more on the collaboration mechanics, see:

- [Assignments & Statuses](../features/assignments-and-statuses.md)
- [Sync & Conflict Resolution](../features/sync-and-conflicts.md)
- [Sharing files with externals](../features/sharing.md)
