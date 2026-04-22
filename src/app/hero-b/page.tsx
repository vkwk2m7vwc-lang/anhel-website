import type { Metadata } from "next";
import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgProduct } from "@/components/hero/HeroBgProduct";

export const metadata: Metadata = {
  title: "Hero B · Продукт",
  description: "Вариант B: hero с реальным продуктом как главным героем.",
};

export default function HeroBPage() {
  return (
    <HeroShell
      variantLabel="Вариант B · Продукт"
      background={<HeroBgProduct />}
    />
  );
}
