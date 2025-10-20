import { bot } from './bot';
import { session } from 'grammy';
import { conversations, createConversation } from '@grammyjs/conversations';
import { BotService } from './conversation';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { messages } from '../i18n/messages';
import { JwtService } from '@nestjs/jwt';

const prismaService = new PrismaService();
const authService = new AuthService(prismaService, new JwtService());
const botService = new BotService(authService);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(botService.registerUser.bind(botService), 'registerUser'));

bot.command('start', async (ctx) => {
    const tgUser = ctx.from;
    if (!tgUser) return ctx.reply(messages.ru.errorUser);

    const lang = (tgUser.language_code as 'ru' | 'en' | 'uz') ?? 'ru';
    const t = messages[lang];

    await ctx.reply(t.welcome(tgUser.first_name));

    await ctx.conversation.enter('registerUser');
});

bot.start({ drop_pending_updates: true })
    .then(() => console.log('Bot started'))
    .catch((err) => {
        console.error('Failed to start bot:', err);
        process.exit(1);
    });

export default bot;
