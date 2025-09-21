# --- Builder stage ---
FROM node:24-alpine AS builder
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY src/ ./src/
COPY assets/ ./assets/
COPY tsconfig.json tsup.config.ts ./

RUN pnpm build

RUN pnpm prune --prod


# --- Production stage ---
FROM gcr.io/distroless/nodejs24 AS production
WORKDIR /app

COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/assets/ ./assets/
COPY --from=builder /app/node_modules/ ./node_modules/
COPY package.json pnpm-lock.yaml ./

USER 1001
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- "http://localhost:${PORT:-3000}/healthz" || exit 1

CMD ["dist/index.js"]
