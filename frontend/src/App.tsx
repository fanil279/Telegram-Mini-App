import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { type FC, lazy, Suspense } from 'react';
import Loading from './components/Loading';

const Dashboard = lazy(() => import('./features/dashboard/pages/Dashboard'));

const App: FC = () => {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path='/' element={<Dashboard />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
