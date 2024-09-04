import { authRepository } from '@data';
import { loginUser, registerUser, logoutUser } from '@features';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { AnyAction } from 'redux';

jest.mock('@data', () => ({
    authRepository: {
        loginUser: jest.fn(),
        registerUser: jest.fn(),
        logoutUser: jest.fn(),
    },
}));

const mockUser = { email: 'test@example.com' };

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares as any);

describe('loginUser async thunk', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({});
    });

    it('dispatches fulfilled action with user data when login is successful', async () => {
        // Arrange
        (authRepository.loginUser as jest.Mock).mockResolvedValueOnce(mockUser);
        const credentials = { email: 'test@example.com', password: 'password123' };

        // Act
        await store.dispatch<any>(loginUser(credentials));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(loginUser.pending.type);
        expect(actions[1].type).toEqual(loginUser.fulfilled.type);
        expect(actions[1].payload).toEqual(mockUser);
    });

    it('dispatches rejected action with error message when login fails', async () => {
        // Arrange
        (authRepository.loginUser as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));
        const credentials = { email: 'test@example.com', password: 'password123' };

        // Act
        await store.dispatch<any>(loginUser(credentials));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(loginUser.pending.type);
        expect(actions[1].type).toEqual(loginUser.rejected.type);
        expect(actions[1].payload).toEqual('Invalid credentials'); // Assert on payload instead of error.message
    });
});

describe('registerUser async thunk', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({});
    });

    it('dispatches fulfilled action with user data when registration is successful', async () => {
        // Arrange
        (authRepository.registerUser as jest.Mock).mockResolvedValueOnce(mockUser);
        const credentials = { email: 'newuser@example.com', password: 'password123' };

        // Act
        await store.dispatch<any>(registerUser(credentials));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(registerUser.pending.type);
        expect(actions[1].type).toEqual(registerUser.fulfilled.type);
        expect(actions[1].payload).toEqual(mockUser);
    });

    it('dispatches rejected action with error message when registration fails', async () => {
        // Arrange
        (authRepository.registerUser as jest.Mock).mockRejectedValueOnce(new Error('Email already in use'));
        const credentials = { email: 'newuser@example.com', password: 'password123' };

        // Act
        await store.dispatch<any>(registerUser(credentials));

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(registerUser.pending.type);
        expect(actions[1].type).toEqual(registerUser.rejected.type);
        expect(actions[1].payload).toEqual('Email already in use');
    });
});

describe('logoutUser async thunk', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({});
    });

    it('dispatches fulfilled action when logout is successful', async () => {
        // Arrange
        (authRepository.logoutUser as jest.Mock).mockResolvedValueOnce(undefined);

        // Act
        await store.dispatch<any>(logoutUser());

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(logoutUser.pending.type);
        expect(actions[1].type).toEqual(logoutUser.fulfilled.type);
    });

    it('dispatches rejected action with error message when logout fails', async () => {
        // Arrange
        (authRepository.logoutUser as jest.Mock).mockRejectedValueOnce(new Error('Logout failed'));

        // Act
        await store.dispatch<any>(logoutUser());

        // Assert
        const actions = store.getActions();
        expect(actions[0].type).toEqual(logoutUser.pending.type);
        expect(actions[1].type).toEqual(logoutUser.rejected.type);
        expect(actions[1].payload).toEqual('Logout failed');
    });
});