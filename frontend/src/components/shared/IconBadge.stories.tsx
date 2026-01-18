import type { Meta, StoryObj } from '@storybook/react';
import { IconBadge } from './IconBadge';
import { Briefcase, User, Star, Award } from 'lucide-react';

const meta = {
    title: 'Shared/IconBadge',
    component: IconBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
        },
        color: { control: 'color' },
        background: { control: 'text' },
    },
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Medium)
export const Default: Story = {
    args: {
        icon: Briefcase,
    },
};

// 2. Small
export const Small: Story = {
    args: {
        icon: User,
        size: 'sm',
    },
};

// 3. Large
export const Large: Story = {
    args: {
        icon: Award,
        size: 'lg',
    },
};

// 4. Custom Colors
export const CustomColors: Story = {
    args: {
        icon: Star,
        color: 'text-yellow-400',
        background: 'bg-yellow-900/20',
    },
};
