import { NextResponse } from "next/server";

/**
 * `/api/health` — лёгкий liveness probe для Yandex Cloud Serverless
 * Containers (и любого другого load balancer / kubelet).
 *
 * Что мы НЕ делаем здесь:
 *  - не пингуем БД (нет БД у нас);
 *  - не дёргаем Resend (это external dependency, его падение не должно
 *    валить контейнер — формы и так аккуратно фейлят POST с 500).
 *
 * Что мы ДЕЛАЕМ:
 *  - возвращаем 200 со статусом, временем и commit SHA (если задан в
 *    ENV при сборке) — чтобы можно было быстро проверить какая ревизия
 *    реально крутится в Yandex Cloud Serverless Container.
 *
 * `dynamic = 'force-dynamic'` — иначе Next закеширует response на этапе
 * build и /api/health начнёт возвращать stale-данные при revision swap.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      commit: process.env.GIT_SHA ?? "unknown",
      uptime: process.uptime(),
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
