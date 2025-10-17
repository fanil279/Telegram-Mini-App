import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Loading from '../components/Loading';
import DashboardRoutes from './DashboardRoutes';
import { ProtectedRoute } from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute>
                                <DashboardRoutes />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;
