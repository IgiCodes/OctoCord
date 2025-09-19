import {
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';
import { getGitHubClient, repoContext } from '../../github/client';
import { saveDraft, getDraft, clearDraft } from '../../storage/tempStore';

// Modal → prompt for labels
export async function handleIssueModalSubmit(interaction: ModalSubmitInteraction) {
  const title = interaction.fields.getTextInputValue('issueTitle');
  const body = interaction.fields.getTextInputValue('issueDescription');

  // Save draft for this user
  saveDraft(interaction.user.id, { title, body });

  const github = await getGitHubClient();

  // Fetch repo labels (max 25 → Discord limit for select options)
  const labels = await github.issues.listLabelsForRepo({
    ...repoContext,
    per_page: 25,
  });

  const options = labels.data.map((label) =>
    new StringSelectMenuOptionBuilder().setLabel(label.name).setValue(label.name)
  );

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(`createIssueLabels:${interaction.user.id}`)
    .setPlaceholder('Select labels (optional)')
    .setMinValues(0)
    .setMaxValues(options.length)
    .addOptions(options);

  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

  await interaction.reply({
    content: 'Pick labels for your issue:',
    components: [row],
    ephemeral: true,
  });
}

// Label selection → create issue
export async function handleLabelSelect(interaction: StringSelectMenuInteraction) {
  const [, userId] = interaction.customId.split(':');
  const draft = getDraft(userId);

  if (!draft) {
    await interaction.update({
      content: '❌ No draft found, please try again.',
      components: [],
    });
    return;
  }

  await interaction.update({
    content: `Creating issue **${draft.title}**…`,
    components: [],
  });

  const github = await getGitHubClient();

  const issue = await github.issues.create({
    ...repoContext,
    title: draft.title,
    body: draft.body,
    labels: interaction.values,
  });

  clearDraft(userId);

  await interaction.followUp({
    content: `✅ Issue created: ${issue.data.html_url}`,
    ephemeral: true,
  });
}
