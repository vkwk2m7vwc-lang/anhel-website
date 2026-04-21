import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { LoadingSplash } from "@/components/layout/LoadingSplash";

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
    default: "ANHEL — инженерное оборудование для зданий",
    template: "%s · ANHEL",
  },
  description:
    "ANHEL — производитель инженерного оборудования в Санкт-Петербурге. Насосные станции, пожарные установки, теплообменные пункты, системы водоподготовки.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ANHEL",
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
    <html lang="ru" className={fontVariables}>
      <body className="antialiased">
        <LenisProvider>
          <LoadingSplash />
          <CustomCursor />
          <Header />
          <PageTransition>
            <main className="min-h-screen">{children}</main>
            <Footer />
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
