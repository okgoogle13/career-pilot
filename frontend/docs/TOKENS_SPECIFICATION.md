# Northcote Curio: Design Token Specification

## Philosophy
Tokens in Northcote Curio are not just values; they are semantic design decisions inspired by the **Victorian Naturalist Field Station** metaphor. Each token has a specific role in creating the atmosphere of a functioning laboratory and a curated gallery.

## Color System
### Specimen Night (Background)
- **Base:** `#1A1714`
- **Role:** The deepest stage — warm charred umber, the velvet behind the specimen case.
- **Usage:** Page backgrounds, main containers, "The Stage".

### Wattle Gold (Primary)
- **Base:** `#D4A84B`
- **Role:** The Protagonist — luminous Acacia pycnantha yellow.
- **Usage:** Primary actions, key interactive elements, "Gallery" mode highlights.

### Waratah Crimson (Alert)
- **Base:** `#C45C4B`
- **Role:** Vitality and Warning — rich Telopea speciosissima red.
- **Usage:** Errors, destructive actions, high-priority system alerts.

### Eucalypt Smoke (Surface)
- **Base:** `#2C2723`
- **Role:** Structure and Depth — woodsmoke at dusk.
- **Usage:** Card surfaces, secondary containers, elevated planes.

### Flannel Flower (Neutral)
- **Base:** `#E6E1D6`
- **Role:** Tactile Softness — Actinotus helianthi white.
- **Usage:** Text on dark surfaces, "Laboratory" mode primary.

## Spacing Scale
Based on a **4px modular scale** to maintain consistent rhythm and hierarchy.
- **xs:** 4px (Fine details)
- **sm:** 8px (Tight grouping)
- **md:** 12px (Standard separation)
- **lg:** 16px (Component padding)
- **xl:** 24px (Section breathing room)
- **xxl:** 32px (Major layout gaps)
- **xxxl:** 48px (Hero spacing)

## Border Radius (Organic Asymmetry)
Shapes are not geometric; they are organic, worn, and tactile.
- **Pebble:** `20px 6px 16px 28px` — Buttons, chips.
- **Stone:** `16px 4px 12px 24px` — Cards, modals.
- **Leaf:** `24px 8px 20px 4px` — Containers, panels.
- **Seed:** `8px 4px 10px 6px` — Small tags, badges.
- **Sentry:** `98%` — Avatars, circular indicators.

## Typography
- **Proclamation:** `Libre Bodoni` — Headlines, "The Announcement".
- **Bloom:** `Fraunces` — Expressive titles, variable axes (SOFT, WONK).
- **Field Note:** `Work Sans` — Body text, labelling.
- **Annotation:** `JetBrains Mono` — Technical data, code snippets.

## Shadow System (Ink Pools)
Shadows fall straight down (Y-axis only), like ink pooling on a table. No X-axis offset.
- **Subtle:** `0 2px 4px` — Interface layers.
- **Standard:** `0 4px 8px` — Floating elements.
- **Elevated:** `0 8px 16px` — Modals, dropdowns.
- **Maximum:** `0 16px 32px` — Critical overlay states.

## Motion (Viscous Breeze)
- **Curve:** `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Feel:** Fluid, slightly resistant, then snapping into place. Like moving a heavy object through honey or a stiff breeze.
