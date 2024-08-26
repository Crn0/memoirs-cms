import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './css/link.module.css';

export default function Link({ url, children, customStyles = '' }) {
    return (
        <RouterLink to={url} className={`${style.a} ${customStyles}`}>
            {children}
        </RouterLink>
    );
}

Link.propTypes = {
    url: PropTypes.string.isRequired,
    customStyles: PropTypes.string,
    children: PropTypes.node.isRequired,
};
