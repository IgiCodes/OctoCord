import { Command } from "../types";
import { PingCommand } from "./ping";
import { CreateIssueCommand } from "./createIssue";

export const commands = new Map<string, Command>([
  [PingCommand.data.name, PingCommand],
  [CreateIssueCommand.data.name, CreateIssueCommand],
]);
