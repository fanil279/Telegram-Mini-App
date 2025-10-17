import { useEffect } from 'react';
import authLogin from '../features/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { login, setError } from '../features/auth/authSlice';

function useAuth() {
    const dispatch = useDispatch<AppDispatch>();

    const { telegramId, token, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        let timeout: number;

        const waitForTelegram = (): void => {
            if (!window.Telegram?.WebApp) {
                timeout = window.setTimeout(waitForTelegram, 50);
                return;
            }

            const webApp = window.Telegram.WebApp;
            webApp.ready();

            (async () => {
                try {
                    const initData = webApp.initData;
                    if (!initData) throw new Error('Telegram initData missing');

                    const loginResponse = await authLogin(initData);
                    dispatch(
                        login({
                            telegramId: loginResponse.telegramId,
                            token: loginResponse.token,
                            loading: false,
                            error: null
                        }),
                    );
                } catch (err: any) {
                    console.error('Telegram login failed', err);
                    dispatch(setError(err.message))
                }
            })();
        };

        waitForTelegram();

        return () => clearTimeout(timeout);
    }, [dispatch]);

    return { telegramId, token, loading, error };
}

export default useAuth;
