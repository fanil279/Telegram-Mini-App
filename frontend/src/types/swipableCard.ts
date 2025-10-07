import { potentialMatches } from '../components/SwipeableCard';

export interface SwipeableCardProps {
    match: (typeof potentialMatches)[0];
    onSwipe: (direction: 'left' | 'right' | 'down') => void;
    isDisabled: boolean;
}
