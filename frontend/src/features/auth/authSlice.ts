import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../../types';

export const initialState: AuthState = {
    telegramId: null,
    token: null,
    loading: true,
    error: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            state.telegramId = action.payload.telegramId;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { login, setError } = AuthSlice.actions;

export default AuthSlice.reducer;
