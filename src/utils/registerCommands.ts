import { getEnv } from "@/config";
import commands, { Command } from "@/services/bot/commands/index.ts";
import { bot } from "@/services/bot/index.ts";
import {
  bold,
  brightMagenta,
  cyan,
  gray,
  green,
  red,
  yellow,
} from "@std/fmt/colors";

const {
  DISCORD_GUILD_ID,
  DRY_RUN,
  DEBUG_PAYLOAD,
  FORCE_GLOBAL,
  UNREGISTER_COMMANDS,
} = getEnv();

/**
 * Logs the payload if DEBUG_PAYLOAD is enabled.
 */
function logPayload(commandsPayload: Map<string, Command>) {
  if (!DEBUG_PAYLOAD) return;
  console.log(cyan("\n--- Payload JSON ---"));
  console.dir(commandsPayload, { depth: null, colors: true });
  console.log(cyan("--------------------\n"));
}

/**
 * Push commands or clear them depending on flags.
 */
async function syncCommands(
  commands: Map<string, Command>,
) {
  const commandsPayload = [...commands.values()];
  if (!FORCE_GLOBAL && DISCORD_GUILD_ID) {
    return await bot.rest.upsertGuildApplicationCommands(
      DISCORD_GUILD_ID,
      commandsPayload,
    ).catch((e) =>
      bot.logger.error("There was an error when updating the guild commands", e)
    );
  }
  return await bot.rest.upsertGlobalApplicationCommands(commandsPayload).catch((
    e,
  ) =>
    bot.logger.error("There was an error when updating the global commands", e)
  );
}

async function main() {
  console.log(gray("[registerCommands] running…"));

  try {
    if (DRY_RUN) {
      console.log(
        yellow(
          `\nDRY_RUN enabled, logging commands that would have been sent...\n`,
        ),
      );
      logPayload(UNREGISTER_COMMANDS ? new Map<string, Command>() : commands);
      return;
    }

    console.log(
      brightMagenta(`\n🤖 Starting bot for command registration...\n`),
    );

    await bot.start();

    if (UNREGISTER_COMMANDS) {
      bot.logger.info(brightMagenta(`🚧 Unregistering commands...`));
      await syncCommands(new Map<string, Command>());
      bot.logger.info(green(`🎉 Command unregistration complete!`));

      bot.logger.info(
        brightMagenta(`🤖 Shutting down...`),
      );
      await bot.shutdown();
      Deno.exit(0);
    }

    bot.logger.info(brightMagenta(`🚀 Registering commands...`));

    await syncCommands(commands);

    bot.logger.info(green(`🎉 Command registration complete!`));

    bot.logger.info(
      brightMagenta(`🤖 Shutting down...`),
    );
    await bot.shutdown();
    Deno.exit(0);
  } catch (err) {
    console.error(
      bold(red("\n❌ Failed to register/unregister commands:")),
      red(err instanceof Error ? err.message : String(err)),
      "\n",
    );
    await bot.shutdown();
    Deno.exit(1);
  }
}

await main();
