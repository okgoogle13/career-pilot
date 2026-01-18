# Skill-Agent Matrix
Y M.

This matrix maps specialized skills to the agents that use them.

## 1. Design & M3 Migration Skills

| Skill | Description | Primary Users (✅) | Secondary Users (⚪) |
| :--- | :--- | :--- | :--- |
| `[m3-design-system-generator](.claude/skills/design-skills/m3-design-system-generator.md)` | Generates tokens.json from aesthetic config | `Systems Architect` | `Design Sys Validator`, `Design PM` |
| `[design-critique-vision](.claude/skills/design-skills/design-critique-vision.md)` | Analyzes images for aesthetic vibe/critique | `Design Director`, `Design Sys Validator` | `Frontend Spec` |
| `[wcag-contrast-checker](.claude/skills/design-skills/m3-design-system-generator.md)` | Validates color contrast ratios (via Generator) | `Systems Architect`, `UX Lead`, `Design Sys Validator` | `Frontend Spec` |
| `[ux-heuristic-audit](.claude/skills/design-skills/ux-heuristic-audit.md)` | Audits flows against Nielsen's Heuristics | `UX Lead` | - |
| `[m3-anti-slop-validator](.claude/skills/design-skills/m3-anti-slop-validator.md)` | Detects "AI Slop" & generic aesthetics | `Design Sys Validator` | `Design Director` |
| `[m3-aesthetic-creator](.claude/skills/design-skills/m3-aesthetic-creator.md)` | Creates comprehensive M3 expressive systems | `Design Director` | - |
| `[m3-layout-tokens](.claude/skills/frontend-migration/m3-layout-tokens.md)` | Replace hardcoded spacing w/ tokens | `M3 Migration Arch` | - |
| `[m3-visual-tokens](.claude/skills/frontend-migration/m3-visual-tokens.md)` | Replace colors/shapes w/ tokens | `M3 Migration Arch` | - |
| `[m3-typography-tokens](.claude/skills/frontend-migration/m3-typography-tokens.md)` | Unify typography w/ Type Scale | `M3 Migration Arch` | - |
| `[theme-factory](.claude/skills/theme-factory/theme-factory.md)` | Provides pre-built aesthetic templates | `Design PM` | - |
| `[m3-expressive-audit](.claude/skills/design-skills/m3-expressive-audit.md)` | Audits for M3 Expressive traits | `Design Sys Validator` | - |

## 2. Frontend & Scaffolding Skills

| Skill | Description | Primary Users (✅) | Secondary Users (⚪) |
| :--- | :--- | :--- | :--- |
| `[component-builder](.claude/skills/_legacy_archive/component-builder/SKILL.md)` | Writes M3-compliant React code | `Frontend Spec`, `Design PM` | `Fullstack Spec` |
| `[react-page-scaffolder](.claude/skills/react-page-scaffolder/SKILL.md)` | Creates new page directories/routing | `Frontend Spec` | `Fullstack Spec` |
| `[storybook-scaffolder](.claude/skills/storybook-scaffolder/SKILL.md)` | Creates .stories.tsx files | `Frontend Spec`, `Testing Spec` | - |
| `[figma-to-page](.claude/skills/figma-to-page/SKILL.md)` | Vision-based page generation | `Frontend Spec` | `Design PM` |

## 3. Backend & Architecture Skills

| Skill | Description | Primary Users (✅) | Secondary Users (⚪) |
| :--- | :--- | :--- | :--- |
| `[fastapi-endpoint-scaffolder](.claude/skills/_legacy_archive/fastapi-endpoint-scaffolder/SKILL.md)` | Creates Routes, Models, Tests | `Fullstack Spec` | - |
| `[pydantic-model-scaffolder](.claude/skills/pydantic-model-scaffolder/SKILL.md)` | Creates Data Schemas | `Fullstack Spec` | `AI Agent Spec` |
| `[frontend-backend-mapper](.claude/skills/frontend-backend-mapper/SKILL.md)` | Maps Integration gaps | `Fullstack Spec` | `Frontend Spec`, `API Contract Spec` |
| `[api-contract-validator](.claude/skills/api-contract-validator/SKILL.md)` | Checks TS vs Python types | `Fullstack Spec`, `API Contract Spec` | `Frontend Spec` |
| `[careercopilot-agent-scaffolder](.claude/skills/careercopilot-agent-scaffolder/SKILL.md)` | Creates new Agent files | `AI Agent Spec` | - |
| `[careercopilot-tool-creator](.claude/skills/careercopilot-tool-creator/SKILL.md)` | Creates new Tool files | `AI Agent Spec` | - |

## 4. Testing & Quality Skills

| Skill | Description | Primary Users (✅) | Secondary Users (⚪) |
| :--- | :--- | :--- | :--- |
| `[jest-test-scaffolder](.claude/skills/jest-test-scaffolder/SKILL.md)` | Creates Unit Tests (Jest) | `Testing Spec`, `Test Auto Spec` | `Frontend Spec` |
| `[pytest-test-scaffolder](.claude/skills/pytest-test-scaffolder/SKILL.md)` | Creates Unit Tests (Pytest) | `Testing Spec` | `Frontend Spec` |
| `[api-integration-test-scaffolder](.claude/skills/_legacy_archive/api-integration-test-scaffolder/SKILL.md)` | Creates Integration Tests | `Testing Spec` | `Test Auto Spec` |
| `[webapp-testing](.claude/skills/webapp-testing/SKILL.md)` | Runs/Writes Playwright E2E | `Test Runner`, `DevOps Spec` | `Testing Spec`, `Frontend Spec`, `Test Auto Spec` |
| `[task-delegator](.claude/skills/task-delegator/SKILL.md)` | Parallel test generation | `Testing Spec`, `Test Auto Spec` | - |

## 5. Operations & Utility Skills

| Skill | Description | Primary Users (✅) | Secondary Users (⚪) |
| :--- | :--- | :--- | :--- |
| `[deployment-manager](.claude/skills/deployment-manager/SKILL.md)` | Deploys to Staging/Prod | `DevOps Spec` | - |
| `[project-health-checker](.claude/skills/project-health-checker/SKILL.md)` | Validates Secrets/Config | `DevOps Spec`, `Security Analyst` | - |
| `[audit-agent](.claude/skills/audit-agent/SKILL.md)` | Comprehensive Security Audit | `Security Analyst` | - |
| `[pdf-text-extractor](.claude/skills/document-skills/pdf/SKILL.md)` | Extracts text/forms from PDFs | `PDF Processor` | - |
| `[skill-reviewer](.claude/skills/skill-reviewer/SKILL.md)` | Evaluates and improves skills | `Code Reviewer` | - |
