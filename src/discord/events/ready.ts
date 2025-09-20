import { Events, Client } from 'discord.js';
import { Event } from '../types.ts';

export const ready: Event<typeof Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
  },
};