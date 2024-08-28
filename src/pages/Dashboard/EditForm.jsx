import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import fieldNameIncludes from '../../helpers/form/fieldnameIncludes';
import ErrorMessage from '../../components/errors/errorMessage';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';
import FormError from '../../helpers/errors/formError';
import LocalStorage from '../../helpers/storage/localStorage';
import style from './css/form.module.css';

export default function EditForm({ formData, dispatch, setEdit }) {
    const { setUser } = useContext(UserContext);
    const { userId } = useParams();
    const [status, setStatus] = useState('typing');
    const [error, setError] = useState(null);

    const isButtonDisabled =
        formData?.firstName.trim() === '' ||
        formData?.lastName.trim() === '' ||
        formData?.username.trim() === '' ||
        formData?.email.trim() === '' ||
        status === 'submitting';

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            value,
            type: name,
        });
    };
    const onSubmit = async (e) => {
        e.preventDefault();

        setStatus('submitting');
        try {
            const bearerToken = LocalStorage.has('token')
                ? `Bearer ${LocalStorage.get('token')}`
                : '';
            const myHeaders = new Headers();
            myHeaders.append('Authorization', bearerToken);
            myHeaders.append('Content-Type', 'application/json');

            const submission = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
            };
            const res = await fetch(`${URL}/users/${userId}`, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(submission),
            });
            const fetchData = await res.json();

            if (res.status >= 400) {
                throw new FormError(fetchData.message, fetchData.error.message, fetchData.code);
            }

            LocalStorage.add('token', fetchData.token);
            setUser(fetchData.user);
            setEdit(false);

            return fetchData;
        } catch (err) {
            setError({ messages: err.errors });
            return err;
        } finally {
            setStatus('typing');
        }
    };

    return (
        <Form
            action=''
            isReactForm={false}
            customStyles={`${style.form}`}
            onSubmit={onSubmit}
            method='PUT'
        >
            <Fieldset fieldName='fullName_field'>
                <Label name='First name:'>
                    <Input
                        customStyles={`${style.block} `}
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={onChange}
                    />
                </Label>

                <Label name='Last name:'>
                    <Input
                        customStyles={`${style.block} `}
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={onChange}
                    />
                </Label>
            </Fieldset>

            <Fieldset fieldName='email__username_field'>
                <Label name='Username:'>
                    <Input
                        customStyles={`${style.block} `}
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={onChange}
                    />
                </Label>

                <Label name='Email:'>
                    <Input
                        customStyles={`${style.block} `}
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={onChange}
                    />
                </Label>
            </Fieldset>

            {error &&
                (() => {
                    const { messages } = error;
                    const noFieldErrors =
                        !fieldNameIncludes('firstName', messages) &&
                        !fieldNameIncludes('lastName', messages) &&
                        !fieldNameIncludes('email', messages) &&
                        !fieldNameIncludes('username', messages) &&
                        error;

                    if (noFieldErrors) {
                        return (
                            <div className='error__container'>
                                <ErrorMessage customStyles={`${style.error}`} message={messages} />
                            </div>
                        );
                    }

                    return ['firstName', 'lastName', 'username', 'email'].map((fName) => (
                        <FieldErrorMessage
                            customStyles={`${style.error}`}
                            key={fName}
                            fieldName={fName}
                            error={error}
                        />
                    ));
                })()}

            <Fieldset fieldName='button__field'>
                <Input type='hidden' name='form-id' value='PROFILE_EDIT' />
                <Button
                    customStyles={`${style.button}`}
                    type='submit'
                    size='medium'
                    isLoading={status === 'submitting'}
                    disabled={isButtonDisabled}
                >
                    Submit
                </Button>
            </Fieldset>
        </Form>
    );
}

EditForm.propTypes = {
    formData: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    setEdit: PropTypes.func.isRequired,
};
