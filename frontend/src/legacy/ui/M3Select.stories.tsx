import type { Meta, StoryObj } from '@storybook/react';
import { M3Select } from './M3Select';

const meta = {
    title: 'Components/Form/M3Select',
    component: M3Select,
    tags: ['autodocs'],
    argTypes: {
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
    },
} satisfies Meta<typeof M3Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
    { value: 'au', label: 'Australia' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'nz', label: 'New Zealand' },
];

/**
 * Default state: Laboratory mode
 */
export const Default: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        placeholder: 'Select a country',
        mode: 'laboratory',
    },
};

/**
 * Gallery mode: Warm, botanical aesthetic
 */
export const Gallery: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        placeholder: 'Select a country',
        mode: 'gallery',
    },
};

/**
 * With pre-selected value
 */
export const WithValue: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        value: 'au',
    },
};

/**
 * Error state with message
 */
export const WithError: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        error: true,
        errorMessage: 'Please select a country',
    },
};

/**
 * Required field
 */
export const Required: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        required: true,
        placeholder: 'Select a country',
    },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        helperText: 'Select your country of residence',
    },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        disabled: true,
        value: 'au',
    },
};

/**
 * Full width
 */
export const FullWidth: Story = {
    args: {
        label: 'Country',
        options: countryOptions,
        fullWidth: true,
    },
};

/**
 * With disabled options
 */
export const WithDisabledOptions: Story = {
    args: {
        label: 'Country',
        options: [
            { value: 'au', label: 'Australia' },
            { value: 'us', label: 'United States', disabled: true },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada', disabled: true },
            { value: 'nz', label: 'New Zealand' },
        ],
    },
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
                    <M3Select
                        label="Country"
                        options={countryOptions}
                        placeholder="Select a country"
                        mode="gallery"
                        fullWidth
                    />
                    <M3Select
                        label="Language"
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'es', label: 'Spanish' },
                            { value: 'fr', label: 'French' },
                        ]}
                        mode="gallery"
                        required
                        fullWidth
                    />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4 text-on-surface-parchment">Laboratory Mode (Clinical, Precise)</h3>
                <div className="space-y-4 max-w-md">
                    <M3Select
                        label="Country"
                        options={countryOptions}
                        placeholder="Select a country"
                        mode="laboratory"
                        fullWidth
                    />
                    <M3Select
                        label="Language"
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'es', label: 'Spanish' },
                            { value: 'fr', label: 'French' },
                        ]}
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
 * Keyboard Navigation Demo
 */
export const KeyboardNavigation: Story = {
    render: () => (
        <div className="space-y-4 max-w-md">
            <p className="text-sm text-secondary-flannel-dim">
                Click the select, then use:
                <br />• Arrow Up/Down to navigate options
                <br />• Enter to select
                <br />• Escape to close
            </p>
            <M3Select
                label="Country"
                options={countryOptions}
                placeholder="Try keyboard navigation"
                fullWidth
            />
        </div>
    ),
};
