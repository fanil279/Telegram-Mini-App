import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserAvatar } from './models/userAvatars.model';
import { UserPreference } from './models/userPreferences.model';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    users() {
        return this.userService.findAll();
    }

    @ResolveField(() => [UserAvatar], { nullable: 'itemsAndList' })
    userPhotos(@Parent() user: User) {
        return this.userService.getUserPhotos(user.id);
    }

    @ResolveField(() => [UserPreference], { nullable: 'itemsAndList' })
    userPreferences(@Parent() user: User) {
        return this.userService.getUserPreferences(user.id);
    }

    @Query(() => User, { nullable: true })
    user(@Args('id') id: number) {
        return this.userService.findOne(id);
    }
}
