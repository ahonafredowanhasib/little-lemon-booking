import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Little Lemon heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Little Lemon Restaurant/i);
  expect(headingElement).toBeInTheDocument();
});

test('shows validation errors when submitting empty form', () => {
  render(<App />);
  const submitBtn = screen.getByRole('button', { name: /Book Table/i });
  fireEvent.click(submitBtn);
  
  // Check if error messages appear
  expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
});