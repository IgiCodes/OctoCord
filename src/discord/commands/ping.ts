import {
  ChatInputCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";
import { Command } from "../types";

export const PingCommand: Command = {
  data: new ChatInputCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")
    .toJSON(),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("🏓 Pong!");
  },
};