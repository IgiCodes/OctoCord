import {
  ChatInputCommandBuilder,
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  LabelBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { Command } from "../types";
import { getGitHubClient, repoContext } from "../../github/client";

export const CreateIssueCommand: Command = {
  data: new ChatInputCommandBuilder()
    .setName("create-issue")
    .setDescription("Open a GitHub issue via a modal + label selector")
    .toJSON(),

  async execute(interaction: ChatInputCommandInteraction) {
    const modal = new ModalBuilder()
      .setCustomId("createIssueModal")
      .setTitle("Create GitHub Issue");

    const titleInput = new TextInputBuilder()
      .setCustomId("issueTitle")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const descInput = new TextInputBuilder()
      .setCustomId("issueDescription")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(false);

    const client = await getGitHubClient();
    const labels = await client.issues.listLabelsForRepo({
      ...repoContext,
      per_page: 25,
    });
    const labelSelect = new StringSelectMenuBuilder()
      .setCustomId("createIssueLabels")
      .setPlaceholder("Select labels")
      .setMinValues(0)
      .setRequired(false)
      .setMaxValues(labels.data.length)
      .addOptions(labels.data.map((l) => ({ label: l.name, value: l.name })));

    modal.addLabelComponents(
      new LabelBuilder().setLabel("Issue Title").setTextInputComponent(titleInput),
      new LabelBuilder().setLabel("Issue Description").setTextInputComponent(descInput),
      new LabelBuilder().setLabel("Select labels").setStringSelectMenuComponent(labelSelect)
    );

    await interaction.showModal(modal);
  },
};
