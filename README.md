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
- Automatic linking between GitHub issues and Discord threads (coming soon)  
- TypeScript + [discord.js v14](https://discord.js.org) + [Octokit](https://github.com/octokit/rest.js)  
- Explicit, strongly typed event/command registration  
- GitHub App authentication (short-lived installation tokens, no personal PATs)

## 📜 Commands

| Command          | Description                                      |
|------------------|--------------------------------------------------|
| /ping          | Sanity check — replies with "🏓 Pong!"            |
| /create-issue  | Opens a modal to create a GitHub issue with title and description, followed by a label selector |

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
- **GitHub App** → app ID, installation ID, PEM private key path, repo owner, repo name  

---

## 🚀 Development

Run the bot in dev mode:

```sh
mise run dev
```

Register slash commands with Discord:

```sh
mise run register
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

## 📂 Project Structure

- `src/config/` → Environment variable loading & config  
- `src/discord/` → Discord client, commands, events, handlers  
- `src/github/` → GitHub App client  
- `src/storage/` → Data storage layer (currently in-memory, future: SQLite, etc.)
- `src/index.ts` → Main bot entrypoint  
- `src/registerCommands.ts` → Script to register slash commands

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
