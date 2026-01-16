# Northcote Curio System Guidelines

# General guidelines
* **The Dual-Mode System**: Every screen must explicitly follow either **Gallery Mode** (Discovery/Wonder) or **Laboratory Mode** (Analysis/Precision). 
* **Organic Layouts**: Opt for responsive layouts using Flexbox/Grid by default. Use absolute positioning ONLY for botanical anchors or floating data annotations.
* **Material Authenticity**: Technology should feel like a supporting character; the materials (Glass, Parchment, Wood) are the protagonists.
* **Accessibility**: Maintain WCAG AAA contrast (7:1) using themed tokens. Respect `prefers-reduced-motion`.

--------------

# Design system guidelines

## 1. Visual Modes (The Two Biomes)

### Gallery Mode (The Cabinet of Curiosities)
* **Surface**: Glassmorphism (`rgba(44, 39, 35, 0.75)`) with `20px` to `32px` backdrop-blur.
* **Atmosphere**: Bioluminescent fireflies, warm shadows, and nocturnal botanical anchors (Wattle, Banksia).
* **Usage**: Landing, Discovery Feed, Onboarding, Dashboard.

### Laboratory Mode (The Field Journal)
* **Surface**: Opaque, neutral paper texture (`#F5F0E8` Parchment base).
* **Atmosphere**: Desk-like, clinical, focused. No fireflies or botanical anchors.
* **Usage**: Resume Ingestion, Analysis, Editor, Studio, Settings.

## 2. Typography Rules
* **Proclamation (Gallery Titles)**: `'Libre Bodoni'` (Italic only).
* **Bloom (Lab & Display Titles)**: `'Fraunces'` (Soft 50, Wonk 1).
* **Field Note (General UI)**: `'Work Sans'`.
* **Annotation (Labels)**: `'JetBrains Mono'`, 10px, Uppercase. Format as "FIG. 1."

## 3. Shape System (Organic Asymmetry)
*Every container must use a radius token. Uniform corners are forbidden.*
* **Pebble**: `20px 6px 16px 28px` (Buttons, Nav Dock).
* **Stone**: `16px 4px 12px 24px` (Cards, Lab Dividers).
* **Leaf**: `24px 8px 20px 4px` (Hero Containers).
* **Seed**: `8px 4px 10px 6px` (Badges, Tags).

## 4. Color Hierarchy
* **Gallery Primary**: Wattle Gold (`#D4A84B`), Waratah Crimson (`#C45C4B`).
* **Lab Primary**: Desaturated Ink tones and Parchment neutrals.
* **Forbidden**: Pure black (#000), pure white (#FFF), cool grays, or generic blue-violet tech gradients.

--------------

# Component Guidelines

## Feature Card
A glassmorphic or paper-like container for specimens.
* **Gallery**: Glass surface, lifting 4px with a viscous transition on hover.
* **Lab**: Static parchment surface with a thin `1px` border, no hover lift.

## Northcote Button
* **Gallery (Collector)**: Wattle Gold fill, Specimen Night text. Pebble Shape.
* **Lab (Journal)**: Parchment fill with Charcoal border. Pebble Shape.

## Navigation Dock
Fixed bottom bar for switching biomes.
* **Gallery**: Translucent Glass with `32px` blur.
* **Lab**: Opaque high-contrast parchment bar.

--------------

# Explicitly Forbidden Patterns
* ❌ Generic SaaS or "Enterprise AI" layouts.
* ❌ Uniform border-radius (8px, 12px, etc.).
* ❌ Inter, Roboto, or system fonts.
* ❌ Botanical anchors in Laboratory mode (wrong biome).
* ❌ Linear or default easing animations.
