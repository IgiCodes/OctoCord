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
  DRY_RUN,
  DEBUG_PAYLOAD,
  FORCE_GLOBAL,
  UNREGISTER_COMMANDS,
} from "../config/index.ts";
import { commands } from "../discord/commands/registry.ts";
import chalk from "chalk";

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

/**
 * Pretty-prints a command tree and returns total count of commands/subcommands.
 */
function logCommandTree(
  cmd: RESTPostAPIChatInputApplicationCommandsJSONBody,
  prefix = ""
): number {
  let count = 1;
  console.log(
    `${prefix}${chalk.green("•")} ${chalk.cyan(`/${cmd.name}`)} ${chalk.gray(
      "—"
    )} ${chalk.white(cmd.description)}`
  );

  if (!cmd.options) return count;

  for (const opt of cmd.options) {
    if (opt.type === 1) {
      const sub = opt as APIApplicationCommandSubcommandOption;
      console.log(
        `${prefix}   ${chalk.yellow("↳")} ${chalk.cyan(
          `/${cmd.name} ${sub.name}`
        )} ${chalk.gray("—")} ${chalk.white(sub.description)}`
      );
      count++;
    } else if (opt.type === 2) {
      const group = opt as APIApplicationCommandSubcommandGroupOption;
      console.log(
        `${prefix}   ${chalk.magenta("↳")} ${chalk.cyan(
          `/${cmd.name} ${group.name}`
        )} ${chalk.gray("—")} ${chalk.white(group.description)}`
      );
      count++;
      if (group.options) {
        for (const sub of group.options) {
          console.log(
            `${prefix}      ${chalk.yellow("↳")} ${chalk.cyan(
              `/${cmd.name} ${group.name} ${sub.name}`
            )} ${chalk.gray("—")} ${chalk.white(sub.description)}`
          );
          count++;
        }
      }
    }
  }

  return count;
}

/**
 * Logs the result of registration (or dry run).
 */
function logRegistrationResult(
  total: number,
  forceGlobal: boolean,
  dryRun: boolean
) {
  const target = forceGlobal
    ? "globally (forced)"
    : DISCORD_GUILD_ID
    ? `to guild ${chalk.green(DISCORD_GUILD_ID)}`
    : "globally";

  if (dryRun) {
    console.log(
      chalk.yellow.bold(`\n⚠️ Dry run mode enabled. No commands sent to Discord.\n`)
    );
    console.log(
      chalk.gray(
        `Would have registered ${chalk.cyan(total.toString())} command(s) ${target}`
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
 * Entrypoint.
 */
async function main() {
  console.log(chalk.gray("[registerCommands] running…"));

  if (UNREGISTER_COMMANDS) {
    try {
      if (!FORCE_GLOBAL && DISCORD_GUILD_ID) {
        await rest.put(
          Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID),
          { body: [] }
        );
        console.log(
          chalk.yellow.bold(
            `\n🧹 Cleared all guild commands for guild ${chalk.green(
              DISCORD_GUILD_ID
            )}\n`
          )
        );
      } else {
        await rest.put(Routes.applicationCommands(DISCORD_APP_ID), { body: [] });
        console.log(
          chalk.yellow.bold("\n🧹 Cleared all global commands\n")
        );
      }
    } catch (err) {
      console.error(
        chalk.red.bold("\n❌ Failed to unregister commands:"),
        chalk.red(err instanceof Error ? err.message : String(err)),
        "\n"
      );
      process.exit(1);
    }
    return;
  }

  try {
    const body: RESTPostAPIChatInputApplicationCommandsJSONBody[] = Array.from(
      commands.values()
    ).map((cmd) => cmd.data);

    console.log(chalk.magentaBright(`\n🚀 Registering commands...\n`));

    let total = 0;
    for (const cmd of body) {
      total += logCommandTree(cmd);
    }

    if (DRY_RUN) {
      logRegistrationResult(total, FORCE_GLOBAL, true);
      if (DEBUG_PAYLOAD) {
        console.log(chalk.cyan(`\n--- Payload JSON ---`));
        console.dir(body, { depth: null, colors: true });
        console.log(chalk.cyan(`--------------------\n`));
      }
      return;
    }

    if (!FORCE_GLOBAL && DISCORD_GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(DISCORD_APP_ID, DISCORD_GUILD_ID),
        { body }
      );
    } else {
      await rest.put(Routes.applicationCommands(DISCORD_APP_ID), { body });
    }

    logRegistrationResult(total, FORCE_GLOBAL, false);
  } catch (err) {
    console.error(
      chalk.red.bold("\n❌ Failed to register commands:"),
      chalk.red(err instanceof Error ? err.message : String(err)),
      "\n"
    );
  }
}

main();
