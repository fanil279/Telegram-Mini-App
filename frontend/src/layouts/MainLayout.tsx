import React, { type FC, Suspense, useState, useEffect, createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Avatar from '../components/Avatar';
import { Heart, Sun, Moon, Bell, Award, Gem, Crown, Diamond } from 'lucide-react';
import { type ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};

export const subscriptionBadges = {
    FREE: { color: 'bg-gray-500/10 text-gray-600 border-gray-500/20', icon: null },
    BRONZE: { color: 'bg-amber-600/10 text-amber-700 border-amber-600/20', icon: Award },
    SILVER: { color: 'bg-gray-400/10 text-gray-600 border-gray-400/20', icon: Gem },
    GOLD: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: Crown },
    PLATINUM: { color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: Diamond },
};

const MainLayout: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { subscription, likesRemaining, notifications } = useSelector(
        (state: RootState) => state.dashboard,
    );
    const avatarUrl = useSelector((state: RootState) => state.auth.avatarUrl);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);

            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;

            if (newMode) {
                localStorage.setItem('theme', 'dark');

                document.documentElement.classList.add('dark');
            } else {
                localStorage.setItem('theme', 'light');

                document.documentElement.classList.remove('dark');
            }

            return newMode;
        });
    };

    return (
        <div
            lang='ru'
            className={`min-h-screen ${isDarkMode ? 'dark bg-background' : 'bg-gray-50'}`}
        >
            <header className='border-border bg-card/50 sticky top-0 z-50 border-b backdrop-blur'>
                <div className='flex flex-col items-center gap-3 px-4 py-2 md:h-16 md:flex-row md:justify-between md:gap-0 md:px-6 md:py-0'>
                    {/* Left side: Logo + Likes + Badge */}
                    <div className='mt-3 mb-3 flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center md:gap-4'>
                        {/* Logo */}
                        <div className='flex items-center justify-center gap-2'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-600 to-pink-700 shadow-lg'>
                                <Heart className='h-4 w-4 text-white' />
                            </div>
                            <h1
                                className={`flex bg-gradient-to-r text-xl leading-none font-semibold text-transparent ${isDarkMode ? 'from-gray-100 to-gray-300' : 'from-gray-900 to-gray-700'} bg-clip-text`}
                            >
                                Affina
                            </h1>
                        </div>

                        {/* Likes left */}
                        {subscription === 'FREE' && (
                            <div className='flex items-center justify-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1'>
                                <Heart className='h-6 w-6 text-pink-600 max-sm:h-4 max-sm:w-4' />
                                <span className='text-base font-medium text-pink-600 max-sm:text-sm'>
                                    Осталось {likesRemaining} лайков
                                </span>
                            </div>
                        )}

                        {/* Subscription badge */}
                        <div className='hidden items-center justify-center gap-2 md:flex'>
                            <Badge className={`${subscriptionBadges[subscription].color} border`}>
                                {subscriptionBadges[subscription].icon &&
                                    React.createElement(subscriptionBadges[subscription].icon, {
                                        className: 'h-4 w-4 mr-1 max-sm:h-3 max-sm:w-3',
                                    })}
                                {subscription}
                            </Badge>
                        </div>
                    </div>

                    {/* Right side: buttons + avatar */}
                    <div className='flex w-full flex-wrap items-center justify-center gap-4 md:mt-0 md:w-auto md:justify-end'>
                        <Button variant='secondary' size='sm'>
                            <p>RU</p>
                        </Button>

                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={toggleTheme}
                            className={`mr-4 rounded-lg border p-2 transition-all duration-200 ${
                                isDarkMode
                                    ? 'border-gray-600 bg-gray-800 shadow-md hover:bg-gray-700'
                                    : 'border-gray-300 bg-white shadow-md hover:bg-gray-100'
                            } max-sm:p-1`}
                            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {isDarkMode ? (
                                <Sun className='h-6 w-6 text-yellow-400 max-sm:h-4 max-sm:w-4' />
                            ) : (
                                <Moon className='h-6 w-6 text-gray-700 max-sm:h-4 max-sm:w-4' />
                            )}
                        </Button>

                        <div className='h-10 w-0.5 bg-pink-500'></div>

                        <Button variant='ghost' size='sm' className='relative'>
                            <Bell className='h-6 w-6 max-sm:h-4 max-sm:w-4' />
                            <div className='absolute -top-1 -right-1 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-[oklch(0.75_0.12_160)] text-[11px] text-white max-sm:h-3 max-sm:w-3 max-sm:text-[9px]'>
                                {notifications}
                            </div>
                        </Button>

                        {avatarUrl && (
                            <Avatar
                                className='h-10 w-10 ring-2 ring-pink-500/20 max-sm:h-8 max-sm:w-8'
                                src={avatarUrl}
                            />
                        )}
                    </div>
                </div>
            </header>

            <main>
                <Suspense fallback={<Loading />}>
                    <ThemeContext.Provider value={{ isDarkMode }}>
                        <Outlet />
                    </ThemeContext.Provider>
                </Suspense>
            </main>
        </div>
    );
};

export default MainLayout;
