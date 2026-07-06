"use client";

import * as React from "react";

export interface ControlsRef {
  pitchCmd: number;
  rollCmd: number;
  throttleDelta: number;
}

const KEYMAP: Record<string, Partial<Record<keyof ControlsRef, number>>> = {
  ArrowUp: { pitchCmd: -1 }, // stick forward = nose down (flight convention: up-arrow pushes)
  KeyW: { pitchCmd: -1 },
  ArrowDown: { pitchCmd: 1 },
  KeyS: { pitchCmd: 1 },
  ArrowLeft: { rollCmd: -1 },
  KeyA: { rollCmd: -1 },
  ArrowRight: { rollCmd: 1 },
  KeyD: { rollCmd: 1 },
  ShiftLeft: { throttleDelta: 1 },
  ShiftRight: { throttleDelta: 1 },
  ControlLeft: { throttleDelta: -1 },
  ControlRight: { throttleDelta: -1 },
};

/** Keyboard state as a mutable ref — read inside the render loop, never re-renders React. */
export function useControls() {
  const controls = React.useRef<ControlsRef>({ pitchCmd: 0, rollCmd: 0, throttleDelta: 0 });
  const held = React.useRef(new Set<string>());

  React.useEffect(() => {
    const recompute = () => {
      const c: ControlsRef = { pitchCmd: 0, rollCmd: 0, throttleDelta: 0 };
      for (const code of held.current) {
        const m = KEYMAP[code];
        if (!m) continue;
        if (m.pitchCmd) c.pitchCmd = clamp1(c.pitchCmd + m.pitchCmd);
        if (m.rollCmd) c.rollCmd = clamp1(c.rollCmd + m.rollCmd);
        if (m.throttleDelta) c.throttleDelta = clamp1(c.throttleDelta + m.throttleDelta);
      }
      controls.current = c;
    };
    const down = (e: KeyboardEvent) => {
      if (KEYMAP[e.code]) {
        e.preventDefault();
        held.current.add(e.code);
        recompute();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (held.current.delete(e.code)) recompute();
    };
    const blur = () => {
      held.current.clear();
      recompute();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  return controls;
}

function clamp1(n: number) {
  return Math.min(1, Math.max(-1, n));
}
