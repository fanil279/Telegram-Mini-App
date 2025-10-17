import type { JSX } from 'react';
import useAuth from '../hooks/useTelegram';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading, error } = useAuth();

    if (loading) return <div>Loading Telegram Mini App...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Please open this Mini App inside Telegram.</div>;

    return <>{children}</>;
};
