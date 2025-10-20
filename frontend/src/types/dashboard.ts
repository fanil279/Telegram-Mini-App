export type SubscriptionType = 'FREE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
export type ReactionType = 'FRIEND' | 'CUTE' | 'SYMPATHY' | 'LIKE' | 'LOVE';

export interface DashboardState {
    subscription: SubscriptionType;
    likesRemaining: number;
    notifications: number;
    totalMatches: number;
    newMatches: number;
    totalChats: number;
    activeChats: number;
}

export interface ThemeContextType {
    isDarkMode: boolean;
}

export interface IGetUserPhotoResponse {
    getUserPhotos: Array<{
        id: number;
        url: string;
        isMainProfilePhoto: boolean;
    }>;
}
