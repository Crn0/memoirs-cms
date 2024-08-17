import { BASE_URL } from '../constants/env';
import FormError from '../helpers/errors/formError';
import localStorage from '../helpers/storage/localStorage';

const action = async ({ request }) => {
    try {
        const formData = await request.formData();
        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';

        const res = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: { Authorization: `${bearerToken}` },
            body: formData,
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new FormError(data.message, data.error.message, data.code);
        }

        return data;
    } catch (error) {
        return {
            error: {
                messages: error.errors,
            },
        };
    }
};

export default action;
