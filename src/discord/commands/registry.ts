import { Command } from "../types";
import { UtilsCommand } from "./utils";
import { GitHubCommand } from "./github";

export const commands = new Map<string, Command>([
  [UtilsCommand.data.name, UtilsCommand],
  [GitHubCommand.data.name, GitHubCommand],
]);
