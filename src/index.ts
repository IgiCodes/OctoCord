import process from "process";
import { discordClient } from "./discord/client.ts";
import { DISCORD_TOKEN } from "./config/index.ts";
import { ready } from "./discord/events/ready.ts";
import { interactionCreate } from "./discord/events/interactionCreate.ts";
import { Events } from "discord.js";
import { printBanner } from "./utils/printBanner.ts";
import { printLogo } from "./utils/printLogo.ts";
import { startServer } from "./server.ts";

function registerEvents() {
  discordClient.once(Events.ClientReady, (client) => {
    ready.execute(client);
  });

  discordClient.on(Events.InteractionCreate, (interaction) => {
    interactionCreate.execute(interaction);
  });
}

function shutdown(signal: string) {
  console.log(`\n⚠️  Received ${signal}, shutting down gracefully...`);
  discordClient.destroy();
  process.exit(0);
}

async function main() {
  printLogo();
  printBanner();
  registerEvents();
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  startServer();

  discordClient.login(DISCORD_TOKEN).catch((err) => {
    console.error("❌ Failed to login:", err);
  });
}

main();
