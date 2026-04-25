import type { Config } from "tailwindcss";

/**
 * ANHEL Tailwind config.
 *
 * Colors, fonts, easings and durations follow `_docs/BRAND.md`.
 * CSS variables are declared in `src/app/globals.css` and referenced here
 * via `var(--…)` so we can swap them at runtime (e.g. background tint
 * follows the currently-focused product color on Stage 3).
 */
const config: Config = {
  // Class-based dark mode — `next-themes` toggles `class="dark"` / `class="light"`
  // on <html>. Tailwind's `dark:` modifier still works, but most theming flows
  // through CSS variables defined in `globals.css`.
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        md: "48px",
        xl: "120px",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        steel: {
          light: "var(--color-steel-light)",
          dark: "var(--color-steel-dark)",
        },
        hairline: {
          DEFAULT: "var(--color-hairline)",
          dark: "var(--color-hairline-dark)",
        },
        accent: {
          water: "var(--accent-water)",
          fire: "var(--accent-fire)",
          treatment: "var(--accent-treatment)",
          heat: "var(--accent-heat)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter Tight", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      // Variant 2 — Techno: type ladder pushes harder.
      // Hero crank-up to 200px clamp (200% of the original ceiling
      // on giant screens) to hit a Stripe / Linear feel where the
      // headline IS the picture. Tracking goes more negative for
      // the optical density. Mono caption gets fatter (12px) and
      // wider (0.18em) — the technical caption is its own visual
      // beat, not just an annotation.
      fontSize: {
        hero: [
          "clamp(60px, 9vw, 200px)",
          { lineHeight: "0.92", letterSpacing: "-0.03em" },
        ],
        section: [
          "clamp(44px, 5.5vw, 100px)",
          { lineHeight: "1.0", letterSpacing: "-0.025em" },
        ],
        h2: [
          "clamp(28px, 3vw, 56px)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        h3: ["clamp(20px, 2vw, 28px)", { lineHeight: "1.2" }],
        body: ["clamp(16px, 1.2vw, 18px)", { lineHeight: "1.5" }],
        mono: ["12px", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },
      letterSpacing: {
        mono: "0.08em",
        hero: "-0.025em",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        pill: "9999px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      transitionDuration: {
        instant: "150ms",
        fast: "300ms",
        base: "500ms",
        slow: "800ms",
        cinematic: "1200ms",
      },
      // Variant 2 — Techno: grids are louder. The grid-hairline pattern
      // (used by the firefighting section bg + future hero variants)
      // doubles its visibility from 0.03 → 0.06 alpha so the engineering
      // grid actually reads. Dot-pattern added — alternative texture for
      // light sections that would otherwise feel empty.
      backgroundImage: {
        "steel-gradient": "linear-gradient(135deg, #C0C8D0 0%, #8A94A0 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        "grid-hairline":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "dots-pattern":
          "radial-gradient(circle, currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px", /* tighter than corporate's 40px — engineering scale */
        dots: "20px 20px",
      },
    },
  },
  plugins: [],
};

export default config;
