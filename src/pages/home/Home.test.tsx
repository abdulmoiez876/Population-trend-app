import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

describe("Home component tests", () => {

    test('Loading text is displayed initially', () => {
        render(<Home />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    })

    test('renders checkboxes after fetching prefectures', async () => {
        render(<Home />);

        // Wait for the checkboxes to be rendered
        setTimeout(() => {
            const checkboxes = screen.getByRole('checkbox');
            expect(checkboxes).toHaveLength(47); // Update the number if needed

        }, 2000);
    })

    test('checkbox is checked when clicked', () => {
        render(<Home />);

        // Wait for the checkboxes to be rendered
        setTimeout(() => {
            const checkbox = screen.getByRole('checkbox', { name: '1' }) as HTMLInputElement;
            fireEvent.click(checkbox);

            expect(checkbox.checked).toBe(true);

        }, 2000);


    });

});
