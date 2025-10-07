import { type FC, useState } from 'react';
import SwipeableCard, { potentialMatches } from '../../../components/SwipeableCard';
import AffinaDashboard from '../components/AffinaDashboard';
import type { SubscriptionType, ReactionType } from '../../../types';
import Button from '../../../components/Button';
import { Search } from 'lucide-react';

const Dashboard: FC = () => {
    const [_profileReactions, setProfileReactions] = useState<Record<number, ReactionType>>({});
    const [currentSubscription, _setCurrentSubscription] = useState<SubscriptionType>('FREE');
    const [likesRemaining, setLikesRemaining] = useState(20);
    const [removedProfiles, setRemovedProfiles] = useState<Set<number>>(new Set());

    const handleReaction = (matchId: number, reactionType: ReactionType) => {
        setProfileReactions((prev) => ({ ...prev, [matchId]: reactionType }));

        if (currentSubscription === 'FREE' && likesRemaining > 0) {
            setLikesRemaining((prev) => prev - 1);
        }
    };

    const handleSwipe = (matchId: number, direction: 'left' | 'right' | 'down') => {
        if (direction === 'left') handleReaction(matchId, 'LIKE');
        else if (direction === 'right') handleReaction(matchId, 'LOVE');
        else if (direction === 'down') setRemovedProfiles((prev) => new Set([...prev, matchId]));
    };

    const visibleMatches = potentialMatches.filter((match) => !removedProfiles.has(match.id));

    return (
        <>
            <AffinaDashboard />

            {potentialMatches.length > 0 ? (
                <div className='m-3 grid grid-cols-1 gap-6 lg:grid-cols-3'>
                    {visibleMatches.map((match) => (
                        <SwipeableCard
                            key={match.id}
                            match={match}
                            onSwipe={(direction) => handleSwipe(match.id, direction)}
                            isDisabled={false}
                        />
                    ))}
                </div>
            ) : (
                <p>There are no more profiles</p>
            )}

            <div className='flex items-center justify-center'>
                <Button
                    className='m-2'
                    variant='default'
                    size='sm'
                    onClick={() => console.log('Discover more matches clicked!')}
                >
                    <Search />
                    <span className='ml-2'>Discover more matches</span>
                </Button>
            </div>
        </>
    );
};

export default Dashboard;
