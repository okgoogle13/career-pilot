import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from '@/features/analysis/MetricCard';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

const meta: Meta<typeof MetricCard> = {
    title: 'Northcote/Shared/MetricCard',
    component: MetricCard,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'Specimen Night',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        icon: { control: false },
        label: { control: 'text' },
        value: { control: 'text' },
        variant: {
            control: 'radio',
            options: ['outlined', 'filled']
        }
    },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
    args: {
        icon: TrendingUp,
        label: 'System Load',
        value: '42%',
        variant: 'outlined',
    },
};

export const Filled: Story = {
    args: {
        icon: Users,
        label: 'Active Users',
        value: '1.2k',
        variant: 'filled',
    },
};

export const CustomColor: Story = {
    args: {
        icon: Award,
        label: 'Certifications',
        value: '4',
        variant: 'outlined',
    },
};
