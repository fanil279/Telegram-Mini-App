import { gql } from 'graphql-request';
import client from '../../config/graphQl';
import type { LoginResponse } from '../../types';

const authLogin = async (initData: string): Promise<LoginResponse> => {
    const params = Object.fromEntries(new URLSearchParams(initData).entries());
    if (!params.user) throw new Error('User data missing in initData');
    const tgUser = JSON.parse(params.user);
    const telegramId = String(tgUser.id);
    if (!telegramId) throw new Error('Invalid Telegram ID');

    const mutation = gql`
        mutation AppLogin($data: LoginUserData!) {
            LoginUser(data: $data) {
                token
                telegramId
            }
        }
    `;

    const { LoginUser } = await client.request<{ LoginUser: LoginResponse }>(mutation, {
        data: { telegramId: telegramId },
    });

    localStorage.setItem('token', LoginUser.token);
    return LoginUser;
};

export default authLogin;
