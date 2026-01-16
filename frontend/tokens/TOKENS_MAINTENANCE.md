# Token Governance & Maintenance

## Principles
1. **Single Source of Truth:** `src/design-tokens.json` is the ONLY place tokens are defined. `globals.css` and `tailwind.config.js` are consumers/derivatives.
2. **Semantic First:** Do not add tokens based on appearance (e.g., `blue-500`). Add tokens based on role (e.g., `info-surface`).
3. **Immutable Core:** The core botanical palette (`wattle`, `waratah`, `eucalypt`) is fixed. New colors must start as aliases of these.

## Adding New Tokens
1. **Justify:** Is this a new *semantic* role? Or just a variation of an existing one?
2. **Define:** Add to `src/design-tokens.json` under the appropriate category.
3. **Propagate:**
   - Add CSS variable mapping in `src/globals.css`.
   - Add Tailwind mapping in `tailwind.config.js`.
4. **Document:** Update `docs/TOKENS_SPECIFICATION.md`.

## Verifying Correctness
Run the validation script (coming soon) or check compliance:
```bash
npm run design-system:audit
```

## Review Process
- All token changes require a **Design Review**.
- Check for contrast compliance (WCAG AA minimum, AAA preferred).
- Check for philosophical alignment (Field Station metaphor).
