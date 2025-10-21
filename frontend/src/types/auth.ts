export interface LoginResponse {
    token: string;
    id: string;
    telegramId: string;
    avatarUrl: string;
}

export interface AuthState {
    id: number | null;
    telegramId: number | null;
    token: string | null;
    avatarUrl: string | null;
    loading: boolean;
    error: string | null;
}
