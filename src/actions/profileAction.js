import { BASE_URL } from '../constants/env';
import FormError from '../helpers/errors/formError';
import localStorage from '../helpers/storage/localStorage';

const postStatus = async (formData) => {
    try {
        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';
        const myHeaders = new Headers();

        myHeaders.append('Authorization', bearerToken);
        myHeaders.append('Content-Type', 'application/json');

        const postId = formData.get('post_id');
        const status = formData.get('status');

        const res = await fetch(`${BASE_URL}/posts/${postId}/status`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({ status }),
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

const userInfoUpdate = async (formData, params) => {
    try {
        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';
        const myHeaders = new Headers();

        myHeaders.append('Authorization', bearerToken);
        myHeaders.append('Content-Type', 'application/json');

        const { userId } = params;
        const submission = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            username: formData.get('username'),
            email: formData.get('email'),
        };

        const res = await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(submission),
        });
        const data = await res.json();

        if (res.status >= 400) {
            throw new FormError(data.message, data.error.message, data.code);
        }

        localStorage.add('token', data.token);
        return data;
    } catch (error) {
        return {
            error: {
                messages: error.errors,
            },
        };
    }
};

export default async function action({ request, params }) {
    try {
        const formData = await request.formData();
        const formId = formData.get('form-id');
        switch (formId) {
            case 'POST_STATUS':
                return await postStatus(formData);

            case 'PROFILE_EDIT':
                return await userInfoUpdate(formData, params);

            default:
                throw new Error('Invalid form id');
        }
    } catch (error) {
        return {
            error: {
                messages: error?.errors || error.message,
            },
        };
    }
}
