import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { M3Alert } from './M3Alert';

const meta = {
    title: 'UI/M3Alert',
    component: M3Alert,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        severity: {
            control: 'select',
            options: ['info', 'success', 'warning', 'error'],
        },
        variant: {
            control: 'select',
            options: ['filled', 'tonal', 'outlined'],
        },
        title: {
            control: 'text',
        },
    },
} satisfies Meta<typeof M3Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Info (Default)
export const Info: Story = {
    args: {
        severity: 'info',
        title: 'Did you know?',
        children: 'You can drag and drop your resume directly into the ingestion zone.',
    },
};

// 2. Success
export const Success: Story = {
    args: {
        severity: 'success',
        title: 'Upload Complete',
        children: 'Your profile has been successfully updated.',
        variant: 'filled',
    },
};

// 3. Warning
export const Warning: Story = {
    args: {
        severity: 'warning',
        title: 'Session Expiring',
        children: 'Your session will expire in 5 minutes. Please save your work.',
    },
};

// 4. Error
export const Error: Story = {
    args: {
        severity: 'error',
        title: 'Connection Failed',
        children: 'Unable to reach the server. Please check your internet connection.',
        variant: 'outlined',
    },
};

// 5. With Close Button
export const WithCloseButton: Story = {
    args: {
        severity: 'info',
        children: 'This is a dismissible alert.',
        onClose: fn(),
    },
};

// 6. Simple (No Title)
export const SimpleMessage: Story = {
    args: {
        severity: 'success',
        children: 'Changes saved.',
        variant: 'tonal',
    },
};
