
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    backgrounds: {
      default: 'specimen-night',
      values: [
        { name: 'specimen-night', value: '#1A1714' },
        { name: 'eucalypt-smoke', value: '#2C2723' },
        { name: 'parchment', value: '#F5F0E8' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Design System',
          ['Tokens', 'Typography', 'Colors', 'Shapes'],
          'Core Components',
          ['Pebble (Actions)', 'Stone (Containers)', 'Leaf (Heroes)'],
          'Flows',
          ['Germination', 'Dissection', 'Pollination']
        ],
      },
    },
    layout: 'fullscreen',
  },

  decorators: [
    // Adds theme switching support (Gallery vs Laboratory)
    withThemeByClassName({
      themes: {
        gallery: 'theme-gallery',
        laboratory: 'theme-laboratory',
      },
      defaultTheme: 'gallery',
    }),
    (Story) => (
      <div className="font-body text-text-primary antialiased min-h-screen bg-surface selection:bg-primary selection:text-surface">
        {/* Global texture overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-5 bg-noise mix-blend-overlay"></div>
        <Story />
      </div>
    ),
  ],
};

export default preview;