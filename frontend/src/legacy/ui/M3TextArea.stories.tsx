import type { Meta, StoryObj } from '@storybook/react';
import { M3TextArea } from './M3TextField';

const meta = {
    title: 'UI/M3TextArea',
    component: M3TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'radio',
            options: ['outlined', 'filled'],
        },
        rows: {
            control: 'number',
        },
    },
} satisfies Meta<typeof M3TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Bio',
        placeholder: 'Tell us about yourself',
        rows: 4,
    },
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Feedback',
        placeholder: 'Share your thoughts',
    },
};

export const WithCounter: Story = {
    args: {
        label: 'Tweet',
        maxLength: 140,
        showCounter: true,
    },
};

export const ErrorState: Story = {
    args: {
        label: 'Cover Letter',
        error: true,
        errorMessage: 'Cover letter contains banned words',
        value: 'I hate this job...',
    },
};
