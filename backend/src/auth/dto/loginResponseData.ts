import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseData {
    @Field()
    token!: string;

    @Field()
    telegramId!: string;
}
