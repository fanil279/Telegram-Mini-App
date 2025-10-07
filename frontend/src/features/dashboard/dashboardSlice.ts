import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, SubscriptionType } from '../../types';

// Mock data for prototyping
export const initialState: DashboardState = {
    subscription: 'FREE',
    likesRemaining: 20,
    notifications: 0,
    totalMatches: 3,
    newMatches: 1,
    totalChats: 3,
    activeChats: 2,
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

        // matches
        setMatches: (state, action: PayloadAction<number>) => {
            state.totalMatches = action.payload;
        },

        incrementMatches: (state) => {
            state.totalMatches += 1;
            state.newMatches += 1;
        },

        resetMatches: (state) => {
            state.newMatches = 0;
        },

        // chats
        setChats: (state, action: PayloadAction<{ total: number; unread: number }>) => {
            state.totalChats = action.payload.total;
            state.activeChats = action.payload.unread;
        },

        newChats: (state, action: PayloadAction<{ total?: number; unread?: number }>) => {
            state.totalChats += action.payload.total ?? 1;
            state.activeChats += action.payload.unread ?? 1;
        },

        markChatAsRead: (state, action: PayloadAction<{ total: number; unread: number }>) => {
            state.activeChats = state.activeChats - action.payload.unread;
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
    resetMatches,
    setChats,
    newChats,
    markChatAsRead,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
