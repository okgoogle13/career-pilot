# 🍌 "Nano Banana Pro" AI Prompt Library
## Northcote Curio Asset Generation Suite

**Document ID:** AI-PROMPTS-NANO-001  
**Target Model:** Midjourney v6 / DALL-E 3 (High fidelity mode)  
**Persona:** "Nano Banana Pro" — Maximum instruction adherence, rich texture, scientific accuracy.

---

# 🧬 THE GENETIC CODE (System Prompt)

**Append this block to every generation to ensure brand DNA.**

> **Master Style Token:**
> A high-resolution 19th-century botanical lithograph style illustration. Scientific accuracy with artistic flair. Dramatic chiaroscuro lighting, illuminated as if by a lantern in a dark room. Rich textures of ink bleed, etching lines, and gouache. Deep shadows vs. luminous highlights.
>
> **Atmosphere:** Victorian field station, nocturnal, wondrous, archival.
> **Key Colors:** Deep Charcoal (#1A1714), Wattle Gold (#D4A84B), Waratah Crimson (#C45C4B), Parchment Cream (#F5F0E8).
> **Negative Prompt:** Vector art, flat design, modern ui, cartoon, 3d render, plastic, bright daylight, white background, stock photo.
>
> **REFERENCE STRATEGY (The Secret Sauce):**
> Use your existing `pattern-nocturnal-canopy-hero.jpg` as a **Style Reference**.
> *   **Midjourney:** Add `--sref [URL to hero wallpaper]` to every prompt.
> *   **DALL-E:** Upload the wallpaper first and ask: "Use this image's art style, specifically the lighting and texture, to generate..."

---

# 🌺 GALLERY MODE ASSETS

## 1. The Curio Wallpaper (Hero Background)
**Reference:** `DOC-010` Item 1
**Goal:** A seamless, rich, dark botanical tapestry.

> **Subject:** A dense, seamless dark botanical wallpaper pattern.
> **Elements:** Large Waratah blooms (crimson), clustered Golden Wattle sprays, textured Banksia cones, and Kangaroo Paw stems. Interspersed with subtle brass scientific instruments (compass, key) and a single scattered polyhedral dice.
> **Composition:** Crowded but balanced "horror vacui" style. No clear focal point; designed to be a background texture.
> **Lighting:** Very low key. Deep charcoal shadows. Specimens are lit by flickering lantern light, glowing against the dark.
> **Parameters:** --tile --ar 1:1 --stylize 250 --v 6.0
> **Style DNA:** [Insert Master Style Token]

## 2. The Sentry (Kookaburra Mascot)
**Reference:** `DOC-010` Item 5
**Goal:** A character with soul and intelligence.

> **Subject:** A magnificent Laughing Kookaburra (Dacelo novaeguineae) perched on a Eucalyptus branch.
> **Pose:** Profile view, head slightly turned to look at the viewer with an intelligent, "checking" expression.
> **Details:** Nestled among Waratah and Wattle flowers. The bird's feathers are detailed with watercolor wash and ink lines. Soft edges, no harsh cutouts.
> **Background:** Isolated on a solid black background for easy extraction.
> **Style DNA:** [Insert Master Style Token]

## 3. The Core Specimens (Isolated Botanicals)
**Reference:** `DOC-010` Item 10 / Item 20
**Goal:** High-resolution individual assets.

### A. Waratah (The Heart)
> **Subject:** Single Waratah flower head.
> **Detail:** Deep crimson petals, waxy texture, viewing the intricate center cone. Thick woody stem.
> **Lighting:** Rim lighting to separate from dark background.
> **Style DNA:** [Insert Master Style Token]

### B. Wattle Spray (The Hanging Anchor)
> **Subject:** A hanging branch of Golden Wattle.
> **Detail:** Fluffy yellow spherical blooms, smooth green phyllodes. Gravity affecting the drape of the branch.
> **Style DNA:** [Insert Master Style Token]

### C. Banksia Cone (The Grounding Anchor)
> **Subject:** A dried Banksia seed pod.
> **Detail:** Gnarled, woody texture. Open "mouths" (follicles). Warm amber and brown tones. Heavy shadow at the base.
> **Style DNA:** [Insert Master Style Token]

---

# 🔬 LABORATORY MODE ASSETS

## 4. Laboratory Parchment (Background Texture)
**Reference:** `DOC-010` Item 7
**Goal:** A subtle, workable background surface.

> **Subject:** A macro shot of aged, high-quality archival paper or parchment.
> **Texture:** Subtle grain, microscopic fibers, faint tea-stain discoloration at the edges. No text, no drawings, just the material itself.
> **Color:** Warm cream/beige (`#F5F0E8`).
> **Lighting:** Even, flat lighting (scanner style) but with texture depth.
> **Parameters:** --tile --ar 1:1 --no vignette
> **Style DNA:** [Insert Master Style Token]

## 5. The Anatomical Grid (Overlay)
**Reference:** `DOC-010` Item 11
**Goal:** A technical overlay for precision.

> **Subject:** An overlay of scientific measurement lines.
> **Elements:** Fine ruled grid lines, millimeter markings, caliper scales, handwritten "Fig." numbers.
> **Style:** Copperplate etching style. Sepia ink lines on a specific white background (easy to multiply blend).
> **Composition:** Asymmetric, like a page from an engineering notebook.
> **Style DNA:** [Insert Master Style Token] - *Emphasize "Etching" and "Line art" over "Lithograph"*

## 6. The Navigator (Technical Compass)
**Reference:** `DOC-010` Item 19
**Goal:** A functional UI instrument.

> **Subject:** A technical diagram of a compass rose.
> **Style:** Clean pen-and-ink line art. No shading, no texture.
> **Elements:** Cardinal points (N, S, E, W), geometric circles, degree markings.
> **View:** Top-down plan view. Perfect symmetry.
> **Background:** Isolated on white.
> **Style DNA:** [Insert Master Style Token] - *Strictly "Technical Diagram"*

---

# 🐘 WHIMSY & ATMOSPHERE

## 7. The Unexpected Elephant
**Reference:** `DOC-010` Item 7 (Variant)
**Goal:** Delight.

> **Subject:** A small pygmy elephant.
> **Style:** Albrecht Dürer etching style. Cross-hatching.
> **Pose:** Standing calmly, perhaps holding a wattle sprig in its trunk.
> **Size:** Detailed but feels "small" in the frame.
> **Style DNA:** [Insert Master Style Token]

## 8. Firefly Swarm (Particle Asset)
**Goal:** Bioluminescence.

> **Subject:** A scatter of glowing firefly lights.
> **Detail:** No insect bodies, just the emitted light. Soft, warm gold orbs (`#E8C963`) with varying blur radius (bokeh) content.
> **Background:** Solid black.
> **Style DNA:** [Insert Master Style Token]

---

# 🛠️ PROMPTING INSTRUCTIONS

1.  **Copy** the "Genetic Code" block.
2.  **Paste** it at the end of your chosen subject prompt.
3.  **Adjust** aspect ratio (`--ar`) if generating for a specific shape (e.g., hanging wattle needs tall aspect `--ar 2:3`).
4.  **Upscale** the best result.
5.  **Remove Background** using Photoshop or standard tools to create your PNG asset.
