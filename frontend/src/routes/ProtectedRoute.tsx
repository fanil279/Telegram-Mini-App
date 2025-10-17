import type { JSX } from 'react';
import useAuth from '../hooks/useTelegram';
import Loading from '../components/Loading';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { telegramId, loading } = useAuth();

    if (loading) return <Loading />;
    if (!telegramId) return <div>Please open this Mini App inside Telegram.</div>;

    return <>{children}</>;
};
