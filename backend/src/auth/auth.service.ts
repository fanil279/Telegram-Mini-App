import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterUserData } from './dto/registerInputData';
import { LoginUserData } from './dto/loginInputData';
import { Gender } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async registerUser(data: RegisterUserData) {
        const genderEnum = data.gender.toUpperCase() === 'MALE' ? Gender.MALE : Gender.FEMALE;

        const user = this.prisma.user.create({
            data: {
                telegramId: data.telegramId,
                fullname: data.fullname,
                age: data.age,
                city: data.city,
                gender: genderEnum,
                username: data.username,
            },
        });

        const userId = (await user).id;

        const userPhoto = this.prisma.userAvatar.create({
            data: {
                url: data.url,
                user: { connect: { id: userId } },
            },
        });

        return await Promise.all([user, userPhoto]);
    }

    async loginUser(data: LoginUserData) {
        const telegramIdBigInt = BigInt(data.telegramId);

        const user = await this.prisma.user.findUnique({
            where: { telegramId: telegramIdBigInt },
            include: {
                photos: {
                    where: { isMainProfilePhoto: true },
                    select: { url: true },
                },
            },
        });

        if (!user) throw new Error('User not found');

        const token = this.jwtService.sign({
            telegramId: user.telegramId.toString(),
            userId: user.id.toString(),
        });

        return {
            token,
            id: user.id.toString(),
            telegramId: user.telegramId.toString(),
            avatarUrl: user.photos[0]?.url ?? '',
        };
    }
}
