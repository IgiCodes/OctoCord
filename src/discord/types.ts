import {
  ClientEventTypes,
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  ChatInputCommandSubcommandBuilder,
  Awaitable,
  ChatInputCommandSubcommandGroupBuilder,
} from "discord.js";

export interface Event<EventName extends keyof ClientEventTypes> {
  name: EventName;
  execute: (...args: ClientEventTypes[EventName]) => Awaitable<void>;
}

export type Command =
  | {
      data: RESTPostAPIChatInputApplicationCommandsJSONBody;
      execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
    }
  | {
      data: RESTPostAPIChatInputApplicationCommandsJSONBody;
      execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
      subcommands: Map<string, Subcommand | SubcommandGroup>;
    };

export interface Subcommand {
  name: string;
  data: ChatInputCommandSubcommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
}

export interface SubcommandGroup {
  name: string;
  data: ChatInputCommandSubcommandGroupBuilder;
  subcommands: Subcommand[];
  execute: (interaction: ChatInputCommandInteraction) => Awaitable<void>;
}
