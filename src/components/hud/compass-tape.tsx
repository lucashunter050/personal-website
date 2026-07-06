import * as React from "react";
import { cn } from "@/lib/utils";

const CARDINALS: Record<number, string> = {
  0: "N",
  45: "NE",
  90: "E",
  135: "SE",
  180: "S",
  225: "SW",
  270: "W",
  315: "NW",
};

function headingLabel(deg: number): string {
  const norm = ((deg % 360) + 360) % 360;
  return CARDINALS[norm] ?? String(norm).padStart(3, "0");
}

interface CompassTapeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Heading at the center of the tape, degrees */
  heading?: number;
  /** Degrees visible on each side of center */
  spread?: number;
}

/**
 * Decorative heading tape: minor ticks every 5°, labeled major ticks every 15°,
 * center caret, edges faded via CSS mask.
 */
function CompassTape({ className, heading = 0, spread = 60, ...props }: CompassTapeProps) {
  const first = Math.ceil((heading - spread) / 5) * 5;
  const ticks: { deg: number; pct: number }[] = [];
  for (let deg = first; deg <= heading + spread; deg += 5) {
    ticks.push({ deg, pct: ((deg - (heading - spread)) / (spread * 2)) * 100 });
  }

  return (
    <div
      className={cn(
        "relative h-10 w-full select-none overflow-hidden font-mono text-label text-muted-foreground",
        "[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {/* center caret */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2">▾</div>
      {ticks.map(({ deg, pct }) => {
        const major = deg % 15 === 0;
        return (
          <div
            key={deg}
            className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center gap-1"
            style={{ left: `${pct}%` }}
          >
            {major && <span>{headingLabel(deg)}</span>}
            <span className={cn("w-px bg-current opacity-60", major ? "h-2.5" : "h-1.5")} />
          </div>
        );
      })}
    </div>
  );
}

export { CompassTape };
