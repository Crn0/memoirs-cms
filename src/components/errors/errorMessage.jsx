import PropTypes from 'prop-types';

export default function ErrorMessage({ message, customStyles }) {
    return (
        <p className={`error__message ${customStyles === undefined ? '' : customStyles}`}>
            {message}
        </p>
    );
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    customStyles: PropTypes.string,
};
