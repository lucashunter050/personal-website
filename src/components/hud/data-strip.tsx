import * as React from "react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "@/components/hud/mono-label";
import { Separator } from "@/components/ui/separator";

export interface DataStripItem {
  label: string;
  value: React.ReactNode;
}

interface DataStripProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DataStripItem[];
  /** Slot pinned to the right end (e.g. a button) */
  trailing?: React.ReactNode;
}

/** Horizontal status bar with label/value segments — the mockup-2 repo strip. */
function DataStrip({ className, items, trailing, ...props }: DataStripProps) {
  return (
    <div
      className={cn(
        "flex w-full items-stretch gap-5 overflow-x-auto rounded-lg border border-border bg-card px-5 py-3.5",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <Separator orientation="vertical" className="h-auto self-stretch" />}
          <div className="flex min-w-max flex-col justify-center gap-0.5">
            <MonoLabel>{item.label}</MonoLabel>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        </React.Fragment>
      ))}
      {trailing && <div className="ml-auto flex min-w-max items-center pl-3">{trailing}</div>}
    </div>
  );
}

export { DataStrip };
