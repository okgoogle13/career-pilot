
import { addons } from '@storybook/manager-api';
import { galleryTheme } from './themes/northcote';

addons.setConfig({
    theme: galleryTheme, // Default to Gallery mode
    sidebar: {
        showRoots: true,
        collapsedRoots: ['other'],
    },
});
