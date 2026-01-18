---
description: Northcote Curio Design Compliance Check (V2.0 Strict)
---
# Northcote Curio Design Compliance Audit

This workflow performs a strict compliance check to ensure ANY file (Component, Page, Doc, CSS) adheres to the **Northcote Curio V2.0** design system.

**Trigger:** "Audit [file] for design compliance", "Check design specs in [file]", or automated pre-commit checks.

## Workflow Steps

### 1. Context & Preparation
- **Target**: ANY file provided by the user.
- **Reference Truth**: 
  - `frontend/src/theme/tokens.json` (The Source of Truth)
  - `docs/v2_atomic/DOC-001_Design_System.md` (Design Principles)
- **Goal**: Ensure 100% alignment with the *Moonlight on Velvet* palette and *Federation Typography Stack*.

### 2. Typography Compliance (The Federation Stack)
Scan the file contents for font family references.

**✅ COMPLIANT (Allowed):**
- **Proclamation:** `Libre Bodoni`, `Playfair Display` (Headers)
- **Bloom:** `Fraunces` (Subheaders, Emotional Accents)
- **Field Note:** `Work Sans` (Body, UI)
- **Annotation:** `JetBrains Mono` (Data, Code)

**❌ VIOLATIONS (Must Purge):**
- **Eucalypt Stack (Old):** `Recursive`, `Amstelvar`, `Roboto Flex`
- **Electric Stack (Old):** `Plus Jakarta Sans`, `Caveat`, `Fredoka`
- **Generic Slop:** `Inter`, `Roboto` (unless Flex), `Arial`, `Helvetica`, `Open Sans`

### 3. Color Palette Compliance (Moonlight on Velvet)
Scan for hex codes and color variable names.

**✅ COMPLIANT (Allowed):**
- **Wattle Gold:** `#D4A84B` (Primary Action / The Protagonist)
- **Waratah Crimson:** `#C45C4B` (Accent / The Spark)
- **Specimen Night:** `#1A1714` (Surface / The Floor)
- **Flannel Flower:** `#A8A097` (Secondary / Metadata)
- **Parchment:** `#F5F0E8` (Text High Contrast)

**❌ VIOLATIONS (Must Purge):**
- **Electric Alchemist (Old):** `Sage Green (#B4D8AE)`, `Neon Teal`, `Hot Pink`, `Electric Indigo`
- **Legacy Colors:** `#6B8F5A`, `#D97C65`, `#E2D0F7`

### 4. Morphology & Atmosphere Checks
- **Organic Asymmetry:**
  - ✅ `20px 6px 16px 28px` (Pebble)
  - ❌ `8px`, `4px` (Generic rounded corners)
- **Dual Modes:**
  - Does the file support `[data-mode="gallery"]` (Wonder) vs `[data-mode="laboratory"]` (Rigor)?
- **Motion:**
  - ✅ `cubic-bezier(0.34, 1.56, 0.64, 1)` (Viscous Breeze)
  - ❌ `linear`, `ease-in-out` (Generic)

### 5. Remediation & Reporting
Output a `Design Compliance Report` with the following structure:

1.  **Status**: 🟢 PASSED or 🔴 FAILED
2.  **Typography Check**: List found fonts. Highlight violations.
3.  **Palmer Check**: List found colors. Highlight violations.
4.  **Remediation Plan**:
    - For each violation, provide the exact Northcote Curio replacement (e.g., "Replace `Plus Jakarta Sans` with `Work Sans`").
    - If strictly requested, **AUTO-FIX** the violations using `replace_file_content`.

---

## Example Usage
"Audit `frontend/src/features/LandingPage.tsx` for Northcote compliance."
"Check `docs/v2_atomic/DOC-003.md` to ensure it references the correct colors."
