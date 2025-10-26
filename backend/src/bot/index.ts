import { bot } from './bot';
import { messages } from '../i18n/messages';
import { PrismaService } from 'prisma/prisma.service';

const prisma = new PrismaService();

bot.command('start', async (ctx) => {
    const tgUser = ctx.from;
    if (!tgUser) return ctx.reply(messages.ru.errorUser);

    const user = await prisma.user.findUnique({ where: { telegramId: tgUser.id } });

    const lang = (tgUser.language_code as 'ru' | 'en' | 'uz') ?? 'ru';
    const t = messages[lang];

    if (!user) {
        try {
            await ctx.reply(t.welcome(tgUser.first_name));

            await ctx.conversation.enter('registerUser');
        } catch (err) {
            console.error('Failed to enter conversation:', err);
        }
    } else {
        ctx.reply(t.isReg);
    }
});

bot.start({ drop_pending_updates: true })
    .then(() => console.log('Bot started'))
    .catch((err) => {
        console.error('Failed to start bot:', err);
        process.exit(1);
    });

export default bot;
