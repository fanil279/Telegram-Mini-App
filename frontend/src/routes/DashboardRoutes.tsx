import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Dashboard = lazy(() => import('../features/dashboard/pages/Dashboard'));

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default DashboardRoutes;
