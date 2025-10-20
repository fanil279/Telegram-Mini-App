import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class userAvatarsResponseData {
    @Field(() => Int)
    id!: number;

    @Field()
    url!: string;

    @Field()
    isMainProfilePhoto!: boolean;
}
