# M3 Layout Geometry Validator (Australian Native Edition)

**Purpose:** Enforce the 4px/8px grid system, proper touch target sizes (48px), and Australian Native "Tech-Organic" spatial relationships for the Electric Alchemist v5.0 design system.

**Input:** Component code  
**Output:** Compliance report on spatial integrity aligned with "The Greenhouse Dashboard" aesthetic

---

## Overview

M3 Expressive meets Australian Native flora aesthetics through disciplined spatial rhythm. The "Tech-Organic" philosophy demands **precision within organic chaos** — structured grid containers housing lush, asymmetric botanical assets.

1. **The Grid:** All padding/margin MUST be multiples of 4 (4, 8, 12, 16, 24, 32...).
2. **Touch Targets:** Interactive elements must be at least 48x48px (h-12 minimum).
3. **Botanical Proportions:** Container shapes follow native Australian geometry (Pebble, Tech-Card, Pill).
4. **Asset Anchoring:** Flora assets must use precise positioning rules (top-right, bottom-right).

---

## Validation Rules

### 1. Grid Hygiene (The 4px Rule)

**Pattern:** Any pixel value in margin/padding/gap/width/height that is NOT divisible by 4.

**Exceptions:**
- 1px borders
- 0px values
- Rotation degrees (3-5deg for Vine typography)

**Detection:**
- ❌ `padding: 15px` (Not divisible by 4)
- ❌ `margin-top: 5px` (Breaks rhythm)
- ❌ `gap: 18px` (Use 16px or 20px)
- ✅ `padding: 16px` (Grid-aligned)
- ✅ `gap: 24px` (Native spacing token)
- ✅ `cardPadding: 24px` (From spacing.cardPadding token)

**Tailwind Mapping:**
- `p-3` (12px) = ✅
- `p-[13px]` = ❌
- `gap-5` (20px) = ✅
- `gap-[18px]` = ❌

**Native Earth Spacing Tokens (From design-system.md):**
```json
{
  "xs": "4px",
  "sm": "8px",
  "md": "12px",
  "base": "16px",
  "lg": "24px",
  "xl": "48px",
  "2xl": "72px",
  "3xl": "96px",
  "cardPadding": "24px",
  "cardPaddingTop": "48px"
}
```

---

### 2. Touch Target Size (Pebble Minimum)

**Pattern:** Buttons or inputs smaller than 48px in height.

**Rule:** `min-height` or `height` >= 48px (Tailwind `h-12`).

**Detection:**
- ❌ `h-8` (32px) on a main button — **FAIL** (Too small for "Pebble" aesthetic)
- ❌ `h-10` (40px) on independent interactive targets — **FAIL**
- ❌ `py-2` (16px total) on buttons without explicit height — **WARNING**
- ✅ `h-12` (48px) on primary actions
- ✅ `h-14` (56px) on hero CTAs
- ✅ `min-h-12` with flex containers

**Australian Native Context:**
The "Pebble" shape (`rounded-pebble`: 20px 20px 32px 32px) requires adequate height to feel tactile and biological, not flat.

---

### 3. Shape Compliance (Component Morphology)

**Forbidden Patterns:**
- ❌ Generic `rounded-lg` (8px) — Use `rounded-3xl` (24px) for Tech-Cards
- ❌ `rounded-md` (6px) — Not in the system
- ❌ Arbitrary values like `rounded-[18px]` — Use semantic tokens
- ❌ Symmetric all-around radii on buttons — Use `rounded-pebble` (asymmetric bottom)

**Approved Shapes (From design-system.md):**

| Component Type | Token | CSS Value | Usage |
|:--------------|:------|:----------|:------|
| **Tech-Card** | `rounded-3xl` | `24px` | Dashboard stats, charts, main content areas |
| **Pebble** | `rounded-pebble` | `20px 20px 32px 32px` | Buttons, inputs, floating actions |
| **Pill** | `rounded-full` | `9999px` | Status indicators, navigation tabs |

**Detection:**
- ❌ `className="rounded-lg bg-gray-800"` — **FAIL** (Generic slop)
- ✅ `className="rounded-3xl bg-tech-dark"` — **PASS**
- ❌ `borderRadius: '8px'` — **FAIL**
- ✅ `className="rounded-pebble bg-terracotta"` — **PASS**

---

### 4. Asset Anchoring Protocol (Flora Placement)

**Rule:** Australian native flora assets must follow strict positioning rules to maintain "Greenhouse Dashboard" aesthetic.

**Approved Asset Positions:**

| Asset | Placement Rule | CSS Pattern |
|:------|:--------------|:------------|
| `native-group.png` | Dashboard hero, bottom-right, masked | `absolute bottom-0 right-0` with `mask-image` |
| `native-gum-hanging.png` | Top-right ceiling anchor | `absolute top-0 right-0` |
| `native-waratah-hanging.png` | Page header anchor, top-right | `absolute top-0 right-0` |
| `native-bottlebrush.png` | Near action buttons (decorative spark) | `absolute` with context-specific positioning |

**Detection:**
- ❌ Flora assets centered (`mx-auto`) — **FAIL** (Breaks anchoring metaphor)
- ❌ Flora in `grid` without `absolute` positioning — **WARNING**
- ❌ Random placement without design system reference — **FAIL**
- ✅ `absolute top-0 right-0` for ceiling assets — **PASS**
- ✅ `absolute bottom-0 right-0` for floor assets — **PASS**

---

### 5. Color Token Enforcement (Anti-Slop)

**Forbidden Color Patterns:**
- ❌ `bg-gray-800`, `bg-gray-900` — **FAIL** (Use `bg-tech-dark` or `bg-deep-charcoal`)
- ❌ `bg-blue-500`, `bg-purple-600` — **CRITICAL FAIL** (Not in Native Earth palette)
- ❌ Inline hex: `style={{ backgroundColor: '#1E1E1E' }}` — **WARNING** (Use token)
- ❌ `text-white`, `text-black` — **WARNING** (Use semantic tokens)

**Approved Native Earth Tokens:**

| Token Name | Hex | Tailwind Class | Usage |
|:-----------|:----|:--------------|:------|
| Eucalyptus Sage | `#B4D8AE` | `bg-sage` / `text-sage` | Success states, growth indicators |
| Terracotta | `#E09F7D` | `bg-terracotta` | **Primary Actions** (Buttons) |
| Wattle Gold | `#F0C419` | `bg-wattle` / `text-wattle` | Highlights, script text |
| Deep Charcoal | `#121212` | `bg-deep-charcoal` | Page background (The Floor) |
| Tech Dark | `#1E1E1E` | `bg-tech-dark` | **Card Backgrounds** (Solid, not glass) |

**Detection:**
- ❌ `bg-blue-500` — **CRITICAL** (Replace with `bg-sage` or `bg-terracotta`)
- ✅ `bg-terracotta hover:brightness-110` — **PASS**
- ❌ `bg-[#1E1E1E]` — **WARNING** (Use `bg-tech-dark` token)
- ✅ `bg-tech-dark` — **PASS**

---

### 6. Typography Weight Contrast (Anti-Timidity)

**Rule:** Headers must use **extreme** weight contrast (900 Black or 200 Thin), never middle weights.

**Forbidden Weights for Headlines:**
- ❌ `font-normal` (400)
- ❌ `font-medium` (500)
- ❌ `font-semibold` (600)
- ❌ `font-bold` (700)

**Approved Weights:**
- ✅ `font-black` (900) — For **Gum Tree** (Plus Jakarta Sans) structural headlines
- ✅ `font-thin` (200) — For contrast in data displays
- ✅ **Caveat** (cursive) at natural weight — For **Vine** emotional text

**Typography Stack (The Flora & Fauna System):**

| Species | Font | Role | Weight | Case | Tracking |
|:--------|:-----|:-----|:-------|:-----|:---------|
| **Gum Tree** | Plus Jakarta Sans | Headlines, nouns, data values | **900 Black** | Uppercase for labels | `-0.02em` |
| **Vine** | Caveat (Cursive) | "Human" context, verbs, empty states | Natural | Sentence case | Normal |
| **Data** | JetBrains Mono | Labels, timestamps | Regular | Uppercase | `+0.05em` |

**Detection:**
- ❌ `<h1 className="font-semibold">` — **CRITICAL FAIL**
- ✅ `<h1 className="font-black">` — **PASS**
- ❌ `<h2 style={{ fontWeight: 600 }}>` — **FAIL**
- ✅ `<span className="font-vine text-wattle transform rotate-3">` — **PASS** (Vine typography)

---

### 7. Container Depth (NO Glassmorphism)

**FORBIDDEN:**
- ❌ `backdrop-blur` on data cards
- ❌ `bg-opacity-10` with blur
- ❌ Semi-transparent containers over content
- ❌ `bg-white/5` with `backdrop-filter`

**REQUIRED:**
- ✅ **Solid backgrounds** (`bg-tech-dark`: `#1E1E1E`)
- ✅ **Optional dot grid texture** (5% opacity overlay)
- ✅ **No blur effects** on card containers

**Detection:**
- ❌ `backdrop-blur-lg bg-white/10` — **CRITICAL FAIL** (Glassmorphism slop)
- ✅ `bg-tech-dark rounded-3xl` — **PASS**
- ❌ `bg-opacity-20` on cards — **FAIL**
- ✅ Dot grid texture via CSS (`.dot-grid` utility) — **PASS**

---

## Validation Report Format

```markdown
# 🏞️ Layout Geometry Audit: [Component Name]
**Status:** [✅ PASS / ⚠️ WARNING / ❌ FAIL]
**Theme:** Electric Alchemist v5.0 (Tech-Organic)
**Checked Against:** Australian Native Design System

---

## ❌ Violations

### Critical (Breaking Design System)
1. **Line 24:** Uses `rounded-lg` instead of `rounded-3xl` for Tech-Card.
   - **Impact:** Generic shape, not distinctive "Tech-Organic" aesthetic.
   - **Fix:** Replace with `rounded-3xl` (24px).

2. **Line 45:** Button height is `h-10` (40px), below 48px minimum.
   - **Impact:** Fails touch target accessibility, breaks "Pebble" metaphor.
   - **Fix:** Use `h-12` (48px) or `h-14` (56px).

3. **Line 67:** Uses `bg-gray-800` instead of Native Earth token.
   - **Impact:** Generic color, not Australian Native palette.
   - **Fix:** Replace with `bg-tech-dark` (#1E1E1E).

### Warnings (Style Drift)
4. **Line 12:** Padding is `p-[15px]` (not divisible by 4).
   - **Impact:** Breaks 4px grid rhythm.
   - **Fix:** Use `p-4` (16px) or `p-3` (12px).

5. **Line 89:** Flora asset `native-waratah-hanging.png` is centered.
   - **Impact:** Should be anchored top-right per design system.
   - **Fix:** Apply `absolute top-0 right-0`.

---

## ✅ Correct Implementations
- Line 8: Proper `rounded-3xl` on Tech-Card
- Line 34: Correct `bg-terracotta` token for button
- Line 56: Proper `font-black` weight on headline
- Line 78: Grid-aligned spacing (`gap-6` = 24px)

---

## 📊 Summary
- **Total Checks:** 94
- **Violations Found:** 5 (3 Critical, 2 Warnings)
- **Compliance Score:** 94.7%
- **Grid Hygiene:** ✅ PASS
- **Touch Targets:** ⚠️ WARNING (1 violation)
- **Shape Compliance:** ❌ FAIL (1 violation)
- **Color Tokens:** ❌ FAIL (1 violation)
- **Typography:** ✅ PASS
- **Asset Anchoring:** ⚠️ WARNING (1 violation)

---

## 🔧 Remediation Steps
1. **Immediate:** Fix shape tokens (Line 24) and color tokens (Line 67)
2. **High Priority:** Adjust button height to 48px minimum (Line 45)
3. **Medium Priority:** Align padding to 4px grid (Line 12)
4. **Low Priority:** Reposition flora asset (Line 89)
```

---

## Integration with M3 Anti-Slop Validator

This skill works in tandem with `m3-anti-slop-validator.md`:

**Layout Geometry Validator (This Skill):**
- Grid alignment (4px rule)
- Touch target sizes
- Shape token compliance
- Spacing rhythm
- Asset positioning

**M3 Anti-Slop Validator:**
- Generic font detection
- Purple gradient syndrome
- Flat layout detection
- Predictable pattern flagging
- Aesthetic quality scoring

**Workflow:**
1. Run **Layout Geometry Validator** first for structural compliance
2. Run **Anti-Slop Validator** for aesthetic quality
3. Fix all **CRITICAL** violations before **WARNING** issues

---

## Australian Native Compliance Checklist

- [ ] All spacing values divisible by 4px
- [ ] Interactive elements ≥ 48px height (h-12 minimum)
- [ ] Tech-Cards use `rounded-3xl` (24px)
- [ ] Buttons use `rounded-pebble` (20px 20px 32px 32px)
- [ ] Status pills use `rounded-full`
- [ ] Flora assets positioned per anchoring rules (top-right/bottom-right)
- [ ] No `bg-gray-*` or `bg-blue-*` colors (only Native Earth tokens)
- [ ] No glassmorphism (`backdrop-blur` forbidden on cards)
- [ ] Headlines use `font-black` (900), not 400-700
- [ ] "Vine" typography (Caveat) rotated 3-5 degrees with `text-wattle` or `text-terracotta`
- [ ] Dot grid texture applied to Tech-Cards (optional, 5% opacity)
- [ ] Motion uses spring physics (Stiffness 500, Damping 27)

---

## Usage

```bash
# Audit component for layout geometry compliance
m3-layout-geometry-validator --file src/components/Dashboard.tsx --strict

# Audit with auto-fix suggestions
m3-layout-geometry-validator --file src/features/landing/LandingPage.tsx --suggest-fixes

# Batch validation for all components
m3-layout-geometry-validator --dir src/components --report layout-audit.json
```

---

**Created:** 2026-01-11  
**Version:** 2.0.0 (Australian Native Edition)  
**Status:** Production Ready  
**Theme:** Electric Alchemist v5.0 (Tech-Organic)  
**Purpose:** Enforce spatial discipline within the "Greenhouse Dashboard" aesthetic, preventing generic layout slop while maintaining Australian native flora metaphors.
