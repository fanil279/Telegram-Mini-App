export interface LoginResponse {
    token: string;
    telegramId: string;
}

export interface LoginUser {
    telegramId: string;
}

export interface AuthState {
    telegramId: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}
