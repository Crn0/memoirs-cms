import { BASE_URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';
import FormError from '../helpers/errors/formError';

const add = async (formData, formId, { postId }) => {
    try {
        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';

        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', bearerToken);

        const submission = { body: formData.get('body') };

        const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(submission),
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new FormError(data.message, data.error.message, data.code);
        }
        return data;
    } catch (error) {
        return {
            error: {
                formId,
                messages: error.errors,
                httpCode: error.httpCode,
            },
        };
    }
};

const reply = async (formData, formId, { postId }) => {
    try {
        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';

        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', bearerToken);

        const submission = { body: formData.get('body') };
        const commentId = formData.get('comment-id');

        const res = await fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(submission),
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new FormError(data.message, data.error.message, data.code);
        }
        return data;
    } catch (error) {
        return {
            error: {
                formId,
                messages: error.errors,
                httpCode: error.httpCode,
            },
        };
    }
};

const destroy = async (formData, formId, { postId }) => {
    try {
        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';

        const myHeaders = new Headers();

        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', bearerToken);

        const commentId = formData.get('comment-id');

        await fetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: myHeaders,
        });

        return { commentId };
    } catch (error) {
        return {
            error: {
                formId,
                messages: error.errors,
                httpCode: error.httpCode,
            },
        };
    }
};

export default async function action({ params, request }) {
    try {
        const formData = await request.formData();
        const formId = formData.get('form-id');
        switch (formId) {
            case 'ADD_COMMENT':
                return add(formData, formId, params);

            case 'DELETE_COMMENT':
                return destroy(formData, formId, params);

            case 'REPLY_COMMENT':
                return reply(formData, formId, params);

            default:
                throw new Error('Invalid form id');
        }
    } catch (error) {
        return error;
    }
}
