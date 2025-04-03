import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountPage from './page';
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the Layout component
jest.mock('../components/Layout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

// Mock API or external data if necessary
jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: { name: 'John Doe', details: 'Account Details' },
    })
  ),
}));

describe('AccountPage', () => {
  beforeEach(() => {
    // Mock the router object
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/account',
      query: {},
      asPath: '/account',
    });

    // Mock the token in localStorage
    localStorage.setItem('token', 'mock-token');
  });

  it('renders the page without crashing', async () => {
    render(<AccountPage />);
    expect(await screen.findByText('Mon Compte')).toBeInTheDocument();
  });

  it('displays the user name', async () => {
    render(<AccountPage />);
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

  it('renders the "Modifier les Informations" button', async () => {
    render(<AccountPage />);
    expect(await screen.findByRole('button', { name: /modifier les informations/i })).toBeInTheDocument();
  });
});