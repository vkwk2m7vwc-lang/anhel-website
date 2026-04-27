"use client";

import Link from "next/link";
import { CATALOG_PATH } from "@/lib/routes";
import { CONTACTS } from "@/lib/contacts";

/**
 * Minimal footer for Stage 1.
 *
 * The full footer (Stage 8 — sitemap, legal, контакты, mini-carousel) is
 * bigger than this; for now we keep a slim strip with the essentials so
 * the home page has a bottom edge and visitors see contact info.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-4 md:px-12 md:py-20">
        <div className="md:col-span-2">
          <p className="font-display text-2xl leading-tight md:text-3xl">
            ANHEL® — инженерное
            <br />
            оборудование для зданий,
            <br />
            которые будут стоять десятилетиями.
          </p>
          <p className="mt-6 max-w-md text-sm text-[var(--color-secondary)]/60">
            Офис — Санкт-Петербург, производство — Москва. Проектирование
            под задачу объекта, сервис и гарантия — от теплообменных пунктов
            до систем водоподготовки.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="mono-tag">Контакты</p>
          <Link
            href={`tel:${CONTACTS.phoneTel}`}
            data-cursor="hover"
            className="block text-[var(--color-secondary)]/80 hover:text-[var(--color-secondary)]"
          >
            {CONTACTS.phone}
          </Link>
          <Link
            href="mailto:info@anhelspb.com"
            data-cursor="hover"
            className="block text-[var(--color-secondary)]/80 hover:text-[var(--color-secondary)]"
          >
            info@anhelspb.com
          </Link>
          <p className="text-[var(--color-secondary)]/60">
            Политехническая ул., д. 6, стр. 1,
            <br />
            пом. 1-Н, Санкт-Петербург
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="mono-tag">Навигация</p>
          {[
            { label: "Продукты", href: CATALOG_PATH },
            { label: "Объекты", href: "/projects" },
            { label: "О компании", href: "/#about" },
            { label: "Производство", href: "/#manufacturing" },
            { label: "Сервис", href: "/service" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="block text-[var(--color-secondary)]/80 hover:text-[var(--color-secondary)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--color-hairline)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-[var(--color-secondary)]/65 md:flex-row md:items-center md:px-12">
          <p>© {year} ANHEL®. Все права защищены.</p>
          <p>Санкт-Петербург · anhelspb.com</p>
        </div>
      </div>
    </footer>
  );
}
