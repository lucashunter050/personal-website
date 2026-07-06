"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/use-active-section";

export interface AltitudeSection {
  /** DOM id of the section element to observe */
  id: string;
  label: string;
  /** Flight-level style altitude readout, e.g. "120" */
  alt: string;
}

interface AltitudeRailProps {
  sections: AltitudeSection[];
  className?: string;
}

/**
 * Fixed left rail: vertical tape with a dot per section, scroll-spy via
 * IntersectionObserver. Scrolling the page = climbing through altitudes.
 */
function AltitudeRail({ sections, className }: AltitudeRailProps) {
  const ids = React.useMemo(() => sections.map((s) => s.id), [sections]);
  const activeId = useActiveSection(ids);

  return (
    <nav
      aria-label="Section altitude"
      className={cn(
        "fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block",
        className
      )}
    >
      <div className="mb-3 font-mono text-label uppercase text-muted-foreground">
        ALT
        <br />
        FT
      </div>
      <ul className="relative flex flex-col gap-10 border-l border-border pl-4">
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id} className="relative">
              {/* tick + dot on the rail line */}
              <span
                className={cn(
                  "absolute -left-[21.5px] top-1/2 size-2.5 -translate-y-1/2 rounded-full border transition-colors",
                  active
                    ? "border-foreground bg-foreground"
                    : "border-muted-foreground/50 bg-background"
                )}
              />
              <a
                href={`#${s.id}`}
                className={cn(
                  "flex flex-col font-mono text-label uppercase transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className={cn(active && "rounded-sm bg-primary px-1.5 py-0.5 text-primary-foreground")}>
                  {s.alt}
                </span>
                <span>{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { AltitudeRail };
