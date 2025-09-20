import { defineSubcommand } from "../../utils/defineSubcommand";
import { ChatInputCommandInteraction } from "discord.js";

export const PingSubcommand = defineSubcommand(
  "ping",
  "Replies with pong!",
  async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply("🏓 Pong!");
  }
);
