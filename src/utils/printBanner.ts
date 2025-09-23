import { join } from "@std/path";
import { magenta, brightMagenta } from "@std/fmt/colors";

export async function printBanner() {
  const bannerPath = join(Deno.cwd(), "assets", "OctoCord-banner.txt");
  const banner = await Deno.readTextFile(bannerPath);
  for (const line of banner.split("\n")) {
    console.log(magenta(line));
  }
  console.log(brightMagenta("OctoCord: Connect GitHub and Discord.\n"));
}