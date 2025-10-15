interface TelegramWebAppUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

interface TelegramWebAppInitDataUnsafe {
    query_id?: string;
    user?: TelegramWebAppUser;
    auth_date?: number;
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe?: TelegramWebAppInitDataUnsafe;
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
}
