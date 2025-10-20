import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { userAvatarsResponseData } from './dto/userAvatarsResponseData';
import { UserPreference } from './models/userPreferences.model';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    getUsers() {
        return this.userService.findAll();
    }

    @ResolveField(() => [userAvatarsResponseData], { nullable: 'itemsAndList' })
    getUserPhotos(@Parent() user: User) {
        return this.userService.getUserPhotos(user.id);
    }

    @ResolveField(() => [UserPreference], { nullable: 'itemsAndList' })
    getUserPreferences(@Parent() user: User) {
        return this.userService.getUserPreferences(user.id);
    }

    @Query(() => User, { nullable: true })
    getUser(@Args('id') id: number) {
        return this.userService.findOne(id);
    }
}
