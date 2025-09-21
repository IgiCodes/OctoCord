import http from "http";
import { PORT } from "./config/index.ts";
import { discordClient } from "./discord/client.ts";

export function startServer() {
  const server = http.createServer((req, res) => {
    if (req.url === "/healthz") {
        const healthy = discordClient.isReady();
        res.writeHead(healthy ? 200 : 500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: healthy ? "ok" : "not ready" }));
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  const port = PORT || 3000;
  server.listen(port, () => {
    console.log(`🌐 Listening on port ${port}`);
  });

  return server;
}
