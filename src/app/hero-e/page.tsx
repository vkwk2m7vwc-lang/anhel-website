import type { Metadata } from "next";
import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgCarousel } from "@/components/hero/HeroBgCarousel";

export const metadata: Metadata = {
  title: "Hero E · Карусель (автосмена)",
  description:
    "Вариант E: карусель из четырёх продуктов с автосменой каждые 5 секунд.",
};

export default function HeroEPage() {
  return (
    <HeroShell
      variantLabel="Вариант E · Карусель (авто)"
      background={<HeroBgCarousel autoplay={true} />}
      mobileProductInBackground
    />
  );
}
