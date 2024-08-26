import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import App from '../App';
import Login from '../pages/Login';
import SignUp from '../pages/Sign-up/index';
import CMS from '../pages/Cms';
import Post from '../pages/Post/index';
import Profile from '../pages/Profile';
import loaders from '../loaders/index';
import actions from '../actions';

function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            loader: loaders.rootLoader,
            element: (
                <ProtectedRoute>
                    <App />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    action: actions.postAction,
                    element: <CMS />,
                },
                {
                    index: true,
                    path: 'posts/new',
                    action: actions.postAction,
                    element: <CMS />,
                },
                {
                    path: 'posts/:postId',
                    loader: loaders.postDetailLoader,
                    action: actions.commentAction,
                    element: <Post />,
                },
                {
                    path: 'users/:userId/:username?',
                    loader: loaders.userPostLoader,
                    action: actions.profileAction,
                    element: <Profile />,
                },
            ],
        },
        {
            path: '/login',
            action: actions.loginAction,
            element: <Login />,
        },
        {
            path: 'sign-up',
            action: actions.signUpAction,
            element: <SignUp />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
