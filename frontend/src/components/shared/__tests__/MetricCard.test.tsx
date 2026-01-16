import React from 'react';
import { render, screen } from '@testing-library/react';
import { MetricCard } from '../MetricCard';
import { Activity } from 'lucide-react';
import '@testing-library/jest-dom';

describe('MetricCard', () => {
    it('renders label and value', () => {
        render(<MetricCard icon={Activity} label="TEST LABEL" value="99" />);
        expect(screen.getByText('TEST LABEL')).toBeInTheDocument();
        expect(screen.getByText('99')).toBeInTheDocument();
    });

    it('renders styles for outlined variant', () => {
        const { container } = render(
            <MetricCard icon={Activity} label="L" value="0" variant="outlined" />
        );
        expect(container.firstChild).toHaveClass('border-flannel-flower/10');
    });

    it('renders styles for filled variant', () => {
        const { container } = render(
            <MetricCard icon={Activity} label="L" value="0" variant="filled" />
        );
        expect(container.firstChild).toHaveClass('bg-specimen-night');
    });
});
