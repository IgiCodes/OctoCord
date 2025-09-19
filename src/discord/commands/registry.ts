import { Command } from '../types';
import { PingCommand } from './ping';

export const commands = new Map<string, Command>([
  [PingCommand.data.name, PingCommand],
]);