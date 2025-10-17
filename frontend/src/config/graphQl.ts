import { GraphQLClient } from 'graphql-request';
import authLogin from '../features/auth/authApi';

const client = new GraphQLClient(`${import.meta.env.VITE_BACKEND_URL}/graphql`, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const requestWithToken = async <T>(query: string, variables?: any): Promise<T> => {
    const token = localStorage.getItem('token');

    try {
        return client.request<T>(
            query,
            variables,
            token ? { Authorization: `Bearer ${token}` } : {},
        );
    } catch (err: any) {
        if (err.response.status === 401) {
            const initData = window?.Telegram?.WebApp.initData;

            if (initData) {
                const newLogin = await authLogin(initData);
                localStorage.setItem('token', newLogin.token);

                return await client.request<T>(query, variables, {
                    Authorization: `Bearer ${newLogin.token}`,
                });
            }
        }

        throw err;
    }
};

export default client;
