import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import type { MyContext } from './bot';
import { Conversation } from '@grammyjs/conversations';
import { InlineKeyboard } from 'grammy';
import { messages } from '../i18n/messages';

@Injectable()
export class BotService {
    constructor(private readonly authService: AuthService) {}

    async registerUser(conversation: Conversation<MyContext, MyContext>, ctx: MyContext) {
        const tgUser = ctx.from;
        if (!tgUser) {
            await ctx.reply(messages.ru.errorUser);
            return;
        }

        const lang = (tgUser.language_code as 'ru' | 'en' | 'uz') ?? 'ru';
        let t = messages[lang];

        // Language selection
        let selectedLang: 'ru' | 'en' | 'uz' = lang;
        await ctx.reply(t.chooseLanguage, {
            reply_markup: new InlineKeyboard()
                .text('Русский', 'lang_ru')
                .text('English', 'lang_en')
                .text("O'zbekcha", 'lang_uz'),
        });
        const { callbackQuery } = await conversation.waitFor('callback_query:data');
        if (callbackQuery.data === 'lang_ru') selectedLang = 'ru';
        else if (callbackQuery.data === 'lang_en') selectedLang = 'en';
        else if (callbackQuery.data === 'lang_uz') selectedLang = 'uz';
        t = messages[selectedLang];

        await ctx.reply(t.setupProfile);

        // Ask for name
        let name: string;
        await ctx.reply(t.chooseName, {
            reply_markup: new InlineKeyboard()
                .text(t.useTelegramName, 'use_telegram_name')
                .text(t.typeDifferentName, 'type_different_name'),
        });
        const { callbackQuery: nameQuery } = await conversation.waitFor('callback_query:data');
        if (nameQuery.data === 'use_telegram_name') name = tgUser.first_name || 'User';
        else {
            await ctx.reply(t.askCustomName);
            const { message } = await conversation.waitFor('message:text');
            name = message.text;
        }

        // Ask age
        await ctx.reply(t.askAge);
        const { message: ageMsg } = await conversation.waitFor('message:text');
        const age = parseInt(ageMsg.text);

        // Ask gender
        let gender: 'Male' | 'Female' = 'Male';
        await ctx.reply(t.askGender, {
            reply_markup: new InlineKeyboard()
                .text(t.genderMale, 'gender_male')
                .text(t.genderFemale, 'gender_female'),
        });
        const { callbackQuery: genderQuery } = await conversation.waitFor('callback_query:data');
        if (genderQuery.data === 'gender_male') gender = 'Male';
        else if (genderQuery.data === 'gender_female') gender = 'Female';

        // Ask city
        await ctx.reply(t.askCity);
        const { message: cityMsg } = await conversation.waitFor('message:text');
        const city = cityMsg.text;

        // Save to user profile
        await this.authService.registerUser({
            telegramId: tgUser.id,
            fullname: name,
            age: age,
            gender: gender,
            city: city,
            username: tgUser.username,
        });

        // Call mini app
        await ctx.reply('All done! Open your profile in the mini app:', {
            reply_markup: new InlineKeyboard().webApp('Open Affina', process.env.FRONTEND_URL!),
        });
    }
}
