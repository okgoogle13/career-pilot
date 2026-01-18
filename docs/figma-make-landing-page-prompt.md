# Figma Make: Northcote Curio Landing Page
## "The Resurrection" — A Victorian Naturalist's Welcome

**Document ID:** FIGMA-MAKE-002  
**Version:** 2.6 (Consolidated Post-Audit Refinement)  
**Model Recommendation:** Claude 4.5 Sonnet  
**Estimated Complexity:** High (Hero moment with organic anchors + glassmorphism)

---

# 🚀 QUICK PROMPT

> **Copy this section for initial Figma Make generation. Use the full specification below for refinement.**

**Refinement Checklist:**
1. **Layout:** Focus 100% on a single Glassmorphic Hero (70vw width, 64px blur). Remove all subsidiary cards.
2. **Ink Stamp Title:** "THE RESURRECTION" in heavy blocky sans-serif (Bebas Neue). 120px, rotated -5°. Add thick 8-12px line-border around text.
3. **Hierarchy:** "CareerCopilot" in 12px Mono above the stamp.
4. **Imagery:** Wallpaper size 150% (macroscopic). Concentrate fireflies around the stamp.
5. **CTA:** Solid Wattle Gold rectangular box, no border.

---

# 📋 FULL SPECIFICATION

---

# 📋 PROJECT CONTEXT

## Project Overview

**CareerCopilot** is an AI-powered career development platform that treats each user's career journey as a **specimen collection**.

## Platform Specification

| Specification | Value |
|---------------|-------|
| **Platform** | Web application (Desktop-first, responsive) |
| **Design System** | Northcote Curio |
| **Browser Support** | Modern browsers (Chrome, Firefox, Safari, Edge) |
| **Target Device** | Desktop 1440px primary, responsive to 320px mobile |

---

# 🌿 PART 1: VISION & IDENTITY

## The Soul of This Page

This is not a landing page. This is the **foyer of a Victorian naturalist's field station at dusk**—the moment a visitor steps through the door, smells aged paper and eucalyptus oil, and sees specimens glowing faintly in glass cases against dark timber walls.

**The User's First Emotion:** "I have discovered something rare."

**The Design Promise:**
- This will feel like entering a cabinet of curiosities, not a SaaS dashboard
- The interface breathes—organic anchors break mechanical precision
- Technology disappears; wonder remains
- Every hover state is a living response, like ink spreading on parchment

## The Central Metaphor

**"Nocturnal Curio"** — A Victorian naturalist's specimen collection viewed by candlelight in the Australian bush. Botanical illustrations glow against charred umber backgrounds. Brass instruments catch the light. Specimen labels in elegant italic type document discoveries with scientific precision and human wonder.

**Emotional Register:** Wonder → Discovery → Possibility → Trust

---

# 🖼️ PART 2: THE FOUNDATIONAL ASSET

## The Visual Constitution of Northcote Curio

**Primary Asset:** `pattern-nocturnal-canopy-hero.jpg`

### Color Sampling Locations

| Token | Sample Location in Image |
|-------|-------------------------|
| **Specimen Night** `#1A1714` | Any deep shadow between botanical elements |
| **Wattle Gold** `#D4A84B` | The brightest puffball in the Acacia pycnantha cluster |
| **Waratah Crimson** `#C45C4B` | Mid-tone of central Telopea speciosissima petal |
| **Ghost Gum Sage** `#7A9E82` | Illuminated eucalyptus leaf near the Wattle |
| **Parchment** `#F5F0E8` | The specimen label text color |

### Extractable Elements

| Element | Use Case |
|---------|----------|
| **Waratah (Central)** | Feature card icons, celebration states |
| **Wattle Spray** | Hanging anchor element (Landing, Dashboard) |
| **Brass Compass** | Laboratory mode gauge, auth metaphor |
| **Specimen Labels** | Typography style reference for UI annotations |

---

# 🚫 PART 3: THE ANTI-SLOP PROTOCOL

## Before generating, internalize what this must never be:

### ❌ FORBIDDEN ELEMENTS
- ❌ **Typography**: Inter, Roboto, Arial, Plus Jakarta Sans, system fonts
- ❌ **Border Radius**: Uniform values (8px, 12px, 16px on all corners)
- ❌ **Color**: Purple gradients, pure black (#000), pure white (#FFF)
- ❌ **Layout**: Perfectly centered, symmetrical grids
- ❌ **Motion**: Linear easing, robotic transitions

### ✅ REQUIRED PATTERNS
- ✅ **Typography**: Libre Bodoni (Display), Fraunces (Headlines), Work Sans (Body), JetBrains Mono (Annotations)
- ✅ **Border Radius**: Asymmetric organic tokens (`pebble`, `stone`, `leaf`)
- ✅ **Motion**: Viscous easing `cubic-bezier(0.34, 1.56, 0.64, 1)`
- ✅ **Grid Breaking**: Organic anchors extend beyond viewport edges

---

# 🎨 PART 4: DESIGN SYSTEM

## 4.1 Color Palette
Sampled directly from the `pattern-nocturnal-canopy-hero.jpg` wallpaper:
- **Specimen Night**: `#1A1714` (Deepest background)
- **Wattle Gold**: `#D4A84B` (Primary accent)
- **Waratah Crimson**: `#C45C4B` (Secondary accent / Alerts)
- **Parchment**: `#F5F0E8` (Primary text)

## 4.2 Typography
- **Proclamation**: `Bebas Neue` or `Impact` (Ink Stamp), 120px, Bold
  - *Treatment:* Distressed ink effect, rotated -5 degrees, 8px border box.
- **Support**: `Libre Bodoni`, 24px, Italic (Taglines)
- **Field Note**: `Work Sans`, 14px, 500wt (Body UI)
- **Annotation**: `JetBrains Mono`, 10px, Medium (Specimen labels)

## 4.3 Shapes (Organic Asymmetry)
- **Leaf Container**: `24px 8px 20px 4px` (Hero)
- **Stone Card**: `16px 4px 12px 24px` (Feature cards)
- **Pebble Button**: `20px 6px 16px 28px` (CTAs / Nav)

---

# 📐 PART 5: PAGE SPECIFICATION

## 5.1 Background Layer (Z-0)
- **Wallpaper**: `pattern-nocturnal-canopy-hero.jpg` @ 100% opacity
- **Overlay**: Bottom-up gradient fade (#1A1714 at 95% → Transparent at 70%)

## 5.2 Hero Container (Z-1)
- **Container**: Deep glassmorphic leaf shape, 70vw width, 64px backdrop blur
- **Title (Ink Stamp)**: "THE RESURRECTION" (Heavy distressed sans-serif)
- **Tagline**: "CareerCopilot: Your career, catalogued." (Libre Bodoni Italic)
- **CTA**: "Collect Your First Specimen" (Wattle Gold Solid Pebble)

## 5.3 Atmosphere & Detail
- **Overlay**: Radial vignette darkening the edges
- **Anchors**: Wattle (top-right), Banksia (bottom-left) breaking the viewport

## 5.4 Organic Anchors (Z-2)
- **Top-Right**: Hanging Wattle spray illustration (Grid-breaking)
- **Bottom-Left**: Grounded Banksia pot illustration
- **Atmosphere**: 12-16 firefly sprites with staggered glow animations

---

# ✅ SUCCESS CRITERIA

| Criterion | Validation |
|-----------|------------|
| **Visual Impact** | First reaction: "This is unlike any career platform I've seen" |
| **Token Compliance** | 100% of colors, typography, and shapes use defined tokens |
| **Wallpaper Visibility** | Waratah and compasses clearly visible in upper viewport |
| **Organic Integration** | Wattle extends beyond edge; Banksia grounds composition |
| **Motion Coherence** | All animations use viscous easing; nothing feels mechanical |

---
**End of Document**
