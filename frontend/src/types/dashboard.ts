export type SubscriptionType = 'FREE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface DashboardState {
    subscription: SubscriptionType;
    likesRemaining: number;
    notifications: number;
    matches: number;
}

export interface ThemeContextType {
    isDarkMode: boolean;
}
