export const getTelegramInitData = (): string => {
    if (!window.Telegram?.WebApp) {
        throw new Error('Telegram WebApp not available');
    }

    return window.Telegram.WebApp.initData;
};

export const getTelegramUser = (): TelegramWebAppUser | undefined => {
    const webApp = window.Telegram?.WebApp;

    if (!webApp) {
        throw new Error('Telegram WebApp not available');
    }

    return webApp.initDataUnsafe?.user;
};
