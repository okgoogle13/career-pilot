import type { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from './LandingPage';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof LandingPage> = {
    title: 'Northcote/Features/LandingPage',
    component: LandingPage,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {};
