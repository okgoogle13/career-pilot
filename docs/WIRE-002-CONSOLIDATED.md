# CONSOLIDATED WIREFRAME & ASSET MAP

## Document Control

| Field | Value |
|-------|-------|
| **Document ID** | WIRE-002-CONSOLIDATED |
| **Version** | 3.0 |
| **Status** | Implementation Ready |
| **Last Updated** | January 14, 2026 |
| **Token Reference** | DOC-004 / Tokens V7 |
| **Asset Library Reference** | ASSET-001-CURIO |

---

## System Constants

### Modal Biomes

**Mode A: The Nocturnal Canopy (Gallery)**
- **Stage:** `color.semantic.surface.gallery.charcoalBark` (#141210)
- **Atmosphere:** Glassmorphic surfaces, bioluminescent accents, botanical anchors
- **Primary Accent:** `color.semantic.primary.wattleGold` (#D4A84B)
- **Typography Mood:** Aspirational, inviting (Fraunces with WONK=1, Libre Bodoni Italic for proclamations)
- **Permitted Motifs:** Flowers, leaves, birds, fireflies, brass instruments
- **Background Pattern:** `pattern-nocturnal-canopy` at 18-25% opacity

**Mode B: The Field Journal (Laboratory)**
- **Stage:** `color.semantic.surface.laboratory.fieldPaper` (#F5F2EB)
- **Atmosphere:** Solid cardstock surfaces, etched overlays, measurement grids
- **Primary Accent:** `color.semantic.primary.wattleGold` (#D4A84B) with `clinicalSlate` (#2C2723) support
- **Typography Mood:** Precise, documentary (JetBrains Mono for data, Work Sans for annotation)
- **Permitted Motifs:** Skeletons, grids, compasses, stamps, measurement tools
- **Prohibited Motifs:** Flowers, decorative fauna, organic flourishes
- **Background Texture:** `texture-laboratory-parchment` with optional `texture-laboratory-grid-major` overlay

### Shape Tokens (Border Radius)

| Token | Value | Application |
|-------|-------|-------------|
| `shape.organicAsymmetry.pebble` | 20px 6px 16px 28px | Buttons, primary actions |
| `shape.organicAsymmetry.stone` | 16px 4px 12px 24px | Cards, containers |
| `shape.organicAsymmetry.leaf` | 24px 8px 20px 4px | Hero elements, feature cards |
| `shape.organicAsymmetry.seed` | 8px 4px 10px 6px | Badges, tags, small elements |

### Typography Scale

| Role | Font Family | Weight | Size | Use Case |
|------|-------------|--------|------|----------|
| Display Hero | Libre Bodoni Italic | 700 | 72-96px | Landing headlines only |
| Display Large | Fraunces | 700, WONK=1, SOFT=50 | 48px | Page titles (Gallery) |
| Display Large | Fraunces | 500, WONK=0, SOFT=15 | 42px | Page titles (Laboratory) |
| Metric Display | Work Sans | 100 | 120-200px | Large numerical callouts |
| Body | Work Sans | 400 | 14-16px | Paragraph text |
| Data | JetBrains Mono | 400 | 12px | Parsed content, skill tags |
| Annotation | JetBrains Mono | 500 | 10px, uppercase, 0.1em tracking | Labels, specimen markers |

---

## Page Specifications

### PAGE 1: Landing ("The Resurrection")

**Classification:** Mode A (Gallery) | Entry Point | Emotional Register: Wonder

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Z-2: motif-gallery-wattle-hanging (top-right)               │
│                                                             │
│  Z-3: firefly-sprite (scattered, 12-16 instances)          │
│                                                             │
│         ┌─────────────────────────────────┐                │
│         │    "FUTURE SPECIMEN"            │  Z-1           │
│         │    Glassmorphic/Leaf Container  │                │
│         └─────────────────────────────────┘                │
│                                                             │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│    │ Fig. A   │  │ Fig. B   │  │ Fig. C   │  Z-1          │
│    │ Stone    │  │ Stone    │  │ Stone    │               │
│    └──────────┘  └──────────┘  └──────────┘               │
│                                                             │
│                  ┌─────────────────┐                       │
│                  │ Nav Dock/Pebble │  Z-2                  │
│                  └─────────────────┘                       │
│                                                             │
│ Z-2: motif-gallery-banksia-pot (bottom-left)               │
│                                                             │
│ Z-0: pattern-nocturnal-canopy (25% opacity)                │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Background** | `pattern-nocturnal-canopy` | `texture.gallery.background` + asset overlay |
| **Opacity** | 25% | Custom (not tokenized) |
| **Gradient Overlay** | Bottom-up, `specimenNight` to transparent | `color.semantic.surface.shared.specimenNight` |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Headline** | "FUTURE SPECIMEN" | `typography.scale.displayHero` (Libre Bodoni Italic, 96px, Gold) |
| **Subhead** | "Your career, catalogued with care" | `typography.scale.headlineMedium` |
| **Feature Cards** | "Fig. A: Discovery", "Fig. B: Analysis", "Fig. C: Application" | `typography.scale.monoAnnotation` for labels, `typography.scale.bodyMedium` for descriptions |

#### Design Annotations

| Element | Shape | Surface | Border |
|---------|-------|---------|--------|
| **Hero Container** | `shape.organicAsymmetry.leaf` | `color.glassmorphism.gallery.surface` | `color.glassmorphism.gallery.border` |
| **Feature Cards** | `shape.organicAsymmetry.stone` | `color.glassmorphism.gallery.surface` | `color.glassmorphism.gallery.border` |
| **Nav Buttons** | `shape.organicAsymmetry.pebble` | `color.semantic.primary.wattleGold` | None |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Feature Cards** | Hover | translateY(-4px), shadow deepen | `motion.interactions.cardHover` |
| **Nav Buttons** | Hover | translateY(-2px), glow increase | `motion.interactions.buttonHover` |
| **Wattle Hanging** | Scroll | translateY at 0.1x scroll speed | Custom parallax |
| **Fireflies** | Ambient | Float + opacity pulse, 8s loop | Custom CSS animation |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `motif-gallery-wattle-hanging` | `top: -20px; right: 0` | 320px width, natural height | Z-2 | Parallax (0.1x) |
| `motif-gallery-banksia-pot` | `bottom: -60px; left: -40px` | 280px width | Z-2 | Static |
| `motif-gallery-firefly-sprite` | Scattered, viewport-relative | 8-16px diameter | Z-3 | Animated (8s, staggered) |
| `pattern-nocturnal-canopy` | Full viewport cover | 100% | Z-0 | Static, 25% opacity |

---

### PAGE 2: Authentication ("The Entry Gate")

**Classification:** Mode A (Gallery) | Security Gateway | Emotional Register: Trust

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Z-3: firefly-sprite (sparse, 6-8 instances, card-adjacent) │
│                                                             │
│              ┌─────────────────────────┐                   │
│              │                         │                   │
│              │    Authentication       │  Z-2              │
│              │    Stone Container      │                   │
│              │    480px width          │                   │
│              │                         │                   │
│              └─────────────────────────┘                   │
│                                                             │
│              ┌─────────────────────────┐                   │
│              │  motif-laboratory-      │  Z-1              │
│              │  compass (60% opacity)  │                   │
│              └─────────────────────────┘                   │
│                                                             │
│ Z-0: pattern-nocturnal-canopy (15% opacity, darker)        │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Background** | `pattern-nocturnal-canopy` at 15% opacity | Darker than landing for focus |
| **Auth Card Width** | 480px fixed | Custom specification |
| **Backdrop Blur** | 32px | `color.glassmorphism.gallery.blur` + 12px |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Card Title** | "Enter the Collection" | `typography.scale.displaySmall.gallery` |
| **Input Labels** | "Email", "Password" | `typography.scale.labelMedium` |
| **Primary Action** | "Sign In" | `typography.scale.labelLarge` |
| **Secondary Action** | "Create Account" | `typography.scale.bodyMedium` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Auth Card** | `shape.organicAsymmetry.stone` | `color.glassmorphism.gallery.surface` | Enhanced blur (32px) |
| **Input Fields** | None (underline style) | Transparent | Bottom border `wattleGold` on focus |
| **Sign In Button** | `shape.organicAsymmetry.pebble` | `color.semantic.primary.wattleGold` | Solid fill |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Input Focus** | Focus | Border color fade to `wattleGold` | `motion.duration.micro` |
| **Compass** | Input focus | Subtle rotation (±5°) | `motion.easing.settle` |
| **Sign In Button** | Hover | Glow intensify | `elevation.shadow.glowGold` |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `motif-gallery-firefly-sprite` | Card-adjacent, sparse | 8-12px | Z-3 | Slower animation (12s) |
| `motif-laboratory-compass` | Centered, 40px below card | 180px diameter | Z-1 | Rotation on focus |
| `pattern-nocturnal-canopy` | Full viewport | 100% | Z-0 | Static, 15% opacity |

---

### PAGE 3: Onboarding ("Choosing the Soil")

**Classification:** Mode A (Gallery) | Selection Flow | Emotional Register: Possibility

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Z-2: motif-gallery-botanical-waratah (top-left, cropped)   │
│                                                             │
│         ┌────────┐  ┌────────┐  ┌────────┐                │
│         │ Sector │  │ Sector │  │ Sector │                │
│         │ Leaf   │  │ Leaf   │  │ Leaf   │  Z-1          │
│         └────────┘  └────────┘  └────────┘                │
│         ┌────────┐  ┌────────┐  ┌────────┐                │
│         │ Sector │  │ Sector │  │ Sector │                │
│         │ Leaf   │  │ Leaf   │  │ Leaf   │  Z-1          │
│         └────────┘  └────────┘  └────────┘                │
│         ┌────────┐  ┌────────┐  ┌────────┐                │
│         │ Sector │  │ Sector │  │ Sector │                │
│         │ Leaf   │  │ Leaf   │  │ Leaf   │  Z-1          │
│         └────────┘  └────────┘  └────────┘                │
│                                                             │
│            Z-1: motif-gallery-botanical-banksia            │
│                    (right edge, 40% opacity)                │
│                                                             │
│ Z-2: motif-gallery-botanical-wattle (bottom-right, cropped)│
│                                                             │
│ Z-0: pattern-nocturnal-canopy (20% opacity)                │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Grid Layout** | 3×3, 24px gap | `spacing.grid.gap` |
| **Card Selection** | Multi-select allowed | Toggle state |
| **Selection Indicator** | 3px solid `wattleGold` border + glow | `color.semantic.primary.wattleGold` |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Page Title** | "Choose Your Habitat" | `typography.scale.displaySmall.gallery` |
| **Card Labels** | Industry names ("Technology", "Healthcare", etc.) | `typography.scale.titleLarge` |
| **Card Icons** | Botanical icons per sector | Custom icon set |

#### Design Annotations

| Element | Shape | Surface | States |
|---------|-------|---------|--------|
| **Sector Cards** | `shape.organicAsymmetry.leaf` | `color.glassmorphism.gallery.surface` | Default, Hover, Selected |
| **Selected State** | — | — | Border: 3px `wattleGold`, Shadow: `elevation.shadow.glowGold` |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Card Selection** | Click | Border fade in, glow bloom | `motion.duration.short` |
| **Card Hover** | Hover | translateY(-4px) | `motion.interactions.cardHover` |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `motif-gallery-botanical-waratah` | `top: -80px; left: -60px` | 240px | Z-2 | Static, cropped |
| `motif-gallery-botanical-wattle` | `bottom: -60px; right: -40px` | 200px | Z-2 | Static, cropped |
| `motif-gallery-botanical-banksia` | `right: -100px; top: 50%` | 180px | Z-1 | 40% opacity |
| `pattern-nocturnal-canopy` | Full viewport | 100% | Z-0 | Static, 20% opacity |

---

### PAGE 4: Ingestion ("The Mulch & Mineral Setup")

**Classification:** Mode B (Laboratory) | Document Upload | Emotional Register: Precision

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Z-2: motif-laboratory-compass            │
│                         (top-right, 30% opacity)            │
│                                                             │
│              ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐                 │
│              │                           │                 │
│              │    DROP ZONE              │  Z-2            │
│              │    "DEPOSIT SPECIMEN"     │                 │
│              │    900px width            │                 │
│              │    Sunken Stone           │                 │
│              │                           │                 │
│              └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘                 │
│                                                             │
│              Z-3: motif-laboratory-stamp-verified           │
│                   (appears on success, bottom-right)        │
│                                                             │
│ Z-1: motif-laboratory-skeleton-etch (centered, 6% opacity) │
│                                                             │
│ Z-0: texture-laboratory-parchment (#F5F2EB)                │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Background** | `texture-laboratory-parchment` | `color.semantic.surface.laboratory.fieldPaper` |
| **Drop Zone Width** | 900px fixed | Custom specification |
| **Accepted Files** | PDF only | Validation rule |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Page Title** | "DEPOSIT SPECIMEN" | `typography.scale.displaySmall.laboratory` |
| **Title Treatment** | "HISTORY" with strikethrough effect | Custom CSS |
| **Drop Zone Label** | "DEPOSIT SPECIMEN (PDF)" | `typography.scale.monoData` |
| **Helper Text** | "Drag your career history here for examination" | `typography.scale.bodyMedium` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Drop Zone** | `shape.organicAsymmetry.stone` | `color.semantic.surface.laboratory.slateSmoke` | Inner shadow, dashed border |
| **Border Style** | Dashed, 2px | `color.etching.lineStrong` | — |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Drop Zone Dragover** | File drag | Border solid, glow | `motion.duration.micro` |
| **Upload Success** | File accepted | Stamp animation | Custom keyframes |
| **Stamp Animation** | On success | Scale 150%→100%, rotate 15°→0°, bounce | `motion.easing.viscous` |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `texture-laboratory-parchment` | Full viewport | 100% | Z-0 | Static |
| `motif-laboratory-skeleton-etch` | Centered behind drop zone | 60% viewport width | Z-1 | Static, 6% opacity |
| `motif-laboratory-compass` | `top: 40px; right: 40px` | 120px | Z-2 | Static, 30% opacity |
| `motif-laboratory-stamp-verified` | Drop zone bottom-right | 140px | Z-3 | Animated on success |

---

### PAGE 5: Analysis Dashboard ("The Audit Microscope")

**Classification:** Mode B (Laboratory) | Data Visualization | Emotional Register: Revelation

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Z-1: texture-laboratory-grid-major (full viewport, 8%)     │
│                                                             │
│  ┌──────────────┐  ┌────────────────────────────────────┐  │
│  │              │  │  ┌──────────┐  ┌──────────┐       │  │
│  │   COMPASS    │  │  │ FIG. A   │  │ FIG. B   │       │  │
│  │   GAUGE      │  │  │ Stone    │  │ Stone    │       │  │
│  │              │  │  └──────────┘  └──────────┘       │  │
│  │   Match      │  │  ┌──────────┐  ┌──────────┐       │  │
│  │   Score      │  │  │ FIG. C   │  │ FIG. D   │       │  │
│  │              │  │  │ Stone    │  │ Stone    │       │  │
│  │   Z-2        │  │  └──────────┘  └──────────┘       │  │
│  │              │  │                          Z-1      │  │
│  └──────────────┘  └────────────────────────────────────┘  │
│       40%                        60%                       │
│                                                             │
│ Z-0: texture-laboratory-parchment                          │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Layout** | Split view, 40% / 60% | CSS Grid |
| **Compass Function** | Data visualization (0-100 score) | Dynamic needle rotation |
| **Grid Overlay** | Major grid, 8% opacity | `texture.laboratory.gridOverlay.major` |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Score Label** | "MATCH SCORE" | `typography.scale.monoAnnotation` |
| **Score Value** | "87" (dynamic) | `typography.scale.metricDisplay` (200 weight) |
| **Card Labels** | "FIG. A: SKILLS", "FIG. B: EXPERIENCE", etc. | `typography.scale.monoAnnotation` |
| **Card Data** | Parsed metrics | `typography.scale.monoData` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Metric Cards** | `shape.organicAsymmetry.stone` | `color.semantic.surface.laboratory.slateSmoke` | Solid, no glassmorphism |
| **Compass Housing** | Circular | `color.semantic.surface.laboratory.slateSmokeHigh` | Brass trim accent |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Compass Needle** | Score update | Rotation to target angle | `motion.easing.settle`, 800ms |
| **Metric Cards** | Hover | Subtle lift | `motion.interactions.cardHover` (reduced) |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `texture-laboratory-parchment` | Full viewport | 100% | Z-0 | Static |
| `texture-laboratory-grid-major` | Full viewport overlay | 100% | Z-1 | Static, 8% opacity |
| `motif-laboratory-compass` | Left column, centered | 280px diameter | Z-2 | Needle animated |
| `motif-laboratory-skeleton-etch` | Empty card backgrounds | Fragmentary | Z-1 | 4% opacity |

---

### PAGE 6: Opportunity Feed ("The Sentry Lookout")

**Classification:** Mode A (Gallery) | Content Browse | Emotional Register: Discovery

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│           Z-2: motif-gallery-wattle-hanging (top-right)    │
│                                                             │
│  ┌────────────┐  ┌───────────────────────────────────────┐ │
│  │ Z-3:       │  │                                       │ │
│  │ KOOKABURRA │  │  ┌─────────────────────────────────┐ │ │
│  │ SENTRY     │  │  │ Job Card / Stone               │ │ │
│  │            │  │  │ "98% Match" Seed badge         │ │ │
│  │            │  │  └─────────────────────────────────┘ │ │
│  ├────────────┤  │  ┌─────────────────────────────────┐ │ │
│  │            │  │  │ Job Card / Stone               │ │ │
│  │ FILTERS    │  │  └─────────────────────────────────┘ │ │
│  │ Pebble     │  │  ┌─────────────────────────────────┐ │ │
│  │ Toggles    │  │  │ Job Card / Stone               │ │ │
│  │            │  │  └─────────────────────────────────┘ │ │
│  │ Z-1        │  │                              Z-1     │ │
│  │            │  └───────────────────────────────────────┘ │
│  └────────────┘  └───────────────────────────────────────┘ │
│      280px                    Remaining                    │
│                                                             │
│ Z-3: firefly-sprite (sidebar area, sparse)                 │
│                                                             │
│ Z-0: pattern-nocturnal-canopy (22% opacity)                │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Layout** | Split view, 280px sidebar + fluid | CSS Grid |
| **Sidebar** | Fixed position on scroll | `position: sticky` |
| **Feed** | Infinite scroll, virtualized | Performance optimization |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Page Title** | "The Lookout" | `typography.scale.displaySmall.gallery` |
| **Job Titles** | Dynamic from API | `typography.scale.titleLarge` |
| **Company Names** | Dynamic | `typography.scale.bodyMedium` |
| **Match Badges** | "98% Match" etc. | `typography.scale.monoAnnotation` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Job Cards** | `shape.organicAsymmetry.stone` | `color.glassmorphism.gallery.surface` | Reveals background through glass |
| **Filter Toggles** | `shape.organicAsymmetry.pebble` | Ghost (transparent bg) | Border on active |
| **Match Badges** | `shape.organicAsymmetry.seed` | `color.semantic.primary.wattleGoldContainer` | — |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Job Cards** | Hover | translateY(-4px), shadow | `motion.interactions.cardHover` |
| **Kookaburra** | Ambient | Head tilt every 8-12s | Custom (randomized interval) |
| **Filter Toggle** | Click | Background fade | `motion.duration.micro` |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `pattern-nocturnal-canopy` | Full viewport | 100% | Z-0 | Static, 22% opacity |
| `motif-gallery-sentry-kookaburra` | Top of sidebar, perched | 160px height | Z-3 | Idle animation |
| `motif-gallery-wattle-hanging` | `top: -20px; right: 0` | 280px width | Z-2 | Static |
| `motif-gallery-firefly-sprite` | Sidebar area | 8-12px | Z-3 | Animated |

---

### PAGE 7: Kanban Board ("The Command Center Greenhouse")

**Classification:** Mode A (Gallery) | Task Management | Emotional Register: Growth

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Z-2: motif-gallery-eucalyptus-hanging (column tops)        │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐│
│  │ 12      │ │ 4       │ │ 2       │ │ 1       │ │ 3     ││
│  │ ACTIVE  │ │ REVIEW  │ │ INTER-  │ │ OFFER   │ │ CLOSED││
│  │         │ │         │ │ VIEW    │ │         │ │       ││
│  │ ┌─────┐ │ │ ┌─────┐ │ │ ┌─────┐ │ │ ┌─────┐ │ │       ││
│  │ │Leaf │ │ │ │Leaf │ │ │ │Leaf │ │ │ │Leaf │ │ │       ││
│  │ │Card │ │ │ │Card │ │ │ │Card │ │ │ │Card │ │ │       ││
│  │ └─────┘ │ │ └─────┘ │ │ └─────┘ │ │ └─────┘ │ │       ││
│  │ ┌─────┐ │ │ ┌─────┐ │ │         │ │         │ │       ││
│  │ │Leaf │ │ │ │Leaf │ │ │         │ │  Z-3:   │ │       ││
│  │ │Card │ │ │ │Card │ │ │         │ │  Dense  │ │       ││
│  │ └─────┘ │ │ └─────┘ │ │         │ │ Firefly │ │       ││
│  │  Z-1    │ │  Z-1    │ │  Z-1    │ │  Z-1    │ │  Z-1  ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └───────┘│
│                                                             │
│ Z-2: motif-gallery-banksia-pot (bottom-left)               │
│                                                             │
│ Z-0: pattern-nocturnal-canopy (18% opacity)                │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Layout** | Horizontal columns, drag-and-drop | React DnD or similar |
| **Column Overflow** | Vertical scroll within column | Custom scrollbar styling |
| **Card Dragging** | Drag between columns | Ghost preview during drag |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Column Metrics** | "12", "4", etc. | `typography.scale.metricDisplay` (200 weight, 120px) |
| **Column Labels** | "ACTIVE", "REVIEW", etc. | `typography.scale.monoAnnotation` |
| **Card Titles** | Job/Company | `typography.scale.titleLarge` |
| **Card Meta** | Date, status | `typography.scale.bodyMedium` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Columns** | `shape.organicAsymmetry.stone` | `color.glassmorphism.gallery.surface` | Trellis metaphor |
| **Task Cards** | `shape.organicAsymmetry.leaf` | `color.glassmorphism.gallery.surfaceElevated` | "Hanging" on trellis |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Card Drag** | Drag start | Scale 1.02, shadow increase | `motion.easing.viscous` |
| **Column Drop** | Card drop | Settle animation | `motion.easing.settle` |
| **Eucalyptus** | Ambient | Subtle sway, 6s loop | Custom CSS |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `pattern-nocturnal-canopy` | Full viewport | 100% | Z-0 | Static, 18% opacity |
| `motif-gallery-eucalyptus-hanging` | Top of each column | 80px height | Z-2 | Sway animation |
| `motif-gallery-banksia-pot` | `bottom: -40px; left: -30px` | 200px | Z-2 | Static |
| `motif-gallery-firefly-sprite` | Concentrated near "Offer" column | 8-16px | Z-3 | Increased density |

---

### PAGE 8: Split-Screen Editor ("The Writing Workbench")

**Classification:** Mode B (Laboratory) | Content Creation | Emotional Register: Craft

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌───────────────────────┐  ┌───────────────────────────┐  │
│  │                       │  │ "SPECIMEN DRAWER"         │  │
│  │   EDITOR PANEL        │  │                           │  │
│  │                       │  │  ┌─────────┐  ┌─────────┐ │  │
│  │   Z-1: grid-minor     │  │  │ Stone   │  │ Stone   │ │  │
│  │   (ruled paper)       │  │  │ Evidence│  │ Evidence│ │  │
│  │                       │  │  └─────────┘  └─────────┘ │  │
│  │   Wattle Gold border  │  │  ┌─────────┐  ┌─────────┐ │  │
│  │   on focus            │  │  │ Stone   │  │ Stone   │ │  │
│  │                       │  │  │ Evidence│  │ Evidence│ │  │
│  │                       │  │  └─────────┘  └─────────┘ │  │
│  │   Z-2                 │  │                    Z-1    │  │
│  │                       │  │  Z-2: compass (bottom-   │  │
│  │                       │  │       right, 25%)         │  │
│  └───────────────────────┘  └───────────────────────────┘  │
│          50%                          50%                  │
│                                                             │
│ Z-0: texture-laboratory-parchment                          │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Layout** | 50/50 vertical split | CSS Grid |
| **Editor** | Rich text, autosave | Custom implementation |
| **Evidence Panel** | Draggable cards | Drag-to-editor functionality |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Panel Title (Left)** | "COMPOSITION" | `typography.scale.monoAnnotation` |
| **Panel Title (Right)** | "SPECIMEN DRAWER" | `typography.scale.monoAnnotation` |
| **Editor Text** | User input | `typography.scale.bodyLarge` |
| **Evidence Labels** | Source descriptions | `typography.scale.monoData` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Editor Panel** | None (full bleed) | `color.semantic.surface.laboratory.fieldPaper` (#EBE8E1) | Focus: `wattleGold` border |
| **Evidence Cards** | `shape.organicAsymmetry.stone` | `color.semantic.surface.laboratory.slateSmoke` | Draggable |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Editor Focus** | Click | Border fade in `wattleGold` | `motion.duration.micro` |
| **Evidence Drag** | Drag start | Scale 1.02, shadow | `motion.easing.viscous` |
| **Evidence Drop** | Drop in editor | Dissolve into text | `motion.duration.short` |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `texture-laboratory-parchment` | Full viewport | 100% | Z-0 | Static |
| `texture-laboratory-grid-minor` | Editor panel only | 100% panel | Z-1 | 5% opacity |
| `motif-laboratory-compass` | Evidence panel, bottom-right | 100px | Z-2 | Static, 25% opacity |
| `motif-laboratory-skeleton-etch` | Evidence panel header | Fragmentary | Z-1 | 8% opacity |

---

### PAGE 9: Studio Designer ("The Specimen Finalization")

**Classification:** Mode B (Laboratory) | Document Preview | Emotional Register: Refinement

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────────────┐  ┌───────────────────────┐│
│  │                             │  │ Z-2: compass (header) ││
│  │   PREVIEW PANEL             │  │                       ││
│  │                             │  │ CONTROLS              ││
│  │   Z-1: grid-major (10%)     │  │                       ││
│  │                             │  │  ┌─────────────────┐  ││
│  │   [ ] Bot View Toggle       │  │  │ Style Options   │  ││
│  │   (When ON: grid turns      │  │  │                 │  ││
│  │   red #B85450, 15%)         │  │  └─────────────────┘  ││
│  │                             │  │                       ││
│  │                             │  │  ┌─────────────────┐  ││
│  │   Z-2                       │  │  │ Export Options  │  ││
│  │                             │  │  │                 │  ││
│  │                             │  │  └─────────────────┘  ││
│  │                             │  │                       ││
│  │                             │  │  [ FINALIZE ]         ││
│  │                             │  │  Z-3: stamp on click  ││
│  └─────────────────────────────┘  └───────────────────────┘│
│            65%                           35%               │
│                                                             │
│ Z-0: texture-laboratory-parchment (increased grain)        │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Layout** | 65/35 split | CSS Grid |
| **Bot View Toggle** | Shows structural wireframe | Grid overlay color shift |
| **Finalize Action** | Exports document, triggers stamp | API call + animation |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Panel Title** | "SPECIMEN PREVIEW" | `typography.scale.monoAnnotation` |
| **Toggle Label** | "BOT VIEW" | `typography.scale.labelMedium` |
| **Control Labels** | "TEMPLATE", "FORMAT", etc. | `typography.scale.labelMedium` |
| **Finalize Button** | "FINALIZE SPECIMEN" | `typography.scale.labelLarge` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Preview Panel** | `shape.organicAsymmetry.stone` | `color.semantic.surface.laboratory.slateSmoke` | Document within |
| **Control Cards** | `shape.organicAsymmetry.stone` | `color.semantic.surface.laboratory.slateSmokeHigh` | Grouped controls |
| **Finalize Button** | `shape.organicAsymmetry.pebble` | `color.semantic.primary.wattleGold` | Primary action |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Bot View Toggle** | Click | Grid color transition to red | `motion.duration.short` |
| **Finalize Click** | Click | Stamp animation | Same as Page 4 |
| **Stamp Animation** | On finalize | Scale 150%→100%, rotate, bounce | `motion.easing.viscous` |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `texture-laboratory-parchment` | Full viewport | 100% | Z-0 | Increased grain |
| `texture-laboratory-grid-major` | Preview panel | 100% panel | Z-1 | 10% opacity (15% red when Bot View) |
| `motif-laboratory-compass` | Control panel header | 80px | Z-2 | Static, 40% opacity |
| `motif-laboratory-stamp-verified` | Preview panel, on finalize | 160px | Z-3 | Animated on action |

---

### PAGE 10: Settings ("The Archive Vault")

**Classification:** Mode B (Laboratory) | Configuration | Emotional Register: Storage

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Z-2: compass (header nav)                   │
│                                                             │
│              ┌─────────────────────────────┐               │
│              │   ACCOUNT SETTINGS          │               │
│              │   Stone Card                │               │
│              │   Z-1: grid-minor (6%)      │               │
│              └─────────────────────────────┘               │
│              ┌─────────────────────────────┐               │
│              │   PREFERENCES               │               │
│              │   Stone Card                │               │
│              └─────────────────────────────┘               │
│              ┌─────────────────────────────┐               │
│              │   INTEGRATIONS              │               │
│              │   Stone Card                │               │
│              └─────────────────────────────┘               │
│              ┌─────────────────────────────┐               │
│              │   DATA & PRIVACY            │               │
│              │   Stone Card                │               │
│              └─────────────────────────────┘               │
│                                                             │
│ Z-1: motif-laboratory-skeleton-etch (centered, 4% opacity) │
│                                                             │
│ Z-0: texture-laboratory-parchment                          │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Layout** | Single column, centered, 640px max-width | `max-width: 640px` |
| **Card Expansion** | Accordion behavior | Click to expand |
| **Form Elements** | Inputs follow Laboratory mode styling | `components.input.laboratory` |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Page Title** | "THE ARCHIVE" | `typography.scale.displaySmall.laboratory` |
| **Section Titles** | "ACCOUNT", "PREFERENCES", etc. | `typography.scale.monoAnnotation` |
| **Field Labels** | Form labels | `typography.scale.labelMedium` |
| **Field Values** | User data | `typography.scale.monoData` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Settings Cards** | `shape.organicAsymmetry.stone` | `color.semantic.surface.laboratory.slateSmoke` | Archival cardstock |
| **Input Fields** | Laboratory style | — | Monospace font, minimal border |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Card Expand** | Click header | Height transition | `motion.duration.medium` |
| **Form Save** | Submit | Success indicator | `motion.duration.short` |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `texture-laboratory-parchment` | Full viewport | 100% | Z-0 | Static |
| `texture-laboratory-grid-minor` | Behind each card | 100% card | Z-1 | 6% opacity |
| `motif-laboratory-skeleton-etch` | Centered, full viewport | 50% viewport | Z-1 | 4% opacity, architectural |
| `motif-laboratory-compass` | Header navigation | 60px | Z-2 | Static |

---

### PAGE 11: Dashboard Overview ("The Canopy View")

**Classification:** Mode A (Gallery) | Overview | Emotional Register: Altitude

#### Layout Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Z-2: motif-gallery-eucalyptus-hanging (top-left, dramatic) │
│       └── Z-3: kookaburra-sentry (nested within)           │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  87%        12         3          $145K                ││
│  │  MATCH    ACTIVE   INTERVIEWS   POTENTIAL              ││
│  │                                                         ││
│  │  Hero Metric Bar / Glassmorphic / Stone                ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Recent       │  │ Upcoming     │                        │
│  │ Activity     │  │ Interviews   │                        │
│  │ Stone        │  │ Stone        │                        │
│  └──────────────┘  └──────────────┘                        │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Top Matches  │  │ Skill Gaps   │                        │
│  │ Stone        │  │ Stone        │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
│                    Z-2: motif-gallery-banksia-pot          │
│                         (bottom-right)                     │
│                                                             │
│ Z-3: firefly-sprite (ambient, throughout)                  │
│                                                             │
│ Z-0: pattern-nocturnal-canopy (25% opacity)                │
└─────────────────────────────────────────────────────────────┘
```

#### Functional Annotations

| Element | Specification | Token Reference |
|---------|---------------|-----------------|
| **Layout** | Hero bar + 2×2 grid | CSS Grid |
| **Metric Updates** | Real-time from API | WebSocket or polling |
| **Card Links** | Navigate to detailed views | Router links |

#### Content Annotations

| Element | Content | Typography Token |
|---------|---------|------------------|
| **Hero Metrics** | "87%", "12", "3", "$145K" | `typography.scale.metricDisplay` (200 weight) |
| **Metric Labels** | "MATCH", "ACTIVE", etc. | `typography.scale.monoAnnotation` |
| **Card Titles** | "RECENT ACTIVITY", etc. | `typography.scale.titleLarge` |
| **Card Content** | Dynamic lists | `typography.scale.bodyMedium` |

#### Design Annotations

| Element | Shape | Surface | Special Treatment |
|---------|-------|---------|-------------------|
| **Hero Bar** | `shape.organicAsymmetry.stone` | `color.glassmorphism.gallery.surface` | Full-width |
| **Dashboard Cards** | `shape.organicAsymmetry.stone` | `color.glassmorphism.gallery.surface` | "Blur Bloom" on hover |

#### Interaction Annotations

| Element | Trigger | Animation | Token Reference |
|---------|---------|-----------|-----------------|
| **Dashboard Cards** | Hover | Blur increase (Blur Bloom), translateY(-4px) | `motion.interactions.cardHover` + blur |
| **Kookaburra** | Ambient | Idle animation (head tilt) | Custom |
| **Eucalyptus** | Scroll | Parallax (0.15x) | Custom |

#### Asset Placement

| Asset ID | Position | Size | Z-Index | Behavior |
|----------|----------|------|---------|----------|
| `pattern-nocturnal-canopy` | Full viewport | 100% | Z-0 | Static, 25% opacity |
| `motif-gallery-eucalyptus-hanging` | `top: -40px; left: -20px` | 400px width | Z-2 | Parallax (0.15x) |
| `motif-gallery-sentry-kookaburra` | Nested in eucalyptus | 120px | Z-3 | Idle animation |
| `motif-gallery-banksia-pot` | `bottom: -50px; right: -30px` | 220px | Z-2 | Static |
| `motif-gallery-firefly-sprite` | Ambient, throughout | 8-16px | Z-3 | Animated |

---

## Asset Library Reference

### File Naming Convention

All assets follow this pattern for traceability:

```
{type}-{mode}-{name}-{variant}.{extension}
```

| Type | Mode | Examples |
|------|------|----------|
| `motif` | `gallery`, `laboratory` | `motif-gallery-sentry-kookaburra-1024.png` |
| `texture` | `gallery`, `laboratory` | `texture-laboratory-parchment-tile.jpg` |
| `pattern` | `gallery`, `laboratory` | `pattern-nocturnal-canopy-2048.jpg` |
| `icon` | `shared` | `icon-shared-compass-navigation.svg` |

### Asset Inventory

| Asset ID | File Name | Mode | Format | Priority |
|----------|-----------|------|--------|----------|
| Kookaburra Sentry | `motif-gallery-sentry-kookaburra-{size}.png` | Gallery | PNG (transparent) | Critical |
| Wattle Hanging | `motif-gallery-botanical-wattle-hanging.png` | Gallery | PNG (transparent) | Critical |
| Eucalyptus Hanging | `motif-gallery-botanical-eucalyptus-hanging.png` | Gallery | PNG (transparent) | High |
| Banksia Pot | `motif-gallery-botanical-banksia-pot.png` | Gallery | PNG (transparent) | High |
| Nocturnal Canopy | `pattern-nocturnal-canopy-2048.jpg` | Gallery | JPG | Critical |
| Firefly Sprite | `motif-gallery-firefly-sprite.png` | Gallery | PNG (transparent) | Medium |
| Parchment Texture | `texture-laboratory-parchment-tile.jpg` | Laboratory | JPG (tileable) | Critical |
| Skeleton Etch | `motif-laboratory-skeleton-etch.png` | Laboratory | PNG (transparent) | High |
| Grid Major | `texture-laboratory-grid-major.svg` | Laboratory | SVG | High |
| Grid Minor | `texture-laboratory-grid-minor.svg` | Laboratory | SVG | Medium |
| Compass | `motif-laboratory-compass.png` | Laboratory | PNG (transparent) | High |
| Verified Stamp | `motif-laboratory-stamp-verified.png` | Laboratory | PNG (transparent) | Medium |
| Botanical Waratah | `motif-gallery-botanical-waratah.png` | Gallery | PNG (transparent) | Medium |
| Botanical Banksia | `motif-gallery-botanical-banksia.png` | Gallery | PNG (transparent) | Medium |

---

## Implementation Notes

### Z-Index Layering System

| Layer | Z-Index | Content |
|-------|---------|---------|
| Stage | Z-0 | Background patterns, textures |
| Atmosphere | Z-1 | Grid overlays, watermarks, decorative shadows |
| Content | Z-2 | UI components, cards, primary content |
| Anchors | Z-2 | Organic decorative elements |
| Highlights | Z-3 | Mascots, fireflies, stamps, floating elements |
| Modal | Z-10+ | Overlays, dialogs (when present) |

### Responsive Considerations

Organic anchors should scale and reposition at breakpoints:

| Breakpoint | Adjustment |
|------------|------------|
| ≥1440px | Full asset display, maximum parallax |
| 1024–1439px | Assets scale to 80%, reduced parallax |
| 768–1023px | Assets scale to 60%, parallax disabled |
| <768px | Assets hidden or minimized to icons only |

### Performance Guidelines

Firefly animations should use `will-change: transform, opacity` and be limited to 16 instances maximum. Background patterns should be optimized WebP where possible, with JPG fallback. SVG grid overlays preferred over raster for Laboratory mode.
