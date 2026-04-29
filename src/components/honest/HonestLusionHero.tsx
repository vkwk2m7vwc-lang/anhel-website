"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

/**
 * HonestLusionHero — hero в стиле lusion.co.
 *
 * Кинетическая типографика, реагирующая на курсор. Без Three.js —
 * только framer-motion + cursor tracking. Каждое слово заголовка
 * получает свой spring-driven offset на основе расстояния до
 * курсора, плюс глобальное «дыхание» через slow scale-loop.
 *
 * Композиция:
 *   - Чёрный канвас, едва различимая SVG grain-noise overlay
 *   - Аккент-радиал следует за курсором (мягкая «лужа света»)
 *   - Headline «ANHEL — это честно» расщеплён на 3 слова, каждое
 *     отдельно отвечает на проксимити курсора
 *   - Постоянный idle-pulse: scale 1 → 1.02 → 1 над 8 сек
 *   - В углах — мини-метки в духе сайта-портфолио
 *
 * Не сильно тяжёлое — нет canvas/WebGL/shader работы; вся анимация
 * на CSS transform + spring physics через framer-motion. ~60fps на
 * среднем железе.
 */
export function HonestLusionHero() {
  const containerRef = useRef<HTMLElement | null>(null);
  // Raw mouse position (px), normalised to viewport (-1..1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-smoothed offsets — give the «liquid» feel.
  const springConfig = { stiffness: 180, damping: 30, mass: 0.6 };
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);

  // Раздельные magnitudes — каждое слово сдвигается по-разному.
  const w1X = useTransform(sX, (v) => v * 24);
  const w1Y = useTransform(sY, (v) => v * 12);
  const w2X = useTransform(sX, (v) => v * -18);
  const w2Y = useTransform(sY, (v) => v * 8);
  const w3X = useTransform(sX, (v) => v * 32);
  const w3Y = useTransform(sY, (v) => v * -16);

  // Cursor blob position (raw screen coords as % of viewport).
  const [blob, setBlob] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      mouseX.set((x - 0.5) * 2); // -1..1
      mouseY.set((y - 0.5) * 2);
      setBlob({ x: x * 100, y: y * 100 });
    };

    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "#0a0a0a", color: "#f5f5f3", cursor: "none" }}
    >
      {/* Cursor blob — мягкая «лужа света» следует за курсором.
          На touch (без mousemove) останется в центре — приемлемо. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-[background] duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${blob.x}% ${blob.y}%, rgba(30, 111, 217, 0.18) 0%, transparent 60%)`,
        }}
      />

      {/* Grain overlay — еле-видимый «шум» на канвасе для material feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Custom cursor — маленький круг */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-3 w-3 rounded-full"
        style={{
          left: `calc(${blob.x}% - 6px)`,
          top: `calc(${blob.y}% - 6px)`,
          background: "#f5f5f3",
          mixBlendMode: "difference",
          transition: "transform 80ms ease-out",
        }}
      />

      {/* Top-left corner label */}
      <div className="relative z-10 flex items-start justify-between px-6 pt-28 md:px-12 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-65">
          ANHEL® · СПб · Москва
        </p>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 md:block">
          ↳ MOVE CURSOR
        </p>
      </div>

      {/* Centre — три слова, каждое со своим cursor-offset */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 md:px-12">
        <motion.h1
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="text-center font-display"
          style={{
            fontSize: "clamp(56px, 13vw, 280px)",
            fontWeight: 500,
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
          }}
        >
          <motion.span
            style={{ x: w1X, y: w1Y, display: "inline-block" }}
          >
            ANHEL
          </motion.span>{" "}
          <motion.span
            style={{
              x: w2X,
              y: w2Y,
              display: "inline-block",
              opacity: 0.55,
            }}
          >
            —
          </motion.span>{" "}
          <motion.span
            style={{ x: w3X, y: w3Y, display: "inline-block" }}
            className="italic font-normal"
          >
            это честно
          </motion.span>
        </motion.h1>
      </div>

      {/* Bottom row — анти-CTA */}
      <div className="relative z-10 flex items-end justify-between gap-6 px-6 pb-10 md:px-12 md:pb-14">
        <p className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.16em] opacity-50">
          (R) 2018 · ANHEL — серия HVS-NU / BITP-NU / VPU-NU
        </p>
        <Link
          href="/products"
          data-cursor="hover"
          className="group inline-flex items-baseline gap-2 border-b border-[rgba(245,245,243,0.4)] pb-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-[rgba(245,245,243,0.9)]"
        >
          <span>смотреть каталог</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
        </Link>
      </div>
    </section>
  );
}
