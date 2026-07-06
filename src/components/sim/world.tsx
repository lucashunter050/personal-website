"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Sky, Clouds, Cloud } from "@react-three/drei";
import {
  INITIAL_STATE,
  stepFlight,
  toDeg,
  toFeet,
  toFpm,
  toKnots,
  type FlightState,
} from "@/components/sim/flight-model";
import { useSimStore } from "@/components/sim/store";
import type { ControlsRef } from "@/components/sim/use-controls";

/** Clouds wrap around the aircraft inside this cell, so the field never ends. */
const CELL = 26000;
const CLOUD_BASE = 2500;
const UNDERCAST_ALT = 1700;

interface Puff {
  seed: number;
  x: number;
  y: number;
  z: number;
  scale: number;
}

function makePuffs(count: number): Puff[] {
  // deterministic layout — no Math.random so SSR/replay stays stable
  const puffs: Puff[] = [];
  let s = 42;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  for (let i = 0; i < count; i++) {
    puffs.push({
      seed: i,
      x: (rand() - 0.5) * CELL,
      y: CLOUD_BASE + rand() * 600,
      z: (rand() - 0.5) * CELL,
      scale: 0.8 + rand() * 1.1,
    });
  }
  return puffs;
}

export function World({ controls }: { controls: React.RefObject<ControlsRef> }) {
  const camera = useThree((s) => s.camera);
  const flight = React.useRef<FlightState>({ ...INITIAL_STATE });
  const throttle = React.useRef(0.6);
  const cloudField = React.useRef<THREE.Group>(null);
  const undercast = React.useRef<THREE.Mesh>(null);
  const puffs = React.useMemo(() => makePuffs(26), []);

  React.useEffect(() => {
    camera.rotation.order = "YXZ";
  }, [camera]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20);
    const input = controls.current;

    throttle.current = THREE.MathUtils.clamp(
      throttle.current + input.throttleDelta * 0.3 * dt,
      0,
      1
    );

    const s = (flight.current = stepFlight(
      flight.current,
      { pitchCmd: input.pitchCmd, rollCmd: input.rollCmd, throttle: throttle.current },
      dt
    ));

    camera.position.set(s.x, s.y, s.z);
    camera.rotation.set(s.pitch, -s.hdg, -s.roll);
    if (s.stalled) {
      // stall buffet
      camera.rotation.x += (Math.random() - 0.5) * 0.006;
      camera.rotation.z += (Math.random() - 0.5) * 0.008;
    }

    // Wrap each cloud into the cell centred on the aircraft
    const field = cloudField.current;
    if (field) {
      for (const child of field.children) {
        child.position.x = wrap(child.position.x, s.x);
        child.position.z = wrap(child.position.z, s.z);
      }
    }
    // Featureless undercast just follows the aircraft
    undercast.current?.position.set(s.x, UNDERCAST_ALT, s.z);

    useSimStore.setState({
      spd: toKnots(s.v),
      alt: toFeet(s.y),
      hdg: (toDeg(s.hdg) + 360) % 360,
      vs: toFpm(s.v * Math.sin(s.pitch)),
      roll: toDeg(s.roll),
      pitch: toDeg(s.pitch),
      throttle: throttle.current,
      stalled: s.stalled,
    });
  });

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[4000, 600, -1500]}
        turbidity={6}
        rayleigh={1.6}
        mieCoefficient={0.004}
        mieDirectionalG={0.85}
      />
      <fogExp2 attach="fog" args={["#dfe9f3", 0.000028]} />
      <hemisphereLight args={["#bdd7f0", "#ffffff", 0.75]} />
      <directionalLight position={[4000, 1200, -1500]} intensity={2.1} color="#fff3e0" />

      <Clouds ref={cloudField} material={THREE.MeshLambertMaterial} limit={600}>
        {puffs.map((p) => (
          <Cloud
            key={p.seed}
            seed={p.seed}
            position={[p.x, p.y, p.z]}
            scale={p.scale}
            segments={12}
            bounds={[1400, 220, 1400]}
            volume={900}
            color="#ffffff"
            opacity={0.85}
            fade={4000}
            speed={0.06}
          />
        ))}
      </Clouds>

      {/* Solid undercast deck far below */}
      <mesh ref={undercast} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[60000, 48]} />
        <meshLambertMaterial color="#f4f7fb" />
      </mesh>
    </>
  );
}

function wrap(coord: number, center: number) {
  let d = coord - center;
  const half = CELL / 2;
  while (d > half) d -= CELL;
  while (d < -half) d += CELL;
  return center + d;
}
