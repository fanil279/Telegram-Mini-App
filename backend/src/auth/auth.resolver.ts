import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserData } from './dto/loginInputData';
import { AuthResponseData } from './dto/loginResponseData';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthResponseData)
    async LoginUser(@Args('data') data: LoginUserData): Promise<AuthResponseData> {
        return this.authService.loginUser(data);
    }
}
