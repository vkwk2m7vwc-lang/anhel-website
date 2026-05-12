import "./globals.css";

/**
 * Root layout — minimal pass-through.
 *
 * The actual HTML shell (<html>, <body>, providers, header, footer)
 * lives in `src/app/[locale]/layout.tsx`, which has access to the
 * resolved locale via params and can therefore set `<html lang>` and
 * locale-scoped metadata. This file exists only because Next.js
 * requires a root layout to anchor the route tree.
 *
 * Globals CSS is imported here (rather than in the locale layout)
 * because non-locale routes like API endpoints don't render HTML, but
 * any static asset / error page that does render needs the variables
 * defined here.
 *
 * No <html> tag here — the `[locale]` layout owns it. Returning bare
 * children is the next-intl App Router pattern and works in Next 14.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
