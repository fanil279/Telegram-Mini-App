import { Resolver, Query } from '@nestjs/graphql';
// import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor() {}

    @Query(() => String)
    test() {
        return 'Hello World from Nest.js';
    }
}
