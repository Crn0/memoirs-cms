import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { useActionData } from 'react-router-dom';
import formConstants from '../../../constants/form';
import Form from './Form';
import Fieldset from './Fieldset';
import Textarea from './Textarea';
import Button from '../button/Button';
import style from './css/commentForm.module.css';
import fieldNameIncludes from '../../../helpers/form/fieldnameIncludes';
import ErrorMessage from '../../errors/errorMessage';
import FieldErrorMessage from './FieldErrorMessage';

export default function CommentForm({ cols, rows, btnSize, children }) {
    const [status, setStatus] = useState('typing');
    const [value, setValue] = useState('');
    const data = useActionData();

    const error = data?.error;

    const handleSubmit = () => {
        setStatus('submitting');
    };

    useEffect(() => {
        if (status === 'submitting') {
            setStatus('typing');
            setValue('');
        }
    }, [status]);

    return (
        <Form action='' method='POST' onSubmit={handleSubmit}>
            <Fieldset fieldName='comment__field'>
                <Textarea
                    name={formConstants.BODY}
                    cols={cols}
                    rows={rows}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Fieldset>

            {(() => {
                if (!error) return null;
                if (error?.formId !== 'ADD_COMMENT') return null;

                const { messages } = error;
                const fields = ['body'];
                const fieldErrors = fields.map((field) => fieldNameIncludes(field, messages));
                const noFieldErrors = !fieldErrors.includes(true) && error;

                if (noFieldErrors) {
                    return (
                        <div className='error__container'>
                            <ErrorMessage customStyle={`${style.error}`} message={messages} />
                        </div>
                    );
                }
                return fields.map((fName) => (
                    <FieldErrorMessage
                        customStyle={`${style.error}`}
                        key={fName}
                        fieldName={fName}
                        error={error}
                    />
                ));
            })()}

            <Fieldset fieldName='button__field'>
                <Button
                    customStyles={`${style.button}`}
                    type='submit'
                    size={btnSize}
                    disabled={value.length === 0 || status === 'submitting'}
                >
                    Submit
                </Button>
                {children}
            </Fieldset>
        </Form>
    );
}

CommentForm.propTypes = {
    cols: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    btnSize: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};
