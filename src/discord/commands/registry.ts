import { Command } from "../types.ts";
import { UtilsCommand } from "./utils/index.ts";
import { GitHubCommand } from "./github/index.ts";

export const commands = new Map<string, Command>([
  [UtilsCommand.data.name, UtilsCommand],
  [GitHubCommand.data.name, GitHubCommand],
]);
