"use client";

import { scenarioCScenes } from "@/content/products/firefighting-scenario-c";
import { ChapterDivider } from "./ChapterDivider";
import { Scene01Silence } from "./scenes/Scene01Silence";
import { Scene02Spark } from "./scenes/Scene02Spark";
import { Scene03Pump } from "./scenes/Scene03Pump";
import { Scene04Pressure } from "./scenes/Scene04Pressure";
import { Scene05Flow } from "./scenes/Scene05Flow";

/**
 * Scenario-C orchestrator.
 *
 * The story is five full-viewport frames separated by thin chapter
 * dividers. Scenes are self-contained — no shared scroll timeline, no
 * pinning. Each uses its own IntersectionObserver (via framer-motion's
 * useInView inside SceneFrame) to trigger its reveal. This keeps the
 * page simple: everything scrolls normally, you never "get stuck" on
 * a pinned scene.
 *
 * The introductory title row at the top of the section is intentionally
 * sparse — mono tag + one-line framing. We don't spoil the beats; we
 * let the scenes land.
 */
export function ScenarioCScene() {
  const total = scenarioCScenes.length;

  return (
    <section className="relative bg-[var(--color-primary)]">
      {/* Section intro — mono label + single-sentence framing */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-6 pt-16 md:px-12 md:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
          03 · Scenario C — кинематографичные сцены
        </p>
        <h2 className="mt-3 max-w-[720px] text-2xl font-medium leading-tight text-[var(--color-secondary)] md:text-3xl">
          Пять кадров. Пять секунд между отблеском и струёй воды.
        </h2>
      </div>

      {/* Scenes stacked with dividers between. The divider isn't shown
          BEFORE the first scene (it would be empty) or AFTER the last. */}
      <Scene01Silence />
      <ChapterDivider nextIndex={2} total={total} stamp="SCENE · II" />
      <Scene02Spark />
      <ChapterDivider nextIndex={3} total={total} stamp="SCENE · III" />
      <Scene03Pump />
      <ChapterDivider nextIndex={4} total={total} stamp="SCENE · IV" />
      <Scene04Pressure />
      <ChapterDivider nextIndex={5} total={total} stamp="SCENE · V" />
      <Scene05Flow />
    </section>
  );
}
