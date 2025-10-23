import * as dotenv from 'dotenv';
import { Bot, SessionFlavor, session, type Context } from 'grammy';
import redisClient from 'src/config/redis';
import { RedisAdapter } from '@grammyjs/storage-redis';
import {
    conversations,
    createConversation,
    type ConversationFlavor,
} from '@grammyjs/conversations';
import { BotService } from './conversation';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

type RegistrationStep = 'language' | 'name' | 'age' | 'gender' | 'city' | 'photo' | 'done';

interface MySession {
    registration?: Partial<{
        language: string;
        name: string;
        age: number;
        gender: string;
        city: string;
        mainPhoto: string;
        step: RegistrationStep;
    }>;
}

export const redisStorage = new RedisAdapter<MySession>({
    instance: redisClient,
    ttl: 60 * 60 * 24,
});

export type MyContext = Context & ConversationFlavor<Context> & SessionFlavor<MySession>;

export const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

const prismaService = new PrismaService();
const authService = new AuthService(prismaService, new JwtService());
const botService = new BotService(authService);

bot.use(
    session({
        initial: () => ({}),
        storage: redisStorage,
    }),
);

bot.use(conversations());

bot.use(createConversation(botService.registerUser.bind(botService), 'registerUser'));
