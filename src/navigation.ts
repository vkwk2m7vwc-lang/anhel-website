import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "@/i18n";

/**
 * Locale-aware navigation wrappers.
 *
 * Wraps `next/link`, `useRouter`, `usePathname`, `redirect` so they
 * automatically add the active locale prefix to any internal URL.
 *
 * Why this exists:
 *   `<Link href="/products">` from `next/link` renders the exact href
 *   you write. With `localePrefix: 'as-needed'`, the middleware doesn't
 *   re-prefix in-app navigations — it only handles the initial request.
 *   So clicking from `/en/` onto a bare `/products` link landed the
 *   user on the RU `/products` page, losing the locale context.
 *
 *   The shared-pathnames navigation API (next-intl 3.x) wraps every
 *   navigation primitive so they inspect the active locale at render /
 *   call time and emit the prefixed URL (`/en/products`,
 *   `/tr/products`) automatically.
 *
 * Usage:
 *   import { Link, useRouter, usePathname, redirect } from "@/navigation";
 *   <Link href="/products">…</Link>     // → /en/products on EN
 *   router.push("/contacts")            // → /en/contacts on EN
 *   redirect("/products/pumps")         // → /en/products/pumps on EN
 *
 * External hrefs (https://…, mailto:, tel:) pass through unchanged.
 */
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
    localePrefix: "as-needed",
    defaultLocale,
  });
