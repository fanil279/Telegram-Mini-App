import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterUserData } from './dto/registerUserData';
import { Gender } from 'generated/prisma';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async registerUser(data: RegisterUserData) {
        const genderEnum = data.gender.toUpperCase() === 'MALE' ? Gender.MALE : Gender.FEMALE;

        return this.prisma.user.upsert({
            update: { ...data, gender: genderEnum },
            create: { ...data, gender: genderEnum },
            where: { telegramId: data.telegramId },
        });
    }
}
