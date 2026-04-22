import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgVideo } from "@/components/hero/HeroBgVideo";

/**
 * Home page (Stage 2).
 *
 * `/` currently shows hero variant A (video). Use the floating variant
 * switcher (or visit `/hero-a`, `/hero-b`, `/hero-c`) to compare the
 * three hero candidates side-by-side before we commit to one on the main
 * route for Stage 3.
 */
export default function Home() {
  return (
    <HeroShell
      variantLabel="Вариант A · Видео"
      background={<HeroBgVideo />}
    />
  );
}
