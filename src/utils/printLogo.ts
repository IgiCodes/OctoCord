import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import supportsColor from "supports-color";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadLogo(file: string): string {
  const logoPath = path.resolve(__dirname, "../../assets", file);
  const raw = fs.readFileSync(logoPath, "utf8");
  return raw.replace(/\\e/g, "\x1b"); // replace literal \e with real ESC
}

export function printLogo() {
  const supportsAnsi = supportsColor.stdout;
  const file = supportsAnsi
    ? "OctoCord-logo-ansi.txt"
    : "OctoCord-logo-ascii-80.txt";

  try {
    const logo = loadLogo(file);
    console.log(logo);
  } catch (err) {
    console.warn("⚠️ Failed to load logo file, skipping.");
  }
}
