import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id: id } });
    }

    getUserPhotos(userId: number) {
        return this.prisma.userAvatar.findMany({ where: { id: userId } } );
    }

    getUserPreferences(userId: number) {
        return this.prisma.userPreference.findMany({ where: { userId: userId } } );
    }
}
