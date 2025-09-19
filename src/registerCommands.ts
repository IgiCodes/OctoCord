import { REST, Routes } from 'discord.js';
import { DISCORD_TOKEN, DISCORD_APP_ID, DISCORD_GUILD_ID } from './config';
import { commands } from './discord/commands/registry';

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

async function main() {
  try {
    const body = Array.from(commands.values()).map((cmd) => cmd.data.toJSON());

    console.log(`🚀 Registering ${body.length} commands...`);
    if (DISCORD_GUILD_ID) {
      await rest.put(Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID), {
        body,
      });
      console.log(`✅ Guild commands registered`);
    } else {
      await rest.put(Routes.applicationCommands(DISCORD_APP_ID), { body });
      console.log(`✅ Global commands registered`);
    }
  } catch (err) {
    console.error('❌ Failed to register commands:', err);
  }
}

main();