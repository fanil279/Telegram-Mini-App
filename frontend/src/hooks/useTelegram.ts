import { useEffect, useState } from 'react';
import authLogin from '../features/auth/authApi';
import type { LoginUser } from '../types';

function useAuth() {
    const [user, setUser] = useState<LoginUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const waitForTelegram = () => {
            if (!window.Telegram?.WebApp) {
                setTimeout(waitForTelegram, 50);
                return;
            }

            const webApp = window.Telegram.WebApp;
            webApp.ready();

            (async () => {
                try {
                    const initData = webApp.initData;
                    if (!initData) throw new Error('Telegram initData missing');

                    const loginResponse = await authLogin(initData);
                    setUser({ telegramId: loginResponse.telegramId });
                } catch (err: any) {
                    console.error('Telegram login failed', err);
                    setError(err.message || 'Login failed');
                } finally {
                    setLoading(false);
                }
            })();
        };

        waitForTelegram();
    }, []);

    return { user, loading, error };
}

export default useAuth;
