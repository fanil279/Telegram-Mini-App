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

        askAge: 'Сколько тебе лет?',
        askGender: 'Какой у тебя пол?',
        genderMale: 'Мужчина',
        genderFemale: 'Женщина',
        askCity: 'Из какого ты города?',

        errorUser: 'Ошибка: не удалось получить информацию о пользователе Telegram.',
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

        askAge: 'How old are you?',
        askGender: 'What is your gender?',
        genderMale: 'Man',
        genderFemale: 'Woman',
        askCity: 'What city are you from?',

        errorUser: 'Error: Unable to retrieve your Telegram user information.',
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

        askAge: 'Yoshingiz nechida?',
        askGender: 'Jinsingiz qanday?',
        genderMale: 'Erkak',
        genderFemale: 'Ayol',
        askCity: 'Qaysi shahardansiz?',

        errorUser: 'Xato: Telegram foydalanuvchi maʼlumotlarini olish imkoni bo‘lmadi.',
    },
};
