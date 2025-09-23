import { ApplicationCommandOptionTypes } from "@discordeno/types";
import { Command } from "../index.ts";

export const utilsCommand: Command = {
  name: "utils",
  description: "Utility commands.",
  options: [
    {
      name: "ping",
      description: "Replies with 'Pong!'. Used for testing bot responsiveness.",
      type: ApplicationCommandOptionTypes.SubCommand,
    },
  ],
  execute: async (interaction, args) => {
    if (args.ping) {
      await interaction.respond("🏓 Pong!", { isPrivate: true });
    }
  },
};
