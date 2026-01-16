import type { Meta, StoryObj } from '@storybook/react';
import { AuroraHeader } from './AuroraHeader';

const meta: Meta<typeof AuroraHeader> = {
    title: 'Northcote/Core/AuroraHeader',
    component: AuroraHeader,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'Specimen Night',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        tag: { control: 'text' },
        title: { control: 'text' },
        wittySubtitle: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof AuroraHeader>;

export const Default: Story = {
    args: {
        tag: 'EXPERIMENT 001',
        title: 'Aurora Borealis',
        wittySubtitle: 'At this time of year?',
    },
};

export const WithoutSubtitle: Story = {
    args: {
        tag: 'CORE SYSTEM',
        title: 'System Online',
    },
};

export const LongTitle: Story = {
    args: {
        tag: 'DATA INGESTION',
        title: 'Processing Large Datasets',
        wittySubtitle: 'This might take a while...',
    },
};
