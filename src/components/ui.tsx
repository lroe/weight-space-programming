import React from "react";
import { COLORS, FONTS, H, W } from "../theme";
import { clamp01, fadeOut, pop, ramp, useT } from "../lib/time";

/* --------------------------------- canvas -------------------------------- */

export const Canvas: React.FC<{ children: React.ReactNode; z?: number; style?: React.CSSProperties }> = ({
  children,
  z,
  style,
}) => (
  <svg
    viewBox={`0 0 ${W} ${H}`}
    width={W}
    height={H}
    style={{ position: "absolute", inset: 0, overflow: "visible", zIndex: z, ...style }}
  >
    {children}
  </svg>
);

/* --------------------------------- labels -------------------------------- */

type Align = "center" | "left" | "right";

export const Label: React.FC<{
  children: React.ReactNode;
  x: number;
  y: number;
  at?: number;
  out?: number;
  size?: number;
  color?: string;
  font?: "display" | "label";
  weight?: number;
  align?: Align;
  rotate?: number;
  underline?: boolean;
  underlineColor?: string;
  opacity?: number;
  maxWidth?: number;
  nowrap?: boolean;
  letterSpacing?: number;
  style?: React.CSSProperties;
  z?: number;
}> = ({
  children,
  x,
  y,
  at,
  out,
  size = 64,
  color = COLORS.ink,
  font = "display",
  weight = 600,
  align = "center",
  rotate = 0,
  underline = false,
  underlineColor,
  opacity = 1,
  maxWidth,
  nowrap = true,
  letterSpacing,
  style,
  z,
}) => {
  const t = useT();
  const p = at === undefined ? 1 : pop(t, at, 0.42);
  if (p <= 0.001) return null;
  // Keep secondary copy legible on the dark canvas (never below lavender-grey).
  const readable = Math.max(opacity, 0.62);
  const o = readable * p * (out === undefined ? 1 : fadeOut(t, out, 0.34));
  if (o <= 0.001) return null;

  const anchor = align === "center" ? "translate(-50%, -50%)" : align === "left" ? "translate(0, -50%)" : "translate(-100%, -50%)";
  const scale = 0.93 + 0.07 * p;
  const family = font === "display" ? FONTS.display : FONTS.label;
  // Phone-safe type floor: no narrative label below 36px at 1080p.
  const fontSize = Math.max(36, size);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: z,
        transform: `${anchor} rotate(${rotate}deg) scale(${scale})`,
        opacity: o,
        color,
        fontFamily: family,
        fontSize,
        fontWeight: weight,
        lineHeight: 0.98,
        letterSpacing,
        textAlign: align,
        whiteSpace: nowrap ? "nowrap" : "normal",
        maxWidth,
        ...style,
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        {children}
        {underline ? (
          <svg
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              left: -8,
              right: -8,
              width: "calc(100% + 16px)",
              bottom: -Math.max(6, fontSize * 0.08),
              height: Math.max(8, fontSize * 0.11),
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            <path
              d="M 2 6 Q 30 2 52 6 T 98 5"
              fill="none"
              stroke={underlineColor ?? color}
              strokeWidth={3.2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - p}
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
};

export const Small: React.FC<{
  children: React.ReactNode;
  x: number;
  y: number;
  at?: number;
  out?: number;
  size?: number;
  color?: string;
  align?: Align;
  rotate?: number;
  opacity?: number;
  z?: number;
  maxWidth?: number;
  style?: React.CSSProperties;
}> = ({ children, x, y, at, out, size = 36, color = COLORS.ink, align = "center", rotate = 0, opacity = 1, z, maxWidth, style }) => {
  const t = useT();
  const p = at === undefined ? 1 : pop(t, at, 0.32);
  if (p <= 0.001) return null;
  // Secondary copy must stay readable on the dark canvas.
  const readable = Math.max(opacity, 0.62);
  const o = readable * p * (out === undefined ? 1 : fadeOut(t, out, 0.3));
  if (o <= 0.001) return null;
  const anchor = align === "center" ? "translate(-50%, -50%)" : align === "left" ? "translate(0, -50%)" : "translate(-100%, -50%)";
  // Phone-safe type floor: secondary labels stay at least 36px.
  const fontSize = Math.max(36, size);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: z,
        transform: `${anchor} rotate(${rotate}deg) scale(${0.96 + 0.04 * p})`,
        opacity: o,
        color,
        fontFamily: FONTS.label,
        fontSize,
        lineHeight: 1.05,
        textAlign: align,
        maxWidth,
        whiteSpace: maxWidth ? "normal" : "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ---------------------------------- card --------------------------------- */

export const Card: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  draw?: number;
  fill?: string;
  stroke?: string;
  radius?: number;
  rotate?: number;
  children?: React.ReactNode;
  padding?: number;
  seed?: number;
  fillP?: number;
  style?: React.CSSProperties;
}> = ({ x, y, w, h, draw = 1, fill = COLORS.sand, stroke = COLORS.ink, radius = 18, rotate = 0, children, padding = 28, seed = 9, fillP, style }) => {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transform: `rotate(${rotate}deg)`, ...style }}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <g>
          <RoughCardRect x={4} y={4} w={w - 8} h={h - 8} r={radius} draw={draw} fill={fill} stroke={stroke} seed={seed} fillP={fillP} />
        </g>
      </svg>
      <div style={{ position: "absolute", inset: 0, padding }}>{children}</div>
    </div>
  );
};

// small internal to avoid circular import complexity
import { SketchRect } from "../lib/rough";

const RoughCardRect: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  draw: number;
  fill: string;
  stroke: string;
  seed: number;
  fillP?: number;
}> = ({ x, y, w, h, r, draw, fill, stroke, seed, fillP }) => (
  <SketchRect x={x} y={y} w={w} h={h} radius={r} draw={draw} fill={fill} stroke={stroke} seed={seed} sw={3.2} fillP={fillP} />
);

/* -------------------------------- top tag -------------------------------- */

export const ChapterTag: React.FC<{
  num: string;
  name: string;
  at?: number;
  color?: string;
}> = ({ num, name, at, color = COLORS.ink }) => {
  const t = useT();
  const p = at === undefined ? 1 : ramp(t, at, at + 0.5);
  if (p <= 0.001) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 142,
        top: 53,
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity: p * 0.62,
        color,
        fontFamily: FONTS.label,
        fontSize: 25,
        letterSpacing: 2.5,
        textTransform: "uppercase",
        transform: `translateY(${(1 - p) * -8}px)`,
      }}
    >
      <span style={{ color: COLORS.sage, fontSize: 27 }}>{num}</span>
      <span style={{ width: 34, height: 2, backgroundColor: "currentColor", display: "inline-block", opacity: 0.5 }} />
      <span>{name}</span>
    </div>
  );
};

/* ------------------------------- dot grid -------------------------------- */

const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const DotGrid: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
  draw?: number;
  color?: string;
  highlight?: number[];
  hiColor?: string;
  r?: number;
  seed?: number;
  opacity?: number;
  onColor?: string;
}> = ({ x, y, w, h, cols, rows, draw = 1, color = COLORS.ink, highlight = [], hiColor = COLORS.red, r = 2.2, seed = 3, opacity = 0.6, onColor = COLORS.sage }) => {
  const dots = React.useMemo(() => {
    const rnd = mulberry32(seed);
    const out: { cx: number; cy: number; dx: number; dy: number; on: boolean }[] = [];
    const hi = new Set(highlight);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const idx = row * cols + col;
        out.push({
          cx: x + (col / Math.max(1, cols - 1)) * w,
          cy: y + (row / Math.max(1, rows - 1)) * h,
          dx: (rnd() - 0.5) * 2.2,
          dy: (rnd() - 0.5) * 2.2,
          on: hi.has(idx),
        });
      }
    }
    return out;
  }, [x, y, w, h, cols, rows, seed, highlight]);

  return (
    <g opacity={opacity}>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx + d.dx}
          cy={d.cy + d.dy}
          r={d.on ? r * 1.55 : r}
          fill={d.on ? hiColor : color}
          opacity={draw >= 1 ? 1 : clamp01((draw - (d.cx - x) / w * 0.35) * 2.4)}
        />
      ))}
    </g>
  );
};
