"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { CATALOG_PATH } from "@/lib/routes";
import { MegaMenu } from "./MegaMenu";

/**
 * Десктоп-обёртка для пункта «Продукты» — управляет состоянием
 * открыто/закрыто и поведением hover-моста (mouseleave с задержкой
 * 150мс, чтобы при движении курсора с пункта в меню не закрывалось).
 *
 * Поведение по ТЗ:
 *   • hover → открывается; mouseleave + 150мс → закрывается
 *   • click → toggle (для touch-устройств и keyboard)
 *   • Esc → закрывается
 *   • клик вне меню → закрывается
 *   • клик по карточке внутри → закрывается (вернётся uncontrolled на новый route)
 *
 * Компонент-обёртка обрамляется wrapper-div с `relative`-позицией,
 * под которой MegaMenu абсолютно позиционируется через `top-full`.
 */
export function ProductsMenu() {
  const t = useTranslations("common.nav");
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // mouseleave с задержкой 150мс — даём пользователю время довести
  // курсор от пункта шапки до карточек в меню.
  const scheduleClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };
  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Esc + клик вне меню.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <Link
        href={CATALOG_PATH}
        data-cursor="hover"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          // На touch-устройстве hover не сработает; первый клик —
          // открывает меню без перехода (если ещё не открыто), второй
          // клик — переход на /products.
          if (!open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="inline-flex items-center gap-1 text-sm text-[var(--color-secondary)]/70 transition-colors hover:text-[var(--color-secondary)]"
      >
        {t("products")}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          aria-hidden="true"
          className={
            "transition-transform duration-200 " +
            (open ? "rotate-180" : "rotate-0")
          }
        />
      </Link>
      <AnimatePresence>
        {open && <MegaMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
