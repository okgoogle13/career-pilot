# Claude Desktop Opus 4.5: Figma Make Prompt Enhancement Request

**Document ID:** CLAUDE-OPUS-PROMPT-IMPROVE-001  
**Purpose:** Improve Figma Make prompt to capture Northcote Curio design soul  
**Model:** Claude Opus 4.5  
**Role:** Creative Design Director + M3 Expressive Specialist + Prompt Engineering Expert

---

## PRIMARY DESIGN ASSET: "The Nocturnal Garden"

**File:** `pattern-nocturnal-canopy-hero.jpg`  
**Location:** `/frontend/public/assets/wallpapers/pattern-nocturnal-canopy-hero.jpg`  
**Dimensions:** 2048 × 858 px (cinematic ultrawide, ~2.39:1 aspect ratio)  
**Classification:** **CRITICAL — Primary Brand Asset**

### Visual Description

This custom wallpaper is the **visual constitution** of Northcote Curio. It depicts a Victorian naturalist's specimen catalog rendered in gouache illustration style against a warm charcoal background (#1A1714). The composition includes:

**Botanical Specimens (Gallery Mode Elements):**
- **Telopea speciosissima** (NSW Waratah) — Central crimson bloom, the visual anchor
- **Acacia pycnantha** (Golden Wattle) — Yellow puffball clusters, source of Wattle Gold (#D4A84B)
- **Banksia serrata** (Old Man Banksia) — Ochre cone shapes, flanking positions
- **Anigozanthos flavidus** (Kangaroo Paw) — Red tubular flowers
- **Sturt's Desert Pea** — Crimson with black centers
- **Flannel Flower** — Cream/white petals with lavender accents
- **Eucalyptus leaves and nuts** — Sage green foliage throughout

**Scientific Instruments (Laboratory Mode Elements):**
- **Brass Compass Rose** — Navigation/orientation motif (top-right quadrant)
- **Temporal Device/Compass** — Vintage measurement instrument
- **Brass Keys** — Antique ornate keys suggesting access and discovery
- **Specimen Labels** — Italic taxonomy labels ("Fig. 1. *Banksia serrata*")

**Whimsy Elements (Wonder Factor):**
- **African Elephant** — Miniature illustration adding unexpected delight
- **D20 Dice** — Subtle gaming reference, signaling playfulness within rigor
- **Fossil Specimen** — Geological element grounding the naturalist theme

### Color Extraction Reference

Every semantic color in the Northcote Curio token system is **sampled directly from this asset**:

| Token | Hex | Sample Location in Asset |
|-------|-----|--------------------------|
| `--color-specimen-night` | #1A1714 | Background (any dark region) |
| `--color-wattle-gold` | #D4A84B | Wattle puffballs (center-left) |
| `--color-waratah-crimson` | #C45C4B | Central Waratah petals |
| `--color-banksia-orange` | #D4885C | Banksia cone body (left) |
| `--color-ghost-gum-sage` | #7A9E82 | Eucalyptus leaves (illuminated) |
| `--color-flannel-cream` | #E8E2D8 | Flannel Flower petals |
| `--color-native-violet` | #9B8AAD | Flannel Flower accents |
| `--color-brass-patina` | #8B7355 | Brass key oxidation |

### Typography Reference

The specimen labels in the wallpaper define the **annotation voice** of the design system:
- **Figure Numbers:** "Fig. 1." — Regular weight, serif
- **Taxonomy:** "*Banksia serrata*" — Italic, proper Latin binomial
- **Color:** Warm cream (#E8E2D8) against dark background

This informs the `--font-annotation` token usage (JetBrains Mono, uppercase, 0.1em tracking).

### Usage Guidelines

| Context | Opacity | Treatment |
|---------|---------|-----------|
| **Landing Page** | 25-50% | Full viewport, gradient fade at bottom |
| **Authentication** | 15% | Darker, focused on right-side crop (Compass Corner) |
| **Opportunity Feed** | 22% | Subtle presence behind job cards |
| **Dashboard Overview** | 25% | Return to prominence for summary view |

### Design Mandate

> *"This asset must appear prominently on the Landing Page and Authentication Page. It is the user's first impression of the brand. The wallpaper should be **celebrated, not hidden**—use gradient overlays instead of blanket opacity reduction to preserve visual impact while maintaining text contrast."*

---

## PROMPT FOR CLAUDE DESKTOP

```
<system>
You are the Creative Design Director for Northcote Curio, a premium career development platform with a Victorian naturalist aesthetic. You possess deep expertise in three specialized domains:

1. **M3 EXPRESSIVE DESIGN SYSTEMS**
   - Material Design 3 Expressive principles (organic shapes, color expression, motion choreography)
   - Token-based design architecture with semantic color, typography, and shape systems
   - Dual-mode interfaces (warm emotional vs. cool analytical contexts)
   - Glassmorphism and depth layering techniques
   - Variable font axis manipulation (WONK, SOFT, opsz) for typographic expression

2. **VINTAGE SCIENTIFIC ILLUSTRATION GENERATION**
   - Victorian-era botanical illustration styles (gouache, watercolor, engraving)
   - Anatomical and specimen documentation aesthetics
   - Period-accurate typography and labeling conventions (specimen tags, figure numbering)
   - AI image generation prompting for Midjourney, DALL-E, and Stable Diffusion
   - Asset extraction, color correction, and digital integration techniques
   - Understanding of when to generate, extract, or commission custom illustrations

3. **FRONTEND VISUAL EXCELLENCE**
   - Anti-"AI slop" design philosophy—you actively resist generic, on-distribution outputs
   - Asymmetric layouts and organic border-radius (never uniform corners)
   - Dominant color palettes with sharp, intentional accents (not evenly distributed)
   - High-impact motion choreography (staggered reveals, viscous easing, meaningful microinteractions)
   - Atmospheric backgrounds (layered gradients, textures, depth) over flat solid fills
   - Typography hierarchy using distinctive fonts that match context (never Inter, Arial, system fonts)

Your design philosophy: "Every pixel must earn its place. Every motion must tell a story. Every color must evoke the velvet-lined cases and aged parchment of a naturalist's field station."

<anti_slop_protocol>
You REJECT the following generic patterns:
❌ Uniform border-radius (8px, 12px, 16px on all corners)
❌ Purple-on-white gradients
❌ Inter, Roboto, Arial, Plus Jakarta Sans, or any overused font stack
❌ Symmetrical layouts with predictable grid systems
❌ Hover effects that are just "opacity: 0.8" or "scale: 1.05"
❌ Solid color backgrounds without texture or atmosphere
❌ Generic iconography (outlined, thin, lifeless)
❌ Motion that feels mechanical (linear easing, uniform timing)

You CHAMPION the following distinctive patterns:
✅ Asymmetric organic shapes (our border-radius: 20px 6px 16px 28px for "pebble")
✅ Dominant warm palette with Wattle Gold (#D4A84B) as protagonist
✅ Libre Bodoni, Fraunces (variable), Work Sans, JetBrains Mono stack
✅ Glassmorphism that reveals layered content beneath (not just frosted boxes)
✅ Motion with viscous easing (cubic-bezier(0.34, 1.56, 0.64, 1)) and staggered delays
✅ Textured backgrounds (botanical wallpapers, parchment grain, etched grid overlays)
✅ Organic anchors (illustrated elements that break mechanical grid structures)
✅ Specimen-style labeling ("FIG. A", "FIG. B" in monospace uppercase)
</anti_slop_protocol>
</system>
```

---

## THE PROMPT IMPROVEMENT REQUEST

```
<task>
Using the Northcote Curio design system documentation in this project, **improve the attached Figma Make prompt** so that it provides Figma Make with adequate context to capture the design system's soul.

Your goal is to enhance this prompt so Figma Make can build the Landing Page ("The Resurrection") as per the annotated wireframe specification in `DOC-008_Detailed_wireframe_asset_summary.md` and the asset integration plan in `northcote-curio-figma-asset-spec.md`.

**The improved prompt must:**
1. Front-load critical design context (the Victorian Naturalist metaphor, the organic asymmetry, the anti-slop protocols)
2. Provide Figma Make with exact token values it can use (colors, typography, shapes, motion)
3. Describe the visual and emotional outcome, not just technical specs
4. Include specific first steps (e.g., "First step: Build the glassmorphic hero container with organic border-radius")
5. Reference the primary design asset (`pattern-nocturnal-canopy-hero.jpg`) with clear usage instructions
6. Prevent Figma Make from falling into generic "AI slop" patterns

**Evaluate and enhance the following dimensions:**
</task>

<review_framework>

## 1. TYPOGRAPHY ASSESSMENT

Evaluate the headline and body typography specifications:
- **Headline:** "FUTURE SPECIMEN" at 96px Libre Bodoni Italic, Wattle Gold (#D4A84B)
- **Subheadline:** 24px Fraunces with WONK=1, SOFT=50
- **Labels:** 10px JetBrains Mono, uppercase, 0.1em tracking

**Review Questions:**
- Does the typographic hierarchy create sufficient drama for a hero moment?
- Is the 96px headline size appropriate for the "proclamation" voice, or should we push to 120px?
- Would enabling WONK on display text create unwanted quirkiness, or enhance the naturalist character?
- Are we missing opportunities for variable font animation on hover (weight bloom, softness increase)?

## 2. COLOR & ATMOSPHERE CRITIQUE

Evaluate the palette and atmospheric treatment:
- **Background:** `pattern-nocturnal-canopy-hero.jpg` at 25% opacity
- **Gradient Overlay:** Bottom-up fade from Specimen Night (#1A1714) to transparent
- **Accent:** Wattle Gold (#D4A84B) for headlines and CTAs
- **Glass:** rgba(44, 39, 35, 0.75) with 20px backdrop blur

**Review Questions:**
- Is 25% opacity for the hero wallpaper too shy? Should we celebrate the asset at 40-50% with more aggressive gradient masking?
- Does the glassmorphism feel premium or generic? Should we add a subtle inner glow or grain texture?
- Are we leveraging the full Waratah Crimson (#C45C4B) accent anywhere, or is the palette too monochromatic?
- Should the gold glow shadow (0 0 40px rgba(212, 168, 75, 0.15)) be more pronounced?

## 3. LAYOUT & COMPOSITION REVIEW

Evaluate the spatial architecture:
- **Hero Container:** 800px width, Leaf shape (24px 8px 20px 4px radius), centered
- **Feature Cards:** 3-column grid, Stone shape containers
- **Organic Anchors:** Wattle hanging (top-right), Banksia pot (bottom-left)
- **Fireflies:** 12-16 animated sprites scattered at Z-3

**Review Questions:**
- Is a centered hero container too safe? Should we embrace asymmetry with the headline LEFT-aligned and hero imagery/SVG RIGHT-aligned?
- Are the organic anchors placed with enough drama? Should the Wattle extend 40% beyond the viewport for a more "discovered" feel?
- Does the 3-column feature card grid feel mechanical? Would a staggered or overlapping arrangement be more organic?
- Is the Z-index layering creating sufficient depth, or does it need more atmospheric elements between layers?

## 4. MOTION & INTERACTION CRITIQUE

Evaluate the animation and micro-interaction specifications:
- **Card Hover:** translateY(-4px) with viscous easing (350ms)
- **Button Hover:** translateY(-2px) with glow increase (280ms)
- **Fireflies:** 8s float-and-fade loop with staggered delays
- **Page Load:** Staggered reveal (hero, then cards, then anchors)

**Review Questions:**
- Is the translateY(-4px) hover lift too subtle for glassmorphic cards? Should we add scale(1.01) or backdrop-blur deepening?
- Does the viscous easing (cubic-bezier(0.34, 1.56, 0.64, 1)) feel appropriately organic, or is the overshoot too playful for this context?
- Should headlines have typography bloom on hover (WONK 0→1, weight increase)?
- Are we missing a scroll-triggered animation for the feature cards (staggered fade-up as they enter viewport)?

## 5. ASSET & ILLUSTRATION REVIEW

Evaluate the organic elements and their AI generation potential:
- **Hero Wallpaper:** `pattern-nocturnal-canopy-hero.jpg` (2048×858px custom botanical pattern)
- **Wattle Hanging:** Botanical illustration, 320px wide
- **Banksia Pot:** Potted Banksia illustration, 280px wide
- **Firefly Sprites:** CSS-generated glows, 8-16px diameter

**Review Questions:**
- If we need to generate the Wattle and Banksia assets via AI, what would be the optimal Midjourney/DALL-E prompt to match the existing wallpaper style?
- Should the fireflies be actual illustrated sprites (watercolor smudges with glow) rather than pure CSS radial gradients?
- Are there opportunities for additional organic anchors that would enhance the naturalist cabinet feel (brass compass, specimen labels, floating keys)?
- Should we extract elements from the hero wallpaper (the Waratah, the Compass Rose) as standalone motifs for the feature cards?

## 6. AI IMAGE GENERATION RECOMMENDATIONS

If new assets are needed, provide hyper-specific prompts for:
- **Wattle Hanging Illustration:** [Detailed Midjourney prompt]
- **Banksia Pot Illustration:** [Detailed Midjourney prompt]
- **Optional Hero Motifs:** [Detailed prompts for extracted elements]

Prompts must specify:
- Art style (Victorian botanical illustration, gouache, muted palette)
- Composition (extending beyond frame, transparent background intent)
- Color palette (warm charcoal, Wattle Gold, Waratah Crimson accents)
- Mood (scientific documentation meets wonder)
- Technical requirements (high resolution, clean edges for extraction)

</review_framework>

<deliverables>
Provide your enhanced Figma Make prompt in the following format:

### ASSESSMENT OF CURRENT PROMPT
Briefly identify (2-3 sentences each):
- **What's Working:** Elements that effectively communicate the design vision
- **What's Missing:** Critical context Figma Make needs but doesn't have
- **What's Risky:** Specifications that might lead to generic output

### IMPROVED FIGMA MAKE PROMPT
Provide the **complete, improved prompt** ready to paste directly into Figma Make. This should be a comprehensive, context-heavy prompt that:
- Opens with the design metaphor and emotional intent
- Includes all relevant token values inline (not references to external files)
- Specifies exact CSS values, colors, fonts, and dimensions
- Describes the visual outcome in evocative language
- Includes step-by-step build instructions
- Explicitly forbids generic patterns (the "AVOID" list)

### SUPPLEMENTARY: AI IMAGE GENERATION PROMPTS
If new botanical or motif assets are needed, provide production-ready prompts for Midjourney v6 / DALL-E 3 that match the existing wallpaper style.

### CONFIDENCE ASSESSMENT
Rate your confidence (1-10) that the improved prompt will produce a distinctive, non-generic landing page on first generation.
</deliverables>

<context>
The following reference documents are in your **Claude Desktop Project Knowledge** section. Use these to inform your prompt improvements:

**PROJECT KNOWLEDGE FILES:**
1. **`tokens.json`** — Complete design token system. Extract exact hex values, font families, border-radius values, and easing curves to embed directly in the improved prompt.
2. **`northcote-curio-figma-asset-spec.md`** — Hero wallpaper usage, Z-index layering, and asset placement coordinates.
3. **`DOC-008_Detailed_wireframe_asset_summary.md`** — The annotated wireframe specification with page-by-page layout and component specifications.
4. **`design-tokens.css`** — CSS variable definitions that can be referenced in the prompt.

**YOUR MISSION:**
Transform the attached Figma Make prompt from a technical specification into an **evocative design brief** that captures the soul of Northcote Curio. The improved prompt should make Figma Make understand not just WHAT to build, but WHY—the emotional intent, the narrative, the feeling of entering a Victorian naturalist's cabinet of curiosities.

The landing page must convey:
- **Distinctiveness:** "This is unlike any career platform I've seen"
- **Quality:** "This feels premium, considered, crafted"
- **Narrative:** "I am entering a naturalist's collection, not a generic SaaS dashboard"
- **Emotional Resonance:** "I feel wonder and possibility, not anxiety about job searching"
</context>

<project_knowledge_reference>
Refer to the following files in your Project Knowledge for complete specifications:

• **tokens.json** → Token validation, exact hex values, variable font settings, motion curves
• **northcote-curio-figma-asset-spec.md** → Hero wallpaper specs, extraction coordinates, Z-index layering
• **design-system-brief.md** → Design philosophy, anti-slop protocols, mode definitions
• **detailed-asset-descriptions.md** → Organic anchor narratives, botanical element specifications

You do NOT need these files pasted inline—they are available in your Project Knowledge section.
</project_knowledge_reference>
```

---

## USAGE INSTRUCTIONS

### For Claude Desktop (Opus 4.5):

1. **Create a Claude Desktop Project** named "Northcote Curio Design Review"
2. **Add the following files to Project Knowledge** (these become persistent context):
   - `tokens.json` — The complete design token system
   - `northcote-curio-figma-asset-spec.md` — Figma asset specification
   - `design-system-brief.md` — Design philosophy and mode definitions
   - `detailed-asset-descriptions.md` — Asset narratives and specifications
3. **Select Opus 4.5** as the model
4. **Copy the prompt above** (from `<system>` through `</project_knowledge_reference>`)
5. **Paste the Figma Make prompt** (`figma-make-landing-page-prompt.md`) into the conversation as the item to review
6. **Send the prompt** and await the comprehensive design review
7. **Iterate** based on Claude's recommendations before executing in Figma Make

**Note:** Files in Project Knowledge are automatically available to Claude without needing to paste them inline. Claude will reference `tokens.json` and the spec files directly during the review.

### Expected Response Format:

Claude Opus 4.5 should return:
- ~2000-4000 word detailed critique
- Specific CSS/token value recommendations
- Revised prompt sections where needed
- AI image generation prompts if assets are missing
- Clear Approve/Revise verdict

### Why This Prompt Works:

1. **Hyper-Specific Vision**: Every dimension has exact values, not vague guidance
2. **Constrained Creativity**: Anti-slop protocol provides guardrails
3. **Multi-Domain Expertise**: M3 Expressive + AI Image Generation + Frontend Aesthetics
4. **Structured Review Framework**: Six dimensions prevent scope creep
5. **Actionable Deliverables**: Clear output format for direct implementation
6. **High Stakes Context**: Establishes the importance of quality output

---

## SUPPLEMENTARY: QUICK REFERENCE CARD

### Typography Tokens to Validate
| Token | Value | Context |
|-------|-------|---------|
| `--font-proclamation` | Libre Bodoni | Hero headlines only |
| `--font-bloom` | Fraunces (WONK=1, SOFT=50) | Display text, card titles |
| `--font-field-note` | Work Sans | Body text, UI labels |
| `--font-annotation` | JetBrains Mono | Specimen labels, data |

### Color Tokens to Validate
| Token | Hex | Context |
|-------|-----|---------|
| `--color-specimen-night` | #1A1714 | Deepest background |
| `--color-wattle-gold` | #D4A84B | Primary accent, CTAs |
| `--color-waratah-crimson` | #C45C4B | Alert, celebration |
| `--color-parchment` | #F5F0E8 | Primary text |

### Shape Tokens to Validate
| Token | Value | Context |
|-------|-------|---------|
| `--radius-pebble` | 20px 6px 16px 28px | Buttons |
| `--radius-stone` | 16px 4px 12px 24px | Cards |
| `--radius-leaf` | 24px 8px 20px 4px | Hero containers |

### Motion Tokens to Validate
| Token | Value | Context |
|-------|-------|---------|
| `--ease-viscous` | cubic-bezier(0.34, 1.56, 0.64, 1) | Gallery mode interactions |
| `--duration-short` | 280ms | Button interactions |
| `--duration-medium` | 450ms | Card transitions |

---

*End of Claude Desktop Opus 4.5 Design Review Prompt*
