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
      // Variant 1 — Corporate: typographic ladder is dialled back.
      // Hero/section caps shrink so headlines read as functional, not
      // editorial; line-heights open slightly (1.0 → 1.1) for a more
      // formal cadence; letter-spacing flattens (negative tracking is
      // an editorial flourish that fights the corporate posture).
      fontSize: {
        hero: [
          "clamp(44px, 5.5vw, 96px)",
          { lineHeight: "1.05", letterSpacing: "-0.01em" },
        ],
        section: [
          "clamp(32px, 3.5vw, 56px)",
          { lineHeight: "1.1", letterSpacing: "-0.005em" },
        ],
        h2: [
          "clamp(24px, 2.4vw, 40px)",
          { lineHeight: "1.2", letterSpacing: "0" },
        ],
        h3: ["clamp(18px, 1.6vw, 24px)", { lineHeight: "1.3" }],
        body: ["clamp(15px, 1vw, 17px)", { lineHeight: "1.65" }],
        mono: ["11px", { lineHeight: "1.2", letterSpacing: "0.1em" }],
      },
      letterSpacing: {
        mono: "0.08em",
        hero: "-0.025em",
      },
      // Variant 1 — Corporate: sharper corners.
      // The whole language is rectangular; we cap at 4px so cards
      // and buttons read as structural blocks, not pebbles.
      borderRadius: {
        sm: "2px",
        md: "4px",
        lg: "4px",
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
      backgroundImage: {
        "steel-gradient": "linear-gradient(135deg, #C0C8D0 0%, #8A94A0 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        "grid-hairline":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
