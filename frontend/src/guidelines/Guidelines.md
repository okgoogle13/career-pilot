# Northcote Curio Design System Guidelines

**For AI Code Generation & Development**

This file provides rules and constraints for generating code that adheres to the Northcote Curio "Moonlight on Velvet" aesthetic. Reference the full documentation in `/docs/v2_atomic/` for complete specifications.

---

## General Guidelines

* **Never use generic SaaS language.** Reference `/docs/v2_atomic/DOC-006_Voice_and_Microcopy.md` for approved micro-copy.
* **Organic asymmetry is mandatory.** Use `radius-pebble`, `radius-stone`, `radius-leaf`, or `radius-seed` tokens—never generic rounded corners.
* **Typography must be contextual.** Gallery Mode = expressive (Fraunces, Libre Bodoni). Laboratory Mode = precise (JetBrains Mono).
* **Motion is deliberate, not instant.** Default duration is `600ms` with `cubic-bezier(0.34, 1.56, 0.64, 1)`.
* **Mode-aware design.** Gallery (wonder, botanical) vs Laboratory (rigor, anatomical) contexts require different visual treatments.

---

## Color System

### Core Palette (Moonlight on Velvet)

```css
--color-surface: #1A1714;        /* Specimen Night - The Floor */
--color-primary: #D4A84B;        /* Wattle Gold - The Protagonist */
--color-accent: #C45C4B;         /* Waratah Crimson - The Spark */
--color-container: #2C2723;      /* Eucalypt Smoke - Containers */
--color-muted: #A8A097;          /* Flannel Flower - Details */
--color-text: #F5F0E8;           /* Parchment - Primary Text */
```

### Tonal Stacks (Use for depth)

**Wattle Gold Family:**
```css
--color-primary-dark: #8B7A35;   /* Wattle Shadow */
--color-primary: #D4A84B;        /* Wattle Base */
--color-primary-light: #E8C963;  /* Wattle Glow */
--color-primary-pale: #F5DDAA;   /* Wattle Bloom */
```

**Waratah Family:**
```css
--color-accent-dark: #7A3A2E;    /* Waratah Stem */
--color-accent: #C45C4B;         /* Waratah Base */
--color-accent-light: #E07865;   /* Waratah Glow */
--color-accent-pale: #F5A89A;    /* Waratah Bloom */
```

**Rules:**
* Never use pure black (`#000000`) or pure white (`#FFFFFF`)
* Never use generic colors (red, blue, green) without botanical naming
* Always use CSS variables, never hardcoded hex values in components

---

## Typography System

### Font Stack

```css
--font-proclamation: 'Libre Bodoni', serif;  /* Gallery headers, hero moments */
--font-bloom: 'Fraunces', serif;             /* Sub-headers, emotional accents */
--font-field-note: 'Work Sans', sans-serif;  /* Body text, UI elements */
--font-annotation: 'JetBrains Mono', monospace; /* Laboratory data only */
```

### Variable Font Axes (Fraunces)

**Interactive Typography - The Bloom Effect:**

| State | SOFT | WONK | Weight | Usage |
|:---|:---:|:---:|:---:|:---|
| Rest | 50 | 0 | 400 | Default body text |
| Hover | 30 | 0.5 | 600 | Interactive elements |
| Active | 0 | 1 | 700 | Engaged/clicked |
| Focus | 0 | 1 | 800 | Selected/attention |

**Implementation:**
```css
.interactive-text {
  font-family: 'Fraunces', serif;
  font-variation-settings: 'SOFT' 50, 'WONK' 0;
  transition: font-variation-settings 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.interactive-text:hover {
  font-variation-settings: 'SOFT' 30, 'WONK' 0.5;
  font-weight: 600;
}
```

### Size Ratios (Proclamation Maximalism)

* **Hero headlines:** 240px (Libre Bodoni Condensed)
* **Supporting text:** 48px (5x ratio minimum)
* **Body text:** 16px (Work Sans)
* **Annotations:** 11px (JetBrains Mono)

**Rule:** Gallery Mode hero moments should use **extreme size contrast** (5x or greater), not timid 1.5x ratios.

---

## Shape Morphology (Organic Asymmetry)

**Never use uniform border-radius.** Always use asymmetric tokens:

```css
--radius-pebble: 20px 6px 16px 28px;  /* Primary actions, buttons */
--radius-stone: 16px 4px 12px 24px;   /* Containers, cards */
--radius-leaf: 24px 8px 20px 4px;     /* Hero containers */
--radius-seed: 8px 4px 10px 6px;      /* Data tags, badges */
```

**Application:**
```css
.btn-pebble {
  border-radius: var(--radius-pebble);
}

.card {
  border-radius: var(--radius-stone);
}
```

---

## Component Patterns

### Buttons (The Pebble)

```css
.btn-pebble {
  border-radius: var(--radius-pebble);
  background: var(--color-primary);
  color: var(--color-surface);
  padding: 12px 24px;
  font-family: var(--font-field-note);
  font-weight: 600;
  transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.btn-pebble:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 16px rgba(212, 168, 75, 0.4);
  font-variation-settings: 'SOFT' 30;
}

.btn-pebble:active {
  transform: scale(0.98);
}
```

**Label Rules:**
* Never: "Submit", "Click here", "Save"
* Always: "Commit to the ledger", "Deposit specimen", "Preserve entry"

### Cards (The Stone)

```css
.card {
  border-radius: var(--radius-stone);
  background: var(--color-container);
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.card:hover {
  transform: translateY(-12px);
  box-shadow: 0 24px 48px rgba(212, 168, 75, 0.2);
}

.card:hover .card-title {
  font-variation-settings: 'SOFT' 0, 'WONK' 0.7;
  font-weight: 700;
}
```

### Badges (The Seed)

```css
.badge-seed {
  border-radius: var(--radius-seed);
  background: var(--color-muted);
  padding: 4px 12px;
  font-family: var(--font-annotation);
  font-size: 11px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-seed::before {
  content: "Fig. " counter(badge-counter);
  font-size: 9px;
  opacity: 0.7;
}
```

---

## Motion & Animation

### Default Easing & Duration

```css
--ease-viscous-breeze: cubic-bezier(0.34, 1.56, 0.64, 1);
--duration-default: 600ms;
```

### Compound Animations (The Unfolding)

**Never animate a single property.** Use staggered, multi-phase animations:

```css
/* Phase 1: Lift (0-200ms) */
.card:hover {
  transform: translateY(-12px);
  transition: transform 200ms var(--ease-viscous-breeze);
}

/* Phase 2: Glow (100-400ms, overlapped) */
.card:hover::before {
  box-shadow: 0 24px 48px rgba(212, 168, 75, 0.2);
  transition: box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms;
}

/* Phase 3: Typography Bloom (200-600ms, overlapped) */
.card:hover .title {
  font-variation-settings: 'SOFT' 0, 'WONK' 0.7;
  transition: font-variation-settings 400ms var(--ease-viscous-breeze) 200ms;
}
```

**Rule:** Each animation should have staggered timing, multiple properties, and organic easing.

---

## Mode-Specific Rules

### Gallery Mode (Wonder)
* **Context:** Landing, Dashboard, Opportunity Feed
* **Texture:** `gouache-grain.png` overlay
* **Typography:** Fraunces (The Bloom), Libre Bodoni (The Proclamation)
* **Motifs:** Botanical illustrations (Waratahs, Banksias, Gum Leaves)
* **Tone:** Poetic, inviting, warm
* **Forbidden:** Grid lines, anatomical diagrams, technical language

### Laboratory Mode (Rigor)
* **Context:** Ingestion, Analysis, Quality Gate
* **Texture:** `aged-parchment.png` overlay
* **Typography:** JetBrains Mono (The Annotation)
* **Motifs:** Anatomical sketches, brass instruments, grid overlays
* **Tone:** Precise, clinical, measured
* **Forbidden:** Flowers, poetic language, warm colors

---

## Micro-copy Rules

### Translation Table (Quick Reference)

| Generic | Northcote Curio |
|:---|:---|
| Upload resume | Catalog Resume |
| Save changes | Preserve Notes |
| Loading... | Analyzing Specimen... |
| Success! | Discovery Recorded. |
| No results found | No Specimens Found. |
| Delete | Discard Specimen |
| Dashboard | Field Station |
| Profile | Career Log |

**Full reference:** `/docs/v2_atomic/DOC-006_Voice_and_Microcopy.md`

---

## Forbidden Patterns

### Never Use:
* ❌ Generic rounded corners (`border-radius: 8px`)
* ❌ Pure black or white (`#000000`, `#FFFFFF`)
* ❌ Instant transitions (`transition: all 0.2s`)
* ❌ Generic SaaS language ("Click here", "Get started", "Optimize")
* ❌ Uniform padding/spacing without organic variation
* ❌ Flowers in Laboratory Mode
* ❌ Grid lines in Gallery Mode
* ❌ Static typography (always use variable axes on interaction)

### Always Use:
* ✅ Asymmetric border-radius tokens
* ✅ Botanical color names with CSS variables
* ✅ 600ms+ transitions with organic easing
* ✅ Naturalist-inspired micro-copy (Clear & Thematic)
* ✅ Mode-appropriate visual language
* ✅ Variable font axes for interactive typography
* ✅ Compound, staggered animations

---

## Asset Library

### Gallery Assets (The Garden)
* `native-waratah-hanging.png` (Top-Right Anchor)
* `native-banksia-cluster.png` (Bottom-Right Floor)
* `kookaburra-sentry.png` (Welcome/Empty States)

### Laboratory Assets (The Study)
* `da-vinci-skeleton.png` (Resume Structure)
* `brass-calipers.png` (Measurement Tools)
* `grid-overlay-major.svg` (Background Pattern)

**Location:** `/frontend/src/assets/`

---

## Quick Checklist

Before shipping any component, verify:

- [ ] Uses asymmetric border-radius tokens (not generic values)
- [ ] Uses CSS color variables (not hardcoded hex)
- [ ] Typography matches mode context (Gallery vs Laboratory)
- [ ] Animations are 600ms+ with organic easing
- [ ] Micro-copy follows naturalist voice (not generic SaaS)
- [ ] Interactive elements use variable font axes
- [ ] Compound animations with staggered timing
- [ ] No forbidden patterns (pure black/white, instant transitions, etc.)

---

**For complete specifications, reference:**
* `/docs/v2_atomic/DOC-001_Design_System.md` (Color, Typography, Motion)
* `/docs/v2_atomic/DOC-004_Component_Catalog.md` (Components, Motion Primer)
* `/docs/v2_atomic/DOC-006_Voice_and_Microcopy.md` (Language, Tone, Copy)
