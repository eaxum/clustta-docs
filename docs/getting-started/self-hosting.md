# Self-Hosting

Run your own Clustta studio server. Your projects, your hardware, your control.

This is the **Dedicated** studio mode — same Docker image we ship for Clustta Cloud, deployed on infrastructure you own. Self-hosting is fully supported, fully open-source, and a first-class deployment target.

## When you should self-host

Self-hosting makes sense if any of these apply:

- You handle IP-sensitive client work and contracts require on-prem storage.
- You're behind a corporate firewall or in an air-gapped facility.
- You want full control over data residency and backups.
- You have predictable, large transfer volumes and want to avoid metered cloud bandwidth.
- You're already running a homelab or VPS and prefer to keep services there.

If none of those apply, [Clustta Cloud](./studios.md) is faster to set up and we run it for you.

## What you'll need

- A Linux host (Ubuntu/Debian recommended) with:
  - 2+ CPU cores
  - 4 GB+ RAM
  - Disk space sized to your projects (chunked storage helps a lot)
  - Ports `80` / `443` open (with Traefik) or `7774` (standalone)
- Docker (the install script sets this up if needed)
- Optional: a domain name pointing at the host (for HTTPS via Traefik)

## Hosting modes

The studio server can authenticate users two ways:

| Mode | Auth source | When to use |
|------|-------------|-------------|
| **Cloud-connected** | Clustta global auth server | Easiest. Users sign in with their existing Clustta accounts. The studio appears in their app's switcher automatically. |
| **Private** | A local user database on your server | Fully air-gapped. Zero outbound dependency on Clustta. You manage your own users. |

Both modes use the same Docker image — you toggle the difference with one env var (`PRIVATE`).

---

## One-line install (recommended)

The fastest way to get a Clustta studio server running. The script installs Docker if missing, downloads the right Compose file, walks you through configuration, and starts the container.

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/install.sh | bash
```

### Install options

| Flag | Description |
|------|-------------|
| `--private` | Skip Clustta Cloud setup (standalone/air-gapped mode) |
| `--traefik` | Include Traefik reverse proxy with auto-TLS |
| `--dir PATH` | Custom install directory (default: `~/clustta-studio`) |
| `--version VER` | Pin a specific image version (default: `latest`) |

Example — private mode with Traefik (auto-HTTPS):

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/install.sh | bash -s -- --private --traefik
```

After installation, manage your server with:

```bash
cd ~/clustta-studio
docker compose logs -f                         # view logs
docker compose restart                         # restart
docker compose down                            # stop
docker compose pull && docker compose up -d    # update
```

---

## Manual install with Docker

If you prefer to do it yourself or you're on an OS the script doesn't support:

### 1. Install Docker

Skip if you already have Docker. On Debian/Ubuntu:

```bash
sudo apt update && sudo apt upgrade -y \
  && sudo apt install -y apt-transport-https ca-certificates curl software-properties-common \
  && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - \
  && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  && sudo apt update && sudo apt install -y docker-ce \
  && sudo systemctl enable docker \
  && sudo usermod -aG docker $USER
```

Re-login (or `newgrp docker`) so your user can run Docker without `sudo`.

### 2. Set up the project directory

```bash
mkdir clustta-studio && cd clustta-studio
```

Pick one of two Compose files:

**Standalone** — no reverse proxy. Use this if you have your own nginx/Caddy in front, or you're on a LAN:

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/deploy/docker-compose.yml -o docker-compose.yml
```

**With Traefik** — built-in reverse proxy with automatic Let's Encrypt TLS:

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/deploy/docker-compose.traefik.yml -o docker-compose.yml
```

### 3. Configure environment

Create a `.env` file next to your `docker-compose.yml`:

```env
DATA_FOLDER=./data
PROJECTS_FOLDER=./projects
STUDIO_USERS_DB=/var/data/studio_users.db
SESSION_DB=/var/data/sessions.db
PRIVATE=true
```

If you want to **connect to Clustta Cloud** (so users can sign in with existing Clustta accounts), set `PRIVATE=false` and add:

```env
CLUSTTA_STUDIO_API_KEY=YourStudioKey
CLUSTTA_SERVER_NAME=YourStudioName
CLUSTTA_SERVER_URL=https://your-host-domain
```

The `StudioKey` is generated when you click **Create Studio → Dedicated** in the desktop client. See [Studios & Collaboration](./studios.md).

### 4. Start the server

```bash
mkdir -p data projects
docker compose up -d
```

Check the logs:

```bash
docker compose logs -f
```

### 5. Open the firewall

Make sure the right ports are reachable:

- **With Traefik:** `80` and `443`
- **Standalone:** `7774`

```bash
sudo ufw allow 80,443/tcp     # Traefik
# or
sudo ufw allow 7774/tcp        # standalone
```

::: warning Permissions
You may need to make the projects directory writable by the container:

```bash
sudo chmod a+w ./projects/
```
:::

---

## Connect a client

Once the server is running:

1. In the desktop app, click the studio switcher dropdown.
2. Choose **Add Studio**.
3. Enter your studio's URL (e.g. `https://studio.your-domain.com` or `http://192.168.1.50:7774`).
4. Sign in with your Clustta account (cloud-connected) or local credentials (private mode).

Your studio now appears in the switcher and you can start creating projects.

## Backups

Two things to back up:

- The `./data` directory — sessions, user database, server state.
- The `./projects` directory — all `.clst` project files. **This is the irreplaceable part.**

A nightly `rsync` or `restic` snapshot of these two folders is enough for a complete disaster-recovery story. Because each project is a single SQLite file, backup is mechanically simple.

## Updating

```bash
cd ~/clustta-studio
docker compose pull
docker compose up -d
```

Studio server releases are backwards-compatible with current desktop clients within the same major version.

## Troubleshooting

| Symptom | Likely cause |
|---------|--------------|
| Client can't reach the server | Firewall, wrong URL, or DNS not pointing at the host |
| TLS errors | Traefik couldn't reach Let's Encrypt — check ports 80/443 are open and your domain resolves |
| Permission denied writing projects | Run `sudo chmod a+w ./projects/` |
| Users can't sign in (cloud-connected) | `CLUSTTA_STUDIO_API_KEY` is wrong, or the Clustta global server can't reach your `CLUSTTA_SERVER_URL` |

For more, file an issue at [github.com/eaxum/clustta-studio](https://github.com/eaxum/clustta-studio/issues).

## What's next

- [Studios & Collaboration](./studios.md) — set up users and projects on your new server
- [Architecture / Security](../architecture/security.md) — how data is protected on the wire and at rest
