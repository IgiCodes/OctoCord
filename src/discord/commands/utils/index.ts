import { defineCommand } from "../../utils/defineCommand";
import { PingSubcommand } from "./ping";

export const UtilsCommand = defineCommand("utils", "Utility commands", {
  subcommands: [PingSubcommand],
});
