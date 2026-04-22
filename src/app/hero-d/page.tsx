import type { Metadata } from "next";
import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgCarousel } from "@/components/hero/HeroBgCarousel";

export const metadata: Metadata = {
  title: "Hero D · Карусель (ручная)",
  description:
    "Вариант D: карусель из четырёх продуктов. Ручное переключение, без автосмены.",
};

export default function HeroDPage() {
  return (
    <HeroShell
      variantLabel="Вариант D · Карусель (ручная)"
      background={<HeroBgCarousel autoplay={false} />}
    />
  );
}
