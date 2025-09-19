import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../types';

export const PingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('🏓 Pong!');
  },
};