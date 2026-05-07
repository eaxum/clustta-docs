# Studios & Collaboration

Personal projects live on your machine and can optionally sync via ClusttaCloud™ between your own computers or with a few collaborators. To work as a team, you'll want a **studio** - a team-level container with its own users, roles and project list - or a **remote project** hosted on a ClusttaCloud™ subscription.

## Studio modes

You can use Clustta in three different studio modes:

| Mode | Where it runs | Best for |
|------|---------------|----------|
| **Personal** | Your machine, with optional ClusttaCloud™ sync | Solo work, experiments, drafts |
| **Cloud** | Managed by Clustta | Studios and teams who don't want to run their own servers |
| **Dedicated** | Your own infrastructure | Studios with IP, compliance or air-gapped requirements |

Cloud and Dedicated studios both support the same features. Dedicated gives you full control of where data lives - including fully air-gapped deployments with no outbound dependency on Clustta.

## Create a studio

### Cloud studio

Cloud studios can be created from either the **desktop app** or the **web dashboard** at [app.clustta.com](https://app.clustta.com).

1. Click **Create Studio** at the top-left.
2. Enter a name and pick a ClusttaCloud™ plan.
3. Click **Create**.

The studio is provisioned on Clustta's infrastructure and ready to use immediately.

<!-- TODO: screenshot of Create Studio dialog -->

### Dedicated (self-hosted) studio

For a self-hosted ("private") studio:

1. Install and run the studio server on your own infrastructure - see [Self-hosting](./self-hosting.md) for the full deploy guide ([clustta-client](https://github.com/eaxum/clustta-client) + [clustta-studio](https://github.com/eaxum/clustta-studio)).
2. In the desktop app, choose **Login to a private server** and point it at your studio server's address.
3. Sign in with the credentials configured on the server.

No ClusttaCloud™ account is required. The studio is fully self-contained and can run completely air-gapped.

## Add collaborators to the studio

Adding someone to a studio gives them an account-level relationship with the studio (so they can be added to projects). It does **not** automatically grant access to any project.

This is done from **Studio Settings** - the small settings button at the top-left of the app, next to the studio name (works on both desktop and web).

1. Click **Studio Settings** and switch to the **Collaborators** tab.
2. Click **Add Collaborator** to open the input modal.
3. Type a user's email and press **Spacebar** or **Comma** to add it as a chip. Repeat for as many users as you want.
4. Pick a **studio role**:
   - **Admin** - Full administrative access. Can add/remove collaborators and create/delete projects.
   - **User** - Basic access. Can only see projects they've been explicitly added to.
5. Click **Add**. Users without a Clustta account will receive an invitation email.

<!-- TODO: short video of opening Studio Settings, switching to Collaborators tab, adding emails as chips, and assigning a role -->

## Add collaborators to a project

Once a user is in the studio, you can add them to specific projects (from either the desktop app or the web dashboard):

1. Open the project.
2. Click the **Settings** icon at the top-right of the browser.
3. Switch to the **Collaborators** tab → **Add Collaborator**.
4. Search by name or email and pick a **project role**.
5. Click **Add**.

You can add multiple collaborators at once by separating emails with commas.

Each project has its own set of roles. Six defaults ship out of the box (Admin, Production Manager, Supervisor, Assistant Supervisor, Artist, Vendor) and you can add, remove or edit them freely (except **Admin**, which is fixed). Read more in [Roles & Permissions](../features/roles-and-permissions.md).

## Switching studios

The studio switcher is the dropdown at the top-left (showing your current studio). Click it to switch between Personal, Cloud, and any Dedicated studios you have access to. Available on both the desktop app and the web dashboard.

## Working together - the day to day

Once you're set up:

1. Someone with **`create-project`** rights creates a project on the server.
2. Each collaborator opens the project from their app and clicks **Download Project** to clone it locally.
3. Work proceeds normally - assignments dictate who can checkpoint what; sync moves new checkpoints up and down.

For more on the collaboration mechanics, see:

- [Assignments & Statuses](../features/assignments-and-statuses.md)
- [Sync & Conflict Resolution](../features/sync-and-conflicts.md)
- [Sharing files with externals](../features/sharing.md)
