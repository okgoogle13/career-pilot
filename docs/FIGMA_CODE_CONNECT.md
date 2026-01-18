# Figma Code Connect Setup Guide

This guide explains how to connect your React components to Figma using Code Connect, ensuring AI-generated code uses your design system instead of recreating components.

## What is Code Connect?

Code Connect creates a hard link between Figma components and React code:
- **Without Code Connect:** AI sees a button → Writes `<div className="bg-orange-500...">` (Slop)
- **With Code Connect:** AI sees a button → Writes `<Button variant="primary" />` (Clean)

## Prerequisites

- Figma account with access to your design file
- Node.js and npm installed
- `@figma/code-connect` package (already installed)

## Setup Steps

### 1. Generate Figma Personal Access Token

1. Go to [Figma Settings](https://www.figma.com/settings)
2. Navigate to **Personal Access Tokens**
3. Click **Create new token**
4. Name it: `Code Connect - CareerCopilot`
5. Select scope: **Code Connect: Write**
6. Click **Generate token**
7. **Copy and save the token** (you won't see it again)

### 2. Connect Components to Figma

Run the interactive CLI tool:

```bash
npx figma connect
```

The CLI will:
1. Ask for your Personal Access Token (paste the token from Step 1)
2. Scan your codebase for `.figma.tsx` files
3. Show you a list of components to connect
4. Open Figma in your browser to select the matching component

### 3. Link Each Component

For each component mapping file:

#### TechCard
- **File:** `frontend/src/components/shared/TechCard.figma.tsx`
- **Action:** In Figma, select the TechCard component from your design system
- **Layers to map:**
  - `Content` → Main content slot
  - `ClassName` → Optional CSS override

#### SplitHeader
- **File:** `frontend/src/components/shared/SplitHeader.figma.tsx`
- **Action:** In Figma, select the SplitHeader component
- **Layers to map:**
  - `Title Text` → Main title
  - `Highlight Text` → Highlighted word
  - `Subtitle` → Subtitle text

#### Button (The Pebble)
- **File:** `frontend/src/components/ui/button.figma.tsx`
- **Action:** In Figma, select the Button component
- **Layers to map:**
  - `Label` → Button text
  - `Type` → Variant (Primary/Secondary/Outline/Ghost/Destructive/Link)
  - `Size` → Size (Default/Small/Large/Icon)
  - `Disabled` → Boolean state

### 4. Verify Connection

After connecting, you can verify by:

1. Opening Figma Dev Mode
2. Selecting a connected component
3. Checking the **Code** panel → Should show React code using your components

## Usage

Once connected, when you or AI tools use Figma Dev Mode:
- The code panel will show the exact React component to use
- No more guessing CSS or recreating components
- 100% adherence to your Electric Alchemist design system

## Troubleshooting

### "Component not found"
- Ensure the component exists in your Figma file
- Check that you're selecting the correct component variant

### "Token invalid"
- Regenerate your Personal Access Token
- Ensure it has "Code Connect: Write" scope

### "File not detected"
- Verify `.figma.tsx` files are in the correct locations
- Check `figma.config.json` includes the right paths

## Maintenance

When you add new components to your design system:
1. Create a new `.figma.tsx` mapping file
2. Run `npx figma connect` again
3. Link the new component in Figma

## Reference

- [Figma Code Connect Documentation](https://www.figma.com/developers/code-connect)
- [Component Mapping Files](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/frontend/src/components/)
- [Configuration](file:///Users/okgoogle13/.gemini/antigravity/playground/primordial-quasar/figma.config.json)
