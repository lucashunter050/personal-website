"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSimStore } from "@/components/sim/store";
import { CompassTape } from "@/components/hud/compass-tape";
import { Crosshair } from "@/components/hud/crosshair";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

function Readout({ label, value, align = "left" }: { label: string; value: string; align?: "left" | "right" }) {
  return (
    <div className={cn("flex gap-3 font-mono text-label uppercase", align === "right" && "justify-end")}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

/** DOM HUD over the WebGL canvas — same primitives as the rest of the site. */
export function SimHud() {
  const router = useRouter();
  const spd = useSimStore((s) => Math.round(s.spd));
  const alt = useSimStore((s) => Math.round(s.alt / 10) * 10);
  const hdg = useSimStore((s) => Math.round(s.hdg));
  const vs = useSimStore((s) => Math.round(s.vs / 50) * 50);
  const throttle = useSimStore((s) => Math.round(s.throttle * 100));
  const stalled = useSimStore((s) => s.stalled);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 text-white/85">
      <div className="absolute left-6 top-6 flex flex-col gap-1 md:left-10 md:top-8">
        <Readout label="SPD" value={`${spd} KT`} />
        <Readout label="THR" value={`${throttle}%`} />
      </div>
      <div className="absolute right-6 top-6 flex flex-col gap-1 md:right-10 md:top-8">
        <Readout align="right" label="ALT" value={`${alt.toLocaleString()} FT`} />
        <Readout align="right" label="VS" value={`${vs > 0 ? "+" : ""}${vs} FPM`} />
      </div>

      <CompassTape
        heading={hdg}
        className="absolute left-1/2 top-7 hidden w-[520px] -translate-x-1/2 text-white/75 md:block"
      />

      <Crosshair
        size={40}
        strokeWidth={0.75}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50"
      />

      {stalled && (
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 animate-pulse rounded-md border border-red-400/70 px-4 py-1.5 font-mono text-label-lg uppercase text-red-300">
          Stall
        </div>
      )}

      {/* Controls hint + exit */}
      <div className="absolute inset-x-0 bottom-6 hidden items-center justify-center gap-5 font-mono text-label uppercase text-white/60 md:flex">
        <span className="flex items-center gap-1.5">
          <Kbd className="bg-white/10 text-white/80">W</Kbd>
          <Kbd className="bg-white/10 text-white/80">S</Kbd> pitch
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd className="bg-white/10 text-white/80">A</Kbd>
          <Kbd className="bg-white/10 text-white/80">D</Kbd> roll
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd className="bg-white/10 text-white/80">⇧</Kbd>
          <Kbd className="bg-white/10 text-white/80">⌃</Kbd> throttle
        </span>
        <span className="flex items-center gap-1.5">
          <Kbd className="bg-white/10 text-white/80">ESC</Kbd> exit
        </span>
      </div>

      <button
        onClick={() => router.push("/")}
        className="pointer-events-auto absolute right-6 bottom-6 rounded-md border border-white/40 px-3 py-1.5 font-mono text-label uppercase text-white/80 transition-colors hover:bg-white/10 md:right-10"
      >
        Exit sim
      </button>

      <div className="absolute bottom-6 left-6 font-mono text-label uppercase text-white/50 md:hidden">
        Keyboard required — best on desktop
      </div>
    </div>
  );
}
