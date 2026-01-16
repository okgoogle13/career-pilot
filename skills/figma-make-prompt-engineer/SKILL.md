---
name: figma-make-prompt-engineer
description: "Generate vision-first Figma Make prompts for Northcote Curio design system. Creates comprehensive design briefs that produce distinctive, production-ready interfaces aligned with M3 Expressive principles and Victorian naturalist aesthetics. Use when creating Figma prompts, design briefs, landing pages, hero sections, or transforming wireframes into actionable prompts that avoid generic AI outputs."
---

# Figma Make: Prompt Engineering Skill

**Skill ID:** `figma-make-prompt-engineer`  
**Version:** 1.0  
**Category:** Design System Implementation  
**Triggers:** "create figma prompt", "figma make", "design brief", "landing page prompt"

---

## PURPOSE

This skill enables Claude to act as a Creative Design Director and Prompt Engineer for Figma Make, specifically for the **Northcote Curio** design system. Claude generates comprehensive, vision-first design briefs that produce distinctive, production-ready interfaces aligned with Material 3 Expressive principles and Victorian naturalist aesthetics.

---

## WHEN TO USE

Trigger this skill when you need to:
- Generate Figma Make prompts for Northcote Curio pages
- Create design briefs for landing pages, hero sections, or component libraries
- Transform wireframe specs into actionable design prompts
- Ensure design system compliance (M3 Expressive + Australian botanical theme)
- Produce prompts that avoid "AI slop" (generic, on-distribution outputs)

---

## CORE PRINCIPLES

### 1. The Aesthetic Identity ("Nocturnal Curio")

**Central Metaphor:** A Victorian naturalist's field station in the Australian bush—where botanical specimens glow against charred umber, brass instruments catch candlelight, and specimen labels document discoveries with scientific precision and human wonder.

**Color Philosophy:**
- Every color is sampled from the **"Curio Wallpaper"** (Image 1: `Generated_Image_January_12__2026_-_2_25AM.jpeg`)
- **The Stage (`background`):** Deep, warm charcoal or dark bark tones. Avoid pure black.
- **The Protagonist (`primary`):** Luminous botanical accent (e.g., Wattle Gold #D4A84B) that glows against dark mode
- **The Support (`secondary`/`tertiary`):** Muted, earthy tones from native Australian flora

**Typography System:**
- **Display/Headline ("The Bloom"):** Expressive variable serif (Fraunces, Libre Bodoni) with WONK/SOFT axes for organic animation
- **Body/Label ("The Field Note"):** Humanist sans-serif (Work Sans) for technical documentation feel
- **Monospace ("The Annotation"):** JetBrains Mono for specimen tags and data labels

**Shape System ("Organic Asymmetry"):**
- Standard symmetrical rectangles are **banned**
- Use asymmetric border-radii to evoke natural forms: `20px 6px 16px 28px` (pebble), `16px 4px 12px 24px` (stone), `24px 8px 20px 4px` (leaf)
- Every container must use one of these asymmetric tokens

**Motion Physics ("Viscous Breeze"):**
- UI should feel like it has "air resistance"—avoid mechanical snapping
- Hover states are living responses (flowers opening, ink spreading)
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle overshoot)

---

### 2. The Anti-Slop Protocol

**FORBIDDEN ELEMENTS** (never include):
- Uniform border-radius (8px, 12px, 16px on all corners)
- Generic fonts (Inter, Roboto, Arial, Plus Jakarta Sans)
- Purple gradients, pure black (#000), pure white (#FFF)
- Flat, symmetrical grid layouts
- Mechanical hover effects (`opacity: 0.8` or `scale: 1.05` alone)
- Outlined, thin, generic line icons
- Solid backgrounds without texture
- Linear easing or uniform timing

**REQUIRED PATTERNS** (always include):
- Asymmetric border-radii from token system
- Variable fonts with fluid animation potential
- Warm undertones in all colors (no cool grays)
- Glassmorphism with `backdrop-filter: blur(20px)` that reveals layers
- Viscous motion with 280-450ms durations
- Deep ink-pool shadows with ambient glow
- Organic anchors that extend beyond viewport edges

---

## WORKFLOW

### Phase 1: Context Gathering

1. **Reference the Curio Wallpaper** (`Generated_Image_January_12__2026_-_2_25AM.jpeg`)
   - This is the **genetic code** of the design system
   - Every color, typographic style, and atmospheric density derives from it
   
2. **Review Wireframe Specs** (if available)
   - Asset placement: `/mnt/project/02-asset-integration-plan.md`
   - Page specifications: `/mnt/project/04-page-specifications.md`
   - Asset library: `/mnt/project/06-asset-library.md`

3. **Check Design Tokens** (`/mnt/project/tokens.json`)
   - Validate all color, typography, shape, and motion tokens
   - Ensure semantic naming (not arbitrary values)

---

### Phase 2: Prompt Structure

Generate prompts using this **vision-first architecture**:

#### Part 1: Vision & Identity (30% of prompt)
- **The Soul of This Page:** Emotional register, user's first impression
- **The Central Metaphor:** Victorian naturalist connection
- **The Differentiator:** What makes this memorable ("the golden wattle hanging from the corner...")

#### Part 2: Constraints & Anti-Patterns (15% of prompt)
- **Anti-Slop Protocol:** Explicit list of forbidden elements
- **Required Patterns:** Non-negotiable design elements

#### Part 3: Design System (20% of prompt)
- **Color Palette:** Semantic roles with hex values
- **Typography Scale:** Font families, sizes, weights, variable axes
- **Shape Tokens:** Asymmetric border-radii
- **Motion System:** Easing curves, durations, interaction patterns
- **Elevation System:** Shadow definitions

#### Part 4: Page Specification (30% of prompt)
- **Layout Architecture:** ASCII diagram showing z-index layers
- **Background Layer:** Wallpaper treatment, gradient overlays
- **Hero Container:** Glassmorphic styling, organic shapes
- **Feature Cards:** Grid layouts, hover states
- **Organic Anchors:** Wattle hanging, Banksia pot, firefly sprites
- **Navigation Dock:** Bottom-fixed glassmorphic nav

#### Part 5: Responsive & Accessibility (5% of prompt)
- **Breakpoints:** Desktop, tablet, mobile treatments
- **WCAG Compliance:** Contrast ratios, focus states, keyboard navigation
- **Reduced Motion:** Respect `prefers-reduced-motion`

---

### Phase 3: Quality Checks

Before finalizing, verify:

**Token Compliance:**
- ✅ All colors use semantic tokens (not arbitrary hex)
- ✅ Typography uses scale tokens (not pixel values)
- ✅ Shapes use asymmetric tokens (not uniform values)
- ✅ Motion uses easing tokens (not linear)

**Aesthetic Alignment:**
- ✅ Wallpaper is celebrated (not hidden at 25% opacity)
- ✅ Glassmorphism reveals layers beneath
- ✅ Organic anchors break the grid
- ✅ Typography blooms on hover (variable font animation)

**Anti-Slop Validation:**
- ❌ No Inter/Roboto fonts
- ❌ No uniform border-radius
- ❌ No purple gradients
- ❌ No flat symmetrical layouts
- ❌ No mechanical hover effects

---

## OUTPUT FORMAT

### For Figma Make Prompts

Generate **vision-first, step-by-step design briefs** with:

1. **Evocative Language:** Use metaphors (Moonlight, Velvet, Ink pool)
2. **Progressive Disclosure:** Start broad (vision), then narrow (technical specs)
3. **Copy-Paste Ready:** Include exact CSS values for tokens
4. **Visual Hierarchy:** ASCII diagrams for z-index layering
5. **First Step Clarity:** "Your immediate task is to build the background layer..."

### For Design Token JSON

When requested, output **strict W3C Design Token JSON** with:
- Semantic naming (`color.primary.wattleGold`, not `color.yellow`)
- Token references (`$value: "{color.primary.wattleGold}"`)
- Descriptions for context (`$description: "Acacia pycnantha yellow - PRIMARY ACCENT"`)

### For Visual Verification

Generate **self-contained HTML Artifacts** using:
- Tailwind CDN for rapid prototyping
- Imported Google Fonts (Fraunces, Libre Bodoni, Work Sans, JetBrains Mono)
- Inline CSS for custom tokens (asymmetric border-radii, glassmorphism)
- Annotations explaining design decisions

---

## REFERENCE ASSETS

### The Curio Wallpaper (Primary Asset)
**File:** `Generated_Image_January_12__2026_-_2_25AM.jpeg`  
**Dimensions:** 2048 × 858px (cinematic ultrawide)

**Contents Inventory:**
| Figure | Element | Botanical/Object Name |
|--------|---------|----------------------|
| Fig. 1 | Banksia cone | *Banksia serrata* |
| Fig. 3 | Wattle | *Acacia pycnantha* (Golden Wattle) |
| Fig. 4 | Waratah | *Telopea speciosissima* |
| Fig. 8 | Brass Compass | Surveyor's field compass |
| Fig. 9 | Temporal Device | Compass rose / navigation instrument |

**Color Sampling Locations:**
- **Wattle Gold** `#D4A84B`: Brightest puffball in Acacia cluster (center-left)
- **Waratah Crimson** `#C45C4B`: Mid-tone of Telopea petal (center)
- **Specimen Night** `#1A1714`: Deep shadow between botanicals
- **Parchment** `#F5F0E8`: Specimen label text color

**Usage Map:**
- **Landing Page:** Full viewport, 100% opacity with gradient fade
- **Authentication:** 50% split-screen crop ("Compass Corner" on right)
- **Onboarding:** Full viewport, 20% opacity
- **Opportunity Feed:** Full viewport, 22% opacity
- **Dashboard:** Full viewport, 25% opacity

---

## EXAMPLES

### Example 1: Landing Page Hero Prompt Structure

```markdown
# PART 1: VISION & IDENTITY

This is not a landing page. This is the **foyer of a Victorian naturalist's 
field station at dusk**—the moment a visitor steps through the door, smells 
aged paper and eucalyptus oil, and sees specimens glowing faintly in glass 
cases against dark timber walls.

**The User's First Emotion:** "I have discovered something rare."

# PART 2: CONSTRAINTS

❌ FORBIDDEN: Inter/Roboto fonts, uniform border-radius, purple gradients
✅ REQUIRED: Libre Bodoni, asymmetric shapes, glassmorphism, viscous easing

[... continue with Parts 3-5 ...]
```

### Example 2: Button Component Spec

```css
.cta-primary {
  font-family: 'Work Sans', sans-serif;
  background: #D4A84B; /* Wattle Gold */
  color: #1A1714; /* Specimen Night */
  border-radius: 20px 6px 16px 28px; /* Pebble - Organic Asymmetry */
  transition: all 280ms cubic-bezier(0.34, 1.56, 0.64, 1); /* Viscous */
}
```

---

## TROUBLESHOOTING

### Issue: Output Looks Generic
**Fix:** Explicitly list forbidden elements. Use "NEVER use uniform border-radius"

### Issue: Colors Don't Match Wallpaper
**Fix:** Reference Curio Wallpaper image. Extract exact hex values with color picker

### Issue: Layout Feels Mechanical
**Fix:** Add botanical anchors extending beyond viewport edges

### Issue: Typography Lacks Character
**Fix:** Specify variable axes: `'WONK' 1, 'SOFT' 50` for Fraunces

---

## INTEGRATION

### Companion Skills
- **`component-builder`**: Generate React components from Figma prompts
- **`northcote-curio-audit`**: Validate designs against token system
- **`design-compliance-dashboard`**: Score outputs for compliance

### Workflow
1. Use **figma-make-prompt-engineer** to generate design brief
2. Feed prompt into Figma Make
3. Use **component-builder** to scaffold React component
4. Use **northcote-curio-audit** to validate compliance

---

## SUCCESS CRITERIA

✅ **Visual Impact:** "This is unlike anything I've seen"  
✅ **Token Compliance:** 100% semantic tokens used  
✅ **Wallpaper Visibility:** Hero asset celebrated (not hidden)  
✅ **Organic Integration:** Botanical anchors feel intentional  
✅ **Glassmorphism:** Backdrop blur reveals layers convincingly  
✅ **Motion:** All animations use viscous easing  
✅ **Accessibility:** WCAG AAA compliant  
✅ **Responsive:** Graceful degradation  

---

## RELATED DOCUMENTATION

- **Design Tokens:** `/mnt/project/tokens.json`
- **Wireframe Specs:** `/mnt/project/04-page-specifications.md`
- **Asset Library:** `/mnt/project/06-asset-library.md`
- **Figma Asset Spec:** `/mnt/project/northcote-curio-figma-asset-spec.md`
