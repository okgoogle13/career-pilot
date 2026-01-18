# M3 Expressive Design Guide

**Version:** 3.5  
**Last Updated:** 2026-01-08  
**Status:** Production Ready

---

## Table of Contents

1. [Introduction](#introduction)
2. [Core Principles](#core-principles)
3. [M3 Expressive Shape Paths](#m3-expressive-shape-paths)
4. [Parametric Typography-Shape Pairing](#parametric-typography-shape-pairing)
5. [Spring Physics](#spring-physics)
6. [Token Architecture](#token-architecture)
7. [Implementation Examples](#implementation-examples)
8. [Anti-Slop Rule](#anti-slop-rule)
9. [Validation & Testing](#validation--testing)

---

## Introduction

M3 Expressive is a modern design system that replaces generic, sterile UI patterns with organic, physics-based interactions. Instead of static rounded rectangles, we use **parametric polygon shapes** that morph fluidly using **spring-based physics**. Typography synchronizes with these morphs using **variable font axes**, creating a cohesive, living interface.

### Key Differentiators

- **No Generic Pills:** Forbidden to use `rounded-full`, `rounded-lg`, or any Tailwind rounding classes
- **Path-Based Shapes:** All shapes defined using `clip-path` polygons
- **Physics-Based Motion:** Spring animations (stiffness: 500, damping: 27) instead of CSS easing
- **Parametric Typography:** Variable font axes (GRAD, wdth) sync with shape morphs
- **3-Tier Token Architecture:** Reference → System → Component tokens

---

## Core Principles

### 1. Organic Shape Language

Shapes must feel **organic** and **dynamic**, not geometric and static. We achieve this through:

- **Asymmetry:** Shapes are intentionally irregular
- **Softness:** Rounded corners flow naturally
- **Context-Appropriate:** Different shapes for different semantic purposes

### 2. Physics-Based Motion

All interactions use **underdamped springs** (damping ratio ζ < 1) to create characteristic "bounce":

```typescript
// M3 Expressive Default Physics
{
  type: 'spring',
  stiffness: 500,
  damping: 27,  // Calculated: 2 × 0.6 × √(1 × 500) ≈ 27
  mass: 1.0
}
```

### 3. Parametric Typography

Typography must "breathe" with the interface:

- **GRAD axis** changes for optical weight compensation
- **wdth axis** adjusts to maintain legibility during shape changes
- **wght (font-weight)** remains CONSTANT to prevent layout reflow (Anti-Slop Rule)

---

## M3 Expressive Shape Paths

All shapes are defined as **polygon-based clip-paths** for organic morphing.

### 1. Pebble (Organic / Friendly)

**Use Cases:** Cards, containers, friendly surfaces

**clip-path:**
```css
polygon(8% 20%, 28% 8%, 48% 8%, 68% 8%, 88% 20%, 96% 40%, 96% 60%, 88% 80%, 68% 92%, 48% 92%, 28% 92%, 8% 80%, 4% 60%, 4% 40%)
```

**Visual Characteristics:**
- Soft, rounded corners
- Slight asymmetry for organic feel
- Gentle curves on all sides
- Perfect for primary content containers

**Token Reference:**
```css
--md-ref-shape-pebble: polygon(...);
--md-sys-shape-card: var(--md-ref-shape-pebble);
```

---

### 2. Leaf (Asymmetric / Growth)

**Use Cases:** Hero sections, editorial content, growth-oriented features

**clip-path:**
```css
polygon(5% 15%, 25% 5%, 45% 5%, 65% 5%, 85% 15%, 95% 35%, 95% 55%, 85% 75%, 65% 95%, 45% 95%, 25% 95%, 5% 75%, 5% 55%, 5% 35%)
```

**Visual Characteristics:**
- Pronounced asymmetry
- Elongated on one axis
- Suggests growth and directionality
- Ideal for hero moments

**Token Reference:**
```css
--md-ref-shape-leaf: polygon(...);
--md-sys-shape-hero: var(--md-ref-shape-leaf);
```

---

### 3. Gem (Sharp / Highlight)

**Use Cases:** Badges, highlights, call-to-action elements

**clip-path:**
```css
polygon(20% 0%, 50% 10%, 80% 0%, 95% 30%, 90% 60%, 70% 85%, 50% 100%, 30% 85%, 10% 60%, 5% 30%)
```

**Visual Characteristics:**
- Sharp, angular top
- Faceted appearance
- High visual impact
- Draws attention effectively

**Token Reference:**
```css
--md-ref-shape-gem: polygon(...);
--md-sys-shape-badge: var(--md-ref-shape-gem);
```

---

### 4. Burst (Editorial / Star)

**Use Cases:** Feature callouts, editorial highlights, special promotions

**clip-path:**
```css
polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)
```

**Visual Characteristics:**
- Star-burst pattern
- Radiating energy
- Maximum visual pop
- Editorial-grade impact

**Token Reference:**
```css
--md-ref-shape-burst: polygon(...);
--md-sys-shape-editorial: var(--md-ref-shape-burst);
```

---

## Parametric Typography-Shape Pairing

**CRITICAL RULE:** When a shape morphs, corresponding typography axes MUST adjust for optical balance.

### Pairing Matrix

| Shape State | clip-path | GRAD | wdth | wght | Use Case |
|-------------|-----------|------|------|------|----------|
| **Rest** | none or rounded rect | 0 | 100 | 400 | Default state |
| **Pebble** | `var(--md-ref-shape-pebble)` | 150 | 110 | 400 | Card hover |
| **Leaf** | `var(--md-ref-shape-leaf)` | 100 | 105 | 400 | Hero expansion |
| **Gem** | `var(--md-ref-shape-gem)` | 200 | 100 | 400 | Badge pulse |

### The Anti-Slop Rule

**MANDATORY:** `font-weight` (wght axis) MUST remain constant during morphs.

**Why?**
- Changing `font-weight` triggers **layout reflow** (expensive)
- Causes visual "jank" and layout shift
- Violates Core Web Vitals (CLS - Cumulative Layout Shift)

**Correct Approach:**
- Use `GRAD` (optical grade) for perceived weight changes
- Use `wdth` (width) for horizontal compensation
- Keep `wght` constant

**Example:**
```tsx
// ❌ WRONG - Changes font-weight
whileHover={{ fontWeight: 700 }}

// ✅ CORRECT - Uses GRAD axis
whileHover={{ 
  fontVariationSettings: "'wght' 400, 'GRAD' 150, 'wdth' 110"
}}
```

---

## Spring Physics

### Formula

```
Damping = 2 × ζ × √(mass × stiffness)
```

Where:
- **ζ (zeta)** = Damping Ratio
- **mass** = Element mass (typically 1.0)
- **stiffness** = Spring tension

### M3 Expressive Presets

#### 1. Expressive Default (Most Common)

```typescript
{
  stiffness: 500,
  damping: 27,      // 2 × 0.6 × √(1 × 500) ≈ 27
  mass: 1.0
}
```

- **Damping Ratio:** ζ = 0.6 (underdamped)
- **Characteristics:** Visible bounce, organic feel
- **Settle Time:** ~400ms
- **Use:** Card hovers, button interactions

#### 2. Expressive Slow (Dramatic)

```typescript
{
  stiffness: 300,
  damping: 21,      // 2 × 0.6 × √(1 × 300) ≈ 21
  mass: 1.0
}
```

- **Damping Ratio:** ζ = 0.6
- **Characteristics:** More pronounced bounce
- **Settle Time:** ~500ms
- **Use:** Hero animations, large elements

#### 3. Expressive Fast (Snappy)

```typescript
{
  stiffness: 1400,
  damping: 45,      // 2 × 0.6 × √(1 × 1400) ≈ 45
  mass: 1.0
}
```

- **Damping Ratio:** ζ = 0.6
- **Characteristics:** Quick bounce
- **Settle Time:** ~300ms
- **Use:** Small elements, micro-interactions

#### 4. Standard (No Bounce)

```typescript
{
  stiffness: 800,
  damping: 57,      // 2 × 1.0 × √(1 × 800) ≈ 57
  mass: 1.0
}
```

- **Damping Ratio:** ζ = 1.0 (critically damped)
- **Characteristics:** No overshoot, direct
- **Settle Time:** ~350ms
- **Use:** Utility elements, accessibility concerns

---

## Token Architecture

### Three-Tier Hierarchy

```
Reference Tokens → System Tokens → Component Tokens
(Raw values)      (Semantic roles)  (Usage)
```

#### Example: Card Shape

```css
/* REFERENCE LAYER */
--md-ref-shape-pebble: polygon(8% 20%, 28% 8%, ...);

/* SYSTEM LAYER */
--md-sys-shape-card: var(--md-ref-shape-pebble);

/* COMPONENT LAYER */
--md-comp-card-shape: var(--md-sys-shape-card);
```

#### Why Three Tiers?

1. **Flexibility:** Change all cards by updating System Token
2. **Isolation:** Override specific component without affecting others
3. **Maintainability:** Clear semantic meaning at each layer
4. **Scalability:** Easy to add new variants

---

## Implementation Examples

### Example 1: Expressive Card

```tsx
import { motion } from 'framer-motion';

const ExpressiveCard = ({ children }) => {
  return (
    <motion.div
      className="m3-expressive-surface p-space-xl"
      style={{
        clipPath: 'var(--md-comp-card-shape)',
        backgroundColor: 'var(--sys-color-surface-container)',
      }}
      whileHover={{
        scale: 1.02,
        clipPath: 'var(--md-ref-shape-pebble)',
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 27,
        mass: 1.0,
      }}
    >
      <motion.h3
        style={{
          fontWeight: 400, // CONSTANT (Anti-Slop Rule)
          fontVariationSettings: "'wght' 400, 'wdth' 100, 'GRAD' 0",
        }}
        whileHover={{
          fontVariationSettings: "'wght' 400, 'wdth' 110, 'GRAD' 150",
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 27,
        }}
      >
        {children}
      </motion.h3>
    </motion.div>
  );
};
```

### Example 2: Hero Section

```tsx
const HeroSection = ({ title, subtitle }) => {
  return (
    <motion.section
      style={{
        clipPath: 'var(--md-ref-shape-leaf)',
        padding: 'var(--sys-space-3xl)',
      }}
      initial={{ clipPath: 'none', opacity: 0 }}
      animate={{
        clipPath: 'var(--md-ref-shape-leaf)',
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 21,
      }}
    >
      <h1 style={{ fontVariationSettings: 'var(--md-sys-type-axes-hero)' }}>
        {title}
      </h1>
      <p>{subtitle}</p>
    </motion.section>
  );
};
```

---

## Anti-Slop Rule

### The Problem

Changing `font-weight` during animations causes:
- **Layout Reflow:** Browser recalculates entire layout tree
- **Visual Jank:** Text "jumps" as bounding box changes
- **Performance Hit:** Forces expensive layout recalculations
- **CLS Violation:** Poor Core Web Vitals score

### The Solution

**Use variable font axes instead:**

```css
/* ❌ BAD - Triggers reflow */
.heading:hover {
  font-weight: 700; /* Changes from 400 to 700 */
}

/* ✅ GOOD - No reflow */
.heading {
  font-weight: 400; /* CONSTANT */
  font-variation-settings: 'wght' 400, 'GRAD' 0;
}

.heading:hover {
  font-weight: 400; /* UNCHANGED */
  font-variation-settings: 'wght' 400, 'GRAD' 150; /* Only GRAD changes */
}
```

### Testing for Violations

Use the **Slop Auditor** component in StyleGuide to detect layout shifts:

```typescript
// Auditor monitors ResizeObserver during morphs
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.borderBoxSize.blockSize !== initialHeight) {
      // RED FLAG: Layout shift detected!
      setViolation(true);
    }
  }
});
```

---

## Validation & Testing

### Automated Validation

Run compliance checks:

```bash
./scripts/validate-m3-compliance.sh
```

### Custom Playwright Matchers

```typescript
import { expect } from '../utils/m3-parametric-matchers';

// Validate shape morphing
await expect(card).toHaveExpressiveMorph('pebble');

// Validate typography sync
await expect(card).toHaveSyncedTypography();

// Validate spring physics
await expect(card).toBeUsingM3Physics('expressiveDefault');
```

### Manual Testing Checklist

- [ ] No `rounded-lg`, `rounded-full`, or generic Tailwind classes
- [ ] All colors use CSS variables (no hardcoded hex)
- [ ] Spring physics match M3 constants
- [ ] Typography uses variable font axes
- [ ] `font-weight` never changes during morph (Anti-Slop Rule)
- [ ] Shape morphs settle within 350-450ms
- [ ] No layout shifts visible during interactions

---

## Quick Reference

### Forbidden Patterns

```css
/* ❌ FORBIDDEN */
.element {
  border-radius: 16px;           /* Use clip-path instead */
  background-color: #3B82F6;     /* Use CSS variables */
  transition: all 300ms ease;    /* Use spring physics */
  font-weight: 700;              /* Don't change during morph */
}

.element {
  border-radius: 9999px;         /* Generic pill - FORBIDDEN */
}
```

### Correct Patterns

```css
/* ✅ CORRECT */
.element {
  clip-path: var(--md-comp-card-shape);
  background-color: var(--sys-color-surface-container);
  /* Use framer-motion for spring physics */
}
```

---

## Resources

- **Skill File:** `.antigravity/skills/m3-expressive-validator.md`
- **Token Reference:** `frontend/src/theme/tokens.json`
- **Design Tokens:** `frontend/src/theme/design-tokens.css`
- **M3 Research:** `docs/design/M3_EXPRESSIVE_RESEARCH.md`
- **Progress Report:** `docs/M3_EXPRESSIVE_MIGRATION_PROGRESS.md`

---

**Maintained by:** okgoogle13 (CareerCopilot Project)  
**Questions?** Refer to the interactive StyleGuide at `/style-guide`
