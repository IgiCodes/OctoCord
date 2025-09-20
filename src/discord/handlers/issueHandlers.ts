import { MessageFlags, ModalSubmitInteraction } from "discord.js";
import { getGitHubClient, repoContext } from "../../github/client.ts";

export async function handleIssueModalSubmit(interaction: ModalSubmitInteraction) {
  if (interaction.customId !== "createIssueModal") return;

  const title = interaction.fields.getTextInputValue("issueTitle");
  const body = interaction.fields.getTextInputValue("issueDescription");
  const labels = interaction.fields.getStringSelectValues("createIssueLabels");

  const github = await getGitHubClient();
  const issue = await github.issues.create({
    ...repoContext,
    title,
    body,
    labels: [...labels],
  });

  await interaction.reply({
    content: `✅ Issue created: ${issue.data.html_url}`,
    flags: MessageFlags.Ephemeral,
  });
}
