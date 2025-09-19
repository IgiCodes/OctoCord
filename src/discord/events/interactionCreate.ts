import {
  Events,
  ChatInputCommandInteraction,
  Interaction,
} from 'discord.js';
import { Event } from '../types';
import { commands } from '../commands/registry';
import { handleIssueModalSubmit, handleLabelSelect } from '../handlers/issueHandlers';

export const interactionCreate: Event<typeof Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    // --- Slash commands ---
    if (interaction.isChatInputCommand()) {
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
      return;
    }

    // --- Modal submit ---
    if (interaction.isModalSubmit() && interaction.customId === 'createIssueModal') {
      await handleIssueModalSubmit(interaction);
      return;
    }

    // --- Label select menu ---
    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('createIssueLabels:')) {
      await handleLabelSelect(interaction);
      return;
    }
  },
};
