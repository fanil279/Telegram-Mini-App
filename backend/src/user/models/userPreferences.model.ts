import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserPreference {
    @Field(() => Int)
    userId!: number;

    @Field(() => Int)
    preferenceId!: number;

    @Field()
    createdAt!: Date;


    @Field(() => User, { nullable: true })
    user?: User;
}
