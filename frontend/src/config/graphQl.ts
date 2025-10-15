import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(import.meta.env.BACKEND_URL, {
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
