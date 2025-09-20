import {
  ChatInputCommandSubcommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { Subcommand } from "../types.ts";

export function defineSubcommand(
  name: string,
  description: string,
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void
): Subcommand {
  return {
    name,
    data: new ChatInputCommandSubcommandBuilder()
      .setName(name)
      .setDescription(description),
    execute,
  };
}
