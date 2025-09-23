import { bot } from "../index.ts";

export const readyEvent: typeof bot.events.ready = ({ shardId, user }) => {
  // Print to the console when the bot has connected to discord and is ready to handle the events
  bot.logger.info(
    `🤖 Bot ready: Shard ${shardId}, Username: ${user.username}#${user.discriminator}`,
  );
};
