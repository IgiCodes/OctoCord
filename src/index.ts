import { printBanner, printLogo } from "@/utils";
import { startServer, stopServer } from "@/services/api/server.ts";
import { bot } from "@/services/bot/index.ts";

async function shutdown(signal: string) {
  console.log(`\n⚠️ Received ${signal}, shutting down gracefully...`);
  stopServer(signal);
  await bot.shutdown();
  Deno.exit(0);
}

async function main() {
  await printLogo();
  await printBanner();

  Deno.addSignalListener("SIGINT", () => shutdown("SIGINT"));
  Deno.addSignalListener("SIGTERM", () => shutdown("SIGTERM"));

  startServer();
  await bot.start();
}

await main();
