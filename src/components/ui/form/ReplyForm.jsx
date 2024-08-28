import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import { useActionData } from 'react-router-dom';
import formConstants from '../../../constants/form';
import Form from './Form';
import Fieldset from './Fieldset';
import Textarea from './Textarea';
import Button from '../button/Button';
import style from './css/replyForm.module.css';
import fieldNameIncludes from '../../../helpers/form/fieldnameIncludes';
import ErrorMessage from '../../errors/errorMessage';
import FieldErrorMessage from './FieldErrorMessage';
import Input from './Input';

export default function ReplyForm({ cols, rows, btnSize, id, setReply, btnStyle = '' }) {
    const data = useActionData();
    const [status, setStatus] = useState('typing');
    const [value, setValue] = useState('');

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
                <Input type='hidden' name='comment-id' value={`${id}`} />
                <Input type='hidden' name='form-id' value='REPLY_COMMENT' />
            </Fieldset>

            {(() => {
                if (!error) return null;
                if (error?.formId !== 'REPLY_COMMENT') return null;

                const { messages } = error;
                const fields = ['body'];
                const fieldErrors = fields.map((field) => fieldNameIncludes(field, messages));
                const noFieldErrors = !fieldErrors.includes(true) && error;

                if (noFieldErrors) {
                    return (
                        <div className='error__container'>
                            <ErrorMessage customStyles={`${style.error}`} message={messages} />
                        </div>
                    );
                }
                return fields.map((fName) => (
                    <FieldErrorMessage
                        customStyles={`${style.error}`}
                        key={fName}
                        fieldName={fName}
                        error={error}
                    />
                ));
            })()}

            <Fieldset fieldName={`${style.button__field}`}>
                <Button
                    customStyles={`${style.button}`}
                    type='submit'
                    size={btnSize}
                    disabled={value.length === 0 || status === 'submitting'}
                >
                    Submit
                </Button>

                <Button
                    customStyles={`${btnStyle}`}
                    type='button'
                    size={btnSize}
                    onClick={() => setReply(false)}
                >
                    Cancel
                </Button>
            </Fieldset>
        </Form>
    );
}

ReplyForm.propTypes = {
    cols: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    btnSize: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setReply: PropTypes.func.isRequired,
    btnStyle: PropTypes.string,
};
