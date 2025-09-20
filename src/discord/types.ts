import {
  ClientEventTypes,
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  ChatInputCommandSubcommandBuilder,
  Awaitable,
  ChatInputCommandSubcommandGroupBuilder,
} from "discord.js";

export interface Event<K extends keyof ClientEventTypes> {
  name: K;
  once?: boolean;
  execute: (...args: ClientEventTypes[K]) => Awaitable<void>;
}

export type Command =
  | {
      data: RESTPostAPIChatInputApplicationCommandsJSONBody;
      execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
    }
  | {
      data: RESTPostAPIChatInputApplicationCommandsJSONBody;
      execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
      // for parent commands, we also keep a subcommand map for runtime dispatch
      subcommands: Map<string, Subcommand>;
    };

export interface Subcommand {
  name: string;
  data: ChatInputCommandSubcommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
}

export interface SubcommandGroup {
  name: string;
  data: ChatInputCommandSubcommandGroupBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Awaitable<void> | void;
}
