# Security

Protecting your intellectual property is one of the most important responsibilities Clustta takes on. This page lays out the controls and design choices that protect your data — at rest, on the wire, and in collaboration.

## How Clustta protects your work

Clustta's security model rests on three pillars:

1. **Architecture choices** that minimize trust required of any single component.
2. **Access controls** that gate operations and visibility to exactly who needs them.
3. **Operational practices** for the Clustta-managed cloud and self-host deployments.

## Architecture choices

### Local-first, no cloud requirement

Clustta is **fully functional offline**. Personal mode and Dedicated self-hosted studios don't require any outbound connection to Clustta's services.

- **Personal projects** never leave your machine.
- **Self-hosted studios in Private mode** have zero outbound dependency on Clustta. Air-gapped, behind a firewall, on a private LAN — all supported.
- **Cloud and cloud-connected modes** opt in to using Clustta's services. Even then, file *contents* are stored in your studio's object storage bucket; Clustta's global server only handles identity, billing and routing.

If Clustta vanished tomorrow, every collaborator would still have a complete working copy of every project they've cloned.

### Open source, auditable

Both the [client](https://github.com/eaxum/clustta-client) and [studio server](https://github.com/eaxum/clustta-studio) are AGPL v3. You can read every line of code that touches your data. For studios with compliance or contractual review requirements, this is decisive.

### Single-file projects

Projects are single SQLite files. This makes them:

- **Easy to back up and verify** — file hash, file copy, restore from copy.
- **Easy to inspect** — open in any SQLite browser to confirm what's actually stored.
- **Easy to delete completely** — one file, gone.

There's no opaque cloud blob soup to reason about.

### Content-addressed storage

Every chunk is identified by SHA-256 hash. This gives you:

- **Tamper detection** — A corrupted or modified chunk fails its hash check on read.
- **Integrity guarantees** — Reconstructed files are verified against the recorded hash before being returned to the user.
- **Predictable identity** — The same content always produces the same chunk; no hidden mutations.

## Access controls

### Authentication

Two supported modes:

- **Cloud-connected** — Users sign in with their Clustta account. The global server issues a session token; the studio server validates it. Sessions are scoped per studio.
- **Private mode** — The studio server holds its own user database. No outbound auth dependency. Suitable for air-gapped deployments.

Sessions are stored client-side in the **OS keyring** (Windows Credential Manager, macOS Keychain, Linux Secret Service) — not in plaintext config files.

### Per-project authorization

Adding a user to a studio does *not* grant access to any project. Each project explicitly lists its collaborators with per-project roles. Studio admins can create/delete projects; project membership is separate.

### Roles & permissions

Project access uses a granular, customizable role system. Permissions are independently toggle-able for:

- Viewing, creating, updating, deleting collections and assets
- Creating, deleting, reverting checkpoints
- Assigning and unassigning tasks
- Changing statuses
- Managing dependencies, templates, workflows
- Managing users and roles

The Admin role is fixed and cannot be deleted (always at least one Admin per project).

See [Roles & Permissions](../features/roles-and-permissions.md) for the full breakdown.

### Visibility ≠ permissions

Clustta separates *what you can see* from *what you can do*:

- **What you can see** is gated by **assignment** and **Library collections**. Even with broad role permissions, you can only see content assigned to you (recursively, through dependencies) or in collections marked as Library.
- **What you can do** with what you can see is gated by **role permissions**.

This means an artist with a permissive role still doesn't get to download every asset in the project — only the ones they're working on. Selective sync enforces the visibility rules at the bandwidth level too.

### Single ownership for tasks

Only one user is assigned to a Task at a time, and only the assignee can create checkpoints on it. This eliminates concurrent-edit races and produces a clean audit trail (every checkpoint has exactly one author).

## Transport security

### TLS everywhere in production

All client ↔ server communication should run over **HTTPS / TLS**. The Clustta Cloud and the recommended Traefik-based self-host deployment both terminate TLS using Let's Encrypt-issued certificates.

For self-hosted standalone deployments without Traefik, run a TLS-terminating reverse proxy (nginx, Caddy) in front. Production studio servers should never accept plaintext HTTP from the public internet.

### Object storage transport

For Cloud studios, chunk uploads and downloads use **presigned URLs** to Cloudflare R2. Properties:

- URLs are scoped to one operation (upload or download) and one chunk.
- URLs have short expiry windows (typically minutes).
- Direct client ↔ R2 transfer means the studio server never proxies file contents — reducing both attack surface and bandwidth bottlenecks.

### Share links

Shareable download links use **opaque, unguessable tokens** (long random strings). They:

- Cannot be brute-forced.
- Are revocable at any time from the project shares panel.
- Can be configured with an expiry window.
- Are gated by the studio server, not exposed directly from object storage.

Treat share links as you would treat passwords: don't post them in public channels.

## Data at rest

### Local

- The local `.clst` SQLite file lives in your user data directory.
- Working files live in the user-chosen working folder — these are regular files Clustta tracks but doesn't encrypt (your DCC tool needs to read them).
- Sessions and credentials live in the OS keyring.

If your local disk is encrypted (FileVault, BitLocker, LUKS), all of this is encrypted at rest. We strongly recommend full-disk encryption for any device storing studio work.

### Server (self-hosted)

- Project `.clst` files live in the configured `./projects/` directory on the host.
- Backup is **your responsibility** — `rsync`, `restic`, snapshots, etc.
- Encryption at rest depends on the host's disk configuration. For client work, encrypted volumes are recommended.

### Server (cloud)

- Project metadata lives in databases managed by Clustta with encryption at rest.
- Project chunks live in Cloudflare R2 buckets, encrypted at rest by R2.
- Identity and billing data is keyed by UUIDs to minimize information leakage in any individual record.

## Operational practices (Clustta Cloud)

For studios using Clustta's managed cloud:

- **Internal access is restricted.** Clustta employees don't routinely access customer data. Operational access is limited to incident response and explicitly logged.
- **Authentication is via the global server only.** Studio admins manage their own user roster; Clustta doesn't add or remove users without authorization.
- **Backups** of studio projects are run on a regular schedule. Exact retention can be confirmed for studio-tier customers under DPA.
- **Incidents** are responded to per a documented incident response process. Customers are notified directly when their data is affected.

For full, contractually-binding terms, refer to your studio's customer agreement.

## What you should do

Recommendations for studios using Clustta:

1. **Enable full-disk encryption** on every device with project files. This is the single biggest improvement to your data-at-rest posture.
2. **Run TLS** on any self-hosted studio server reachable from outside your LAN. Traefik makes this one flag.
3. **Review project roles** periodically. Strip unnecessary permissions; rotate Admin access when team composition changes.
4. **Use short share-link expiries** for client previews. Revoke after delivery.
5. **Back up `.clst` files** on a schedule. They're single files; backup tooling is straightforward.
6. **Self-host in Private mode** for IP-sensitive client work that contractually requires on-prem storage.
7. **Use the Ollama-backed AI agent** if you want zero cloud exposure for project metadata.

## Reporting security issues

If you find a security issue in Clustta, please report it privately rather than filing a public GitHub issue. Email security disclosures to **security@eaxum.com** or use GitHub's private vulnerability disclosure on the relevant repo.

We aim to acknowledge reports within two business days and ship fixes for confirmed issues as quickly as practical.
