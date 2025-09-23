import * as v from "@valibot/valibot";

export const allowedEnvKeys = [
  "PORT",
  "HOST_PORT",
  "DISCORD_TOKEN",
  "DISCORD_APP_ID",
  "DISCORD_PUBLIC_KEY",
  "DISCORD_GUILD_ID",
  "GITHUB_APP_ID",
  "GITHUB_APP_INSTALLATION_ID",
  "GITHUB_APP_PRIVATE_KEY_PEM",
  "GITHUB_OWNER",
  "GITHUB_REPO",
  "DRY_RUN",
  "DEBUG_PAYLOAD",
  "FORCE_GLOBAL",
  "UNREGISTER_COMMANDS",
] as const;

const NonEmptyStringSchema = v.pipe(
  v.string("Must be a string"),
  v.nonEmpty("Must not be empty")
);

const NumberStringSchema = v.pipe(v.string(), v.digits("Value can only contain numbers"));

const PemSchema = v.pipe(
  v.string("Must be a string"),
  v.nonEmpty("Private key cannot be empty"),
  v.check((value) => {
    const match = value.match(
      /^-----BEGIN RSA PRIVATE KEY-----\s+([\s\S]+?)\s+-----END RSA PRIVATE KEY-----\s*$/
    );
    if (!match) return false;

    const base64Body = match[1].replace(/\s+/g, ""); // remove line breaks & spaces

    try {
      atob(base64Body);
      return true;
    } catch {
      return false;
    }
  }, "Must be a valid PEM formatted RSA private key")
);

const EnvSchema = v.object({
  PORT: NumberStringSchema,
  HOST_PORT: NumberStringSchema,

  DISCORD_TOKEN: NonEmptyStringSchema,
  DISCORD_APP_ID: NumberStringSchema,
  DISCORD_PUBLIC_KEY: NonEmptyStringSchema,
  DISCORD_GUILD_ID: v.optional(NumberStringSchema),

  GITHUB_APP_ID: NumberStringSchema,
  GITHUB_APP_INSTALLATION_ID: NumberStringSchema,
  GITHUB_APP_PRIVATE_KEY_PEM: PemSchema,
  GITHUB_OWNER: NonEmptyStringSchema,
  GITHUB_REPO: NonEmptyStringSchema,

  DRY_RUN: v.optional(v.boolean(), false),
  DEBUG_PAYLOAD: v.optional(v.boolean(), false),
  FORCE_COLOR: v.optional(v.boolean(), false),
  FORCE_GLOBAL: v.optional(v.boolean(), false),
  UNREGISTER_COMMANDS: v.optional(v.boolean(), false),
});

export function getEnv() {
  const rawEnv: Record<string, string> = {};
  for (const key of allowedEnvKeys) {
    const value = Deno.env.get(key);
    if (value !== undefined) rawEnv[key] = value;
  }

  const parsed = v.safeParse(EnvSchema, rawEnv);

  if (!parsed.success) {
    console.error("❌ Invalid environment configuration:");

    for (const issue of parsed.issues) {
      const key =
        issue.path && issue.path.length > 0
          ? issue.path
              .map((p) => p.key)
              .filter(Boolean)
              .join(".")
          : "<root>";

      console.error(`- ${key}: ${issue.message}`);
    }

    Deno.exit(1);
  }

  return parsed.output;
}
