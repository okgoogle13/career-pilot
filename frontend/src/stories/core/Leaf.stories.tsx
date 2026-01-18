
import type { Meta, StoryObj } from '@storybook/react';
import { Leaf } from '../../components/core/Leaf';

const meta = {
    title: 'Core Components/Leaf (Typography)',
    component: Leaf,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        role: {
            control: 'select',
            options: ['hero', 'title', 'body', 'data'],
        },
        as: {
            control: 'select',
            options: ['h1', 'h2', 'h3', 'p', 'span', 'div', 'code'],
        },
    },
} satisfies Meta<typeof Leaf>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BanksiaHero: Story = {
    args: {
        role: 'hero',
        children: 'CAREER COPILOT',
        label: 'The Gallery',
    },
};

export const SectionTitle: Story = {
    args: {
        role: 'title',
        children: 'Analysis Results',
    },
};

export const BodyText: Story = {
    args: {
        role: 'body',
        children: 'The Northcote Curio design system prioritizes organic asymmetry and natural textures. This sample text flows like the viscous breeze found in the Australian bush at twilight.',
    },
};

export const DataMetric: Story = {
    args: {
        role: 'data',
        children: 'ID_7749_B',
    },
};
