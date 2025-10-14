import * as dotenv from 'dotenv';
import { Bot, type Context } from 'grammy';
import type { ConversationFlavor } from '@grammyjs/conversations';

dotenv.config();

export type MyContext = Context & ConversationFlavor<Context>;

export const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
