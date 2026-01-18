#!/bin/bash
PROJECT_ROOT="/Users/okgoogle13/Desktop/careercopilot"
SKILLS_SRC="$PROJECT_ROOT/claude-config/skills"

package_skill() {
  local name=$1
  local desc=$2
  local long_desc=$3
  echo "Packaging $name..."
  rm -f "$PROJECT_ROOT/$name.zip"
  TEMP_DIR="/tmp/skill_pkg_$name"
  rm -rf "$TEMP_DIR"
  mkdir -p "$TEMP_DIR/$name"
  cp -r "$SKILLS_SRC/$name/." "$TEMP_DIR/$name/"
  cat > "$TEMP_DIR/$name/SKILL.md" << EOF
---
name: $name
description: $desc
---

# $name

$long_desc
EOF
  (cd "$TEMP_DIR" && zip -r "$PROJECT_ROOT/$name.zip" "$name" > /dev/null)
  rm -rf "$TEMP_DIR"
  echo "✅ $name.zip ready!"
}

package_skill "design-skills" \
  "M3 Expressive Design System - aesthetic creation, validation, typography, shape, color, layout, and motion patterns for Northcote Curio" \
  "Complete design system utilities including aesthetic creation, validation, typography, and motion patterns."

package_skill "token-orchestrator" \
  "Design Token Orchestration Engine - generates, validates, and manages design tokens for Northcote Curio components" \
  "Design token generation and management system for Northcote Curio."

package_skill "react-component-scaffolder" \
  "React Component Scaffolder - generates M3-compliant React components with design tokens" \
  "Automated React component generation with M3 design pattern compliance."

package_skill "jest-test-scaffolder" \
  "Jest Test Scaffolder - generates comprehensive unit and integration tests for React components" \
  "Automated Jest test generation for React components."

package_skill "storybook-scaffolder" \
  "Storybook Scaffolder - generates component stories and documentation" \
  "Storybook story generation and component documentation."

ls -lh "$PROJECT_ROOT"/*.zip
