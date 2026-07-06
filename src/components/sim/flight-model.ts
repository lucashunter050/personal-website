/**
 * Physics-lite fixed-wing flight model — SI units internally (m, m/s, rad).
 *
 * Deliberately honest where a pilot would notice:
 * - Turns are coordinated: heading rate comes from bank angle (ω = g·tan(φ)/V),
 *   not from a yaw input. Steeper bank + slower speed = tighter turn.
 * - Energy trades: climbing bleeds airspeed (g·sin(θ) along the flight path),
 *   diving gains it back.
 * - Stall: below Vs the nose drops and ailerons get mushy until speed recovers.
 */

export interface FlightState {
  /** world position, m (three.js coords: y = up) */
  x: number;
  y: number;
  z: number;
  /** true airspeed, m/s */
  v: number;
  /** rad, +nose up */
  pitch: number;
  /** rad, +right wing down */
  roll: number;
  /** rad, 0 = -Z ("north"), increases turning right */
  hdg: number;
  stalled: boolean;
}

export interface FlightInputs {
  /** -1..1, +pitch up */
  pitchCmd: number;
  /** -1..1, +roll right */
  rollCmd: number;
  /** 0..1 */
  throttle: number;
}

const G = 9.81;
const MAX_THRUST_ACCEL = 8; // m/s² at full throttle
const DRAG_K = 8 / (240 * 240); // tops out ~240 m/s (~466 kt) level, full throttle
const ROLL_RATE = (100 * Math.PI) / 180; // rad/s
const PITCH_RATE = (25 * Math.PI) / 180;
const MAX_PITCH = (35 * Math.PI) / 180;
const MAX_ROLL = (80 * Math.PI) / 180;
const STALL_SPEED = 80; // m/s ≈ 155 kt
const FLOOR_ALT = 400; // m — soft floor above the undercast
const CEILING_ALT = 13000; // m

export const INITIAL_STATE: FlightState = {
  x: 0,
  y: 3200,
  z: 0,
  v: 180,
  pitch: 0,
  roll: 0,
  hdg: 0,
  stalled: false,
};

export function stepFlight(s: FlightState, input: FlightInputs, dt: number): FlightState {
  const stalled = s.v < STALL_SPEED;
  const authority = stalled ? 0.35 : 1; // mushy controls in the stall

  let roll = s.roll + input.rollCmd * ROLL_RATE * authority * dt;
  roll = clamp(roll, -MAX_ROLL, MAX_ROLL);

  let pitch = s.pitch + input.pitchCmd * PITCH_RATE * authority * dt;
  if (stalled) pitch -= 0.25 * dt; // nose drops until flying speed returns
  pitch = clamp(pitch, -MAX_PITCH, MAX_PITCH);

  // Speed: thrust − parasite drag − gravity along the flight path
  const accel = input.throttle * MAX_THRUST_ACCEL - DRAG_K * s.v * s.v - G * Math.sin(pitch);
  const v = Math.max(40, s.v + accel * dt);

  // Coordinated turn: ω = g·tan(bank) / V
  const hdgRate = (G * Math.tan(roll)) / Math.max(v, 60);
  const hdg = normalizeAngle(s.hdg + hdgRate * dt);

  // Integrate position along the nose vector (no AoA/slip modeling)
  const horiz = v * Math.cos(pitch) * dt;
  const x = s.x + Math.sin(hdg) * horiz;
  const z = s.z - Math.cos(hdg) * horiz;
  let y = s.y + v * Math.sin(pitch) * dt;

  // Soft floor/ceiling: ease the nose toward level instead of hard-clamping
  if (y < FLOOR_ALT) {
    y = FLOOR_ALT;
    pitch = Math.max(pitch, 0);
  } else if (y > CEILING_ALT) {
    y = CEILING_ALT;
    pitch = Math.min(pitch, 0);
  }

  return { x, y, z, v, pitch, roll, hdg, stalled };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function normalizeAngle(a: number) {
  const TWO_PI = Math.PI * 2;
  return ((a % TWO_PI) + TWO_PI) % TWO_PI;
}

/* Display conversions */
export const toKnots = (ms: number) => ms * 1.94384;
export const toFeet = (m: number) => m * 3.28084;
export const toFpm = (ms: number) => ms * 196.85;
export const toDeg = (rad: number) => (rad * 180) / Math.PI;
