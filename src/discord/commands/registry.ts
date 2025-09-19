import { Command } from '../types';
import { CreateIssueCommand } from './createIssue';
import { PingCommand } from './ping';

export const commands = new Map<string, Command>([
  [PingCommand.data.name, PingCommand],
  [CreateIssueCommand.data.name, CreateIssueCommand]
]);