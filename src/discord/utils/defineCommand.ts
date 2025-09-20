import {
  Awaitable,
  ChatInputCommandBuilder,
  ChatInputCommandInteraction,
  ChatInputCommandSubcommandBuilder,
  ChatInputCommandSubcommandGroupBuilder,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import { Command, Subcommand, SubcommandGroup } from "../types.ts";

type SubOrGroup = Subcommand | SubcommandGroup;

type DefineCommandOptions =
  | {
      execute: (interaction: ChatInputCommandInteraction) => Awaitable<void> | void;
    }
  | {
      subcommands: SubOrGroup[];
    };

function isGroup(x: SubOrGroup): x is SubcommandGroup {
  return "subcommands" in x;
}

export function defineCommand(
  name: string,
  description: string,
  options: DefineCommandOptions
): Command {
  const builder = new ChatInputCommandBuilder()
    .setName(name)
    .setDescription(description);

  if ("subcommands" in options) {
    const dispatch = new Map<string, Subcommand | SubcommandGroup>();

    const subs: ChatInputCommandSubcommandBuilder[] = [];
    const groups: ChatInputCommandSubcommandGroupBuilder[] = [];

    for (const entry of options.subcommands) {
      if (isGroup(entry)) {
        groups.push(entry.data);
        dispatch.set(entry.name, entry);
        for (const sub of entry.subcommands) {
          dispatch.set(`${entry.name}:${sub.name}`, sub);
        }
      } else {
        subs.push(entry.data);
        dispatch.set(entry.name, entry);
      }
    }

    if (subs.length) builder.addSubcommands(...subs);
    if (groups.length) builder.addSubcommandGroups(...groups);

    return {
      data: builder.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody,
      async execute(interaction: ChatInputCommandInteraction) {
        const groupName = interaction.options.getSubcommandGroup(false);
        const subName = interaction.options.getSubcommand();

        const key = groupName ? `${groupName}:${subName}` : subName;
        const handler = dispatch.get(key);

        if (!handler) {
          await interaction.reply("❌ Unknown subcommand");
          return;
        }

        await handler.execute(interaction);
      },
    };
  }

  return {
    data: builder.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: options.execute,
  };
}
