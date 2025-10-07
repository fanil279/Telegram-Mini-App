import { lazy } from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Dashboard = lazy(() => import('../features/dashboard/pages/Dashboard'));

const DashboardRoutes = (
    <Route element={<MainLayout />}>
        <Route path='/' element={<Dashboard />} />
    </Route>
);

export default DashboardRoutes;
