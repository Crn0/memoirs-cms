import PropTypes from 'prop-types';
import { Form as ReactForm } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import './css/form.module.css';

export default function Form({
    action,
    method,
    customStyles,
    onSubmit,
    children,
    isReactForm = true,
    encType = 'application/x-www-form-urlencoded',
}) {
    const { theme } = useContext(ThemeContext);

    if (!isReactForm) {
        return (
            <form
                encType={encType}
                aria-label='form'
                onSubmit={onSubmit}
                action={action}
                method={method}
                className={`${theme} ${customStyles === undefined ? '' : customStyles} form`}
            >
                {children}
            </form>
        );
    }

    return (
        <ReactForm
            encType={encType}
            aria-label='form'
            onSubmit={onSubmit}
            action={action}
            method={method}
            className={`${theme} ${customStyles === undefined ? '' : customStyles} form`}
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
    isReactForm: PropTypes.bool,
};
