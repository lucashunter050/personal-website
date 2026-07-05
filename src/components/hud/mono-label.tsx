import * as React from "react";
import { cn } from "@/lib/utils";

function MonoLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("font-mono text-label uppercase text-muted-foreground", className)}
      {...props}
    />
  );
}

export { MonoLabel };
