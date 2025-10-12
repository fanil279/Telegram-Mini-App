import { type FC } from 'react';
import { useTheme } from '../../../layouts/MainLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setSubscription } from '../dashboardSlice';
import type { RootState, AppDispatch } from '../../../store';
import Card from '../../../components/Card';
import Badge from '../../../components/Badge';
import Progress from './Progress';
import Button from '../../../components/Button';
import {
    Heart,
    Camera,
    Trophy,
    Target,
    Edit3,
    MessageCircle,
    TrendingUp,
    Zap,
    Filter,
    Sparkles,
    Gift,
    ArrowRight,
} from 'lucide-react';
import Avatar from '../../../components/Avatar';
import { subscriptionBadges } from '../../../layouts/MainLayout';
import type { SubscriptionType } from '../../../types';
import Instructions from './Instructions';

// Mock data for prototyping
const recentChats = [
    {
        id: 1,
        name: 'Sarah Ahmed',
        lastMessage: "That sounds amazing! I'd love to...",
        time: '2 min ago',
        unread: 2,
        image: '/young-muslim-woman.jpg',
        isOnline: true,
        isTyping: true,
    },
    {
        id: 2,
        name: 'Maryam Khan',
        lastMessage: 'Thank you for the recommendation',
        time: '1 hour ago',
        unread: 0,
        image: '/young-muslim-woman-with-hijab.jpg',
        isOnline: false,
        isTyping: false,
    },
    {
        id: 3,
        name: 'Zara Ali',
        lastMessage: 'Looking forward to meeting you!',
        time: '3 hours ago',
        unread: 1,
        image: '/young-muslim-woman-smiling.png',
        isOnline: true,
        isTyping: false,
    },
];

const AffinaDashboard: FC = () => {
    const { isDarkMode } = useTheme();
    const { totalMatches, newMatches, totalChats, activeChats, subscription } = useSelector(
        (state: RootState) => state.dashboard,
    );

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='mx-auto max-w-7xl p-6'>
            <div className='mb-8 flex flex-col items-center justify-between sm:flex-row'>
                <div className='mb-4'>
                    <h2
                        className={`mb-2 bg-gradient-to-r text-3xl font-bold ${isDarkMode ? 'from-gray-100 to-gray-300' : 'from-gray-900 to-gray-700'} bg-clip-text`}
                    >
                        Добрый вечер, Фаниль! ✨
                    </h2>
                    {newMatches !== 0 && (
                        <p className='text-muted-foreground text-lg'>
                            Новые совпадения ждут вас:{' '}
                            <span className='text-primary'>{newMatches}</span>
                        </p>
                    )}
                </div>
                <div className='text-center'>
                    <span className='text-lg font-semibold text-pink-500 drop-shadow-sm'>
                        2/10/2025
                    </span>
                </div>
            </div>

            <Card className='mb-8 border-pink-500/20 bg-gradient-to-r from-pink-500/5 via-pink-500/3 to-transparent'>
                <div className='flex flex-col gap-4 p-6 pb-4 sm:flex-row sm:items-center sm:justify-between'>
                    {/* Card header */}
                    <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-500/10'>
                            <Target className='h-5 w-5 text-pink-600' />
                        </div>
                        <div>
                            <h1 className='text-base leading-none font-semibold tracking-tight sm:text-lg'>
                                Заполни профиль
                            </h1>
                            <p className='text-muted-foreground text-xs sm:text-sm'>
                                Разблокируй премиальные возможности на 100%
                            </p>
                        </div>
                    </div>

                    {/* Edit button */}
                    <Button
                        variant='outline'
                        size='sm'
                        className='bg-card/50 dark:hover:bg-primary w-full cursor-pointer sm:w-auto dark:bg-gray-900/50'
                    >
                        <Edit3 className='mr-2 h-4 w-4' />
                        Редактировать профиль
                    </Button>
                </div>

                {/* Progress section */}
                <div className='space-y-4 p-6 pt-0'>
                    <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                        <span className='text-muted-foreground text-sm'>Статус профиля</span>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium'>75%</span>
                            <Trophy className='h-4 w-4 text-yellow-500' />
                        </div>
                    </div>
                    <Progress value={50} className='h-3' />

                    {/* Recommendation badges */}
                    <div className='flex flex-wrap gap-2 text-xs'>
                        <Badge
                            variant='secondary'
                            className='border-pink-500/20 bg-pink-500/10 text-pink-600 dark:border-gray-700/20 dark:bg-gray-800/10 dark:text-gray-100'
                        >
                            <Camera className='mr-1 h-3 w-3' />
                            Добавь 2 новых фото (+15%)
                        </Badge>
                        <Badge
                            variant='secondary'
                            className='border-green-500/20 bg-green-500/10 text-green-600 dark:border-gray-700/20 dark:bg-gray-800/10 dark:text-gray-100'
                        >
                            <Heart className='mr-1 h-3 w-3' />
                            Заполни предпочтения (+10%)
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Main content */}
            <div className='grid gap-6 lg:grid-cols-3'>
                {/* Recent Chats */}
                <section className='space-y-6'>
                    <Card className='p-6'>
                        {/* Card header */}
                        <div className='mb-4 flex items-center justify-between gap-2 leading-none tracking-tight'>
                            <MessageCircle className='h-5 w-5 text-pink-600' />

                            <span className='text-sm font-bold sm:text-base'>Недавние чаты</span>

                            <Button
                                className='hover:bg-primary cursor-pointer border border-black p-6 font-bold sm:p-2 dark:border-white'
                                variant='ghost'
                                size='sm'
                            >
                                Просмотреть все
                            </Button>
                        </div>

                        {/* Card content */}
                        <div className='space-y-4'>
                            {recentChats.map((chat) => (
                                <div
                                    className='border-border bg-muted hover:bg-accent flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all duration-200 hover:shadow-md'
                                    key={chat.id}
                                >
                                    <div className='relative'>
                                        <Avatar
                                            className='h-10 w-10'
                                            src='test'
                                            alt='avatar photo'
                                        ></Avatar>

                                        {chat.isOnline && (
                                            <div className='absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-500'></div>
                                        )}
                                        {chat.unread > 0 && (
                                            <div className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[10px] text-white'>
                                                {chat.unread}
                                            </div>
                                        )}
                                    </div>

                                    <div className='min-w-0 flex-1'>
                                        <div className='flex flex-col gap-1 [@media(min-width:360px)]:flex-row [@media(min-width:360px)]:items-center [@media(min-width:360px)]:justify-between'>
                                            <h4 className='truncate text-sm font-medium'>
                                                {chat.name}
                                            </h4>
                                            <span className='text-muted-foreground text-xs'>
                                                {chat.time}
                                            </span>
                                        </div>
                                        <p>
                                            {chat.isTyping ? (
                                                <span className='text-sm text-pink-600 sm:font-medium'>
                                                    Typing...
                                                </span>
                                            ) : (
                                                <span className='text-xs sm:text-sm'>
                                                    {chat.lastMessage}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>

                {/* Activity */}
                <section>
                    <Card className='p-6'>
                        {/* Card header */}
                        <div className='mb-4 text-lg leading-none font-semibold tracking-tight'>
                            <div className='flex items-center justify-between gap-2 leading-none tracking-tight'>
                                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-600 to-pink-700'>
                                    <TrendingUp className='h-4 w-4 text-white' />
                                </div>

                                <span>Твоя Активность</span>

                                <Button
                                    className='hover:bg-primary cursor-pointer border border-black p-6 font-bold sm:p-2 dark:border-white'
                                    variant='ghost'
                                    size='sm'
                                >
                                    Вся активность
                                </Button>
                            </div>
                        </div>

                        {/* Card content */}
                        <div className='space-y-4'>
                            <div className='bg-red-500/5" flex items-center justify-between rounded-lg p-2'>
                                <div>
                                    <Heart className='h-4 w-4 text-red-500' />
                                    <span className='text-sm'>Совпадения</span>
                                </div>

                                <div className='text-right'>
                                    <div className='font-semibold text-red-500'>{totalMatches}</div>
                                    <div className='text-muted-foreground text-xs'>
                                        +{newMatches} сегодня
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between rounded-lg bg-pink-500/5 p-2'>
                                <div className='flex items-center gap-2'>
                                    <MessageCircle className='h-4 w-4 text-pink-500' />
                                    <span className='text-sm'>Чаты</span>
                                </div>
                                <div className='text-right'>
                                    <div className='font-semibold text-pink-500'>{totalChats}</div>
                                    <div className='text-muted-foreground text-xs'>
                                        активных: {activeChats}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Subscriptions */}
                <section>
                    <Card className='relative overflow-hidden border-pink-500/20 bg-gradient-to-br from-pink-500/10 via-pink-500/5 to-transparent p-6'>
                        {/* Visual effect */}
                        <div className='absolute top-0 right-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br from-pink-500/20 to-transparent' />

                        {/* Card header */}
                        <div className='mb-4 flex items-center gap-2 leading-none tracking-tight'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-600 to-pink-700'>
                                <Sparkles className='h-4 w-4 text-white' />
                            </div>
                            <div>
                                <p>Обнови свой план</p>
                                <p>Текущий: {subscription}</p>
                            </div>
                        </div>

                        {/* Card content */}
                        <div className='mb-4 space-y-3'>
                            {Object.entries(subscriptionBadges).map(([plan]) => {
                                const key = plan as keyof typeof subscriptionBadges;
                                const Icon = subscriptionBadges[key].icon;

                                const subscriptionHandler = (plan: SubscriptionType) => {
                                    dispatch(setSubscription(plan));
                                };

                                return (
                                    <div
                                        key={plan}
                                        className='border-border bg-muted flex items-center justify-between rounded-lg border p-2'
                                    >
                                        <div className='flex items-center gap-2'>
                                            {Icon && <Icon className='h-4 w-4' />}
                                            <span className='font-medium'>{plan}</span>
                                        </div>

                                        <Button
                                            size='sm'
                                            variant={
                                                subscription === plan ? 'secondary' : 'outline'
                                            }
                                            onClick={() =>
                                                subscriptionHandler(plan as SubscriptionType)
                                            }
                                        >
                                            {subscription === plan ? 'Текущий' : 'Обновить'}
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>

                        <ul className='mb-4 space-y-2 text-sm'>
                            <li className='flex items-center gap-3'>
                                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-pink-500/20'>
                                    <Zap className='h-2 w-2 text-pink-600' />
                                </div>

                                <span>Безлимитные реакции и супер-лайки</span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-pink-500/20'>
                                    <Filter className='h-2 w-2 text-pink-600' />
                                </div>

                                <span>Свайпы и бусты</span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='flex h-4 w-4 items-center justify-center rounded-full bg-pink-500/20'>
                                    <Gift className='h-2 w-2 text-pink-600' />
                                </div>

                                <span>Просмотр посетителей профиля и многое другое</span>
                            </li>
                        </ul>
                        <Button
                            className='flex w-full items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white hover:from-pink-700 hover:to-pink-800 dark:bg-gradient-to-r dark:from-pink-500 dark:to-pink-600 dark:hover:from-pink-600 dark:hover:to-pink-700'
                            onClick={() => {}}
                        >
                            <Sparkles className='h-4 w-4' />
                            <span>Узнать больше о каждом плане</span>
                            <ArrowRight className='mt-1 h-4 w-4' />
                        </Button>
                    </Card>
                </section>
            </div>

            <Instructions />
        </div>
    );
};

export default AffinaDashboard;
