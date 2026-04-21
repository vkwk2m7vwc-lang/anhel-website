import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

/**
 * ANHEL typography stack.
 *
 * BRAND.md asks for Neue Haas Grotesk Display + Söhne (paid). We use the
 * documented fallbacks so the project stays self-contained on Vercel.
 *
 * Each font is exposed as a CSS variable so Tailwind `font-display` /
 * `font-body` / `font-mono` pick it up via `tailwind.config.ts`.
 */

export const fontDisplay = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/** Combined className for <html> — attaches all three CSS variables at once. */
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontMono.variable,
].join(" ");
