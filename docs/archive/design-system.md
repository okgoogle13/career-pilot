# SYSTEM_CONFIGURATION: CAREER_COPILOT
# DESIGN_SYSTEM: ELECTRIC_ALCHEMIST_v5.0
# TYPOGRAPHY_ENGINE: M3_EXPRESSIVE_EUCALYPT_STACK_v3.5
# STRICT_MODE: ENABLED

---

## 1. THE AESTHETIC IDENTITY (Visual DNA)

*   **Philosophy:** "The Greenhouse Dashboard." High-density data structures housed in a lush, organic night garden.
*   **Visual Signature:** Solid dark containers (`#1E1E1E`) sitting on a deep charcoal floor (`#121212`), accented by vibrant Australian flora and parametric typography.

---

## 2. COLOR PALETTE (Native Earth)

| Role | Token Name | Hex | Usage |
|:---|:---|:---|:---|
| **Primary** | `Eucalyptus Sage` | `#B4D8AE` | Success states, completion, growth indicators. |
| **Secondary** | `Terracotta` | `#E09F7D` | **Primary Actions** (Buttons), Alerts, "Warm" interactions. |
| **Tertiary** | `Wattle Gold` | `#F0C419` | Highlights, Script Text, "Sunlight" accents. |
| **Surface** | `Deep Charcoal` | `#121212` | The Page Background (The Floor). |
| **Container** | `Tech Dark` | `#1E1E1E` | **Card Backgrounds.** Must be solid, not glass. |

---

## 3. TYPOGRAPHY — THE EUCALYPT STACK (M3 Expressive 4-Font Strategy)

> **CRITICAL:** This system uses **4 distinct variable fonts** with parametric axes, NOT generic fonts like Plus Jakarta Sans or Caveat.

### 🌿 SPECIES 1: THE VINE (Recursive)
*   **Font:** `Recursive Variable`
*   **Google Import:** `https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,CRSV@-15..0,300..1000,0..1,0..1`
*   **Role:** Display, Hero Moments, "Wild Growth", Expressive scripts
*   **Axes:**
    *   `CASL` (Casual): 0–1 (1 = maximum casual feel)
    *   `CRSV` (Cursive): 0–1 (1 = maximum cursive)
    *   `slnt` (Slant): -15–0 (negative = italic slant)
    *   `wght` (Weight): 300–1000
*   **CSS Class:** `.text-vine`, `.text-hero`, `.text-vine-script`
*   **Visual Rule:**
    *   Color: Always **Wattle Gold `#F0C419`** or **Terracotta `#E09F7D`**
    *   Pose: Rotated 3–5 degrees (Organic imperfection)
    *   Use for: "Human" context, decorative headlines, call-outs

### 🪵 SPECIES 2: THE TRUNK (Amstelvar)
*   **Font:** `Amstelvar Variable`
*   **Google Import:** `https://fonts.googleapis.com/css2?family=Amstelvar:wght,wdth@100..900,50..125`
*   **Role:** Headlines, Structural Anchors, "Hard Data"
*   **Axes:**
    *   `wdth` (Width): 50–125 (125 = maximum expansion)
    *   `wght` (Weight): 100–900 (use **900 Black** for headers)
*   **CSS Class:** `.text-trunk`, `.text-headline`, `.text-trunk-reactive`
*   **Visual Rule:**
    *   Weight: **900 Black** (Absolute Law for Headers)
    *   Case: Uppercase for UI Labels
    *   Tracking: Tight (`-0.02em`)
    *   **Reactive Width:** `wdth` axis should expand with viewport (`clamp(100, 50 + 5vw, 125)`)

### 🌸 SPECIES 3: THE BLOOM (Fraunces)
*   **Font:** `Fraunces Variable`
*   **Google Import:** `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,100..900,0..100,0..1`
*   **Role:** Titles, Editorial Sections, "Native Irregularity"
*   **Axes:**
    *   `SOFT` (Softness): 0–100 (100 = maximum softness)
    *   `WONK` (Optical Wonk): 0–1 (1 = quirky variance)
    *   `wght` (Weight): 100–900
*   **CSS Class:** `.text-bloom`, `.text-title`, `.text-bloom-soft`
*   **Visual Rule:**
    *   Unexpected, soft, full of character
    *   Use for: Section titles, editorial callouts, quotes

### 🍃 SPECIES 4: THE LEAF (Roboto Flex)
*   **Font:** `Roboto Flex Variable`
*   **Google Import:** `https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,GRAD,XTRA@8..144,100..1000,-200..150,323..603`
*   **Role:** Body, UI Text, High Density, Functional
*   **Axes:**
    *   `opsz` (Optical Size): 8–144 (auto-adjust for size)
    *   `GRAD` (Grade): -200–150 (**CRITICAL: Use for hover states to prevent layout reflow**)
    *   `XTRA` (X-Height Extra): 323–603 (adjust for density)
*   **CSS Class:** `.text-leaf`, `.text-body`, `.text-leaf-data`
*   **Visual Rule:**
    *   Functional, legible, abundant
    *   **Layout-Safe Hover:** Animate `GRAD` from 0 → 150 on hover (no layout reflow)

### 📊 DATA SPECIES (JetBrains Mono)
*   **Font:** `JetBrains Mono`
*   **Role:** Labels, Timestamps, Metrics, Code
*   **CSS Class:** `.text-data`, `.text-mono`
*   **Visual Rule:** Uppercase, Wide Tracking (+0.05em to +0.12em)

---

## 4. THE BANKSIA COMPOSITION (Hero Moment Pattern)

> **The signature "Vine growing over Trunk" typographic pattern.**

### Structure
```
NOUN (Trunk Layer)     ← Amstelvar Black 900, wdth 125, White
  └─ verb (Vine Layer) ← Recursive Cursive, Wattle Gold, rotated 4°
```

### Rules
1. **One Duet Per Screen:** Only ONE Banksia Composition per page to avoid "Predictable Slop"
2. **Scale Disparity:** Vine text significantly smaller OR larger than Trunk (never matching x-height)
3. **Spatial Positioning:** Vine is absolutely positioned, overlapping or tucked behind Trunk letters
4. **Reactive Width:** Trunk `wdth` axis responds to viewport (line-filling effect)

### CSS Implementation
```css
.banksia-composition { position: relative; }
.banksia-trunk { /* Amstelvar Black 900, wdth clamp(100, 50 + 5vw, 125) */ }
.banksia-vine { /* Recursive, rotated 4°, absolute positioned */ }
```

---

## 5. EXTREME WEIGHT CONTRAST (Anti-Boring Rule)

### ❌ FORBIDDEN (Timid Contrast)
```tsx
// BAD: 400 vs 500 (1.25x ratio - barely noticeable)
<h1 style={{ fontWeight: 400 }}>Heading</h1>
<p style={{ fontWeight: 500 }}>Body</p>
```

### ✅ REQUIRED (Dramatic Contrast)
```tsx
// GOOD: 100 vs 900 (9x ratio - memorable, impactful)
<h1 style={{ fontWeight: 100 }}>Heading</h1> // Hairline elegance
<p style={{ fontWeight: 900 }}>Body</p>       // Bold confidence
```

### Weight Guidelines
| Element | Weight | Purpose |
|:---|:---|:---|
| Hero Display | 100–200 (Hairline/Thin) | Ultra-light elegance |
| Trunk Headlines | 900 (Black) | Structural anchor |
| Bloom Titles | 500 (Medium) | Editorial character |
| Leaf Body | 400 (Normal) | Functional legibility |
| Data Labels | 700 (Bold) | High-density visibility |

---

## 6. COMPONENT MORPHOLOGY (Shapes)

### 1. The Tech-Card (Primary Container)
*   **Token:** `.tech-card` / `rounded-3xl` (24px symmetric)
*   **Geometry:** **Symmetric.** No asymmetric leaves.
*   **Texture:** Solid Dark Grey (`#1E1E1E`) + 5% dot-grid texture overlay
*   **Usage:** Charts, Dashboard Stats, Main Content Areas

### 2. The Pebble (Interactive)
*   **Token:** `rounded-pebble` (20px 20px 32px 32px)
*   **Usage:** Buttons, Inputs, Floating Actions
*   **Feel:** Smooth, tactile, biological

### 3. The Gem (Data Badges)
*   **Token:** `rounded-gem` (4px)
*   **Usage:** Status badges, chips, compact indicators
*   **Feel:** Sharp, precise, data-forward

---

## 7. MOTION PHYSICS

*   **Spring:** Stiffness 500, Damping 27 (Bouncy but settled)
*   **Hover Transform:** `scale(1.02)` + `translateY(-4px)` + shadow lift
*   **Typography Hover:** Animate `GRAD` axis (0 → 150) — layout-safe
*   **Transitions:** Layouts should morph (Framer Motion `layout` prop), not just fade

---

## 8. ANTI-SLOP PROTOCOL (Forbidden)

*   ❌ **NO** Inter, Plus Jakarta Sans, Caveat, Arial, Helvetica (Generic AI Slop)
*   ❌ **NO** Weight 400–700 for Headlines (Must be 100–200 or 900)
*   ❌ **NO** Glassmorphism / Blur effects on data cards (Legibility first)
*   ❌ **NO** "Floating" text without a container
*   ❌ **NO** Default Blue/Purple colors. Only Sage/Terracotta/Wattle
*   ❌ **NO** Static fonts — all primary fonts MUST be variable
*   ❌ **NO** Linear easing — use spring physics

---

## 9. FONT VALIDATION FUNCTION

```typescript
function validateTypography(fontFamily: string, axes?: Record<string, number>): { valid: boolean; error?: string } {
  const forbidden = ["inter", "roboto", "arial", "helvetica", "plus jakarta", "caveat", "brush script"];
  const isGeneric = forbidden.some(f => fontFamily.toLowerCase().includes(f));
  
  // The "Flex" Clause: Roboto Flex is slop UNLESS axes are engaged
  const isFlex = fontFamily.includes("Roboto Flex");
  const axesEngaged = axes && (axes.XTRA || axes.GRAD || axes.YTLC);

  if (isFlex && !axesEngaged) {
    return { valid: false, error: "Roboto Flex used without parametric axes. This is 'Flex Slop'." };
  }

  if (isGeneric && !isFlex) {
    return { valid: false, error: `Generic font detected: ${fontFamily}. Replace with Eucalypt Stack equivalent.` };
  }

  return { valid: true };
}
```

---

**Version:** 5.0 (M3 Expressive Eucalypt Stack Edition)  
**Last Updated:** 2026-01-11  
**Compliance:** Anti-Slop Protocol 1.0, M3 Layout Geometry Validator