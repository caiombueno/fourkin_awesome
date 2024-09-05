import { authReducer, loginUser, logoutUser, registerUser, User, signInAnonymously } from "@features";

describe('authReducer', () => {
    const initialState = {
        user: null,
        loading: false,
        error: null,
    };

    it('should return the initial state when an unknown action is dispatched', () => {
        // Arrange
        const action = { type: 'unknown' };

        // Act
        const state = authReducer(undefined, action);

        // Assert
        expect(state).toEqual(initialState);
    });
});

describe('loginUser Thunk', () => {
    const initialState = {
        user: null,
        loading: false,
        error: null,
    };

    it('should set loading to true when loginUser.pending is dispatched', () => {
        // Arrange
        const action = { type: loginUser.pending.type };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    it('should set user and stop loading when loginUser.fulfilled is dispatched', () => {
        // Arrange
        const user: User = {
            uid: 'testUserId',
            email: 'test@example.com',
        };
        const action = {
            type: loginUser.fulfilled.type,
            payload: user,
        };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            user,
            loading: false,
            error: null,
        });
    });

    it('should set error and stop loading when loginUser.rejected is dispatched', () => {
        // Arrange
        const action = {
            type: loginUser.rejected.type,
            payload: 'Invalid credentials',
        };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: 'Invalid credentials',
        });
    });
});

describe('registerUser Thunk', () => {
    const initialState = {
        user: null,
        loading: false,
        error: null,
    };

    it('should set loading to true when registerUser.pending is dispatched', () => {
        // Arrange
        const action = { type: registerUser.pending.type };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    it('should set user and stop loading when registerUser.fulfilled is dispatched', () => {
        // Arrange
        const user: User = {
            uid: 'newUserId',
            email: 'newuser@example.com',
        };
        const action = {
            type: registerUser.fulfilled.type,
            payload: user,
        };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            user,
            loading: false,
            error: null,
        });
    });

    it('should set error and stop loading when registerUser.rejected is dispatched', () => {
        // Arrange
        const action = {
            type: registerUser.rejected.type,
            payload: 'Email already in use',
        };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: 'Email already in use',
        });
    });
});

describe('signInAnonymously Thunk', () => {
    const initialState = {
        user: null,
        loading: false,
        error: null,
    };

    it('should set loading to true when signInAnonymously.pending is dispatched', () => {
        // Arrange
        const action = { type: signInAnonymously.pending.type };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    it('should set user and stop loading when signInAnonymously.fulfilled is dispatched', () => {
        // Arrange
        const user: User = {
            uid: 'anonymousUserId',
            email: null,
        };
        const action = {
            type: signInAnonymously.fulfilled.type,
            payload: user,
        };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            user,
            loading: false,
            error: null,
        });
    });

    it('should set error and stop loading when signInAnonymously.rejected is dispatched', () => {
        // Arrange
        const action = {
            type: signInAnonymously.rejected.type,
            payload: 'Network error',
        };

        // Act
        const state = authReducer(initialState, action);

        // Assert
        expect(state).toEqual({
            ...initialState,
            loading: false,
            error: 'Network error',
        });
    });
});

describe('logoutUser Thunk', () => {
    it('should clear the user and reset error when logoutUser.fulfilled is dispatched', () => {
        // Arrange
        const action = { type: logoutUser.fulfilled.type };
        const stateWithUser = {
            user: { uid: 'testUserId', email: 'test@example.com' },
            loading: false,
            error: null,
        };

        // Act
        const state = authReducer(stateWithUser, action);

        // Assert
        expect(state).toEqual({
            ...stateWithUser,
            user: null,
            error: null,
        });
    });
});