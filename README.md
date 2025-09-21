<p align="center">
  <img src="./assets/OctoCord-logo.svg" alt="OctoCord Logo" width="256"/>
</p>

# OctoCord

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D24-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IgiCodes/OctoCord/pulls)

Bridge your GitHub issues and Discord discussions.  
Create, sync, and manage GitHub issues directly from a Discord forum channel.  

---

## ✨ Features

- Interactive GitHub issue creation from Discord  
- Label selection synced from GitHub  
- Organized command structure with subcommands (`/utils`, `/github …`)  
- Automatic linking between GitHub issues and Discord threads (coming soon)  
- TypeScript + [discord.js](https://github.com/discordjs/discord.js) + [Octokit](https://github.com/octokit/rest.js)  
- Explicit, strongly typed event/command registration  
- GitHub App authentication (short-lived installation tokens, no personal PATs)

## 📜 Commands

| Command                | Description                                        |
|-------------------------|----------------------------------------------------|
| `/utils ping`          | Sanity check — replies with "🏓 Pong!"             |
| `/github issues create` | Opens a modal to create a GitHub issue with title, description, and labels populated from the repo |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 24+ (managed via [mise](https://mise.jdx.dev/) in this repo)  
- A Discord Application with a bot user  
- A GitHub App installed on your repo with **Issues (read & write)** + **Metadata (read-only)** permissions  

### Setup

Clone the repo and install dependencies:

```sh
git clone https://github.com/IgiCodes/OctoCord.git
cd OctoCord
mise install
pnpm install
```

Copy the example env config and fill in your secrets:

```sh
cp mise.example.toml mise.local.toml
```

Update the values inside with:
- **Discord** → bot token, app ID, guild ID  
- **GitHub App** → app ID, installation ID, PEM private key (string form), repo owner, repo name  

---

## 🚀 Development

Run the bot in dev mode:

```sh
mise run dev
```

Register slash commands with Discord:

```sh
mise run register-commands
```

Build for production:

```sh
mise run build
```

Start compiled bot:

```sh
mise run start
```

---

## 🐳 Docker

The project includes a ready-to-use `Dockerfile` and `compose.yml`.  
Docker workflows are integrated into `mise` tasks.

### Build & Run with Docker

Bring up the bot in Docker (generates `.env` automatically):

```sh
mise run docker-up
```

Start the bot in detached mode:

```sh
mise run docker-start
```

Stop and remove containers:

```sh
mise run docker-down
```

View logs from the running container:

```sh
mise run docker-logs
```

Rebuild the image manually (without running):

```sh
mise run docker-build
```

### Environment Variables

- A `.env` file is generated from `mise` tasks (`mise run generate-env`).  
- The `.env` file is mounted automatically into the container by `compose.yml`.  
- Secrets (Discord token, GitHub keys, etc.) are pulled from this file.

### Healthcheck

The container exposes a health endpoint:

```
GET /healthz
```

Docker Compose uses this for automatic restart if the bot crashes.

### Register Slash Commands in Docker

To push commands to Discord from inside the container:

```sh
mise run docker-register-commands
```

This will execute dist/utils/registerCommands.js within the running container.

---

## 📂 Project Structure

- `src/config/` → Environment variable loading & config  
- `src/discord/` → Discord client, commands, events, handlers  
- `src/github/` → GitHub App client  
- `src/storage/` → Data storage layer (currently in-memory, future: SQLite, etc.)
- `src/index.ts` → Main bot entrypoint  
- `src/registerCommands.ts` → Script to register slash commands
- `assets/` → Logo and static assets (bundled into Docker image)

---

## ⚙️ Environment Variables

| Variable                     | Required | Default | Description                                                                 |
| ---------------------------- | -------- | ------- | --------------------------------------------------------------------------- |
| `PORT`                       | Yes      | *none*  | Internal port the bot listens on (healthcheck endpoint runs here).          |
| `HOST_PORT`                  | Yes      | *none*  | Host machine port mapped via Docker Compose.                                |
| `DISCORD_TOKEN`              | Yes      | *none*  | Bot token from your Discord application.                                    |
| `DISCORD_APP_ID`             | Yes      | *none*  | Discord application ID.                                                     |
| `DISCORD_PUBLIC_KEY`         | Yes      | *none*  | Discord app public key (used for interactions/webhooks).                    |
| `DISCORD_GUILD_ID`           | No       | unset   | Guild/server ID for development — if not set, commands register globally.   |
| `GITHUB_APP_ID`              | Yes      | *none*  | GitHub App ID.                                                              |
| `GITHUB_APP_INSTALLATION_ID` | Yes      | *none*  | Installation ID of the GitHub App on your repo/org.                         |
| `GITHUB_APP_PRIVATE_KEY_PEM` | Yes      | *none*  | Private key string for the GitHub App (PEM contents).                       |
| `GITHUB_OWNER`               | Yes      | *none*  | GitHub org or username that owns the repo.                                  |
| `GITHUB_REPO`                | Yes      | *none*  | GitHub repo name.                                                           |
| `DRY_RUN`                    | No       | `false` | If `true`, simulate command registration without sending to Discord.        |
| `DEBUG_PAYLOAD`              | No       | `false` | If `true`, logs the JSON payload sent to Discord during registration.       |
| `FORCE_GLOBAL`               | No       | `false` | If `true`, forces commands to register globally even if `DISCORD_GUILD_ID`. |

---

## 🔒 Security

- Secrets (`.env`, `mise.local.toml`, PEM key) are **never committed** — check `.gitignore`.  
- GitHub App credentials are short-lived installation tokens, not long-lived PATs.  
- Webhook secret support planned (to verify incoming GitHub → Discord events).  

---

## 🗺️ Roadmap

- [ ] Sync issue comments → Discord forum thread  
- [ ] Sync thread replies → GitHub issue comments  
- [ ] Support closing/reopening issues from Discord  
- [ ] Support multiple repos per server  
- [ ] CI/CD deployment recipe  

---

## 🤝 Contributing

PRs welcome! Feel free to file an issue if you want to help out.  

---

## 📜 License

GPL 3.0 © [IgiCodes](https://github.com/IgiCodes)  
