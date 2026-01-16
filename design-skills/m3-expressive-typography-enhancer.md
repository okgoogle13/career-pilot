# M3 Expressive Parametric Type Engine (v3.5)

**Purpose:** Elevate typography beyond basic token replacement with variable font physics, 12-axis parametric contrasts, and layout-safe emotional tone mapping, including distinctive cursive variability.

**Input:** Component file path + `tokens-expressive.json` + aesthetic preferences
**Output:** Expressive typography system with variable parametric physics and dramatic hierarchy

---

## Overview

This skill enhances M3 typography using Parametric Material 3 principles:

*   **Parametric Axis Integration**: Use 12-axis `font-variation-settings` for fluid, non-linear transitions across sans and script families.
*   **Layout-Safe Physics**: Animate Grade (`GRAD`) instead of Weight (`wght`) for sans fonts to prevent layout reflow (internal bolding).
*   **Extreme Weight Contrasts**: 100 vs. 900, not 400 vs. 600 (3x+ size jumps, not 1.5x).
*   **Anti-Slop Validation**: Reject generic "AI-Slop" (Inter, Static Roboto, Arial, legacy script fonts).
*   **Emotional Tone Mapping**: Typography that conveys distinct personality via parametric anatomy, from authoritative sans to playful script.

---

## M3 Expressive Typography Principles

### 1. Parametric Variable Fonts (Fluid Anatomy)

**Why:** Variable fonts enable smooth, physics-based animations. Parametric axes like `XTRA` (Counter Width) and `GRAD` (Grade) allow typography to "breathe" without disrupting layout.

**Recommended Variable Fonts (The Eucalypt System):**
*   **Recursive** (Display): Axis `CASL`, `CRSV` — The "Vine".
*   **Amstelvar** (Headline): Axis `wdth`, `wght` — The "Trunk".
*   **Fraunces** (Title): Axis `SOFT`, `WONK` — The "Bloom".
*   **Roboto Flex** (Body): Axis `XTRA`, `GRAD`, `opsz` — The "Leaf".

**Token Structure:**

```json
{
  "typography": {
    "display": {
      "family": "'Recursive', sans-serif",
      "axes": { "CASL": 1, "CRSV": 1, "slnt": -15, "wght": 800 },
      "role": "Hero / Expressive"
    },
    "headline": {
      "family": "'Amstelvar', serif",
      "axes": { "wdth": 125, "wght": 900 },
      "role": "Structural / Anchoring"
    },
    "title": {
      "family": "'Fraunces', serif",
      "axes": { "SOFT": 100, "WONK": 1, "wght": 500 },
      "role": "Editorial / Irregular"
    },
    "body": {
      "family": "'Roboto Flex', sans-serif",
      "axes": { "opsz": 14, "GRAD": 0 },
      "role": "Functional / Dense"
    }
  }
}
```

### 2. Extreme Weight Contrasts (Not Boring)

**Anti-Pattern (Boring):**

```tsx
// ❌ Timid contrast - no visual impact, causes layout jitter on bolding
<h1 style={{ fontWeight: 400 }}>Heading</h1>
<p style={{ fontWeight: 500 }}>Body</p>
// Contrast ratio: 1.25x (barely noticeable)
```

**M3 Expressive (Dramatic & Layout-Safe):**

```tsx
// ✅ Extreme contrast - Hairline (100) vs Heavy (900)
// ✅ Layout-Safe: Animate GRAD (Grade) for hover weight increase
<motion.h1 
  whileHover={{ "--grad": 150 }}
  style={{
    fontWeight: 100, 
    fontSize: '57px',
    fontVariationSettings: "'GRAD' var(--grad), 'wght' 100"
  }}
>
  Heading
</motion.h1>
<p style={{ fontWeight: 900, fontSize: '12px' }}>
  Subtext
</p>
// Contrast ratio: 9x (dramatic, memorable, no reflow)
```

#### Extreme Weight Guidelines

| Element           | Weight  | Axis Config (Sans) | Purpose              |
| ----------------- | ------- | ------------------ | -------------------- |
| Hero Display      | 100-200 | XTRA: 323 (Thin)   | Ultra-light elegance |
| Display Emphasis  | 800-900 | GRAD: 150          | Bold confidence      |
| Body Text (Heavy) | 700     | wght: 700          | Confidence, trust    |
| Micro-copy        | 900     | XTRA: 603 (Wide)   | High-impact labels   |

### 3. Emotional Tone Mapping

Typography conveys personality via the 12-axis Parametric Engine:

*   **Authoritative & Confident (Professional)**
    *   Axes: `wght: 800, wdth: 120, XTRA: 468, GRAD: 0`
    *   Style: Tight tracking (-0.01em), high optical size (`opsz: 48`).
*   **Daring & Energetic (Disruptive)**
    *   Axes: `wght: 900, wdth: 85, XTRA: 603, slnt: -10`
    *   Style: High internal contrast via counter width (`XTRA`).
*   **Wistful & Elegant (Editorial)**
    *   Axes: `wght: 100, wdth: 110, YTLC: 480, GRAD: -50`
    *   Style: Low x-height (`YTLC`), wide tracking (0.03em).
*   **Playful & Artistic (Cursive Script)**
    *   Axes: `wght: 500, CASL: 1, slnt: -5`
    *   Style: Humanist, fluid, used for "Anti-Grid" accents.

### 4. Anti-Slop Validation (Reject Generic Fonts)

**FORBIDDEN FONTS (Generic AI Slop):**
*   ❌ Inter / Roboto / Open Sans (Static versions)
*   ❌ Arial / Helvetica / Lato (Legacy, no personality)
*   ❌ Brush Script MT / Comic Sans (Legacy cursive slop)
*   ❌ System fonts (`-apple-system`, `BlinkMacSystemFont`, etc.)

**Validation Rules:**

```javascript
function validateTypography(fontFamily, axes) {
  const forbidden = ["inter", "roboto", "arial", "helvetica", "brush script"];
  const isGeneric = forbidden.some(f => fontFamily.toLowerCase().includes(f));
  
  // The "Flex" Clause: Roboto Flex is slop UNLESS axes are engaged
  const isFlex = fontFamily.includes("Roboto Flex");
  const axesEngaged = axes && (axes.XTRA || axes.GRAD || axes.YTLC);

  if (isFlex && !axesEngaged) {
    return { valid: false, error: "Roboto Flex used without parametric axes. This is 'Flex Slop'." };
  }

  if (isGeneric && !isFlex) {
    return { valid: false, error: `Generic font detected: ${fontFamily}. Replace with Parametric Variable equivalent.` };
  }

  return { valid: true };
}
```

### 5. Detection & Replacement Patterns

**Pattern 1: Layout-Safe Physics Injection**

```tsx
// ❌ Before: Reflow-inducing weight hover
<h1 style={{ fontWeight: 400 }} />

// ✅ After: Layout-safe GRAD spring physics
<motion.h1
  initial={{ "--grad": 0 }}
  whileHover={{ "--grad": 150 }}
  transition={{ type: "spring", stiffness: 300, damping: 21 }}
  style={{ fontVariationSettings: "'GRAD' var(--grad), 'wght' 400" }}
/>
```

**Pattern 2: Detect Timid Contrast (Auto-Fix)**

```javascript
function detectTimidContrast(hWeight, pWeight) {
  const ratio = Math.max(hWeight, pWeight) / Math.min(hWeight, pWeight);
  if (ratio < 1.5) {
    return { isTimid: true, correction: "Apply 100/900 weight inversion." };
  }
}
```

### Enhanced Token Schema

```json
{
  "typography": {
    "expressive": {
      "physics": {
        "type": "spring",
        "stiffness": 300,
        "damping": 21
      },
      "parametric": {
        "primary": "Roboto Flex Variable",
        "accent": "Dancing Script Variable"
      },
      "antiSlop": {
        "flexClauseEnabled": true,
        "scriptClauseEnabled": true
      }
    }
  }
}
```