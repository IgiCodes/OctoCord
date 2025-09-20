import {
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import {
  DISCORD_TOKEN,
  DISCORD_APP_ID,
  DISCORD_GUILD_ID,
} from "./config";
import { commands } from "./discord/commands/registry";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

async function main() {
  try {
    const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
      Array.from(commands.values()).map((cmd) => cmd.data);

    console.log(`🚀 Registering ${body.length} commands...`);

    for (const cmd of body) {
      console.log(`   • /${cmd.name} — ${cmd.description}`);
    }

    if (DISCORD_GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID),
        { body }
      );
      console.log(`✅ Guild commands registered to guild ${DISCORD_GUILD_ID}`);
    } else {
      await rest.put(Routes.applicationCommands(DISCORD_APP_ID), { body });
      console.log("✅ Global commands registered");
    }
  } catch (err) {
    console.error("❌ Failed to register commands:", err);
  }
}

main();
