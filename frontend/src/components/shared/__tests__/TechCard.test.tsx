import React from 'react';
import { render, screen } from '@testing-library/react';
import { TechCard } from '../TechCard';
import '@testing-library/jest-dom';

describe('TechCard', () => {
    it('renders children correctly', () => {
        render(<TechCard>Test Content</TechCard>);
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<TechCard className="custom-class">Content</TechCard>);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('contains Northcote design tokens classes', () => {
        const { container } = render(<TechCard>Content</TechCard>);
        expect(container.firstChild).toHaveClass('bg-eucalypt-smoke/80');
        expect(container.firstChild).toHaveClass('rounded-leaf');
        expect(container.firstChild).toHaveClass('shadow-standard');
    });
});
