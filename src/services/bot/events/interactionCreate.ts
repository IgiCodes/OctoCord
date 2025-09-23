import commands from "../commands/index.ts";
import { bot } from "../index.ts";
import {
  commandOptionsParser,
  InteractionData,
  InteractionTypes,
} from "@discordeno/bot";

export const interactionCreateEvent: typeof bot.events.interactionCreate =
  async (
    interaction,
  ) => {
    if (interaction.type === InteractionTypes.ApplicationCommand) {
      if (!interaction.data) return;
      const data = interaction.data as InteractionData;

      const command = commands.get(data.name);
      if (!command) return;

      await command.execute(interaction, commandOptionsParser(interaction));
    }
  };
