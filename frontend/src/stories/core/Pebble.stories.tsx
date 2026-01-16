
import type { Meta, StoryObj } from '@storybook/react';
import { Pebble } from '../../components/core/Pebble';
import { Plus, ArrowRight } from 'lucide-react';

const meta = {
    title: 'Core Components/Pebble (Actions)',
    component: Pebble,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost', 'destructive'],
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
        },
    },
} satisfies Meta<typeof Pebble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Confirm Action',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Cancel',
    },
};

export const WithIcon: Story = {
    args: {
        variant: 'primary',
        children: 'Add New Item',
        iconLeft: <Plus className="w-4 h-4" />,
    },
};

export const Navigation: Story = {
    args: {
        variant: 'ghost',
        children: 'Next Step',
        iconRight: <ArrowRight className="w-4 h-4" />,
    },
};

export const Loading: Story = {
    args: {
        variant: 'primary',
        children: 'Saving...',
        isLoading: true,
    },
};
