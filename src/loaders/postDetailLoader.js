import { defer } from 'react-router-dom';
import { BASE_URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';
import BaseError from '../helpers/errors/baseError';

const getPost = async (request, params) => {
    try {
        const { postId } = params;
        const { searchParams } = new URL(request.url);
        const isPost = searchParams.get('post');

        if (isPost) {
            return null;
        }

        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';

        const res = await fetch(`${BASE_URL}/posts/${postId}`, {
            headers: { Authorization: `${bearerToken}` },
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new BaseError('Blog Post Loader', data.code, data.message);
        }

        return data;
    } catch (error) {
        return Promise.reject(new BaseError('Blog Posts Loader', error.httpCode, error.message));
    }
};

const loader = async ({ request, params }) => {
    const postPromise = getPost(request, params);

    return defer({ data: postPromise });
};

export default loader;
