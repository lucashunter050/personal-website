"use client";

import * as React from "react";

/** Scroll-spy: returns the id of the section currently crossing the upper-middle viewport band. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = React.useState<string | undefined>(ids[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
