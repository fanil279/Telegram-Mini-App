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
        let age: number;
        const regex = /^\d+$/;
        await ctx.reply(t.askAge);
        const { message: ageMsg } = await conversation.waitFor('message:text');
        if (regex.test(ageMsg.text)) {
            age = parseInt(ageMsg.text);
        } else {
            do {
                await ctx.reply(t.errorAge);
                const { message: ageMsg } = await conversation.waitFor('message:text');
                age = parseInt(ageMsg.text);
            } while (!regex.test(String(age)));
        }

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
        await ctx.reply(t.askCity, {
            reply_markup: new InlineKeyboard()
                .text(t.regions[0]!, 'tashkent')
                .text(t.regions[1]!, 'bukhara')
                .text(t.regions[2]!, 'fergana')
                .row()
                .text(t.regions[3]!, 'jizzakh')
                .text(t.regions[4]!, 'namangan')
                .text(t.regions[5]!, 'navoiy')
                .row()
                .text(t.regions[6]!, 'qashqadaryo')
                .text(t.regions[7]!, 'samarqand')
                .text(t.regions[8]!, 'sirdaryo')
                .row()
                .text(t.regions[9]!, 'surxondaryo')
                .text(t.regions[10]!, 'tashkent')
                .text(t.regions[11]!, 'khorezm')
        });
        const { callbackQuery: cityQuery } = await conversation.waitFor('callback_query:data');
        const city = cityQuery.data;

        // Ask main photo
        await ctx.reply(t.askPhoto);
        const { msg } = await conversation.waitFor('message:photo');
        const highResPhoto = msg.photo.at(-1);
        const photoId = highResPhoto!.file_id;

        // Save to user profile
        await this.authService.registerUser({
            telegramId: tgUser.id,
            fullname: name,
            age: age,
            gender: gender,
            city: city,
            username: tgUser.username,
            url: photoId,
        });

        // Call mini app
        await ctx.reply(t.openMiniApp, {
            reply_markup: new InlineKeyboard().webApp('Open Affina', process.env.FRONTEND_URL!),
        });
    }
}
