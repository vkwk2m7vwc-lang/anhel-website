import type { Metadata } from "next";
import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgShowcase } from "@/components/hero/HeroBgShowcase";

export const metadata: Metadata = {
  title: "Hero D · Витрина",
  description:
    "Вариант D: живая витрина из четырёх продуктов с приоритетом. Клик — выбранный продукт становится главным.",
};

export default function HeroDPage() {
  return (
    <HeroShell
      variantLabel="Вариант D · Витрина"
      background={<HeroBgShowcase />}
    />
  );
}
