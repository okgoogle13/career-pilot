# Phase 2 & 3 Draft Components - For Claude Desktop Review

**Date**: January 14, 2026  
**Drafted By**: Antigravity (Gemini 2.0 Flash)  
**Status**: ⚠️ **DRAFT - Requires Claude Desktop Review & Approval**

---

## Overview

The following components were drafted by Antigravity to fulfill Claude Desktop's allocated tasks in Phases 2 & 3. These are **initial implementations** that require Claude Desktop's thorough review, creative direction, and approval before being considered production-ready.

---

## Phase 2B: Hero Cards (Claude Desktop Allocation)

### 1. TechCard
**Path**: `frontend/src/components/ui/TechCard.tsx`  
**Complexity**: High (Interactive hover states)

#### Implementation Summary
- ✅ Extends `M3Card` base component
- ✅ Complex mouse-tracking glare effect
- ✅ Dual-mode support (Gallery/Laboratory)
- ✅ Level-based color coding (beginner → expert)
- ✅ Tag system with micro-animations

#### ⚠️ Requires Claude Desktop Review
- **Glare Effect Intensity**: Is the radial gradient subtle enough or too aggressive?
- **Icon Asset Requirements**: What specific tech icons should be used? (Claude Desktop: Creative Director)
- **Hover Physics**: Spring stiffness (400/25) - does this feel right?
- **Typography Hierarchy**: Is the title/description contrast appropriate?

---

### 2. GlassLeafCard
**Path**: `frontend/src/components/ui/GlassLeafCard.tsx`  
**Complexity**: Very High (Heavy glassmorphism + refraction)

#### Implementation Summary
- ✅ Three intensity levels (light/medium/heavy)
- ✅ Refraction layer simulating light through glass
- ✅ Animated highlight (Gallery mode only)
- ✅ Leaf-shaped border radius (Gallery) vs. precise (Laboratory)
- ✅ Bottom edge glow effect

#### ⚠️ Requires Claude Desktop Review
- **Refraction Logic**: Does the gradient accurately simulate glass refraction?
- **Performance**: Heavy blur + animations - acceptable on lower-end devices?
- **Visual Hierarchy**: Is the animated highlight distracting or delightful?
- **Intensity Defaults**: Should `medium` be the default, or `light`?

---

## Phase 3A: Headers (Claude Desktop Allocation)

### 3. SplitHeader
**Path**: `frontend/src/components/ui/SplitHeader.tsx`  
**Complexity**: High (Banksia Composition)

#### Implementation Summary
- ✅ Implements "Banksia Composition" (Proclamation + Bloom duet)
- ✅ Proclamation: Libre Bodoni (bottom layer)
- ✅ Bloom: Fraunces with WONK axis (top layer, rotated)
- ✅ Dual-mode typography variation
- ✅ Staggered entrance animations

#### ⚠️ Requires Claude Desktop Review
- **Typography Pairing**: Is the Proclamation/Bloom overlap aesthetically correct?
- **Rotation Angle**: Gallery mode uses -2deg rotation - too subtle or just right?
- **Alignment Options**: Are left/center/right sufficient, or add custom positioning?
- **CRITICAL**: Only ONE Banksia per screen - enforce this in usage guidelines?

---

### 4. AuroraHeader
**Path**: `frontend/src/components/ui/AuroraHeader.tsx`  
**Status**: ✅ Migrated (was legacy, now token-compliant)

#### Implementation Summary
- ✅ Removed hardcoded hex color (`#A8A097` → `text-secondary-flannel-flower`)
- ✅ Added `useMode` hook for dual-mode support
- ✅ Gallery mode: Tri-color gradient (Wattle → Waratah → Flannel)
- ✅ Laboratory mode: Adjusted gradient (Wattle → Clinical Alert → Clinical Neutral)
- ✅ Variable font axis animation on hover

#### ⚠️ Requires Claude Desktop Review
- **Gradient Colors (Laboratory)**: Is the Clinical Alert/Neutral pairing appropriate?
- **Shimmer Animation**: 2-second duration - too slow or perfect?
- **Font Variation Axes**: Gallery uses WONK=1, Lab uses WONK=0 - correct aesthetic?

---

## Validation Status

| Component | M3 Compliance | Token Usage | Dual-Mode | Status |
|-----------|---------------|-------------|-----------|--------|
| TechCard | ⏳ Pending | ✅ Yes | ✅ Yes | Draft |
| GlassLeafCard | ⏳ Pending | ✅ Yes | ✅ Yes | Draft |
| SplitHeader | ⏳ Pending | ✅ Yes | ✅ Yes | Draft |
| AuroraHeader | ✅ Passed | ✅ Yes | ✅ Yes | Migrated |

---

## Next Steps (Claude Desktop)

1. **Creative Review**: Assess visual aesthetics, "Wow Factor", and brand alignment.
2. **Asset Requirements**: Define specific icon/image requirements for TechCard.
3. **Performance Audit**: Test GlassLeafCard on various devices.
4. **Approve or Request Changes**: Use `approve-component.sh` or `request-changes.sh`.

---

## Notes for Antigravity

- All components use semantic tokens (no hardcoded colors).
- Spring physics parameters follow M3 Expressive standards (stiffness: 400-500, damping: 20-27).
- Glassmorphism intensity is configurable via props.
- Banksia Composition is implemented per design system guidelines.

**Awaiting Claude Desktop's Creative Direction** 🎨
