# Self-Hosting

Run your own Clustta studio server on your own infrastructure.

This is the **Dedicated** studio mode - the Studio server deployed on infrastructure you own. Run it as a Docker service on Linux or install the native Windows server. Self-hosting is fully supported, fully open-source, and a first-class deployment target.

## When you should self-host

Self-hosting makes sense if any of these apply:

- You handle IP-sensitive client work and contracts require on-prem storage.
- You're behind a corporate firewall or in an air-gapped facility.
- You want full control over data residency and backups.
- You have predictable, large transfer volumes and want to avoid metered cloud bandwidth.
- You're already running a homelab or VPS and prefer to keep services there.

If none of those apply, [ClusttaCloud™](./studios.md) is faster to set up and we run it for you.

## What you'll need

- 2+ CPU cores
- 4 GB+ RAM
- Disk space sized to your projects
- Port `7774` open for a standalone server, or ports `80` / `443` when using a reverse proxy
- One of these hosts:
  - A 64-bit Windows host for the native installer
  - A Linux host, preferably Ubuntu or Debian, with Docker
- Optional: a domain name pointing at the host for HTTPS

## Hosting modes

The studio server can authenticate users two ways:

| Mode | Auth source | When to use |
|------|-------------|-------------|
| **Cloud-connected** | Clustta global auth server | Easiest. Users sign in with their existing Clustta accounts. The studio appears in their app's switcher automatically. |
| **Private** | A local user database on your server | Fully air-gapped. Zero outbound dependency on Clustta. You manage your own users. |

Both authentication modes are available in the Windows binary and Docker image. The Windows installer writes the choice to `studio_config.json`; Docker deployments use the `PRIVATE` environment variable.

---

## Install on Windows

Run the Clustta Studio Windows installer and complete the server configuration wizard. The installer creates the data directories and writes `studio_config.json` beside the server executable. New installations start in **console** mode, and upgrades preserve the existing Windows UI mode.

Start Clustta Studio from its Start Menu shortcut. Unless you changed the port during installation, clients can connect at `http://<machine-ip>:7774`.

### Windows UI modes

The native Windows server supports three UI modes:

| Mode | Behavior | Best for |
|------|----------|----------|
| **Console** | Shows the server console and provides a system tray icon. | Initial setup and active troubleshooting. |
| **Tray** | Hides the console and provides a system tray icon with Restart and Quit actions. | A server running in a signed-in desktop session. |
| **Headless** | Runs without a console or tray icon. | Unattended operation managed outside the app. |

Set the mode in `studio_config.json`:

```json
{
  "windows_ui_mode": "tray"
}
```

You can instead set `WINDOWS_UI_MODE` to `console`, `tray`, or `headless`. The environment variable overrides the JSON setting. Restart the server after changing the mode.

The setting is ignored on non-Windows hosts. An invalid value falls back to console behavior. Windows builds append logs to `studio_server.log` in the installation directory, including when the server is running headless.

---

## One-line Linux install (recommended)

The fastest way to get a Clustta studio server running. The script installs Docker if missing, downloads the right Compose file, walks you through configuration, and starts the container.

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/install.sh | bash
```

### Install options

| Flag | Description |
|------|-------------|
| `--private` | Skip ClusttaCloud™ setup (standalone/air-gapped mode) |
| `--traefik` | Include Traefik reverse proxy with auto-TLS |
| `--dir PATH` | Custom install directory (default: `~/clustta-studio`) |
| `--version VER` | Pin a specific image version (default: `latest`) |

Example - private mode with Traefik (auto-HTTPS):

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/install.sh | bash -s -- --private --traefik
```

### Where to reach your server

::: info With `--traefik`
Clustta is served over HTTPS at the domain you point at the host (e.g. `https://studio.yourdomain.com`).

- Make sure your domain's DNS A record points at the machine's public IP and that ports `80` / `443` are open before running the script.
- **On the same machine / WSL:** Reach it locally at `http://127.0.0.1/clustta`. The `/clustta` path is how Traefik knows to route the request to the container's `clustta` label. If you changed Traefik's port, include it - e.g. `http://127.0.0.1:81/clustta` - and make sure that port is open on the machine. From Windows talking to a WSL host, use the WSL distro's IP (run `hostname -I` inside WSL) - e.g. `http://172.20.10.3/clustta` - since `localhost` may not forward to WSL automatically.
:::

::: info Without `--traefik` (standalone)
Clustta is served over HTTP at `http://<machine-ip>:7774`.

- **On the same machine / WSL:** Reach it locally at `http://localhost:7774`. From Windows talking to a WSL host, use the WSL distro's IP (run `hostname -I` inside WSL) - e.g. `http://172.20.10.3:7774` - since `localhost` may not forward to WSL automatically.
:::

::: tip Port conflicts
If another service is already using a required port (`80` / `443` with Traefik, or `7774` standalone), edit the port mapping in `docker-compose.yml` (in your install directory) and run `docker compose up -d` to apply the change.
:::

After installation, manage your server with:

```bash
cd ~/clustta-studio
docker compose logs -f                         # view logs
docker compose restart                         # restart
docker compose down                            # stop
docker compose pull && docker compose up -d    # update
```

---

## Manual Docker install

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

**Standalone** - no reverse proxy. Use this if you have your own nginx/Caddy in front, or you're on a LAN:

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/deploy/docker-compose.yml -o docker-compose.yml
```

**With Traefik** - built-in reverse proxy with automatic Let's Encrypt TLS:

```bash
curl -fsSL https://raw.githubusercontent.com/eaxum/clustta-studio/main/deploy/docker-compose.traefik.yml -o docker-compose.yml
```

### 3. Configure environment

Create a `.env` file next to your `docker-compose.yml`:

```env
HOST_DATA_DIR=./data
HOST_PROJECTS_DIR=./projects
HOST_STORAGE_DIR=./storage
STUDIO_USERS_DB=/var/data/studio_users.db
SESSION_DB=/var/data/sessions.db
PRIVATE=true
```

`HOST_DATA_DIR`, `HOST_PROJECTS_DIR`, and `HOST_STORAGE_DIR` are paths on the Docker host. The Compose file mounts them into the container's data, project, and Deflated-blob directories. The older `DATA_FOLDER`, `PROJECTS_FOLDER`, and `STORAGE_FOLDER` names remain supported for compatibility.

Set `HOST_STORAGE_DIR` to the disk or volume where Deflated project blobs should live. For example:

```env
HOST_STORAGE_DIR=/media/clustta/storage
```

For a native, non-Docker deployment, use `STORAGE_DIR` to configure the server storage directory directly. If no usable storage directory is configured, you can still use Compact, but Deflated will not appear as an option. Object Storage is the third storage mode and is coming soon.

If you want to **connect to ClusttaCloud™** (so users can sign in with existing Clustta accounts), set `PRIVATE=false` and add:

```env
CLUSTTA_STUDIO_API_KEY=YourStudioKey
CLUSTTA_SERVER_NAME=YourStudioName
CLUSTTA_SERVER_URL=https://your-host-domain
```

The `StudioKey` is generated when you click **Create Studio > Dedicated** in the desktop client. See [Studios & Collaboration](./studios.md).

### 4. Start the server

```bash
mkdir -p data projects storage
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
You may need to make the projects and storage directories writable by the container:

```bash
sudo chmod a+w ./projects/ ./storage/
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

For Docker, back up all three server data locations:

- The `./data` directory - sessions, user database, server state.
- The `./projects` directory - every project's `.clst` metadata database and, for Compact projects, its file chunks.
- The `./storage` directory - file blobs for Deflated projects.

A Compact project can be recovered from its `.clst` archive. A Deflated project requires both its `.clst` archive and the matching external blobs, so snapshot the projects and storage directories together. A nightly `rsync` or `restic` snapshot of all three locations provides a complete disaster-recovery set.

On Windows, use the paths recorded in `studio_config.json`. Back up the configured project directory and the server data stored with the installation. Include the configured external storage directory when using Deflated storage.

## Updating

On Windows, run the newer installer over the existing installation. The installer preserves the configured Windows UI mode. For Docker:

```bash
cd ~/clustta-studio
docker compose pull
docker compose up -d
```

Clustta Desktop and the Studio server negotiate the highest API version they both support. Older installations use the API v1 compatibility baseline, while API v2 enables versioned dependencies and granular project-management permissions.

After updating, reconnect the desktop app and open **Studio Settings** to confirm the server version, negotiated API, supported APIs, and project schema. Update both components when you need a feature that is unavailable in their shared API. See [Project Compatibility](../reference/project-compatibility.md).

## Troubleshooting

| Symptom | Likely cause |
|---------|--------------|
| Client can't reach the server | Firewall, wrong URL, or DNS not pointing at the host |
| TLS errors | Traefik couldn't reach Let's Encrypt - check ports 80/443 are open and your domain resolves |
| Permission denied writing projects | Run `sudo chmod a+w ./projects/` |
| Deflated is unavailable | Configure `HOST_STORAGE_DIR`, create the directory, and make it writable by the container |
| Permission denied writing Deflated blobs | Run `sudo chmod a+w ./storage/` or correct the permissions on your custom storage path |
| Users can't sign in (cloud-connected) | `CLUSTTA_STUDIO_API_KEY` is wrong, or the Clustta global server can't reach your `CLUSTTA_SERVER_URL` |
| Windows console is not visible | Check `windows_ui_mode`; `tray` hides the console and `headless` disables both console and tray |
| Windows tray icon is missing | `headless` mode intentionally has no tray icon; change the mode and restart if interactive controls are needed |
| Need logs from a Windows server | Open `studio_server.log` in the installation directory |
| New dependency or permission controls are missing | Check the negotiated API in Studio Settings; these controls require API v2 on both the desktop client and server |
| Server returns `426 Upgrade Required` | The client and server have no API version in common; update the older component and reconnect |

For more, file an issue at [github.com/eaxum/clustta-studio](https://github.com/eaxum/clustta-studio/issues).

## What's next

- [Studios & Collaboration](./studios.md) - set up users and projects on your new server
- [Architecture / Security](../architecture/security.md) - how data is protected on the wire and at rest
