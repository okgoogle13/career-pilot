# M3 Expressive Shape Validator

**Purpose:** Enforce M3 Expressive shape principles: **Variability**, **Visual Tension**, and **2.5D Depth**. Reject generic uniformity.

**Input:** Component code
**Output:** Validation report on shape dynamics and depth illusions

---

## Overview

M3 Expressive does not use shapes statically; it uses them to create **Tension** and **Depth**:
1.  **Shape Tension**: Mismatched radii (e.g., Round top-left, Square bottom-right) create diagonal tension and organic flow.
2.  **Variability**: Avoid uniform rounding. Mix "Extra Large" (Pebble) with "Small" (Tech/Gem) to guide the eye.
3.  **2.5D Depth**: Shape + Motion + Shadow = The illusion of volume. Visuals should feel "plucked" from the screen.

**Reference:** [M3 Expressive - Shapes Set (Figma Community)](https://www.figma.com/design/uGuy1zubP2gEoRL04n3O0q/M3-Expressive---Shapes-set--Community-?node-id=0-1&m=dev&t=P8IZHo6rZEM2kkuB-1)

**Forbidden:**
- `rounded-md`, `rounded-lg` (Generic uniformity)
- Monotone radii (all corners equal)
- Flat, unlayered shapes without depth context

---

## Validation Rules

### 1. Detect Shape Tension (Variability)
**Principle**: "Organic logic requires irregularity."
**Detection**: Components must mix diverse corner radii or structural shapes. A component where *all* corners are `8px` is a failure.
**Pass**: `rounded-tl-2xl rounded-br-sm` (Diagonal asymmetry)
**Fail**: `rounded-xl` (Uniform, boring)

### 2. Detect 2.5D Depth Illusions
**Principle**: "Make visuals feel 3D."
**Detection**: Check for the "Holy Trinity of Depth":
1.  **Shape** (Organic/Geometric mix)
2.  **Shadow** (Elevation tokens)
3.  **Motion** (Y-axis translation or scale)

### 3. Typography Tension
**Principle**: "Evocative Heading + Neutral Body."
**Guideline**: Pair expressive, variable heading fonts (e.g., Roboto Flex Parametric) with highly readable, neutral body text to create visual vibration.

---

## Detection Logic (Pseudo-code)

```typescript
interface ShapeViolation {
  issue: "Uniformity" | "Flatness";
  severity: "critical" | "warning";
  suggestion: string;
}

function validateShapeDynamics(code: string): ShapeViolation[] {
  const violations: ShapeViolation[] = [];

  // 1. Check for Monotone Radii (Uniformity)
  // Finds generic tailwind 'rounded-md' or 'rounded-xl' applied to whole element
  const uniformRadiusRegex = /rounded-(sm|md|lg|xl|2xl|3xl)(?!\s)/g;
  if (uniformRadiusRegex.test(code)) {
    violations.push({
      issue: "Uniformity",
      severity: "critical",
      suggestion: "Avoid uniform rounding. Use 'Shape Tension' by mixing radii (e.g., rounded-tl-3xl rounded-br-md) for organic flow.",
    });
  }

  // 2. Check for 2.5D Depth (Flatness)
  // A shape component needs Shadow AND Motion to exist in 2.5D space
  const hasShadow = /shadow-|elevation-|drop-shadow/.test(code);
  const hasMotion = /transition|animate-|motion\./.test(code);
  
  if (!hasShadow || !hasMotion) {
    violations.push({
      issue: "Flatness",
      severity: "warning",
      suggestion: "Enable 2.5D Depth: Add elevation shadows AND motion (hover lift/scale) to give volume.",
    });
  }

  return violations;
}
```

## Token Strategy (Tension-Based)

Instead of explicitly named "Pebble" classes, use structural tokens that imply variations:

| generic | Tension Token | Concept |
| :--- | :--- | :--- |
| `rounded-xl` | `shape-asymmetric-lg` | Large organic diagonal |
| `rounded-md` | `shape-tech-sm` | Small precise cut |
| `rounded-full`| `shape-organic-full` | Fully fluid |

---

## Usage

```bash
# Audit for shape tension
m3-shape-validator --file src/components/Card.tsx --strict
```
