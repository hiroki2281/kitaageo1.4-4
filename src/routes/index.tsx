import { createBrowserRouter } from 'react-router-dom';
import TopPage from '../pages/TopPage';
import UserPage from '../pages/UserPage';
import AdminPage from '../pages/AdminPage';
import DeveloperPage from '../pages/DeveloperPage';
import AuthCallback from '../pages/AuthCallback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TopPage />,
  },
  {
    path: '/user',
    element: <UserPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/developer',
    element: <DeveloperPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
]);