# Asset Extraction Guide
## Extracting UI Elements from the Nocturnal Canopy Wallpaper

**Document ID:** FIGMA-MAKE-ASSETS-001  
**Version:** 1.0  
**Last Updated:** 2026-01-15

---

# 🖼️ SOURCE ASSET

**File:** `pattern-nocturnal-canopy-hero.jpg`  
**Location:** `frontend/public/assets/wallpapers/`  
**Dimensions:** 2048 × 858px

This guide documents the extractable elements from the foundational wallpaper for use as isolated UI assets.

---

# 🌺 EXTRACTABLE BOTANICAL ELEMENTS

## 1. Waratah (Telopea speciosissima)

**Location in Image:** Center, large crimson bloom  
**Approximate Coordinates:** Center mass of composition

### Extraction Notes
- Main bloom with detailed petal structure
- Rich crimson color (`#C45C4B` base)
- Can be used at multiple scales

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Feature card icon | 48-64px, subtle opacity |
| Success/celebration state | Full opacity, animated entrance |
| Empty state illustration | Large, centered |
| Loading spinner inspiration | Rotating petal animation |

---

## 2. Golden Wattle (Acacia pycnantha)

**Location in Image:** Center-left, golden puffball clusters  
**Approximate Coordinates:** Left of center

### Extraction Notes
- Multiple puffball clusters
- Bright golden yellow (`#D4A84B`)
- Organic spray pattern

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Hanging anchor (landing) | 320px, top-right, partially cropped |
| Dashboard decoration | Corner accent |
| Celebration confetti | Small puffball particles |
| Progress indicator | Growing wattle spray |

---

## 3. Banksia Cone

**Location in Image:** Far left and far right edges  
**Approximate Coordinates:** Extreme left/right borders

### Extraction Notes
- Distinctive cone shape
- Orange-brown tones (`#D4885C`)
- Strong textural detail

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Grounding anchor (landing) | 280px, bottom-left, partially cropped |
| Warning state icon | Warm amber version |
| List bullet points | Small, subtle banksia |

---

## 4. Eucalyptus Leaves

**Location in Image:** Throughout, surrounding specimens  
**Sample:** Near wattle cluster (illuminated sage)

### Extraction Notes  
- Varied green tones
- Ghost Gum Sage (`#7A9E82`) for illuminated leaves
- Elongated, smooth shapes

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Success state icon | Sage green |
| Decorative background | Subtle pattern |
| Card embellishments | Corner accents |

---

# 🔧 BRASS INSTRUMENTS

## 5. Brass Compass

**Location in Image:** Bottom-left and top-right areas  
**Approximate Coordinates:** Corner regions

### Extraction Notes
- Detailed brass finish
- Warm metallic tones
- Scientific instrument aesthetic

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Laboratory mode gauge | Functional element |
| Auth page decoration | "Finding direction" metaphor |
| Navigation indicator | Orientation symbol |
| Settings icon | Compass as calibration |

---

## 6. Compass Rose

**Location in Image:** Top-right area  
**Approximate Coordinates:** Upper right quadrant

### Extraction Notes
- Decorative cardinal directions
- Star pattern with ornate details
- Brass/gold coloring

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Navigation header | Orientation metaphor |
| Onboarding progress | "Journey" visualization |
| Map/location features | Direction indicator |

---

## 7. Brass Key

**Location in Image:** Right side of composition  
**Approximate Coordinates:** Right of center

### Extraction Notes
- Ornate Victorian key design
- Warm brass finish
- Authentication metaphor

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Login/Register page | "Entry" metaphor |
| Permission/access UI | Unlock states |
| Password fields | Decorative anchor |
| Security settings | Icon |

---

# 🐘 WHIMSICAL ELEMENTS

## 8. Elephant

**Location in Image:** Lower right area  
**Approximate Coordinates:** Right side, lower third

### Extraction Notes
- Detailed line drawing style
- Adds unexpected whimsy
- Connects scientific rigor with wonder

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Empty states | "Nothing here yet" illustrations |
| Easter eggs | Hidden delights |
| Loading states | Gentle movement |
| Error pages | Friendly presence |

---

## 9. D20 Dice

**Location in Image:** Scattered throughout composition

### Extraction Notes
- Gaming/probability element
- Adds playfulness
- Connects to "taking chances" theme

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Randomization features | Dice roll animation |
| Matching scores | Probability visualization |
| Game-like interactions | Engagement elements |

---

# 🏷️ SPECIMEN LABELS

## 10. "Fig." Labels

**Location in Image:** Throughout, attached to botanical specimens  
**Examples:** "Fig. 1", "Fig. 2", "Fig. 8", etc.

### Typography Notes
- Serif italic for species names
- Regular weight for "Fig." prefix
- Dot notation: "Fig. 1."

### Extraction Value
These labels define the **annotation voice** of the entire design system:

```css
.specimen-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #A8A097;
}

.specimen-taxonomy {
  font-family: 'Libre Bodoni', serif;
  font-style: italic;
  color: #D9D4CC;
}
```

### UI Use Cases
| Context | Treatment |
|---------|-----------|
| Feature card labels | "FIG. A", "FIG. B", "FIG. C" |
| Document sections | "SPECIMEN 01", "SPECIMEN 02" |
| Timeline markers | Sequential numbering |
| Navigation breadcrumbs | "Fig." prefix pattern |

---

# 📦 EXTRACTION WORKFLOW

## Using Figma

1. Import `pattern-nocturnal-canopy-hero.jpg` at full resolution
2. Use **Remove Background** plugin on element of interest
3. Export as PNG with transparency
4. Save to `frontend/public/assets/specimens/` directory

## Using Photoshop/GIMP

1. Open source wallpaper
2. Use magic wand/lasso to select element
3. Refine edges with feathering
4. Export with transparency

## File Naming Convention

```
[element-name]-[variant]-[size].png

Examples:
waratah-crimson-lg.png
wattle-spray-gold-md.png
banksia-cone-orange-sm.png
brass-key-auth.png
compass-rose-nav.png
```

---

# 📍 COORDINATE REFERENCE

For precise extraction, use these approximate regions:

| Element | X Region | Y Region |
|---------|----------|----------|
| Waratah | Center (900-1100px) | Middle (300-550px) |
| Wattle | Left-center (400-700px) | Upper-middle (200-450px) |
| Banksia Left | Far left (0-200px) | Full height |
| Banksia Right | Far right (1850-2048px) | Full height |
| Compass | Corners | Top-right, bottom-left |
| Key | Right (1500-1700px) | Middle (350-500px) |
| Elephant | Right (1600-1850px) | Lower (500-700px) |

---

# ✅ EXTRACTION CHECKLIST

Before using extracted elements:

- [ ] Transparent background (PNG format)
- [ ] Clean edges (no haloing)
- [ ] Appropriate resolution for use case
- [ ] Named according to convention
- [ ] Stored in correct assets directory
- [ ] Documented in asset catalog

---

**End of Asset Extraction Guide**

*Use this document when preparing isolated UI elements from the foundational wallpaper.*
