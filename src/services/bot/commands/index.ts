import { CreateApplicationCommand } from "@discordeno/types";
import { utilsCommand } from "./utils/index.ts";
import { bot } from "../index.ts";

export interface Command extends CreateApplicationCommand {
  name: string;
  description: string;
  execute: (
    interaction: typeof bot.transformers.$inferredTypes.interaction,
    args: Record<string, unknown>,
  ) => Promise<unknown>;
}

export const commands = new Map<string, Command>(
  [utilsCommand].map((cmd) => [cmd.name, cmd]),
);

export default commands;
