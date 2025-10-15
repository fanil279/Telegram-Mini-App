import { gql } from 'graphql-request';
import client from '../../config/graphQl';
import type { LoginResponse } from '../../types/auth';

const authLogin = async (initData: String): Promise<LoginResponse> => {
    const mutation = gql`
        mutation AppLogin($initData: String!) {
            login(initData: $initData) {
                token
                user {
                    telegramId
                    fullname
                }
            }
        }
    `;

    const { login } = await client.request<{ login: LoginResponse }>(mutation, { initData });

    localStorage.setItem('token', login.token);
    return login;
};

export default authLogin;
