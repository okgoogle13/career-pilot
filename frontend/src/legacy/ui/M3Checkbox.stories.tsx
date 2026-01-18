import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { M3Checkbox } from './M3Checkbox';

const meta = {
    title: 'UI/M3Checkbox',
    component: M3Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        label: { control: 'text' },
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof M3Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Unchecked)
export const Default: Story = {
    args: {
        label: 'Subscribe to newsletter',
    },
};

// 2. Checked
export const Checked: Story = {
    args: {
        label: 'I agree to the Terms of Service',
        checked: true,
    },
};

// 3. Indeterminate
export const Indeterminate: Story = {
    args: {
        label: 'Select all users',
        indeterminate: true,
        checked: true, // Typically true or specific state
    },
};

// 4. Error State
export const Error: Story = {
    args: {
        label: 'This field is required',
        error: true,
    },
};

// 5. Disabled Unchecked
export const Disabled: Story = {
    args: {
        label: 'Option unavailable',
        disabled: true,
    },
};

// 6. Disabled Checked
export const DisabledChecked: Story = {
    args: {
        label: 'Mandatory option',
        disabled: true,
        checked: true,
    },
};
