import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserData {
    @Field(() => String)
    telegramId!: string;
}
