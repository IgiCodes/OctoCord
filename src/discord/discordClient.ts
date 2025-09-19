import { Client, GatewayIntentBits } from 'discord.js';

export const DiscordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});
