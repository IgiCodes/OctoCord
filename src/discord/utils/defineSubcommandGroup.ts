import { ChatInputCommandSubcommandGroupBuilder } from "discord.js";
import { Subcommand, SubcommandGroup } from "../types";

export function defineSubcommandGroup(
  name: string,
  description: string,
  subcommands: Subcommand[]
): SubcommandGroup {
  const subMap = new Map(subcommands.map((s) => [s.name, s]));
  const group = new ChatInputCommandSubcommandGroupBuilder()
    .setName(name)
    .setDescription(description)
    .addSubcommands(...subcommands.map((s) => s.data));

  return {
    name,
    data: group,
    async execute(interaction) {
      const subName = interaction.options.getSubcommand();
      const sub = subMap.get(subName);
      if (!sub) {
        await interaction.reply("❌ Unknown subcommand");
        return;
      }
      await sub.execute(interaction);
    },
  };
}
