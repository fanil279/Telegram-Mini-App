import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, SubscriptionType } from '../../types';

export const initialState: DashboardState = {
    subscription: 'FREE',
    likesRemaining: 20,
    notifications: 0,
    matches: 1,
};

const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState,

    reducers: {
        // subscription
        setSubscription: (state, action: PayloadAction<SubscriptionType>) => {
            state.subscription = action.payload;
        },

        // likes
        setLikes: (state, action: PayloadAction<number>) => {
            state.likesRemaining = action.payload;
        },

        decrementLikes: (state) => {
            if (state.likesRemaining > 0) {
                state.likesRemaining -= 1;
            }
        },

        // notifications
        setNotifications: (state, action: PayloadAction<number>) => {
            state.notifications = action.payload;
        },

        incrementNotifications: (state) => {
            state.notifications += 1;
        },

        clearNotifications: (state) => {
            state.notifications = 0;
        },

        setMatches: (state, action: PayloadAction<number>) => {
            state.matches = action.payload;
        },

        incrementMatches: (state) => {
            state.matches +=1;
        },
    },
});

export const {
    setSubscription,
    setLikes,
    decrementLikes,
    setNotifications,
    incrementNotifications,
    clearNotifications,
    setMatches,
    incrementMatches,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
