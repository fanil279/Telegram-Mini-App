import { type FC } from 'react';
import SwipeableCard from '../components/SwipeableCard';
import AffinaDashboard from '../components/AffinaDashboard';

const Dashboard: FC = () => {
    return (
        <div>
            <h1></h1>
            <AffinaDashboard />
            <SwipeableCard />
        </div>
    );
};

export default Dashboard;
