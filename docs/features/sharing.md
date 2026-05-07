# Sharing

Sometimes you need to send a file to someone outside the project — a client reviewing a render, a vendor receiving a deliverable, a collaborator who isn't on Clustta. **Shareable download links** make this safe and simple, without giving up any control.

Think of it as a WeTransfer link — but tied to a specific checkpoint, time-limited, and revocable.

## How it works

1. Pick a specific checkpoint of an asset.
2. Generate a download link.
3. Send the link to anyone — they download the file in their browser.
4. Optionally set an expiry; once it passes, the link stops working.
5. Revoke at any time.

The recipient does **not** need a Clustta account, doesn't need to install anything, and never sees any other part of your project.

## Creating a share link

1. Select an asset.
2. Open the checkpoint history in the details pane.
3. Right-click the checkpoint you want to share → **Create Share Link** (or click the share icon).
4. (Optional) Set an expiry duration (e.g. 24 hours, 7 days, never).
5. Copy the URL.

<!-- TODO: screenshot of Create Share Link dialog -->

The link points to a download endpoint on your studio server. When opened, the recipient sees a simple download page with the file name, size, and a download button.

## What's on the other end

When someone opens the link they get:

- The file name
- The file size
- A download button
- Optionally a note from you

That's it. No project tree, no other assets, no metadata about the project, no way to navigate anywhere else.

## Managing existing share links

In the project, open **Project Settings → Share Links** (or the equivalent shares panel) to see every active link, who created it, when it expires, and how many downloads it's had.

From there you can:

- **Revoke** — Immediately disable the link. The URL stops working.
- **Extend** — Push the expiry further into the future.
- **View stats** — See download count and last-accessed time.

## Security notes

- Links are **opaque, unguessable URLs** (long random tokens). They can't be brute-forced.
- Links carry **no authentication context** beyond the token — possession of the URL is access. Treat them like passwords; don't paste them in public channels.
- For studios with stricter requirements, set short expiries by default and revoke after delivery.
- The transport is **HTTPS** when using a TLS-terminated studio server (Traefik, custom nginx). Always run production studio servers behind TLS.

See [Architecture / Security](../architecture/security.md) for the full transport security picture.

## Use cases

- **Client review** — Drop a checkpoint of a render, share the link to the client, set 7-day expiry. They review, give notes, you revoke after.
- **Vendor handoff** — Outsourcing a piece of work to a non-Clustta vendor. Share the source files. They send finals back via your normal IO process.
- **Quick handoff to non-team-member** — A producer needs a file urgently for a meeting. Faster than onboarding them.
- **External reviewer who doesn't need an account** — Share each WFA checkpoint as it lands.

## What share links are not

- They are **not** a substitute for a project collaborator. If someone needs ongoing access or to upload back, add them to the project.
- They are **not** end-to-end encrypted. Treat them as you would any sensitive download URL.
- They **don't** support live updates. Each link is for one specific checkpoint of one specific asset. New work needs a new link.
