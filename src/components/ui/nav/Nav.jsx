import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../link/Link';
import ThemeContext from '../../../context/themeContext';
import UserContext from '../../../context/userContext';
import Button from '../button/Button';
import localStorage from '../../../helpers/storage/localStorage';

export default function NavBar() {
    const { theme } = useContext(ThemeContext);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const userId = user?._id;
    const username = user?.username;

    const handleLogout = async () => {
        localStorage.remove('token');
        setUser(null);
        navigate('/login', { replace: true });
    };

    return (
        <nav className={`${theme}`}>
            {(() => {
                if (user) {
                    return (
                        <div>
                            <Link url='/posts/new'>Create Post</Link>

                            <Link url={`/users/${userId}/${username}`}>Profile</Link>

                            <Button
                                type='button'
                                size='small'
                                testId='logout-btn'
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    );
                }

                return (
                    <>
                        <Link url='/sign-up'> Sign-up </Link>
                        <Link url='/login'> Login </Link>
                    </>
                );
            })()}
        </nav>
    );
}
