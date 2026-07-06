"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { World } from "@/components/sim/world";
import { SimHud } from "@/components/sim/sim-hud";
import { useControls } from "@/components/sim/use-controls";
import { cn } from "@/lib/utils";

const BOOT_LINES = [
  "FLIGHTDECK OS v2.0",
  "AVIONICS ............ OK",
  "FLIGHT MODEL ........ OK",
  "CLOUD LAYER ......... OK",
  "CONTROLS ............ ARMED",
];

export default function FlightSim() {
  const controls = useControls();
  const [booting, setBooting] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#101722]">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          booting ? "opacity-0" : "opacity-100"
        )}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ fov: 72, near: 1, far: 90000 }}
          gl={{ powerPreference: "high-performance" }}
        >
          <World controls={controls} />
        </Canvas>

        {/* Cockpit frame over the canvas */}
        <img
          src="/backgrounds/cockpit-frame-day.png"
          alt=""
          className="pointer-events-none absolute inset-0 hidden size-full select-none object-cover object-bottom md:block"
        />

        <SimHud />
      </div>

      {/* Boot sequence */}
      {booting && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex flex-col gap-1.5 font-mono text-label-lg uppercase text-white/85">
            {BOOT_LINES.map((line, i) => (
              <div
                key={line}
                className="animate-[terminal-line-in_300ms_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${i * 320}ms` }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
