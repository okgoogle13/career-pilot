
import { create } from '@storybook/theming/create';

export const galleryTheme = create({
    base: 'dark',
    brandTitle: 'CareerCopilot | The Gallery',
    brandImage: 'https://placehold.co/150x50/1A1714/D4A84B?text=The+Gallery', // Placeholder until assets

    // Colors
    colorPrimary: '#D4A84B', // Wattle Gold
    colorSecondary: '#D4A84B',

    // UI
    appBg: '#1A1714', // Specimen Night
    appContentBg: '#2C2723', // Eucalypt Smoke
    appBorderColor: 'rgba(168, 160, 151, 0.1)',
    appBorderRadius: 20,

    // Text
    textColor: '#F5F0E8', // Parchment
    textInverseColor: '#1A1714',

    // Toolbar default
    barTextColor: '#F5F0E8',
    barSelectedColor: '#D4A84B',
    barBg: '#2C2723',

    // Form colors
    inputBg: '#3D3632',
    inputBorder: '#4A433D',
    inputTextColor: '#F5F0E8',
    inputBorderRadius: 12,
});

export const laboratoryTheme = create({
    base: 'dark',
    brandTitle: 'CareerCopilot | The Laboratory',
    brandImage: 'https://placehold.co/150x50/16141A/6B9E7A?text=The+Laboratory',

    // Colors
    colorPrimary: '#6B9E7A', // Clinical Sage
    colorSecondary: '#6B9E7A',

    // UI
    appBg: '#16141A', // Charcoal Slate
    appContentBg: '#252230', // Slate Smoke
    appBorderColor: 'rgba(168, 159, 140, 0.08)',
    appBorderRadius: 4, // Precise corners

    // Text
    textColor: '#E6E6FA', // Cooler white
    textInverseColor: '#16141A',

    // Toolbar
    barTextColor: '#E6E6FA',
    barSelectedColor: '#6B9E7A',
    barBg: '#252230',

    // Form colors
    inputBg: '#32303D',
    inputBorder: '#3F3D4A',
    inputTextColor: '#E6E6FA',
    inputBorderRadius: 4,
});
