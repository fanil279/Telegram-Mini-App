import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterUserData } from './dto/registerUserData';
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

        return this.prisma.user.upsert({
            update: { ...data, gender: genderEnum },
            create: { ...data, gender: genderEnum },
            where: { telegramId: data.telegramId },
        });
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
