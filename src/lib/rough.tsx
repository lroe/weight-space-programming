import React, { useMemo } from "react";
import rough from "roughjs/bin/rough";
import type { Drawable, Options, PathInfo } from "roughjs/bin/core";
import { COLORS } from "../theme";

/* ------------------------------- utilities ------------------------------- */

export const roundedRectPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  const rr = Math.min(r, w / 2, h / 2);
  return [
    `M ${x + rr} ${y}`,
    `L ${x + w - rr} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + rr}`,
    `L ${x + w} ${y + h - rr}`,
    `Q ${x + w} ${y + h} ${x + w - rr} ${y + h}`,
    `L ${x + rr} ${y + h}`,
    `Q ${x} ${y + h} ${x} ${y + h - rr}`,
    `L ${x} ${y + rr}`,
    `Q ${x} ${y} ${x + rr} ${y}`,
    "Z",
  ].join(" ");
};

const gen = rough.generator();

const buildPaths = (make: (g: typeof gen) => Drawable): PathInfo[] => {
  return gen.toPaths(make(gen));
};

export const useRoughPaths = (make: (g: typeof gen) => Drawable, deps: unknown[]) => {
  // The generator is deterministic when a seed is supplied.
  return useMemo(() => buildPaths(make), deps);
};

/* ----------------------------- path rendering ---------------------------- */

const RoughPathSet: React.FC<{
  paths: PathInfo[];
  draw: number;
  fillP?: number;
  opacity?: number;
  stagger?: number;
}> = ({ paths, draw, fillP, opacity = 1, stagger = 0 }) => {
  const n = paths.length;
  return (
    <g opacity={opacity}>
      {paths.map((p, i) => {
        const isFill = Boolean(p.fill && p.fill !== "none") && (!p.stroke || p.stroke === "none");
        const local =
          stagger > 0 && n > 1
            ? Math.max(0, Math.min(1, draw * (1 + stagger * (n - 1)) - i * stagger))
            : draw;
        if (isFill) {
          const fp = (fillP === undefined ? 1 : fillP) * Math.min(1, local * 1.6);
          if (fp <= 0.001) return null;
          return <path key={i} d={p.d} fill={p.fill} stroke="none" opacity={fp} />;
        }
        if (local <= 0.001) return null;
        // Phone-safe floor: no diagram stroke below 3px at 1080p.
        const strokeWidth = Math.max(3, p.strokeWidth ?? 3);
        return (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke={p.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - local}
          />
        );
      })}
    </g>
  );
};

/* -------------------------------- primitives ----------------------------- */

export type SketchProps = {
  draw?: number;
  fillP?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
  roughness?: number;
  bowing?: number;
  seed?: number;
  opacity?: number;
  stagger?: number;
  transform?: string;
};

const opts = (p: SketchProps): Options => ({
  stroke: p.stroke ?? COLORS.ink,
  strokeWidth: p.sw ?? 3,
  roughness: p.roughness ?? 1.1,
  bowing: p.bowing ?? 1,
  seed: p.seed ?? 7,
  fill: p.fill,
  fillStyle: "solid",
});

export const SketchLine: React.FC<
  SketchProps & { x1: number; y1: number; x2: number; y2: number }
> = ({ x1, y1, x2, y2, draw = 1, ...p }) => {
  const paths = useRoughPaths((g) => g.line(x1, y1, x2, y2, opts(p)), [
    x1, y1, x2, y2, p.stroke, p.sw, p.roughness, p.bowing, p.seed, p.fill,
  ]);
  return <RoughPathSet paths={paths} draw={draw} fillP={p.fillP} opacity={p.opacity} stagger={p.stagger} />;
};

export const SketchRect: React.FC<
  SketchProps & { x: number; y: number; w: number; h: number; radius?: number }
> = ({ x, y, w, h, radius = 0, draw = 1, ...p }) => {
  const paths = useRoughPaths(
    (g) =>
      radius > 0
        ? g.path(roundedRectPath(x, y, w, h, radius), opts(p))
        : g.rectangle(x, y, w, h, opts(p)),
    [x, y, w, h, radius, p.stroke, p.fill, p.sw, p.roughness, p.bowing, p.seed]
  );
  return <RoughPathSet paths={paths} draw={draw} fillP={p.fillP} opacity={p.opacity} stagger={p.stagger} />;
};

export const SketchCircle: React.FC<
  SketchProps & { cx: number; cy: number; d: number }
> = ({ cx, cy, d, draw = 1, ...p }) => {
  const paths = useRoughPaths((g) => g.circle(cx, cy, d, opts(p)), [
    cx, cy, d, p.stroke, p.fill, p.sw, p.roughness, p.bowing, p.seed,
  ]);
  return <RoughPathSet paths={paths} draw={draw} fillP={p.fillP} opacity={p.opacity} stagger={p.stagger} />;
};

export const SketchEllipse: React.FC<
  SketchProps & { cx: number; cy: number; w: number; h: number }
> = ({ cx, cy, w, h, draw = 1, ...p }) => {
  const paths = useRoughPaths((g) => g.ellipse(cx, cy, w, h, opts(p)), [
    cx, cy, w, h, p.stroke, p.fill, p.sw, p.roughness, p.bowing, p.seed,
  ]);
  return <RoughPathSet paths={paths} draw={draw} fillP={p.fillP} opacity={p.opacity} stagger={p.stagger} />;
};

export const SketchPolygon: React.FC<
  SketchProps & { points: [number, number][] }
> = ({ points, draw = 1, ...p }) => {
  const paths = useRoughPaths(
    (g) => g.polygon(points, opts(p)),
    [JSON.stringify(points), p.stroke, p.fill, p.sw, p.roughness, p.bowing, p.seed]
  );
  return <RoughPathSet paths={paths} draw={draw} fillP={p.fillP} opacity={p.opacity} stagger={p.stagger} />;
};

export const SketchPath: React.FC<SketchProps & { d: string }> = ({ d, draw = 1, ...p }) => {
  const paths = useRoughPaths((g) => g.path(d, opts(p)), [
    d, p.stroke, p.fill, p.sw, p.roughness, p.bowing, p.seed,
  ]);
  return <RoughPathSet paths={paths} draw={draw} fillP={p.fillP} opacity={p.opacity} stagger={p.stagger} />;
};

/* -------------------------------- arrow ---------------------------------- */

export const SketchArrow: React.FC<
  SketchProps & {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    bend?: number;
    head?: number;
    dashHead?: boolean;
  }
> = ({ x1, y1, x2, y2, bend = 0, head = 18, draw = 1, ...p }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = (x1 + x2) / 2 + nx * len * bend;
  const cy = (y1 + y2) / 2 + ny * len * bend;
  const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

  const tang = Math.atan2(y2 - cy, x2 - cx);
  const h1x = x2 - head * Math.cos(tang - 0.55);
  const h1y = y2 - head * Math.sin(tang - 0.55);
  const h2x = x2 - head * Math.cos(tang + 0.55);
  const h2y = y2 - head * Math.sin(tang + 0.55);

  const linePaths = useRoughPaths((g) => g.path(d, opts(p)), [
    d, p.stroke, p.sw, p.roughness, p.bowing, p.seed,
  ]);
  const headPaths = useRoughPaths(
    (g) => g.linearPath([[h1x, h1y], [x2, y2], [h2x, h2y]], { ...opts(p), stroke: p.stroke ?? COLORS.ink }),
    [h1x, h1y, h2x, h2y, x2, y2, p.stroke, p.sw, p.roughness, p.seed]
  );
  const hp = Math.max(0, Math.min(1, (draw - 0.62) / 0.38));

  return (
    <g opacity={p.opacity}>
      <RoughPathSet paths={linePaths} draw={draw} />
      <RoughPathSet paths={headPaths} draw={hp} />
    </g>
  );
};

/* ------------------------------- underline ------------------------------- */

export const SketchUnderline: React.FC<{
  x: number;
  y: number;
  w: number;
  color?: string;
  draw?: number;
  sw?: number;
  bow?: number;
}> = ({ x, y, w, color = COLORS.ink, draw = 1, sw = 3.5, bow = 0.5 }) => {
  const d = `M ${x} ${y} Q ${x + w * 0.45} ${y + 7 * bow} ${x + w} ${y - 2}`;
  const paths = useRoughPaths((g) => g.path(d, { stroke: color, strokeWidth: sw, roughness: 1.6, seed: 31 }), [
    d, color, sw,
  ]);
  return <RoughPathSet paths={paths} draw={draw} />;
};

/* --------------------------------- check --------------------------------- */

export const SketchCheck: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  draw?: number;
  sw?: number;
}> = ({ x, y, size = 40, color = COLORS.sage, draw = 1, sw = 5 }) => {
  const d = `M ${x} ${y} L ${x + size * 0.36} ${y + size * 0.38} L ${x + size} ${y - size * 0.32}`;
  const paths = useRoughPaths((g) => g.path(d, { stroke: color, strokeWidth: sw, roughness: 0.8, seed: 11 }), [
    d, color, sw,
  ]);
  return <RoughPathSet paths={paths} draw={draw} />;
};

export const SketchCross: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  draw?: number;
  sw?: number;
}> = ({ x, y, size = 32, color = COLORS.red, draw = 1, sw = 4.5 }) => {
  const d = `M ${x - size / 2} ${y - size / 2} L ${x + size / 2} ${y + size / 2} M ${x + size / 2} ${y - size / 2} L ${x - size / 2} ${y + size / 2}`;
  const paths = useRoughPaths((g) => g.path(d, { stroke: color, strokeWidth: sw, roughness: 0.9, seed: 13 }), [
    d, color, sw, size, x, y,
  ]);
  return <RoughPathSet paths={paths} draw={draw} />;
};
