import { BASE_URL } from '../constants/env';
import FormError from '../helpers/errors/formError';

const action = async ({ request }) => {
    try {
        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');

        const formData = await request.formData();
        const submission = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
        };

        const req = await fetch(`${BASE_URL}/users/authors`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(submission),
        });
        const data = await req.json();
        
        if (data.code >= 400) {
            const lowerCaseMessages = data.error.message.map((m) => ({
                ...m,
                message: m.message.toLowerCase(),
            }));

            throw new FormError(data.message, lowerCaseMessages, data.code);
        }

        const { user, token } = data;

        return { user, token };
    } catch (error) {
        return {
            error: {
                messages: error.errors,
            },
        };
    }
};

export default action;
