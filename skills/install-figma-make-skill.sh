#!/bin/bash

# Figma Make Prompt Engineer Skill Installer
# Run this script to install the skill in Claude Desktop

echo "🎨 Installing Figma Make Prompt Engineer Skill..."
echo ""

# Find Claude Desktop's skills directory
SKILL_DIRS=(
    "$HOME/Library/Application Support/Claude/skills"
    "$HOME/.config/claude/skills"
    "$HOME/.claude/skills"
)

INSTALLED=false

for SKILL_DIR in "${SKILL_DIRS[@]}"; do
    if [ -d "$SKILL_DIR" ]; then
        echo "✅ Found Claude skills directory: $SKILL_DIR"
        
        # Create skill directory
        mkdir -p "$SKILL_DIR/figma-make-prompt-engineer"
        
        # Copy skill file
        cp "/Users/okgoogle13/Desktop/careercopilot/skills/figma-make-prompt-engineer/SKILL.md" \
           "$SKILL_DIR/figma-make-prompt-engineer/SKILL.md"
        
        if [ -f "$SKILL_DIR/figma-make-prompt-engineer/SKILL.md" ]; then
            echo "✅ Skill installed successfully!"
            echo "   Location: $SKILL_DIR/figma-make-prompt-engineer/SKILL.md"
            INSTALLED=true
            break
        fi
    fi
done

if [ "$INSTALLED" = false ]; then
    echo "⚠️  Could not find Claude Desktop skills directory."
    echo ""
    echo "📋 Manual installation instructions:"
    echo "1. Open Claude Desktop"
    echo "2. Go to Settings → Skills"
    echo "3. Click 'Add Skill' or 'Upload Custom Skill'"
    echo "4. Select: /Users/okgoogle13/Desktop/careercopilot/skills/figma-make-prompt-engineer/SKILL.md"
fi

echo ""
echo "🔄 Next steps:"
echo "1. Restart Claude Desktop (Cmd+Q, then reopen)"
echo "2. The skill should appear in your Skills list"
echo "3. Test it by saying: 'Create a Figma Make prompt for the landing page'"
