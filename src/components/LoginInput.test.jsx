/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Masukkan Email');

    // action
    await userEvent.type(usernameInput, 'fa@mail.com');
    // assert
    expect(usernameInput).toHaveValue('fa@mail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText(
      'Masukkan Password',
    );

    // action
    await userEvent.type(passwordInput, 'test123');

    // assert
    expect(passwordInput).toHaveValue('test123');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const usernameInput = await screen.getByPlaceholderText('Masukkan Email');
    const passwordInput = await screen.getByPlaceholderText(
    'Masukkan Password',
    );
    await userEvent.type(usernameInput, 'fa@mail.com');
    await userEvent.type(passwordInput, 'test123');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'fa@mail.com',
      password: 'test123',
    });
  });
});
