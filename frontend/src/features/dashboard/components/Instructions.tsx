import { type FC } from 'react';
import { Sparkles, TrendingUp, Filter, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../../components/Button';

const Instructions: FC = () => {
    return (
        <div className='border-border mt-3 w-full space-y-6 border-1 p-3'>
            <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-600 to-pink-700'>
                        <Sparkles className='h-5 w-5 text-white' />
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold'>Discover New Matches</h2>
                        <p className='text-muted-foreground text-sm'>
                            Swipe left to like, right to love, down to remove
                        </p>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                        <Filter className='mr-2 h-4 w-4' />
                        Filters
                    </Button>
                    <Button variant='outline' size='sm'>
                        <TrendingUp className='mr-2 h-4 w-4' />
                        Boost
                    </Button>
                </div>
            </div>

            <div className='bg-muted border-border rounded-lg border p-4'>
                <div className='flex flex-col items-center justify-around gap-4 text-sm md:flex-row'>
                    <div className='flex items-center gap-2'>
                        <ArrowLeft className='h-4 w-4 text-green-500' />
                        <span>
                            Swipe left to <strong className='text-green-500'>LIKE</strong>
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ArrowRight className='h-4 w-4 text-red-500' />
                        <span>
                            Swipe right to <strong className='text-red-500'>LOVE</strong>
                        </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <ArrowDown className='h-4 w-4 text-gray-500' />
                        <span>
                            Swipe down to <strong className='text-gray-500'>REMOVE</strong>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
