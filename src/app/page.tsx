import { Hero } from "@/components/sections/hero";
import { Systems } from "@/components/sections/systems";
import { Work } from "@/components/sections/work";
import { Lab } from "@/components/sections/lab";
import { Contact } from "@/components/sections/contact";
import { SkyBackdrop } from "@/components/sections/sky-backdrop";
import { SiteNav } from "@/components/nav";
import { AltitudeRail } from "@/components/hud/altitude-rail";

const RAIL_SECTIONS = [
  { id: "boot", label: "Splash", alt: "000" },
  { id: "systems", label: "Systems", alt: "120" },
  { id: "work", label: "Work", alt: "240" },
  { id: "lab", label: "Lab", alt: "360" },
  { id: "contact", label: "Contact", alt: "400" },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <AltitudeRail sections={RAIL_SECTIONS} />
      <main>
        <Hero />
        <div className="relative">
          <SkyBackdrop />
          <Systems />
          <Work />
          <Lab />
          <Contact />
        </div>
      </main>
    </>
  );
}
