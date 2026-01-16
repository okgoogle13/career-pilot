import type { Meta, StoryObj } from '@storybook/react';
import { SplitHeader } from './SplitHeader';

const meta: Meta<typeof SplitHeader> = {
    title: 'Northcote/Core/SplitHeader',
    component: SplitHeader,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'Specimen Night',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        trunkText: { control: 'text' },
        vineText: { control: 'text' },
        vineRotation: { control: { type: 'range', min: -15, max: 15 } },
        vinePosition: {
            control: 'select',
            options: ['top', 'bottom', 'overlay'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof SplitHeader>;

export const Default: Story = {
    args: {
        trunkText: 'CAREER',
        vineText: 'Copilot',
        vineRotation: 6,
        vinePosition: 'overlay',
    },
};

export const BanksiaTop: Story = {
    args: {
        trunkText: 'SYSTEM',
        vineText: 'Analysis',
        vinePosition: 'top',
        vineRotation: -4,
    },
};

export const BanksiaBottom: Story = {
    args: {
        trunkText: 'MARKET',
        vineText: 'Opportunities',
        vinePosition: 'bottom',
        vineRotation: 4,
    },
};
