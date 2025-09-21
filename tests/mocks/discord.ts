import { mockDeep } from "vitest-mock-extended";
import { ApplicationCommandType, type ChatInputCommandInteraction, type Client } from "discord.js";

export const createMockChatInputCommandInteraction = () => {
  const mock = mockDeep<ChatInputCommandInteraction>();
  mock.isChatInputCommand.mockReturnValue(true);
  mock.commandType = ApplicationCommandType.ChatInput;

  return mock;
};

