# Testing Infrastructure Setup Guide

## Current Status

### ✅ Installed
- **Jest**: v29.7.0
- **Vitest**: v4.0.16
- **Storybook**: v8.1.11 with a11y addon

### ⏳ Needs Setup
- Test utilities and providers
- Coverage configuration
- Example tests for Phase 1 components

---

## Jest/Vitest Configuration

### Recommended: Use Vitest (Modern, Faster)

**Why Vitest?**
- Native ESM support
- Faster than Jest
- Better Vite integration
- Compatible with Jest API

**Create `frontend/vitest.config.ts`**:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.spec.tsx',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## Test Utilities Setup

### 1. Create `frontend/src/setupTests.ts`

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
```

### 2. Create `frontend/src/test-utils.tsx`

```typescript
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Add any providers your app needs (e.g., Router, Theme, etc.)
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

---

## Example Tests for Phase 1 Components

### M3TextField.test.tsx

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test-utils';
import { M3TextField } from './M3TextField';

describe('M3TextField', () => {
  it('renders with label', () => {
    render(<M3TextField label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows floating label when focused', () => {
    render(<M3TextField label="Email" />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    // Add assertion for floating label class
  });

  it('displays error message', () => {
    render(<M3TextField label="Email" error errorMessage="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('shows character counter', () => {
    render(<M3TextField label="Bio" maxLength={100} showCounter />);
    expect(screen.getByText('0/100')).toBeInTheDocument();
  });

  it('warns at 80% character limit', () => {
    render(<M3TextField label="Bio" maxLength={100} showCounter value="a".repeat(81) />);
    const counter = screen.getByText('81/100');
    // Add assertion for warning color
  });

  it('supports Gallery mode', () => {
    const { container } = render(<M3TextField label="Email" mode="gallery" />);
    // Add assertion for Gallery mode styling
  });

  it('supports Laboratory mode', () => {
    const { container } = render(<M3TextField label="Email" mode="laboratory" />);
    // Add assertion for Laboratory mode styling
  });

  it('is accessible', async () => {
    const { container } = render(<M3TextField label="Email" required />);
    // Use jest-axe for accessibility testing
    // const results = await axe(container);
    // expect(results).toHaveNoViolations();
  });
});
```

### M3Select.test.tsx

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/test-utils';
import { M3Select } from './M3Select';

const options = [
  { value: 'au', label: 'Australia' },
  { value: 'us', label: 'United States' },
];

describe('M3Select', () => {
  it('renders with label', () => {
    render(<M3Select label="Country" options={options} />);
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<M3Select label="Country" options={options} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('selects option', () => {
    const onChange = vi.fn();
    render(<M3Select label="Country" options={options} onChange={onChange} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(screen.getByText('Australia'));
    expect(onChange).toHaveBeenCalledWith('au');
  });

  it('supports keyboard navigation', () => {
    render(<M3Select label="Country" options={options} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'Enter' });
    // Add assertion for selection
  });

  it('closes on Escape', () => {
    render(<M3Select label="Country" options={options} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
```

### M3Checkbox.test.tsx

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/test-utils';
import { M3Checkbox } from './M3Checkbox';

describe('M3Checkbox', () => {
  it('renders with label', () => {
    render(<M3Checkbox label="I agree" />);
    expect(screen.getByText('I agree')).toBeInTheDocument();
  });

  it('toggles checked state', () => {
    const onChange = vi.fn();
    render(<M3Checkbox label="I agree" onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });

  it('supports indeterminate state', () => {
    render(<M3Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('shows error state', () => {
    render(<M3Checkbox label="I agree" error />);
    // Add assertion for error styling
  });
});
```

### StatusBadge.test.tsx

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test-utils';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders label', () => {
    render(<StatusBadge label="Active" />);
    expect(screen.getByText('ACTIVE')).toBeInTheDocument(); // uppercase
  });

  it('supports success variant', () => {
    const { container } = render(<StatusBadge label="Success" variant="success" />);
    // Add assertion for success styling
  });

  it('supports warning variant', () => {
    const { container } = render(<StatusBadge label="Warning" variant="warning" />);
    // Add assertion for warning styling
  });

  it('supports error variant', () => {
    const { container } = render(<StatusBadge label="Error" variant="error" />);
    // Add assertion for error styling
  });

  it('shows dot indicator', () => {
    const { container } = render(<StatusBadge label="Active" showDot />);
    // Add assertion for dot presence
  });

  it('supports Gallery mode', () => {
    const { container } = render(<StatusBadge label="Active" mode="gallery" />);
    // Add assertion for Gallery mode styling
  });
});
```

---

## Running Tests

### Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test M3TextField.test.tsx
```

### Add to `package.json` scripts:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

---

## Coverage Requirements

### Minimum Thresholds
- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

### Exclusions
- `*.stories.tsx`
- `*.test.tsx`
- `setupTests.ts`
- `node_modules/`

---

## Accessibility Testing

### Install jest-axe

```bash
npm install --save-dev jest-axe
```

### Example Usage

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<M3TextField label="Email" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Next Steps

1. ✅ Create `vitest.config.ts`
2. ✅ Create `setupTests.ts`
3. ✅ Create `test-utils.tsx`
4. ✅ Write tests for Phase 1 components
5. ⏳ Run tests and verify coverage
6. ⏳ Add to CI/CD pipeline
