import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { M3ErrorAlert } from './M3ErrorAlert';

const meta = {
    title: 'Shared/M3ErrorAlert',
    component: M3ErrorAlert,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        message: { control: 'text' },
        retryLabel: { control: 'text' },
    },
    args: {
        message: 'Something went wrong. Please try again later.',
    },
} satisfies Meta<typeof M3ErrorAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Message Only)
export const Default: Story = {
    args: {},
};

// 2. With Retry
export const WithRetry: Story = {
    args: {
        message: 'Failed to fetch user profile.',
        onRetry: fn(),
        retryLabel: 'Refresh',
    },
};

// 3. With Dismiss
export const WithDismiss: Story = {
    args: {
        message: 'This action is not available in offline mode.',
        onDismiss: fn(),
    },
};

// 4. Full Actions
export const FullActions: Story = {
    args: {
        message: 'Upload failed due to network interruption.',
        onRetry: fn(),
        onDismiss: fn(),
        retryLabel: 'Try Upload Again',
    },
};

// 5. Long Message
export const LongMessage: Story = {
    args: {
        message: 'We encountered an unexpected error while processing your resume. This might be due to a corrupted file or an unsupported format. Please verify your document and try attempting the upload process again.',
        onRetry: fn(),
    },
};
