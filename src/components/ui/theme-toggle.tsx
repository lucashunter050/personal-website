"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={cn(className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Render both until mounted to avoid hydration mismatch; CSS hides the wrong one */}
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun />
        ) : (
          <Moon />
        )
      ) : (
        <>
          <Moon className="dark:hidden" />
          <Sun className="hidden dark:block" />
        </>
      )}
    </Button>
  );
}

export { ThemeToggle };
