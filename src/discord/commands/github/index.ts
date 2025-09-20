import { defineCommand } from "../../utils/defineCommand";
import { IssuesCommandGroup } from "./issues";

export const GitHubCommand = defineCommand(
  "github",
  "Github commands",
  { subcommands: [IssuesCommandGroup] }
);
