import type { Meta, StoryObj } from '@storybook/react';
import { M3Radio } from './M3Checkbox';

const meta = {
    title: 'UI/M3Radio',
    component: M3Radio,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        label: { control: 'text' },
    },
} satisfies Meta<typeof M3Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Option 1',
        name: 'options',
    },
};

export const Checked: Story = {
    args: {
        label: 'Option 2 (Selected)',
        name: 'options',
        checked: true,
    },
};

export const Error: Story = {
    args: {
        label: 'Invalid Selection',
        error: true,
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Unavailable',
        disabled: true,
    },
};
