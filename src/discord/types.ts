import {
  ClientEventTypes,
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

export interface Event<K extends keyof ClientEventTypes> {
  name: K;
  once?: boolean;
  execute: (...args: ClientEventTypes[K]) => Promise<void> | void;
}

export interface Command {
  data: RESTPostAPIChatInputApplicationCommandsJSONBody;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
}
