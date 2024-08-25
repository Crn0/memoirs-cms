import PropTypes from 'prop-types';
import style from './css/button.module.css';
import Spinner from '../spinner/index';

function Button({
    type,
    size,
    onClick,
    children,
    testId,
    customStyles = '',
    isLoading = false,
    disabled = false,
}) {
    return (
        <button
            type={type}
            className={`${style.btn} ${style[`btn-${size}`]} ${customStyles}`}
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
    customStyles: PropTypes.string,
    disabled: PropTypes.bool,
    testId: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default Button;
