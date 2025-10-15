import { useEffect, useState } from 'react';
import { getTelegramInitData, getTelegramUser } from '../services/telegram';
import authLogin from '../features/auth/authApi';
import type { LoginUser } from '../types/auth';

function useAuth() {
    const [user, setUser] = useState<LoginUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function Login() {
            try {
                setLoading(true);

                const token = localStorage.getItem('token');

                if (token) {
                    const tgUser = getTelegramUser();
                    if (tgUser) {
                        setUser({
                            telegramId: tgUser.id,
                        });
                    }
                    return;
                }

                const initData = getTelegramInitData();
                const { user } = await authLogin(initData);

                setUser({
                    telegramId: user.telegramId,
                });
            } catch (err) {
                console.error('Telegram login validation failed', err);
            } finally {
                setLoading(false);
            }
        }

        Login();
    }, []);

    return { user, loading };
}

export default useAuth;
