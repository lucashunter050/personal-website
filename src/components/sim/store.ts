import { create } from "zustand";

/**
 * Sim state mirrored out of the render loop for the DOM HUD.
 * Written every frame; HUD components subscribe with rounded selectors
 * so React only re-renders when a displayed digit actually changes.
 */
export interface SimReadout {
  /** knots */
  spd: number;
  /** feet */
  alt: number;
  /** degrees 0-359 */
  hdg: number;
  /** feet per minute */
  vs: number;
  /** degrees, +right */
  roll: number;
  /** degrees, +up */
  pitch: number;
  /** 0-1 */
  throttle: number;
  stalled: boolean;
}

export const useSimStore = create<SimReadout>(() => ({
  spd: 0,
  alt: 0,
  hdg: 0,
  vs: 0,
  roll: 0,
  pitch: 0,
  throttle: 0.6,
  stalled: false,
}));
