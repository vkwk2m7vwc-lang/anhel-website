import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgCarousel } from "@/components/hero/HeroBgCarousel";

/**
 * Home page.
 *
 * `/` renders the carousel hero (variant E) — four rotating product
 * renders with accent-tinted ambient + pedestal glow. Autoplay is on
 * with a 5-second interval; hovering the product zone pauses it.
 *
 * `/hero-e` keeps the same view for the moment so the dev team can
 * link to it in reviews without redirecting the root. Once Stage 3
 * closes we can drop `/hero-e` and leave only `/`.
 */
export default function Home() {
  return (
    <HeroShell
      variantLabel="ANHEL"
      background={<HeroBgCarousel autoplay={true} />}
    />
  );
}
