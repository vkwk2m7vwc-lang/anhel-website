"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Hero background — variant A (video).
 *
 * Cinematic loop of a manufacturing floor, autoplaying muted and
 * seamless. On touch / small screens and when the user prefers reduced
 * motion we replace the `<video>` with the poster JPG — this keeps the
 * data cost near zero on mobile and the page still looks right.
 *
 * Overlays:
 *  1. Vertical dark gradient 0.4 → 0.5 → 0.7 — lifts the headline off
 *     the footage without killing detail in the bright parts.
 *  2. Hairline 40×40 grid at 3% opacity — the signature tech-reference
 *     pattern from the prototype.
 */
export function HeroBgVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Two-step mount: check viewport width on the client to pick video vs.
  // poster. `undefined` until we know, so the SSR output stays blank and
  // never commits to the wrong element.
  const [useVideo, setUseVideo] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) {
      setUseVideo(false);
      return;
    }
    // Mobile breakpoint per TZ — image fallback below 768px.
    setUseVideo(window.innerWidth >= 768);
  }, [prefersReduced]);

  // Safari occasionally pauses muted autoplay after tab restore; nudge it.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const resume = () => v.play().catch(() => {});
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, [useVideo]);

  return (
    <>
      {useVideo === true ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          role="presentation"
          poster="/video/hero-manufacturing.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-manufacturing.webm" type="video/webm" />
          <source src="/video/hero-manufacturing.mp4" type="video/mp4" />
        </video>
      ) : useVideo === false ? (
        <Image
          src="/video/hero-manufacturing.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}

      {/* Dark gradient for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.75) 100%)",
        }}
      />
      {/* 40×40 hairline grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-80"
      />
    </>
  );
}
