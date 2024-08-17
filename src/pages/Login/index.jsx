import { useActionData } from 'react-router-dom';
import { useContext, useEffect, useState, useMemo } from 'react';
import useAuthData from '../../hooks/useAuthData';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import Button from '../../components/ui/button/Button';
import formConstants from '../../constants/form';
import ErrorMessage from '../../components/errors/errorMessage';
import fieldNameIncludes from '../../helpers/form/fieldnameIncludes';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';
import Header from '../../components/ui/header/index';
import Footer from '../../components/ui/footer/Footer';
import style from './css/index.module.css';
import localStorage from '../../helpers/storage/localStorage';

const formState = {
    email: '',
    password: '',
};

export default function Login() {
    const loginData = useActionData();
    const [theme, setTheme] = useState(() => {
        if (localStorage.has('theme')) return localStorage.get('theme');

        return 'dark';
    });
    const { setUser } = useContext(UserContext);
    const [status, setStatus] = useState('typing');
    const [formInputs, setFormInputs] = useState(formState);
    const themeMemo = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    const error = loginData?.error;
    const user = loginData?.user;
    const token = loginData?.token;
    const isButtonDisabled =
        formInputs.email.trim() === '' ||
        formInputs.password.trim() === '' ||
        status === 'submitting';

    const handleSubmit = () => {
        setStatus('submitting');
    };

    useEffect(() => {
        if (error) setStatus('error');
    }, [error]);

    useAuthData(error, user, token, setUser);

    return (
        <div className={`${style.app} ${theme === 'dark' ? style.dark : style.light}`}>
            <ThemeContext.Provider value={themeMemo}>
                <Header />

                <main className={`${theme}`}>
                    <section>
                        <div className={`${style.form__container}`}>
                            <h1>Login</h1>
                            {error &&
                                (() => {
                                    const { messages } = error;
                                    const fields = [
                                        'email',
                                        'password',
                                    ];

                                    const fieldErrors =  fields.map((field) => fieldNameIncludes(field, messages))
                                    const noFieldErrors = !fieldErrors.includes(true) && error;
                                       
                                    if (noFieldErrors) {
                                        return (
                                            <div className='error__container'>
                                                <ErrorMessage message={messages} />
                                            </div>
                                        );
                                    }

                                    return fields.map((fName) => (
                                        <FieldErrorMessage
                                            key={fName}
                                            fieldName={fName}
                                            error={error}
                                        />
                                    ));
                                })()}

                            <Form action='/login' method='POST' onSubmit={handleSubmit}>
                                <Fieldset fieldName={formConstants.EMAIL}>
                                    <Label theme={theme} name='Email:'>
                                        <Input
                                            theme={theme}
                                            type={formConstants.EMAIL}
                                            name={formConstants.EMAIL}
                                            value={formInputs.email}
                                            onChange={(e) => {
                                                const { name } = e.target;
                                                setFormInputs((prev) => ({
                                                    ...prev,
                                                    [name]: e.target.value,
                                                }));
                                            }}
                                        />
                                    </Label>
                                </Fieldset>

                                <Fieldset fieldName='password__field'>
                                    <Label theme={theme} name='Password:'>
                                        <Input
                                            theme={theme}
                                            type={formConstants.PWD}
                                            name={formConstants.PWD}
                                            value={formInputs.password}
                                            onChange={(e) => {
                                                const { name } = e.target;
                                                setFormInputs((prev) => ({
                                                    ...prev,
                                                    [name]: e.target.value,
                                                }));
                                            }}
                                        />
                                    </Label>
                                </Fieldset>

                                <Fieldset fieldName='button__field'>
                                    <Button
                                        type='submit'
                                        size='medium'
                                        isLoading={status === 'submitting'}
                                        disabled={isButtonDisabled}
                                    >
                                        Login
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
