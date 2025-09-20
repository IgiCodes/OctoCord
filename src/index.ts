import { discordClient } from './discord/client.ts';
import { DISCORD_TOKEN } from './config/index.ts';

import { ready } from './discord/events/ready.ts';
import { interactionCreate } from './discord/events/interactionCreate.ts';

import { Events } from 'discord.js';

discordClient.once(Events.ClientReady, (client) => {
  ready.execute(client);
});

discordClient.on(Events.InteractionCreate, (interaction) => {
  interactionCreate.execute(interaction);
});

discordClient.login(DISCORD_TOKEN);
