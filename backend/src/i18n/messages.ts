// src/i18n/messages.ts
export const messages = {
    ru: {
        welcome: (name?: string) =>
            `Привет${name ? `, ${name}` : ''}! 💕 Добро пожаловать в Affina — давай создадим твой профиль 💫`,

        chooseLanguage:
            'Пожалуйста, выберите язык / Please choose your language / Iltimos, tilni tanlang',
        setupProfile: 'Давай заполним твой профиль 💫',
        chooseName: 'Хочешь использовать имя из Telegram или ввести другое?',
        useTelegramName: 'Использовать имя Telegram',
        typeDifferentName: 'Ввести другое имя',
        askCustomName: 'Пожалуйста, напиши своё имя:',
        openMiniApp: 'Готово! Откройте свой профиль в мини‑приложении:',

        askAge: 'Сколько тебе лет?',
        askGender: 'Какой у тебя пол?',
        genderMale: 'Мужчина',
        genderFemale: 'Женщина',
        askCity: 'Из какого ты города?',
        askPhoto:
            'Загрузите, пожалуйста, одну фотографию. Вы сможете изменить её позже, включая всю другую информацию, которую вы предоставили ранее.',

        errorUser: 'Ошибка: не удалось получить информацию о пользователе Telegram.',
        errorAge: 'Возвраст должен быть цифрой.',

        regions: [
            'Андижан',
            'Бухара',
            'Фергана',
            'Джизак',
            'Наманган',
            'Навои',
            'Кашкадарья',
            'Самарканд',
            'Сырдарья',
            'Сурхандарья',
            'Ташкент',
            'Хорезм',
        ],
    },

    en: {
        welcome: (name?: string) =>
            `Hello${name ? `, ${name}` : ''}! 💕 Welcome to Affina — let’s set up your profile 💫`,

        chooseLanguage:
            'Пожалуйста, выберите язык / Please choose your language / Iltimos, tilni tanlang',
        setupProfile: 'Let’s fill in your profile 💫',
        chooseName: 'Do you want to use your Telegram name or type a different one?',
        useTelegramName: 'Use Telegram name',
        typeDifferentName: 'Type a different name',
        askCustomName: 'Please type your preferred name:',
        openMiniApp: 'All done! Open your profile in the mini app:',

        askAge: 'How old are you?',
        askGender: 'What is your gender?',
        genderMale: 'Man',
        genderFemale: 'Woman',
        askCity: 'What city are you from?',
        askPhoto:
            'Uplaod one photo please. You will be able to change it later, including all the other information you provided earlier.',

        errorUser: 'Error: Unable to retrieve your Telegram user information.',
        errorAge: 'Age should be a number.',

        regions: [
            'Andijan',
            'Bukhara',
            'Fergana',
            'Jizzakh',
            'Namangan',
            'Navoiy',
            'Qashqadaryo',
            'Samarqand',
            'Sirdaryo',
            'Surxondaryo',
            'Tashkent',
            'Khorezm',
        ],
    },

    uz: {
        welcome: (name?: string) =>
            `Salom${name ? `, ${name}` : ''}! 💕 Affinaʼga xush kelibsiz — profilingizni sozlaymiz 💫`,

        chooseLanguage:
            'Пожалуйста, выберите язык / Please choose your language / Iltimos, tilni tanlang',
        setupProfile: 'Keling, profilingizni to‘ldiramiz 💫',
        chooseName: 'Telegram dagi ismingizni ishlatmoqchimisiz yoki boshqasini yozasizmi?',
        useTelegramName: 'Telegram ismini ishlatish',
        typeDifferentName: 'Boshqa ism yozish',
        askCustomName: 'Iltimos, ismingizni yozing:',
        openMiniApp: 'Hammasi tayyor! Mini ilovada profilingizni oching:',

        askAge: 'Yoshingiz nechida?',
        askGender: 'Jinsingiz qanday?',
        genderMale: 'Erkak',
        genderFemale: 'Ayol',
        askCity: 'Qaysi shahardansiz?',
        askPhoto:
            'Iltimos, bitta rasm yuklang. Keyinchalik uni, shuningdek ilgari taqdim etgan barcha ma’lumotlaringizni o‘zgartirishingiz mumkin bo‘ladi.',

        errorUser: 'Xato: Telegram foydalanuvchi maʼlumotlarini olish imkoni bo‘lmadi.',
        errorAge: 'Yosh raqam bo‘lishi kerak.',

        regions: [
            'Andijon',
            'Buxoro',
            'Farg‘ona',
            'Jizzax',
            'Namangan',
            'Navoiy',
            'Qashqadaryo',
            'Samarqand',
            'Sirdaryo',
            'Surxondaryo',
            'Toshkent',
            'Xorazm',
        ],
    },
};
