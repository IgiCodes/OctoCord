import { ClientEvents } from 'discord.js';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface Event<K extends keyof ClientEvents> {
  name: K;
  once?: boolean;
  execute: (...args: ClientEvents[K]) => Promise<void> | void;
}

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
}