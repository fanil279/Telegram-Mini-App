import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum Role {
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    ADMIN = 'ADMIN',
}

registerEnumType(Gender, { name: 'Gender' });
registerEnumType(Role, { name: 'Role' });
