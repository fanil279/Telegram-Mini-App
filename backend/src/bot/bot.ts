import * as dotenv from 'dotenv';
import { Bot, SessionFlavor, type Context } from 'grammy';
import type { ConversationFlavor } from '@grammyjs/conversations';

dotenv.config();

export type MyContext = Context & ConversationFlavor<Context> & SessionFlavor<{}>;

export const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);
