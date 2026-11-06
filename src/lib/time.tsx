import React, { createContext, useContext } from "react";
import { AbsoluteFill, Easing, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";

/* ---------------------------------- time --------------------------------- */

const TimeContext = createContext(0);
export const useT = () => useContext(TimeContext);

export const TimeProvider: React.FC<{ value: number; children: React.ReactNode }> = ({
  value,
  children,
}) => <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;

export const Chapter: React.FC<{
  start: number;
  end: number;
  fadeIn?: number;
  children: React.ReactNode;
}> = ({ start, end, fadeIn = 0.18, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = start + frame / fps;
  const intro = fadeIn > 0 ? Math.max(0, 1 - Easing.out(Easing.cubic)(clamp01((t - start) / fadeIn))) : 0;
  const outro = fadeIn > 0 ? Easing.in(Easing.cubic)(clamp01((t - (end - fadeIn)) / fadeIn)) : 0;

  return (
    <TimeProvider value={t}>
      <AbsoluteFill>
        {children}
        {intro > 0.001 ? (
          <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: intro, zIndex: 999 }} />
        ) : null}
        {outro > 0.001 ? (
          <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: outro, zIndex: 999 }} />
        ) : null}
      </AbsoluteFill>
    </TimeProvider>
  );
};

/* ---------------------------------- easing ------------------------------- */

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const outCubic = Easing.out(Easing.cubic);
const inCubic = Easing.in(Easing.cubic);
const inOut = Easing.inOut(Easing.cubic);
const outBack = Easing.out(Easing.back(1.55));
const outQuad = Easing.out(Easing.quad);

/** 0..1 ramp between a and b */
export const ramp = (t: number, a: number, b: number, ease: (v: number) => number = outCubic) =>
  ease(clamp01((t - a) / Math.max(0.0001, b - a)));

/** draw-on progress */
export const drawIn = (t: number, at: number, dur = 0.65) => ramp(t, at, at + dur, outCubic);

/** standard fade */
export const fadeIn = (t: number, at: number, dur = 0.35) => ramp(t, at, at + dur, outQuad);
export const fadeOut = (t: number, at: number, dur = 0.35) => 1 - ramp(t, at, at + dur, inCubic);

/** pop-in with slight overshoot */
export const pop = (t: number, at: number, dur = 0.42) => ramp(t, at, at + dur, outBack);

/** 0..1..0 bump */
export const bump = (t: number, at: number, dur = 0.55) => {
  const p = clamp01((t - at) / dur);
  return Math.sin(Math.PI * p);
};

/** quick opacity flash */
export const blink = (t: number, at: number, dur = 0.18) => {
  const p = clamp01((t - at) / dur);
  return p >= 1 ? 0 : 1 - p;
};

export const flat = (t: number, a: number, b: number) => (t >= a && t <= b ? 1 : 0);

/** a value that eases from from->to after at */
export const tween = (t: number, at: number, dur: number, from: number, to: number, ease = outCubic) =>
  from + (to - from) * ramp(t, at, at + dur, ease);

/* ---------------------------------- beats -------------------------------- */

export const Beat: React.FC<{
  from: number;
  to: number;
  fade?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  z?: number;
}> = ({ from, to, fade = 0.24, children, style, z }) => {
  const t = useT();
  if (t < from - 0.001 || t > to + 0.001) return null;

  const fin = fade > 0 ? outQuad(clamp01((t - from) / fade)) : 1;
  const fout = fade > 0 ? 1 - inCubic(clamp01((t - (to - fade)) / fade)) : 1;
  const opacity = Math.min(fin, fout);

  if (opacity <= 0.001) return null;

  return (
    <AbsoluteFill style={{ opacity, zIndex: z, ...style }}>{children}</AbsoluteFill>
  );
};

/* ------------------------------- transitions ----------------------------- */

export const Wipe: React.FC<{
  at: number;
  dur?: number;
  color?: string;
  direction?: "l" | "r" | "up" | "down";
}> = ({ at, dur = 0.5, color = COLORS.bg, direction = "r" }) => {
  const t = useT();
  const p = clamp01((t - at) / dur);
  if (p >= 1) return null;
  const e = inOut(p);
  const transform =
    direction === "r"
      ? `translateX(${-100 + e * 100}%)`
      : direction === "l"
        ? `translateX(${100 - e * 100}%)`
        : direction === "up"
          ? `translateY(${100 - e * 100}%)`
          : `translateY(${-100 + e * 100}%)`;

  return (
    <AbsoluteFill style={{ zIndex: 900, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: color,
          transform,
          willChange: "transform",
        }}
      />
    </AbsoluteFill>
  );
};
