import { Events, ChatInputCommandInteraction } from 'discord.js';
import { Event } from '../types';
import { commands } from '../commands/registry';

export const interactionCreate: Event<typeof Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) {
      console.error(`❌ No command found for ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction as ChatInputCommandInteraction);
    } catch (err) {
      console.error(err);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: '⚠️ Error executing command.',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: '⚠️ Error executing command.',
          ephemeral: true,
        });
      }
    }
  },
};