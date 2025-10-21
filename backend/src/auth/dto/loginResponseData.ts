import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseData {
    @Field()
    token!: string;

    @Field()
    id!: string;

    @Field()
    telegramId!: string;

    @Field()
    avatarUrl!: string;
}
