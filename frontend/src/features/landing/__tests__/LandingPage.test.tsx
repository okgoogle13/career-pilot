import React from 'react';
import { render, screen } from '@testing-library/react';
import { LandingPage } from '../LandingPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the image imports to prevent test failures if Jest doesn't handle them
jest.mock('../../assets/images/native-waratah-pot.png', () => 'test-file-stub');
jest.mock('../../assets/images/native-waratah-hanging.png', () => 'test-file-stub');
jest.mock('../../assets/images/native-gum-hanging.png', () => 'test-file-stub');
jest.mock('../../assets/images/native-kangaroo-paw.png', () => 'test-file-stub');

describe('LandingPage', () => {
    it('renders with correct elements', () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );

        // Check for "Career Copilot" (split across headers?)
        // Since SplitHeader separates them, getting by text might need nuance
        expect(screen.getByText('Career')).toBeInTheDocument();
        expect(screen.getByText('Copilot')).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByText('Explore as Guest')).toBeInTheDocument();
    });
});
