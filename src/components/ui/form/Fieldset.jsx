import PropTypes from 'prop-types';

export default function Fieldset({ children, fieldName }) {
    return <div className={`${fieldName}`}>{children}</div>;
}

Fieldset.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
        .isRequired,
    fieldName: PropTypes.string.isRequired,
};
