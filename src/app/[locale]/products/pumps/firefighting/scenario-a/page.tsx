import { redirect } from "next/navigation";

/**
 * Sandbox scenario routes (scenario-a/b/c/d) were used during the
 * design review of section 3 "Как срабатывает". The winning variant
 * (Lakhta) now lives on the main product page. Redirect anyone who
 * still has a sandbox URL bookmarked so they don't hit a 404 during
 * the cleanup window between this commit and the final deletion in
 * session 2.
 */
export default function ScenarioARedirect() {
  redirect("/products/pumps/firefighting");
}
