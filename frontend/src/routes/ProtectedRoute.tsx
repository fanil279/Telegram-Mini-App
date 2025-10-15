import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useAuth from '../hooks/useTelegram';
import type { JSX } from 'react';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) return <Loading />;
    if (!user) return <Navigate to='auth/error/' replace />;

    return <>{children}</>;
};
