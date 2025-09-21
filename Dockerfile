FROM node:24-alpine AS builder
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY src/ ./src/
COPY assets/ ./assets/
COPY tsconfig.json tsup.config.ts ./

RUN pnpm build

FROM node:24-alpine AS production
RUN corepack enable
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S discordbot -u 1001

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/assets/ ./assets/

RUN chown -R discordbot:nodejs /app
USER discordbot

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3000/healthz || exit 1

CMD ["node", "dist/index.js"]
