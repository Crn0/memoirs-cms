import { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';

export default function Link({ url, children }) {
    const { theme } = useContext(ThemeContext);

    return (
        <RouterLink hrefLang='' to={url} className={`${theme}`}>
            {children}
        </RouterLink>
    );
}

Link.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
