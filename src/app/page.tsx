import { Hero } from "@/components/sections/hero";
import { MonoLabel } from "@/components/hud/mono-label";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Dashboard sections land here in Phase 5 */}
      <section
        id="systems"
        className="flex min-h-[50vh] items-center justify-center border-t border-border"
      >
        <MonoLabel>Climbing to FL120 — systems section under construction</MonoLabel>
      </section>
    </main>
  );
}
