import React from "react";
import { COLORS, GROUND } from "../theme";
import { SketchArrow, SketchCircle, SketchLine, SketchPath, SketchPolygon, SketchRect } from "../lib/rough";

/* ---------------------------------- star --------------------------------- */

const starPoints = (outer: number, inner: number): [number, number][] => {
  const pts: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  return pts;
};

export const StarCharacter: React.FC<{
  x: number;
  y: number;
  size?: number;
  draw?: number;
  tool?: "none" | "magnifier" | "pencil";
  flip?: boolean;
  tilt?: number;
  opacity?: number;
}> = ({ x, y, size = 180, draw = 1, tool = "none", flip = false, tilt = -4, opacity = 1 }) => {
  const s = size / 200;
  const p = Math.max(0, Math.min(1, draw));
  const face = Math.max(0, Math.min(1, (p - 0.55) / 0.45));
  const pts = starPoints(96, 45).map(([px, py]) => [px, py] as [number, number]);

  return (
    <g transform={`translate(${x} ${y}) scale(${s * (flip ? -1 : 1)} ${s}) rotate(${tilt})`} opacity={opacity}>
      {/* arms */}
      <SketchLine x1={-56} y1={18} x2={-86} y2={48} draw={Math.min(1, p * 1.2)} sw={5} seed={71} />
      <SketchLine x1={56} y1={18} x2={86} y2={48} draw={Math.min(1, p * 1.2)} sw={5} seed={72} />
      <SketchPolygon points={pts} draw={p} fill={COLORS.sand} stroke={COLORS.ink} sw={4} seed={23} roughness={1.15} />
      {face > 0.02 ? (
        <g opacity={face}>
          <circle cx={-19} cy={2} r={6.4} fill={COLORS.ink} />
          <circle cx={19} cy={2} r={6.4} fill={COLORS.ink} />
          <path d="M -13 26 Q 0 35 13 26" fill="none" stroke={COLORS.ink} strokeWidth={3.4} strokeLinecap="round" />
        </g>
      ) : null}
      {tool === "magnifier" && face > 0.4 ? (
        <g opacity={face}>
          <SketchCircle cx={105} cy={58} d={54} stroke={COLORS.ink} sw={4} draw={p} seed={41} fill={COLORS.white} fillP={0.35} />
          <SketchLine x1={128} y1={82} x2={152} y2={106} draw={p} sw={6} seed={42} />
        </g>
      ) : null}
      {tool === "pencil" && face > 0.4 ? (
        <g opacity={face}>
          <SketchPolygon
            points={[[78, 64], [104, 90], [144, 50], [118, 24]]}
            draw={p}
            fill={COLORS.sand}
            sw={3.4}
            seed={43}
          />
          <SketchPolygon points={[[71, 71], [78, 64], [104, 90], [97, 97]]} draw={p} fill={COLORS.ink} sw={2.5} seed={44} />
          <SketchLine x1={112} y1={36} x2={132} y2={56} draw={p} sw={2.5} seed={45} />
        </g>
      ) : null}
    </g>
  );
};

/* --------------------------------- stick --------------------------------- */

export type Pose = "stand" | "point" | "hold" | "shrug" | "walk";

export const StickFigure: React.FC<{
  x: number;
  y?: number;
  scale?: number;
  draw?: number;
  pose?: Pose;
  flip?: boolean;
  hat?: boolean;
  glasses?: boolean;
  color?: string;
  opacity?: number;
}> = ({ x, y = GROUND - 8, scale = 1, draw = 1, pose = "stand", flip = false, hat = false, glasses = false, color = COLORS.ink, opacity = 1 }) => {
  const p = Math.max(0, Math.min(1, draw));
  const face = Math.max(0, Math.min(1, (p - 0.62) / 0.38));

  const arms: Record<Pose, [[number, number], [number, number], [number, number], [number, number]]> = {
    stand: [[-22, -132], [-48, -88], [22, -132], [48, -88]],
    point: [[-22, -132], [-48, -88], [22, -132], [78, -158]],
    hold: [[-22, -132], [-40, -102], [22, -132], [42, -102]],
    shrug: [[-22, -132], [-60, -140], [22, -132], [60, -140]],
    walk: [[-22, -132], [-46, -100], [22, -132], [48, -166]],
  };
  const [la, lb, ra, rb] = arms[pose];

  return (
    <g transform={`translate(${x} ${y}) scale(${scale * (flip ? -1 : 1)} ${scale})`} opacity={opacity}>
      <SketchCircle cx={0} cy={-184} d={46} draw={p} stroke={color} sw={4} seed={101} />
      <SketchLine x1={0} y1={-161} x2={0} y2={-72} draw={p} stroke={color} sw={4} seed={102} />
      <SketchLine x1={0} y1={-136} x2={la[0]} y2={la[1]} draw={p} stroke={color} sw={4} seed={103} />
      <SketchLine x1={la[0]} y1={la[1]} x2={lb[0]} y2={lb[1]} draw={p} stroke={color} sw={4} seed={104} />
      <SketchLine x1={0} y1={-136} x2={ra[0]} y2={ra[1]} draw={p} stroke={color} sw={4} seed={105} />
      <SketchLine x1={ra[0]} y1={ra[1]} x2={rb[0]} y2={rb[1]} draw={p} stroke={color} sw={4} seed={106} />
      <SketchLine x1={0} y1={-72} x2={-34} y2={0} draw={p} stroke={color} sw={4} seed={107} />
      <SketchLine x1={0} y1={-72} x2={32} y2={0} draw={p} stroke={color} sw={4} seed={108} />
      <circle cx={-8} cy={-190} r={2.8} fill={color} opacity={face} />
      <circle cx={8} cy={-190} r={2.8} fill={color} opacity={face} />
      <path d="M -6 -179 Q 0 -175 6 -179" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" opacity={face} />
      {glasses ? (
        <g opacity={face} stroke={color} strokeWidth={2.6} fill="none">
          <circle cx={-9} cy={-190} r={10} />
          <circle cx={9} cy={-190} r={10} />
          <line x1={1} y1={-190} x2={-1} y2={-190} />
        </g>
      ) : null}
      {hat ? (
        <g opacity={Math.min(1, p * 1.4)}>
          <SketchRect x={-34} y={-226} w={68} h={22} radius={6} draw={p} fill={COLORS.sand} sw={3.2} seed={109} />
          <SketchLine x1={-22} y1={-204} x2={22} y2={-204} draw={p} sw={3} seed={110} />
        </g>
      ) : null}
    </g>
  );
};

/* -------------------------------- building ------------------------------- */

export const Institute: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  draw?: number;
  label?: string;
  opacity?: number;
}> = ({ x, y, w = 360, h = 280, draw = 1, opacity = 1 }) => {
  const p = Math.max(0, Math.min(1, draw));
  const baseY = y;
  const top = y - h;
  const cols = 5;
  const colW = w / (cols + 1);
  return (
    <g opacity={opacity}>
      <SketchPolygon
        points={[[x, top + 62], [x + w / 2, top], [x + w, top + 62]]}
        draw={p}
        fill={COLORS.sand}
        sw={4}
        seed={121}
      />
      <SketchRect x={x} y={top + 62} w={w} h={h - 62} draw={p} fill={COLORS.white} sw={4} seed={122} />
      {Array.from({ length: cols }).map((_, i) => (
        <SketchLine
          key={i}
          x1={x + colW * (i + 1)}
          y1={top + 92}
          x2={x + colW * (i + 1)}
          y2={baseY - 30}
          draw={p}
          sw={3.5}
          seed={130 + i}
        />
      ))}
      <SketchLine x1={x + 10} y1={baseY - 30} x2={x + w - 10} y2={baseY - 30} draw={p} sw={3.5} seed={140} />
      <SketchRect x={x + w / 2 - 28} y={baseY - 92} w={56} h={62} draw={p} fill={COLORS.ink} fillP={0.1} sw={3} seed={141} />
      <SketchLine x1={x + w / 2} y1={top + 62} x2={x + w / 2} y2={top + 20} draw={p} sw={2.5} seed={142} />
    </g>
  );
};

/* ---------------------------------- car ---------------------------------- */

export const Car: React.FC<{
  x: number;
  y: number;
  scale?: number;
  draw?: number;
  color?: string;
  wheelSpin?: number;
}> = ({ x, y, scale = 1, draw = 1, color = COLORS.ink, wheelSpin = 0 }) => {
  const p = Math.max(0, Math.min(1, draw));
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <SketchPath
        d="M -95 -18 L -88 -58 Q -84 -72 -68 -72 L -30 -72 L -6 -100 Q 0 -108 14 -108 L 58 -108 Q 74 -108 82 -94 L 102 -66 L 112 -60 Q 122 -54 122 -38 L 122 -18 Q 122 -10 112 -10 L -88 -10 Q -96 -10 -95 -18 Z"
        draw={p}
        fill={COLORS.sand}
        sw={4}
        seed={151}
        stroke={color}
      />
      <SketchPath d="M -20 -74 L -2 -98 L 24 -98 L 24 -74 Z" draw={p} fill={COLORS.white} sw={3} seed={152} />
      <SketchPath d="M 34 -74 L 34 -98 L 56 -98 Q 66 -98 72 -88 L 84 -70 Z" draw={p} fill={COLORS.white} sw={3} seed={153} />
      <SketchLine x1={-95} y1={-38} x2={122} y2={-38} draw={p} sw={2.5} seed={154} opacity={0.4} />
      <SketchCircle cx={-54} cy={-4} d={44} draw={p} sw={4} seed={155} fill={COLORS.white} />
      <SketchCircle cx={76} cy={-4} d={44} draw={p} sw={4} seed={156} fill={COLORS.white} />
      <circle cx={-54} cy={-4} r={5} fill={color} opacity={p} />
      <circle cx={76} cy={-4} r={5} fill={color} opacity={p} />
      {wheelSpin ? (
        <g opacity={p * 0.6}>
          <line x1={-54} y1={-16} x2={-54} y2={8} stroke={color} strokeWidth={2} transform={`rotate(${wheelSpin} -54 -4)`} />
          <line x1={76} y1={-16} x2={76} y2={8} stroke={color} strokeWidth={2} transform={`rotate(${wheelSpin} 76 -4)`} />
        </g>
      ) : null}
    </g>
  );
};

export const Ramp: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  draw?: number;
  strip?: boolean;
}> = ({ x, y, w = 420, h = 210, draw = 1, strip = true }) => {
  const p = Math.max(0, Math.min(1, draw));
  return (
    <g>
      <SketchPolygon points={[[x, y], [x + w, y], [x + w, y - h]]} draw={p} fill={COLORS.sand} sw={4} seed={161} fillP={0.8} />
      <SketchLine x1={x + 10} y1={y} x2={x + w} y2={y} draw={p} sw={3} seed={162} />
      {strip ? <SketchLine x1={x + 200} y1={y} x2={x + 400} y2={y} draw={p} sw={7} stroke={COLORS.red} seed={163} /> : null}
    </g>
  );
};

/* --------------------------------- tools --------------------------------- */

export const Magnifier: React.FC<{
  x: number;
  y: number;
  size?: number;
  draw?: number;
  rotate?: number;
}> = ({ x, y, size = 120, draw = 1, rotate = 0 }) => {
  const p = Math.max(0, Math.min(1, draw));
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <SketchCircle cx={0} cy={0} d={size} stroke={COLORS.ink} sw={4.5} draw={p} fill={COLORS.white} fillP={0.45} seed={171} />
      <SketchLine x1={size * 0.32} y1={size * 0.32} x2={size * 0.62} y2={size * 0.62} draw={p} sw={7} seed={172} />
    </g>
  );
};

export const Pencil: React.FC<{
  x: number;
  y: number;
  len?: number;
  draw?: number;
  rotate?: number;
}> = ({ x, y, len = 150, draw = 1, rotate = -35 }) => {
  const p = Math.max(0, Math.min(1, draw));
  const w = len * 0.19;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <SketchPolygon
        points={[[0, -w / 2], [len * 0.82, -w / 2], [len, 0], [len * 0.82, w / 2], [0, w / 2]]}
        draw={p}
        fill={COLORS.sand}
        sw={3.4}
        seed={181}
      />
      <SketchPolygon points={[[len * 0.82, -w / 2], [len, 0], [len * 0.82, w / 2]]} draw={p} fill={COLORS.ink} sw={2.6} seed={182} />
      <SketchLine x1={len * 0.84} y1={-w / 2 + 4} x2={len * 0.84} y2={w / 2 - 4} draw={p} sw={2.5} seed={183} />
      <SketchLine x1={0} y1={0} x2={-14} y2={0} draw={p} sw={3} seed={184} />
    </g>
  );
};

export const Clock: React.FC<{
  x: number;
  y: number;
  size?: number;
  draw?: number;
  seconds?: number;
  label?: string;
}> = ({ x, y, size = 150, draw = 1, seconds = 33 }) => {
  const p = Math.max(0, Math.min(1, draw));
  const r = size / 2;
  const has = Math.min(1, Math.max(0, (p - 0.4) / 0.6));
  const handAngle = -Math.PI / 2 + (seconds / 60) * Math.PI * 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <SketchCircle cx={0} cy={0} d={size} draw={p} sw={4} seed={191} fill={COLORS.white} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={Math.cos(a) * (r - 12)}
            y1={Math.sin(a) * (r - 12)}
            x2={Math.cos(a) * (r - 5)}
            y2={Math.sin(a) * (r - 5)}
            stroke={COLORS.ink}
            strokeWidth={i % 3 === 0 ? 3 : 1.6}
            opacity={has * 0.7}
          />
        );
      })}
      <line x1={0} y1={0} x2={Math.cos(handAngle) * (r * 0.66)} y2={Math.sin(handAngle) * (r * 0.66)} stroke={COLORS.red} strokeWidth={4.5} strokeLinecap="round" opacity={has} />
      <line x1={0} y1={0} x2={0} y2={-r * 0.4} stroke={COLORS.ink} strokeWidth={4} strokeLinecap="round" opacity={has} />
      <circle cx={0} cy={0} r={5} fill={COLORS.ink} opacity={has} />
    </g>
  );
};

/* --------------------------------- scale --------------------------------- */

export const BalanceScale: React.FC<{
  x: number;
  y: number;
  w?: number;
  tilt?: number;
  draw?: number;
  leftColor?: string;
  rightColor?: string;
  leftWeight?: number;
  rightWeight?: number;
}> = ({ x, y, w = 440, tilt = 0, draw = 1, leftColor = COLORS.sand, rightColor = COLORS.sand, leftWeight = 1, rightWeight = 1 }) => {
  const p = Math.max(0, Math.min(1, draw));
  const beamY = y - 260;
  const half = w / 2;
  const leftX = x - Math.cos(tilt) * half;
  const leftY = beamY - Math.sin(tilt) * half;
  const rightX = x + Math.cos(tilt) * half;
  const rightY = beamY + Math.sin(tilt) * half;
  return (
    <g>
      <SketchLine x1={x} y1={y} x2={x} y2={beamY} draw={p} sw={5} seed={201} />
      <SketchLine x1={x - 70} y1={y} x2={x + 70} y2={y} draw={p} sw={5} seed={202} />
      <SketchPolygon points={[[x - 55, y], [x + 55, y], [x, y - 24]]} draw={p} fill={COLORS.ink} fillP={0.06} sw={3} seed={203} />
      <SketchLine x1={leftX} y1={leftY} x2={rightX} y2={rightY} draw={p} sw={5} seed={204} />
      <circle cx={x} cy={beamY} r={7} fill={COLORS.ink} opacity={p} />
      <SketchLine x1={leftX} y1={leftY} x2={leftX} y2={leftY + 54} draw={p} sw={2.6} seed={205} />
      <SketchLine x1={rightX} y1={rightY} x2={rightX} y2={rightY + 54} draw={p} sw={2.6} seed={206} />
      <SketchPath d={`M ${leftX - 46} ${leftY + 54} Q ${leftX} ${leftY + 92} ${leftX + 46} ${leftY + 54}`} draw={p} fill={leftColor} sw={3.2} seed={207} fillP={p * 0.9} />
      <SketchPath d={`M ${rightX - 46} ${rightY + 54} Q ${rightX} ${rightY + 92} ${rightX + 46} ${rightY + 54}`} draw={p} fill={rightColor} sw={3.2} seed={208} fillP={p * 0.9} />
      {leftWeight > 0 ? <text x={leftX} y={leftY + 36} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={32} fill={COLORS.ink} opacity={p}>{leftWeight}</text> : null}
      {rightWeight > 0 ? <text x={rightX} y={rightY + 36} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={32} fill={COLORS.ink} opacity={p}>{rightWeight}</text> : null}
    </g>
  );
};

