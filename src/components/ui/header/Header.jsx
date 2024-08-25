import { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import Button from '../button/Button';
import Link from '../link/Link';
import ThemeIcon from '../icon/Theme';
import localStorage from '../../../helpers/storage/localStorage';
import currentTheme from '../../../helpers/theme/currentTheme';
import style from './css/header.module.css';

export default function Header({ children }) {
    const { theme, setTheme } = useContext(ThemeContext);

    const currTheme = currentTheme(theme);

    return (
        <header
            className={`${theme} ${style.header} ${style['pad-1rem']} ${currTheme(style['header--light'], style['header--dark'])}`}
        >
            <div className={`${style.header__left}`}>
                <div
                    className={`${style.header__btn} ${style.center} ${currTheme(style['btn--light'], style['btn--dark'])}`}
                >
                    <Link
                        url='/'
                        theme={theme}
                        customStyle={`${currTheme(style['link--light'], style['link--dark'])}`}
                    >
                        Memoirs
                    </Link>
                </div>

                <div
                    className={`${style.header__theme} ${style.center} ${currTheme(style['theme--light'], style['theme--dark'])}`}
                >
                    <Button
                        type='button'
                        className={theme}
                        size='lg'
                        name={theme}
                        onClick={() => {
                            setTheme((mode) => (mode === 'light' ? 'dark' : 'light'));
                            localStorage.add('theme', theme === 'light' ? 'dark' : 'light');
                        }}
                        customStyles={`${style.header__btn}`}
                        testId='theme-switcher'
                    >
                        <ThemeIcon />
                    </Button>
                </div>
            </div>
            <div className={`${style.header__right}`}>{children}</div>
        </header>
    );
}

Header.propTypes = {
    children: PropTypes.element.isRequired,
};
