import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import localStorage from '../helpers/storage/localStorage';

export default function useAuthData(error, user, token, setUser) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.has('token')) {
            const { from } = location.state || { from: { pathname: '/' } };
            navigate(from, { replace: true });
            return;
        }

        if (!error && user && token) {
            localStorage.add('token', token);
            setUser(user);
            navigate('/', { replace: true });
        }
    }, [error, user, token, setUser, navigate, location]);
}
