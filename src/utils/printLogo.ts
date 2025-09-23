import { join } from "@std/path";

/**
 * Load a logo file and replace escaped `\e` with real ANSI escapes.
 */
async function loadLogo(file: string): Promise<string> {
  const logoPath = join(Deno.cwd(), "assets", file);
  const raw = await Deno.readTextFile(logoPath);
  return raw.replace(/\\e/g, "\x1b");
}

/**
 * Prints the logo, picking ANSI or ASCII version depending on terminal support.
 */
export async function printLogo() {
  const file = !Deno.noColor
    ? "OctoCord-logo-ansi.txt"
    : "OctoCord-logo-ascii-60.txt";

  try {
    const logo = await loadLogo(file);
    console.log(logo);
  } catch {
    console.warn("⚠️ Failed to load logo file, skipping.");
  }
}
