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

        const user = this.prisma.user.upsert({
            update: {
                telegramId: data.telegramId,
                fullname: data.fullname,
                age: data.age,
                gender: genderEnum,
                username: data.username,
            },
            create: {
                telegramId: data.telegramId,
                fullname: data.fullname,
                age: data.age,
                city: data.city,
                gender: genderEnum,
                username: data.username,
            },
            where: { telegramId: data.telegramId },
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
        });

        const token = this.jwtService.sign({
            telegramId: user!.telegramId.toString(),
        });

        return {
            token,
            telegramId: user!.telegramId.toString(),
        };
    }
}
