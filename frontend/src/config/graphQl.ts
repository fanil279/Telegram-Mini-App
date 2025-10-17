import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(`${import.meta.env.VITE_BACKEND_URL}/graphql`, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export const requestWithToken = async <T>(query: string, variables?: any) => {
    const token = localStorage.getItem('token');
    return client.request<T>(query, variables, token ? { Authorization: `Bearer ${token}` } : {});
};

export default client;
