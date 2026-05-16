"use client";

import { Link } from "@/navigation";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { DocumentsMegaMenu } from "./DocumentsMegaMenu";

/**
 * Обёртка пункта «Документация» в шапке. Логика hover/click/Esc/
 * outside-click — копия ProductsMenu (тот же UX, ничего сюрприза).
 *
 * Клик по самому пункту (когда меню закрыто) — открывает dropdown;
 * клик при открытом меню — переход на /documents (вся страница).
 * Touch-устройства получают тот же двойной-клик путь.
 */
export function DocumentsMenu() {
  const t = useTranslations("common.nav");
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        href="/documents"
        data-cursor="hover"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          if (!open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="inline-flex items-center gap-1 text-sm text-[var(--color-secondary)]/70 transition-colors hover:text-[var(--color-secondary)]"
      >
        {t("documents")}
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          aria-hidden="true"
          className={
            "transition-transform duration-200 " +
            (open ? "rotate-180" : "rotate-0")
          }
        />
      </Link>
      <AnimatePresence>
        {open && <DocumentsMegaMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
