import type { Meta, StoryObj } from '@storybook/react';
import { StatusChip } from './StatusChip';

const meta = {
    title: 'Shared/StatusChip',
    component: StatusChip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        needsReview: { control: 'boolean' },
        label: { control: 'text' },
        size: {
            control: 'radio',
            options: ['small', 'medium'],
        },
    },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Validated (Default success state)
export const Validated: Story = {
    args: {
        needsReview: false,
    },
};

// 2. Needs Review (Warning state)
export const NeedsReview: Story = {
    args: {
        needsReview: true,
    },
};

// 3. Custom Label (Validated)
export const CustomLabelValidated: Story = {
    args: {
        needsReview: false,
        label: 'Approved',
    },
};

// 4. Custom Label (Review)
export const CustomLabelReview: Story = {
    args: {
        needsReview: true,
        label: 'Action Required',
    },
};

// 5. Medium Size
export const MediumSize: Story = {
    args: {
        needsReview: false,
        size: 'medium',
        label: 'Completed',
    },
};
