# DOC-009: Figma Make Assistant Prompts (M3 Expressive Edition)

**Document ID:** DOC-009-FIGMA-AI-PROMPTS  
**Version:** 3.0 (Wild Growth Edition)  
**Status:** Ready for AI Generation  
**Design Philosophy:** M3 Expressive — Playful, Physics-Based, Anti-Slop, Collage Typography

---

## M3 EXPRESSIVE DESIGN MANDATE

> **CRITICAL:** These prompts enforce M3 Expressive principles. Every component must feel ALIVE, not static. Typography is SPATIAL ART, not text lines.

### Typography Physics
- **Weight Contrast:** 200 vs 900 (4.5x ratio) — NOT 400 vs 600
- **Size Contrast:** 72px vs 12px (6x ratio) — NOT 24px vs 16px
- **Parametric Axes:** 
  - `GRAD` (Grade) for hover states — no layout reflow
  - `CASL` (Casual) & `CRSV` (Cursive) for "Vine" display text
  - `WONK` for "Native Irregularity" in titles
  - `XTRA` for optical adjustments — 468 for data displays
- **Font Stack:** 
  - **Display:** Recursive (`CASL` 1, `CRSV` 1) — "The Vine"
  - **Headline:** Amstelvar (`wdth` 125, `wght` 900) — "The Trunk"
  - **Title:** Fraunces (`SOFT` 100, `WONK` 1) — "The Bloom"
  - **Body:** Roboto Flex (`opsz` 14) — "The Leaf"
- **Script Accent:** Recursive Linear (Cursive Axis) instead of Caveat

### The "Wild Growth" Typography Philosophy

> **Stop treating typography as text strings. Treat it as an expressive biology-inspired collage.**

- **Absolute Positioning Logic:** Tuck script words behind or on top of structural letters, as if growing through them.
- **Scale Disparity:** Script keywords MUST be significantly larger or smaller than structural text — NEVER match the x-height.
- **Rhythmic Breaks:** Break headlines into 3-4 lines with erratic alignment (left, right, center floating in negative space).
- **Wattle Accents:** Turn punctuation marks into Wattle Gold `#F0C419` Pebble shapes sitting behind text.

### The "One Duet" Rule

> **CRITICAL:** Only ONE Vine Script "duet" per screen. Using the Duet pattern everywhere creates "Predictable Slop."

- **Hero Headline:** Full Duet allowed (structural + script overlay)
- **Secondary Headers:** Use Wattle Gold color on a single word instead of script
- **Tertiary Elements:** No script — structural only

### Shape System (Anti-Generic)
- **Pebble:** `20px 20px 32px 32px` — Buttons, CTAs (organic, friendly)
- **Tech:** `24px` (symmetric) — **Primary card shape** for data containers
- **Gem:** `4px` — Sharp badges, chips (precise, data-forward)
- **Leaf:** `24px 8px 24px 8px` — Decorative/organic accents only (NOT for data cards)

**FORBIDDEN:**
- ❌ `rounded-md`, `rounded-lg`, `rounded-xl` (generic Tailwind)
- ❌ Hardcoded `border-radius: 8px` (cookie-cutter)

### Motion Physics
- **Spring Stiffness:** 500
- **Spring Damping:** 27
- **Hover Transform:** `scale(1.02)` + `translateY(-4px)` + shadow lift
- **Container Hover:** Border glows, internal Grade increases (`GRAD: 0 → 150`)

### Anti-Slop Checklist
- ✅ Layered backgrounds (dot-grid texture at 5% opacity — NOT elaborate gradients or blur)
- ✅ Varied spacing rhythm (8px, 16px, 32px, 48px — NOT uniform)
- ✅ Elevation via shadow depth (Level 2-4 tokens)
- ✅ Spring easing on ALL animations (no linear, no ease-in-out)
- ✅ Typography as spatial collage (NOT linear text strings)
- ✅ One Duet per screen maximum

---

## Design Token Reference (M3 Native)

| Token | Value | Usage |
|:---|:---|:---|
| `brand-primary` | `#B4D8AE` | Success, Growth, Sage green |
| `brand-secondary` | `#E09F7D` | Actions, Urgency, Terracotta |
| `brand-tertiary` | `#F0C419` | Highlights, Script accents, Wattle |
| `surface-deep` | `#121212` | Page floor (layered, atmospheric) |
| `container-tech` | `#1E1E1E` | Card surfaces (with dot-grid texture) |
| `shape-pebble` | `20px 20px 32px 32px` | Buttons, organic CTAs |
| `shape-tech` | `24px` (symmetric) | **Primary card shape** for data containers |
| `shape-gem` | `4px` | Badges, tight chips |
| `elevation-2` | `0 4px 12px rgba(0,0,0,0.35)` | Floating cards |
| `elevation-4` | `0 12px 48px rgba(0,0,0,0.5)` | Modals, hero focus |

---

## Typography Variable Axes Reference

| Axis | Token | Values | Usage |
|:---|:---|:---|:---|
| **GRAD** (Grade) | `--sys-type-axes-grade` | `0` → `150` | Hover states (no layout reflow) |
| **wdth** (Width) | `--sys-type-axes-width` | `100` (normal), `120` (authoritative) | Headers, emphasis |
| **wght** (Weight) | `--sys-type-axes-weight` | `200` (thin), `900` (black) | All text |
| **XTRA** (X-Height Extra) | `--sys-type-axes-xtra` | `468` | Data displays, optical adjustment |
| **opsz** (Optical Size) | `--sys-type-axes-optical` | `8` (small), `24` (display) | Size-appropriate rendering |

**Data Axis Preset:**
```
Weight: 500, Width: 110, Optical Size: 8
```

**Authoritative Axis Preset:**
```
Weight: 800, Width: 120, XTRA: 468
```

---

## THE EUCALYPT TYPOGRAPHY STACK (Native & Expressive)

### 🌿 Species 1: THE VINE (Recursive)
- **Role:** Display, Hero Moments, "Wild Growth"
- **Style:** 
  - Axes: `CASL` 1, `CRSV` 1, `slnt` -15
  - Weight: **800 ExtraBold** (Impact) or **300 Light** (Overlay)
  - Color: Wattle Gold `#F0C419` or Terracotta `#E09F7D`
  - **Logic:** Used for large "Human" headers that break the grid.

### 🪵 Species 2: THE TRUNK (Amstelvar)
- **Role:** Headlines, Structural Anchors, "Hard Data"
- **Style:** 
  - Axes: `wdth` 125 (Wide), `wght` 900 (Black)
  - Tracking: `-0.02em`
  - Color: White `#FFFFFF` or Sage `#B4D8AE`
  - **Logic:** The immovable object. Grounds the layout.

### 🌸 Species 3: THE BLOOM (Fraunces)
- **Role:** Titles, Editorial Sections, "Native Irregularity"
- **Style:** 
  - Axes: `SOFT` 100, `WONK` 1
  - Weight: **500 Medium**
  - **Logic:** Unexpected, soft, full of character. Mocks native flowers.

### 🍃 Species 4: THE LEAF (Roboto Flex)
- **Role:** Body, UI Text, High Density
- **Style:** 
  - Axes: `opsz` 14, `GRAD` 0 (Idle) → 150 (Hover)
  - **Logic:** Functional, legible, abundant. Crisp like a fresh gum leaf.

---

## IMPLEMENTATION STRATEGY: "UNEXPECTED GROWTH"

To achieve the "Editorial Treatment" (Hero moments with opposing fonts), use this specific CSS composition strategy:

### 1. The "Banksia" Composition (Hero Moment)
* **Concept:** A vine growing over a rock.
* **Top Layer (Display):** `Recursive` (Cursive, Light Weight, Large Size). Overlays the bottom layer.
* **Bottom Layer (Headline):** `Amstelvar` (Wide, Heavy Weight, Dark Color).
* **Effect:** The "Vine" (Recursive) appears to be growing *through* the "Trunk" (Amstelvar).

### 2. The "Reactive" Width Rule
* **Context:** When the browser window widens.
* **Logic:** Link the `Amstelvar` **wdth** axis to the viewport width.
* **Result:** The headline physically expands to fill the space (**Line Filling**), just as a tree canopy spreads to find light.
```css
/* Example: Reactive Width */
.headline-fluid {
  font-family: 'Amstelvar';
  font-variation-settings: 'wdth' clamp(100, 50 + 5vw, 125);
}
```

---

## FLORA ASSET LIBRARY (Australian Native)

> **The Greenhouse Dashboard aesthetic relies on Australian native flora illustrations.** These assets create the "lush organic night garden" feel that differentiates CareerCopilot from generic SaaS.

### Asset Roles & Placement Rules

| Role | Asset | Filename | Position | Opacity | Motion |
|:---|:---|:---|:---|:---|:---|
| **The Floor** | Bottlebrush Group | `native-group.png` | Hero bottom-right, masked at edge | 25-35% | Parallax 5px on scroll |
| **The Ceiling** | Gum Hanging | `native-gum-hanging.png` | Top-right corner anchor | 30-40% | Subtle sway on hover |
| **The Anchor** | Waratah Hanging | `native-waratah-hanging.png` | Page header top-right | 35% | None (stable anchor) |
| **The Spark** | Bottlebrush Potted | `native-bottlebrush.png` | Near "New/Add" actions | 40-50% | Scale 1.05 on nearby hover |
| **The Highlight** | Kangaroo Paw | `native-kangaroo.png` | Success states, gold CTAs | 35% | Fade in on success |
| **The Companion** | Banksia | `native-banksia.png` | Secondary decorative, empty states | 30% | None |

### Asset Visual Characteristics

All flora assets share these properties:
- **Background:** Transparent PNG on dark (`#121212`) base
- **Pot Color:** Terracotta (`#E09F7D`) — matches brand secondary
- **Foliage:** Sage green (`#B4D8AE`) — matches brand primary
- **Blooms:** Red/Terracotta or Gold/Wattle — matches brand palette
- **Style:** Flat illustration, mid-century botanical, NOT photorealistic

### Texture Asset

| Asset | Filename | Usage | Opacity |
|:---|:---|:---|:---|
| **Hex Pattern** | `texture-pattern.png` | Card backgrounds, page atmospherics | 3-5% overlay, blend mode: overlay |

---

## FLORA INTEGRATION ANTI-SLOP

### ✅ DO
- Use **ONE primary flora asset per screen** (avoid visual clutter)
- Match asset color to nearby UI elements (Terracotta pot near Terracotta buttons)
- Apply **25-40% opacity** (never 100% — flora supports, doesn't dominate)
- Position at **edges and corners** (never center of content)
- Use parallax or subtle motion on **ONE asset per page** maximum
- Layer flora **behind** content, never over interactive elements

### ❌ DON'T
- Place flora in the center of content areas
- Use multiple hanging plants on one screen
- Apply flora over text or interactive elements
- Use opacity above 50% (competes with UI hierarchy)
- Mix native flora with non-native houseplants (snake plant, monstera, pilea)
- Animate multiple flora assets simultaneously

### Asset Pairing by Screen Type

| Screen Type | Primary Asset | Secondary Asset | Texture |
|:---|:---|:---|:---|
| **Hero/Landing** | Waratah Hanging (top-right) | Native Group (bottom-right) | None |
| **Dashboard** | Gum Hanging (top-right) | Native Group (hero) | Hex 3% |
| **Data/Analytics** | Bottlebrush (edge accent) | None | Hex 5% |
| **Forms/Input** | Kangaroo Paw (empty state only) | None | None |
| **Success States** | Kangaroo Paw (celebration) | Bottlebrush (accent) | None |
| **Settings/Utility** | Banksia (subtle) | None | Hex 3% |
| **Empty States** | Kangaroo Paw or Banksia | None | None |

---

## REQUESTING FLORA ASSETS IN FIGMA

> Since Figma Make cannot directly use local assets, describe the flora using these visual specifications:

### 🌺 For `native-waratah-hanging.png` (The Anchor)
```
"Add a hanging planter with an iconic Australian waratah flower. 
- Bloom: Large red/terracotta dome-shaped flower head with layered petals
- Leaves: Sage green (#B4D8AE) serrated leaves, medium density
- Pot: Terracotta (#E09F7D) rounded hanging planter with tan macramé rope
- Style: Flat mid-century botanical illustration, NOT photorealistic
- Position: Top-right corner, hanging into viewport
- Opacity: 35%"
```

### 🌸 For `native-gum-hanging.png` (The Ceiling)
```
"Add a hanging eucalyptus plant with pink/coral gum blossoms.
- Blooms: Soft pink/coral fluffy eucalyptus flowers
- Leaves: Long, slender sage green (#B4D8AE) gum leaves, cascading downward
- Pot: Terracotta (#E09F7D) hanging pot with tan rope
- Style: Flat botanical illustration
- Position: Top-right corner
- Opacity: 30%"
```

### 🔴 For `native-bottlebrush.png` (The Spark)
```
"Add a potted bottlebrush plant (Callistemon).
- Blooms: Red spiky cylindrical brush-like flowers (iconic Australian native)
- Leaves: Sage green (#B4D8AE) narrow elongated leaves
- Pot: Terracotta (#E09F7D) standard pot shape
- Style: Flat botanical illustration
- Position: Bottom-right or near action buttons
- Opacity: 35-40%"
```

### 🌼 For `native-kangaroo.png` (The Highlight)
```
"Add a potted kangaroo paw plant.
- Blooms: Wattle gold (#F0C419) tubular paw-shaped flowers on tall stems
- Leaves: Sage green blade-like leaves at base
- Pot: Terracotta (#E09F7D) tapered pot
- Style: Flat botanical illustration
- Position: Near success elements or empty states
- Opacity: 35%"
```

### 🌿 For `native-banksia.png` (The Companion)
```
"Add a hanging banksia plant.
- Blooms: Pink/coral cylindrical flower spikes
- Leaves: Sage green serrated long leaves
- Pot: Terracotta hanging planter
- Style: Flat botanical illustration
- Position: Secondary decorative, corner placement
- Opacity: 30%"
```

### 🔲 For `texture-pattern.png` (Background Texture)
```
"Apply a subtle hexagonal geometric texture overlay.
- Pattern: Dark grey hexagons on near-black background
- Style: Organic, slightly irregular hexagonal tiles
- Opacity: 3-5%
- Blend Mode: Overlay or Soft Light
- Usage: Card backgrounds, page floor atmosphere"
```

---

## PROMPT 01: Landing Page

**PROMPT START**

Generate a high-fidelity desktop landing page (1440px) for "CareerCopilot" — a 2026 Australian Selection Criteria automation platform. Apply M3 Expressive design with playful physics and dramatic typography.

### Aesthetic DNA
- **Visual Identity:** "The Greenhouse Dashboard" — High-density data in a lush organic night garden
- **Mood:** Confident, alive, slightly wild
- **Color Temperature:** Warm earth tones on deep charcoal

### Typography (Expressive Hierarchy)
| Element | Font | Weight | Size | Color | Treatment | Leading |
|:---|:---|:---|:---|:---|:---|:---|
| Hero Headline | Plus Jakarta Sans | **900 Black** | **72pt** | White | Uppercase, tracking -0.02em | 110% |
| Subheadline | Plus Jakarta Sans | **200 Thin** | 24pt | White 70% | Sentence case | 120% |
| Decorative Script | Caveat | **500** | 48pt | Wattle `#F0C419` | **Rotated 4°**, overlapping | 130% |
| Data Labels | JetBrains Mono | **700** | 12pt | White 60% | Uppercase, tracking +0.08em | 140% |

### Layout Architecture
1. **Hero Section (Full Viewport Height):**
   - **Background:** Deep Charcoal `#121212` with 3-layer atmosphere:
     - Layer 1: Radial gradient (Sage 5% → transparent)
     - Layer 2: Animated aurora/plasma shimmer (very subtle)
     - Layer 3: Soft vignette (darker edges)
   
   - **Typography Block — "BANKSIA" COMPOSITION (Hero Moment):**
     > **CRITICAL:** Use the "Banksia" Composition strategy. 
     
     - **Layer 1 (The Trunk):** "LOGIC-FIRST" — `Amstelvar` Black, 72pt, Uppercase, White.
       - **Reactive Width:** Ensure `wdth` axis expands with viewport (100 -> 125).
     
     - **Layer 2 (The Vine):** "career architect" — `Recursive` Cursive, 48pt, Wattle Gold.
       - **Positioning:** Rotated 5°, **tucked under the "T" in FIRST**, overlapping by 20px.
     
     **Spatial Rules:**
     - Script floats in negative space, NOT appended to end of line
     - Scale disparity: Script should feel like it's "growing through" the structural text
     - Erratic alignment: "The Trunk" centers, "The Vine" offsets right
   
   - **CTA Button:**
     - Label: "Get Started →"
     - Shape: **Pebble** (`20px 20px 32px 32px`)
     - Color: Terracotta `#E09F7D`
     - Size: 64px height × 240px width (generous touch target)
     - **Hover State:** 
       - `translateY(-6px)` + `scale(1.04)`
       - Shadow: `0 16px 48px rgba(224, 159, 125, 0.4)`
       - Background brightness: +15%
       - Spring physics: stiffness 500, damping 27

   - **Flora Decoration (See FLORA ASSET LIBRARY for visual specs):**
     - **Primary — The Anchor:** `native-waratah-hanging.png`
       - Position: Top-right corner, hanging into viewport (fixed, 20px from edge)
       - Opacity: 35%
       - Parallax: moves 5px on mouse movement
     - **Secondary — The Floor:** `native-group.png`
       - Position: Hero bottom-right, partially masked by container edge
       - Opacity: 25%
       - Scale: 60% of original size

2. **4-Phase Roadmap (Below Fold):**
   - **Layout:** Horizontal timeline with 4 nodes
   - **Spacing Rhythm:** 16px internal, 48px between nodes (VARIED, not uniform)
   
   - **Each Phase Card:**
     - Shape: **Tech** (`24px` symmetric) — solid, data-forward
     - Background: `#1E1E1E` with 5% dot-grid texture overlay
     - Border: 1px solid white 10%
     - **Hover:** Border glows Sage, card lifts 8px, shadow expands
   
   - **Phase Content:**
     - Number: JetBrains Mono, 900, 48pt (oversized)
     - Icon: 40px, Sage color
     - Title: "The Brain" (900 Black, 20pt)
     - Subtitle: "Data Sovereignty" (200 Thin, 14pt, white 60%)
   
   - **Connection Line:** 
     - 2px dashed Sage `#B4D8AE`
     - Animated: dots move left-to-right (subtle progress feel)

### Interactive States (Spring Physics)
- **Button Idle → Hover:** Spring lift with shadow bloom
- **Phase Card Idle → Hover:** Border animates from transparent to Sage glow
- **Scroll Reveal:** Elements fade up with staggered delay (100ms per element)

### Component IDs
- [UI-COMP-001] Hero Section
- [UI-COMP-002] Interactive Roadmap

**PROMPT END**

---

## PROMPT 02: The Brain (Ingestion Dashboard)

**PROMPT START**

Generate a desktop page (1440px) for "The Brain" — a multi-file drag-and-drop data ingestion interface. Apply M3 Expressive with "Zero Friction" UX and satisfying physics.

### Aesthetic DNA
- **Mood:** Inviting chaos (organized chaos). The user should want to "throw their files here."
- **Visual Signature:** Pulsing, breathing dropzone with biological animations

### Typography (Expressive Hierarchy)
| Element | Font | Weight | Size | Color | Treatment | Leading |
|:---|:---|:---|:---|:---|:---|:---|
| Page Header | Plus Jakarta Sans | **900 Black** | **56pt** | White | Uppercase | 110% |
| Drop Zone Invitation | Caveat | **500** | **40pt** | Wattle `#F0C419` | **Rotated 2°**, playful | 130% |
| File Labels | JetBrains Mono | **700** | 14pt | White 80% | Uppercase, tracking +0.05em | 140% |
| Status Text | Plus Jakarta Sans | **200 Thin** | 16pt | White 60% | Sentence case | 120% |

### Layout Architecture
1. **Page Header (80px height):**
   - Left: "THE BRAIN" (900 Black, 56pt) with **decorative underscore** (Sage, 4px thick, 60% width of text)
   - Right: Phase indicator "Phase 1 / Ingestion" (JetBrains Mono, 12pt, white 40%)
   - **NOTE:** This header uses NO Duet pattern — the Duet is reserved for the Drop Zone headline.

2. **Hero Drop Zone (Centered, 900px × 550px):**
   - **Shape:** **Tech** with cut corner (24px radius, top-right corner cut at 45°)
   - **Background:** 
     - Base: `#1E1E1E`
     - Overlay: 8% dot-grid pattern (repeating 24px)
   - **Border (Idle):** 3px dashed Sage `#B4D8AE`, animation: dash-offset moves slowly
   
   - **Inner Content (Centered) — THE DUET:**
     - Icon: Oversized cloud-upload (120px), Sage color, subtle bounce animation (loop)
     - **Headline (Banksia Composition):**
       - "Drop your" — `Amstelvar` 200, 24pt, White 60%
       - "Chaos" — `Recursive` Cursive, 48pt, Wattle Gold, **rotated 3°**, overlapping the "p" in "Drop"
       - "here." — `Amstelvar` Black, 32pt, White
       - **Reactive Width:** "here" expands with viewport.
       - **Period:** Render as a Wattle Gold Pebble shape (12px) behind the text
     - Subtext: "PDF, DOCX, TXT — up to 50MB each" (JetBrains Mono, 14pt, white 50%)
   
   - **Drag-Over State (EXPRESSIVE):**
     - Border: Solid 4px Sage (glow: `0 0 24px rgba(180, 216, 174, 0.6)`)
     - Container: `scale(1.03)` with spring physics
     - Background: Sage 5% tint overlay (breathing pulse at 2s interval)
     - Icon: Pulses scale(1.2) → scale(1.0) loop
   
   - **Processing State:**
     - Border: Solid Sage, pulsing opacity (0.6 → 1.0)
     - "Liquid fill" progress bar from bottom (Sage color, organic wave edge)
     - Status: "Extracting Resume Intelligence..." (Plus Jakarta Sans 200 Thin, 18pt, Sage)

3. **File Queue (Below Drop Zone, 24px gap):**
   - **Each File Card:**
     - Shape: **Tech** (`16px` symmetric)
     - Layout: Icon (left) + Filename (center) + Status (right)
     - Filename: JetBrains Mono, 700, 16pt
     - Status Indicator: 
       - Parsing: Spinner + "Parsing..." (Wattle)
       - Complete: Checkmark + "Skills extracted" (Sage)
   
   - **Success Toast (Top-Right):**
     - Shape: **Pebble**
     - Content: "✓ 12 skills detected" (Sage background)
     - Animation: Slide in from right, spring bounce

### Motion Physics
- **Drop Zone Hover:** Breathing pulse (scale oscillates 1.00 ↔ 1.02 at 3s period)
- **File Card Completion:** Checkmark draws itself (SVG path animation, 400ms)
- **Toast Entrance:** Spring slide + bounce (overshoot 10%)

### Flora Decoration (See FLORA ASSET LIBRARY for visual specs)
- **Empty Drop Zone State:** `native-kangaroo.png` (Wattle Gold matches Caveat script)
  - Position: Centered below "Drop your Chaos here" headline
  - Opacity: 15%
  - Scale: 35%
  - Animation: Fades OUT when files are dragged over
- **Success Celebration:** `native-bottlebrush.png` (The Spark)
  - Position: Peeks in from right edge on successful extraction
  - Opacity: 0% → 35% (slides in 40px, fades in)
  - Scale: 45%
  - Trigger: When all files complete parsing

### Component IDs
- [UI-COMP-101] Multi-File Drop Zone
- [UI-COMP-102] Real-time Parsing Indicator

**PROMPT END**

---

## PROMPT 03: The Laboratory (Audit Dashboard)

**PROMPT START**

Generate a desktop analytics dashboard (1440px) for "The Laboratory — Global Audit Report". This is the **Quality Gate** — dramatic, high-stakes UI.

### Aesthetic DNA
- **Mood:** Scientific precision meets emotional stakes. The score gauge should feel like mission control.
- **Visual Signature:** Glowing gauges, heatmap colors, locked/unlocked states

### Typography (Expressive Hierarchy)
| Element | Font | Weight | Size | Color | Treatment | Leading |
|:---|:---|:---|:---|:---|:---|:---|
| Score Value | Plus Jakarta Sans | **200 Thin** | **128pt** | White (Sage glow) | Monumental, animated count-up | 100% |
| Section Headers | JetBrains Mono | **700** | 14pt | White 60% | Uppercase, tracking +0.12em | 140% |
| Metric Values | Plus Jakarta Sans | **900 Black** | 72pt | White | Numbers only | 100% |
| Metric Labels | JetBrains Mono | **400** | 12pt | White 40% | Uppercase | 140% |

### Layout Architecture (2-Column, 40/60 Split)
1. **Left Column (Hero Gauge):**
   - **Score Gauge (400px diameter):**
     - Ring: 24px thick, gradient (Terracotta at 0% → Wattle at 50% → Sage at 100%)
     - Fill: Animated arc to current score (87%)
     - Center: "87" (Plus Jakarta Sans **200 Thin**, 128pt)
       - **NOTE:** Use 200 weight, NOT 900 — creates drama through delicacy
       - Glow: Subtle Sage blur behind number
     - Label Below: "GLOBAL MATCH SCORE" (JetBrains Mono, 12pt, white 50%)
   
   - **Quality Gate Button (Below Gauge):**
     - **Unlocked State (Score >= 85%):**
       - Label: "Unlock the Studio →"
       - Shape: **Pebble**
       - Background: Animated gradient (Sage → Wattle → Sage, 3s loop)
       - Shadow: Pulsing glow `0 0 32px rgba(180, 216, 174, 0.5)`
       - Hover: `translateY(-8px)`, shadow expands, brightness +10%
     
     - **Locked State (Score < 85%):**
       - Label: "Quality Gate Locked"
       - Shape: **Pebble** but with dashed border (2px)
       - Background: `#1E1E1E` (no gradient)
       - Opacity: 60%
       - Lock icon: Padlock SVG, white 40%

2. **Right Column (Metrics Grid, 3 Cards):**
   - **Card Shape:** **Tech** (`24px` symmetric)
   - **Card Spacing:** 24px gap
   
   - **Card 1: STAR Density**
     - Title: "STAR DENSITY" (JetBrains Mono, 12pt)
     - Value: "3.8" (Plus Jakarta Sans 900, 72pt)
     - Indicator: Horizontal bar with target line at 3.5
       - Below target: Terracotta fill
       - At/above target: Sage fill
     - **Hover:** Card lifts 6px, `GRAD` increases on typography
   
   - **Card 2: Missing Keywords**
     - Title: "CRITICAL GAPS"
     - Content: Grid of **Gem** shaped pills (4px radius)
       - Each pill: Terracotta background, white text
       - Examples: "NDIS Framework", "Budget Mgmt", "Salesforce"
     - **Hover on Pill:** Scale 1.05, tooltip "Click to Auto-Fix"
   
   - **Card 3: Evidence Verification**
     - Title: "VERIFIED COMPETENCIES"
     - Content: Text excerpt with highlighted keywords (Sage underline)
     - Badge: "Leadership — VERIFIED ✓" (Sage, Gem shape)

### Motion Physics
- **Gauge Load:** Arc animates from 0° to final angle over 1.5s (spring ease)
- **Score Counter:** Numbers count up 0 → 87 with easing
- **Gate Unlock Moment:** When score crosses 85, confetti burst (Sage + Wattle particles)

### Flora Decoration (See FLORA ASSET LIBRARY for visual specs)
- **Quality Gate Unlocked:** `native-kangaroo.png` (Wattle Gold flowers match celebration)
  - Position: Adjacent to "Unlock the Studio" button, right side
  - Opacity: 0% → 40% (fades in when score >= 85%)
  - Scale: 50%
  - Animation: Fade in + gentle sway
- **Texture:** `texture-pattern.png` at 5% opacity on page floor (higher for data density focus)

### Component IDs
- [UI-COMP-303] S-Global Heatmap
- [UI-COMP-304] Quality Gate Interface

**PROMPT END**

---

## PROMPT 04: The Laboratory (Split-Screen Editor)

**PROMPT START**

Generate a desktop split-screen editor (1440px) for drafting KSC responses with evidence library sidebar. Apply M3 Expressive focus states and "Zen Mode" dimming.

### Aesthetic DNA
- **Mood:** Focused creativity. The editor should feel like a writing sanctuary.
- **Visual Signature:** "Zen Mode" dimming, glowing focus states, drag-and-drop evidence cards

### Typography (Expressive Hierarchy)
| Element | Font | Weight | Size | Color | Treatment | Leading |
|:---|:---|:---|:---|:---|:---|:---|
| Question Text | Plus Jakarta Sans | **200 Thin** | 20pt | White 80% | Sentence case | 130% |
| Editor Content | Plus Jakarta Sans | **400** | 18pt | White 90% | Line-height 1.7 | 170% |
| Placeholder | Caveat | **500** | 24pt | Wattle `#F0C419` | Rotated 1°, italic feel | 130% |
| Sidebar Header | JetBrains Mono | **700** | 14pt | White 50% | Uppercase | 140% |
| Evidence Title | Plus Jakarta Sans | **900 Black** | 18pt | White | — | 120% |
| Word Count | JetBrains Mono | **400** | 14pt | Dynamic | Sage (valid) / Terracotta (invalid) | 140% |

### Layout Architecture (50/50 Split)
1. **Left Pane (Editor):**
   - **Sticky Header (72px):**
     - Question Badge: "Q1" (Gem shape, 4px radius, Sage background, JetBrains Mono 700)
     - Question Text: "Describe your experience managing stakeholder engagement..." (200 Thin, 20pt)
     - Word Count: "287 / 200 words" 
       - Valid (>200): Sage color, checkmark
       - Invalid (<200): Terracotta color, warning icon
   
   - **Text Area:**
     - Shape: **Tech** (`24px` symmetric)
     - Background: `#1A1A1A` (slightly darker than container)
     - **Focus State:**
       - Border: 3px solid Sage with glow
       - Background: Lightens to `#1E1E1E`
       - Sidebar dims to 30% opacity (Zen Mode)
     - **Placeholder (Wild Growth Layout):**
       - "Start your" — Plus Jakarta Sans 200, 18pt, White 40%
       - "STAR story" — Caveat 500, 24pt, Wattle Gold, rotated 2°
       - "here..." — Plus Jakarta Sans 200, 18pt, White 40%
     - **Inline Suggestions:**
       - Weak verb "helped" → underlined Terracotta, tooltip "Try: Spearheaded"
   
   - **Auto-Save Indicator (Top-Right):**
     - Idle: Hidden
     - Saving: "Saving..." fades in (white 50%), spinner
     - Saved: "✓ Saved" fades out after 2s

2. **Right Pane (Evidence Sidebar):**
   - **Header:** "EVIDENCE LIBRARY" (JetBrains Mono 700, 14pt, white 50%)
   
   - **Draggable Cards (3 visible):**
     - Shape: **Tech** (`16px` symmetric)
     - Background: `#1E1E1E`
     - **Content:**
       - Badge: "STAR Story" (Gem shape, Wattle background)
       - Title: "Led NDIS Transition Project" (900 Black, 18pt)
       - Excerpt: 2-line preview (200 Thin, 14pt, white 60%)
       - Drag Handle: ⠿ (left edge, revealed on hover)
     
     - **Hover State:**
       - Card lifts 8px (shadow expands)
       - Border: 1px Sage
       - Cursor: grab
     
     - **Dragging State:**
       - Card follows cursor with 20px offset
       - Opacity: 80%
       - Shadow: `0 24px 64px rgba(0,0,0,0.5)`
       - Drop zone in editor highlights with dashed Sage border

### Motion Physics
- **Focus Transition:** Smooth 300ms for border glow and sidebar dim
- **Card Drag:** Elastic feel (slight delay following cursor)
- **Auto-Save:** Fade uses opacity spring (not linear)

### Component IDs
- [UI-COMP-301] Split-Screen Markdown Editor
- [UI-COMP-302] Evidence Library Sidebar

**PROMPT END**

---

## PROMPT 05: Command Center (Kanban Board)

**PROMPT START**

Generate a desktop Kanban board (1440px) for tracking job application lifecycle. Apply M3 Expressive with satisfying drag physics and visual status hierarchy.

### Aesthetic DNA
- **Mood:** Mission control for your career. Each card is a "mission."
- **Visual Signature:** Status-colored columns, spring-physics drag, "rejected" graceful fade

### Typography (Expressive Hierarchy)
| Element | Font | Weight | Size | Color | Treatment | Leading |
|:---|:---|:---|:---|:---|:---|:---|
| Column Headers | JetBrains Mono | **700** | 14pt | White 50% | Uppercase, tracking +0.1em | 140% |
| Card Title | Plus Jakarta Sans | **900 Black** | 18pt | White | — | 110% |
| Card Company | Plus Jakarta Sans | **200 Thin** | 14pt | White 60% | — | 120% |
| Deadline Urgent | JetBrains Mono | **700** | 12pt | Terracotta | — | 140% |
| Empty State | Caveat | **500** | 20pt | Wattle | Rotated 2° | 130% |

### Layout Architecture (Horizontal, 5 Columns)
- **Column Shape:** Rounded container (20px radius), no background (transparent)
- **Column Gap:** 24px
- **Column Width:** Equal distribution

1. **Column Header (Each):**
   - Status Label: "APPLIED" (JetBrains Mono 700, uppercase)
   - Count Badge: "(4)" (Gem shape, color matches status)
   - "+ New" Button: Small Pebble, Terracotta
   
   - **Status Colors:**
     - Applied: White 40%
     - Screening: Wattle `#F0C419`
     - Interview: Sage `#B4D8AE`
     - Offer: Wattle (golden glow)
     - Rejected: White 20% (de-emphasized)

2. **Application Cards:**
   - **Shape:** **Tech** (`16px` symmetric)
   - **Background:** `#1E1E1E`
   - **Border:** 1px solid white 8%
   
   - **Content Layout:**
     - Title: "Senior Program Manager" (900 Black, 18pt)
     - Company: "NDIS Quality Authority" (200 Thin, 14pt, white 60%)
     - Deadline: "Due in 3 days" (JetBrains Mono, Terracotta if <7 days)
     - **Inline Badges (Bottom):**
       - Match Score: "87%" (Gem, Sage background)
       - Status: "Screening" (Gem, Wattle background)
   
   - **Drag Handle:** 6-dot grid (⠿), visible only on hover, top-center
   
   - **Hover State:**
     - `translateY(-6px)` + shadow expansion
     - Border: 1px Sage
   
   - **Dragging State:**
     - Opacity: 85%
     - Scale: 1.02
     - Shadow: `0 20px 60px rgba(0,0,0,0.6)`
     - **Drop Zone Highlight:** Column header glows with dashed Sage border

3. **Empty State (Offer Column):**
   - **Wild Growth Typography:**
     - "Nothing" — Plus Jakarta Sans 200, 16pt, White 30%
     - "here yet!" — Caveat 500, 24pt, Wattle Gold, rotated 3°
   - Subtle dashed border box indicating drop target

4. **Rejected Column (De-emphasized):**
   - Cards: 50% opacity, no hover lift
   - Grayscale filter: 50%

### Motion Physics
- **Card Drag:** Spring physics (stiffness 400, damping 30)
- **Drop Animation:** Spring bounce into position (overshoot 5%)
- **Column Highlight:** Fade in over 150ms

### Flora Decoration (See FLORA ASSET LIBRARY for visual specs)
- **Empty State Only:** `native-kangaroo.png` or `native-banksia.png`
  - Position: Centered in empty Offer column
  - Opacity: 20%
  - Scale: 40%
  - Animation: Subtle fade in when column becomes empty
- **Texture:** `texture-pattern.png` at 3% opacity on page floor

### Component IDs
- [UI-COMP-501] Kanban Lifecycle Board
- [UI-COMP-502] Application Card

**PROMPT END**

---

## PROMPT 06: Opportunity Feed (Job Matching)

**PROMPT START**

Generate a desktop list view (1440px) for Opportunity Feed — displaying scraped and emailed job listings with match scores.

### Typography (Expressive Hierarchy)
| Element | Font | Weight | Size | Color | Leading |
|:---|:---|:---|:---|:---|:---|
| Page Header | Plus Jakarta Sans | **900 Black** | **48pt** | White | 110% |
| Job Title | Plus Jakarta Sans | **900 Black** | 24pt | White | 110% |
| Organization | Plus Jakarta Sans | **200 Thin** | 16pt | White 60% | 120% |
| Match Score | Plus Jakarta Sans | **200 Thin** | 48pt | Gradient | 100% |
| Location/Salary | JetBrains Mono | **400** | 14pt | White 50% | 140% |

### Layout Architecture
1. **Page Header:**
   - **Banksia Composition (Hero Header):**
     - "OPPORTUNITY" — `Amstelvar` Black, 48pt, White, left-aligned
       - **Reactive Width:** `wdth` axis 100->125 based on viewport.
     - "Feed" — `Recursive` Cursive, 36pt, Wattle Gold, rotated 4°, tucked under the "Y"
   - Filter Tabs: "All" | "Emailed" | "Scraped"
     - Shape: **Gem** (4px radius) pills
     - Active: Sage background
     - Inactive: Transparent, white 50% text

2. **Job Match Cards (List, 24px gap):**
   - **Shape:** **Tech** (`24px` symmetric)
   - **Layout:** 70% left content / 30% right metrics
   
   - **Left Content:**
     - Title: "Senior Case Manager" (900 Black, 24pt)
     - Org: "Anglicare Australia" (200 Thin, 16pt)
     - Location: "Sydney, NSW • $85-95K" (JetBrains Mono)
     - Requirements: "• NDIS • Salesforce..." (white 50%, truncated)
   
   - **Right Metrics:**
     - **Score Gauge (100px diameter):**
       - Ring: 8px thick, color based on score
         - <50%: Terracotta
         - 50-74%: Wattle
         - >=75%: Sage
       - Center: Score "82%" (Plus Jakarta Sans **200 Thin**, 48pt)
     - Source Badge: "Scraped" (Gem, Sage) or "Emailed" (Gem, Wattle)
     - Deadline: "Closes in 5 days" (Terracotta if urgent)
   
   - **CTA Button (Full Width Bottom):**
     - "Start Application →"
     - Shape: **Pebble**
     - Color: Terracotta
     - Hover: Lift + glow

3. **Hover State:**
   - Card border: 2px Sage
   - `translateY(-4px)`
   - Shadow expands

### Motion Physics
- **Score Animation:** Count up on scroll-in-view
- **Card Stagger:** 80ms delay per card on page load

### Component IDs
- [UI-COMP-201] Job Match Card
- [UI-COMP-203] Status Pill

**PROMPT END**

---

## PROMPT 07: The Studio (WYSIWYG Designer)

**PROMPT START**

Generate a desktop WYSIWYG document designer (1440px) with live preview and brand customization.

### Typography Hierarchy
| Element | Font | Weight | Size | Notes | Leading |
|:---|:---|:---|:---|:---|:---|
| Heading | Plus Jakarta Sans | **900** | 32pt | In preview | 110% |
| Body | Plus Jakarta Sans | **300** | 14pt | Document content | 160% |
| Controls | JetBrains Mono | **400** | 12pt | Sidebar | 140% |

### Layout Architecture (60/40 Split)
1. **Left Pane (Live Preview):**
   - **Canvas:** White A4 paper, centered with `elevation-4` shadow
   - **Parser View Toggle:** Top-right switch
     - OFF: Beautiful resume view
     - ON: Red wireframe view (ATS bot perspective)

2. **Right Pane (Brand Customizer):**
   - **Section 1:** Color picker for accent (default Terracotta)
   - **Section 2:** Typography dropdown (Plus Jakarta, Outfit, Source Serif)
   - **Section 3:** Checkbox "Include flora decoration"

3. **Action Bar (Bottom):**
   - Left: "← Back to Audit" (Ghost, Sage border)
   - Right: "Export PDF/A-3 →" (Pebble, Sage, pulsing glow)

### Motion
- **Preview Updates:** Real-time with 200ms debounce
- **Parser Toggle:** Cross-fade 400ms

### Component IDs
- [UI-COMP-403] Brand Customizer
- [UI-COMP-404] Parser View Toggle

**PROMPT END**

---

## PROMPT 08: Settings (Integration Hub)

**PROMPT START**

Generate a desktop settings page (1440px) for OAuth connections and taxonomy management.

### Typography Hierarchy
- Headers: JetBrains Mono 700, 14pt, uppercase
- Labels: Plus Jakarta Sans 200 Thin, 16pt
- Values: Plus Jakarta Sans 200 Thin, 14pt, white 60%

### Layout (Single Column, 720px max-width)
1. **Section: Integration Hub**
   - **Cards:** Leaf shape (decorative context, not data), each with:
     - Logo (48px)
     - Label: "Google Mail & Calendar"
     - Toggle switch (ON=Sage, OFF=grey)
     - Connected email (white 50%)

2. **Section: Voice Profile**
   - Industry dropdown (Current: "NFP / Community Services")
   - Gauge: "Voice Match: 0.85" (Sage if >0.8)

### Interactive States
- Toggle ON: Slides right with spring, glows Sage
- Card Hover: Border Sage

**PROMPT END**

---

## PROMPT 09: Authentication (Login)

**PROMPT START**

Generate a desktop login page (1440px) with Firebase authentication.

### Typography Hierarchy
- Wordmark: Plus Jakarta Sans 900, 36pt
- Tagline: Plus Jakarta Sans 200 Thin, 14pt, white 50%
- Labels: JetBrains Mono 700, 12pt, uppercase

### Layout (Centered Card, 480px)
- Background: `#121212` with subtle plasma animation
- Card: Leaf shape (decorative login context), `#1E1E1E`

**Form Fields:**
- Email input: Pebble shape, focus=Sage border
- Password input: Same with show/hide toggle
- CTA: "Sign In →" (Terracotta, Pebble, full width)
- Divider: "OR"
- OAuth: Google/Microsoft buttons (white bg)
- Footer: "Register" link (Sage, underlined on hover)

### Motion
- Focus: Border fades in with glow
- Button Loading: Spinner replaces arrow

**PROMPT END**

---

## PROMPT 10: Onboarding (Industry Selection)

**PROMPT START**

Generate a desktop onboarding wizard (1440px) for industry taxonomy setup.

### Typography Hierarchy
- Headline: Plus Jakarta Sans 900, 36pt
- Subtext: Plus Jakarta Sans 200 Thin, 18pt, white 70%
- Card Label: Plus Jakarta Sans 900, 20pt
- Description: Plus Jakarta Sans 200 Thin, 14pt, white 50%

### Layout (Centered Wizard, 640px)
1. **Progress Bar:** 3-step dots (current=Sage filled)

2. **Industry Cards (2×2 Grid):**
   - Shape: Leaf (decorative selection context)
   - Icon: 64px illustrative
   - Options: NFP, Government, Healthcare, Corporate
   - **Selected:** Border 3px Sage, checkmark badge

3. **Actions:**
   - "← Previous" (Ghost)
   - "Continue →" (Terracotta Pebble, disabled=grey)

### Motion
- Card Select: Border animates in with spring, checkmark draws

**PROMPT END**

---

## PROMPT 11: Dashboard (Command Overview)

**PROMPT START**

Generate a desktop dashboard (1440px) showing career metrics and quick actions.

### Typography Hierarchy
| Element | Font | Weight | Size | Color | Leading |
|:---|:---|:---|:---|:---|:---|
| Split Headline (Left) | Plus Jakarta Sans | **900 Black** | **64pt** | White | 110% |
| Split Headline (Right) | Caveat | **500** | 48pt | Wattle `#F0C419` | 130% |
| Metric Value | Plus Jakarta Sans | **200 Thin** | **96pt** | White | 100% |
| Metric Label | JetBrains Mono | **700** | 12pt | White 50% | 140% |

### Layout (Dashboard Grid)
1. **Hero (Full Width, 280px):**
   - **Split Typography (Wild Growth — THE Duet for this screen):**
     - **Layer 1:** "YOUR" — Plus Jakarta Sans 900, 48pt, White, top-left
     - **Layer 2:** "CAREER" — Plus Jakarta Sans 900, 64pt, White, main anchor, with Wattle Gold color on "CAREER" only
     - **Layer 3:** "ecosystem" — Caveat 500, 48pt, Wattle Gold, **rotated 5°**, tucked under "CAREER", overlapping by 16px
   - Background: Tech Dark with flora image (bottom-right, 25% opacity)
   
   - **"One Duet" Rule:** This is the ONLY script element on this dashboard. Secondary headers use color, not script.

2. **Metrics Row (3 Equal Cards):**
   - Shape: **Tech** (24px symmetric)
   
   - **Card 1:** Active Applications
     - Value: "7" (200 Thin, 96pt) — NOTE: Use THIN weight for drama
     - Icon: Folder (Sage, 56px)
     - Label: "ACTIVE APPLICATIONS" (JetBrains Mono 700, white 50%)
     - **Secondary Header:** "YOUR PROGRESS" — Plus Jakarta Sans 900, 16pt, with "PROGRESS" in Wattle Gold (NO script)
   
   - **Card 2:** Match Rate
     - Value: "84%" (200 Thin, 96pt, Sage color)
     - Icon: Target (Wattle, 56px)
   
   - **Card 3:** New Opportunities
     - Value: "12" (200 Thin, 96pt)
     - Icon: Inbox (Terracotta, 56px)

3. **Quick Actions:**
   - "Start New Application →" (Terracotta, Pebble)
   - "Review Opportunities" (Ghost, Sage border)

### Flora Decoration (See FLORA ASSET LIBRARY for visual specs)
- **Primary — The Ceiling:** `native-gum-hanging.png`
  - Position: Top-right corner, hanging into viewport
  - Opacity: 30%
  - Motion: Subtle sway on hover (2px oscillation)
- **Secondary — The Floor:** `native-group.png`
  - Position: Hero section bottom-right, masked at container edge
  - Opacity: 25%
  - Scale: 70%
- **Texture:** `texture-pattern.png` at 3% opacity on page floor

### Motion
- **Metric Animation:** Numbers count up from 0 on page load
- **Card Hover:** Icon pulses (scale 1.15), card lifts 4px

**PROMPT END**

---

## FOLLOW-UP PROMPTS (Anti-Slop Corrections)

Use these prompts when Figma generates "Predictable Slop":

### 🌿 THE "WILD GROWTH" CORRECTION

> Use when typography is too linear and predictable.

```
"The typography is still too linear and predictable. Apply 'Wild Growth' layering:

1. **Overlapping Layers:** Use 'Absolute Positioning' logic. Tuck the Vine Script words behind or on top of the Gum Tree 900 letters, as if they are growing through them.

2. **Scale Disparity:** Make the script keywords significantly larger or smaller than the structural text—avoid matching the x-height.

3. **Rhythmic Breaks:** Break the headline into 3-4 lines with erratic alignment. Left-align the first line, right-align the second, and center the script word so it floats in the 'negative space.'

4. **Wattle Accents:** Don't just color the script. Take a single punctuation mark or 'period' and turn it into a Wattle Gold (#F0C419) Pebble shape sitting behind the text.

Make it feel like a collage or a biology field-journal, not a standard web header. Push the 'Expressive' axis to the max."
```

---

### 🎯 THE "ONE DUET" CORRECTION

> Use when the Duet pattern is overused across multiple elements.

```
"The current layout is suffering from 'Predictable Slop'—the Duet pattern is being used as a generic template rather than an editorial moment. Apply these corrections:

1. **Enforce the 'One Duet' Rule:** Only the primary hero headline should feature the Vine Script duet. Remove the script/cursive treatment from all secondary headers.

2. **Variable Axis Shift:** For secondary section headers, switch to the Authoritative Axis:
   - Set Weight to 900, Width (wdth) to 120
   - Use Plus Jakarta Sans for the entire phrase
   - Apply Wattle Gold (#F0C419) color only to ONE keyword to create a visual 'pop' without using cursive

3. **Spatial Irregularity:** Break the hero headline into three distinct layers:
   - Word 1 (Gum Tree 900, White)
   - Word 2 (Vine Script, Wattle Gold, rotated +5 degrees, overlapping previous word)
   - Word 3 (Gum Tree 900, with subtle Sage glow)

4. **Shape Discipline:** Ensure interactive elements use the Pebble Archetype (20px 20px 32px 32px) rather than standard rounded corners.

Stop treating typography as a text string; treat it as an expressive biology-inspired collage."
```

---

### 📐 THE "DATA AXIS" CORRECTION

> Use when data/metric displays lack precision.

```
"The data displays need the 'Precision Axis' treatment:

1. **Data Typography:** Apply these variable font settings to all metric values:
   - Weight: 500
   - Width: 110
   - Optical Size: 8

2. **Label Treatment:** All labels must use JetBrains Mono:
   - Weight: 700
   - Tracking: +0.05em
   - Case: UPPERCASE
   - Color: White 50%

3. **Number Drama:** Large numbers (scores, counts) should use:
   - Plus Jakarta Sans 200 Thin (NOT 900)
   - Size: 96pt minimum for hero metrics
   - This creates drama through delicacy, not weight

4. **Gauge Rings:** Use gradient fills based on value:
   - <50%: Terracotta #E09F7D
   - 50-74%: Wattle #F0C419
   - >=75%: Sage #B4D8AE"
```

---

## STATE MACHINE ANNOTATIONS (Figma Prototype Logic)

> **These annotations define interactivity that Figma AI needs to automate prototyping.** Include these state definitions in prompts to enable realistic prototype flows.

### 🔒 State: Quality Gate (Content Locked)

**Trigger:** `if application.audit.global_match_score >= 85`

| Property | Locked State (< 85%) | Unlocked State (≥ 85%) |
|:---|:---|:---|
| **Editor Input** | `disabled`, opacity 60% | `enabled`, full opacity |
| **Nav Button** | "Quality Gate Locked", dashed border, grey | "Unlock the Studio →", animated gradient, Sage glow |
| **Status Icon** | `lock_outline` (white 40%) | `check_circle` (Sage) |
| **CTA Interaction** | Non-clickable, cursor: not-allowed | Hover: lift + glow, cursor: pointer |

**Visual Effect:**
```
if (score >= 85) {
  enable(button.nav_to_phase_4);
  update(icon.status, 'check_circle_green');
  trigger(confetti_burst, { colors: ['#B4D8AE', '#F0C419'] });
} else {
  disable(editor.inputs);
  show(panel.critical_gaps);
}
```

---

### 🔍 State: Selection Criteria Hover (Cross-Reference Highlight)

**Trigger:** `onHover(opportunity.ksc[id])`

**Effect:**
- Highlight corresponding text in `application.ksc_responses[id].text`
- Apply Authentic Voice Profile comparison styling
- Show tooltip: "Evidence found in response" (Sage) or "Missing evidence" (Terracotta)

| Hover Target | Highlight Style | Badge |
|:---|:---|:---|
| KSC Question | 2px Sage underline | "Matched" (Gem, Sage) |
| Missing Keyword | Terracotta background pulse | "Gap" (Gem, Terracotta) |
| Soft Skill | Sage border glow | "Verified" (Gem, Sage) |

**Visual Effect:**
```
onHover(opportunity.ksc[id]) {
  highlight(application.ksc_responses[id].text, {
    style: 'underline',
    color: 'var(--brand-primary)', // Sage
    animation: 'pulse'
  });
  show(tooltip, 'Evidence linked from resume');
}
```

---

### 🔄 State: Parser Preview Toggle (Bot's View)

**Trigger:** `onClick(toggle.parser_view)`

**Effect:**
- Remove all CSS styling from `editor.workspace`
- Display `raw_text_layer` only (plain text, no formatting)
- Show "This is what the ATS bot sees" overlay banner

| Toggle State | Style | Font | Background |
|:---|:---|:---|:---|
| **OFF** (Beautiful View) | Full M3 Expressive styling | Plus Jakarta Sans | `#1E1E1E` Tech Dark |
| **ON** (Bot's View) | No styling, red wireframe | `Arial, system-ui` (monospace) | `#FFFFFF` White |

**Visual Effect:**
```
onClick(toggle.parser_view) {
  if (toggle.state === 'OFF') {
    remove(css.all);
    apply(font, 'Arial, sans-serif'); // System standard for ATS
    display(raw_text_layer);
    show(banner, 'Bot's View: Plain Text Only');
    toggle.state = 'ON';
  } else {
    restore(css.all);
    apply(font, 'Plus Jakarta Sans'); 
    toggle.state = 'OFF';
  }
}
```

---

### 💾 State: Auto-Save (Atomic Syncing)

**Trigger:** `onKeyUp(editor.textarea)` (debounced 500ms)

**Effect:**
- Background save on every keystroke
- No blocking UI (non-modal)
- Status indicator in corner

| Save State | Visual | Duration |
|:---|:---|:---|
| **Idle** | Hidden | — |
| **Saving** | "Saving..." (white 50%), spinner | Until API response |
| **Saved** | "✓ Saved" (Sage), checkmark | Fade out after 2s |
| **Error** | "⚠ Save failed" (Terracotta), retry icon | Persist until resolved |

---

### 🔙 State: Global Undo (AI Rewrite Rollback)

**Trigger:** `Cmd+Z` or `Ctrl+Z`

**Effect:**
- Undo ANY agentic AI rewrite
- Maintain full history stack
- Toast: "Reverted to previous version" (Wattle)

**Scope:** All text areas, all AI-generated suggestions, all auto-complete insertions.

---

## DEVELOPER HANDOVER SPECS (Phase 3 → Phase 4)

> **To minimize rework during developer handover, Figma prompts must include these "Data-Ready" annotations.**

### 📤 Serialization (Audit API Request)

**Trigger:** `onClick(button.run_audit)`

**API Contract:**
```typescript
// POST /api/analysis/audit
interface AuditRequest {
  application_id: string;
  ksc_responses: Array<{
    id: string;
    question: string;
    text: string;
    word_count: number;
  }>;
  resume_data: GoldenRecordResume;
  cover_letter_text?: string;
}

interface AuditResponse {
  validation: 'success' | 'failure';
  global_score: number; // 0-100
  metrics: {
    star_density: number;
    keyword_match: number;
    voice_alignment: number;
  };
  gaps: Array<{ keyword: string; severity: 'critical' | 'warning' }>;
}
```

**UI Behavior:**
- Button triggers `POST` with current state of all text areas
- Show loading state (plasma pulse on gauge)
- On `validation: success` → enable Phase 4 navigation
- On `validation: failure` → show gaps panel, lock navigation

---

### ✅ Validation (API Success Before Navigation)

**Hard Requirement:**
```
Frontend MUST prevent navigation to Phase 4 (The Studio) 
until the API returns: { validation: 'success' }
```

**UI Implementation:**
```typescript
const handleNavigateToStudio = async () => {
  if (auditState.validationStatus !== 'success') {
    showToast('Complete the Quality Gate to continue', 'warning');
    return;
  }
  router.push('/documents');
};
```

**Visual Enforcement:**
- "Unlock the Studio" button: `disabled` attribute until `validation: success`
- Route `/documents` protected by auth + score check middleware

---

### 🔤 Consistency (Parser Preview Font Standard)

**Hard Requirement:**
```
The font-family used in Parser Preview MUST be a system-standard font 
to guarantee that what the user sees is what the ATS reads.
```

**Allowed Fonts in Bot's View:**
- `Arial, Helvetica, sans-serif`
- `'Times New Roman', Times, serif`
- `'Courier New', Courier, monospace`

**Forbidden in Bot's View:**
- ❌ Plus Jakarta Sans
- ❌ Caveat
- ❌ JetBrains Mono
- ❌ Any custom/web fonts

**Rationale:** ATS parsers use system fonts for text extraction. Showing custom fonts in "Bot's View" would mislead the user about parsing accuracy.

---

### 📊 Data-UI Mapping Summary

| UI Element | JSON Schema Key | Validation | State Trigger |
|:---|:---|:---|:---|
| Global Score Gauge | `analysis.global_score` | `>= 85` for success | `onAuditComplete` |
| STAR Rating Bar | `analysis.metrics.star_density` | `>= 3.5` target | `onAuditComplete` |
| Missing Skills Badges | `analysis.gaps.missing_keywords` | Click → Auto-Fix | `onGapClick` |
| Soft Skill Evidence | `analysis.competencies[i].evidence` | Snippet from resume | `onHover` |
| Quality Gate Button | `analysis.validation` | `success` to unlock | `onValidationChange` |
| Editor Content | `application.ksc_responses[id].text` | Min 200 words | `onInput` (debounced) |
| Parser Toggle | `ui.parser_view_enabled` | Boolean | `onClick` |

---

## M3 ANTI-SLOP CHECKLIST

Before submitting any prompt, verify:

- [ ] **Typography Weight:** Using 200 or 900, NOT 400-700
- [ ] **Typography Size:** Hero 48pt+, body 14pt (3x+ contrast)
- [ ] **Shape Tokens:** Pebble/Leaf/Gem/Tech, NO `rounded-md/lg/xl`
- [ ] **Background:** Dot-grid texture at 5%, NOT solid or elaborate gradients
- [ ] **Spacing:** Varied rhythm (8/16/32/48), NOT uniform 16px
- [ ] **Elevation:** Cards have shadow depth
- [ ] **Motion:** Spring physics (stiffness 400-600, damping 25-35)
- [ ] **Hover States:** Lift + shadow + color shift (NO static)
- [ ] **Colors:** Sage/Terracotta/Wattle, NO purple/generic blue
- [ ] **Script Accent:** Caveat with rotation, NOT just styled text
- [ ] **One Duet Rule:** Max one Vine Script duet per screen
- [ ] **Wild Growth:** Typography as spatial collage, NOT linear text

---

## HERO MOMENT PROMPTS (Unified v5.0)

> **Source:** DOC-008_hero_moments_unified.md — Merged from Gemini conceptual metaphors + Claude implementation specs.
> 
> **Design Intent:** These prompts provide a **suggested direction** for each page's hero moment. Figma is encouraged to **explore variations** while maintaining the core Noun+Verb duet pattern and Native Earth palette.

---

## HERO PROMPT 01: Landing Page — "The Resurrection"

**PROMPT START**

Generate a hero section for CareerCopilot's landing page. The concept is **"Fire & Waratah"** — transformation through creative destruction.

### The Typography Duet

Create a **layered headline** using the "Banksia Composition" pattern:

**Layer 1 — The Noun (Trunk):**
- Word: `FUTURE`
- Font: Plus Jakarta Sans, **Weight 900 Black**
- Size: **72pt** (explore 64-80pt range)
- Width Axis: `wdth: 120` (slightly expanded)
- Color: White `#E6E0E9`
- Tracking: `-0.02em`

**Layer 2 — The Verb (Vine):**
- Word: `ignite`
- Font: Caveat (cursive)
- Size: **48pt** (explore 40-56pt range)
- Color: Wattle Gold `#F0C419`
- Rotation: **+4.5 degrees**
- Position: **Tucked under the "T" and "U"** of FUTURE, overlapping by ~20px

**Spatial Relationship:**
```
FUTUR̲E̲
   └─ ignite
```

The verb should feel like it's **growing through** the structural text, not appended below.

### Flora Asset

**Primary — The Anchor:**
- Asset: Australian Waratah (iconic red dome-shaped bloom)
- Position: **Top-right** of viewport, hanging into the composition
- Placement: Adjacent to the **shoulder of the typography** (near the "E")
- z-Index: **Flora sits IN FRONT of text** (z-20 over z-10)
- Opacity: 35%
- Cast a **sharp shadow** onto the text layer below

**Explore Variations:**
- Waratah positioned at top-left (flipped horizontally)
- Waratah emerging from behind text
- Multiple smaller Waratah blooms as accent dots

### The Metaphor (Design Intent)

> "The Waratah requires bushfire heat to germinate. This platform takes your 'burnt' application history and ignites a new trajectory."

Communicate **transformation through intensity**, not gentle growth.

### Container Architecture

- Background: Deep Charcoal `#121212`
- Texture: 5% dot-grid overlay (24px spacing)
- No gradients, no blur, no glassmorphism
- CTA Button: Terracotta Pebble (`20px 20px 32px 32px`), height 56px

### Suggested Layouts (Explore These + Your Own)

**Layout A: Asymmetric Right-Heavy**
```
┌─────────────────────────────────────────────────────┐
│  [Logo]                              [Waratah] 🌺   │
│                                      ┌──────────────│
│   FUTURE                             │              │
│   └─ ignite                          │   (flora)    │
│                                      │              │
│   [ GET STARTED → ]                  └──────────────│
└─────────────────────────────────────────────────────┘
```

**Layout B: Centered Duet, Corner Flora**
```
┌─────────────────────────────────────────────────────┐
│                                             🌺      │
│              FUTURE                                 │
│              └─ ignite                              │
│                                                      │
│              [ GET STARTED → ]                      │
└─────────────────────────────────────────────────────┘
```

**Layout C: Split Screen (Text Left, Flora Right)**
```
┌─────────────────────────────────────────────────────┐
│   FUTURE              │                             │
│   └─ ignite           │         🌺 🌺 🌺            │
│                       │       (waratah field)       │
│   [ GET STARTED → ]   │                             │
└─────────────────────────────────────────────────────┘
```

### Motion (For Reference)
- CTA Hover: `scale(1.02)`, `translateY(-6px)`, shadow bloom
- Waratah: Subtle parallax on scroll (5px offset)
- Spring physics: Stiffness 500, Damping 27

**PROMPT END**

---

## HERO PROMPT 02: Ingestion Page — "The Mulch & Mineral Setup"

**PROMPT START**

Generate a hero drop zone for CareerCopilot's file ingestion page. The concept is **"Mulch & Mineral"** — transforming raw waste into fertile data.

### The Typography Duet

**Layer 1 — The Noun:**
- Word: `HISTORY`
- Font: Plus Jakarta Sans, **Weight 900 Black**
- Size: **56pt**
- Width Axis: `wdth: 115`
- Color: White `#E6E0E9`

**Layer 2 — The Verb:**
- Word: `shred`
- Font: Caveat
- Size: **40pt**
- Color: Wattle Gold `#F0C419`
- Rotation: **-3.5 degrees**
- Position: **Slicing diagonally through the "S" and "T"** of HISTORY

**Spatial Relationship:**
```
HIS̸T̸ORY
   └─ shred  ← Cutting through the letters
```

The verb represents the **action of extraction** — it should feel dynamic, even aggressive.

### Flora Asset

**Floor Grounding:**
- Asset: Native Group (Dry Banksia pods, desert brush)
- Position: **Bottom-right corner** of the drop zone
- z-Index: `z-10` (behind the upload icon, in front of background)
- Opacity: 30%

**The Metaphor:**
> "We treat old resumes as organic mulch. The AI shreds the bulk and extracts essential minerals (skills/achievements)."

### Container Architecture

- **Drop Zone Shape:** Sunken Pebble Archetype
- **Border Radius:** Asymmetric `20px 20px 32px 32px`
- **Background:** `#1E1E1E` with 8% dot-grid
- **Border (Idle):** 3px dashed Sage `#B4D8AE`, animated dash-offset
- **Border (Drag-Over):** Solid 4px Sage with glow

### Suggested Layouts (Explore These + Your Own)

**Layout A: Vertical Stack, Flora Bottom**
```
┌────────────────────────────────────────┐
│                                         │
│              HISTORY                    │
│              └─ shred                   │
│                                         │
│         [  DRAG FILES HERE  ]          │
│                                         │
│                               🌿 🍂     │
│                              (banksia)  │
└────────────────────────────────────────┘
```

**Layout B: Split Horizontal**
```
┌────────────────────────────────────────┐
│  HISTORY     │                         │
│  └─ shred    │    [  DROP ZONE  ]      │
│              │                         │
│  🌿 flora    │                         │
└────────────────────────────────────────┘
```

**Layout C: Full-Width Immersive**
```
┌────────────────────────────────────────────────────┐
│                                                     │
│   HISTORY                                     🌿    │
│   └─ shred                                   (pods)│
│                                                     │
│   ┌─────────────────────────────────────────────┐  │
│   │                                              │  │
│   │         [ PDF, DOCX, TXT → ]                │  │
│   │                                              │  │
│   └─────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Data Labels
- Font: JetBrains Mono
- Style: Uppercase, tracking +0.05em
- Examples: "12 SKILLS DETECTED" / "8 YEARS EXPERIENCE"

**PROMPT END**

---

## HERO PROMPT 03: Opportunities Page — "The Sentry Lookout"

**PROMPT START**

Generate a job matching feed header for CareerCopilot. The concept is **"The Sentry Lookout"** — high-canopy observation.

### The Typography Duet

**Layer 1 — The Noun:**
- Word: `HUNTER`
- Font: Plus Jakarta Sans, **Weight 900 Black**
- Size: **48pt**
- Width Axis: `wdth: 125` (extra wide, authoritative)
- Color: White `#E6E0E9`

**Layer 2 — The Verb:**
- Word: `harvest`
- Font: Caveat
- Size: **36pt**
- Color: Wattle Gold `#F0C419`
- Rotation: **+4.0 degrees**
- Position: **Floating above the "H"** like a canopy vine

**Spatial Relationship:**
```
   harvest  ← Floating above like leaves
HUNTER
```

### Flora Asset

**Ceiling Anchor:**
- Asset: Native Gum Hanging (Drooping Eucalyptus leaves)
- Position: **Top-right ceiling** of viewport
- z-Index: `z-20`
- Opacity: 35%
- Motion: Subtle sway on hover

**The Metaphor:**
> "The Sentry operates like a bird in the high canopy, scanning the market floor. You are not 'searching'; you are 'harvesting' what has already been detected."

### Container Architecture

- Job Cards: Symmetric Tech-Cards (`rounded-3xl`)
- Match Badges: Pill shape, Sage background
- Apply CTA: Pebble shape, Terracotta fill

### Suggested Layouts (Explore These + Your Own)

**Layout A: Header with Trailing Foliage**
```
┌─────────────────────────────────────────────────────┐
│   harvest          │                          🍃🍃  │
│  HUNTER            │                          🍃    │
│                    │                          ╲     │
│  [All] [Scraped] [Emailed]                    ╲    │
├─────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────┐  │
│  │  Job Card 1                             92%  │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Layout B: Integrated Canopy**
```
┌─────────────────────────────────────────────────────┐
│   🍃🍃🍃🍃🍃🍃 harvest 🍃🍃🍃🍃🍃                  │
│              HUNTER                                 │
├─────────────────────────────────────────────────────┤
│  Job Cards...                                       │
└─────────────────────────────────────────────────────┘
```

**Layout C: Split View**
```
┌─────────────────────────────────────────────────────┐
│            harvest                          🍃      │
│           HUNTER                           ╲ ╲     │
│  ────────────────────────────────────────────╲────  │
│  Job Card 1          │          Job Card 2         │
└─────────────────────────────────────────────────────┘
```

### Job Card Components
- Title: Plus Jakarta Sans 900, 24pt
- Company: Plus Jakarta Sans 200, 16pt
- Match Score Gauge: Mini ring, 8px thick, color by threshold
- CTA: "Start Application →" Pebble button

**PROMPT END**

---

## HERO PROMPT 04: Analysis Page — "The Audit Microscope"

**PROMPT START**

Generate an analysis dashboard header for CareerCopilot. The concept is **"The Audit Microscope"** — botanical precision.

### The Typography Duet

**Layer 1 — The Noun:**
- Word: `TRUTH`
- Font: Plus Jakarta Sans, **Weight 900 Black**
- Size: **56pt**
- Width Axis: `wdth: 120`
- Color: White `#E6E0E9`

**Layer 2 — The Verb:**
- Word: `verify`
- Font: Caveat
- Size: **40pt**
- Color: Wattle Gold `#F0C419`
- Rotation: **+3.0 degrees**
- Decoration: **Hand-drawn gold underline** (vine stroke)

**Spatial Relationship:**
```
TRUTH
   └─ verify
      ═══════  ← Gold vine underline
```

### Flora Asset

**Header Anchor:**
- Asset: Native Waratah (Full bloom)
- Position: **Top-right of header section**
- z-Index: `z-20`
- Opacity: 35%

**The Metaphor:**
> "The Auditor is the expert botanist. It places your evidence under a microscope to ensure it is structurally sound before allowing it to 'seed' the Studio phase."

### Container Architecture

- Score Gauge: Large ring (400px diameter), gradient fill
- Analysis Cards: Tech-Card (`rounded-3xl`)
- Skill Bars: `rounded-full`, Sage for strengths, Terracotta for gaps

### Suggested Layouts (Explore These + Your Own)

**Layout A: Left Gauge, Right Metrics**
```
┌─────────────────────────────────────────────────────┐
│  TRUTH                                        🌺    │
│  └─ verify                                          │
├─────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────────────────┐  │
│  │                │  │  STAR DENSITY: 3.8       │  │
│  │      87        │  ├──────────────────────────┤  │
│  │    (gauge)     │  │  CRITICAL GAPS           │  │
│  │                │  │  [NDIS] [Budget]         │  │
│  └────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Layout B: Full-Width Score Hero**
```
┌─────────────────────────────────────────────────────┐
│                    TRUTH                     🌺     │
│                    └─ verify                        │
│                                                     │
│                       87                            │
│                  GLOBAL SCORE                       │
│              [ UNLOCK THE STUDIO → ]                │
├─────────────────────────────────────────────────────┤
│  Metrics Grid...                                    │
└─────────────────────────────────────────────────────┘
```

**Layout C: Radar Chart Focus**
```
┌─────────────────────────────────────────────────────┐
│  TRUTH          │              🌺                   │
│  └─ verify      │                                   │
├─────────────────┼───────────────────────────────────┤
│   ╱╲            │   Skill Bars                      │
│  ╱  ╲  RADAR    │   ████████ React                 │
│  ╲  ╱           │   ███░░░░░ Leadership            │
│   ╲╱            │                                   │
└─────────────────────────────────────────────────────┘
```

### Quality Gate
- Unlocked (≥85%): Animated Sage gradient, pulsing glow
- Locked (<85%): Dashed border, 60% opacity, padlock icon

**PROMPT END**

---

## HERO PROMPT 05: Dashboard — "The Command Center Greenhouse"

**PROMPT START**

Generate a dashboard header for CareerCopilot. The concept is **"The Command Center Greenhouse"** — managing your organic ecosystem.

### The Typography Duet

**Layer 1 — The Noun:**
- Word: `CANOPY`
- Font: Plus Jakarta Sans, **Weight 900 Black**
- Size: **48pt**
- Width Axis: `wdth: 118`
- Color: White `#E6E0E9`

**Layer 2 — The Verb:**
- Word: `cultivate`
- Font: Caveat
- Size: **36pt**
- Color: Wattle Gold `#F0C419`
- Rotation: **-5.0 degrees**
- Position: **Weaving through the "C" and "A"**

**Spatial Relationship:**
```
CAN̲O̲PY
 └─ cultivate  ← Vine weaving through letters
```

### Flora Assets (Dual Anchor)

**Ceiling:**
- Asset: Native Gum Hanging
- Position: **Top-left**
- Opacity: 35%

**Floor:**
- Asset: Native Group
- Position: **Bottom-right** of hero section
- Opacity: 25%, masked at edge

**The Metaphor:**
> "Your career is no longer a folder of static files; it is a managed greenhouse. Cultivate multiple application seedlings within a controlled, high-tech environment."

### Container Architecture

- Stat Cards: Symmetric Tech-Cards with 5% dot-grid
- Kanban: Floating cards on Deep Charcoal floor
- Active States: Sage inner-glow (NO glassmorphism)

### Suggested Layouts (Explore These + Your Own)

**Layout A: Stats Row + Flora Frame**
```
┌─────────────────────────────────────────────────────┐
│ 🍃                 CANOPY                           │
│  ╲                 └─ cultivate                     │
├─────────────────────────────────────────────────────┤
│  ┌────────┐  ┌────────┐  ┌────────┐                │
│  │ ACTIVE │  │ PROFILE│  │ MATCH  │           🌿🌿 │
│  │   3    │  │  87%   │  │   92   │          (floor)│
│  └────────┘  └────────┘  └────────┘                │
└─────────────────────────────────────────────────────┘
```

**Layout B: Hero Card with Embedded Flora**
```
┌─────────────────────────────────────────────────────┐
│  🍃 CANOPY cultivate                                │
│  ┌──────────────────────────────────────────────┐  │
│  │                                          🌿  │  │
│  │   Welcome back, Sarah.                   🌿  │  │
│  │   3 applications in progress.           🌿🌿 │  │
│  │                                               │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

**Layout C: Full Dashboard Overview**
```
┌─────────────────────────────────────────────────────┐
│ 🍃 CANOPY                                           │
│    └─ cultivate                                     │
├────────────────┬────────────────────────────────────┤
│  Stat Cards    │        Kanban Preview              │
│  ┌────┐┌────┐  │   Applied → Screening → Offer     │
│  │  3 ││ 87%│  │   ┌───┐    ┌───┐        ┌───┐    │
│  └────┘└────┘  │   └───┘    └───┘    🌿🌿└───┘    │
└────────────────┴────────────────────────────────────┘
```

### Motion (For Reference)
- Stat Cards: Staggered entry (`delay: index * 100ms`)
- Hover: `scale(1.02)`, `brightness(1.1)`, `translateY(-4px)`
- Number Counter: Animate 0 → value in 600ms

**PROMPT END**

---

## FIGMA EXPLORATION GUIDELINES

These prompts provide **direction, not prescription**. Figma is encouraged to:

### DO Explore
- ✅ Alternative Noun+Verb word pairs (e.g., "BLOOM / flourish" instead of "FUTURE / ignite")
- ✅ Different rotation angles for Vine text (within 3-7° range)
- ✅ Flora asset placements beyond the suggested anchors
- ✅ Scale variations of the duet (larger nouns, smaller verbs or vice versa)
- ✅ Multi-line breakup of the Noun
- ✅ Alternative Australian native flora (Banksia, Bottlebrush, Kangaroo Paw)

### DO NOT Deviate From
- ❌ The Native Earth color palette (Sage/Terracotta/Wattle only)
- ❌ The 900 Black weight for structural nouns
- ❌ Solid dark containers (no glassmorphism)
- ❌ The z-index layering (flora in front of or intersecting with text)
- ❌ Touch target minimums (48px+ for interactive elements)
- ❌ The Anti-Slop checklist

### Creative License Zones

| Element | Fixed | Explorable |
|:--------|:------|:-----------|
| Color Tokens | ✅ Sage, Terracotta, Wattle only | Gradients within palette |
| Typography | ✅ Plus Jakarta Sans + Caveat | Word choices, line breaks |
| Flora Assets | ✅ Australian native only | Species, placement, quantity |
| Shapes | ✅ Pebble/Tech-Card/Pill tokens | Size, nesting, grouping |
| Motion | ✅ Spring physics | Timing, sequence |

---

**End of M3 Expressive Figma Prompt Collection (Wild Growth Edition + Hero Moments v5.0)**
