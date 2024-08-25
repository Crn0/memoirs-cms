import { useContext } from 'react';
import { FaGithub } from 'react-icons/fa';
import ThemeContext from '../../../context/themeContext';
import style from './css/footer.module.css';
import currentTheme from '../../../helpers/theme/currentTheme';

export default function Footer() {
    const { theme } = useContext(ThemeContext);

    const currTheme = currentTheme(theme);

    return (
        <footer
            className={`${style.footer} ${currTheme(style['footer--light'], style['footer--dark'])}`}
        >
            <p>Crn0</p>
            <a
                href='https://github.com/Crn0/memoirs'
                aria-label='link'
                target='_blank'
                rel='noopener noreferrer'
            >
                <FaGithub />
            </a>
        </footer>
    );
}
