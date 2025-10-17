import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtStrategy } from '../config/jwtStrategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({ secret: process.env.JWT_SECRET!, signOptions: { expiresIn: '7d' } }),
    ],
    providers: [AuthResolver, AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
