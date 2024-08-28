import PropTypes from 'prop-types';
import { Form as ReactForm } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import style from './css/form.module.css';
import currentTheme from '../../../helpers/theme/currentTheme';

export default function Form({ action, method, onSubmit, children, encType = 'application/x-www-form-urlencoded',  customStyles = '' }) {
    const { theme } = useContext(ThemeContext);

    const currTheme = currentTheme(theme);

    return (
        <ReactForm
            aria-label='form'
            onSubmit={onSubmit}
            action={action}
            method={method}
            encType={encType}
            className={`${style.form} ${customStyles} ${currTheme(style['form--light'], style['form--dark'])}`}
        >
            {children}
        </ReactForm>
    );
}

Form.propTypes = {
    action: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
        .isRequired,
    customStyles: PropTypes.string,
    encType: PropTypes.string,
};
