"use client";

import dynamic from "next/dynamic";

const FlightSim = dynamic(() => import("@/components/sim/flight-sim"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-[#101722]">
      <span className="animate-pulse font-mono text-label-lg uppercase text-white/70">
        Initializing flight systems…
      </span>
    </div>
  ),
});

export default function FlightSimPage() {
  return <FlightSim />;
}
