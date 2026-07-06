import { MonoLabel } from "@/components/hud/mono-label";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  /** Flight-level readout shown at the right edge, e.g. "FL120" */
  flightLevel: string;
}

export function SectionHeader({ eyebrow, title, flightLevel }: SectionHeaderProps) {
  return (
    <header className="mb-10 flex items-end justify-between gap-6">
      <div>
        <MonoLabel>{eyebrow}</MonoLabel>
        <h2 className="mt-2 font-display text-title uppercase stretch-condensed">{title}</h2>
      </div>
      <MonoLabel className="hidden shrink-0 md:block">{flightLevel}</MonoLabel>
    </header>
  );
}
