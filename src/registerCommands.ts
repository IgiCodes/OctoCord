import {
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  APIApplicationCommandSubcommandOption,
  APIApplicationCommandSubcommandGroupOption,
} from "discord.js";
import {
  DISCORD_TOKEN,
  DISCORD_APP_ID,
  DISCORD_GUILD_ID,
} from "./config/index.ts";
import { commands } from "./discord/commands/registry.ts";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

function logCommandTree(
  cmd: RESTPostAPIChatInputApplicationCommandsJSONBody,
  prefix = ""
): number {
  let count = 1; // count this command itself
  console.log(`${prefix}• /${cmd.name} — ${cmd.description}`);

  if (cmd.options) {
    for (const opt of cmd.options) {
      if (opt.type === 1) {
        // Subcommand
        const sub = opt as APIApplicationCommandSubcommandOption;
        console.log(
          `${prefix}   ↳ /${cmd.name} ${sub.name} — ${sub.description}`
        );
        count++;
      } else if (opt.type === 2) {
        // Subcommand group
        const group = opt as APIApplicationCommandSubcommandGroupOption;
        console.log(
          `${prefix}   ↳ /${cmd.name} ${group.name} — ${group.description}`
        );
        count++;
        if (group.options) {
          for (const sub of group.options) {
            console.log(
              `${prefix}      ↳ /${cmd.name} ${group.name} ${sub.name} — ${sub.description}`
            );
            count++;
          }
        }
      }
    }
  }

  return count;
}

async function main() {
  try {
    const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] =
      Array.from(commands.values()).map((cmd) => cmd.data);

    console.log(`🚀 Registering commands...`);

    let total = 0;
    for (const cmd of body) {
      total += logCommandTree(cmd);
    }

    if (DISCORD_GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID),
        { body }
      );
      console.log(
        `✅ Registered ${total} command(s) to guild ${DISCORD_GUILD_ID}`
      );
    } else {
      await rest.put(Routes.applicationCommands(DISCORD_APP_ID), { body });
      console.log(`✅ Registered ${total} command(s) globally`);
    }
  } catch (err) {
    console.error("❌ Failed to register commands:", err);
  }
}

main();
