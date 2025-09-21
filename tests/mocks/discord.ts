import { mock, mockDeep } from "vitest-mock-extended";
import type { ChatInputCommandInteraction, Client } from "discord.js";

export const mockInteraction = mockDeep<ChatInputCommandInteraction>();
mockInteraction.isChatInputCommand.mockReturnValue(true);

export const mockClient = mock<Client>();
