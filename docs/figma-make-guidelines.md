# Figma Make Guidelines
## Northcote Curio Design System — AI Generation Best Practices

**Document ID:** FIGMA-MAKE-GUIDE-001  
**Version:** 1.0  
**Last Updated:** 2026-01-15

---

# 📋 QUICK REFERENCE

## The Foundational Asset

**File:** `pattern-nocturnal-canopy-hero.jpg`  
**Location:** `frontend/public/assets/wallpapers/`  
**Dimensions:** 2048 × 858px

This wallpaper is the **DNA of the entire design system**. Every color, texture, and atmospheric decision flows from this single asset.

---

# 🎨 COLOR SAMPLING GUIDE

## Official Color Palette

All colors must be sampled from the wallpaper. Use these exact values:

| Token Name | Hex Value | Sample Location |
|------------|-----------|-----------------|
| `specimen-night` | `#1A1714` | Deep shadows between botanical elements |
| `charcoal-bark` | `#141210` | Gallery base surface |
| `eucalypt-smoke` | `#2C2723` | Card surface (woodsmoke at dusk) |
| `eucalypt-smoke-high` | `#3D3632` | Elevated surface |
| `wattle-gold` | `#D4A84B` | Acacia pycnantha puffballs (center-left) |
| `wattle-glow` | `#E8C963` | Brightest wattle highlight |
| `wattle-shadow` | `#8B7A35` | Deep ochre borders |
| `wattle-bloom` | `#F5DDAA` | Subtle accents |
| `waratah-crimson` | `#C45C4B` | Telopea speciosissima petals (center) |
| `waratah-glow` | `#E07865` | Urgent hover state |
| `waratah-stem` | `#7A3A2E` | Deep wine alerts |
| `ghost-gum` | `#7A9E82` | Eucalyptus leaf (success) |
| `native-violet` | `#9B8AAD` | Muted lavender (progress) |
| `banksia-orange` | `#D4885C` | Banksia cone body (warning) |
| `parchment` | `#F5F0E8` | Primary text on dark |
| `parchment-dim` | `#D9D4CC` | Secondary text |
| `flannel-flower` | `#A8A097` | Metadata, tertiary text |

---

# 🚫 ANTI-SLOP PROTOCOL

## Forbidden Patterns

Never generate these in Northcote Curio designs:

### Typography
- ❌ Inter, Roboto, Arial, Plus Jakarta Sans, system fonts
- ❌ Generic sans-serif without personality
- ❌ Uniform font weights

### Border Radius
- ❌ Uniform values (8px, 12px, 16px on all corners)
- ❌ Perfectly rounded circles for non-avatar elements
- ❌ `rounded-lg`, `rounded-xl` without asymmetry

### Colors
- ❌ Pure black (#000000)
- ❌ Pure white (#FFFFFF)
- ❌ Purple gradients
- ❌ Blue-violet tech gradients
- ❌ Cool grays without warm undertones

### Layout
- ❌ Perfectly centered, symmetrical grids
- ❌ Generic card layouts without organic anchors
- ❌ Flat backgrounds without texture

### Shadows
- ❌ Generic `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
- ❌ Flat shadows without depth
- ❌ Shadows without warm undertones

### Motion
- ❌ Linear easing
- ❌ Uniform timing (<180ms or >1000ms)
- ❌ `ease` or `ease-in-out` without customization

---

# ✅ REQUIRED PATTERNS

## Typography

| Role | Font Family | Use Case |
|------|-------------|----------|
| Proclamation | `'Libre Bodoni', serif` | Hero headlines only |
| Bloom | `'Fraunces', serif` | Display text, card titles |
| Field Note | `'Work Sans', sans-serif` | Body text, UI labels |
| Annotation | `'JetBrains Mono', monospace` | Specimen labels, data |

## Shapes (Organic Asymmetry)

| Token | Value | Use Case |
|-------|-------|----------|
| `--radius-pebble` | `20px 6px 16px 28px` | Buttons, primary CTAs |
| `--radius-stone` | `16px 4px 12px 24px` | Cards, containers |
| `--radius-leaf` | `24px 8px 20px 4px` | Hero containers |
| `--radius-seed` | `8px 4px 10px 6px` | Badges, tags |

## Motion (Viscous Breeze)

```css
--ease-viscous: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Gentle overshoot */
--ease-settle: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Finding rest */
--duration-micro: 180ms;
--duration-short: 280ms;
--duration-medium: 450ms;
```

## Glassmorphism

```css
background: rgba(44, 39, 35, 0.75);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(168, 160, 151, 0.1);
```

---

# 🌿 DUAL-MODE SYSTEM

## The Gallery (Mode A)

**Texture:** `pattern-nocturnal-canopy` wallpaper  
**Atmosphere:** Warm, botanical, wonder  
**Use Cases:** Landing, Auth, Onboarding, Opportunity Feed, Kanban, Dashboard

### Gallery Wallpaper Opacity by Page

| Page | Opacity | Treatment |
|------|---------|-----------|
| Landing | 100% | Full celebration with gradient fade |
| Authentication | 100% | 50% split-screen crop |
| Onboarding | 20% | Subtle background |
| Opportunity Feed | 22% | Subtle background |
| Kanban Board | 18% | Minimal interference |
| Dashboard | 25% | Light atmosphere |

## The Laboratory (Mode B)

**Texture:** `texture-laboratory-parchment`  
**Atmosphere:** Cool, clinical, precise  
**Use Cases:** Ingestion, Analysis, Editor, Studio, Settings

Laboratory mode does NOT use the nocturnal canopy wallpaper.

---

# 🖼️ EXTRACTABLE ELEMENTS

These elements can be isolated from the wallpaper for use as UI assets:

| Element | Location | UI Use Case |
|---------|----------|-------------|
| Waratah | Center | Feature icons, celebration states |
| Wattle Spray | Center-left | Decorative anchors |
| Brass Compass | Bottom-left, top-right | Laboratory gauges, auth metaphor |
| Compass Rose | Top-right | Navigation |
| Brass Key | Right side | Authentication |
| Banksia Cone | Far left/right | Grounding anchors |
| Specimen Labels | Throughout | Typography reference |

---

# 📐 COMPONENT SPECIFICATIONS

## Hero Container (Landing Page)

```css
.hero-container {
  width: 800px;
  max-width: 90%;
  background: rgba(44, 39, 35, 0.75);
  backdrop-filter: blur(20px);
  border-radius: 24px 8px 20px 4px; /* Leaf */
  border: 1px solid rgba(168, 160, 151, 0.1);
  padding: 64px;
  box-shadow: 0 4px 24px rgba(20, 18, 16, 0.5);
  margin-top: 15vh;
}
```

## Feature Card

```css
.feature-card {
  background: rgba(44, 39, 35, 0.75);
  backdrop-filter: blur(20px);
  border-radius: 16px 4px 12px 24px; /* Stone */
  border: 1px solid rgba(168, 160, 151, 0.1);
  padding: 32px;
  box-shadow: 0 4px 24px rgba(20, 18, 16, 0.5);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(20, 18, 16, 0.6);
  transition: all 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## Primary CTA Button

```css
.cta-primary {
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  font-weight: 600;
  background: #D4A84B;
  color: #1A1714;
  border-radius: 20px 6px 16px 28px; /* Pebble */
  padding: 16px 32px;
  border: none;
  box-shadow: 0 4px 24px rgba(20, 18, 16, 0.5);
  cursor: pointer;
}

.cta-primary:hover {
  background: #E8C963;
  transform: translateY(-2px);
  box-shadow: 0 0 40px rgba(212, 168, 75, 0.15);
  transition: all 280ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## Navigation Dock

```css
.nav-dock {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(44, 39, 35, 0.75);
  backdrop-filter: blur(32px);
  border-radius: 20px 6px 16px 28px; /* Pebble */
  border: 1px solid rgba(168, 160, 151, 0.1);
  padding: 16px 24px;
  display: flex;
  gap: 32px;
}
```

---

# 🎬 FIGMA MAKE WORKFLOW

## Step-by-Step Generation

1. **Build background layer** - Wallpaper at specified opacity + gradient overlay
2. **Create hero container** - Glassmorphism + leaf shape
3. **Add typography** - Libre Bodoni headline, Fraunces subheadline
4. **Build card grid** - Stone shapes with specimen labels
5. **Add organic anchors** - Wattle, Banksia with proper z-indexing
6. **Implement fireflies** - CSS gradients with staggered animations
7. **Create navigation** - Glassmorphic dock with pebble shape
8. **Add interactions** - Viscous hover states
9. **Test responsive** - Desktop → Tablet → Mobile
10. **Validate tokens** - Ensure 100% compliance

## Iteration Checklist

If output doesn't match vision:

- [ ] Wallpaper at correct opacity?
- [ ] Border-radius asymmetric (not uniform)?
- [ ] Typography using correct font families?
- [ ] Easing using viscous curves (not linear)?
- [ ] Shadows warm-toned (not cool gray)?
- [ ] Glassmorphism revealing background?
- [ ] Organic anchors extending beyond viewport?
- [ ] Specimen labels using JetBrains Mono?

---

# ♿ ACCESSIBILITY REQUIREMENTS

- **Contrast:** All text meets WCAG AAA (7:1 minimum)
- **Focus States:** 3px solid `#E8C963` outline
- **Keyboard:** Logical tab order
- **Screen Reader:** Decorative assets `aria-hidden="true"`
- **Motion:** Respect `prefers-reduced-motion`

---

**End of Guidelines**

*Reference this document alongside the main Figma Make prompt for consistent design generation.*
