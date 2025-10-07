import { type FC, useState, useRef } from 'react';
import type { SwipeableCardProps } from '../types';
import Card from './Card';
import {
    Heart,
    ThumbsUp,
    X,
    Award,
    Star,
    Clock,
    MapPin,
    Users,
    BookOpen,
    Plane,
    Coffee,
    Music,
    Palette,
    Camera,
    Dumbbell,
} from 'lucide-react';
import Badge from './Badge';
import ReactLogo from '../assets/react.svg';

// Mock data for prototyping
export const potentialMatches = [
    {
        id: 1,
        name: 'Aisha Rahman',
        age: 26,
        location: 'Dubai, UAE',
        compatibility: 94,
        interests: ['Reading', 'Travel', 'Cooking'],
        lastActive: '2 hours ago',
        image: ReactLogo,
        isOnline: true,
        mutualFriends: 3,
        recentActivity: 'Added new photos',
        verified: true,
    },
    {
        id: 2,
        name: 'Fatima Al-Zahra',
        age: 24,
        location: 'Abu Dhabi, UAE',
        compatibility: 89,
        interests: ['Art', 'Photography', 'Fitness'],
        lastActive: '1 hour ago',
        image: ReactLogo,
        isOnline: true,
        mutualFriends: 1,
        recentActivity: 'Updated profile',
        verified: true,
    },
    {
        id: 3,
        name: 'Layla Hassan',
        age: 28,
        location: 'Sharjah, UAE',
        compatibility: 92,
        interests: ['Music', 'Nature', 'Volunteering'],
        lastActive: '30 min ago',
        image: ReactLogo,
        isOnline: false,
        mutualFriends: 5,
        recentActivity: 'Shared a moment',
        verified: false,
    },
];

// Mock data for prototyping
const interestIcons = {
    Reading: BookOpen,
    Travel: Plane,
    Cooking: Coffee,
    Art: Palette,
    Photography: Camera,
    Fitness: Dumbbell,
    Music: Music,
    Nature: MapPin,
    Volunteering: Users,
};

const SwipeableCard: FC<SwipeableCardProps> = ({ match, onSwipe, isDisabled }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleStart = (clientX: number, clientY: number) => {
        if (isDisabled) return;
        setIsDragging(true);
        setStartPos({ x: clientX, y: clientY });
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (isDisabled || !isDragging) return;
        const offsetX = clientX - startPos.x;
        const offsetY = clientY - startPos.y;
        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleEnd = () => {
        if (!isDragging || isDisabled) return;
        setIsDragging(false);

        const { x, y } = dragOffset;
        const threshhold = 100;

        if (Math.abs(x) > threshhold || Math.abs(y) > threshhold) {
            if (Math.abs(x) > Math.abs(y)) {
                onSwipe(x > 0 ? 'right' : 'left');
            } else if (y > threshhold) {
                onSwipe('down');
            }
        }

        setDragOffset({ x: 0, y: 0 });
    };

    const getSwipableIndicator = (): null | string => {
        const { x, y } = dragOffset;
        const threshhold = 50;

        if (Math.abs(x) > threshhold || Math.abs(y) > threshhold) {
            if (Math.abs(x) > Math.abs(y)) {
                return x > 0 ? 'love' : 'like';
            } else if (y > threshhold) {
                return 'remove';
            }
        }

        return null;
    };

    const swipeIndicator = getSwipableIndicator();
    const rotation = isDragging ? dragOffset.x * 0.1 : 0;
    const scale = isDragging ? 1.05 : 1;

    return (
        <div>
            <div
                ref={cardRef}
                className={`relative select-none sm:grid-cols-3 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'}`}
                style={{
                    transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg) scale(${scale})`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={(e) => {
                    const touch = e.touches[0];
                    handleStart(touch.clientX, touch.clientY);
                }}
                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    handleMove(touch.clientX, touch.clientY);
                }}
                onTouchEnd={handleEnd}
            >
                <Card className='group overflow-hidden transition-all duration-300 hover:shadow-lg'>
                    <div className='relative'>
                        <img
                            src={match.image}
                            alt={match.name}
                            className='h-84 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                        />

                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

                        {swipeIndicator && (
                            <div className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
                                <div
                                    className={`rounded-full p-4 ${
                                        swipeIndicator === 'love'
                                            ? 'bg-red-500'
                                            : swipeIndicator === 'like'
                                              ? 'bg-green-500'
                                              : 'bg-gray-500'
                                    } animate-pulse text-white`}
                                >
                                    {swipeIndicator === 'love' && <Heart className='h-8 w-8' />}
                                    {swipeIndicator === 'like' && <ThumbsUp className='h-8 w-8' />}
                                    {swipeIndicator === 'remove' && <X className='h-8 w-8' />}
                                </div>
                            </div>
                        )}

                        <div className='absolute top-3 left-3 flex gap-2'>
                            {match.isOnline && (
                                <Badge
                                    variant='secondary'
                                    className='border-0 bg-green-500/90 text-white'
                                >
                                    <div className='mr-1 h-2 w-2 animate-pulse rounded-full bg-white' />
                                    <span className='text-black dark:text-white'>Online</span>
                                </Badge>
                            )}
                            {match.verified && (
                                <Badge
                                    variant='secondary'
                                    className='border-0 bg-pink-500/90 text-white'
                                >
                                    <Award className='mr-1 h-3 w-3' />
                                    <span className='text-black dark:text-white'>Verified</span>
                                </Badge>
                            )}
                        </div>

                        <div className='absolute top-3 right-3'>
                            <Badge
                                variant='secondary'
                                className='border-0 bg-white/90 backdrop-blur'
                            >
                                <Star className='mr-1 h-3 w-3 text-yellow-500' />
                                <span className='dark:text-black'>{match.compatibility}%</span>
                            </Badge>
                        </div>
                    </div>

                    <div className='p-4'>
                        <div className='space-y-3'>
                            <div>
                                <div className='flex items-center justify-between'>
                                    <h3 className='font-semibold'>
                                        {match.name}, {match.age}
                                    </h3>
                                    {match.mutualFriends > 0 && (
                                        <Badge variant='outline' className='text-xs'>
                                            <Users className='mr-1 h-3 w-3' />
                                            {match.mutualFriends} mutual
                                        </Badge>
                                    )}
                                </div>
                                <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                                    <MapPin className='h-3 w-3' />
                                    {match.location}
                                </div>
                                <div className='text-xs font-medium text-blue-600'>
                                    {match.recentActivity}
                                </div>
                            </div>

                            <div className='flex flex-wrap gap-1'>
                                {match.interests.slice(0, 3).map((interest) => {
                                    const IconComponent =
                                        interestIcons[interest as keyof typeof interestIcons] ||
                                        BookOpen;
                                    return (
                                        <Badge key={interest} variant='outline' className='text-xs'>
                                            <IconComponent className='mr-1 h-3 w-3' />
                                            {interest}
                                        </Badge>
                                    );
                                })}
                            </div>

                            <div className='flex items-center justify-between pt-2'>
                                <div className='text-muted-foreground flex items-center gap-1 text-xs'>
                                    <Clock className='h-3 w-3' />
                                    Active {match.lastActive}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SwipeableCard;
