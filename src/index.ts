import { discordClient } from './discord/client';
import { DISCORD_TOKEN } from './config';

import { ready } from './discord/events/ready';
import { interactionCreate } from './discord/events/interactionCreate';

import { Event } from './discord/types';
import { ClientEvents } from 'discord.js';

function register<K extends keyof ClientEvents>(event: Event<K>) {
  if (event.once) {
    discordClient.once(event.name, (...args: ClientEvents[K]) => {
      event.execute(...args);
    });
  } else {
    discordClient.on(event.name, (...args: ClientEvents[K]) => {
      event.execute(...args);
    });
  }
}

register(ready);
register(interactionCreate);

discordClient.login(DISCORD_TOKEN);