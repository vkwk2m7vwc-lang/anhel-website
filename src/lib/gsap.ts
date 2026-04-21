"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Centralised GSAP plugin registration.
 *
 * Since GSAP 3.13 (May 2025) the entire Club GreenSock bundle is free —
 * SplitText and ScrollTrigger ship from the regular `gsap` npm package.
 *
 * Only register on the client: GSAP touches `window` at import time and
 * throws during SSR unless guarded.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Respect reduced-motion preference at the engine level.
  gsap.config({ nullTargetWarn: false });
  ScrollTrigger.config({
    // Safari's scroll anchoring can fight pinned sections — disable.
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger, SplitText };
