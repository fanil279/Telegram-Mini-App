import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/models/user.model';
import { RegisterUserData } from './dto/registerUserData';

@Resolver(() => User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    async registerUser(@Args('data') data: RegisterUserData) {
        return this.authService.registerUser(data);
    }
}
