import * as React from "react";
import { cn } from "@/lib/utils";

interface CrosshairProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number;
}

function Crosshair({ className, size = 20, ...props }: CrosshairProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <line x1="12" y1="1.5" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="22.5" />
      <line x1="1.5" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="22.5" y2="12" />
    </svg>
  );
}

export { Crosshair };
