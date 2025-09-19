import 'dotenv/config';

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? '';
export const DISCORD_APP_ID = process.env.DISCORD_APP_ID ?? '';
export const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY ?? '';
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID ?? '';
export const GITHUB_APP_ID = process.env.GITHUB_APP_ID ?? '';
export const GITHUB_APP_INSTALLATION_ID = process.env.GITHUB_APP_INSTALLATION_ID ?? '';
export const GITHUB_APP_PRIVATE_KEY_PATH = process.env.GITHUB_APP_PRIVATE_KEY_PATH ?? '';
export const GITHUB_OWNER = process.env.GITHUB_OWNER ?? '';
export const GITHUB_REPO = process.env.GITHUB_REPO ?? '';


if (!DISCORD_TOKEN) throw new Error('Missing DISCORD_TOKEN in env');
if (!DISCORD_APP_ID) throw new Error('Missing DISCORD_APP_ID in env');
if (!DISCORD_PUBLIC_KEY) throw new Error('Missing DISCORD_PUBLIC_KEY in env');
if (!DISCORD_GUILD_ID) throw new Error('Missing DISCORD_GUILD_ID in env');
if (!GITHUB_APP_ID) throw new Error('Missing GITHUB_APP_ID in env');
if (!GITHUB_APP_INSTALLATION_ID) throw new Error('Missing GITHUB_APP_INSTALLATION_ID in env');
if (!GITHUB_APP_PRIVATE_KEY_PATH) throw new Error('Missing GITHUB_APP_PRIVATE_KEY_PATH in env');
if (!GITHUB_OWNER) throw new Error('Missing GITHUB_OWNER in env');
if (!GITHUB_REPO) throw new Error('Missing GITHUB_REPO in env');
