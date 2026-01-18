import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { Target, Zap, Trophy } from 'lucide-react';

const meta = {
    title: 'Shared/StatCard',
    component: StatCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        iconColor: { control: 'text' },
    },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default
export const Default: Story = {
    args: {
        icon: Target,
        value: '92%',
        label: 'Job Match',
    },
};

// 2. High Impact (Zap)
export const HighImpact: Story = {
    args: {
        icon: Zap,
        value: '15',
        label: 'Actions',
        iconColor: 'text-yellow-400',
    },
};

// 3. Achievement (Trophy)
export const Achievement: Story = {
    args: {
        icon: Trophy,
        value: 'Top 5%',
        label: 'Candidate Rank',
        iconColor: 'text-orange-500',
    },
};
