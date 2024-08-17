import { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import Button from '../button/Button';
import Link from '../link/Link';
import ThemeIcon from '../icon/Theme';
import localStorage from '../../../helpers/storage/localStorage';

export default function Header({ children }) {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <header className={`${theme}`} style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <div className='site__name'>
                    <Link url='/' theme={theme}>
                        Memoirs
                    </Link>
                </div>

                <div className='theme__switcher'>
                    <Button
                        type='button'
                        className={theme}
                        size='small'
                        name={theme}
                        onClick={() => {
                            setTheme((mode) => (mode === 'light' ? 'dark' : 'light'));
                            localStorage.add('theme', theme === 'light' ? 'dark' : 'light');
                        }}
                        testId='theme-switcher'
                    >
                        <ThemeIcon />
                    </Button>
                </div>
            </div>
            {children}
        </header>
    );
}

Header.propTypes = {
    children: PropTypes.element.isRequired,
};
