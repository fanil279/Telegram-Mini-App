import { type FC } from 'react';
import { useTheme } from '../../../layouts/MainLayout';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import Card from '../../../components/Card';
import Badge from '../../../components/Badge';
import Progress from './Progress';
import Button from '../../../components/Button';
import { Heart, Camera, Trophy, Target, Edit3 } from 'lucide-react';

const AffinaDashboard: FC = () => {
    const { isDarkMode } = useTheme();
    const matches = useSelector((state: RootState) => state.dashboard.matches);

    return (
        <div className='mx-auto max-w-7xl p-6'>
            <div className='mb-8 flex items-center justify-between'>
                <div>
                    <h2
                        className={`mb-2 bg-gradient-to-r text-3xl font-bold ${isDarkMode ? 'from-gray-100 to-gray-300' : 'from-gray-900 to-gray-700'} bg-clip-text`}
                    >
                        Добрый вечер, Фаниль! ✨
                    </h2>
                    {matches !== 0 && (
                        <p className='text-muted-foreground text-lg'>
                            Новые совпадения ждут вас:{' '}
                            <span className='text-primary'>{matches}</span>
                        </p>
                    )}
                </div>
            </div>

            <Card className='mb-8 border-pink-500/20 bg-gradient-to-r from-pink-500/5 via-pink-500/3 to-transparent'>
                <div className='flex flex-col gap-4 p-6 pb-4 sm:flex-row sm:items-center sm:justify-between'>
                    {/* Left side */}
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

                    {/* Button */}
                    <Button
                        variant='outline'
                        size='sm'
                        className='bg-card/50 w-full sm:w-auto dark:bg-gray-900/50'
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

                    {/* Badges */}
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
        </div>
    );
};

export default AffinaDashboard;
