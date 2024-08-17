import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';
import Spinner from '../spinner/index';

function Button({
    type,
    size,
    children,
    isLoading = false,
    testId = 'default_button',
    customStyles,
    onClick = () => {},
    disabled = false,
}) {
    const { theme } = useContext(ThemeContext);

    return (
        <button
            type={type}
            className={`${theme} ${size} ${customStyles === undefined ? '' : customStyles}`}
            onClick={onClick}
            disabled={disabled}
            data-testid={testId}
        >
            {(() => {
                if (isLoading) return <Spinner />;

                return children;
            })()}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    testId: PropTypes.string,
    customStyles: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default Button;
