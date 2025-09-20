import { defineCommand } from "../../utils/defineCommand.ts";
import { IssuesCommandGroup } from "./issues/index.ts";

export const GitHubCommand = defineCommand(
  "github",
  "Github commands",
  { subcommands: [IssuesCommandGroup] }
);
