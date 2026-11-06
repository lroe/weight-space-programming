export const W = 1920;
export const H = 1080;
export const FPS = 30;
export const DURATION = 1041;

/**
 * Dracula night palette. Flat fills only: no gradients, no shadows.
 * The legacy names at the bottom are kept so the existing scenes can share
 * one visual language without touching every component.
 */
export const COLORS = {
  bg: "#282A36",
  bgDeep: "#1E1F29",
  panel: "#313342",
  active: "#44475A",
  fg: "#F8F8F2",
  muted: "#B8B9C5",

  red: "#FF5555",
  green: "#50FA7B",
  pink: "#FF79C6",
  purple: "#BD93F9",
  cyan: "#8BE9FD",
  orange: "#FFB86C",
  yellow: "#F1FA8C",

  // Semantic aliases used by scenes and primitives.
  ink: "#F8F8F2",
  sage: "#50FA7B",
  sand: "#313342",
  white: "#1E1F29",
  faint: "rgba(248,248,242,0.38)",
  hair: "rgba(248,248,242,0.18)",
} as const;

export const FONTS = {
  display: "'Caveat', cursive",
  label: "'Patrick Hand', cursive",
} as const;

export const GROUND = 930;
