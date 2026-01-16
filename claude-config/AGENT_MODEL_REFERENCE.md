# Agent Model Reference & Call Graph

This document defines the 20 specialized agents in the CareerCopilot ecosystem, their assigned AI models (Sonnet vs. Haiku), their core responsibilities, and their interaction patterns (Call Graph).

## 🧠 Model Strategy

- **Sonnet (3.5/3.7):** Used for "Architects" and "Specialists" requiring reasoning, planning, complex analysis, and creative direction.
- **Haiku (3.0):** Used for "Runners," "Reviewers," and "Managers" performing repetitive tasks, checklist validations, or strictly defined protocols.

---

## 1. Design & Migration Agents

### **[design-project-manager](.claude/agents/design-project-manager.md)**

- **Model:** `sonnet`
- **Role:** The "Head of Design." Orchestrates the flow from abstract idea to concrete code tasks. Routes work to the creative, system, or migration teams.
- **Workflow:**
  1.  Receives high-level feature request.
  2.  Determines if it's a _New Feature_ (Creative) or _Legacy Upgrade_ (Migration).
  3.  Delegates to appropriate sub-agents.
  4.  Enforces the "Golden Rule": Code must pass `ux-accessibility-lead` before shipping.
- **Call Graph:**
  - **Upstream:** User
  - **Downstream:** `[visual-design-director](.claude/agents/visual-design-director.md)`, `[m3-migration-architect](.claude/agents/m3-migration-architect.md)`, `[theme-factory](.claude/skills/theme-factory/theme-factory.md)` (Skill), `[frontend-specialist](.claude/agents/frontend-specialist.md)`, `[design-system-validator](.claude/agents/design-system-validator.md)`

### **[visual-design-director](.claude/agents/visual-design-director.md)**

- **Model:** `sonnet`
- **Role:** Creative lead. Defines the "Vibe," analyzes visual inputs, and outputs the `aestheticPreferences` JSON.
- **Workflow:**
  1.  Analyzes reference images using Vision skills.
  2.  Defines color palettes, typography, and shape hierarchy.
  3.  Outputs `aestheticPreferences` JSON.
- **Call Graph:**
  - **Upstream:** `[design-project-manager](.claude/agents/design-project-manager.md)`
  - **Downstream:** `[design-systems-architect](.claude/agents/design-systems-architect.md)` (Handoff), `[design-critique-vision](.claude/skills/design-skills/design-critique-vision.md)` (Skill), `[m3-aesthetic-creator](.claude/skills/design-skills/m3-aesthetic-creator.md)` (Skill)

### **[design-systems-architect](.claude/agents/design-systems-architect.md)**

- **Model:** `sonnet`
- **Role:** Technical implementation of design. Converts `aestheticPreferences` into a formal `tokens.json` system.
- **Workflow:**
  1.  Receives `aestheticPreferences`.
  2.  Generates full token set (Color, Typography, Elevation, etc.).
  3.  Validates contrast ratios.
  4.  Builds CSS variables/TS artifacts.
- **Call Graph:**
  - **Upstream:** `[visual-design-director](.claude/agents/visual-design-director.md)`
  - **Downstream:** `[m3-design-system-generator](.claude/skills/design-skills/m3-design-system-generator.md)` (Skill), `[wcag-contrast-checker](.claude/skills/design-skills/m3-design-system-generator.md)` (Skill), `[m3-design-system-generator](.claude/skills/design-skills/m3-design-system-generator.md)` (Skill)

### **[design-system-validator](.claude/agents/design-system-validator.md)**

- **Model:** `sonnet`
- **Role:** Validates design systems for WCAG compliance, aesthetic quality, and anti-slop detection.
- **Workflow:**
  1.  Audits designs for contrast and "M3 Expressive" compliance.
  2.  Detects generic "AI Slop" designs.
  3.  Generates CSS variables from tokens.
- **Call Graph:**
  - **Upstream:** `[design-project-manager](.claude/agents/design-project-manager.md)`, User
  - **Downstream:** `[wcag-contrast-checker](.claude/skills/design-skills/m3-design-system-generator.md)` (Skill), `[m3-anti-slop-validator](.claude/skills/design-skills/m3-anti-slop-validator.md)` (Skill)

### **[m3-migration-architect](.claude/agents/m3-migration-architect.md)**

- **Model:** `sonnet`
- **Role:** Specialist in upgrading legacy components to Material Design 3.
- **Workflow:**
  1.  Receives legacy component code.
  2.  Orchestrates the 8-step migration protocol (Layout -> Color -> Type -> etc.).
  3.  Returns fully refactored, token-aware code.
- **Call Graph:**
  - **Upstream:** `[design-project-manager](.claude/agents/design-project-manager.md)`
  - **Downstream:** `m3-*` Skills (Layout, Color, Shape, Elevation, etc.) in `frontend-migration/`

### **[ux-accessibility-lead](.claude/agents/ux-accessibility-lead.md)**

- **Model:** `sonnet`
- **Role:** Quality Gate. Audits components for Usability (Nielsen) and Accessibility (WCAG).
- **Workflow:**
  1.  Reviews proposed flows/components.
  2.  Runs heuristic audits and contrast checks.
  3.  Rejects work or provides specific "FIX" instructions.
- **Call Graph:**
  - **Upstream:** `[design-project-manager](.claude/agents/design-project-manager.md)`, `[frontend-specialist](.claude/agents/frontend-specialist.md)`
  - **Downstream:** `[ux-heuristic-audit](.claude/skills/design-skills/ux-heuristic-audit.md)` (Skill), `[wcag-contrast-checker](.claude/skills/design-skills/m3-design-system-generator.md)` (Skill)

---

## 2. Engineering & Architecture Agents

### **[frontend-specialist](.claude/agents/frontend-specialist.md)**

- **Model:** `sonnet`
- **Role:** React/TypeScript Architect. Plans and builds UI components using the Design System.
- **Workflow:**
  1.  Receives specs (Figma/Tokens).
  2.  Scaffolds components/pages.
  3.  Writes implementation code using M3 tokens.
  4.  Generates Storybook stories.
- **Call Graph:**
  - **Upstream:** `[design-project-manager](.claude/agents/design-project-manager.md)`
  - **Downstream:** `[component-builder](.claude/skills/_legacy_archive/component-builder/SKILL.md)` (Skill), `[storybook-scaffolder](.claude/skills/storybook-scaffolder/SKILL.md)` (Skill), `[react-page-scaffolder](.claude/skills/react-page-scaffolder/SKILL.md)` (Skill)

### **[fullstack-integration-specialist](.claude/agents/fullstack-integration-specialist.md)**

- **Model:** `sonnet`
- **Role:** Integration Architect. Ensures types, APIs, and data flows connect correctly from UI to DB.
- **Workflow:**
  1.  Maps API contracts (TypeScript <-> Pydantic).
  2.  Scaffolds backend endpoints and models.
  3.  Validates integration health.
- **Call Graph:**
  - **Upstream:** User, `[frontend-specialist](.claude/agents/frontend-specialist.md)`
  - **Downstream:** `[fastapi-endpoint-scaffolder](.claude/skills/_legacy_archive/fastapi-endpoint-scaffolder/SKILL.md)` (Skill), `[pydantic-model-scaffolder](.claude/skills/pydantic-model-scaffolder/SKILL.md)` (Skill), `[api-contract-validator](.claude/skills/api-contract-validator/SKILL.md)` (Skill), `[frontend-backend-mapper](.claude/skills/frontend-backend-mapper/SKILL.md)` (Skill)

### **[api-contract-specialist](.claude/agents/api-contract-specialist.md)**

- **Model:** `sonnet`
- **Role:** Validates frontend-backend API contracts and prevents integration bugs.
- **Workflow:**
  1.  Validates Types vs Pydantic models.
  2.  Detects field mismatches.
  3.  Generates auto-remediation code.
- **Call Graph:**
  - **Upstream:** `[fullstack-integration-specialist](.claude/agents/fullstack-integration-specialist.md)`, User
  - **Downstream:** `[api-contract-validator](.claude/skills/api-contract-validator/SKILL.md)` (Skill)

### **[firestore-caching-specialist](.claude/agents/firestore-caching-specialist.md)**

- **Model:** `sonnet`
- **Role:** Manages Firestore data access, cache operations, and TTL-based cache optimization.
- **Workflow:**
  1.  Optimizes Firestore queries.
  2.  Manages Redis/ttl-cache strategies.
  3.  Profiles data performance.
- **Call Graph:**
  - **Upstream:** `[fullstack-integration-specialist](.claude/agents/fullstack-integration-specialist.md)`
  - **Downstream:** Firebase tools, Redis tools

### **[ai-agent-specialist](.claude/agents/ai-agent-specialist.md)**

- **Model:** `sonnet`
- **Role:** AI Engineer. Designs Genkit flows, caching strategies, and LLM interactions.
- **Workflow:**
  1.  Designs Genkit flows for new features.
  2.  Configures caching (Firestore/Redis).
  3.  Selects models (Gemini Flash vs. Pro).
- **Call Graph:**
  - **Upstream:** User, `[fullstack-integration-specialist](.claude/agents/fullstack-integration-specialist.md)`
  - **Downstream:** `[careercopilot-agent-scaffolder](.claude/skills/careercopilot-agent-scaffolder/SKILL.md)` (Skill), `[careercopilot-tool-creator](.claude/skills/careercopilot-tool-creator/SKILL.md)` (Skill)

### **[mcp-orchestrator](.claude/agents/mcp-orchestrator.md)**

- **Model:** `sonnet`
- **Role:** Coordinates MCP server usage and provides guidance on the CareerCopilot MCP ecosystem.
- **Workflow:**
  1.  Configures MCP servers.
  2.  Integrates GitHub/Docker tools.
  3.  Manages Flash Sidekick dual-engine usage.
- **Call Graph:**
  - **Upstream:** User, `[ai-agent-specialist](.claude/agents/ai-agent-specialist.md)`
  - **Downstream:** `[careercopilot-tool-creator](.claude/skills/careercopilot-tool-creator/SKILL.md)` (Skill)

---

## 3. Quality & Testing Agents

### **[testing-specialist](.claude/agents/testing-specialist.md)**

- **Model:** `sonnet`
- **Role:** Test Strategist. Analyzes coverage gaps and plans comprehensive test suites.
- **Workflow:**
  1.  Analyzes coverage reports.
  2.  Generates test plans for components/endpoints.
  3.  Uses scaffolders to create test files.
- **Call Graph:**
  - **Upstream:** User, `[frontend-specialist](.claude/agents/frontend-specialist.md)`
  - **Downstream:** `[jest-test-scaffolder](.claude/skills/jest-test-scaffolder/SKILL.md)` (Skill), `[pytest-test-scaffolder](.claude/skills/pytest-test-scaffolder/SKILL.md)` (Skill), `[api-integration-test-scaffolder](.claude/skills/_legacy_archive/api-integration-test-scaffolder/SKILL.md)` (Skill)

### **[test-automation-specialist](.claude/agents/test-automation-specialist.md)**

- **Model:** `sonnet`
- **Role:** Expert in automated test generation using Jest, coordinating test coverage improvements.
- **Workflow:**
  1.  Generates component/hook tests.
  2.  Analyzes coverage.
  3.  Delegates batch tasks to `task-delegator`.
- **Call Graph:**
  - **Upstream:** `[testing-specialist](.claude/agents/testing-specialist.md)`
  - **Downstream:** `[jest-test-scaffolder](.claude/skills/jest-test-scaffolder/SKILL.md)` (Skill), `[task-delegator](.claude/skills/task-delegator/SKILL.md)` (Skill)

### **[test-runner](.claude/agents/test-runner.md)**

- **Model:** `haiku`
- **Role:** Execution Engine. Runs tests, analyzes immediate failures, and applies simple fixes.
- **Workflow:**
  1.  Runs specific test suites (Unit, E2E).
  2.  Reads error logs.
  3.  Fixes simple errors (imports, typos) or escalates.
- **Call Graph:**
  - **Upstream:** `[testing-specialist](.claude/agents/testing-specialist.md)`, `[devops-specialist](.claude/agents/devops-specialist.md)`
  - **Downstream:** `[webapp-testing](.claude/skills/webapp-testing/SKILL.md)` (Skill)

### **[code-reviewer](.claude/agents/code-reviewer.md)**

- **Model:** `haiku`
- **Role:** Policy Enforcer. Checks code against strict checklists (Security, Style, M3 usage).
- **Workflow:**
  1.  Reads git diffs.
  2.  Checks for hardcoded values, secrets, and complexity.
  3.  Approves or Request Changes.
- **Call Graph:**
  - **Upstream:** User (Pre-merge)
  - **Downstream:** `[skill-reviewer](.claude/skills/skill-reviewer/SKILL.md)` (Skill - conditionally), `[traceability-standard](.claude/skills/code-standards/traceability-standard.md)` (Standard)

### **[debugger](.claude/agents/debugger.md)**

- **Model:** `sonnet`
- **Role:** Root Cause Analyst. Solves complex, cross-stack bugs.
- **Workflow:**
  1.  Reproduces issues.
  2.  Traces errors across Frontend -> API -> Backend.
  3.  Implements fixes.
- **Call Graph:**
  - **Upstream:** User, `[test-runner](.claude/agents/test-runner.md)`
  - **Downstream:** `root-cause-tracer` (Skill - conceptual)

### **[security-analyst](.claude/agents/security-analyst.md)**

- **Model:** `sonnet`
- **Role:** Security Auditor. Checks for vulnerabilities, dependencies, and secrets.
- **Workflow:**
  1.  Runs dependency audits (`yarn audit`).
  2.  Scans for secrets.
  3.  Validates API auth logic.
- **Call Graph:**
  - **Upstream:** User, `[devops-specialist](.claude/agents/devops-specialist.md)`
  - **Downstream:** `[project-health-checker](.claude/skills/project-health-checker/SKILL.md)` (Skill), `[audit-agent](.claude/skills/audit-agent/SKILL.md)` (Skill)

---

## 4. Operations Agents

### **[devops-specialist](.claude/agents/devops-specialist.md)**

- **Model:** `sonnet`
- **Role:** Infrastructure Engineer. Manages CI/CD, environment health, and deployments.
- **Workflow:**
  1.  Checks project health.
  2.  Runs pre-flight tests.
  3.  Deploys to Staging/Production.
- **Call Graph:**
  - **Upstream:** User
  - **Downstream:** `[deployment-manager](.claude/skills/deployment-manager/SKILL.md)` (Skill), `[project-health-checker](.claude/skills/project-health-checker/SKILL.md)` (Skill)

### **[branch-manager](.claude/agents/branch-manager.md)**

- **Model:** `haiku`
- **Role:** Git Janitor. Manages branches, merges, and repository hygiene.
- **Workflow:**
  1.  Cleans up merged branches.
  2.  Analyzes branch staleness.
  3.  Ensures merge safety.
- **Call Graph:**
  - **Upstream:** User
  - **Downstream:** Bash/Git Tools
