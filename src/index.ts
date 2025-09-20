import { discordClient } from './discord/client.ts';
import { DISCORD_TOKEN } from './config/index.ts';

import { ready } from './discord/events/ready.ts';
import { interactionCreate } from './discord/events/interactionCreate.ts';

import { Events } from 'discord.js';

discordClient.once(Events.ClientReady, (client) => {
  ready.execute(client);
});

discordClient.on(Events.InteractionCreate, (interaction) => {
  interactionCreate.execute(interaction);
});

function shutdown(signal: string) {
  console.log(`\n⚠️  Received ${signal}, shutting down gracefully...`);
  discordClient.destroy();
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

discordClient.login(DISCORD_TOKEN).catch((err) => {
  console.error("❌ Failed to login:", err);
});
