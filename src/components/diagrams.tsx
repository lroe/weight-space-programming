import React, { useMemo } from "react";
import { COLORS, FONTS } from "../theme";
import { SketchCircle, SketchLine, SketchPath, SketchRect } from "../lib/rough";
import { Card, Canvas, DotGrid, Label, Small } from "./ui";
import { clamp01 } from "../lib/time";

/* ------------------------------ random utils ----------------------------- */

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

/* ------------------------------- network --------------------------------- */

export const NetworkDiagram: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  layers?: number[];
  draw?: number;
  nodeR?: number;
  highlight?: number[];
  nodeHighlights?: { layer: number; node: number; color?: string }[];
  labels?: string[];
  opacity?: number;
  seed?: number;
  nodeFill?: string;
  showConnections?: boolean;
}> = ({
  x,
  y,
  w,
  h,
  layers = [4, 6, 6, 3],
  draw = 1,
  nodeR = 11,
  highlight = [],
  nodeHighlights = [],
  labels,
  opacity = 1,
  seed = 12,
  nodeFill = COLORS.sand,
  showConnections = true,
}) => {
  const p = clamp01(draw);
  const { nodes, conns } = useMemo(() => {
    const rnd = mulberry32(seed);
    const ns: { x: number; y: number; layer: number; idx: number }[] = [];
    const L = layers.length;
    layers.forEach((count, li) => {
      const lx = L === 1 ? x + w / 2 : x + (li / (L - 1)) * w;
      for (let i = 0; i < count; i++) {
        const ly = count === 1 ? y + h / 2 : y + (i / (count - 1)) * h;
        ns.push({ x: lx + (rnd() - 0.5) * 4, y: ly + (rnd() - 0.5) * 4, layer: li, idx: i });
      }
    });
    const cs: { a: number; b: number; layer: number }[] = [];
    let offset = 0;
    const offsets: number[] = [];
    layers.forEach((c) => {
      offsets.push(offset);
      offset += c;
    });
    for (let li = 0; li < L - 1; li++) {
      for (let i = 0; i < layers[li]; i++) {
        for (let j = 0; j < layers[li + 1]; j++) {
          cs.push({ a: offsets[li] + i, b: offsets[li + 1] + j, layer: li });
        }
      }
    }
    return { nodes: ns, conns: cs };
  }, [x, y, w, h, layers, seed]);

  const hi = new Set(nodeHighlights.map((n) => `${n.layer}:${n.node}`));
  const hiColor = (layer: number, node: number) =>
    nodeHighlights.find((n) => n.layer === layer && n.node === node)?.color ?? COLORS.sage;

  return (
    <g opacity={opacity}>
      {highlight.map((li) => {
        const lx = layers.length === 1 ? x + w / 2 : x + (li / (layers.length - 1)) * w;
        return (
          <rect
            key={li}
            x={lx - nodeR - 22}
            y={y - nodeR - 22}
            width={nodeR * 2 + 44}
            height={h + nodeR * 2 + 44}
            rx={18}
            fill={COLORS.sage}
            opacity={0.08 * p}
          />
        );
      })}
      {showConnections
        ? conns.map((c, i) => {
            const a = nodes[c.a];
            const b = nodes[c.b];
            const local = clamp01((p - c.layer * 0.13) / 0.45);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={COLORS.ink}
                strokeWidth={1.25}
                opacity={0.32 * local}
              />
            );
          })
        : null}
      {nodes.map((n, i) => {
        const local = clamp01((p - n.layer * 0.09) / 0.42);
        const isHi = hi.has(`${n.layer}:${n.idx}`);
        const fill = isHi ? hiColor(n.layer, n.idx) : nodeFill;
        return (
          <g key={i} opacity={local}>
            <SketchCircle
              cx={n.x}
              cy={n.y}
              d={nodeR * 2}
              draw={local}
              fill={fill}
              fillP={isHi ? 0.9 : 0.65}
              sw={2.6}
              seed={seed + i * 7}
              roughness={0.8}
            />
            {isHi ? <circle cx={n.x} cy={n.y} r={nodeR + 6} fill="none" stroke={hiColor(n.layer, n.idx)} strokeWidth={2} opacity={0.45 * local} /> : null}
          </g>
        );
      })}
      {labels
        ? labels.map((l, i) => {
            const lx = layers.length === 1 ? x + w / 2 : x + (i / (layers.length - 1)) * w;
            return (
              <text
                key={i}
                x={lx}
                y={y + h + 42}
                textAnchor="middle"
                fontFamily={FONTS.label}
                fontSize={30}
                fill={COLORS.ink}
                opacity={0.65 * p}
              >
                {l}
              </text>
            );
          })
        : null}
    </g>
  );
};

/* ------------------------------- weight grid ----------------------------- */

export const WeightMatrix: React.FC<{
  x: number;
  y: number;
  cols?: number;
  rows?: number;
  cell?: number;
  gap?: number;
  seed?: number;
  draw?: number;
  numbers?: boolean;
  highlight?: { r: number; c: number; color?: string }[];
  highlightCols?: number[];
  highlightRows?: number[];
  outline?: boolean;
  opacity?: number;
  dim?: number;
}> = ({
  x,
  y,
  cols = 16,
  rows = 10,
  cell = 28,
  gap = 3,
  seed = 21,
  draw = 1,
  numbers = false,
  highlight = [],
  highlightCols = [],
  highlightRows = [],
  outline = true,
  opacity = 1,
  dim = 1,
}) => {
  const p = clamp01(draw);
  const vals = useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: rows * cols }, () => rnd() * 2 - 1);
  }, [rows, cols, seed]);
  const hi = new Map(highlight.map((h) => [`${h.r}:${h.c}`, h.color ?? COLORS.red]));
  const colHi = new Set(highlightCols);
  const rowHi = new Set(highlightRows);
  const width = cols * cell;
  const height = rows * cell;

  return (
    <g opacity={opacity * dim}>
      {vals.map((v, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const key = `${r}:${c}`;
        const hColor = hi.get(key);
        const bg =
          hColor ??
          (v > 0.16
            ? COLORS.sage
            : v < -0.16
              ? COLORS.red
              : COLORS.sand);
        const alpha = hColor
          ? 0.9
          : Math.abs(v) > 0.16
            ? 0.12 + Math.min(0.42, Math.abs(v) * 0.4)
            : 0.45;
        const local = clamp01((p - (c / cols) * 0.32) / 0.5);
        return (
          <g key={i} opacity={local}>
            <rect
              x={x + c * cell + gap / 2}
              y={y + r * cell + gap / 2}
              width={cell - gap}
              height={cell - gap}
              rx={2}
              fill={bg}
              opacity={alpha * (colHi.has(c) || rowHi.has(r) ? 1.6 : 1)}
            />
            {numbers && cell >= 34 ? (
              <text
                x={x + c * cell + cell / 2}
                y={y + r * cell + cell / 2 + 6}
                textAnchor="middle"
                fontFamily={FONTS.label}
                fontSize={cell * 0.34}
                fill={COLORS.ink}
                opacity={0.62}
              >
                {(v * 3).toFixed(1)}
              </text>
            ) : null}
            {hColor ? (
              <rect
                x={x + c * cell + 1}
                y={y + r * cell + 1}
                width={cell - 2}
                height={cell - 2}
                fill="none"
                stroke={COLORS.ink}
                strokeWidth={1.5}
                opacity={0.8}
              />
            ) : null}
          </g>
        );
      })}
      {highlightCols.map((c) => (
        <rect
          key={`hc${c}`}
          x={x + c * cell - 1}
          y={y - 8}
          width={cell + 2}
          height={height + 16}
          fill={COLORS.sage}
          opacity={0.1}
        />
      ))}
      {highlightRows.map((r) => (
        <rect
          key={`hr${r}`}
          x={x - 8}
          y={y + r * cell - 1}
          width={width + 16}
          height={cell + 2}
          fill={COLORS.sage}
          opacity={0.1}
        />
      ))}
      {outline ? (
        <SketchRect x={x - 7} y={y - 7} w={width + 14} h={height + 14} draw={p} stroke={COLORS.ink} sw={3} seed={seed + 5} roughness={0.9} />
      ) : null}
    </g>
  );
};

/* ------------------------------ number sheet ----------------------------- */

export const NumberSheet: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  rotate?: number;
  seed?: number;
  draw?: number;
  rows?: number;
  cols?: number;
  size?: number;
  opacity?: number;
}> = ({ x, y, w, h, rotate = -2.5, seed = 34, draw = 1, rows = 19, cols = 7, size = 17, opacity = 1 }) => {
  const lines = useMemo(() => {
    const rnd = mulberry32(seed);
    const arr: { v: number; text: string }[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: { v: number; text: string }[] = [];
      for (let c = 0; c < cols; c++) {
        const v = (rnd() * 2 - 1) * (rnd() > 0.5 ? 1 : 0.22);
        const abs = Math.abs(v);
        const text = v < 0 ? `-${abs.toFixed(3)}` : `${abs.toFixed(3)}`;
        row.push({ v, text });
      }
      arr.push(row);
    }
    return arr;
  }, [rows, cols, seed]);

  return (
    <Card x={x} y={y} w={w} h={h} fill={COLORS.white} rotate={rotate} draw={draw} radius={3} padding={0} seed={seed + 1}>
      <div
        style={{
          position: "absolute",
          inset: 20,
          overflow: "hidden",
          fontFamily: FONTS.label,
          fontSize: size,
          lineHeight: 1.34,
          opacity,
        }}
      >
        {lines.map((row, r) => (
          <div key={r} style={{ display: "flex", gap: w * 0.018, justifyContent: "space-between" }}>
            {row.map((n, c) => (
              <span
                key={c}
                style={{
                  color: n.v < -0.2 ? "rgba(255,85,85,0.78)" : n.v > 0.2 ? "rgba(80,250,123,0.7)" : "rgba(248,248,242,0.48)",
                  minWidth: 64,
                  textAlign: "right",
                }}
              >
                {n.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

/* -------------------------------- code window ---------------------------- */

export const CodeWindow: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title?: string;
  lines: { text: string; color?: string; bold?: boolean; at?: number; indent?: number }[];
  draw?: number;
  rotate?: number;
  size?: number;
  highlightAt?: number;
}> = ({ x, y, w, h, title = "thread.py", lines, draw = 1, rotate = 0, size = 30, highlightAt }) => {
  return (
    <Card x={x} y={y} w={w} h={h} fill={COLORS.white} rotate={rotate} draw={draw} radius={10} padding={0} seed={77}>
      <div style={{ position: "absolute", left: 26, right: 26, top: 18, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: FONTS.label, color: COLORS.ink, opacity: 0.62, fontSize: 24 }}>
        <span>{title}</span>
        <span style={{ letterSpacing: 4 }}>···</span>
      </div>
      <div style={{ position: "absolute", left: 26, right: 26, top: 62, bottom: 20, overflow: "hidden", fontFamily: FONTS.label, fontSize: size, lineHeight: 1.4 }}>
        {lines.map((l, i) => (
          <div
            key={i}
            style={{
              color: l.color ?? COLORS.ink,
              fontWeight: l.bold ? 700 : 400,
              paddingLeft: (l.indent ?? 0) * 26,
              backgroundColor: highlightAt === i ? "rgba(255,85,85,0.16)" : "transparent",
              whiteSpace: "pre",
            }}
          >
            <span style={{ opacity: 0.32, display: "inline-block", width: 34, fontSize: size * 0.8 }}>{i + 1}</span>
            {l.text}
          </div>
        ))}
      </div>
    </Card>
  );
};

/* -------------------------------- chat bubble ---------------------------- */

export const Bubble: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  from?: "user" | "seller" | "model";
  draw?: number;
  rotate?: number;
  size?: number;
  accent?: string;
  at?: number;
}> = ({ x, y, w, h, text, from = "user", draw = 1, rotate = 0, size = 28, accent }) => {
  const fill = from === "user" ? COLORS.white : from === "seller" ? COLORS.sand : COLORS.white;
  const edge = accent ?? (from === "seller" ? COLORS.red : COLORS.ink);
  return (
    <Card x={x} y={y} w={w} h={h} fill={fill} rotate={rotate} draw={draw} radius={26} padding={24} seed={from === "user" ? 81 : 82}>
      <div style={{ fontFamily: FONTS.label, fontSize: size, color: COLORS.ink, lineHeight: 1.2 }}>
        <span style={{ color: edge, fontSize: size * 0.72, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.8 }}>{from}</span>
        <div style={{ marginTop: 10 }}>{text}</div>
      </div>
    </Card>
  );
};

/* --------------------------------- bars ---------------------------------- */

export type BarDatum = {
  label: string;
  value: number;
  display?: string;
  color?: string;
  faint?: boolean;
  at?: number;
};

export const BarsH: React.FC<{
  x: number;
  y: number;
  w: number;
  data: BarDatum[];
  max?: number;
  rowH?: number;
  labelW?: number;
  draw?: number;
  t?: number;
  color?: string;
  labelSize?: number;
  valueSize?: number;
  axis?: boolean;
}> = ({ x, y, w, data, max, rowH = 76, labelW = 210, draw = 1, color = COLORS.ink, labelSize = 30, valueSize = 42, axis = true }) => {
  const p = clamp01(draw);
  const mx = max ?? Math.max(...data.map((d) => d.value)) * 1.05;
  const bw = w - labelW - 120;
  return (
    <g>
      {axis ? <SketchLine x1={x + labelW} y1={y - 26} x2={x + labelW} y2={y + data.length * rowH + 10} draw={p} sw={2.5} opacity={0.45} seed={301} /> : null}
      {data.map((d, i) => {
        const by = y + i * rowH;
        const local = clamp01((p - i * 0.08) / 0.55);
        const len = Math.max(2, (d.value / mx) * bw * local);
        const col = d.color ?? color;
        return (
          <g key={i} opacity={Math.min(1, local * 2)}>
            <text x={x + labelW - 22} y={by + rowH * 0.58} textAnchor="end" fontFamily={FONTS.label} fontSize={labelSize} fill={COLORS.ink} opacity={d.faint ? 0.48 : 0.82}>
              {d.label}
            </text>
            <rect x={x + labelW} y={by + 10} width={bw} height={rowH - 26} fill={COLORS.ink} opacity={0.035} rx={4} />
            <rect x={x + labelW} y={by + 10} width={len} height={rowH - 26} fill={col} opacity={d.faint ? 0.16 : 0.24} rx={4} />
            <SketchRect x={x + labelW} y={by + 10} w={Math.max(6, len)} h={rowH - 26} draw={local} stroke={col} sw={2.8} seed={310 + i} roughness={0.9} />
            <text x={x + labelW + len + 16} y={by + rowH * 0.6} fontFamily={FONTS.display} fontSize={valueSize} fontWeight={600} fill={col} opacity={local}>
              {d.display ?? d.value}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/* -------------------------------- go board ------------------------------- */

export const GoBoard: React.FC<{
  x: number;
  y: number;
  size?: number;
  n?: number;
  draw?: number;
  stones?: { r: number; c: number; black?: boolean; hi?: string }[];
  stoneDraw?: number;
}> = ({ x, y, size = 520, n = 9, draw = 1, stones = [], stoneDraw = 1 }) => {
  const p = clamp01(draw);
  const gap = size / (n - 1);
  const star = n === 9 ? [2, 4, 6] : n === 13 ? [3, 6, 9] : [];
  return (
    <g>
      <SketchRect x={x} y={y} w={size} h={size} draw={p} fill={COLORS.sand} fillP={0.45} sw={3.4} seed={321} />
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <SketchLine x1={x} y1={y + i * gap} x2={x + size} y2={y + i * gap} draw={p} sw={2.1} seed={330 + i} roughness={0.8} opacity={0.8} />
          <SketchLine x1={x + i * gap} y1={y} x2={x + i * gap} y2={y + size} draw={p} sw={2.1} seed={350 + i} roughness={0.8} opacity={0.8} />
        </g>
      ))}
      {star.map((a) =>
        star.map((b) => <circle key={`${a}-${b}`} cx={x + a * gap} cy={y + b * gap} r={4.5} fill={COLORS.ink} opacity={p * 0.8} />)
      )}
      {stones.map((s, i) => {
        const local = clamp01((stoneDraw - i * 0.01) / 0.4);
        const cx = x + s.c * gap;
        const cy = y + s.r * gap;
        return (
          <g key={i} opacity={local}>
            <SketchCircle cx={cx} cy={cy} d={gap * 0.88} draw={local} fill={s.black ? COLORS.ink : COLORS.white} fillP={s.black ? 0.92 : 0.95} stroke={COLORS.ink} sw={2.6} seed={380 + i} roughness={0.7} />
            {s.hi ? <circle cx={cx} cy={cy} r={gap * 0.56} fill="none" stroke={s.hi} strokeWidth={4} opacity={0.8} /> : null}
          </g>
        );
      })}
    </g>
  );
};

/* ------------------------------- loss curve ------------------------------ */

export const LossCurve: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  draw?: number;
  ball?: number;
  local?: boolean;
  label?: string;
}> = ({ x, y, w, h, draw = 1, ball = 0.5, local = true, label = "loss" }) => {
  const p = clamp01(draw);
  const points: [number, number][] = [];
  const N = 80;
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const v =
      0.55 +
      0.16 * Math.sin(u * Math.PI * 2.1 + 0.8) +
      (local ? 0.12 * Math.exp(-Math.pow((u - 0.36) / 0.09, 2)) : 0) -
      0.34 * Math.exp(-Math.pow((u - 0.78) / 0.13, 2)) +
      u * 0.04;
    points.push([x + u * w, y + v * h]);
  }
  const d = points.map(([px, py], i) => (i === 0 ? `M ${px} ${py}` : `L ${px} ${py}`)).join(" ");
  const bx = x + ball * w;
  const by = y + (0.55 + 0.16 * Math.sin(ball * Math.PI * 2.1 + 0.8) + (local ? 0.12 * Math.exp(-Math.pow((ball - 0.36) / 0.09, 2)) : 0) - 0.34 * Math.exp(-Math.pow((ball - 0.78) / 0.13, 2)) + ball * 0.04) * h;
  return (
    <g>
      <SketchLine x1={x} y1={y + h + 18} x2={x} y2={y - 18} draw={p} sw={3} seed={401} />
      <SketchLine x1={x - 12} y1={y + h + 18} x2={x + w + 26} y2={y + h + 18} draw={p} sw={3} seed={402} />
      <SketchPath d={d} draw={p} sw={3.6} seed={403} roughness={1.2} />
      <SketchCircle cx={bx} cy={by} d={28} draw={p} fill={COLORS.red} fillP={0.9} sw={2.4} seed={404} />
      <text x={x - 18} y={y - 26} textAnchor="end" fontFamily={FONTS.label} fontSize={32} fill={COLORS.ink} opacity={0.6 * p}>{label}</text>
    </g>
  );
};

/* ------------------------------- transformer ----------------------------- */

export const BlockStack: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  draw?: number;
  inputs?: boolean;
  outputs?: boolean;
  label?: string;
  highlight?: number[];
  color?: string;
}> = ({ x, y, w = 300, h = 78, draw = 1, inputs = true, outputs = true, label, highlight = [], color = COLORS.sage }) => {
  const p = clamp01(draw);
  const gap = 18;
  return (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const by = y + i * (h + gap);
        const isHi = highlight.includes(i);
        return (
          <g key={i}>
            <SketchRect x={x} y={by} w={w} h={h} draw={p} fill={isHi ? COLORS.sage : COLORS.sand} fillP={isHi ? 0.16 : 0.6} sw={3} seed={410 + i} />
            <text x={x + w / 2} y={by + h * 0.62} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.7 * p}>
              block {i + 1}
            </text>
            <path
              d={`M ${x + 22} ${by + 18} q 12 -12 24 0 q 12 12 24 0`}
              fill="none"
              stroke={COLORS.ink}
              strokeWidth={2}
              opacity={0.35 * p}
            />
          </g>
        );
      })}
      {inputs ? (
        <g opacity={0.7 * p}>
          <SketchRect x={x + w * 0.2} y={y - 62} w={w * 0.6} h={38} draw={p} fill={COLORS.white} sw={2.4} seed={420} />
          <text x={x + w / 2} y={y - 36} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>input</text>
          <SketchLine x1={x + w / 2} y1={y - 24} x2={x + w / 2} y2={y - 4} draw={p} sw={2} seed={421} />
        </g>
      ) : (
        <g opacity={0.7 * p}>
          <SketchRect x={x + w * 0.2} y={y - 62} w={w * 0.6} h={38} draw={p} stroke={COLORS.red} sw={2} seed={422} />
          <SketchLine x1={x + w * 0.2 + 12} y1={y - 54} x2={x + w * 0.8 - 12} y2={y - 32} draw={p} sw={3} stroke={COLORS.red} seed={423} />
          <SketchLine x1={x + w * 0.2 + 12} y1={y - 32} x2={x + w * 0.8 - 12} y2={y - 54} draw={p} sw={3} stroke={COLORS.red} seed={424} />
        </g>
      )}
      {outputs ? (
        <g opacity={0.7 * p}>
          <SketchLine x1={x + w / 2} y1={y + 4 * (h + gap) - gap} x2={x + w / 2} y2={y + 4 * (h + gap) + 14} draw={p} sw={2} seed={425} />
          <SketchRect x={x + w * 0.2} y={y + 4 * (h + gap) + 14} w={w * 0.6} h={38} draw={p} fill={COLORS.white} sw={2.4} seed={426} />
          <text x={x + w / 2} y={y + 4 * (h + gap) + 41} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>output</text>
        </g>
      ) : (
        <g opacity={0.7 * p}>
          <SketchLine x1={x + w / 2} y1={y + 4 * (h + gap) - gap} x2={x + w / 2} y2={y + 4 * (h + gap) + 14} draw={p} sw={2} seed={427} />
          <SketchRect x={x + w * 0.2} y={y + 4 * (h + gap) + 14} w={w * 0.6} h={38} draw={p} stroke={COLORS.red} sw={2} seed={428} />
          <SketchLine x1={x + w * 0.2 + 12} y1={y + 4 * (h + gap) + 22} x2={x + w * 0.8 - 12} y2={y + 4 * (h + gap) + 44} draw={p} sw={3} stroke={COLORS.red} seed={429} />
          <SketchLine x1={x + w * 0.2 + 12} y1={y + 4 * (h + gap) + 44} x2={x + w * 0.8 - 12} y2={y + 4 * (h + gap) + 22} draw={p} sw={3} stroke={COLORS.red} seed={430} />
        </g>
      )}
      {label ? (
        <text x={x + w / 2} y={y + 4 * (h + gap) + 86} textAnchor="middle" fontFamily={FONTS.display} fontSize={36} fontWeight={600} fill={COLORS.ink} opacity={0.8 * p}>{label}</text>
      ) : null}
    </g>
  );
};

/* ------------------------------- token tape ------------------------------ */

export const TokenTape: React.FC<{
  x: number;
  y: number;
  w: number;
  draw?: number;
  lines?: string[];
  size?: number;
  color?: string;
  rotate?: number;
}> = ({ x, y, w, draw = 1, lines = ["the answer is 4", "the answer is 4", "the answer is 4"], size = 30, color = COLORS.ink, rotate = -1 }) => {
  const p = clamp01(draw);
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y})`}>
      <SketchRect x={x} y={y - 34} w={w} h={34 + lines.length * 38 + 20} draw={p} fill={COLORS.white} sw={3} seed={440} radius={8} fillP={0.6} />
      {lines.map((l, i) => (
        <text key={i} x={x + 24} y={y + i * 38 + 10} fontFamily={FONTS.label} fontSize={size} fill={color} opacity={0.62 * p}>
          {l}
        </text>
      ))}
      {Array.from({ length: 3 }).map((_, i) => (
        <path
          key={i}
          d={`M ${x + w - 30} ${y + 20 + i * 38} q 20 8 0 16`}
          fill="none"
          stroke={COLORS.red}
          strokeWidth={3}
          opacity={0.7 * p}
        />
      ))}
    </g>
  );
};

/* --------------------------------- misc ---------------------------------- */

export const MiniCheckRow: React.FC<{
  x: number;
  y: number;
  items: string[];
  draw?: number;
  size?: number;
  gap?: number;
  color?: string;
  at?: number;
}> = ({ x, y, items, draw = 1, size = 32, gap = 52, color = COLORS.sage }) => {
  const p = clamp01(draw);
  return (
    <g>
      {items.map((it, i) => (
        <g key={i}>
          <SketchCircle cx={x} cy={y + i * gap} d={26} draw={p} stroke={color} sw={2.4} seed={450 + i} fill={COLORS.white} />
          <SketchLine x1={x - 6} y1={y + i * gap} x2={x - 1} y2={y + i * gap + 5} draw={p} sw={3} stroke={color} seed={451 + i} />
          <SketchLine x1={x - 1} y1={y + i * gap + 5} x2={x + 7} y2={y + i * gap - 6} draw={p} sw={3} stroke={color} seed={452 + i} />
          <text x={x + 28} y={y + i * gap + 9} fontFamily={FONTS.label} fontSize={size} fill={COLORS.ink} opacity={0.78 * p}>{it}</text>
        </g>
      ))}
    </g>
  );
};

export const Sparkle: React.FC<{ x: number; y: number; size?: number; draw?: number; color?: string }> = ({ x, y, size = 18, draw = 1, color = COLORS.sage }) => {
  const p = clamp01(draw);
  return (
    <g opacity={p}>
      <line x1={x - size} y1={y} x2={x + size} y2={y} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={x} y1={y - size} x2={x} y2={y + size} stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <line x1={x - size * 0.6} y1={y - size * 0.6} x2={x + size * 0.6} y2={y + size * 0.6} stroke={color} strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />
      <line x1={x + size * 0.6} y1={y - size * 0.6} x2={x - size * 0.6} y2={y + size * 0.6} stroke={color} strokeWidth={1.8} strokeLinecap="round" opacity={0.6} />
    </g>
  );
};

/* -------------------------------- game icon ------------------------------ */

export const GameIcon: React.FC<{
  kind: "breakout" | "pong" | "pacman" | "freeway" | "go";
  x: number;
  y: number;
  size?: number;
  draw?: number;
  label?: boolean;
  muted?: boolean;
}> = ({ kind, x, y, size = 150, draw = 1, label = false, muted = false }) => {
  const p = clamp01(draw);
  const op = muted ? 0.35 : 1;
  const s = size / 150;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
      <SketchRect x={-75} y={-75} w={150} h={150} draw={p} fill={COLORS.white} sw={3} seed={470} radius={8} />
      {kind === "breakout" ? (
        <g>
          {Array.from({ length: 3 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={-62 + c * 20} y={-55 + r * 13} width={16} height={8} rx={2} fill={r === 0 ? COLORS.red : COLORS.sage} opacity={0.55 * p} />
            ))
          )}
          <SketchLine x1={-32} y1={52} x2={32} y2={52} draw={p} sw={5} seed={471} />
          <SketchCircle cx={22} cy={28} d={12} draw={p} fill={COLORS.ink} fillP={0.8} sw={2} seed={472} />
        </g>
      ) : null}
      {kind === "pong" ? (
        <g>
          <SketchLine x1={0} y1={-58} x2={0} y2={58} draw={p} sw={2} seed={473} opacity={0.35} />
          <SketchLine x1={-52} y1={-30} x2={-52} y2={22} draw={p} sw={5} seed={474} />
          <SketchLine x1={52} y1={-8} x2={52} y2={44} draw={p} sw={5} seed={475} />
          <SketchCircle cx={8} cy={-3} d={12} draw={p} fill={COLORS.ink} fillP={0.8} sw={2} seed={476} />
        </g>
      ) : null}
      {kind === "pacman" ? (
        <g>
          <SketchPath d="M 0 0 L 58 -34 A 68 68 0 1 0 58 34 Z" draw={p} fill={COLORS.sand} sw={3.4} seed={477} />
          <circle cx={-24} cy={-14} r={4} fill={COLORS.ink} opacity={p} />
          {[-46, -22, 4, 30, 54].map((cx, i) => <circle key={i} cx={cx} cy={44} r={3.4} fill={COLORS.ink} opacity={0.5 * p} />)}
        </g>
      ) : null}
      {kind === "freeway" ? (
        <g>
          <SketchPath d="M -62 40 L -30 -58 L 30 -58 L 62 40 Z" draw={p} fill={COLORS.ink} fillP={0.06} sw={2.6} seed={478} />
          <SketchLine x1={-20} y1={40} x2={-8} y2={-58} draw={p} sw={2} seed={479} opacity={0.5} />
          <SketchLine x1={20} y1={40} x2={8} y2={-58} draw={p} sw={2} seed={480} opacity={0.5} />
          <rect x={-14} y={-4} width={28} height={38} rx={5} fill={COLORS.red} opacity={0.45 * p} />
          <SketchRect x={-14} y={-4} w={28} h={38} draw={p} sw={2.4} seed={481} radius={5} />
        </g>
      ) : null}
      {kind === "go" ? (
        <g>
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <line x1={-52} y1={-52 + i * 17} x2={52} y2={-52 + i * 17} stroke={COLORS.ink} strokeWidth={1.4} opacity={0.45 * p} />
              <line x1={-52 + i * 17} y1={-52} x2={-52 + i * 17} y2={52} stroke={COLORS.ink} strokeWidth={1.4} opacity={0.45 * p} />
            </g>
          ))}
          {[[1, 1], [2, 3], [4, 2], [3, 4], [5, 4]].map(([r, c], i) => (
            <circle key={i} cx={-52 + c * 17} cy={-52 + r * 17} r={6} fill={i % 2 ? COLORS.white : COLORS.ink} stroke={COLORS.ink} strokeWidth={1.5} opacity={p} />
          ))}
        </g>
      ) : null}
      {label ? (
        <text x={0} y={91} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.65 * p}>
          {kind}
        </text>
      ) : null}
    </g>
  );
};

export const Question: React.FC<{ x: number; y: number; size?: number; draw?: number; color?: string; rotate?: number }> = ({
  x,
  y,
  size = 150,
  draw = 1,
  color = COLORS.ink,
  rotate = -6,
}) => {
  const p = clamp01(draw);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={p}>
      <text x={0} y={0} textAnchor="middle" fontFamily={FONTS.display} fontSize={size} fontWeight={600} fill={color}>
        ?
      </text>
    </g>
  );
};
