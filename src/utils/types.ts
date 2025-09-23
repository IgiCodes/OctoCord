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
})

export interface BotDesiredProperties extends Required<typeof desiredPropertiesObject> {}

export const desiredProperties = desiredPropertiesObject as BotDesiredProperties;