import { bot } from './bot';
import { messages } from '../i18n/messages';

bot.command('start', async (ctx) => {
    const tgUser = ctx.from;
    if (!tgUser) return ctx.reply(messages.ru.errorUser);

    const lang = (tgUser.language_code as 'ru' | 'en' | 'uz') ?? 'ru';
    const t = messages[lang];

    try {
        await ctx.reply(t.welcome(tgUser.first_name));

        await ctx.conversation.enter('registerUser');
    } catch (err) {
        console.error('Failed to enter conversation:', err);
    }
});

bot.start({ drop_pending_updates: true })
    .then(() => console.log('Bot started'))
    .catch((err) => {
        console.error('Failed to start bot:', err);
        process.exit(1);
    });

export default bot;
