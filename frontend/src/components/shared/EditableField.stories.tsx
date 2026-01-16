import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditableField } from './EditableField';

const meta = {
    title: 'Shared/EditableField',
    component: EditableField,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        suggestion: { control: 'text' },
        multiline: { control: 'boolean' },
        variant: {
            control: 'select',
            options: ['body1', 'body2', 'h6'],
        },
    },
    args: {
        onSave: fn(),
    },
} satisfies Meta<typeof EditableField>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Single Line)
export const Default: Story = {
    args: {
        label: 'Job Title',
        value: 'Senior Software Engineer',
    },
};

// 2. Multiline
export const Multiline: Story = {
    args: {
        label: 'Professional Summary',
        value: 'Experienced software engineer with a focus on scalable web applications and AI integration. Proven track record of delivering high-quality code in fast-paced environments.',
        multiline: true,
    },
};

// 3. With AI Suggestion
export const WithSuggestion: Story = {
    args: {
        label: 'Achievement',
        value: 'Led a team to build a new feature.',
        suggestion: 'Spearheaded a cross-functional team of 5 developers to architect and launch a high-impact feature, resulting in a 20% increase in user engagement.',
        multiline: true,
    },
};

// 4. Headline Variant
export const Headline: Story = {
    args: {
        label: 'Profile Name',
        value: 'Alex Chen',
        variant: 'h6',
    },
};

// 5. Empty State
export const Empty: Story = {
    args: {
        label: 'LinkedIn URL',
        value: '',
    },
};
