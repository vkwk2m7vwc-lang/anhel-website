import type { Metadata } from "next";
import { Link } from "@/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { CONTROL_SYSTEMS_PRODUCTS } from "@/lib/products";
import { breadcrumbLd, ldScriptProps } from "@/lib/schema-org";

/**
 * /products/control-systems — раздел-каталог шкафов управления.
 *
 * 5 серий: variable-frequency, fire-suppression, smoke-control,
 * sewage-pumping, electric-actuators. Структурно идентичен
 * /products/pumps.
 *
 * i18n: hero/breadcrumb/showcase override — из
 * `products.families.control-systems.{meta,page}`. Карточки —
 * через `products.items.<slug>`.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "products.families.control-systems.meta",
  });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      title: t("og_title"),
      description: t("og_description"),
      url: "/products/control-systems",
    },
  };
}

export default function ControlSystemsCategoryPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("products");
  const tFamily = useTranslations("products.families.control-systems");

  const breadcrumbJsonLd = breadcrumbLd([
    { name: t("breadcrumbs.home"), url: "/" },
    { name: t("breadcrumbs.catalog"), url: "/products" },
    { name: tFamily("meta.breadcrumb"), url: "/products/control-systems" },
  ]);

  return (
    <>
      <script {...ldScriptProps(breadcrumbJsonLd)} />

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
                <Link
                  href="/products"
                  data-cursor="hover"
                  className="text-[var(--color-secondary)]/55 transition-colors hover:text-[var(--color-secondary)]"
                >
                  {t("breadcrumbs.catalog")}
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
                  {tFamily("meta.breadcrumb")}
                </span>
              </li>
            </ol>
          </nav>

          <p className="mono-tag mt-8">{tFamily("page.mono_tag")}</p>
          <h1 className="mt-4 max-w-[860px] font-display text-section font-medium text-[var(--color-secondary)]">
            {tFamily("page.heading")}
          </h1>
          <p className="mt-6 max-w-[640px] text-body text-[var(--color-secondary)]/70 md:mt-8">
            {tFamily("page.lede")}
          </p>
        </div>
      </section>

      <ProductsShowcase
        tone="page"
        monoTag={tFamily("page.showcase_mono_tag")}
        title={tFamily("page.showcase_title")}
        lede={tFamily("page.showcase_lede")}
        products={CONTROL_SYSTEMS_PRODUCTS}
      />
    </>
  );
}
