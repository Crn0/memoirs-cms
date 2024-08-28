import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import ThemeContext from '../context/themeContext';
import UserContextContext from '../context/userContext';
import localStorage from '../helpers/storage/localStorage';

function ProtectedRoute({ children }) {
    const userData = useLoaderData();
    const [user, setUser] = useState(userData?.user || null);
    const [theme, setTheme] = useState(() => {
        if (localStorage.has('theme')) return localStorage.get('theme');

        return 'dark';
    });

    const userMemo = useMemo(() => ({ user, setUser }), [user, setUser]);
    const themeMemo = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
    
    useEffect(() => {
        document.body.style.backgroundColor = theme === 'light' ? '#F5F5F5' : 'black';
        if (!['Admin', 'Author'].includes(user.membership)) {
            localStorage.remove('token');
        }
    }, [theme,user]);


    return (
        <>
            {(() => {
                if (['Admin', 'Author'].includes(user.membership)) return (
                <ThemeContext.Provider value={themeMemo}>

                    <UserContextContext.Provider value={userMemo}>
                        {
                            children
                        }
                    </UserContextContext.Provider>
                </ThemeContext.Provider>
                );

                return <Navigate to='/login' replace />;
            })()}
        </>
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
