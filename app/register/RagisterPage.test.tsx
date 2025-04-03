import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from './page';

describe('RegisterPage', () => {
  it('renders the registration form', () => {
    render(<RegisterPage />);

    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adresse e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
  });

  it('updates form fields on user input', () => {
    render(<RegisterPage />);

    const nameInput = screen.getByLabelText(/nom/i);
    const emailInput = screen.getByLabelText(/adresse e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    fireEvent.change(nameInput, { target: { value: 'hager' } });
    fireEvent.change(emailInput, { target: { value: 'hager@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'hager123' } });

    expect(nameInput).toHaveValue('hager');
    expect(emailInput).toHaveValue('hager@gmail.com');
    expect(passwordInput).toHaveValue('hager123');
  });

  it('handles form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'hager' } });
    fireEvent.change(screen.getByLabelText(/adresse e-mail/i), { target: { value: 'hager@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'hager123' } });

    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'hager',
      email: 'hager@gmail.com',
      password: 'hager123',
    });

    consoleSpy.mockRestore();
  });
});