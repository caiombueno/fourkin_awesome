import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { AuthScreen, registerUser, signInAnonymously } from '@features';
import { NavigationContainer } from '@react-navigation/native';
import { componentsTestIds } from '../utils';

jest.mock('../../src/features/authentication/redux/authReducer', () => ({
    loginUser: jest.fn(),
    registerUser: jest.fn(),
    signInAnonymously: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() }),
    NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

const mockStore = configureStore([]);

describe('AuthScreen', () => {
    const authTestIds = componentsTestIds.AuthScreen;

    const renderAuthScreenWithProvider = (store: any) => render(
        <Provider store={store}>
            <NavigationContainer>
                <AuthScreen />
            </NavigationContainer>
        </Provider>
    );

    const mockStoreWithState = (state: any) => {
        const store = mockStore(state);
        store.dispatch = jest.fn();
        return store;
    };

    it('should call registerUser with correct credentials when Register button is pressed', async () => {
        const store = mockStoreWithState({
            auth: { user: null, loading: false, error: null },
            currentUser: { user: null }
        });

        const { getByTestId } = renderAuthScreenWithProvider(store);

        (registerUser as unknown as jest.Mock).mockResolvedValueOnce({
            type: 'auth/register/fulfilled',
            payload: { email: 'newuser@example.com', password: 'password123' }
        });

        await act(async () => {
            fireEvent.press(getByTestId(authTestIds.switchButton));
            fireEvent.changeText(getByTestId(authTestIds.emailInput), 'newuser@example.com');
            fireEvent.changeText(getByTestId(authTestIds.passwordInput), 'password123');
            fireEvent.press(getByTestId(authTestIds.authButton));
        });

        waitFor(() => {
            // Check that the action creator was called with the correct arguments
            expect(registerUser).toHaveBeenCalledTimes(1);
            expect(registerUser).toHaveBeenCalledWith({ email: 'newuser@example.com', password: 'password123' });
        });
    });

    it('should call signInAnonymously when anonymous sign-in button is pressed', async () => {
        const store = mockStoreWithState({
            auth: { user: null, loading: false, error: null },
            currentUser: { user: null }
        });
        const { getByTestId } = renderAuthScreenWithProvider(store);

        await act(async () => {
            fireEvent.press(getByTestId(authTestIds.anonymousButton));
        });

        await waitFor(() => {
            expect(signInAnonymously).toHaveBeenCalled();
        });
    });

    it('should display error message if login fails', async () => {
        const store = mockStoreWithState({
            auth: { user: null, loading: false, error: 'Invalid credentials' },
            currentUser: { user: null }
        });
        const { getByTestId } = renderAuthScreenWithProvider(store);

        await waitFor(() => {
            expect(getByTestId(authTestIds.errorMessage)).toBeTruthy();
            expect(getByTestId(authTestIds.errorMessage).props.children).toBe('Invalid credentials');
        });
    });
});