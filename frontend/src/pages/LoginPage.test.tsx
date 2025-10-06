import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from './LoginPage';

// Mock the api module
vi.mock('../services/api', () => ({
  loginUser: vi.fn(),
}));

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );
    const form = screen.getByTestId('login-form');

    expect(within(form).getByLabelText(/username/i)).toBeInTheDocument();
    expect(within(form).getByLabelText(/password/i)).toBeInTheDocument();
    expect(within(form).getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error on failed login', async () => {
    const { loginUser } = await import('../services/api');
    (loginUser as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Invalid credentials'));

    const { container } = render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    const form = within(container).getByTestId('login-form');

    fireEvent.change(within(form).getByLabelText(/username/i), { target: { value: 'test' } });
    fireEvent.change(within(form).getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(within(form).getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});