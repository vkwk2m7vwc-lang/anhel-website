import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { fontVariables } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { LoadingSplash } from "@/components/layout/LoadingSplash";
import { AnchorScrollHandler } from "@/components/layout/AnchorScrollHandler";
import { ldScriptProps, organizationLd } from "@/lib/schema-org";
import { locales, type Locale } from "@/i18n";

/**
 * Locale-aware layout.
 *
 * Renders the full HTML shell (<html>, <body>, providers, header,
 * footer, splash, cursor) so the locale is known when the framework
 * mounts these tree branches. Receives `params.locale` from the
 * `[locale]` route segment.
 *
 * Wires in order: fonts (CSS vars on <html>), Lenis smooth scroll,
 * first-paint splash, custom cursor, header, page transitions around
 * <main>, footer. Wraps the whole client tree in
 * NextIntlClientProvider so client components can `useTranslations()`
 * with the resolved messages.
 *
 * Metadata stays in this layout (and not the root) because canonical /
 * hreflang / OG fields are all locale-specific — they're filled out
 * properly in C7. For C2 the existing RU strings are reused across
 * all three locales; UI is also still hardcoded RU and only routing
 * changes are visible.
 */

/**
 * Tell Next.js which locale segments to pre-render at build time.
 * This is required for `[locale]` to be statically generated rather
 * than rendered on demand.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://anhelspb.com",
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Defensive 404 — should never trigger thanks to middleware, but
  // protects against direct hits to invalid `[locale]` values.
  if (!locales.includes(locale as Locale)) notFound();

  // Tell next-intl which locale this request is for, so APIs called
  // downstream (`getMessages`, `useTranslations` in async server
  // components) can resolve without reading headers — and the page
  // can therefore be statically rendered at build time.
  setRequestLocale(locale);

  // Pull messages for this request. `getMessages` reads what
  // `getRequestConfig` (src/i18n.ts) returned, scoped to the current
  // locale.
  const messages = await getMessages();
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
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
          {t("skip_link")}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <LenisProvider>
              <LoadingSplash />
              <AnchorScrollHandler />
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
