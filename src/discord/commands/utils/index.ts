import { defineCommand } from "../../utils/defineCommand.ts";
import { PingSubcommand } from "./ping.ts";

export const UtilsCommand = defineCommand("utils", "Utility commands", {
  subcommands: [PingSubcommand],
});
