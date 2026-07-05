import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground",
        outline: "rounded-full border border-border px-3 py-1 text-xs font-medium",
        solid: "rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground",
        // Tech-tag style: mono, uppercase, squared — for card meta rows
        mono: "rounded-sm border border-border px-2 py-0.5 font-mono text-label uppercase text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
