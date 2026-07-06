"use client";

import * as React from "react";

/** Live UTC clock, HH:MM:SSZ. Renders a placeholder until mounted to avoid hydration mismatch. */
export function ZuluClock() {
  const [time, setTime] = React.useState<string>("--:--:--Z");

  React.useEffect(() => {
    const tick = () => setTime(`${new Date().toISOString().slice(11, 19)}Z`);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}
