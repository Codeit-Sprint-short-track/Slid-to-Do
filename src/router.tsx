import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import routes from './constants/routes';
import DashboardPage from './pages/Dashboard/index';
import SignInPage from './pages/SignIn/index';
import SignUpPage from './pages/signUp/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: routes.signin,
        element: <SignInPage />,
      },
      {
        path: routes.signup,
        element: <SignUpPage />,
      },
      {
        path: routes.dashboard,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
