import { Application, Router } from "@oak/oak";
import { getEnv } from "@/config";

let controller: AbortController | null = null;

export function startServer() {
  const app = new Application();
  const router = new Router();

  router.get("/healthz", ({ response }) => {
    response.status = 200;
    response.body = { status: "ok" };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const port = parseInt(getEnv().PORT) || 3000;
  controller = new AbortController();

  app.addEventListener("listen", () =>
    console.log(`🌐 API listening on port ${port}`), {
        signal: controller.signal
    }
  );

  app.listen({ port, signal: controller.signal }).catch((err) => {
    if (err.name === "AbortError") {
      console.log("🌐 Server stopped");
    } else {
      console.error("Server error:", err);
    }
  });
}

export function stopServer(signal: string) {
  if (controller) {
    console.log(`🛑 Stopping API server...`);
    controller.abort(signal);
    controller = null;
  }
}
