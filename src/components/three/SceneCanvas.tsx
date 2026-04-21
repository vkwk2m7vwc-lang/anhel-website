"use client";

import { Suspense, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * React Three Fiber Canvas — lazy-loaded, client-only.
 *
 * We import Canvas via next/dynamic with ssr:false so three.js never ships
 * with the server bundle. The ~150kb three.js payload only loads on pages
 * that actually mount a <SceneCanvas/>. When the user has reduced-motion,
 * we render nothing at all — the Stage 3 product explorer and Stage 5
 * building cross-section both have static-image fallbacks upstream.
 */
const LazyCanvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false, loading: () => null }
);

interface SceneCanvasProps {
  children: ReactNode;
  /** Optional className passed through to the Canvas wrapper. */
  className?: string;
  /** Forwarded to R3F — controls how the Canvas reacts to viewport changes. */
  dpr?: [number, number];
  /** Gl props forwarded to the WebGL renderer. */
  gl?: {
    antialias?: boolean;
    alpha?: boolean;
    powerPreference?: WebGLPowerPreference;
  };
  /** Camera config forwarded to R3F. */
  camera?: { position?: [number, number, number]; fov?: number };
}

export function SceneCanvas({
  children,
  className,
  dpr = [1, 2],
  gl = { antialias: true, alpha: true, powerPreference: "high-performance" },
  camera = { position: [0, 0, 5], fov: 45 },
}: SceneCanvasProps) {
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced) return null;

  return (
    <LazyCanvas
      className={className}
      dpr={dpr}
      gl={gl}
      camera={camera}
      // Don't eagerly try to render offscreen — we respect the user's GPU.
      frameloop="demand"
    >
      <Suspense fallback={null}>{children}</Suspense>
    </LazyCanvas>
  );
}
