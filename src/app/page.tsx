import { HonestDialogHero } from "@/components/honest/HonestDialogHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-3 «Dialog».
 *
 * Hero как разговор Q&A, где финальная реплика — бренд-position.
 * Вопросы (mono, dim) и ответы (display, full opacity) выровнены
 * по em-dash на левом краю как в книге диалогов.
 *
 * Финальный ответ — «Ничего. ANHEL — это честно.» — выбит крупнее
 * всех остальных и с accent-tinted ключевой частью.
 *
 * Ниже — обычный ProductsShowcase с main.
 */
export default function Home() {
  return (
    <>
      <HonestDialogHero />
      <ProductsShowcase />
    </>
  );
}
