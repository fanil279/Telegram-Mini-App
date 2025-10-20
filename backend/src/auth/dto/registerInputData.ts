import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RegisterUserData {
    @Field(() => Int)
    telegramId!: number;

    @Field()
    fullname!: string;

    @Field(() => Int)
    age!: number;

    @Field()
    gender!: string;

    @Field()
    city!: string;

    @Field({ nullable: true })
    username?: string;

    @Field()
    url!: string;
}
