import type { Metadata } from "next";
import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgVideo } from "@/components/hero/HeroBgVideo";

export const metadata: Metadata = {
  title: "Hero A · Видео",
  description: "Вариант A: hero с кинематографичным видео производства.",
};

export default function HeroAPage() {
  return (
    <HeroShell
      variantLabel="Вариант A · Видео"
      background={<HeroBgVideo />}
    />
  );
}
