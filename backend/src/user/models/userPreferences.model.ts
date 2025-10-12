import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserPreference {
    @Field(() => ID)
    userId!: number;

    @Field(() => ID)
    preferenceId!: number;

    @Field()
    createdAt!: Date;


    @Field(() => User, { nullable: true })
    user?: User;
}
