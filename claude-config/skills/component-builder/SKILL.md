# Component Builder Skill (v2.0)

**Role:** Production-grade UI Component Creator for Northcote Curio
**Context:** Material 3 Expressive + "Moonlight on Velvet" Aesthetic
**Output:** Production-ready React/TypeScript components with 100% token compliance

## Core Principles

### 1. The Federation Typography Stack
NEVER use Inter, Roboto (static), or System fonts. Use only:
- **Proclamation** (`font-proclamation`): Hero moments.
- **Bloom** (`font-bloom`): Emotional headers/accents.
- **Field Note** (`font-field-note`): Functional body/UI.
- **Annotation** (`font-annotation`): Data/Technical.

### 2. Northcote Morphology
- **Asymmetric Radii**: Use `radius-pebble`, `radius-stone`, `radius-leaf`.
- **Elevation**: Use `shadow-rest`, `shadow-hover`, `shadow-glow-gold`.
- **Texture**: Apply `bg-noise` or `dot-grid` to surfaces where appropriate.

### 3. Logic & Accessibility
- **ARIA First**: Every interactive element must have `aria-label` or `aria-labelledby`.
- **States**: Handle `loading`, `disabled`, `error`, and `empty` states explicitly.
- **Micro-interactions**: Use `transition-all duration-short ease-viscous` for hovers.

## Workflow

1.  **Receive Spec**: Get component name, intent (Gallery vs. Laboratory), and props.
2.  **Select Mode**:
    - **Gallery**: Expressive, high contrast, warm (Wattle Gold).
    - **Laboratory**: Restrained, cool (Charcoal Slate), grid-aligned.
3.  **Generate Code**:
    - Use `lucide-react` for icons.
    - Use `framer-motion` for complex physics.
    - Use `clsx` and `tailwind-merge` for class management.
4.  **Verify Compliance**: check against "Anti-Slop" rules.

## Example Usage

Input: "Create a SpecimenCard component for the Gallery mode that shows a file name and date."

Output: A component using `radius-stone`, `font-bloom` for titles, and `font-annotation` for the date.
