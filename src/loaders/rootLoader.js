import { redirect } from 'react-router-dom';
import { BASE_URL } from '../constants/env';
import localStorage from '../helpers/storage/localStorage';

export default async function loader() {
    try {
        if (localStorage.has('token')) {
            const bearerToken = `Bearer ${localStorage.get('token')}`;
            const res = await fetch(`${BASE_URL}/users/tokens/me`, {
                headers: { Authorization: `${bearerToken}` },
            });
            const data = await res.json();

            if (res.status >= 400) {
                throw new Error(data.message, { cause: data.errors });
            }

            return {
                user: data.user,
            };
        }

        return null;
    } catch (error) {
        localStorage.remove('token');
        return redirect('/login');
    }
}
