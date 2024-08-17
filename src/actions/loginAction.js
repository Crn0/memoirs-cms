import { redirect } from 'react-router-dom';
import { BASE_URL } from '../constants/env';
import FormError from '../helpers/errors/formError';
import localStorage from '../helpers/storage/localStorage';

const action = async ({ request }) => {
    try {
        if (localStorage.has('token')) return redirect('/');

        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');

        const formData = await request.formData();
        const submission = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const res = await fetch(`${BASE_URL}/users/authors/tokens`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(submission),
        });
        const data = await res.json();

        if (res.status >= 400) {
            throw new FormError(data.message, data.error.message, data.code);
        }

        return { user: data.user, token: data.token };
    } catch (error) {
        return {
            error: {
                messages: error.errors,
            },
        };
    }
};

export default action;
