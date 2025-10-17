import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Gender, Role } from './enums';
import { UserAvatar } from './userAvatars.model';
import { UserPreference } from './userPreferences.model';

@ObjectType()
export class User {
    @Field(() => Int)
    id!: number;

    @Field()
    telegramId!: number;

    @Field(() => Gender)
    gender!: Gender;

    @Field({ nullable: true })
    username?: string;

    @Field()
    fullname!: string;

    @Field({ nullable: true })
    bio?: string;

    @Field()
    city!: string;

    @Field()
    age!: number;

    @Field({ nullable: true })
    nationality?: string;

    @Field(() => Role)
    role!: Role;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;

    @Field(() => [UserAvatar], { nullable: 'itemsAndList' })
    photos?: UserAvatar[];

    @Field(() => [UserPreference], { nullable: 'itemsAndList' })
    preferences?: UserPreference[];
}
