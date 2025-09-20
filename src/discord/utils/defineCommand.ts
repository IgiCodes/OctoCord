import {
  Awaitable,
  ChatInputCommandBuilder,
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import { Command, Subcommand } from "../types";

type DefineCommandOptions =
  | {
      execute: (
        interaction: ChatInputCommandInteraction
      ) => Awaitable<void> | void;
    }
  | {
      subcommands: Subcommand[];
    };

export function defineCommand(
  name: string,
  description: string,
  options: DefineCommandOptions
): Command {
  const builder = new ChatInputCommandBuilder()
    .setName(name)
    .setDescription(description);

  if ("subcommands" in options) {
    const subMap = new Map(options.subcommands.map((s) => [s.name, s]));
    builder.addSubcommands(...options.subcommands.map((s) => s.data));

    return {
      data: builder.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody,
      async execute(interaction: ChatInputCommandInteraction) {
        const subName = interaction.options.getSubcommand();
        const sub = subMap.get(subName);
        if (!sub) {
          await interaction.reply("❌ Unknown subcommand");
          return;
        }
        await sub.execute(interaction);
      },
    };
  }

  return {
    data: builder.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: options.execute,
  };
}
