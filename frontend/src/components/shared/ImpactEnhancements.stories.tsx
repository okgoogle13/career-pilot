import type { Meta, StoryObj } from '@storybook/react';
import { ImpactEnhancements } from '@/features/analysis/ImpactEnhancements';

const meta = {
    title: 'Shared/ImpactEnhancements',
    component: ImpactEnhancements,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        // suggestions is complex, difficult to control via UI
    },
} satisfies Meta<typeof ImpactEnhancements>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSuggestions: any[] = [
    {
        original: "Responsible for managing the sales team and increasing revenue.",
        suggestion: "Led a sales team of 15, increasing annual revenue by 25% ($2M) through strategic account management.",
        type: 'percentage',
        contextualWhy: "Adding specific metrics (25%) and team size provides scope and proves impact.",
    },
    {
        original: "Ideally good at python.",
        suggestion: "Proficient in Python, utilizing pandas and NumPy to reduce data processing time by 40%.",
        type: 'number',
        contextualWhy: "Demonstrating specific library knowledge and efficiency gains is more persuasive than general proficiency.",
    },
    {
        original: "Helped with customer support tickets.",
        suggestion: "Resolved 50+ customer support tickets weekly, maintaining a 4.9/5 satisfaction rating.",
        type: 'scale',
        contextualWhy: "Quantifying volume and quality rating establishes reliability.",
    },
];

// 1. Default (List of suggestions)
export const Default: Story = {
    args: {
        suggestions: sampleSuggestions,
    },
};

// 2. Single Suggestion
export const SingleSuggestion: Story = {
    args: {
        suggestions: [sampleSuggestions[0]],
    },
};

// 3. No Suggestions (Should render nothing)
export const Empty: Story = {
    args: {
        suggestions: [],
    },
};
