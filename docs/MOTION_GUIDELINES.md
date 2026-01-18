# Northcote Curio Motion Guidelines

## Overview

The Northcote Curio motion system quantifies "Viscous Breeze" physics to create natural, expressive animations that reinforce the Gallery vs. Laboratory mode duality.

---

## Core Principles

### 1. **Physics-Based Motion**
All animations use spring physics, not arbitrary durations. This creates natural, organic movement that feels alive.

### 2. **Mode-Specific Personalities**
- **Gallery Mode**: Expressive, gentle overshoot, longer durations (Viscous Breeze)
- **Laboratory Mode**: Precise, minimal overshoot, shorter durations (Clinical Control)

### 3. **Accessibility First**
Respect `prefers-reduced-motion` by disabling transforms and using minimal durations.

---

## Spring Physics Parameters

### Gallery Mode (Viscous Breeze)
```typescript
{
  stiffness: 500,
  damping: 27,
  mass: 1
}
```
**Personality**: Gentle overshoot, air resistance, expressive

### Laboratory Mode (Precise Control)
```typescript
{
  stiffness: 800,
  damping: 40,
  mass: 1
}
```
**Personality**: Minimal overshoot, controlled, clinical

---

## Easing Curves

| Curve | Value | Use Case |
|-------|-------|----------|
| `ease-viscous` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Gallery mode primary |
| `ease-precise` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Laboratory mode primary |
| `ease-settle` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Finding rest position |
| `ease-snap` | `cubic-bezier(0.4, 0, 0.2, 1)` | Quick, decisive |
| `ease-elastic` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Gallery accents only |

---

## Duration Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `duration-instant` | 100ms | Micro-interactions, immediate feedback |
| `duration-fast` | 180ms | Hover states, focus rings |
| `duration-standard` | 280ms | Button press, typography bloom |
| `duration-moderate` | 450ms | Card lift, panel slide |
| `duration-slow` | 600ms | Mode transition, page change |
| `duration-deliberate` | 900ms | Hero animations, entrance moments |

---

## Usage Examples

### Framer Motion (Recommended)

```tsx
import { gallerySpring, motionVariants } from '@/theme/motion-presets';

// Card with hover animation
<motion.div
  variants={motionVariants.card}
  initial="rest"
  whileHover="hover"
  transition={gallerySpring}
>
  Card content
</motion.div>

// Modal with entry animation
<motion.div
  variants={motionVariants.modal}
  initial="hidden"
  animate="visible"
  exit="exit"
  transition={gallerySpring}
>
  Modal content
</motion.div>
```

### CSS (Fallback)

```css
.card {
  transition: transform var(--duration-standard) var(--easing-viscous),
              box-shadow var(--duration-standard) var(--easing-settle);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
```

---

## Interaction Patterns

### Hover
- **Card**: `translateY(-4px)`, shadow elevation, 280ms
- **Button**: `scale(1.02)`, glow shadow, 180ms
- **Link**: Color shift, underline offset, 180ms

### Press
- **Button**: `scale(0.98)`, shadow reduction, 100ms
- **Chip**: `scale(0.95)`, opacity 0.8, 100ms

### Focus
- **Input**: Ring appearance, border color, 180ms
- **Button**: Ring appearance, 180ms

### Drag
- **Card**: `scale(1.05)`, opacity 0.9, shadow elevation
- **Modal**: `scale(0.95)`, backdrop blur

### Scroll
- **Parallax**: Speed multiplier 0.5, linear easing
- **Reveal**: Opacity 0→1, `translateY(24px)→0`, 450ms

---

## Mode-Specific Guidelines

### Gallery Mode
- **Default Easing**: `ease-viscous`
- **Default Duration**: `duration-standard` (280ms)
- **Allow Overshoot**: Yes
- **Use Cases**: Landing page, opportunities, dashboard hero

### Laboratory Mode
- **Default Easing**: `ease-precise`
- **Default Duration**: `duration-fast` (180ms)
- **Allow Overshoot**: No
- **Use Cases**: Resume analysis, skills extraction, document parsing

---

## Accessibility

### Reduced Motion Support

```tsx
import { getTransition, getVariants } from '@/theme/motion-presets';

<motion.div
  variants={getVariants(motionVariants.card)}
  transition={getTransition('gallery')}
>
  Content
</motion.div>
```

When `prefers-reduced-motion: reduce` is detected:
- **Duration**: 50ms (minimal)
- **Easing**: Linear
- **Transforms**: Disabled (opacity only)
- **Parallax**: Disabled

---

## Anti-Patterns

### ❌ Don't
- Use arbitrary durations (e.g., `300ms`)
- Mix spring and duration-based transitions
- Ignore reduced motion preferences
- Use overshoot in Laboratory mode
- Apply elastic easing to functional UI

### ✅ Do
- Use semantic duration tokens
- Use spring physics for natural motion
- Respect accessibility preferences
- Match motion to mode personality
- Reserve elastic easing for Gallery accents

---

## Testing Checklist

- [ ] Test in Gallery mode (expressive, overshoot)
- [ ] Test in Laboratory mode (precise, no overshoot)
- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Verify spring physics feel natural
- [ ] Check performance (60fps)
- [ ] Test on mobile devices
- [ ] Verify keyboard navigation animations

---

## Resources

- **Motion Tokens**: `frontend/src/theme/motion-tokens.json`
- **Framer Presets**: `frontend/src/theme/motion-presets.ts`
- **CSS Variables**: `frontend/src/theme/design-tokens.css`
- **Framer Motion Docs**: https://www.framer.com/motion/
