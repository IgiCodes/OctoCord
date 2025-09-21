import {
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";
import {
  DISCORD_TOKEN,
  DISCORD_APP_ID,
  DISCORD_GUILD_ID,
  DRY_RUN,
  DEBUG_PAYLOAD,
  FORCE_GLOBAL,
  UNREGISTER_COMMANDS,
} from "../config/index.ts";
import { commands } from "../discord/commands/registry.ts";
import chalk, { ChalkInstance } from "chalk";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

/**
 * Get the color to use for a command line based on type/indent.
 */
function getCommandColor(
  type?: ApplicationCommandOptionType | ApplicationCommandType,
  indent = 0
): ChalkInstance {
  if (indent === 0) return chalk.green;
  if (type === ApplicationCommandOptionType.SubcommandGroup)
    return chalk.magenta;
  return chalk.yellow;
}

/**
 * Utility for consistent command tree logging.
 */
function logCommandLine(
  indent: number,
  color: ChalkInstance,
  path: string,
  description: string,
  childrenCount = 0
) {
  const prefix =
    indent === 0 ? chalk.green("•") : "   ".repeat(indent) + color("↳");
  const badge = childrenCount > 0 ? chalk.gray(` (${childrenCount})`) : "";
  console.log(
    `${prefix} ${chalk.cyan(path)} ${chalk.gray("—")} ${chalk.white(
      description
    )}${badge}`
  );
}

/**
 * Recursively pretty-prints a command tree.
 */
function logCommandTree(
  cmd:
    | RESTPostAPIChatInputApplicationCommandsJSONBody
    | APIApplicationCommandOption,
  parent = "",
  indent = 0
): number {
  const path = `${parent}/${cmd.name}`;

  const childOptions =
    "options" in cmd
      ? cmd.options?.filter(
          (o) =>
            o.type === ApplicationCommandOptionType.Subcommand ||
            o.type === ApplicationCommandOptionType.SubcommandGroup
        ) ?? []
      : [];

  const color = getCommandColor(cmd.type, indent);

  logCommandLine(
    indent,
    color,
    path,
    cmd.description ?? "",
    childOptions.length
  );

  let count = 1;
  for (const opt of childOptions) {
    count += logCommandTree(opt, path, indent + 1);
  }

  return count;
}

/**
 * Logs a summary of registration results.
 */
function logRegistrationResult(total: number, dryRun: boolean) {
  const target =
    !FORCE_GLOBAL && DISCORD_GUILD_ID
      ? `to guild ${chalk.green(DISCORD_GUILD_ID)}`
      : `globally${FORCE_GLOBAL ? chalk.yellow(" (forced)") : ""}`;

  if (dryRun) {
    console.log(
      chalk.yellow.bold(`\n⚠️ Dry run mode enabled. No commands sent.\n`)
    );
    console.log(
      chalk.gray(
        `Would have registered ${chalk.cyan(
          total.toString()
        )} command(s) ${target}`
      )
    );
  } else {
    console.log(
      chalk.green.bold(
        `\n✅ Registered ${chalk.cyan(total.toString())} command(s) ${target}\n`
      )
    );
  }
}

/**
 * Logs a summary of unregistration results.
 */
function logUnregisterResult() {
  const target =
    !FORCE_GLOBAL && DISCORD_GUILD_ID
      ? `guild ${chalk.green(DISCORD_GUILD_ID)}`
      : `global`;
  console.log(chalk.yellow.bold(`\n🧹 Cleared all ${target} commands\n`));
}

/**
 * Logs the payload if DEBUG_PAYLOAD is enabled.
 */
function logPayload(body: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
  if (!DEBUG_PAYLOAD) return;
  console.log(chalk.cyan("\n--- Payload JSON ---"));
  console.dir(body, { depth: null, colors: true });
  console.log(chalk.cyan("--------------------\n"));
}

/**
 * Push commands or clear them depending on flags.
 */
async function syncCommands(
  body: RESTPostAPIChatInputApplicationCommandsJSONBody[]
) {
  const target =
    !FORCE_GLOBAL && DISCORD_GUILD_ID
      ? Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID)
      : Routes.applicationCommands(DISCORD_APP_ID);

  await rest.put(target, { body });
}

async function main() {
  console.log(chalk.gray("[registerCommands] running…"));

  try {
    if (UNREGISTER_COMMANDS) {
      await syncCommands([]);
      logUnregisterResult();
      return;
    }

    const body = Array.from(commands.values()).map((cmd) => cmd.data);

    console.log(chalk.magentaBright(`\n🚀 Registering commands...\n`));
    const total = body.reduce((sum, cmd) => sum + logCommandTree(cmd), 0);

    if (DRY_RUN) {
      logRegistrationResult(total, true);
      logPayload(body);
      return;
    }

    await syncCommands(body);
    logRegistrationResult(total, false);
  } catch (err) {
    console.error(
      chalk.red.bold("\n❌ Failed to register/unregister commands:"),
      chalk.red(err instanceof Error ? err.message : String(err)),
      "\n"
    );
    process.exit(1);
  }
}

main();
