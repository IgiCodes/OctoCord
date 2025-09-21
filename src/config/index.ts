import "dotenv/config";
import { z } from "zod";

// Define schema for all env vars
const EnvSchema = z.object({
  // Discord
  DISCORD_TOKEN: z.string().min(1, "DISCORD_TOKEN is required"),
  DISCORD_APP_ID: z.string().min(1, "DISCORD_APP_ID is required"),
  DISCORD_PUBLIC_KEY: z.string().min(1, "DISCORD_PUBLIC_KEY is required"),
  DISCORD_GUILD_ID: z.string().optional(),

  // GitHub
  GITHUB_APP_ID: z.coerce.number().int().positive(),
  GITHUB_APP_INSTALLATION_ID: z.coerce.number().int().positive(),
  GITHUB_APP_PRIVATE_KEY_PATH: z.string().min(1, "GITHUB_APP_PRIVATE_KEY_PATH is required"),
  GITHUB_OWNER: z.string().min(1, "GITHUB_OWNER is required"),
  GITHUB_REPO: z.string().min(1, "GITHUB_REPO is required"),

  // Example flags
  DRY_RUN: z
    .stringbool()
    .default(false),
  DEBUG_PAYLOAD: z
    .stringbool()
    .default(false),
  FORCE_GLOBAL: z
    .stringbool()
    .default(false),
});

// Validate process.env
const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

export const {
  DISCORD_TOKEN,
  DISCORD_APP_ID,
  DISCORD_PUBLIC_KEY,
  DISCORD_GUILD_ID,
  GITHUB_APP_ID,
  GITHUB_APP_INSTALLATION_ID,
  GITHUB_APP_PRIVATE_KEY_PATH,
  GITHUB_OWNER,
  GITHUB_REPO,
  DRY_RUN,
  DEBUG_PAYLOAD,
  FORCE_GLOBAL
} = env;
