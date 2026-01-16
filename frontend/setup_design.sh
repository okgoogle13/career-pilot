#!/bin/bash

# ==========================================
# Electric Alchemist v4.5 Setup Script
# Theme: Flora & Fauna (Tech-Organic)
# ==========================================

echo "🌱 Starting Design System Overwrite..."

# 1. WRITE TOKENS.JSON
echo "📄 Writing tokens.json..."
cat <<EOF > tokens.json
{
  "\$schema": "https://json-schema.org/draft-07/schema",
  "version": "4.0.0",
  "system": "Electric Alchemist - Flora & Fauna",
  "color": {
    "primary": { "DEFAULT": "#B4D8AE", "name": "Eucalyptus Sage", "on": "#1D3314", "container": "#527542" },
    "secondary": { "DEFAULT": "#E09F7D", "name": "Terracotta", "on": "#4C251C", "container": "#8C4C3A" },
    "tertiary": { "DEFAULT": "#F0C419", "name": "Wattle Gold", "on": "#4A3B00", "container": "#D9AB07" },
    "surface": { "canvas": "#121212", "container": "#1E1E1E", "containerHigh": "#2C2C2C", "on": "#E3E3E3" }
  },
  "typography": {
    "families": {
      "gumtree": "'Plus Jakarta Sans', sans-serif",
      "vine": "'Caveat', cursive",
      "bushstone": "'Fredoka', sans-serif",
      "data": "'JetBrains Mono', monospace"
    },
    "weights": { "thin": 200, "regular": 400, "black": 900 }
  },
  "shape": { "radius": { "pebble": "20px 20px 32px 32px", "leaf": "32px 12px 32px 12px", "tech": "24px" } }
}
EOF

# 2. WRITE TAILWIND CONFIG
echo "🎨 Writing tailwind.config.ts..."
cat <<EOF > tailwind.config.ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        gumtree: ['"Plus Jakarta Sans"', 'sans-serif'],
        vine: ['"Caveat"', 'cursive'],
        bushstone: ['"Fredoka"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        sage: { DEFAULT: "#B4D8AE", dark: "#6B8F5A" },
        terracotta: { DEFAULT: "#E09F7D", dark: "#A4715E" },
        wattle: { DEFAULT: "#F0C419", dark: "#D9AB07" },
        surface: { canvas: "#121212", container: "#1E1E1E", elevated: "#2C2C2C" }
      },
      borderRadius: { 'pebble': '20px 20px 32px 32px', 'leaf': '32px 12px 32px 12px', '3xl': '24px' },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")",
        'dot-grid': "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
EOF

# 3. WRITE GLOBAL CSS
echo "💅 Writing src/index.css..."
cat <<EOF > src/index.css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;900&family=Caveat:wght@700&family=Fredoka:wght@400;600&family=JetBrains+Mono:wght@800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body { @apply bg-surface-canvas text-white font-gumtree overflow-x-hidden; }
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: #121212; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 20px; border: 2px solid #121212; }
}
@layer components {
  .tech-card { @apply bg-surface-container rounded-3xl border border-white/5 relative overflow-hidden bg-dot-grid; }
  .text-hero { @apply font-gumtree font-black tracking-tight leading-[110%] text-white uppercase; }
  .text-emotional { @apply font-vine font-bold text-wattle rotate-3 inline-block ml-2 text-6xl; }
  .btn-pebble { @apply font-bushstone rounded-pebble font-semibold; }
}
EOF

echo "✅ Design System Configured Successfully."
