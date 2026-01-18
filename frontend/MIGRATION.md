# Migration Guidelines

## 1. Sources of Truth
- **Tokens**: `src/theme/tokens.json` is the ONLY source of truth. Do NOT use `design-tokens.json` (deprecated).
- **Mode**: Use `useMode()` from `src/context/ModeContext`. Do NOT implement local mode toggles.

## 2. Component Usage
- **New Development**: Use components from `src/components/ui/` (Northcote Native) or `src/design-system/`.
- **Legacy UI**: Use `src/legacy/ui/` only for existing code. Do NOT add new components here.
- **Feature Components**: Business logic UI (e.g., `ApplicationCard`) lives in `src/features/<feature>/components/`.

## 3. Styling
- Use **Northcote Tokens** (e.g., `text-primary-wattle-gold`) via Tailwind.
- Avoid hardcoded hex values.
- Avoid generic Tailwind colors (`bg-zinc-900`) unless prototyping.

## 4. Navigation
- Add new routes to `src/config/navigation.schema.ts`.
- `GalleryShell` and `LaboratoryShell` automatically consume this schema.
