import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';
import { Command } from '../types';

export const CreateIssueCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('create-issue')
    .setDescription('Open a GitHub issue via a modal + label selector'),

  async execute(interaction: ChatInputCommandInteraction) {
    const modal = new ModalBuilder()
      .setCustomId('createIssueModal')
      .setTitle('Create GitHub Issue');

    const titleInput = new TextInputBuilder()
      .setCustomId('issueTitle')
      .setLabel('Issue Title')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const descInput = new TextInputBuilder()
      .setCustomId('issueDescription')
      .setLabel('Issue Description')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(titleInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(descInput)
    );

    await interaction.showModal(modal);
  },
};