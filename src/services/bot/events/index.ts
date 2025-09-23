import type { bot } from "../index.ts";
import { interactionCreateEvent } from "./interactionCreate.ts";
import { readyEvent } from "./ready.ts";

export const events = {
  interactionCreate: interactionCreateEvent,
  ready: readyEvent,
} as typeof bot.events;

export default events;
