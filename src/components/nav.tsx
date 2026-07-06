"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/use-active-section";
import { StatusPill } from "@/components/hud/status-pill";
import { Crosshair } from "@/components/hud/crosshair";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/content/profile";

const LINKS = [
  { id: "systems", label: "Systems" },
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "contact", label: "Contact" },
] as const;

const LINK_IDS = LINKS.map((l) => l.id);

/** Sticky top nav — slides in once the visitor scrolls past the hero. */
export function SiteNav() {
  const active = useActiveSection(LINK_IDS);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-5 px-6">
        <a
          href="#boot"
          className="flex items-center gap-3 font-display text-lg font-semibold uppercase stretch-condensed"
        >
          {profile.name}
        </a>
        <span className="hidden font-mono text-label uppercase text-muted-foreground lg:block">
          {profile.tagline}
        </span>

        <nav className="ml-auto hidden items-center md:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                "relative px-3 py-2 font-mono text-label uppercase transition-colors",
                active === link.id
                  ? "text-foreground after:absolute after:inset-x-3 after:-bottom-px after:h-px after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <StatusPill className="hidden lg:inline-flex">Status: Online</StatusPill>
        <ThemeToggle className="max-md:ml-auto" />
        <Crosshair size={18} className="hidden text-muted-foreground md:block" />
      </div>
    </header>
  );
}
