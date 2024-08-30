import { defer } from 'react-router-dom';
import { BASE_URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';
import BaseError from '../helpers/errors/baseError';

const getPosts = async () => {
    try {
        const bearerToken = localStorage.has('token') ? `Bearer ${localStorage.get('token')}` : '';

        const res = await fetch(`${BASE_URL}/posts/author?limit=20`, {
            headers: { Authorization: `${bearerToken}` },
        });

        const data = await res.json();

        if (res.status >= 400) {
            throw new BaseError('Author Blog Posts Loader', data.code, data.message);
        }

        return data;
    } catch (error) {
        return Promise.reject(new BaseError('Blog Posts Loader', error.httCode, error.message));
    }
};

const loader = () => {
    const postsPromise = getPosts();

    return defer({ data: postsPromise });
};

export default loader;
