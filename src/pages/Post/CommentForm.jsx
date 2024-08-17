import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import formConstants from '../../constants/form';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Textarea from '../../components/ui/form/Textarea';
import Button from '../../components/ui/button/Button';

export default function CommentForm({ cols, rows, btnSize, children }) {
    const [status, setStatus] = useState('typing');
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        setStatus('submitting');
    };

    useEffect(() => {
        if (status === 'submitting') setStatus('typing');
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
                {children}
            </Fieldset>

            <Fieldset fieldName='button__field'>
                <Button
                    type='submit'
                    size={btnSize}
                    isLoading={status === 'submitting'}
                    disabled={value.length === 0 || status === 'submitting'}
                >
                    Submit
                </Button>
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
