import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './page';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { act } from 'react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');

describe('LoginPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'removeItem');

    jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('handles login failure', async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { message: 'Invalid email or password' } },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'hager@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'hager' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    });

    expect(axios.post).toHaveBeenCalledWith(
      'http://127.0.0.1:8000/api/login',
      { email: 'hager@gmail.com', password: 'hager' },
      { headers: { 'Content-Type': 'application/json' } }
    );

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
  });
});