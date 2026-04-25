import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { LoadingSplash } from "@/components/layout/LoadingSplash";
import { ldScriptProps, organizationLd } from "@/lib/schema-org";

/**
 * Root layout.
 *
 * Wires up in order: fonts (CSS vars on <html>), Lenis smooth scroll,
 * first-paint splash, custom cursor, header, page transitions around
 * <main>, footer. Every piece is client-aware but the shell itself stays
 * a server component so metadata stays static.
 */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://anhelspb.com"
  ),
  title: {
    default: "ANHEL® — инженерное оборудование для зданий",
    template: "%s · ANHEL®",
  },
  description:
    "ANHEL® — производитель инженерного оборудования. Офис — Санкт-Петербург, производство — Москва. Насосные станции, пожарные установки, теплообменные пункты, системы водоподготовки.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ANHEL®",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning — required by next-themes: the inline
    // pre-hydration script sets `class="dark|light"` on <html> before
    // React mounts, which would otherwise trigger a class-attribute
    // mismatch warning on the very first render.
    <html lang="ru" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Site-wide Organization JSON-LD. Rendered once in <head> so
            Google's structured-data graph has a single canonical
            organization @id to link Product/Article/Breadcrumb
            records to. */}
        <script {...ldScriptProps(organizationLd())} />
      </head>
      <body className="antialiased">
        {/* Skip-link — first focusable element. Visually hidden by
            default; on Tab from a fresh page load it becomes a white
            pill in the top-left and Enter jumps focus past the fixed
            header into <main id="main-content">. WCAG 2.4.1. */}
        <a
          href="#main-content"
          className="sr-only rounded-md bg-[var(--color-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-primary)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300]"
        >
          Перейти к содержимому
        </a>
        <ThemeProvider>
          <LenisProvider>
            <LoadingSplash />
            <CustomCursor />
            <Header />
            <PageTransition>
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
              <Footer />
            </PageTransition>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
