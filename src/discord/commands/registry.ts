import { Command } from "../types";
import { UtilsCommand } from "./utils";
import { CreateIssueCommand } from "./createIssue";

export const commands = new Map<string, Command>([
  [UtilsCommand.data.name, UtilsCommand],
  [CreateIssueCommand.data.name, CreateIssueCommand],
]);
