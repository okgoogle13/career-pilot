#!/usr/bin/env python3
import os
import re
import json
from pathlib import Path
from datetime import datetime

# Configuration
PROJECT_ROOT = Path("frontend/src/components")
TOKENS_FILE = Path("frontend/src/theme/tokens.json")
EXCLUDE_DIRS = ["_deprecated", "__tests__", "__mocks__", "node_modules"]

def find_components(root_dir):
    components = []
    for path in root_dir.rglob("*.tsx"):
        if any(excluded in str(path) for excluded in EXCLUDE_DIRS):
            continue
        if path.name.endswith(".test.tsx") or path.name.endswith(".stories.tsx"):
            continue
        components.append(path)
    return components

def analyze_component(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for hardcoded colors
    hex_colors = len(re.findall(r'#[0-9A-Fa-f]{6}', content))
    
    # Check for token usage (approximate)
    has_tokens = "tokens." in content or "design-tokens" in content
    
    # Check for Gallery/Laboratory modes
    has_modes = "gallery" in content and "laboratory" in content
    
    # Check for MUI
    has_mui = "@mui" in content
    
    return {
        "name": file_path.stem,
        "path": str(file_path.relative_to(PROJECT_ROOT.parent.parent)),
        "hex_count": hex_colors,
        "has_tokens": has_tokens,
        "has_modes": has_modes,
        "has_mui": has_mui,
        "lines": len(content.splitlines())
    }

def generate_report(components):
    # Sort: Migrated (M3 prefix or status badge) first, then others
    components.sort(key=lambda x: (not x["name"].startswith("M3"), x["name"]))
    
    print(f"# 📊 Migration Status Snapshot")
    print(f"**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
    
    print(f"## Component Inventory ({len(components)} item{'s' if len(components) != 1 else ''})")
    print("\n| Component | Status | Tokens? | Modes? | MUI? | Issues |")
    print("|-----------|--------|---------|--------|------|--------|")
    
    migrated_count = 0
    clean_count = 0
    
    for c in components:
        # Determine Status
        status = "Pending"
        if c["name"].startswith("M3") or c["name"] == "StatusBadge":
            status = "✅ Migrated"
            migrated_count += 1
        elif c["hex_count"] > 0 or c["has_mui"]:
            status = "⚠️ Legacy"
        
        # Determine Issues
        issues = []
        if c["hex_count"] > 0:
            issues.append(f"{c['hex_count']} hex colors")
        if c["has_mui"]:
            issues.append("Has MUI")
        if not c["has_modes"] and status == "✅ Migrated":
            issues.append("Missing modes?")
            
        issue_str = ", ".join(issues) if issues else "✨ Clean"
        if not issues: clean_count += 1
        
        print(f"| `{c['name']}` | {status} | {'✅' if c['has_tokens'] else '❌'} | {'✅' if c['has_modes'] else '❌'} | {'❌' if c['has_mui'] else '✅'} | {issue_str} |")
        
    print("\n## Summary Metrics")
    print(f"- **Migrated**: {migrated_count} / {len(components)} ({(migrated_count/len(components)*100):.1f}%)")
    print(f"- **Clean (No hex/MUI)**: {clean_count} / {len(components)}")
    print(f"- **Token Usage**: {sum(1 for c in components if c['has_tokens'])} components")

if __name__ == "__main__":
    try:
        if not PROJECT_ROOT.exists():
            print(f"Error: {PROJECT_ROOT} does not exist. Run from project root.")
            exit(1)
            
        comps = find_components(PROJECT_ROOT)
        data = [analyze_component(c) for c in comps]
        generate_report(data)
    except Exception as e:
        print(f"Error: {e}")
