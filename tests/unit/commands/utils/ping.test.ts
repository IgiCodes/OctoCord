import { describe, it, expect } from "vitest";
import { PingSubcommand } from "../../../../src/discord/commands/utils/ping.ts";
import { mockInteraction } from "../../../mocks/discord.ts";

describe("PingSubcommand", () => {
  it("should reply with pong message", async () => {
    await PingSubcommand.execute(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith("🏓 Pong!");
  });

  it("should be named 'ping'", () => {
    expect(PingSubcommand.name).toBe("ping");
  });

  it("should have correct description in data", () => {
    expect(PingSubcommand.data.toJSON().description).toBe("Replies with pong!");
  });
});
