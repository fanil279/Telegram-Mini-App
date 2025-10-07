import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import DashboardRoutes from './DashboardRoutes';

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    {DashboardRoutes}
                    <Route path='*' element={<div>404 - Page Not Found</div>} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
