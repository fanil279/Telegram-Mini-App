export interface LoginResponse {
    token: string;
    user: {
        telegramId: number;
        fullname: string;
    };
}

export interface LoginUser {
    telegramId: number;
}
