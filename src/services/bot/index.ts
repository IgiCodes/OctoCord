import { createBot } from '@discordeno/bot'
import { getEnv } from "@/config";
import { desiredProperties } from "@/utils/types.ts";

export const Bot = createBot({
  token: getEnv().DISCORD_TOKEN,
  desiredProperties,
  events: {
    ready: ({ shardId, user }) => console.log(`🤖 Bot ready: Shard ${shardId}, Username: ${user.username}#${user.discriminator}`),
  },
})