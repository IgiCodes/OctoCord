import { createDesiredPropertiesObject } from "@discordeno/bot";

const desiredPropertiesObject = createDesiredPropertiesObject({
  message: {
    id: true,
    author: true,
  },
  user: {
    id: true,
    toggles: true,
    username: true,
    tag: true,
    discriminator: true,
  },
  interaction: {
    id: true,
    data: true,
    type: true,
    token: true,
    channelId: true,
  },
});

export interface BotDesiredProperties
  extends Required<typeof desiredPropertiesObject> {}

export const desiredProperties =
  desiredPropertiesObject as BotDesiredProperties;
