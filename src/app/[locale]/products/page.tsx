import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * /products — каталог продуктовой линейки.
 *
 * Простая страница: hero-style header + ProductsShowcase с 4 карточками.
 * Используется как destination для:
 *   - "Смотреть каталог" CTA на главной hero
 *   - "Продукты" в Header NAV
 *   - Breadcrumb с продуктовых страниц
 *
 * i18n: вся UI-обвязка из `products.{meta,breadcrumbs,catalog}`.
 * Карточки внутри ProductsShowcase читают свой `products.items.<slug>`
 * при рендере независимо.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "products.meta" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      title: t("og_title"),
      description: t("og_description"),
      url: "/products",
    },
  };
}

export default function ProductsCatalogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("products");
  return (
    <>
      <section className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-28 md:px-12 md:pb-14 md:pt-32">
          <nav
            aria-label={t("breadcrumbs.label")}
            className="font-mono text-[11px]"
          >
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 uppercase tracking-[0.08em]">
              <li className="flex items-center gap-1.5">
                <Link
                  href="/"
                  data-cursor="hover"
                  className="text-[var(--color-secondary)]/55 transition-colors hover:text-[var(--color-secondary)]"
                >
                  {t("breadcrumbs.home")}
                </Link>
                <ChevronRight
                  aria-hidden="true"
                  size={12}
                  strokeWidth={1.5}
                  className="text-[var(--color-secondary)]/25"
                />
              </li>
              <li className="flex items-center gap-1.5">
                <span
                  aria-current="page"
                  className="text-[var(--color-secondary)]/80"
                >
                  {t("breadcrumbs.catalog")}
                </span>
              </li>
            </ol>
          </nav>

          <p className="mono-tag mt-8">{t("catalog.mono_tag")}</p>
          <h1 className="mt-4 max-w-[860px] font-display text-section font-medium text-[var(--color-secondary)]">
            {t("catalog.heading")}
          </h1>
          <p className="mt-6 max-w-[640px] text-body text-[var(--color-secondary)]/70 md:mt-8">
            {t("catalog.lede")}
          </p>
        </div>
      </section>

      {/* Top-level каталог — 4 раздела. Передаём page-specific overrides
          (mono_tag/title/lede) — иначе бы взялись дефолты из
          `home.showcase`. */}
      <ProductsShowcase
        tone="page"
        monoTag={t("catalog.showcase_mono_tag")}
        title={t("catalog.showcase_title")}
        lede={t("catalog.showcase_lede")}
      />
    </>
  );
}
