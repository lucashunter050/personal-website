import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusPillVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-mono text-label uppercase",
  {
    variants: {
      variant: {
        // Filled dark pill — "STATUS: ONLINE" in the mockup nav
        solid: "bg-primary px-3.5 py-1.5 text-primary-foreground",
        outline: "border border-border px-3.5 py-1.5 text-foreground",
        bare: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  /** Dot color; defaults to the status green */
  live?: boolean;
}

function StatusPill({ className, variant, live = true, children, ...props }: StatusPillProps) {
  return (
    <span className={cn(statusPillVariants({ variant, className }))} {...props}>
      <span
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          live ? "animate-pulse bg-status" : "bg-muted-foreground"
        )}
      />
      {children}
    </span>
  );
}

export { StatusPill };
