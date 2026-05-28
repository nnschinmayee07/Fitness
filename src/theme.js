// src/theme.js
// Centralized design token export for the fitness app.
// These tokens mirror the CSS variables defined in src/index.css.

export const theme = {
  colors: {
    accent: "#C97B63",
    accent2: "#6B705C",
    success: "#7A9A82",
    warning: "#D4A373",
    danger: "#C96363",
    bgBase: "#1E1E1E",
    bgSurface: "#EFE6DD",
    bgRaised: "#E5D9CE",
    bgOverlay: "#DFD0C2",
    text: "#5E5E5E",
    textDark: "#2B2B2B",
    border: "rgba(43,43,43,0.06)",
    borderAccent: "rgba(201,123,99,0.18)"
  },
  fonts: {
    primary: "Inter, system-ui, sans-serif",
    secondary: "Outfit, system-ui, sans-serif"
  },
  borderRadius: "0.75rem",
  transition: "all 0.3s ease"
};

export default theme;
