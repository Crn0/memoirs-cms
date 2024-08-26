import { useActionData } from 'react-router-dom';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import useAuthData from '../../hooks/useAuthData';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import reducer, { formState } from './reducer';
import Header from '../../components/ui/header/index';
import Footer from '../../components/ui/footer/Footer';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';
import isEmail from '../../helpers/validator/isEmail';
import style from './css/index.module.css';
import localStorage from '../../helpers/storage/localStorage';
import fieldNameIncludes from '../../helpers/form/fieldnameIncludes';
import ErrorMessage from '../../components/errors/errorMessage';

export default function SignUp() {
    const { setUser } = useContext(UserContext);
    const [theme, setTheme] = useState(() => {
        if (localStorage.has('theme')) return localStorage.get('theme');

        return 'dark';
    });
    const themeMemo = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    const [status, setStatus] = useState('typing');
    const [inputs, dispatch] = useReducer(reducer, formState);
    const signUpData = useActionData();

    const error = signUpData?.error;
    const user = signUpData?.user;
    const token = signUpData?.token;

    const isButtonDisabled = (() => {
        const fieldNames = [
            'firstName',
            'lastName',
            'email',
            'username',
            'password',
            'confirm_password',
        ];
        const areFieldsEmpty = fieldNames.map((n) => inputs[n].trim() === '');

        if (areFieldsEmpty.includes(true) || status === 'submitting') return true;

        return false;
    })();

    const handleSubmit = () => {
        if (isEmail(inputs.email)) {
            setStatus('submitting');

            return;
        }

        setStatus('error');
    };

    const inputValue = (fieldName) => inputs[fieldName];

    const onChange = (e) => {
        const { value, name } = e.target;

        dispatch({
            value,
            type: name,
        });
    };

    useEffect(() => {
        if (error) setStatus('error');
        document.body.style.backgroundColor = theme === 'light' ? '#F5F5F5' : 'black';
    }, [error, theme]);

    useAuthData(error, user, token, setUser);

    return (
        <div className={`${style.app} ${theme === 'dark' ? style.dark : style.light}`}>
            <ThemeContext.Provider value={themeMemo}>
                <Header />

                <main className={`${style.main}`}>
                    <section>
                        <div className={`${theme} form__container`}>
                            <Form action='/sign-up' method='POST' onSubmit={handleSubmit}>
                                <div>
                                    <h1>Sign Up</h1>
                                </div>
                                <Fieldset fieldName='fullname__field'>
                                    <Label name='First name:'>
                                        <Input
                                            customStyles={`${style.block}`}
                                            type='text'
                                            name='firstName'
                                            value={inputValue('firstName')}
                                            onChange={onChange}
                                        />
                                    </Label>

                                    <Label name='Last name:'>
                                        <Input
                                            customStyles={`${style.block}`}
                                            type='text'
                                            name='lastName'
                                            value={inputValue('lastName')}
                                            onChange={onChange}
                                        />
                                    </Label>
                                </Fieldset>

                                <Fieldset fieldName='email_username__field'>
                                    <Label name='Email:'>
                                        <Input
                                            customStyles={`${style.block}`}
                                            type='email'
                                            name='email'
                                            value={inputValue('email')}
                                            onChange={onChange}
                                        />
                                    </Label>

                                    <Label name='Username:'>
                                        <Input
                                            customStyles={`${style.block}`}
                                            type='text'
                                            name='username'
                                            value={inputValue('username')}
                                            onChange={onChange}
                                        />
                                    </Label>
                                </Fieldset>

                                <Fieldset fieldName='password__field'>
                                    <Label name='Password:'>
                                        <Input
                                            customStyles={`${style.block}`}
                                            type='password'
                                            name='password'
                                            value={inputValue('password')}
                                            onChange={onChange}
                                        />
                                    </Label>

                                    <Label name='Confirm password:'>
                                        <Input
                                            customStyles={`${style.block}`}
                                            type='password'
                                            name='confirm_password'
                                            value={inputValue('confirm_password')}
                                            onChange={onChange}
                                        />
                                    </Label>
                                </Fieldset>

                                {error &&
                                    (() => (
                                        <div className={`${style.center}`}>
                                            {[
                                                'firstName',
                                                'lastName',
                                                'email',
                                                'username',
                                                'password',
                                                'confirm_password',
                                            ].map((fName) => (
                                                <FieldErrorMessage
                                                    customStyles={`${style.error}`}
                                                    key={fName}
                                                    fieldName={fName}
                                                    error={error}
                                                />
                                            ))}
                                        </div>
                                    ))()}

                                <Fieldset fieldName='button__field'>
                                    <Button
                                        type='submit'
                                        size='lg'
                                        disabled={isButtonDisabled}
                                        isLoading={status === 'submitting'}
                                        customStyles={style.button}
                                    >
                                        Sign Up
                                    </Button>
                                </Fieldset>
                            </Form>
                        </div>
                    </section>
                </main>

                <Footer />
            </ThemeContext.Provider>
        </div>
    );
}
