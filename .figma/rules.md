# Electric Alchemist v5.0 - Design System Rules
# TYPOGRAPHY ENGINE: M3 EXPRESSIVE EUCALYPT STACK v3.5

You are designing for **Career Copilot**, an application with a "Tech-Organic" aesthetic (High-density data housed in a lush, organic night garden).

---

## 1. Color Palette (Native Earth)
**Strictly enforce these hex codes. Do not use standard blues or purples.**

- **Primary (Success/Growth):** Eucalyptus Sage `#B4D8AE`
- **Secondary (Action/Buttons):** Terracotta `#E09F7D`
- **Tertiary (Highlights/Script):** Wattle Gold `#F0C419`
- **Surface (Backgrounds):** Deep Charcoal `#121212` (Canvas) or `#1E1E1E` (Cards)
- **Text:** Primary `#E3E3E3`, Secondary `#C4C7C5`

---

## 2. Typography — THE EUCALYPT STACK (M3 Expressive 4-Font Strategy)

> **CRITICAL:** Use these 4 variable fonts with parametric axes. Do NOT use Plus Jakarta Sans, Caveat, Inter, or Arial.

### 🌿 THE VINE (Recursive Variable)
- **Role:** Display, Hero, Wild Growth, Expressive scripts
- **Axes:** `CASL` 1, `CRSV` 1, `slnt` -15, `wght` 300-800
- **Tailwind Class:** `font-vine`
- **Color:** Wattle Gold `#F0C419` or Terracotta `#E09F7D`
- **Treatment:** Rotated 3-5°, overlapping structural text

### 🪵 THE TRUNK (Amstelvar Variable)
- **Role:** Headlines, Structural Anchors, "Hard Data"
- **Axes:** `wdth` 100-125, `wght` 900
- **Tailwind Class:** `font-trunk`
- **Treatment:** Uppercase, tracking `-0.02em`, **reactive width** (expands with viewport)

### 🌸 THE BLOOM (Fraunces Variable)
- **Role:** Titles, Editorial, Native Irregularity
- **Axes:** `SOFT` 100, `WONK` 1, `wght` 500
- **Tailwind Class:** `font-bloom`
- **Treatment:** Unexpected, soft, full of character

### 🍃 THE LEAF (Roboto Flex Variable)
- **Role:** Body, UI Text, Functional, Dense
- **Axes:** `opsz` 14, `GRAD` 0→150, `XTRA` 468
- **Tailwind Class:** `font-leaf`
- **Treatment:** Layout-safe hover (animate `GRAD`, not `wght`)

### 📊 DATA (JetBrains Mono)
- **Role:** Labels, Timestamps, Metrics
- **Tailwind Class:** `font-mono`
- **Treatment:** Uppercase, tracking `+0.05em` to `+0.12em`

---

## 3. The Banksia Composition (Hero Moment)

> **One Duet Per Screen.** The signature "Vine over Trunk" pattern.

```
NOUN (The Trunk)    ← Amstelvar Black 900, wdth 125, White, Uppercase
  └─ verb (The Vine) ← Recursive CASL 1, Wattle Gold, rotated 4°
```

**Rules:**
- Vine text absolutely positioned, overlapping Trunk letters
- Scale disparity: Vine significantly larger OR smaller
- Trunk responds to viewport width (`wdth` axis: 100→125)

---

## 4. EXTREME WEIGHT CONTRAST

**FORBIDDEN (Timid):** Weight 400 vs 600 (1.5x ratio)
**REQUIRED (Dramatic):** Weight 100 vs 900 (9x ratio)

| Element | Weight | Font |
|:---|:---|:---|
| Hero Display | 100-200 (Hairline) | Trunk or Vine |
| Headlines | 900 (Black) | Trunk |
| Titles | 500 (Medium) | Bloom |
| Body | 400 (Normal) | Leaf |
| Data Labels | 700 (Bold) | Mono |

---

## 5. Shape Morphology & Layout

- **Tech Card (Primary Container):** Solid `#1E1E1E` background. Symmetric `24px` radius (`rounded-3xl`). 1px border (`border-white/5`).
    - *Texture:* Must include subtle dot-grid background pattern (5% opacity).
    - *Anti-Pattern:* Do NOT use glassmorphism/blur for main data containers.
- **Buttons (The Pebble):** Asymmetric corners `20px 20px 32px 32px` (`rounded-pebble`) OR Full Pill (`rounded-full`).
    - *Style:* Flat color (`bg-terracotta` or `bg-sage`). No gradients.
- **Badges (The Gem):** Sharp `4px` radius (`rounded-gem`). For status indicators and chips.

---

## 6. Asset Integration

- **Hanging Plants:** Anchor `native-gum-hanging` or `native-waratah-hanging` to the **Top-Right** of containers/screens.
- **Floor Plants:** Anchor `native-group` to the **Bottom-Right** inside Hero Cards.
- **Hero Plants:** Use `native-waratah-pot` centered for Empty States.

---

## 7. Motion Physics

- **Spring:** Stiffness 500, Damping 27
- **Hover:** `scale(1.02)` + `translateY(-4px)` + shadow lift
- **Typography Hover:** Animate `GRAD` axis (0→150) — layout-safe, no reflow
- **Spring Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## 8. Code Generation (React/Tailwind)

When generating code:
- Use custom Tailwind font classes: `font-vine`, `font-trunk`, `font-bloom`, `font-leaf`, `font-mono`
- Use CSS utility classes: `.text-vine`, `.text-trunk`, `.text-bloom`, `.text-leaf`, `.text-data`
- Use `.banksia-composition` with `.banksia-trunk` and `.banksia-vine` for hero moments
- Use custom colors: `bg-surface-container`, `text-terracotta`, `bg-sage`, `text-wattle`
- Use the utility class `.tech-card` for any card container
- Do not use inline styles for typography; use the defined utility classes
- Apply `font-variation-settings` for axis control

---

## 9. ANTI-SLOP PROTOCOL (Forbidden)

- ❌ **NO** Plus Jakarta Sans, Caveat, Inter, Arial, Helvetica (Generic AI Slop)
- ❌ **NO** Weight 400-700 for Headlines (Must be 100-200 or 900)
- ❌ **NO** Glassmorphism / Blur on data cards
- ❌ **NO** Blue/Purple colors — Only Sage/Terracotta/Wattle
- ❌ **NO** Static fonts — Use variable fonts with axes engaged
- ❌ **NO** Linear easing — Use spring physics
