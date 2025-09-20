import { defineSubcommandGroup } from "../../../utils/defineSubcommandGroup";
import { CreateIssueCommand } from "./createIssue";

export const IssuesCommandGroup = defineSubcommandGroup(
  "issues",
  "Github Issues commands",
  [CreateIssueCommand]
);
