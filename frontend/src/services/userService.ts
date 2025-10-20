import client from '../config/graphQl';
import { gql } from 'graphql-request';
import type { IGetUserPhotoResponse } from '../types';

class UserService {
    public static async getUserPhotos(userId: number): Promise<IGetUserPhotoResponse> {
        const query = gql`
            query UserPhotos($userId: Int!) {
                getUserPhotos(userId: $userId) {
                    id
                    url
                    isMainProfilePhoto
                }
            }
        `;

        const { userPhotos } = await client.request<{ userPhotos: IGetUserPhotoResponse }>(query, {
            userId: userId,
        });
        return userPhotos;
    }
}

const userService = new UserService();

export default userService;
