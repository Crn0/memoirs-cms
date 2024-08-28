import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../link/Link';
import ThemeContext from '../../../context/themeContext';
import UserContext from '../../../context/userContext';
import Button from '../button/Button';
import style from './css/nav.module.css';

export default function NavBar() {
    const { theme } = useContext(ThemeContext);
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const userId = user?._id;
    const username = user?.username;

    const handleLogout = async () => {
        const localStorage = await import('../../../helpers/storage/localStorage');

        localStorage.default.remove('token');
        setUser(null);

        navigate('/login', { replace: true });
    };

    const currentTheme = (light, dark) => {
        if (theme === 'dark') return dark;

        return light;
    };

    return (
        <>
            {(() => {
                if (user) {
                    return (
                        <>
                        <div className={`${style.center}`}>
                                <Link
                                    url='posts/new'
                                    customStyles={`${style.link} ${currentTheme(style['link--light'], style['link--dark'])}`}
                                    className={theme}
                                >
                                    {' '}
                                    Post{' '}
                                </Link>
                            </div>

                            <div className={`${style.center}`}>
                                <Link
                                    url='dashboard'
                                    customStyles={`${style.link} ${currentTheme(style['link--light'], style['link--dark'])}`}
                                    className={theme}
                                >
                                    {' '}
                                    Dashboard{' '}
                                </Link>
                            </div>

                            <div className={`${style.center}`}>
                                <Button
                                    type='button'
                                    size='small'
                                    uncontrolled={false}
                                    onClick={handleLogout}
                                    customStyles={`${style.link} ${currentTheme(style['link--light'], style['link--dark'])}`}
                                >
                                    Logout
                                </Button>
                            </div>
                        </>
                    );
                }

                return (
                    <>
                        {['Sign-up', 'Login'].map((val) => (
                            <div key={val} className={`${style.center}`}>
                                <Link
                                    url={`/${val.toLowerCase()}`}
                                    theme={theme}
                                    customStyles={`${style.link} ${currentTheme(style['link--light'], style['link--dark'])}`}
                                >
                                    {val}
                                </Link>
                            </div>
                        ))}
                    </>
                );
            })()}
        </>
    );
}
