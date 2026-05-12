import { redirect } from "next/navigation";

/** See scenario-a/page.tsx for the rationale. */
export default function ScenarioCRedirect() {
  redirect("/products/pumps/firefighting");
}
