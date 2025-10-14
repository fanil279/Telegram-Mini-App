import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserAvatar {
    @Field(() => Int)
    id!: number;

    @Field()
    url!: string;

    @Field()
    isMainProfilePhoto!: boolean;

    @Field()
    createdAt!: Date;
    

    @Field(() => User, { nullable: true })
    user?: User;
}
