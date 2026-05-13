import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

/**
 * next-intl middleware.
 *
 * `localePrefix: 'as-needed'` keeps RU on the bare root (`/`) and
 * prefixes everything else (`/en`, `/tr`). This preserves all
 * existing RU URLs already indexed by Google — no redirects needed.
 *
 * `localeDetection: false` — we deliberately do NOT auto-redirect
 * based on `Accept-Language`. Russian-speaking visitors who land
 * directly on `/` shouldn't be silently bounced to `/en` because their
 * OS happens to be in English. Locale autodetection will instead be
 * surfaced as a dismissable banner (deferred to a later PR).
 */
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
});

/**
 * Matcher — skip:
 *  - `/api/*` (REST endpoints, no locale)
 *  - `/_next/*` and `/_vercel/*` (framework internals)
 *  - anything with a literal `.` (static assets like /favicon.ico,
 *    generated routes like /robots.txt and /sitemap.xml — these are
 *    intentionally global, single-RU outputs in this PR; the
 *    multi-locale sitemap rebuild lands in C7)
 */
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
