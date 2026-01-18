#!/usr/bin/env python3
import re
import json
import os
from pathlib import Path

# NORTHCOTE CURIO - SYMBOLIC MAPPINGS
# This engine maps legacy/generic values to the "Moonlight on Velvet" design system.

COLOR_MAPPINGS = {
    # Primary/Gold (Wattle)
    "#D4A84B": "var(--sys-color-primary-wattle-gold)",
    "#E8C963": "var(--sys-color-primary-wattle-glow)",
    "#8B7A35": "var(--sys-color-primary-wattle-shadow)",
    
    # Tertiary/Red (Waratah)
    "#C45C4B": "var(--sys-color-tertiary-waratah-crimson)",
    "#E07865": "var(--sys-color-tertiary-waratah-glow)",
    "#7A3A2E": "var(--sys-color-tertiary-waratah-stem)",
    
    # Surface/Neutrals
    "#1A1714": "var(--sys-color-surface-shared-specimen-night)",
    "#F5F0E8": "var(--sys-color-on-surface-parchment)",
    "#A8A097": "var(--sys-color-secondary-flannel-flower)",
    
    # Status
    "#7A9E82": "var(--sys-color-status-gallery-ghost-gum)", # Success
    "#9B8AAD": "var(--sys-color-status-gallery-native-violet)", # Progress
    "#D4885C": "var(--sys-color-status-gallery-banksia-orange)", # Warning
}

RADIUS_MAPPINGS = {
    "pebble": "var(--sys-shape-organic-asymmetry-pebble)",
    "stone": "var(--sys-shape-organic-asymmetry-stone)",
    "leaf": "var(--sys-shape-organic-asymmetry-leaf)",
    "petal": "var(--sys-shape-organic-asymmetry-petal)",
}

TYPOGRAPHY_STACKS = {
    "proclamation": "font-proclamation",  # Display/Hero
    "bloom": "font-bloom",              # Emotional headers
    "field-note": "font-field-note",     # Body
    "annotation": "font-annotation",     # Data/Mono
}

def audit_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    report = {
        "file": str(file_path),
        "hardcoded_colors": [],
        "generic_fonts": [],
        "generic_shapes": [],
        "recommendations": []
    }
    
    # Audit Colors
    hex_colors = re.findall(r'#[a-fA-F0-9]{3,6}', content)
    for color in hex_colors:
        report["hardcoded_colors"].append(color)
        
    # Audit Fonts
    fonts = ['Inter', 'Roboto', 'Arial', 'system-ui', 'sans-serif', 'serif']
    for font in fonts:
        if font in content:
            report["generic_fonts"].append(font)
            
    # Recommendations
    if report["hardcoded_colors"]:
        report["recommendations"].append("Replace hex colors with --sys-color-* tokens.")
    if report["generic_fonts"]:
        report["recommendations"].append("Replace generic fonts with Federation Stack (font-proclamation, font-bloom, etc.).")
        
    return report

def main():
    # Example usage: scan frontend/src/components
    components_dir = Path("frontend/src/components")
    if not components_dir.exists():
        print("Component directory not found.")
        return

    all_reports = []
    for ext in ['*.tsx', '*.jsx', '*.css']:
        for file_path in components_dir.rglob(ext):
            if "node_modules" in str(file_path): continue
            report = audit_file(file_path)
            if report["hardcoded_colors"] or report["generic_fonts"]:
                all_reports.append(report)
                
    print(json.dumps(all_reports, indent=2))

if __name__ == "__main__":
    main()
