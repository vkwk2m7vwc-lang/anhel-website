import { HonestIcomatHero } from "@/components/honest/HonestIcomatHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-icomat (icomat.co.uk inspired).
 *
 * Material aesthetic: канвас разделён на petrol-teal верх и
 * paper-белый низ. Заголовок «ANHEL — это честно» с background-clip
 * градиентом 50/50 «прорезает» границу — верхняя половина букв
 * читается как white-on-teal, нижняя как dark-on-paper.
 * Tech specs (DUTY · CYCLES · SERVICE) как material data sheet.
 */
export default function Home() {
  return (
    <>
      <HonestIcomatHero />
      <ProductsShowcase />
    </>
  );
}
