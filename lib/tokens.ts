/**
 * The entire palette. Three values, nothing else.
 * Every other tone in the UI is an alpha derivation of `ink` or `paper`.
 */
export const color = {
  ink: "#111111",
  gray: "#888888",
  paper: "#FFFFFF",
} as const;

export const font = {
  display: "var(--font-source-serif)",
  body: "var(--font-inter)",
  mono: "var(--font-plex-mono)",
} as const;

export const layout = {
  /** Content gutter, grows to a 1360px cap on large screens. */
  max: "1360px",
  pad: "20px",
  padLg: "48px",
} as const;

export const space = {
  xs: "8px",
  sm: "16px",
  md: "28px",
  lg: "56px",
  xl: "96px",
  section: "clamp(72px, 9vw, 144px)",
} as const;
