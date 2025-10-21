import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserAvatarsResponseData {
    @Field(() => Int)
    id!: number;

    @Field()
    url!: string;

    @Field()
    isMainProfilePhoto!: boolean;
}
