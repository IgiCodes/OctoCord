import 'dotenv/config';

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? '';
export const DISCORD_APP_ID = process.env.DISCORD_APP_ID ?? '';
export const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY ?? '';
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID ?? '';


if (!DISCORD_TOKEN) throw new Error('Missing DISCORD_TOKEN in env');
if (!DISCORD_APP_ID) throw new Error('Missing DISCORD_APP_ID in env');
if (!DISCORD_PUBLIC_KEY) throw new Error('Missing DISCORD_PUBLIC_KEY in env');
if (!DISCORD_GUILD_ID) throw new Error('Missing DISCORD_GUILD_ID in env');
