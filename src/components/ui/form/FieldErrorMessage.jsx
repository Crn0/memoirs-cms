import PropTypes from 'prop-types';
import ErrorMessage from '../../errors/errorMessage';
import fieldMessage from '../../../helpers/form/fieldMessage';
import fieldNameIncludes from '../../../helpers/form/fieldnameIncludes';

export default function FieldErrorMessage({ fieldName, customStyles, error }) {
    const messages = error?.messages;
    const clone = structuredClone(messages);

    if (fieldNameIncludes(fieldName, clone))
        return (
            <ErrorMessage
                customStyles={`${customStyles === undefined ? '' : customStyles}`}
                message={fieldMessage(fieldName, clone)}
            />
        );
}

FieldErrorMessage.propTypes = {
    fieldName: PropTypes.string.isRequired,
    error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    customStyles: PropTypes.string,
};
