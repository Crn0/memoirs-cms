import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import App from '../App';
import Login from '../pages/Login';
import SignUp from '../pages/Sign-up/index';
import CMS from '../pages/Cms';
import CMSEdit from '../pages/Cms-edit';
import CMSPreview from '../pages/Cms-preview';
import Post from '../pages/Post/index';
import Dashboard from '../pages/Dashboard';
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
                    path: 'posts/new',
                    action: actions.postAction,
                    element: <CMS />,
                },
                {
                    path: 'posts/:postId/edit',
                    loader: loaders.postEditLoader,
                    action: actions.postEditAction,
                    element: <CMSEdit />,
                },
                {
                    path: 'posts/:postId',
                    loader: loaders.postDetailLoader,
                    action: actions.commentAction,
                    element: <Post />,
                },
                {
                    path: 'dashboard/:userId?/:username?',
                    loader: loaders.dashboardLoader,
                    action: actions.dashboardAction,
                    element: <Dashboard />,
                },
            ],
        },
        {
            path: 'preview',
            element: <CMSPreview />,
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
