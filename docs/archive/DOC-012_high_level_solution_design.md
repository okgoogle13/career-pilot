# DOC-012: High-Level Solution Design (HLSD)

**Document ID:** DOC-012-HLSD  
**Version:** 1.0  
**Status:** Unified Technical Architecture  
**Context:** Defines the bridge between Design Tokens (DOC-009) and System Implementation (Code).

---

## 1. Figma-to-Code Traceability Matrix

This matrix maps the "M3 Expressive" design system tokens (defined in Figma) to their concrete implementation in `frontend/tailwind.config.ts`. This ensures no "ghost components" or unmapped styles exist.

### A. The Native Earth Palette (Color Tokens)
| Figma Token Name | Hex Value | Tailwind Class | Implementation Location |
|:---|:---|:---|:---|
| `Brand Primary` (Sage) | `#B4D8AE` | `text-sage`, `bg-sage`, `border-sage` | `theme.colors.sage.DEFAULT` |
| `Brand Secondary` (Terracotta) | `#E09F7D` | `text-terracotta`, `bg-terracotta` | `theme.colors.terracotta.DEFAULT` |
| `Brand Tertiary` (Wattle) | `#F0C419` | `text-wattle`, `bg-wattle` | `theme.colors.wattle.DEFAULT` |
| `Surface Canvas` (The Floor) | `#121212` | `bg-surface-canvas` | `theme.colors.surface.canvas` |
| `Surface Container` (Tech Card) | `#1E1E1E` | `bg-surface-container` | `theme.colors.surface.container` |

### B. M3 Expressive Shapes (Radius Tokens)
| Shape Archetype | Radius Values | Tailwind Class | Usage Policy |
|:---|:---|:---|:---|
| **Pebble** | `20px 20px 32px 32px` | `rounded-pebble` | **Strictly for Actions** (Buttons, CTAs). never for containers. |
| **Tech** (Card) | `24px` (Symmetric) | `rounded-tech` | **Data Containers Only.** Dashboard cards, lists. |
| **Gem** | `4px` | `rounded-gem` | **High-Density Data.** Badges, pills, tags. |
| **Leaf** | `32px 12px 32px 12px` | `rounded-leaf` | **Decorative Only.** Avatars, media frames. |

### C. The Eucalypt Typography Stack
| Species Name | Font Family | Tailwind Class | Variable Axes (Settings) |
|:---|:---|:---|:---|
| **The Vine** | Recursive | `font-vine` | `CASL: 1` (Casual), `CRSV: 1` (Cursive), `wght: 300-800` |
| **The Trunk** | Amstelvar | `font-trunk` | `wdth: 100-125` (Reactive), `wght: 900` |
| **The Bloom** | Fraunces | `font-bloom` | `SOFT: 100`, `WONK: 1` (Native Irregularity) |
| **The Leaf** | Roboto Flex | `font-leaf` | `GRAD: 0->150` (Hover), `XTRA: 468` (Data) |

---

## 2. State Management Strategy

To support the "Neuro-Inclusive" and "Agentic" requirements (DOC-008), we employ a dual-layer state architecture.

### Layer 1: Server State (TanStack Query)
**Responsibility:** "Atomic Syncing" and Data Persistence.
*   **Mechanism:** Optimistic Updates.
*   **Workflow (Auto-Save):**
    1.  User types in `SplitScreenEditor`.
    2.  `useMutation` fires immediately, updating the UI cache (Optimistic UI).
    3.  A debounced (500ms) background POST request sends data to Firestore.
    4.  **Error Handling:** If sync fails, the UI rolls back and shows a "Terracotta" toast.
*   **Why:** Ensures the "Brain" (Ingestion/Analysis) is always the single source of truth.

### Layer 2: Client State (Zustand)
**Responsibility:** "Global Undo" and Ephemeral UI States.
*   **Store Structure:**
    ```typescript
    interface EditorState {
      undoStack: HistorySnapshot[];
      redoStack: HistorySnapshot[];
      viewMode: 'beautiful' | 'bot'; // Parser Toggle
      isGateOpen: boolean; // S_global >= 85
      
      // Actions
      pushSnapshot: (data: any) => void;
      undo: () => void;
      toggleView: () => void;
    }
    ```
*   **Global Undo (`Cmd+Z`):**
    *   Zustand middleware intercepts specific actions (e.g., "AI Rewrite Applied").
    *   Snapshots differ from Server State; they track *intent* rather than just data.
*   **Why:** Light-weight, instant feedback for UI toggles without server round-trips.

---

## 3. Testing Architecture Overview

We utilize a "Hybrid Visual Regression" strategy, leveraging the work done in Storybook to power Playwright tests.

### Strategy: "Write Once, Test Twice"
Instead of writing separate E2E UI definitions, Playwright visits the isolated Storybook stories to assert visual correctness.

### A. The Component Anchors
Refers to the "High-Fidelity Anchors" defined in DOC-011.

1.  **Storybook Definition:**
    *   Create a story `AuditDial.stories.tsx` with arguments: `{ score: 87, isGateOpen: true }`.
    *   This renders the "Sage Glow" state in isolation.

2.  **Playwright Assertion:**
    *   **Test:** `visual-regression.spec.ts`
    *   **Logic:**
        ```typescript
        test('Anchor: Score Gauge (Sage Glow)', async ({ page }) => {
          // Visit the specific Storybook iframe URL
          await page.goto('/iframe.html?id=analysis-auditdial--sage-glow');
          
          // Assert pixel perfection against the Figma baseline
          await expect(page.locator('#root')).toHaveScreenshot('audit-dial-sage.png', {
            maxDiffPixelRatio: 0.01 // Strict 1% tolerance
          });
        });
        ```

### B. Responsive Typography Testing
To validate the "Reactive Width" of the Amstelvar (**Trunk**) font:
*   **Test:** Resize viewport to `1440px`, `1024px`, and `768px`.
*   **Assertion:** Check computed style `font-variation-settings`.
    ```typescript
    const trunk = page.locator('.font-trunk');
    await expect(trunk).toHaveCSS('font-variation-settings', /'wdth' 125/); // Desktop
    ```

### C. Interaction Testing
*   **Genkit Integration:** We mock the Genkit pipeline response in Playwright network interception to test the "Plasma Pulse" loading state deterministically.
