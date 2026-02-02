'use client';

import { useEffect, useRef, useState } from 'react';

// Colors
const COLORS = {
  background: '#0a0a0a',
  bezel: '#1a1a1a',
  primary: '#FFFFFF',
  text: '#FFFFFF',
  groundDark: '#1a1a1a',
  tickMark: '#FFFFFF',
  sky: '#0a7cc4',
  ground: '#8B4513',
};

// Instrument size
const INSTRUMENT_SIZE = 200;
const BEZEL_WIDTH = 8;

interface FlightData {
  altitude: number;
  heading: number;
  airspeed: number;
  verticalSpeed: number;
  pitch: number;
  bank: number;
  slip: number; // Slip/skid ball position (-1 to 1, 0 = coordinated)
}

interface InstrumentProps {
  size: number;
  flightData: FlightData;
  animatedData: FlightData;
}

// Utility to convert degrees to radians
const toRad = (deg: number) => (deg * Math.PI) / 180;

// Utility to lerp values
const lerp = (current: number, target: number, factor: number) => {
  return current + (target - current) * factor;
};

// Normalize angle for smooth interpolation
const lerpAngle = (current: number, target: number, factor: number) => {
  let diff = target - current;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  return current + diff * factor;
};

// Draw bezel for all instruments
const drawBezel = (ctx: CanvasRenderingContext2D, size: number) => {
  const center = size / 2;
  const radius = size / 2 - 4;

  // Outer bezel
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.bezel;
  ctx.fill();

  // Inner background
  ctx.beginPath();
  ctx.arc(center, center, radius - BEZEL_WIDTH, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.background;
  ctx.fill();

  // Bezel ring
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.strokeStyle = COLORS.primary;
  ctx.lineWidth = 1;
  ctx.stroke();
};

// Artificial Horizon (Attitude Indicator)
function ArtificialHorizon({ size, animatedData }: InstrumentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = size / 2;
    const radius = size / 2 - BEZEL_WIDTH - 8;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Draw bezel
    drawBezel(ctx, size);

    // Clip to inner circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.clip();

    // Calculate horizon position based on pitch and bank
    // Positive pitch (nose up) = horizon moves DOWN (positive Y) = show more sky
    const pitchOffset = (animatedData.pitch / 90) * radius;
    // Positive bank (right) = horizon tilts counter-clockwise (right side up)
    const bankRad = toRad(-animatedData.bank);

    // Draw sky and ground
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(bankRad);

    // Sky (top half)
    ctx.fillStyle = COLORS.sky;
    ctx.fillRect(-size, -size, size * 2, size + pitchOffset);

    // Ground (bottom half)
    ctx.fillStyle = COLORS.ground;
    ctx.fillRect(-size, pitchOffset, size * 2, size);

    // Horizon line
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-size, pitchOffset);
    ctx.lineTo(size, pitchOffset);
    ctx.stroke();

    // Pitch ladder lines
    ctx.lineWidth = 1;
    ctx.font = '10px "Uncut Sans", sans-serif';
    ctx.fillStyle = COLORS.primary;
    ctx.textAlign = 'center';

    for (let pitch = -20; pitch <= 20; pitch += 10) {
      if (pitch === 0) continue;
      const y = pitchOffset - (pitch / 90) * radius;
      const lineWidth = pitch % 20 === 0 ? 30 : 20;

      ctx.beginPath();
      ctx.moveTo(-lineWidth, y);
      ctx.lineTo(lineWidth, y);
      ctx.stroke();
    }

    ctx.restore();
    ctx.restore();

    // Fixed aircraft symbol (center reference)
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 2;

    // Left wing
    ctx.beginPath();
    ctx.moveTo(center - 40, center);
    ctx.lineTo(center - 15, center);
    ctx.stroke();

    // Right wing
    ctx.beginPath();
    ctx.moveTo(center + 15, center);
    ctx.lineTo(center + 40, center);
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(center, center, 3, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    // Top triangle marker
    ctx.beginPath();
    ctx.moveTo(center, 20);
    ctx.lineTo(center - 8, 32);
    ctx.lineTo(center + 8, 32);
    ctx.closePath();
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    // Bank angle arc and marks
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 1;
    const bankArcRadius = radius - 5;

    // Bank marks at 10, 20, 30, 45, 60 degrees
    const bankMarks = [10, 20, 30, 45, 60];
    bankMarks.forEach((angle) => {
      [-angle, angle].forEach((a) => {
        const rad = toRad(-90 + a);
        const innerR = bankArcRadius - 8;
        const outerR = bankArcRadius;

        ctx.beginPath();
        ctx.moveTo(center + Math.cos(rad) * innerR, center + Math.sin(rad) * innerR);
        ctx.lineTo(center + Math.cos(rad) * outerR, center + Math.sin(rad) * outerR);
        ctx.stroke();
      });
    });
  }, [size, animatedData.pitch, animatedData.bank]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

// Altimeter
function Altimeter({ size, animatedData }: InstrumentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = size / 2;
    const radius = size / 2 - BEZEL_WIDTH - 8;

    ctx.clearRect(0, 0, size, size);
    drawBezel(ctx, size);

    // Tick marks (every 100ft = 36 degrees, so 10 ticks for 1000ft)
    ctx.strokeStyle = COLORS.tickMark;
    ctx.lineWidth = 1;

    for (let i = 0; i < 10; i++) {
      const angle = toRad(-90 + i * 36);
      const innerR = i % 5 === 0 ? radius - 20 : radius - 12;
      const outerR = radius - 4;

      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * innerR, center + Math.sin(angle) * innerR);
      ctx.lineTo(center + Math.cos(angle) * outerR, center + Math.sin(angle) * outerR);
      ctx.stroke();

      // Numbers at 0, 5
      if (i % 5 === 0) {
        ctx.font = '14px "Uncut Sans", sans-serif';
        ctx.fillStyle = COLORS.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textR = radius - 32;
        const num = i === 0 ? '0' : '5';
        ctx.fillText(num, center + Math.cos(angle) * textR, center + Math.sin(angle) * textR);
      }
    }

    // Altitude needle (100s of feet, wraps every 1000)
    const hundreds = (animatedData.altitude % 1000) / 100;
    const needleAngle = toRad(-90 + hundreds * 36);

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(needleAngle + Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(0, -radius + 25);
    ctx.lineTo(-4, 15);
    ctx.lineTo(4, 15);
    ctx.closePath();
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    ctx.restore();

    // Thousands needle (shorter, thicker)
    const thousands = animatedData.altitude / 1000;
    const thousandsAngle = toRad(-90 + (thousands % 10) * 36);

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(thousandsAngle + Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(0, -radius + 50);
    ctx.lineTo(-6, 10);
    ctx.lineTo(6, 10);
    ctx.closePath();
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    ctx.restore();

    // Digital readout
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(center - 30, center + 20, 60, 24);
    ctx.strokeStyle = COLORS.primary;
    ctx.strokeRect(center - 30, center + 20, 60, 24);

    ctx.font = '16px "Uncut Sans", sans-serif';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(animatedData.altitude).toString(), center, center + 32);

    // Center cap
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.bezel;
    ctx.fill();
    ctx.strokeStyle = COLORS.primary;
    ctx.stroke();
  }, [size, animatedData.altitude]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

// Heading Indicator
function HeadingIndicator({ size, animatedData }: InstrumentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = size / 2;
    const radius = size / 2 - BEZEL_WIDTH - 8;

    ctx.clearRect(0, 0, size, size);
    drawBezel(ctx, size);

    // Fixed top marker
    ctx.beginPath();
    ctx.moveTo(center, 16);
    ctx.lineTo(center - 8, 30);
    ctx.lineTo(center + 8, 30);
    ctx.closePath();
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    // Rotating compass rose
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(toRad(-animatedData.heading));

    // Tick marks every 10 degrees
    for (let i = 0; i < 36; i++) {
      const angle = toRad(i * 10 - 90);
      const isMajor = i % 3 === 0;
      const innerR = isMajor ? radius - 20 : radius - 12;
      const outerR = radius - 4;

      ctx.strokeStyle = COLORS.tickMark;
      ctx.lineWidth = isMajor ? 2 : 1;

      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
      ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
      ctx.stroke();

      // Cardinal and 30-degree labels
      if (i % 3 === 0) {
        ctx.font = '14px "Uncut Sans", sans-serif';
        ctx.fillStyle = COLORS.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textR = radius - 32;

        let label = '';
        const deg = i * 10;
        if (deg === 0) label = 'N';
        else if (deg === 90) label = 'E';
        else if (deg === 180) label = 'S';
        else if (deg === 270) label = 'W';
        else label = (deg / 10).toString();

        ctx.save();
        ctx.translate(Math.cos(angle) * textR, Math.sin(angle) * textR);
        ctx.rotate(toRad(animatedData.heading)); // Counter-rotate text
        ctx.fillText(label, 0, 0);
        ctx.restore();
      }
    }

    ctx.restore();

    // Aircraft symbol in center
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 2;

    // Fuselage
    ctx.beginPath();
    ctx.moveTo(center, center - 20);
    ctx.lineTo(center, center + 15);
    ctx.stroke();

    // Wings
    ctx.beginPath();
    ctx.moveTo(center - 15, center);
    ctx.lineTo(center + 15, center);
    ctx.stroke();

    // Tail
    ctx.beginPath();
    ctx.moveTo(center - 8, center + 12);
    ctx.lineTo(center + 8, center + 12);
    ctx.stroke();
  }, [size, animatedData.heading]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

// Airspeed Indicator (Cessna 172 style)
function AirspeedIndicator({ size, animatedData }: InstrumentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = size / 2;
    const radius = size / 2 - BEZEL_WIDTH - 8;

    ctx.clearRect(0, 0, size, size);
    drawBezel(ctx, size);

    // Cessna 172 style: 0 at top (12 o'clock), goes clockwise to 200
    // Full range is about 300 degrees of rotation
    const startAngle = -90; // 12 o'clock (0 kts)
    const angleRange = 300; // 300 degrees clockwise to reach 200 kts

    // Tick marks every 10 kts
    for (let speed = 0; speed <= 200; speed += 10) {
      const fraction = speed / 200;
      const angle = toRad(startAngle + fraction * angleRange);
      const isMajor = speed % 20 === 0;
      const innerR = isMajor ? radius - 20 : radius - 12;
      const outerR = radius - 4;

      ctx.strokeStyle = COLORS.tickMark;
      ctx.lineWidth = isMajor ? 2 : 1;

      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * innerR, center + Math.sin(angle) * innerR);
      ctx.lineTo(center + Math.cos(angle) * outerR, center + Math.sin(angle) * outerR);
      ctx.stroke();

      // Labels every 20 kts
      if (speed % 20 === 0) {
        ctx.font = '12px "Uncut Sans", sans-serif';
        ctx.fillStyle = COLORS.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textR = radius - 32;
        ctx.fillText(speed.toString(), center + Math.cos(angle) * textR, center + Math.sin(angle) * textR);
      }
    }

    // Needle
    const speedClamped = Math.max(0, Math.min(200, animatedData.airspeed));
    const needleFraction = speedClamped / 200;
    const needleAngle = toRad(startAngle + needleFraction * angleRange);

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(needleAngle + Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(0, -radius + 25);
    ctx.lineTo(-4, 15);
    ctx.lineTo(4, 15);
    ctx.closePath();
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    ctx.restore();

    // Center cap
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.bezel;
    ctx.fill();
    ctx.strokeStyle = COLORS.primary;
    ctx.stroke();

    // "KNOTS" label
    ctx.font = '10px "Uncut Sans", sans-serif';
    ctx.fillStyle = COLORS.text;
    ctx.textAlign = 'center';
    ctx.fillText('KNOTS', center, center + 20);
  }, [size, animatedData.airspeed]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

// Vertical Speed Indicator
function VerticalSpeedIndicator({ size, animatedData }: InstrumentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = size / 2;
    const radius = size / 2 - BEZEL_WIDTH - 8;

    ctx.clearRect(0, 0, size, size);
    drawBezel(ctx, size);

    // VSI: -2000 to +2000 fpm
    // Zero at 9 o'clock (180 degrees)
    // +2000 at 12 o'clock (270 degrees) - UP
    // -2000 at 6 o'clock (90 degrees) - DOWN
    const getAngle = (vs: number) => {
      return toRad(180 + (vs / 2000) * 90);
    };

    ctx.strokeStyle = COLORS.tickMark;
    ctx.fillStyle = COLORS.text;

    // Major ticks at: -2000, -1000, 0, +1000, +2000
    const majorVS = [-2000, -1000, 0, 1000, 2000];
    const majorLabels = ['2', '1', '0', '1', '2'];

    majorVS.forEach((vs, i) => {
      const angle = getAngle(vs);
      const innerR = radius - 20;
      const outerR = radius - 4;

      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * innerR, center + Math.sin(angle) * innerR);
      ctx.lineTo(center + Math.cos(angle) * outerR, center + Math.sin(angle) * outerR);
      ctx.stroke();

      // Labels
      ctx.font = '14px "Uncut Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const textR = radius - 32;
      ctx.fillText(majorLabels[i], center + Math.cos(angle) * textR, center + Math.sin(angle) * textR);
    });

    // Minor ticks at: -1500, -500, +500, +1500
    const minorVS = [-1500, -500, 500, 1500];

    minorVS.forEach((vs) => {
      const angle = getAngle(vs);
      const innerR = radius - 12;
      const outerR = radius - 4;

      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * innerR, center + Math.sin(angle) * innerR);
      ctx.lineTo(center + Math.cos(angle) * outerR, center + Math.sin(angle) * outerR);
      ctx.stroke();
    });

    // "UP" label near +1000 mark
    const upAngle = getAngle(1000);
    ctx.font = '10px "Uncut Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labelR = radius - 50;
    ctx.fillText('UP', center + Math.cos(upAngle) * labelR, center + Math.sin(upAngle) * labelR);

    // "DN" label near -1000 mark
    const dnAngle = getAngle(-1000);
    ctx.fillText('DN', center + Math.cos(dnAngle) * labelR, center + Math.sin(dnAngle) * labelR);

    // Needle
    const vsClamped = Math.max(-2000, Math.min(2000, animatedData.verticalSpeed));
    const needleAngle = getAngle(vsClamped);

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(needleAngle + Math.PI / 2);

    ctx.beginPath();
    ctx.moveTo(0, -radius + 25);
    ctx.lineTo(-4, 15);
    ctx.lineTo(4, 15);
    ctx.closePath();
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    ctx.restore();

    // Center cap
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.bezel;
    ctx.fill();
    ctx.strokeStyle = COLORS.primary;
    ctx.stroke();
  }, [size, animatedData.verticalSpeed]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

// Turn Coordinator
function TurnCoordinator({ size, animatedData }: InstrumentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const center = size / 2;
    const radius = size / 2 - BEZEL_WIDTH - 8;

    ctx.clearRect(0, 0, size, size);
    drawBezel(ctx, size);

    // Standard rate turn marks at 9 o'clock and 3 o'clock (horizontal)
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 2;

    // Left tick (9 o'clock)
    ctx.beginPath();
    ctx.moveTo(center - radius + 4, center);
    ctx.lineTo(center - radius + 16, center);
    ctx.stroke();

    // Right tick (3 o'clock)
    ctx.beginPath();
    ctx.moveTo(center + radius - 4, center);
    ctx.lineTo(center + radius - 16, center);
    ctx.stroke();

    // Airplane symbol (viewed from BEHIND)
    // Wings span wide, vertical tail fin points UP
    const wingSpan = radius * 1.4; // Wide wings
    const fuselageHeight = 25; // Vertical tail height

    // Bank angle from flight data
    // Positive bank (right) = airplane tilts right (right wing down)
    const bankAngle = toRad(animatedData.bank);

    ctx.save();
    ctx.translate(center, center - 10); // Position slightly above center
    ctx.rotate(bankAngle);

    ctx.strokeStyle = COLORS.primary;
    ctx.fillStyle = COLORS.primary;
    ctx.lineWidth = 2;

    // Wings (wide horizontal line - the dominant element)
    ctx.beginPath();
    ctx.moveTo(-wingSpan / 2, 0);
    ctx.lineTo(wingSpan / 2, 0);
    ctx.stroke();

    // Center fuselage body (small oval/circle)
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Vertical tail fin (goes UP from center)
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -fuselageHeight);
    ctx.stroke();

    // Small horizontal stabilizer at top of tail
    ctx.beginPath();
    ctx.moveTo(-8, -fuselageHeight + 5);
    ctx.lineTo(8, -fuselageHeight + 5);
    ctx.stroke();

    ctx.restore();

    // Inclinometer (slip/skid ball) - rectangular tube at bottom
    const tubeY = center + 45;
    const tubeWidth = 50;
    const tubeHeight = 14;

    // Tube background
    ctx.fillStyle = '#111';
    ctx.fillRect(center - tubeWidth / 2, tubeY - tubeHeight / 2, tubeWidth, tubeHeight);

    // Tube border
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.strokeRect(center - tubeWidth / 2, tubeY - tubeHeight / 2, tubeWidth, tubeHeight);

    // Center reference marks (two vertical lines where ball should be)
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(center - 6, tubeY - tubeHeight / 2);
    ctx.lineTo(center - 6, tubeY + tubeHeight / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center + 6, tubeY - tubeHeight / 2);
    ctx.lineTo(center + 6, tubeY + tubeHeight / 2);
    ctx.stroke();

    // Ball (moves based on slip - positive slip = ball moves right)
    const maxBallTravel = tubeWidth / 2 - 8;
    const ballOffset = animatedData.slip * maxBallTravel;
    ctx.beginPath();
    ctx.arc(center + ballOffset, tubeY, 5, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.primary;
    ctx.fill();

    // "L" and "R" labels at bottom, flanking the inclinometer
    ctx.font = '12px "Uncut Sans", sans-serif';
    ctx.fillStyle = COLORS.primary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('L', center - tubeWidth / 2 - 15, tubeY + 5);
    ctx.fillText('R', center + tubeWidth / 2 + 15, tubeY + 5);

    // "2 MIN" label below the inclinometer
    ctx.font = '9px "Uncut Sans", sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText('2 MIN', center, tubeY + 25);
  }, [size, animatedData.bank, animatedData.slip]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

// Instrument label component
function InstrumentLabel({ label }: { label: string }) {
  return (
    <div
      className="text-center mt-2 font-sans text-sm tracking-wider"
      style={{ color: COLORS.primary }}
    >
      {label}
    </div>
  );
}

// Flight physics constants
const PHYSICS = {
  PITCH_RATE: 0.3,         // Degrees per frame when key held (slower)
  BANK_RATE: 0.5,          // Degrees per frame when key held (slower)
  BANK_AUTO_LEVEL: 0.1,    // Degrees per frame auto-level (slower)
  THROTTLE_RATE: 0.8,      // Percent per frame
  MAX_PITCH: 30,           // Max pitch up/down
  MAX_BANK: 60,            // Max bank angle
  STALL_SPEED: 45,         // Knots
  STALL_PITCH_DROP: 0.1,   // How fast pitch drops when stalling (slower)
  VS_PER_PITCH: 80,        // FPM per degree of pitch
  HEADING_PER_BANK: 0.02,  // Degrees heading change per degree bank per frame (slower)
  AIRSPEED_THROTTLE_FACTOR: 0.01,  // How much throttle affects airspeed
  AIRSPEED_PITCH_FACTOR: 1.5,      // How much pitch affects airspeed (knots per degree)
  TARGET_AIRSPEED_BASE: 80,        // Base airspeed at 0 throttle
  TARGET_AIRSPEED_MAX: 160,        // Max airspeed at 100 throttle
};

// Extended flight data with throttle
interface FlightState extends FlightData {
  throttle: number;
}

// Main Instrument Panel
export default function InstrumentPanel() {
  // Flight state
  const [flightState, setFlightState] = useState<FlightState>({
    altitude: 5000,
    heading: 270,
    airspeed: 120,
    verticalSpeed: 0,
    pitch: 0,
    bank: 0,
    slip: 0,
    throttle: 50,
  });

  // Animated values for smooth instrument display
  const [animatedData, setAnimatedData] = useState<FlightData>({
    altitude: 5000,
    heading: 270,
    airspeed: 120,
    verticalSpeed: 0,
    pitch: 0,
    bank: 0,
    slip: 0,
  });

  // Track pressed keys
  const keysRef = useRef<Set<string>>(new Set());
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for arrow keys to avoid scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
        e.preventDefault();
      }
      keysRef.current.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main game loop
  useEffect(() => {
    const gameLoop = () => {
      const keys = keysRef.current;

      setFlightState((prev) => {
        let { altitude, heading, airspeed, pitch, bank, slip, throttle } = prev;

        // Handle pitch input (up/down arrows) - real yoke convention
        // Down arrow = pull yoke back (toward you) = nose UP = positive pitch = climb
        // Up arrow = push yoke forward (away from you) = nose DOWN = negative pitch = descend
        if (keys.has('ArrowDown')) {
          pitch = Math.min(PHYSICS.MAX_PITCH, pitch + PHYSICS.PITCH_RATE);
        }
        if (keys.has('ArrowUp')) {
          pitch = Math.max(-PHYSICS.MAX_PITCH, pitch - PHYSICS.PITCH_RATE);
        }

        // Handle bank input (left/right arrows)
        // Left arrow = yoke left = bank LEFT = negative bank
        // Right arrow = yoke right = bank RIGHT = positive bank
        if (keys.has('ArrowLeft')) {
          bank = Math.max(-PHYSICS.MAX_BANK, bank - PHYSICS.BANK_RATE);
        } else if (keys.has('ArrowRight')) {
          bank = Math.min(PHYSICS.MAX_BANK, bank + PHYSICS.BANK_RATE);
        } else {
          // Auto-level when no bank input
          if (Math.abs(bank) < PHYSICS.BANK_AUTO_LEVEL) {
            bank = 0;
          } else if (bank > 0) {
            bank -= PHYSICS.BANK_AUTO_LEVEL;
          } else {
            bank += PHYSICS.BANK_AUTO_LEVEL;
          }
        }

        // Handle throttle input (W/S keys)
        // W = power in = increase throttle
        // S = power out = decrease throttle
        if (keys.has('KeyW')) {
          throttle = Math.min(100, throttle + PHYSICS.THROTTLE_RATE);
        }
        if (keys.has('KeyS')) {
          throttle = Math.max(0, throttle - PHYSICS.THROTTLE_RATE);
        }

        // Handle rudder input (A/D keys)
        // A = left rudder = yaw left (decrease heading)
        // D = right rudder = yaw right (increase heading)
        // Rudder also affects slip/skid ball
        const RUDDER_RATE = 0.15; // Degrees per frame (slow yaw)
        const SLIP_RATE = 0.05;   // How fast slip changes
        const SLIP_DECAY = 0.03;  // How fast slip returns to coordinated

        let rudderInput = 0;
        if (keys.has('KeyA')) {
          heading -= RUDDER_RATE;
          rudderInput = -1; // Left rudder
        }
        if (keys.has('KeyD')) {
          heading += RUDDER_RATE;
          rudderInput = 1; // Right rudder
        }

        // Slip is affected by rudder input and bank
        // In a coordinated turn, bank and rudder should match
        // Too much rudder = skid (ball moves opposite to turn)
        // Too little rudder = slip (ball moves into turn)
        if (rudderInput !== 0) {
          slip += rudderInput * SLIP_RATE;
        } else {
          // Decay slip back to coordinated when no rudder input
          if (Math.abs(slip) < SLIP_DECAY) {
            slip = 0;
          } else if (slip > 0) {
            slip -= SLIP_DECAY;
          } else {
            slip += SLIP_DECAY;
          }
        }
        // Clamp slip
        slip = Math.max(-1, Math.min(1, slip));

        // Calculate target airspeed based on throttle
        const targetAirspeed = PHYSICS.TARGET_AIRSPEED_BASE +
          (throttle / 100) * (PHYSICS.TARGET_AIRSPEED_MAX - PHYSICS.TARGET_AIRSPEED_BASE);

        // Airspeed changes: approaches target, affected by pitch
        // Pitch up = slower, pitch down = faster
        const pitchAirspeedEffect = -pitch * PHYSICS.AIRSPEED_PITCH_FACTOR;
        const adjustedTarget = targetAirspeed + pitchAirspeedEffect;
        airspeed = lerp(airspeed, adjustedTarget, PHYSICS.AIRSPEED_THROTTLE_FACTOR);

        // Stall behavior: if below stall speed, nose drops (pitch becomes more negative)
        if (airspeed < PHYSICS.STALL_SPEED) {
          pitch = Math.max(-PHYSICS.MAX_PITCH, pitch - PHYSICS.STALL_PITCH_DROP);
        }

        // Calculate vertical speed from pitch
        // Positive pitch (nose up) = positive VS = climbing
        const verticalSpeed = pitch * PHYSICS.VS_PER_PITCH;

        // Update altitude based on vertical speed (VS is in fpm, we run at ~60fps)
        altitude += verticalSpeed / 60 / 60; // Convert fpm to feet per frame
        altitude = Math.max(0, altitude); // Ground floor

        // Update heading based on bank
        // More bank = faster turn
        heading += bank * PHYSICS.HEADING_PER_BANK;
        // Normalize heading to 0-359
        while (heading < 0) heading += 360;
        while (heading >= 360) heading -= 360;

        return {
          altitude,
          heading,
          airspeed,
          verticalSpeed,
          pitch,
          bank,
          slip,
          throttle,
        };
      });

      // Animate instrument displays smoothly (slower lerp for realistic instrument lag)
      setAnimatedData((prev) => ({
        altitude: lerp(prev.altitude, flightState.altitude, 0.05),
        heading: lerpAngle(prev.heading, flightState.heading, 0.05),
        airspeed: lerp(prev.airspeed, flightState.airspeed, 0.03),
        verticalSpeed: lerp(prev.verticalSpeed, flightState.verticalSpeed, 0.05),
        pitch: lerp(prev.pitch, flightState.pitch, 0.08),
        bank: lerp(prev.bank, flightState.bank, 0.08),
        slip: lerp(prev.slip, flightState.slip, 0.1),
      }));

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [flightState]);

  const instrumentProps: InstrumentProps = {
    size: INSTRUMENT_SIZE,
    flightData: flightState,
    animatedData,
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-8 outline-none"
      style={{ backgroundColor: COLORS.background }}
      tabIndex={0}
    >
      {/* HUD */}
      <div className="font-mono text-sm mb-6 flex gap-8" style={{ color: COLORS.primary }}>
        <span>ALT {Math.round(flightState.altitude).toString().padStart(5, ' ')} FT</span>
        <span>HDG {Math.round(flightState.heading).toString().padStart(3, '0')}°</span>
        <span>IAS {Math.round(flightState.airspeed).toString().padStart(3, ' ')} KTS</span>
        <span>THR {Math.round(flightState.throttle).toString().padStart(3, ' ')}%</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Row 1 */}
        <div className="flex flex-col items-center">
          <AirspeedIndicator {...instrumentProps} />
          <InstrumentLabel label="IAS" />
        </div>
        <div className="flex flex-col items-center">
          <ArtificialHorizon {...instrumentProps} />
          <InstrumentLabel label="ATT" />
        </div>
        <div className="flex flex-col items-center">
          <Altimeter {...instrumentProps} />
          <InstrumentLabel label="ALT" />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col items-center">
          <TurnCoordinator {...instrumentProps} />
          <InstrumentLabel label="TURN" />
        </div>
        <div className="flex flex-col items-center">
          <HeadingIndicator {...instrumentProps} />
          <InstrumentLabel label="HDG" />
        </div>
        <div className="flex flex-col items-center">
          <VerticalSpeedIndicator {...instrumentProps} />
          <InstrumentLabel label="VS" />
        </div>
      </div>

      {/* Controls hint */}
      <div className="mt-8 font-mono text-xs" style={{ color: '#666' }}>
        CONTROLS: ↓ PULL/CLIMB  ↑ PUSH/DESCEND / ←→ BANK / W/S THROTTLE / A/D RUDDER
      </div>
    </div>
  );
}
