import fs from "fs";
import path from "path";
import supportsColor from "supports-color";

function loadLogo(file: string): string {
  const logoPath = path.resolve(process.cwd(), "assets", file);
  const raw = fs.readFileSync(logoPath, "utf8");
  return raw.replace(/\\e/g, "\x1b");
}

export function printLogo() {
  const supportsAnsi = supportsColor.stdout;
  const file = supportsAnsi
    ? "OctoCord-logo-ansi.txt"
    : "OctoCord-logo-ascii-80.txt";

  try {
    const logo = loadLogo(file);
    console.log(logo);
  } catch {
    console.warn("⚠️ Failed to load logo file, skipping.");
  }
}
