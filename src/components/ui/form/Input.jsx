import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import './css/input.module.css';

export default function Input({
    type,
    name,
    value,
    isRequired = true,
    customStyles = '',
    onChange = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    placeholder = '',
}) {
    const { theme } = useContext(ThemeContext);
    if (isRequired === false) {
        return (
            <input
                className={`${theme} ${customStyles}`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onClick={onClick}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
            />
        );
    }

    return (
        <input
            className={`${theme} ${customStyles}`}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onClick={onClick}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            required
        />
    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    customStyles: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    onClick: PropTypes.func,
};
