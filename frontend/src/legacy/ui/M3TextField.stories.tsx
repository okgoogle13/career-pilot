import type { Meta, StoryObj } from '@storybook/react';
import { M3TextField, M3TextArea } from './M3TextField';

const meta = {
    title: 'Components/Form/M3TextField',
    component: M3TextField,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['outlined', 'filled'],
            description: 'Visual style variant',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Input size',
        },
        mode: {
            control: 'select',
            options: ['gallery', 'laboratory'],
            description: 'Theme aesthetic (Gallery: warm/botanical, Laboratory: clinical/precise)',
        },
        error: {
            control: 'boolean',
            description: 'Error state',
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state',
        },
        required: {
            control: 'boolean',
            description: 'Required field',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Full width container',
        },
        showCounter: {
            control: 'boolean',
            description: 'Show character counter',
        },
    },
} satisfies Meta<typeof M3TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state: Empty, outlined, medium size, laboratory mode
 */
export const Default: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'you@example.com',
        variant: 'outlined',
        size: 'medium',
        mode: 'laboratory',
    },
};

/**
 * Gallery mode: Warm, botanical aesthetic for landing pages
 */
export const Gallery: Story = {
    args: {
        label: 'Email Address',
        placeholder: 'you@example.com',
        variant: 'outlined',
        size: 'medium',
        mode: 'gallery',
    },
};

/**
 * Error state with message
 */
export const WithError: Story = {
    args: {
        label: 'Email Address',
        error: true,
        errorMessage: 'Please enter a valid email address',
        value: 'invalid-email',
    },
};

/**
 * Required field with asterisk
 */
export const Required: Story = {
    args: {
        label: 'Full Name',
        placeholder: 'John Doe',
        required: true,
    },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        helperText: 'Must be at least 8 characters',
        type: 'password',
    },
};

/**
 * With character counter
 */
export const WithCounter: Story = {
    args: {
        label: 'Bio',
        placeholder: 'Tell us about yourself...',
        maxLength: 150,
        showCounter: true,
        fullWidth: true,
    },
};

/**
 * Filled variant
 */
export const Filled: Story = {
    args: {
        label: 'Username',
        placeholder: 'your_username',
        variant: 'filled',
    },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
    args: {
        label: 'Email',
        placeholder: 'disabled@example.com',
        disabled: true,
        value: 'user@example.com',
    },
};

/**
 * Small size
 */
export const Small: Story = {
    args: {
        label: 'Search',
        placeholder: 'Type to search...',
        size: 'small',
    },
};

/**
 * Large size
 */
export const Large: Story = {
    args: {
        label: 'Message',
        placeholder: 'Type your message...',
        size: 'large',
    },
};

/**
 * TextArea component
 */
export const TextArea: Story = {
    render: () => (
        <M3TextArea
            label="Comments"
            placeholder="Share your thoughts..."
            rows={4}
            maxLength={500}
            showCounter={true}
        />
    ),
};

/**
 * Full width with form context
 */
export const FormLayout: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <M3TextField
                label="Email"
                placeholder="your@email.com"
                required={true}
                fullWidth
            />
            <M3TextField
                label="Password"
                type="password"
                placeholder="••••••••"
                required={true}
                fullWidth
            />
            <M3TextField
                label="Phone (optional)"
                type="tel"
                placeholder="+1 (555) 000-0000"
                fullWidth
            />
        </div>
    ),
};

/**
 * Gallery vs Laboratory Comparison
 */
export const ModeComparison: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold mb-4 text-on-surface-parchment">Gallery Mode (Warm, Botanical)</h3>
                <div className="space-y-4 max-w-md">
                    <M3TextField
                        label="Email Address"
                        placeholder="you@example.com"
                        mode="gallery"
                        fullWidth
                    />
                    <M3TextField
                        label="Full Name"
                        placeholder="John Doe"
                        mode="gallery"
                        required
                        fullWidth
                    />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4 text-on-surface-parchment">Laboratory Mode (Clinical, Precise)</h3>
                <div className="space-y-4 max-w-md">
                    <M3TextField
                        label="Email Address"
                        placeholder="you@example.com"
                        mode="laboratory"
                        fullWidth
                    />
                    <M3TextField
                        label="Full Name"
                        placeholder="John Doe"
                        mode="laboratory"
                        required
                        fullWidth
                    />
                </div>
            </div>
        </div>
    ),
};

/**
 * Floating Label Animation Demo
 */
export const FloatingLabelDemo: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <p className="text-sm text-secondary-flannel-dim">Click the input to see the label float up</p>
            <M3TextField
                label="Email Address"
                placeholder="you@example.com"
                fullWidth
            />
            <M3TextField
                label="Pre-filled Field"
                value="user@example.com"
                fullWidth
            />
        </div>
    ),
};
