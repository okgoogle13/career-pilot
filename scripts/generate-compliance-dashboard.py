#!/usr/bin/env python3
import os
import re
from pathlib import Path

def check_compliance(content):
    score = 0
    checks = {
        "federation_typography": r"font-(proclamation|bloom|field-note|annotation)",
        "organic_asymmetry": r"radius-(pebble|stone|leaf|petal|seed)",
        "northcote_colors": r"(--sys-color|primary-wattle|tertiary-waratah|surface-shared|surface-gallery|secondary-flannel)",
        "viscous_motion": r"ease-viscous",
        "aria_labels": r"aria-(label|labelledby)",
    }
    
    results = {}
    for name, pattern in checks.items():
        match = re.search(pattern, content)
        results[name] = bool(match)
        if match: score += 20
        
    return score, results

def generate_dashboard():
    components_dir = Path("frontend/src/components")
    components = []
    
    for file_path in components_dir.rglob("*.tsx"):
        if "node_modules" in str(file_path): continue
        if ".test." in str(file_path): continue
        if ".stories." in str(file_path): continue
        
        with open(file_path, 'r') as f:
            content = f.read()
            
        score, results = check_compliance(content)
        components.append({
            "name": file_path.name,
            "path": str(file_path),
            "score": score,
            "results": results
        })
        
    # Generate Markdown
    md = "# 🪞 Northcote Curio - Design Compliance Dashboard\n\n"
    md += "## Summary\n"
    avg_score = sum(c['score'] for c in components) / len(components) if components else 0
    md += f"- **Target System**: Northcote Curio v2.0\n"
    md += f"- **Average Compliance**: {avg_score:.1f}%\n"
    md += f"- **Total Components**: {len(components)}\n\n"
    
    md += "### 📋 Component Breakdown\n\n"
    md += "| Component | Score | Typography | Shape | Colors | Motion | ARIA |\n"
    md += "| :--- | :--- | :---: | :---: | :---: | :---: | :---: |\n"
    
    for c in sorted(components, key=lambda x: x['score'], reverse=True):
        status = "✅" if c['score'] == 100 else "⚠️" if c['score'] > 50 else "❌"
        res = c['results']
        row = f"| {c['name']} | {c['score']}% {status} | {'✅' if res['federation_typography'] else '❌'} | {'✅' if res['organic_asymmetry'] else '❌'} | {'✅' if res['northcote_colors'] else '❌'} | {'✅' if res['viscous_motion'] else '❌'} | {'✅' if res['aria_labels'] else '❌'} |"
        md += row + "\n"
        
    with open("DESIGN_COMPLIANCE_DASHBOARD.md", "w") as f:
        f.write(md)
    
    print(f"✅ Dashboard generated at DESIGN_COMPLIANCE_DASHBOARD.md")

if __name__ == "__main__":
    generate_dashboard()
