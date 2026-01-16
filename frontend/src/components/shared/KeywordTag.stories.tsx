import type { Meta, StoryObj } from '@storybook/react';
import { KeywordTag } from './KeywordTag';

const meta = {
    title: 'Shared/KeywordTag',
    component: KeywordTag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        keyword: { control: 'text' },
        variant: {
            control: 'radio',
            options: ['matched', 'missing'],
        },
    },
} satisfies Meta<typeof KeywordTag>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Matched (Default)
export const Matched: Story = {
    args: {
        keyword: 'React',
        variant: 'matched',
    },
};

// 2. Missing
export const Missing: Story = {
    args: {
        keyword: 'TypeScript',
        variant: 'missing',
    },
};

// 3. Long Keyword
export const LongKeyword: Story = {
    args: {
        keyword: 'Search Engine Optimization (SEO)',
        variant: 'matched',
    },
};
