import { createBot } from "@discordeno/bot";
import { getEnv } from "@/config";
import { desiredProperties } from "./types.ts";

import events from "./events/index.ts";

export const bot = createBot({
  token: getEnv().DISCORD_TOKEN,
  desiredProperties,
});

bot.events = events;
