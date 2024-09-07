import { authRepository, User } from '@data';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


// Define the types for user and state
interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

// Initial state with type
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Thunks for asynchronous actions
const loginUser = createAsyncThunk<
    { email: string | null; uid: string; displayName: string | null }, // Updated return type to account for possible null values
    { email: string; password: string },
    { rejectValue: string }
>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await authRepository.loginUser({ email, password });
            const { email: userEmail, uid, displayName } = userCredential; // Renaming the destructured email
            return { email: userEmail, uid, displayName }; // Return only serializable fields
        } catch (error) {
            return rejectWithValue((error as { message: string }).message);
        }
    }
);

const registerUser = createAsyncThunk<
    { email: string | null; uid: string; displayName: string | null }, // Updated return type to account for possible null values
    { email: string; password: string },
    { rejectValue: string }
>(
    'auth/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await authRepository.registerUser({ email, password });
            const { email: userEmail, uid, displayName } = userCredential; // Renaming the destructured email
            return { email: userEmail, uid, displayName }; // Return only serializable fields
        } catch (error) {
            return rejectWithValue((error as { message: string }).message);
        }
    }
);

const signInAnonymously = createAsyncThunk<
    { uid: string; email: null; displayName: null }, // Anonymous users do not have an email or display name
    void, // No input parameters are needed for anonymous sign-in
    { rejectValue: string }
>(
    'auth/signInAnonymously',
    async (_, { rejectWithValue }) => {
        try {
            const userCredential = await authRepository.signInAnonymously();
            const { uid } = userCredential; // Extract only the UID for anonymous users
            return { uid, email: null, displayName: null }; // Return the UID and null values for email and displayName
        } catch (error) {
            return rejectWithValue((error as { message: string }).message);
        }
    }
);


const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authRepository.logoutUser();
        } catch (error) {
            return rejectWithValue((error as { message: string }).message);
        }
    }
);

// Auth slice with state management
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login actions
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error';
            })
            // Register actions
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error';
            })
            // Sign in anonymously actions
            .addCase(signInAnonymously.pending, (state) => {
                state.loading = true;
            })
            .addCase(signInAnonymously.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signInAnonymously.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error';
            })
            // Logout actions
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.error = null;
            });
    },
});

const authReducer = authSlice.reducer;

export { authReducer, loginUser, registerUser, logoutUser, signInAnonymously, AuthState, User };