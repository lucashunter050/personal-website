import * as React from "react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "@/components/hud/mono-label";

function sparklinePath(data: number[], width: number, height: number): string {
  if (data.length < 2) return "";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 1.5;
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = pad + (1 - (v - min) / range) * (height - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

interface TelemetryStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  data?: number[];
}

/** Small stat card: mono label, value, optional inline sparkline. Mockup-2 right rail. */
function TelemetryStat({ className, label, value, data, ...props }: TelemetryStatProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-md border border-border bg-card px-4 py-3",
        className
      )}
      {...props}
    >
      <MonoLabel>{label}</MonoLabel>
      <div className="flex items-end justify-between gap-3">
        <span className="text-lg font-semibold leading-none">{value}</span>
        {data && data.length > 1 && (
          <svg
            width="64"
            height="20"
            viewBox="0 0 64 20"
            fill="none"
            className="shrink-0 text-foreground/70"
            aria-hidden="true"
          >
            <path d={sparklinePath(data, 64, 20)} stroke="currentColor" strokeWidth="1.25" />
          </svg>
        )}
      </div>
    </div>
  );
}

export { TelemetryStat };
