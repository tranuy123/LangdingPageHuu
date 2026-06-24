# OpenSSL 1.1.x — needed by Prisma schema engine and @prisma/engines query engine (linux-musl variants)
FROM alpine:3.16 AS ssl11-source
# OpenSSL 3.0.x — needed by prisma/client-gen (linux-musl-openssl-3.0.x) and Next.js app
FROM postgres:16-alpine AS ssl3-source

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=ssl3-source /usr/lib/libssl.so.3 /usr/lib/libssl.so.3
COPY --from=ssl3-source /usr/lib/libcrypto.so.3 /usr/lib/libcrypto.so.3
COPY --from=deps /app/node_modules ./node_modules
# Pre-generated client with linux-musl-openssl-3.0.x binary
COPY prisma/client-gen ./node_modules/.prisma/client
COPY . .
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/node_modules/.prisma/client/libquery_engine-linux-musl-openssl-3.0.x.so.node
RUN npx next build

FROM node:20-alpine AS migration
WORKDIR /app
# schema-engine-linux-musl needs libssl.so.1.1
COPY --from=ssl11-source /usr/lib/libssl.so.1.1 /usr/lib/libssl.so.1.1
COPY --from=ssl11-source /usr/lib/libcrypto.so.1.1 /usr/lib/libcrypto.so.1.1
# client-gen query engine (linux-musl-openssl-3.0.x) used by seed script needs libssl.so.3
COPY --from=ssl3-source /usr/lib/libssl.so.3 /usr/lib/libssl.so.3
COPY --from=ssl3-source /usr/lib/libcrypto.so.3 /usr/lib/libcrypto.so.3
COPY --from=deps /app/node_modules ./node_modules
COPY prisma/client-gen ./node_modules/.prisma/client
COPY prisma ./prisma
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/node_modules/.prisma/client/libquery_engine-linux-musl-openssl-3.0.x.so.node

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=ssl3-source /usr/lib/libssl.so.3 /usr/lib/libssl.so.3
COPY --from=ssl3-source /usr/lib/libcrypto.so.3 /usr/lib/libcrypto.so.3

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/node_modules/.prisma/client/libquery_engine-linux-musl-openssl-3.0.x.so.node

RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
