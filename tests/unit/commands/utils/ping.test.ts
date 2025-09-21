import { describe, it, expect, beforeEach } from "vitest";
import { PingSubcommand } from "../../../../src/discord/commands/utils/ping.ts";
import { createMockChatInputCommandInteraction } from "../../../mocks/discord.ts";

let interaction: ReturnType<typeof createMockChatInputCommandInteraction>;

describe("PingSubcommand", () => {
  beforeEach(() => {
    interaction = createMockChatInputCommandInteraction();
    interaction.commandName = "ping";
    interaction.options.getSubcommand.mockReturnValue("ping");
  });

  it("should reply with pong message", async () => {
    await PingSubcommand.execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith("🏓 Pong!");
  });

  it("should be named 'ping'", () => {
    expect(PingSubcommand.name).toBe("ping");
  });


  it("should have correct description in data", () => {
    expect(PingSubcommand.data.toJSON().description).toBe("Replies with pong!");
  });
});
