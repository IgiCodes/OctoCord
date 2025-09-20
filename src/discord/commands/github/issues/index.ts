import { defineSubcommandGroup } from "../../../utils/defineSubcommandGroup.ts";
import { CreateIssueCommand } from "./createIssue.ts";

export const IssuesCommandGroup = defineSubcommandGroup(
  "issues",
  "GitHub Issues commands",
  [CreateIssueCommand]
);
