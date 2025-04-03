import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticlesPage from './page';
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the Layout component
jest.mock('../components/Layout', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
});

describe('ArticlesPage', () => {
  beforeEach(() => {
    // Mock the router object
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    });

    // Mock the token in localStorage
    localStorage.setItem('token', 'mock-token');
  });

  it('renders the page without crashing', () => {
    render(<ArticlesPage />);
    expect(screen.getByText('Liste des Articles')).toBeInTheDocument();
  });
});