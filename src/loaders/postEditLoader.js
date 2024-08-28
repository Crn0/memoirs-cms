import { BASE_URL } from '../constants/env';
import LS from '../helpers/storage/localStorage';
import BaseError from '../helpers/errors/baseError';

const loader = async ({ request, params }) => {
    if (LS.get('post')?._id !== params.postId) {
        LS.remove('post');
    }

    if (LS.has('post')) {
        return LS.get('post');
    }

    try {
        const { postId } = params;
        const { searchParams } = new URL(request.url);
        const isPost = searchParams.get('post');

        if (isPost) {
            return null;
        }

        const bearerToken = LS.has('token') ? `Bearer ${LS.get('token')}` : '';

        const res = await fetch(`${BASE_URL}/posts/${postId}`, {
            headers: { Authorization: `${bearerToken}` },
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new BaseError('Blog Post Loader', data.code, data.message);
        }

        LS.add('post', data);

        return data;
    } catch (error) {
        return Promise.reject(new BaseError('Blog Posts Loader', error.httpCode, error.message));
    }
};

export default loader;
