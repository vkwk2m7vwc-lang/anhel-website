# syntax=docker/dockerfile:1.7
#
# Multi-stage build for Next.js 14 standalone deployment to
# Yandex Cloud Serverless Containers.
#
# Stage 1 (deps)    — install npm dependencies in a clean layer.
# Stage 2 (builder) — run `next build` to produce .next/standalone.
# Stage 3 (runner)  — minimal runtime image with only the standalone
#                     server, public/ static files, and .next/static.
#
# Why standalone:
#   Vercel handles bundling+routing implicitly. Serverless Containers
#   only run whatever the image's CMD says — we need a single
#   self-contained Node server. `output: 'standalone'` (in
#   next.config.mjs) produces exactly that at `.next/standalone/server.js`.
#
# Why node:20-alpine:
#   - Next 14 supports node 18.17+ and 20+. node 20 LTS.
#   - alpine is ~5x smaller than -slim and -bookworm.
#   - sharp 0.34 has prebuilt linux-musl binaries since 0.33.
#
# Image size target: ~150-200 MB compressed (vs ~1 GB for naive
# COPY . && npm ci approach).

# -----------------------------------------------------------------------------
# Stage 1: install dependencies (cached separately so source changes
# don't bust the npm-install layer)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

# libc6-compat — sharp/pdf-lib + some node-gyp deps occasionally need
# glibc-compatibility shim on alpine.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
# `npm ci` — детерминированная установка из lock-файла.
# `--ignore-scripts` пропускает postinstall у пакетов (sharp build,
# playwright browsers) — playwright нам в проде не нужен (только в CI),
# sharp возьмёт prebuilt бинарь.
RUN npm ci --ignore-scripts

# -----------------------------------------------------------------------------
# Stage 2: build (produces .next/standalone)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Public env vars must be present at build time — next inline-substitutes
# them into the client bundle. Server-only vars (RESEND_API_KEY,
# QUIZ_RECIPIENT_EMAIL, QUIZ_BCC_EMAIL) read at runtime in the container
# — НЕ передаются на этап сборки.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_ID
ARG GIT_SHA
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV GIT_SHA=$GIT_SHA

# Telemetry off — мы не отправляем анонимную статистику в Vercel
# во время сборки в нашем CI.
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: runtime (минимальный образ для Yandex Cloud Serverless)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Yandex Cloud Serverless Containers по умолчанию проксирует на :8080,
# но мы можем выставить любой порт через переменную PORT. Стандарт
# next standalone — 3000, у нас 8080 для согласия с YC дефолтом.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
# Node 20 по умолчанию ставит IPv6 первым в DNS lookup-е (`verbatim`).
# Next.js 14 в standalone-режиме делает internal self-fetch при
# rewrite через middleware (next-intl), идущий на `http://localhost:$PORT`.
# В alpine-контейнере IPv6 на loopback отсутствует, поэтому `::1:8080`
# отдаёт ECONNREFUSED, а Next в логах пишет «Failed to proxy», страница
# отдаётся 500 после 30-секундного таймаута. Принудительно ставим IPv4
# первым — фикс подтверждён на локальном smoke-тесте /en и /tr.
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

# Не root: создаём nextjs пользователя
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# public/ — статика (картинки, PDF, шрифты) — нужна Next-серверу,
# чтобы отдавать /public/* запросы
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# .next/standalone — это полный self-contained Node-сервер
# (включая server.js + tracedeps). .next/static — оптимизированные
# JS/CSS-чанки, на которые ссылается standalone server.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

# server.js — entry point standalone-сервера, генерируется Next.js.
# Никаких npm/next install — всё инлайнено.
CMD ["node", "server.js"]
