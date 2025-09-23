import { printBanner, printLogo } from "@/utils";
import { startServer, stopServer } from "@/services/api/server.ts";
import { Bot } from "@/services/bot/index.ts";

async function shutdown(signal: string) {
  console.log(`\n⚠️ Received ${signal}, shutting down gracefully...`);
  stopServer(signal);
  await Bot.shutdown();
  Deno.exit(0);
}

async function main() {
  await printLogo();
  await printBanner();

  Deno.addSignalListener("SIGINT", () => shutdown("SIGINT"));
  Deno.addSignalListener("SIGTERM", () => shutdown("SIGTERM"));

  startServer();
  await Bot.start();
}

await main();
