import PropTypes from 'prop-types';

export default function Fieldset({ children, fieldName, customStyles }) {
    return (
        <div id={`${fieldName}`} className={`${customStyles === undefined ? '' : customStyles}`}>
            {children}
        </div>
    );
}

Fieldset.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
        .isRequired,
    fieldName: PropTypes.string.isRequired,
    customStyles: PropTypes.string,
};
